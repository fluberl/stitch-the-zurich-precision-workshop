# WordPress Form Integration Checklist

Implementation checklist for enabling live inbound operations on `fuehrenundfolgen.ch` using WordPress + Fluent stack.

This file follows:
- `OPERATIONS_ARCHITECTURE.md`
- `COMMUNICATION_RUNBOOK.md`
- `PAYMENT_STATE_CONTRACT.md`

## Current frontend status

- Static site CTAs are wired to fallback email endpoints.
- Integration constants in `index.html`:
  - `CONTACT_FORM_URL`
  - `APPLICATION_FORM_URL`
- TODO markers in code indicate where final Fluent Forms URLs must be inserted.

## Contact Form MVP (WordPress / Fluent Forms)

### Required fields
- first_name (required)
- last_name (required)
- email (required)
- message (required)
- phone (optional)
- consent/privacy checkbox (required)

### Form behavior
- Save form entry in Fluent Forms.
- Send immediate confirmation message using calm template.
- Send internal notification to operations mailbox.

### FluentCRM mapping
- Add to list: `Contacts`
- Apply tags:
  - `source:website`
  - `flow:contact`
  - `topic:general`
  - `state:inquiry`

### Delivery and anti-spam
- FluentSMTP configured and tested.
- Brevo configured as SMTP transport.
- Honeypot enabled.
- Nonce enabled.
- Turnstile/reCAPTCHA/hCaptcha enabled.
- Host-level rate limiting enabled.

## Application Form MVP (WordPress / Fluent Forms)

### Required fields
- first_name, last_name, email
- phone (optional), city_country
- role_function, work_environment
- pressure_context
- why_now
- readiness checkbox (direct feedback + physically present work)
- availability
- language_pref (DE/EN)
- consent/privacy checkbox

### Optional logic
- If readiness checkbox is not selected, show required clarification field.
- No auto-rejection logic.

### Form behavior
- Save entry.
- Send immediate calm application confirmation.
- Send internal notification to review inbox.
- Route all decisions to manual review.

### FluentCRM mapping
- Add to list: `Applicants`
- Apply tags:
  - `source:website`
  - `flow:application`
  - `state:applicant`
  - `workshop:zurich-2026-10`
- Set custom fields:
  - `application_date`
  - `workshop_cohort`
  - `language_pref`

## Applicant state handling (manual-first)

Use state tags exactly as documented:
- `state:applicant`
- `state:conversation-scheduled`
- `state:accepted`
- `state:waitlist`
- `state:confirmed`
- `state:deposit-paid`
- `state:alumni`

When changing state:
- remove old `state:*` tag
- add new `state:*` tag
- write short note in `notes_internal`

## Transactional communication setup

Create templates from `COMMUNICATION_RUNBOOK.md`:
- contact confirmation
- application confirmation
- accepted
- waitlist
- confirmed + preparation

Set operational SLA:
- contact response in 1-2 business days
- first application review in 3 business days
- decision update in 2 business days after conversation

## Final switch to live form URLs

When Fluent Forms are live:
1. Copy final public form URLs.
2. Update `CONTACT_FORM_URL` and `APPLICATION_FORM_URL` in `index.html`.
3. Remove or revise temporary fallback note in CTA section.
4. Verify CTA behavior on mobile and desktop.
5. Submit one test contact and one test application end-to-end.

## Intentionally non-functional until configured

- Structured form submission from static site to Fluent Forms.
- CRM auto-tagging from form endpoints.
- Form-level anti-spam and SMTP behavior.

These activate only after final WordPress Fluent Forms URLs are connected.
