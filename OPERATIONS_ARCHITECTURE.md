# Fuehrenundfolgen Operational Integration Architecture

Operational design for `https://fuehrenundfolgen.ch` using an owned, low-complexity relationship stack.

Primary stack:
- WordPress
- Fluent Forms
- FluentCRM
- FluentSMTP
- Brevo (SMTP transport only)
- Stripe (phase 2, deposit/payment layer)

Optional support:
- Certainty Engine / GHL for calendar and reminder amplification only

## Principles

- Keep FluentCRM as the single relationship memory.
- Keep communication human-first and manually review critical decisions.
- Prefer reversible steps over hard automation.
- Limit tags, fields, and sequences to what operations can maintain.
- Use calm, precise language in all participant-facing messages.

## System Responsibilities

- WordPress: web surface and publishing
- Fluent Forms: contact/application intake and field logic
- FluentCRM: contact memory, status lifecycle, cohort segmentation
- FluentSMTP: sender routing and delivery consistency
- Brevo: SMTP transport only
- Stripe (later): deposits/payments after acceptance
- CE/GHL (optional): reminders/calendars only, never source of truth

## CRM Schema (Finalized)

### Lists (stable)
- `Contacts`
- `Applicants`
- `Participants`
- `Alumni`

### Tag conventions
- Use lowercase and colon namespaces.
- Keep one active `state:*` tag per contact at a time.
- Remove prior state tags when state changes.

### State tags
- `state:inquiry`
- `state:applicant`
- `state:conversation-scheduled`
- `state:accepted`
- `state:waitlist`
- `state:confirmed`
- `state:deposit-paid`
- `state:alumni`

### Context tags
- `source:website`
- `flow:contact`
- `flow:application`
- `topic:general`
- `workshop:zurich-2026-10`

### Deposit tags (phase 2)
- `deposit:not-requested`
- `deposit:requested`
- `deposit:paid`
- `deposit:overdue`

### Custom fields (minimal viable)
- `application_date` (date)
- `workshop_cohort` (text/select)
- `conversation_date` (datetime)
- `decision_status` (select: accepted/waitlist/declined/pending)
- `decision_date` (date)
- `deposit_status` (select)
- `deposit_due_date` (date)
- `language_pref` (select: de/en)
- `notes_internal` (long text, private)

## Contact Flow (Implemented Design)

### Form fields
- First name (required)
- Last name (required)
- Email (required)
- Message (required)
- Phone (optional)
- Privacy consent checkbox (required)

### Form actions
1. Save form entry in Fluent Forms.
2. Create/update contact in FluentCRM.
3. Apply:
   - list: `Contacts`
   - tags: `source:website`, `flow:contact`, `topic:general`, `state:inquiry`
4. Send internal notification to workshop operations inbox.
5. Send calm confirmation email to sender.

### Notification model
- Internal recipients:
  - primary operations mailbox
  - optional second owner mailbox
- Internal email contains:
  - sender identity
  - inquiry text
  - submission timestamp
  - quick CRM profile link
- External confirmation contains:
  - confirmation of receipt
  - realistic response window (1-2 business days)
  - no promotional language

### Anti-spam
- Fluent Forms honeypot enabled
- Form nonce enabled
- reCAPTCHA v3 (or hCaptcha) enabled
- Host/WAF rate limiting enabled
- Block repeated abusive IPs at host level when required

## Application Flow (Implemented Design)

### Form structure
- Identity: first name, last name, email, phone (optional), city/country
- Professional context: role/function, work environment
- Pressure context: where coordination/timing degrades
- Motivation: why now
- Readiness: consent to direct feedback and physically present practice
- Logistics: date availability and language preference
- Privacy consent

### Optional qualification logic (light)
- If readiness checkbox is not selected:
  - show clarifying text field: "Please describe what format you are looking for."
- No hard rejection automation. Route every submission to manual review.

### Submission actions
1. Save entry.
2. Create/update CRM contact.
3. Apply:
   - list: `Applicants`
   - tags: `source:website`, `flow:application`, `state:applicant`, `workshop:zurich-2026-10`
4. Set `application_date` and `workshop_cohort`.
5. Send internal review notification.
6. Send calm application confirmation to applicant.

### State progression contract
- `state:applicant` -> `state:conversation-scheduled` -> `state:accepted` or `state:waitlist` -> `state:confirmed` -> `state:deposit-paid` -> `state:alumni`
- One owner is responsible for state transitions.
- State changes should be logged in `notes_internal` with date/initials.

## Communication Architecture

### Keep manual
- Application review decisions
- Fit/alignment conversation outcomes
- Acceptance/waitlist decisions
- Sensitive participant support questions

### Safe automation
- Contact/application confirmations
- Internal submission notifications
- Status-change transactional emails
- Fixed-timing reminders (pre-workshop)

### Where broadcasts are appropriate
- Cohort logistics updates
- Preparation reminders (e.g. D-14 and D-3)
- Post-workshop follow-up
- Low-frequency alumni updates

### What to avoid
- Long nurture sequences
- Scarcity/urgency campaigns
- Automated persuasion funnels
- Multi-branch behavioral marketing logic

## Transactional Email Templates (MVP Set)

Create and maintain five core templates:

1. Contact confirmation
2. Application confirmation
3. Accepted + next steps
4. Waitlist update
5. Confirmed + preparation details

Tone rules for all templates:
- concise
- specific
- respectful
- no hype
- clear next action (if needed)

## SLA and Operational Rhythm

### Service levels
- Contact replies: within 1-2 business days
- Application first review: within 3 business days
- Post-conversation decision update: within 2 business days

### Weekly cadence
- Inbox and CRM reconciliation
- Status/tag hygiene check
- Failed email delivery check in FluentSMTP/Brevo
- Short operations note in `PROJECT_NOTES.md` for decisions or friction

## Stripe Deposit Logic (Phase 2, Minimal and Reversible)

### Trigger
- Deposit request only after `state:accepted`.

### Initial payment mode
- Manual send of Stripe Payment Link or Stripe Invoice.
- Apply `deposit:requested` when request is sent.

### Confirmation flow
1. Stripe payment succeeds.
2. Update CRM:
   - add `deposit:paid`
   - set `deposit_status = paid`
   - move state to `state:deposit-paid` (or keep `state:confirmed` + deposit tag, based on operating preference)
3. Trigger confirmed onboarding/preparation email.

### Later automation (optional)
- Stripe webhook -> FluentCRM tag/field updates via integration tool.
- Keep manual fallback in case webhook fails.

## Optional CE/GHL Use (Bounded Scope)

Allowed:
- calendar booking support
- SMS/email reminder support

Not allowed:
- replacing FluentCRM as relationship memory
- running primary applicant lifecycle states
- parallel contact records with conflicting truth

Integration rule:
- one-way sync back to FluentCRM for reminders/events where practical

## Risks and Friction to Avoid

- Too many tags and unclear naming
- Multiple systems editing lifecycle state
- Over-automated applicant communications
- Payment automation before acceptance flow is stable
- No single owner for operational decisions

## Minimal Setup Checklist

1. Configure FluentSMTP with Brevo and verify sender reputation.
2. Build Contact form with anti-spam and notification routing.
3. Build Application form with readiness + context fields.
4. Create FluentCRM lists/tags/custom fields from this document.
5. Set up five transactional templates.
6. Assign one owner for state transitions and SLA adherence.
7. Run first cohort manually-first, then automate only recurring friction points.
