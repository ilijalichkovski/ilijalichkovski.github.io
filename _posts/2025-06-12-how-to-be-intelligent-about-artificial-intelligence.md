---
layout: post
title: How to be intelligent about artificial intelligence
date: 2025-06-12 10:00:00
description: Recording and notes from a talk I gave at the Mostovi Hackathon on AI security in development and production.
tags: [ai, security, vibe-coding, llm]
categories: [blogposts]
giscus_comments: false
toc:
  sidebar: left
---

This was a talk I gave at the third week of the Mostovi Hackathon, to get participants thinking about AI security in development and in production. Read more about Mostovi [here](https://mostovi.mk/) — it’s a wonderful initiative by my friend Zhive.

---

# I. Preliminaries

My hope with the contents below is to provide some fruitful context for you all to meditate upon some questions that will be relevant for you.

## The moment in AI

A few insights from the [State of AI Report 2024](https://www.stateof.ai/) show the magnitude of the current AI moment. Investments are growing, with behemoths like OpenAI and xAI breaking fundraising records, and approaching $100b in total investments into AI companies in 2024:

[![](https://substackcdn.com/image/fetch/$s_!Uw5L!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4760e928-d74f-41b8-95d4-c0260f8c41c6_992x630.png)](https://substackcdn.com/image/fetch/$s_!Uw5L!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4760e928-d74f-41b8-95d4-c0260f8c41c6_992x630.png)Annual AI investment in generative AI is experiencing a boom ([slide 148](https://www.stateof.ai/))

Efficiency gains, algorithmic unhobblings and distilling ever-increasing capabilities into relatively smaller models have yielded dramatic cost reductions:

[![](https://substackcdn.com/image/fetch/$s_!uzcm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c28a827-88f9-4ace-92c5-e808075dee57_999x465.png)](https://substackcdn.com/image/fetch/$s_!uzcm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c28a827-88f9-4ace-92c5-e808075dee57_999x465.png)Inference costs of models can drop significantly with distillation ([slide 110](https://www.stateof.ai/))

Crucially, despite the waves of “slop” and the economic bubble, users increasingly see value in the latest models:

[![](https://substackcdn.com/image/fetch/$s_!xcJN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe213b2a-7982-449e-aafe-7d2485f75f7b_909x608.png)](https://substackcdn.com/image/fetch/$s_!xcJN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe213b2a-7982-449e-aafe-7d2485f75f7b_909x608.png)Data from Ramp comparing retention in 2022 and 2023 ([slide 133](https://www.stateof.ai/))

It is likely that even with existing capabilities, we haven’t even begun grasping the potential applications and there is still a lot of low-hanging fruit. It is certainly dissilusioning to think of failures of models to realize that 9.11 < 9.9, or [hallucinations sometimes being more prevalent in reasoners](https://techcrunch.com/2025/04/18/openais-new-reasoning-ai-models-hallucinate-more/), but mid-2025 is pretty late to be a sour LLM denialist, after systems like [AlphaEvolve achieved real breakthroughs](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/) in efficient matrix multiplication and [LLMs outperform clinicians](https://www.nature.com/articles/s41746-025-01486-5). 

## Why care?

You can do great things with LLMs. These tools can yield drastically disparate outcomes — some get smarter using them, and some get dumber. Education studies [show this](https://arxiv.org/abs/2409.09047) — students learn better when complementing their education with LLMs, but learn worse when substituting their own thinking with LLMs. Google’s CEO has claimed [25% of their codebase](https://fortune.com/2024/10/30/googles-code-ai-sundar-pichai/) is AI-generated, while a [quarter of YC startups](https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/) have entirely AI-generated codebases, showing that LLMs have found their place in helping top-level engineers generate important code. The punchline is: we are responsible for how fruitfully and constructively we use AI. **Having a productive time using LLMs is a matter of internalizing a few core principles and following a few best practices**.

# II. Philosophies and Principles

I have come up with three principles encapsulating a reasonably up-to-date researcher’s view on how to think about these technologies when building (with) them.

## II.1. The Bitter lesson

In a 2019 [essay](http://www.incompleteideas.net/IncIdeas/BitterLesson.html), Richard Sutton, one of the pioneers of reinforcement learning — the algorithm used to train the most powerful reasoning models today — coined this term. It makes explicit a realization that AI researchers have been having again and again — that real progress in AI happens not via algorithmic innovations or serendipitous creative breakthroughs, but rather, by scaling computation. Integrating expert human knowledge has mattered little; the innovations that have mattered mattered have been ones making the models amenable to _scaling data and compute_.

For you, this has an important implication: don’t reinvent the wheel. You should have good reason to forsake strong capabilities available readily via API and instead opt for locally-run smaller models. Basing tool-use agents on a quantized 0.5B Qwen model running on a MacBook Air is going to disappoint you relative to calling GPT-4.1 via API. The same goes for fine-tuning — modern in-context capabilities are strong, and the [80/20](https://en.wikipedia.org/wiki/Pareto_principle) approach is to tune the system prompt, integrate file search tools and/or RAG. Do not fine-tune unless you need to.

Of course, in certain regulatory/budgetary situations, it will make sense to develop custom models and/or fine-tune them on proprietary data. Certain organizations, such as law firms and EU government institutions, are strict about their employees leaking sensitive data to API providers — for this reason, these companies have been implementing in-house solutions or entering into Enterprise plans with providers that are specifically designed to take care of data issues. 

## II.2. Security mindset

This section is inspired by a [blogpost](https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html) by security technologist Bruce Schneider explaining Professor Tadayoshi Kohno’s Computer Security class at the University of Washington. Professor Kohno has prompted his students to post “security reviews” of common products and services, which you can read [here](https://secblog.cs.washington.edu).

An illustrative example in the blogpost: 

> The poster described how she was able to retrieve her car after service just by giving the attendant her last name. Now any normal car owner would be happy about how easy it was to get her car back, but someone with a security mindset immediately thinks: “Can I really get a car just by knowing the last name of someone whose car is being serviced?”

The largest takeaway that Schneider’s blog and Kohno’s forum teaches us is to **have an adversarial mindset**. Think of vulnerabilities in your system that a bad actor would love to exploit. Assume data sent over API is not private unless a special agreement has been signed, so anonymize it. Moreover, even well-intentioned collaborations can fail, so **be mindful of vendor lock-in** — you want to retain flexibility and not get tied up to a single API provider. The AI landscape shifts quickly, so you want to have wiggle room when policies and licenses and priorities change, or when a provider goes bankrupt. All of these examples lead us towards realizing that fallbacks are an instrumental consideration when building with systems as powerful, but as jagged and unpredictable as ML systems in production or during development.

There are three excellent heuristics outlined in a [Red Hat blog](https://www.redhat.com/en/blog/secure-design-principles-age-artificial-intelligence) pertaining to AI security:

 **Principle of least privilege.** Your ML systems, chatbots and LLM assistants should have as little access and control as is absolutely necessary for them to perform their function. Controls should be denied by default, and opted-in. Consider how Claude Code, for example, will require permission before executing system-wide commands unless you explicitly disable this.

 **Least common mechanism.** Containerized environments are popular for a reason. You want to limit the blast radius of a failure by ensuring that other functionalities/users have as little riding on the failed component as possible.

 **Psychological acceptability.** Users will bypass security protocols if they are too cumbersome. In general, it should be easier for your users to exercise the safe behavior than the unsafe behavior.

## II.3. Know your stuff

There is no substitute for _understanding_ — it makes you a better engineer and a better entrepreneur.

On an organizational level, it is _your_ responsibility to be aware of the regulations pertaining to your product and the geography of your users. EU AI Act, General Data Protection Regulation (GDPR), California Consumer Privacy Act are not the most exciting bedtime reading, but someone on your team should be rock-solid on what they mean for your users, if applicable.

On a technical level, it’s helpful to think of vibe-coded files and repositories as technical debt that you will have to eventually pay. Just like with real debt, you get immediate liquidity that you will have to compensate with interest, vibe-coding gives you an immediate speedup that will pay its due when you have to implement manual fixes to a 2,000-LOC monster file in 2 months. That’s actually quite a mild case — in a worse scenario, vibe-coding without understanding some security basics can get you quite literally robbed:

[![r/ProgrammerHumor - securityJustInterferesWithVibes](https://substackcdn.com/image/fetch/$s_!f4Gj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F061d3420-dc8d-473a-abc2-ed3f4a0cab21_640x763.png)](https://substackcdn.com/image/fetch/$s_!f4Gj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F061d3420-dc8d-473a-abc2-ed3f4a0cab21_640x763.png)A vibe coder learned the limits of security through vibes ([source](https://www.reddit.com/r/ProgrammerHumor/comments/1jdfhlo/securityjustinterfereswithvibes/))

An extra piece of advice for the more curious among you is to go the extra mile. As understanding breeds innovation, it can prove incredibly fruitful to stay up to date with new libraries, GitHub repos showing new methods, and even the limitless supply of ML ArXiv papers.

# III. Practical Advice

## III.1. Abide to the regulations relevant to you

As these recommendations are aimed at folks building MVPs, I will not talk about things like Data Protection Impact Assessments and Software Development Life Cycle audits. The gist is: **be familiar with regulations pertaining to you**. For example, for US users, you need a HIPAA Business Associate Agreement with your vendors if you’re gonna handle their health data. Similarly, GDPR is a big consideration if in the EU — your users must know when they are interacting with an AI, or that certain content has been AI-generated. Non-compliance can be costly (millions of EUR).

There are some general considerations you want to be on the safe side of:

1. Use the minimal data you need. Recently, a book by a former Facebook director alleged some unhinged ad-targeting strategies by the social media giant whereby [teenagers who had recently deleted selfies were fed ads for beauty products](https://futurism.com/facebook-beauty-targeted-ads). This is a great example of what to avoid.

2. Bias-test your models and/or data. Check for disparate treatment, discrimination, and leakage of human prejudice into your models. 

3. When in doubt, err on the side of asking for user consent. Additionally, allow users to request their data, rectify it, and have it removed if they wish.




This is as far as a non-lawyer as myself will go; I feel far more capable of telling you about the technical considerations below.

## III.2. Repository safety

### Git is your friend

Version control has been a cornerstone of writing software. It shines even more when you are working with LLM tools that can rapidly make drastic changes to your codebase. Commit your changes incrementally

Here is a great, relatively comprehensive [Git cheat sheet by DataCamp](https://www.datacamp.com/cheat-sheet/git-cheat-sheet), and here is a condensed [2-page version by GitHub](https://education.github.com/git-cheat-sheet-education.pdf).

### API key management security

Your API keys should never be hardcoded into your files as strings. Instead, safely store them in an `.env` file, which is then designated to be ignored by Git in the `.gitignore` file in your repository.

## III.3. Know your AIs

### AI capabilities

The landscape is shifting quickly — preferred models for LLM-assisted coding have been changing month-by-month! To have a taste, consider how the programmer’s favorite in the past 12 months — Claude 3.5 Sonnet — was challenged by OpenAI’s o1 (and o1-pro for those able to spare $200 per month) last fall, then by DeepSeek R1 during the January panic, then by Gemini 2.5 Pro’s coding capabilities at long contexts (2 million tokens!) this March, then again in March by o3’s ability to use tools while thinking, before Anthropic again took reclaimed its status with the release of Claude 4 and DeepSeek released a long-anticipated update to their R1 flagship model. 

A good way to be aware of what to use during development or in production is to look at benchmarks. Here are favorites of mine:

  * [SimpleBench](https://simple-bench.com/): difficult trick questions that only require high-school level knowledge, but test common-sense and spatiotemporal reasoning. I’ve found it to correlate well with a model’s level of fluid intelligence. 

  * [LM Arena](https://lmarena.ai/leaderboard): an Elo-based leaderboard based on human preference voting. It includes leaderboards per category (like web dev), which is worth paying attention to for LLM-assisted development. 

  * [ARC-AGI](https://arcprize.org/leaderboard): one of the most important benchmarks, in my opinion. Humans score 100%, and even the best models score below 10%. It measures the degree of fluid intelligence (ability for the models to think on the fly) based on a [well-motivated definition of intelligence](https://arxiv.org/abs/1911.01547) by Francois Chollet as skill-acquisition efficiency. 

  * [EQ-Bench](https://eqbench.com/index.html): measures the emotional intelligence of models during free-form roleplay. There are categories like creative writing and longform writing, which can further help you decide on models to use if your product requires any of these capabilities.




Besides the test scores, make sure to actually test the models yourself. Benchmarks are an imperfect proxy, and model developers [tend to overfit their models](https://www.theverge.com/meta/645012/meta-llama-4-maverick-benchmarks-gaming) to the benchmark at the cost of generalization.

If you’re interested in more Research & Development and AI is a core offering of your startup, stay up to date with ArXiv papers, where the M community is extremely prolific. The [AlphaXiv homepage](https://www.alphaxiv.org/explore) will give you the most popular recent papers, and so will the [HuggingFace Daily Papers page](https://huggingface.co/papers). Following the literature closely is an extremely effective way to get overwhelmed, so thread lightly.

### Prompt injections

There is a herd of Hagglin’ Harrys who will try to fool your user-facing LLMs and give themselves a 200% discount for whatever you’re selling. If Hagglin’ Harry is in possession of dark prompting skills like [certain internet users](https://x.com/elder_plinius), you may be in for a rough time if your customer service LLM can make pricing decisions. Exhaustively test the model, and integrate trigger-happy fallbacks to humans when the model is pushed. Classifiers for unsafe prompting can also be integrated so that unusual prompts never even reach the model (although watch for false-positives here).

## III.4. Vibe coding

### Your stack

Python is the most popular programming language used for machine learning in 2025. Here are some Python libraries that I can recommend:

  * [uv](https://github.com/astral-sh/uv) is a life-changing package manager that you should use instead of `pip`;




[![Shows a bar chart with benchmark results.](https://substackcdn.com/image/fetch/$s_!NTrE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e2364db-c614-4ee9-b393-9652d1cab9f2_496x107.svg)](https://substackcdn.com/image/fetch/$s_!NTrE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e2364db-c614-4ee9-b393-9652d1cab9f2_496x107.svg)

  * [PyTorch](https://pytorch.org/) is the most popular and comprehensive library for deep learning in Python;

  * [Keras](https://keras.io/) might be a preferred option for some, as it provides an intuitive experience that some prefer to PyTorch;

  * [Language Model Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness): if you want to benchmark models that you perhaps fine-tuned or steered or modified in any way, this library makes it easy to run most of the popular benchmarks easily.




There are many other resources in the wider ecosystem that you can benefit from:

  * [HuggingFace](https://huggingface.co/) is the hub for machine learning developers — not only do they host models, datasets and spaces (demos of ML-powered applications), they maintain popular libraries like datasets and transformers, which are widely used in LLM R&D.

  * [OpenRouter](https://openrouter.ai/) provides a single place where you can run inference on LLMs via a unified API, making it easy to manage and switch between models in one place with one credit account.

  * [Weights & Biases](https://wandb.ai/site/) provides a platform to track and log your ML experiments, which is extremely useful if you are collaborating with others, since saving log files locally and tracking them with git can get overwhelming

  * [Prime Intellect](https://www.primeintellect.ai/), [Lambda](https://lambda.ai/), [Hyperbolic Labs](https://hyperbolic.xyz/), [SF Compute](https://sfcompute.com/) and others provide on-demand GPUs that you can rent (prices are up to a couple of dollars per hour, depending on the GPU) for heavy ML workloads.




### Tools for the vibe-coder

The ecosystem for LLM-assisted development provides quite a few options:

  * [Cursor](https://www.cursor.com/), the go-to integrated development environment (IDE) for use with LLMs. It’s extremely well-designed for integrating your repository’s context, and supports both line completions and more agentic capabilities, whereby the LLM can create files and run terminal commands. Alternatives include [GitHub Copilot](https://github.com/features/copilot), [Windsurf](https://windsurf.com/editor), [Replit](https://replit.com/), [v0](https://v0.dev/), [Lovable](https://lovable.dev/) and increasingly more…

  * Terminal tools like Anthropic’s [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) and OpenAI’s [Codex](https://openai.com/index/introducing-codex/). They’re both quite competent, as they integrate in your system seamlessly and understand the needed context. These options, however, are pricey — Codex is only available at the most expensive pricing tier ($200/month), whereas Claude Code is estimated to cost around $6 per developer per day on average. 




The enthusiastic vibe-coder should pay attention to a few things. Most importantly, caution should be a first-level priority — models can be overconfident, hallucinate and break your working code. Note that virtually every model you use to vibe-code will not be up-to-date with the every latest library — be mindful of the so-called knowledge cut-off. To deal with this, you can give links to documentation pages so the model knows the right implementation. Furthermore, a best practice for a responsible coder is to **limit your vibe coding to incremental changes to your codebase** that you can easily fix and reverse if need be. Asking Claude to one-shot an entire repository is not a great idea. If you want to do that, you should take more steps to develop a software 

A large part of LLM-assisted software development is managing context. LLMs need information about your repository, reference implementations, class/function definitions — **be meticulous about giving the model the necessary context** for optimal results. Context windows of LLMs — how much text can go in one conversation — are limited, typically to around 100,000 words. Although this can sound like a lot, a solid chunk of that is already taken up by a model’s system instructions, and the model’s “thinking”, which is often extensive, contributes significantly to filling up the context window. Therefore, a best practice is to **start new conversations per each new feature** you’re implementing, providing the needed context every time. Latency (how long it takes to generate) and quality both suffer at long contexts, so **avoid asking for a new edit after 15 conversation turns**.

### Prompt sensitivity 

LLMs are extremely prompt-sensitive by default. It’s worth familiarizing yourself with what kind of prompting seems to work better — this is mostly a matter of trial and error and developers tend to get a sense for it over time. A useful heuristic for prompting reasoning models — which virtually all state-of-the-art coding models currently are — is to give them well-defined, exact goals. The reason this works is the way the models were post-trained, which was through reinforcement learning — when the model writes working code, it gets taught to do that more.

An insightful way to think about prompting reasoning models was [shared](https://x.com/gdb/status/1878489681702310392) by Greg Brockman:

[![Image](https://substackcdn.com/image/fetch/$s_!ENOx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fadd1e793-189f-49c9-969b-c63852d1e8a1_1456x1212.jpeg)](https://substackcdn.com/image/fetch/$s_!ENOx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fadd1e793-189f-49c9-969b-c63852d1e8a1_1456x1212.jpeg)How an o1 prompt should look like ([source](https://x.com/daniel_mac8/status/1878283032215408886))

## III.5. LLMs in production

The usual recommendations apply — integrate fallbacks everywhere you can, abide by the principle of least privilege (don’t let the model have more control than necessary). On top of that, I would like to highlight two specific considerations that you may find yourself debating.

### To fine-tune or not to fine-tune

Bigger models tend to be better — scale is a necessary, but not a sufficient criterion for model quality. The bigger models hosted by API providers often have great general capabilities that allow you to skip fine-tuning. In fact, I recommend only fine-tuning when you know you can devote substantial attention to it and/or if itss your core product. Otherwise, a large API model will be a better choice 9 out of 10 times — you won’t have to worry about GPU costs, inference optimizations, data curation/debiasing and optimal fine-tuning hyperparameters to prevent [catastrophic forgetting](https://arxiv.org/abs/2308.08747). 

### Structured outputs

LLMs are surprisingly good at structured outputs. Turning unstructured text, like a doctor’s report or a bunch of reviews, into structured, analysis-ready data is a task well within the realm where LLMs are comfortable! Some APIs, like OpenAI’s, support a “JSON mode”, where the model returns outputs in JSON mode. This is a situation where you don’t even have to go with the flashy expensive models — using a new small model like GPT-4.1-mini has anecdotally yielded good, stable structured output results in some recent experiments of mine.

One caveat is that structured outputs can harm the performance of reasoning models. Luckily, a new open-source model fresh out of the oven is in for the rescue: Osmosis have trained Osmosis-Structure-0.6B — an ultra-small model to convert a reasoner’s unstructured output into a structured one. That way, you let the reasoner think freely, unencumbered by the output format, and then use a way smaller model to format the response appropriately.

# IV. Recap

Thanks for sticking by to the end! The contents above can be boiled down to 2 takeaways:

  1.  **Cultivate trust** : limit AI control to the bare minimum, limit the blast radius of failures, integrate fallbacks obsessively, test everything, give users access and control over their data

  2.  **Be situationally-aware** : the tools can be excellent scaffolds, and they can also bloat up your repository into an incomprehensible mess. Be meticulous about understanding your core functionality; be bold to experiment, but disciplined to find holes and patch them




# Check out Manifold Machines

We are working on a few things:

  1. [Synglot](https://github.com/manifold-machines/synglot), a synthetic data & translation toolkit — the goal is to make it easy to bulk translate & generate datasets in low-resource languages like Macedonian;

  2. Creating novel, high-quality datasets in Macedonian ([released](https://huggingface.co/datasets/ilijalichkovski/gsm8k_mk) and unreleased), accessible to the wider community for open-source experiments;

  3. Training Macedonian reasoners using reinforcement learning — we’re laying the groundwork with the dataset efforts, as well as some training innovations.




Get in touch if you want to get involved!
