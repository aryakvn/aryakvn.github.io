---
title: Danik
summary: An all-in-one platform for private schools and academies, covering the public website, classes and roll call, tuition, accounting and an online shop. Self-hosted, in Persian.
category: School management platform
image: ../../../assets/products/danik.png
imageAlt: "Four phone screens from the Danik panel showing an accounting overview with a yearly income chart, a tuition invoice with its balance, a student's attendance and grades, and a parent's home screen."
schema: SoftwareApplication
model: license
published: 2026-08-03
updated: 2026-10-16
tags: [ 'Django', 'Vue', 'PWA', 'RTL', 'Docker' ]
order: 1
---

Danik runs a private school or training academy from a single install. You get the public website that brings parents
in, the panel where teachers, parents and students work every day, and the back office where the owner and the finance
desk keep the money straight. It was built for and runs at a real technology academy for children and teenagers, and
it is fully Persian and right-to-left.

It is white-label. You set your school's name, logo, tagline and contact details once in the admin, and the website,
the panel, the login screen, printed sheets and text messages all use them.

## Public website

- **Course catalogue** with private and group options, filters, sorting and a page per course.
- **Events, blog and FAQ**, all edited by your staff in the admin, with no developer involved.
- **Enquiry form** that collects leads for the office to follow up.
- **Search-ready** out of the box: server-rendered pages, a sitemap, robots rules and structured data, so parents find
  you under your own name.
- **Public certificate pages**: every certificate you issue gets a link anyone can open to check it.

## One panel for teachers, parents and students

- **A single app for everyone.** Access follows the classes, not the account. One login can teach one class and study
  in another, and the panel shows each side separately.
- **Teachers** start and end sessions, take roll call, record grades, and post photos, notes and links to their classes.
- **Parents** see their children's classes, attendance, grades, upcoming sessions and tuition, all in one place.
- **Students** see their own classes, grades and certificates, and never anything about money.
- **Office announcements** appear first on everyone's home screen.
- **Installable** on phones and desktops as a progressive web app, designed mobile-first.

## Tuition and accounting

- **Invoices and payments** for every family, with partial payments, balances, due dates and reminders.
- **Finance desk role** that sees tuition across every family and nothing else, plus finance reports in the admin.
- **Accounting**: a monthly overview of income, expenses, teacher pay and what is outstanding, with a yearly chart.
- **Teacher pay** worked out from the sessions each teacher actually ran. The rate is locked when a session ends, so a
  raise never rewrites past months. Teachers see their own pay and nothing more.
- **Expenses with receipts, recurring monthly bills** paid in one press, and other income, all kept by Shamsi month.

## Shop and video courses

- **Physical and digital products**, such as workbooks and handouts, with stock, discounts, galleries and spec sheets.
- **Video courses** sold with a licence for each buyer.
- **Online payment through ZarinPal**, or card-to-card transfer with receipt upload.
- **Private downloads**: digital purchases are served only to the people who bought them.

## Accounts and permissions

- **Phone-number login.** The office registers a family in one step. The password is generated, printed on an A5
  credential card and can be sent by text message.
- **Permission-based roles**: admin, teacher, parent, student, finance and shop customer. Each role is a group the owner
  can widen or narrow in the admin, with no redeploy.
- **Instant revocation**: change what someone may do and their open sessions sign out and pick up the new rules.
- **Certificates** with pass marks and a grade ceiling, announced to the student by text message.

## Optional integrations

- **Live online classes** on a self-hosted Jitsi video server.
- **Team and class chat** on a self-hosted Mattermost server.
- **Text messages** through your SMS provider's webhook.
- Every key and setting is edited in the admin, not in code.

## Installation and licensing

Danik is licensed software that you run on your own server, so your families' data never leaves your hands. It ships
as an offline bundle: Docker images, PostgreSQL and a one-command installer that needs no internet connection and
generates its own secrets. A single Linux server with Docker is enough.

Licences are quoted per school, with installation and setup included. There is no online checkout. Email or call me
with the size of your school and what you need, and I'll reply with a quote and a live demo.
