# 2025-10-31 — Consolidated Arabic content: mapping conflicts (no-new-keys constraint)

Scope
- Source: Website-Arabic-Version.txt (consolidated site content)
- Rule: Update only existing locale keys; do not add new keys.

Unmapped content requiring new keys or pages
- School Policies (comprehensive):
  - Admissions policy (detailed steps, scholarships, discounts matrix)
  - Discipline & behavior policy (progressive measures, code of conduct)
  - Child protection policy (reporting channels, committee, confidentiality)
  - Attendance & tardiness rules (thresholds, gates closure timing)
  - Technology use & digital safety (device policy, cyber workshops)
  - Assessment policy (generic exists, but full policy page & categories list not present)
  - Communication & complaints policy (full flow, escalation, timelines, grievances committee)
- Strategic plan 2025–2030: vision/pillars/people-place/process metrics (needs its own page or section).
- Student Life (comprehensive page): clubs, leadership program, annual events list, spiritual/value programs; current locales have partial coverage under activities but not a full page.
- Photo Gallery page copy (call to view full gallery) beyond existing snippets.
- Parents’ Corner page (tools, newsletters, direct teacher contact, surveys);
- Our Team page (philosophy, PD programs, work environment); Careers page (job listings & apply instructions) — not covered by existing keys.
- Contact section advanced details (multiple departmental emails: admissions@…, careers@…); only general email exists.

Potential placements (proposal)
- pages/policies.page.tsx: centralized policies with anchors and compact summaries.
- pages/student-life.page.tsx: lifecyle programs, clubs, field trips, events.
- pages/team.page.tsx & pages/careers.page.tsx: team philosophy and job board.
- pages/parents.page.tsx: parents’ corner.
- components/shared/ComplaintsPolicyDialog.tsx for a compact, reusable CTA.

Arabic copy candidates (to reuse when keys exist)
- Primary philosophy: «التعليم بالحب — لا نلقّن الأطفال ما يفكّرون، بل كيف يفكّرون» (already mapped under primary_curriculum).
- Language system (KG “معلم = لغة” rotation; Primary: فترات مستقلة) — could fit home.language subtitles if expanded.

Risks
- Over-stuffing existing labels causes UI overflow. Prefer creating dedicated sections/files.

Action needed
- Decide on adding new routes + keys for: Policies, Student Life, Team, Careers, Parents’ Corner, Gallery.
- After approval, generate locale skeletons for EN/ID, wire pages, and migrate Arabic copy.
