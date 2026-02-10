// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "Thoughts on AI, machine learning, philosophy, and more — by Ilija Lichkovski.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Undertakings, past and present, mostly related to research and open-source software.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Publications by Ilija Lichkovski — research papers on AI safety, mechanistic interpretability, reinforcement learning, and LLM agents.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-media",
          title: "media",
          description: "Press, talks, and appearances.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/media/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "CV of Ilija Lichkovski — ML engineer and researcher, experience in AI safety, reinforcement learning, and applied machine learning.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-a-humanist-critique-of-technological-determinism",
        
          title: "A humanist critique of technological determinism",
        
        description: "The future is unsolved.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/a-humanist-critique-of-technological-determinism/";
          
        },
      },{id: "post-how-to-be-intelligent-about-artificial-intelligence",
        
          title: "How to be intelligent about artificial intelligence",
        
        description: "Recording and notes from a talk I gave at the Mostovi Hackathon on AI security in development and production.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/how-to-be-intelligent-about-artificial-intelligence/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-our-hackathon-project-alongside-jeremias-ferrao-has-won-the-3rd-place-at-the-physics-x-ai-safety-grand-challenge-by-apart-research",
          title: 'Our hackathon project alongside Jeremias Ferrao has won the 3rd place at the...',
          description: "",
          section: "News",},{id: "news-our-collaboration-with-jeremias-ferrao-matthijs-van-der-lende-and-clement-neo-has-been-accepted-as-a-spotlight-at-the-mechanistic-interpretability-workshop-at-neurips-2025",
          title: 'Our collaboration with Jeremias Ferrao, Matthijs van der Lende and Clement Neo has...',
          description: "",
          section: "News",},{id: "news-our-paper-on-evaluating-ai-agent-legal-compliance-in-collaboration-with-alexander-müller-mariam-ibrahim-and-tiwai-mhundwa-has-been-accepted-to-regml-neurips-2025",
          title: 'Our paper on evaluating AI agent legal compliance, in collaboration with Alexander Müller,...',
          description: "",
          section: "News",},{id: "news-starting-an-rl-residency-at-prime-intellect-where-i-ll-be-working-on-a-novel-approach-for-imparting-efficient-weight-updates-of-foundation-models",
          title: 'Starting an RL residency at Prime Intellect, where I’ll be working on a...',
          description: "",
          section: "News",},{id: "news-demo-ed-the-makstat-agent-to-the-national-statistical-office-in-macedonia-after-managing-a-team-of-undergraduate-engineers-to-build-one-of-the-first-examples-of-ai-enabled-statistical-office-tooling-in-europe",
          title: 'Demo-ed the MAKSTAT agent to the National Statistical Office in Macedonia after managing...',
          description: "",
          section: "News",},{id: "news-guest-lecture-at-the-data-challenges-in-ai-systems-course-at-the-university-of-groningen-slides",
          title: 'Guest lecture at the Data Challenges in AI Systems course at the University...',
          description: "",
          section: "News",},{id: "projects-39-aha-moments-39-during-reinforcement-learning",
          title: '&amp;#39;Aha moments&amp;#39; during reinforcement learning',
          description: "Investigating phase transitions during Group Relative Policy Optimization",
          section: "Projects",handler: () => {
              window.location.href = "/projects/aha-moments-rl/";
            },},{id: "projects-applied-vibes-research",
          title: 'Applied vibes research',
          description: "Exploring cultural insights through embedding geometry",
          section: "Projects",handler: () => {
              window.location.href = "/projects/applied-vibes/";
            },},{id: "projects-esa-athena-mission",
          title: 'ESA ATHENA mission',
          description: "Investigating calibration anomalies for the X-ray space telescope",
          section: "Projects",handler: () => {
              window.location.href = "/projects/athena-esa/";
            },},{id: "projects-compositional-reasoning",
          title: 'Compositional reasoning',
          description: "Benchmarking LLM generalization with tunable difficulty axes",
          section: "Projects",handler: () => {
              window.location.href = "/projects/compositional-reasoning/";
            },},{id: "projects-eu-agent-bench",
          title: 'EU-Agent-Bench',
          description: "Expert-curated, verifiable benchmark for LLMs in an EU context",
          section: "Projects",handler: () => {
              window.location.href = "/projects/eu-agent-bench/";
            },},{id: "projects-macedonian-multimodal-ai-infrastructure",
          title: 'Macedonian multimodal AI infrastructure',
          description: "Building open-source LLM infrastructure for the Macedonian language",
          section: "Projects",handler: () => {
              window.location.href = "/projects/macedonian-multimodal-ai/";
            },},{id: "projects-ai-agent-for-the-state-statistical-office",
          title: 'AI Agent for the State Statistical Office',
          description: "Agentic system for policymakers and journalists to extract insights from national statistics",
          section: "Projects",handler: () => {
              window.location.href = "/projects/makstat-agent/";
            },},{id: "projects-mitochondria-under-distress",
          title: 'Mitochondria under distress',
          description: "Investigating mitochondrial dysfunction using solid-state NMR",
          section: "Projects",handler: () => {
              window.location.href = "/projects/mitochondria-nmr/";
            },},{id: "projects-policy-optimization-over-sae-features",
          title: 'Policy optimization over SAE features',
          description: "Using RL to steer sparse autoencoder features as an alternative to RLHF",
          section: "Projects",handler: () => {
              window.location.href = "/projects/sae-policy-optimization/";
            },},{id: "projects-synglot",
          title: 'Synglot',
          description: "A Python library for translating and generating large datasets",
          section: "Projects",handler: () => {
              window.location.href = "/projects/synglot/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%69%6C%69%6A%61.%6C%69%63%68%6B%6F%76%73%6B%69@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/carnot_cyclist", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/ilijalichkovski", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/ilija-lichkovski", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=sOj-c3EAAAAJ", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
