(function () {

    document.onreadystatechange = function onDOMContentLoaded () {

        // ensure DOMReady
        if (document.readyState !== 'interactive') {
            return;
        }

        // jekyll sidebar
        document.sidebar = document.getElementById('sidebar');

        // skip larger viewports
        if (window.innerWidth >= 576) {
            return;
        }

        // jekyll sidebar interface
        var sidebar = {

            // sidebar HTMLElement
            e: document.sidebar,

            // CSSStyleDeclaration
            computedStyles: getComputedStyle(document.sidebar),

            // toggle visibility
            toggle: function () {
                this.visible ? this.hide() : this.show();
            },

            // refine sidebar padding to
            // handle mobile browser toolbars
            resize: function () {
                this.e.style.paddingBottom = +this.computedStyles.height.replace('px', '') - window.innerHeight + 8 + 'px';
            },

            // glide-out sidebar
            hide: function () {
                this.visible = false;
                this.e.style.transform = 'translate(-95%, 0%)';
            },

            // glide-in sidebar
            show: function () {
                this.e.style.transform = 'translate(0%, 0%)';
                this.visible = true;
            },

            // gestures coords
            touchStart: [],
            touchEnd: [],

            // visibility
            visibile: true

        };

        sidebar.e.addEventListener('touchstart', function (e) {
            sidebar.touchStart = [ e.touches[0].clientX, e.touches[0].clientY ];
        }, { passive: true });

        sidebar.e.addEventListener('touchmove', function (e) {
            sidebar.touchEnd = [ e.touches[0].clientX, e.touches[0].clientY ];
        }, { passive: true });

        sidebar.e.addEventListener('touchend', function (e) {

            // ignore non-sidebar gestures
            // i.e. navigation link clicks
            if (e.target !== sidebar.e) {
                return;
            }

            // handle clicks
            if (e.changedTouches[0].clientX === sidebar.touchStart[0]
                && e.changedTouches[0].clientY === sidebar.touchStart[1]) {
                sidebar.toggle();
                return;
            }

            // ignore vertical swipes
            if (Math.abs(sidebar.touchEnd[1] - sidebar.touchStart[1]) >= 32) {
                return;
            }

            // handle right swipes
            if (sidebar.touchEnd[0] - sidebar.touchStart[0] >= 16) {
                sidebar.show();
                return;
            }

            // handle left swipes
            if (sidebar.touchStart[0] - sidebar.touchEnd[0] >= 16) {
                sidebar.hide();
                return;
            }

        }, { passive: true });

        // stall glide-out on initial view
        window.setTimeout(function () {
            sessionStorage.setItem('recur-view-timeout', 0); sidebar.hide();
        }, sessionStorage.getItem('recur-view-timeout') || 1000);

        // handle toolbar visibility changes
        window.addEventListener('resize', function () {
            sidebar.resize();
        }, { passive: true });

        // initialise
        sidebar.resize();

    };

})();