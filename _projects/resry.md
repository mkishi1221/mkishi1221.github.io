---
layout: case-study
title: Resry
description: "Building an AI tool for job seekers. Shipped V1 in late 2025, ran structured discovery with users, currently building V2 for May 2026 Launch."
permalink: /resry/
hide_title: true
---

![SpaceforU Homepage]({{site.baseurl}}/images/resry.png){: style="display: block; margin: 0 auto;"}

# Resry

Resry started from my own experience trying to find a job in the current recession and AI layoff climate. After 6 months working with career coaches and recruiters, I had a hypothesis about where job seekers were getting stuck and started building V1 in October 2025 to test it.

I shipped V1 to a closed Beta cohort in December 2025, built on Next.js, Supabase, and the Claude API, with full CI/CD and a production deployment. While building, I ran structured discovery calls with job seekers from the tech community. The pattern that emerged was clear: users weren't ready for what V1 was offering. The bottleneck was upstream of where V1 operated, in fundamentals that needed to be solved first.

I documented the pivot in late January 2026 and reframed Resry as a collaborative editor that does, in the product, what I'd been doing manually with users on the discovery calls. V2 is currently in build, with the same engineering practices as the rest of my work: extensive automated test coverage written alongside features, a high cadence of small reviewable PRs, a design system locked down before product code, and PII redaction built in so users can scrub sensitive information from their CVs before AI processing. 

Launch is planned for May 2026.