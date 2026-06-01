---
title: The real cost of an AI thought
topic: Datacenters & AI
date: 2026-05-20
---

We talk about artificial intelligence as if it happens in the cloud — somewhere abstract, weightless, free. It doesn't. Every prompt you send lands in a building, draws real power, and warms real air. If we want AI to scale responsibly, we have to make that cost visible.

## The journey of a single prompt

When you ask a model a question, the request travels to a data centre, wakes up a cluster of accelerators, and runs billions of calculations before the answer comes back. That burst of computation is **inference**, and at scale it is now the dominant energy story in AI — not training.

The numbers compound quickly:

- A single large-model query can use **many times** the energy of a traditional web search.
- Multiply that by millions of users, many times a day.
- Now add the cooling required to keep the silicon from melting.

> The cheapest watt is the one you never spend. Efficiency isn't a constraint on AI — it's what makes AI affordable enough to be everywhere.

## Designing for the bill

Once you treat energy as a first-class design input, the choices change:

1. **Right-size the hardware.** Not every workload needs the biggest accelerator. Matching model to silicon is the single largest efficiency lever.
2. **Cool intelligently.** Liquid and immersion cooling can dramatically cut the overhead spent moving heat around.
3. **Follow the sun and the wind.** Scheduling flexible workloads for when the grid is greenest turns a fixed cost into a variable advantage.

None of this slows AI down. It makes the economics work — and the economics are what decide whether sustainable infrastructure gets built at all.

## Where this goes

The organisations that win the next decade won't be the ones with the most GPUs. They'll be the ones who got the **most intelligence per watt**. That's an infrastructure problem, a sustainability problem, and a design problem all at once — which is exactly why it's the work worth doing.
