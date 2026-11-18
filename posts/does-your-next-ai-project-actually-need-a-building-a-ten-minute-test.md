---
title: "Does Your Next AI Project Actually Need a Building? A Ten-Minute Test"
topic: "Datacenters & AI"
date: 2026-11-18
banner: https://damionlock.com/posts/does-your-next-ai-project-actually-need-a-building-a-ten-minute-test.png
---

![Does Your Next AI Project Actually Need a Building? A Ten-Minute Test](https://damionlock.com/posts/does-your-next-ai-project-actually-need-a-building-a-ten-minute-test.png)

I set out my AI infrastructure thesis on Medium earlier this month: begin with the workload and let the building be the last decision, not the first. Several people replied with a fair challenge. Fine in principle, but how do I know which camp my project falls into?

Here is the test I run in the first meeting. Ten minutes, six questions, no slides.

## 1. Where is the data today, and can it legally leave?

If the answer involves patient records, citizen data, defence, banking or anything a regulator cares about, the data probably stays put. That alone rules out "send it to a region" and makes a modular data centre on your own site the natural starting point.

## 2. How steady is the load?

Draw the demand curve on a napkin. A flat line or a gentle ramp favours owning the compute. A line that spikes twice a year and sleeps in between favours renting. Most AI inference estates I see are far steadier than their owners assume.

## 3. When do you need it live?

If the honest answer is "this financial year", a traditional build is already out of the running. Nobody pours a slab, runs a feed and commissions a hall in nine months. Pre-engineered units can be on site within a quarter.

## 4. What is the building you already own actually rated for?

Not the nameplate. The real, measured power headroom, the cooling capacity, the floor loading and the water supply. I have walked into buildings their owners had written off and found most of what was needed already there. The gap was knowledge, not concrete.

## 5. How confident are you in the three-year forecast?

Be honest. If you would not bet your own money on it, do not bet a building on it. Modular capacity lets you add in increments and keeps a wrong forecast cheap.

## 6. Who has to be near the compute?

Edge computing stopped being a buzzword the moment hospitals wanted imaging models in the basement and factories wanted vision systems on the line. If the people who use the output are in one place, the compute wants to be there too.

## Scoring it

If three or more answers point to "the data stays, the load is steady, the deadline is close, the building has headroom", you do not need a new building. You need an assessment of the one you have and a deployment plan measured in weeks.

If the answers point the other way, say so. Spiky, global, non-sensitive workloads belong in the cloud and I will tell you that to your face.

What I will not do is start with the site plan. After 45 designs, I have earned the right to be stubborn about that one thing.

Which of the six questions would your organisation struggle to answer today?

#AIInfrastructure #ModularDataCenter #EdgeComputing #DataCentres #DamionLock

**References**
- https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2026
- https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks
