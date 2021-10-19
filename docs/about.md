---
layout: default
title: About This Project
permalink: /about
---
The idea for PDFfer was born out of a separate project that started back in May 2020, one that links to Google Calendar 
and extends the attributes of a Google Calendar Event. The custom information in the extended attributes is needed for 
managing work gigs for IT instructors. The idea is to turn Google Calendar into a reliable storage layer for training 
consultants to manage their schedule.

The longer term vision for the project included the ability to send invoices directly from the application. So two things
were needed - generating PDFs from the calendar entries and sending the PDFs via email.

During the development of the invoicing feature it appeared clear that there was a lot of scope for reusability - 
the need for generating PDFs is not uncommon, so the decision was taken to keep the PDF generation and emailing code 
separate from the calendaring layer, accessible via a RESTful API.

It was not until the plan for the 
[Pluralsight course on Spring Boot](https://app.pluralsight.com/library/courses/spring-boot-development-configuration-deployment/)
was drawn that the idea came to make the PDFfer library not just a separate service accessible via HTTP, but an embeddable 
library that can be plugged into any Spring Boot application with autoconfiguration. That way
it could be used directly from within the code of any other project (including the original calendaring project that 
gave rise to PDFfer in the first place, which was retrofitted with the new version).

The Pluralsight course was created between Jul and Oct 2021 and the PDFfer open-source library was adapted from the
RESTful API version and published to Maven and online in the same period. 