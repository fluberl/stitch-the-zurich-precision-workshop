# Stitch - The Zurich Precision Workshop

Single-page workshop site for **Leading & Following**.  
Current implementation is in `index.html`, with design direction in `DESIGN.md`.

## Purpose

Present the workshop with clarity and discipline:
- who it is for
- how the 3-day process works
- what outcomes are realistic
- how to apply

The tone is professional, direct, and specific. Claims stay grounded.

## Current Scope (Phase 1)

Phase 1 focuses on high-impact content and structure improvements without major architecture changes:
- improve facilitator section
- add a "What happens in 3 days" section
- add "Expected outcomes / Not promised outcomes"
- improve CTA and application journey clarity
- document maintenance rules

`index.html` remains the delivery surface for now.

## Source of Truth

- `DESIGN.md`: visual and system principles (color, type, spacing, shape language)
- `README.md`: project intent, editing rules, and scope
- `PROJECT_NOTES.md`: active decisions, open questions, and deferred items
- `OPERATIONS_ARCHITECTURE.md`: operational relationship flows (contact, application, CRM states, communications, payment phase)
- `COMMUNICATION_RUNBOOK.md`: transactional templates, automation boundaries, and SLA policy
- `PAYMENT_STATE_CONTRACT.md`: Stripe deposit trigger rules and CRM payment-state contract
- `WORDPRESS_FORM_INTEGRATION_CHECKLIST.md`: practical setup checklist for Fluent Forms/FluentCRM integration

## Section Map (`index.html`)

1. Top navigation  
2. Hero  
3. Problem recognition  
4. Workshop explanation and benefits  
5. Methodology  
6. Facilitators  
7. For whom / not for whom  
8. Practical details and FAQ  
9. Final CTA  
10. Footer

## Editing Rules

- Keep structure and language precise; avoid promotional inflation.
- Use short paragraphs and clear labels.
- Preserve visual discipline from `DESIGN.md` (flat, structured, minimal decoration).
- Keep CTA behavior explicit: users should understand next steps immediately.
- Do not add claims that cannot be operationally supported.

## Content Standards

- **Audience fit:** describe who benefits, and who does not.
- **Method clarity:** explain process, not abstractions.
- **Outcome language:** describe expected improvements as observable behavior.
- **Boundary language:** clearly state what is not promised.
- **Facilitator credibility:** prefer concrete expertise over broad statements.

## Maintenance Workflow

1. Update copy in `index.html` according to Phase 1 backlog.
2. Record key decisions and unresolved questions in `PROJECT_NOTES.md`.
3. Check for consistency against `DESIGN.md`, `OPERATIONS_ARCHITECTURE.md`, and this README.
4. Keep changes small and reviewable.

## Next After Phase 1

- move from single-page narrative toward modular content architecture
- define reusable section/component patterns
- prepare design-system rollout in later phases