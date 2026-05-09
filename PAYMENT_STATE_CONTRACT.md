# Payment and Deposit State Contract (Phase 2)

This contract defines when and how deposit/payment status is applied in the CRM.

## Scope

- Applies to accepted workshop applicants only
- Uses Stripe as payment layer
- FluentCRM remains source of truth for participant lifecycle state

## Trigger Policy

- Do not request payment before `state:accepted`.
- Payment request is tied to a specific cohort tag (example: `workshop:zurich-2026-10`).

## State and Tag Contract

### Lifecycle states
- `state:accepted`
- `state:confirmed`
- `state:deposit-paid`

### Deposit tags
- `deposit:not-requested`
- `deposit:requested`
- `deposit:paid`
- `deposit:overdue`

### Custom fields
- `deposit_status`
- `deposit_due_date`
- `decision_date`
- `workshop_cohort`

## Manual-First Flow (recommended first release)

1. Contact reaches `state:accepted`.
2. Operator sends Stripe payment request (Payment Link or Invoice).
3. Apply:
   - `deposit:requested`
   - `deposit_status=requested`
   - set `deposit_due_date`
4. On successful payment:
   - add `deposit:paid`
   - set `deposit_status=paid`
   - move to `state:deposit-paid` (or keep `state:confirmed` and rely on deposit tags if preferred)
5. Trigger confirmation/preparation communication.

## Automation-Ready Flow (later)

- Stripe webhook event `payment_intent.succeeded` (or invoice paid) updates FluentCRM.
- Use one automation endpoint only.
- Keep manual fallback path if webhook fails.

## Operational Safeguards

- One owner approves all state transitions.
- Do not run payment state changes in multiple tools.
- Keep an audit note in `notes_internal` for each financial state change.
- Reconcile Stripe vs CRM weekly during active cohort operations.

## Exception Handling

- Failed payment attempt: keep `deposit:requested`, add note.
- Overdue: add `deposit:overdue`, manual follow-up only.
- Withdrawn participant: remove active state tags, add decision note, keep financial trace in notes.
