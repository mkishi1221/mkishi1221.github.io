
# Your product should work for you

Your first product needs to be load bearing. It's what customers interact with, what revenue flows through, and what you point investors at. It should be giving you momentum, not costing you time and runway. I build that product fast enough that you can start running the business on it in months, not years.

- **Conversations become product.** You share what the business needs, I handle everything between that conversation and working software. No specs, no briefs, no managing a backlog.
- **Revenue ready.** What I build solves a real problem from day one. Your first customers get value, not a beta they're testing for you. The product does the work so you can focus on the relationship.
- **Built to last from day one.** Thousands of automated tests, hundreds of iterative PRs, auditable full stack repos. No throwaway prototypes that need rebuilding when you get traction.
- **The boring stuff is done.** Compliance, testing, infrastructure, security. You don't have to think about it, and it never becomes the reason a deal stalls or a launch slips.

Sound like what you're looking for? [Get in touch.](https://www.linkedin.com/in/mkishi/){: .cv_link target="_blank" }

# Case studies

{% for study in site.data.case_studies %}
{% include case-study-tile.html
  image=study.image
  title=study.title
  description=study.description
  tags=study.tags
  years=study.years
  link=study.link %}
{% endfor %}

# Writing

{% for post in site.posts limit:3 %}{% assign post_tags = post.tags | join: ',' %}
{% include case-study-tile.html
  image=post.image
  title=post.title
  description=post.description
  tags=post_tags
  date=post.date
  link=post.url %}
{% endfor %}

# Speaking and Events

I speak at events and panels on building with emerging technologies, organise my own meetups in London, and compete in hackathons. The topics range across crowdfunding, startups, AI, and product strategy. Each one has been a chance to test ideas with people closer to the work than I am.

## Hackathons

- **AI Voice and Meeting Agents Hackathon, Antler London (Sept 2025).** Won with a team of three. Built an AI powered travel itinerary generator in under 7 hours, from first meeting our teammates to a working demo.

<br>

![AI Voice and Meeting Agents Hackathon]({{site.baseurl}}/images/hackathon_1.jpg){: style="display: block; margin: 0 auto; width: 80%;"}
*AI Voice and Meeting Agents Hackathon, Antler London (Photo by MeetStream AI)*

<br>

![AI Voice and Meeting Agents Hackathon]({{site.baseurl}}/images/hackathon_2.jpg){: style="display: block; margin: 0 auto; width: 80%;"}
*AI Voice and Meeting Agents Hackathon, Antler London (Photo by MeetStream AI)*

<br>

## Events I've organised

- **Kickstart Your Make/100: Crowdfunding Creators Meetup** *(Sept 2025)*: Sponsored by Solid Solutions (SolidWorks), 100+ signups, 40+ attendees. Featured Rob Hallifax, a London based product manager and Kickstarter expert who funded ten campaigns, raised nearly $400K, and broke two world records. Joined by members of Kickstarter's Design and Tech team including Nathan Nalevanko (Senior Outreach Lead) and Heather Swift Hunt (Head of Design and Tech).
- **Kickstarter x Blue Garage: Crowdfunding Creators Meetup** *(July 2025)*: Sponsored by Kickstarter, 90+ signups, 50+ attendees. Featured Nathan Nalevanko joining remotely from Oregon to share insights on launching hardware and design crowdfunding projects.

<br>

![Kickstart Your Make/100]({{site.baseurl}}/images/Kickstarter_3.jpg){: style="display: block; margin: 0 auto; width: 80%;"}
*Kickstart Your Make/100: Crowdfunding Creators Meetup (Photo by Duncan Raban)*

<br>

![Kickstarter x BlueGarage]({{site.baseurl}}/images/Kickstarter_1.jpg){: style="display: block; margin: 0 auto; width: 80%;"}
*Kickstarter x Blue Garage: Crowdfunding Creators Meetup (Photo by Michael Korn)*

<br>

![Kickstarter x BlueGarage]({{site.baseurl}}/images/Kickstarter_2.jpg){: style="display: block; margin: 0 auto; width: 80%;"}
*Kickstarter x Blue Garage: Crowdfunding Creators Meetup (Photo by Michael Korn)*

<br>

## Speaking and features:

- **Cornwall Angel Network launch** *(April 2024)*: Presented as part of a [regional tech innovation showcase](https://www.business-live.co.uk/professional-services/banking-finance/cornwall-angel-network-aims-boost-29057545){: .cv_link target="_blank" }
- **Hertzian's AI Summit** *(June 2024)*: Spoke on how real-time 3D supports sales and stakeholder engagement
- **MLOps London** *(Nov 2023)*: Talked about integrating AI into 3D design workflows
- **Cranfield University Airport Design module** *(Feb 2024 & Feb 2025)*: Led workshops on using visualisation tools in infrastructure planning
- **Global Plymouth Panelist at University of Plymouth** *(July 2023)*: Participated in a panel on AI’s societal and cross-sector impact
- **SETsquared Bristol Interview** *(April 2024)*: Featured in a written article on [Amutri's vision and impact in 3D visualisation](https://setsquared-bristol.co.uk/news/amutri-revolutionising-3d-visualisation/){: .cv_link target="_blank" }

<br>

![Cornwall Angel Network launch]({{site.baseurl}}/images/cornwall_launch.jpg){: style="display: block; margin: 0 auto; width: 80%;"}
*Cornwall Angel Network launch (Photo by British Business Bank)*

<br>

![Hertzian AI Summit]({{site.baseurl}}/images/hertzian_ai.jpeg){: style="display: block; margin: 0 auto; width: 80%;"}
*Hertzian AI Summit (Photo by Amutri)*

<br>

![Global Plymouth event]({{site.baseurl}}/images/highres_514784802.jpeg){: style="display: block; margin: 0 auto; width: 80%;"}
*Global Plymouth (Photo by Mithuan Alwis)*

# Contact me

I take on fractional CTO engagements and fixed price product builds for early stage startups. Most of my work is with founders who are post revenue or at angel and pre seed stage, with an idea that's been validated but no product yet. 

If that sounds like where you are, I'd love to hear about what you're building.

<div style="margin-top: 32px;">
<a href="https://www.linkedin.com/in/mkishi/" class="button hire-me-btn" target="_blank" rel="noopener" style="display: inline-block; width: auto; border: 1px solid #55575c;">Find me on LinkedIn</a>
</div>
