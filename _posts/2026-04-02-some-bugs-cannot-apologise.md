---
layout: post
title:  Some Bugs Cannot Apologise
description: Most bugs fail cheaply. A small category fails expensively, and the discipline is not writing better code. It is learning to see which actions belong to that category before they bite you.
date:   2026-04-02 09:00:00 +0100
image:  '/images/ghariza-mahavira-V2HrkMDLBUY-unsplash.jpg'
tags:   [engineering, product, learnings]
---

## A few years ago I was in the room for a sales demo that went badly wrong. The customer clicked a button, and the system sent him sixty emails in the next five minutes. We watched it happen in real time, counted them as they arrived, and started making frantic phone calls across the company to stop it. We pushed a fix inside twenty minutes. The fix was the easy part.

The hard part came over the following weeks, as our domain reputation quietly collapsed and legitimate emails started landing in spam folders across our customer base. The bug had been patched almost immediately. The damage it caused outlived the patch by a month.

I have been thinking about that incident again recently, because I think the lesson most engineering teams take from stories like this one is the wrong lesson. The lesson people reach for is "we should have tested better". And on its own terms that lesson is not wrong, exactly. More testing is almost always better. But it is aiming at the wrong problem, and aiming at the wrong problem means you will keep being surprised by the same category of failure for the rest of your career.

## The Category That Matters

Most bugs are cheap. A button renders in the wrong colour. A form validation message is worded badly. A query returns results in the wrong order. You find them, you fix them, you ship the fix, and the world is no worse for it having happened. The cost of the bug is roughly equal to the cost of fixing it. Testing catches a lot of these, and the ones that slip through are annoying but survivable.

There is another category of bug that does not play by those rules. These are bugs where a single wrong action, once it fires, cannot be taken back. Sixty emails have already landed in the customer's inbox. The API has already been called twenty thousand times and the bill is already owed. The notification has already been pushed to ten thousand devices. The money has already been wired. The post has already gone out under the customer's name. You can fix the code in twenty minutes, and it will change nothing about what already happened.

I have come to think of these as bugs that cannot apologise. The fix does not undo the damage. The fix only stops more damage from being added to the pile. Everything already on the pile stays there.

The reason this distinction matters is that the two categories want completely different engineering responses. For cheap bugs, the right response is the normal one: write tests, review code, catch them early, ship fixes fast. For bugs that cannot apologise, that entire playbook is beside the point. You are never going to write a test that covers the specific sequence of clicks, the specific data state, and the specific third party condition that caused sixty emails to fire in five minutes. The edge cases are infinite. The combinations are infinite. You cannot test your way out of this, because the thing you are trying to prevent is not a known failure. It is an unknown failure in a known category.

What you can do, and what almost nobody does before their first expensive incident, is design the architecture so that the known category is structurally incapable of producing damage at scale. The goal is not to stop the bug. The goal is to cap the blast radius so that when the bug inevitably arrives, it fails cheaply.

## How To See The Category

The question I now ask, fairly early in any build, is deceptively simple. Which actions in this system, if fired a thousand times by accident, would still be a problem tomorrow? The answers tend to cluster.

Anything that sends a message to a third party belongs on the list. Emails, SMS, push notifications, webhook calls, social posts under a user's name. Once the message is out, it is out. Anything that moves money belongs on the list. Charges, refunds, transfers, top ups. Anything that incurs a cost per invocation belongs on the list, and this one is easy to forget, because the cost does not look like a user-facing action. An LLM call, a paid API, a cloud function that provisions resources. The bill arrives silently, a month later, and by then the damage is done. Anything that deletes or exposes data belongs on the list, and exposure is often worse than deletion because there is no undo at any price. Anything that triggers a physical action in the real world belongs on the list, obviously. Shipments, door locks, industrial equipment, regulatory filings.

Notice what these have in common. They all reach across a boundary your code does not control. Once the action crosses that boundary, it is no longer a software problem. It is a legal problem, a reputational problem, a financial problem, or a safety problem. The fix ships in twenty minutes. The problem on the other side of the boundary takes weeks or months or sometimes never resolves at all.

This is the category that needs different architecture. Everything else can follow the normal playbook.

## The Architecture That Caps The Radius

Once you can see the category, the design principles almost write themselves. None of what follows is clever. What is clever is knowing which actions warrant this treatment in the first place, because the principles cost real engineering time and you cannot apply them to everything.

The first principle is that retry should never be automatic for actions in this category. A function that can quietly loop until it succeeds is a function that can quietly loop until your domain is blocklisted. The retry has to be triggered by a human, either the end user clicking again or someone on the team explicitly reauthorising the action. Automatic retries are wonderful for fetching a stale cache. They are catastrophic for anything that reaches across a boundary.

The second principle is that every action in this category needs a rate cap, enforced at the architectural level and not at the business logic level. Not a config value a future engineer can raise without thinking about why it is there. A hard ceiling on how many times the thing can fire per user, per hour, per day. The ceiling should be set generously enough that legitimate use never hits it, and low enough that a runaway loop stops before it matters. The sixty emails in five minutes was not just a bug. It was a bug that met no ceiling on its way out.

The third principle is that wherever possible, these actions should be queued rather than fired directly, and the queue should be visible to someone whose job it is to care about the business outcome. Not an engineer looking at logs. Engineers do not have the context to spot that this particular batch of refunds looks wrong, because they do not know what refunds normally look like. The person who knows what normal looks like is the operator, the account manager, the founder in the early days. The audit has to land in front of them, in a form they can actually read, and reviewing it has to be recognised inside the company as real work.

The fourth principle follows from the third. Surface the data inside the product itself, meaningfully. A line chart of how many of these actions fired in the last hour. A table of the most recent ones, sorted and filterable. A notification that trips a threshold before it trips a crisis. The goal is that a non-engineer can look at the screen and say "something is wrong here" before the bill arrives or the emails land. Visibility is the cheapest incident response you will ever build, and almost every team I have worked with underinvests in it because it does not feel like building product. It feels like internal tooling. But for actions in this category, the internal tooling is the product, in the sense that it is what keeps the product alive.

And finally, there needs to be a kill switch. One that can be triggered by the user being harmed, by a frontline team member, or by whoever picks up the phone at three in the morning. Not a code deploy. Not a config change that requires a merge and a CI run. A button. The kill switch is the thing you hope you will never use, which means the temptation to skip it is high, and the cost of skipping it reveals itself exactly once, at the worst possible moment. Build it before you need it, because by the time you need it you will not have the twenty minutes to spare.

## The Part That Is Actually Hard

The principles are not the hard part. Any competent engineer, shown this list, will nod and agree. The hard part is recognising which actions in your specific product belong to the category in the first place, and doing it early enough that the architecture accommodates them without a painful refactor later. This is a product judgment, not an engineering one. It requires someone who can look at a feature spec and ask not just "how do we build this" but "what happens if this fires a thousand times by accident, and who pays the bill".

The cost of getting this wrong is not evenly distributed across the lifetime of a product. It is concentrated in a handful of incidents that land in the first two years, usually at the worst possible moment, usually in front of a customer you cannot afford to lose. The teams that avoid those incidents are not smarter or more careful than the teams that do not. They have simply learned to see the category, and they have built the scaffolding before the scaffolding was urgent.

The twenty thousand pound API bill I mentioned in passing earlier was from a different team, a different company, and a different kind of action entirely. But the shape of the failure was the same. A function that was allowed to retry without supervision. No cap on how many times it could fire. No visibility into what it was doing while it was doing it. No kill switch. When the bill arrived a month later, nobody could even tell me the exact moment the runaway started, because nobody had been watching. The fix was trivial. The twenty thousand pounds was already gone.

What I have come to believe, after being on both sides of incidents like these, is that the measure of a good engineering decision is not whether the code is correct. It is whether the system fails cheaply when the code is wrong. Correct code is a nice goal. Cheap failure is a survival strategy. And the difference between the two is almost always decided months before the bug is written, in quiet architectural choices nobody remembers making.

Some bugs cannot apologise. The only useful response is to design the system so that when they arrive, there is nothing for them to apologise for.
