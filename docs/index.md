---
layout: default
title: Home
permalink: /
---
# What is PDFfer?

**PDFfer** is a Spring Boot library that adds PDF generation capabilities to 
your Spring Boot applications, in a simple effective manner. It is

Pluggable
: You just drop a dependency to it in your application, and you can start using it

Extensible
: It is easy to add more templates to it, meaning you can create all sorts of
documents easily

Configurable
: All aspects of the library can be easily adapted to your needs with simple Spring
properties

If you're curious about why I created PDFfer, [click here](about.md)!

## PDFfer on Pluralsight

If you have access to Pluralsight, you can watch [my Spring Boot course that uses 
PDFfer](https://app.pluralsight.com/library/courses/spring-boot-development-configuration-deployment/) to teach
some advanced Spring Boot concepts.

If you don't have access, you can get a trial subscription [from this 
page](https://pluralsight.pxf.io/ps-trial-fm).

[More on the Pluralsight registry...](pluralsight.md)

## PDF Templates

PDFfer uses a templating system in order to generate PDFs and it has a registry
of templates that anyone can contribute to.

The PDFfer library itself does not come with any templates. There are two sample
templates available in the `nekosoft-itext-templates`.

[More on the template registry...](registry.md)

[More on creating your own templates...](templates.md)

## Getting Started

Just add a dependency on the `pdffer-starter` library to your application. This
will add everything you need through auto-configuration, so make sure that
Spring autoconfiguration is enabled in your project.

Gradle builds should include this dependency
```groovy
implementation 'org.nekosoft.pdffer:pdffer-starter:1.0.0'
```

Maven builds should include this dependency
```xml
<dependency>
    <groupId>org.nekosoft.pdffer</groupId>
    <artifactId>pdffer-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

Remember that PDFfer does not come with any templates, therefore in order to be
able to generate PDF documents you will need to add at least one template library,
such as the `nekosoft-itext-templates` library.

Adding the sample template library with Gradle
```groovy
implementation 'org.nekosoft.pdffer:nekosoft-itext-templates:1.0.0'
```

Adding the sample template library with Maven
```xml
<dependency>
    <groupId>org.nekosoft.pdffer</groupId>
    <artifactId>nekosoft-itext-templates</artifactId>
    <version>1.0.0</version>
</dependency>
```

In the most common scenarios, all you have to do is autowire the `PdfferProducerBean` into 
your service or web controller
beans and invoke the `generatePdfDocument` method to get the contents of
the PDF document as an array of bytes. The method takes the name of a template,
the group it belongs to, and the payload of the document - the payload is the data
that a template needs in order to generate the PDF, so as to fill in the layout
structure with dynamic data.

For example, in order to generate an invoice PDF, you could do the following

```java
@Component
public class ConsoleAppBean implements CommandLineRunner {
    @Autowired
    private PdfferProducerBean pdffer;

    @Override
    public void run(String... args) throws Exception {
        InvoiceData data = new InvoiceData();
        // set up the invoice data here
        byte[] output = pdffer.generatePdfDocument("nekosoft", "invoice", data);
        String filename = String.format("INVOICE_%s.pdf", data.getInvoiceNo());
        try (FileOutputStream os = new FileOutputStream(filename)) {
            os.write(output);
        }
    }
}
```

[More on the producer bean...](producer.md)

## Source Code

The source code is available [on Github under various projects](https://github.com/PDFfer).
