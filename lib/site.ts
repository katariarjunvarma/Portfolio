export const siteConfig = {
  name: "Arjun Varma",
  title: "AI & Machine Learning Engineer",
  location: "Phagwara, Punjab (LPU)",
  university: "Lovely Professional University",
  degree: "B.Tech CSE (AI & ML Specialization)",
  graduationYear: "2027",
  cgpa: "8.03",
  brandIdentity:
    "Technically sharp, research-oriented AI/ML engineer building intelligent systems with computer vision, signal analysis, and recommendation logic.",
  tagline:
    "Engineering intelligent systems with AI-native thinking and product-level precision.",
  shortBio:
    "I build AI-powered systems — from face recognition attendance to stock signal generation — combining machine learning fundamentals, computer vision, and modern AI engineering workflows.",
  heroStatus: "Currently building",
  heroStatusValue: "Intelligent Systems.",
  domain: "arjunvarma.in",
  url: "https://arjunvarma.in",
  email: "arjunvarma5110@gmail.com",
  phone: "+91-9849112235",
  github: "https://github.com/katariarjunvarma",
  linkedin: "https://www.linkedin.com/in/karjunvarma",
  leetcode: "https://leetcode.com/u/karjunvarma/",
  resumePath: "/resume-katari-arjun-varma.pdf",
  ogImage: "/og-image.svg",
  availableForWork: true,
  keywords: [
    "Katari Arjun Varma",
    "Arjun Varma AI Engineer",
    "Arjun Varma LPU",
    "AI ML Engineer India",
    "Computer Vision Python",
    "Face Recognition OpenCV",
    "Stock Market AI Signals"
  ]
} as const;

export const sectionLinks = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Certifications", href: "#showcase", id: "showcase" },
  { label: "Blog", href: "#blog", id: "blog" },
  { label: "Contact", href: "#contact", id: "contact" }
] as const;

export const heroRotatingStatuses = [
  "Building AI Systems",
  "Training ML Models",
  "Exploring Computer Vision"
] as const;

export const recruiterSummary =
  "AI/ML engineering student at LPU building intelligent systems from scratch — computer vision attendance systems, stock signal platforms, and elective recommendation engines. I focus on applying ML fundamentals to real-world problems with clean architecture and deployed results.";

export const focusAreas = [
  {
    title: "Machine Learning",
    items: ["Supervised Learning", "Unsupervised Learning", "Classification", "Regression", "Signal Analysis"]
  },
  {
    title: "Computer Vision",
    items: ["OpenCV", "Face Recognition (LBPH)", "Image Processing", "Webcam Integration", "Ambiguity Detection"]
  },
  {
    title: "Programming",
    items: ["Python", "C", "C++"]
  }
] as const;

export const workProjects = [
  {
    name: "AV Capitals",
    tagline: "Full-stack AI-powered stock market signal platform",
    description:
      "Developing a full-stack AI-powered stock market platform with BUY/SELL/HOLD signal generation using RSI, MACD, and moving average indicators for real-time portfolio tracking. Engineered a React 18 frontend with Python FastAPI backend, integrating JWT authentication with TOTP 2FA, bcrypt password hashing, and SQLAlchemy ORM. Implementing a paper trading engine with portfolio dashboard, backtesting module, risk scoring, news sentiment analysis, and price alerts with Claude AI integration for live signal generation.",
    tech: ["React 18", "FastAPI", "Python", "Chart.js", "SQLAlchemy", "JWT", "TOTP 2FA"],
    image: "/projects/av-capitals.png",
    repo: "#",
    demo: "#",
    period: "Mar '26 – Present"
  },
  {
    name: "CampusOne",
    tagline: "AI campus management with face recognition attendance",
    description:
      "Designed an AI-powered campus management system for automated face recognition attendance using OpenCV LBPH, supporting webcam input, photo upload, and manual entry. Built a full-stack Django 5.x application with role-based access for 4 user roles — Admins, Faculty, Students, and Vendors — featuring food pre-ordering, makeup class scheduling, and resource analytics. Deployed on Render with a PostgreSQL production database and persistent media storage, enabling live access with 99.9% uptime.",
    tech: ["Django 5.x", "OpenCV", "PostgreSQL", "Bootstrap", "Python"],
    image: "/projects/campusone.png",
    repo: "https://github.com/katariarjunvarma/CampusOne",
    demo: "https://campusone-u5ro.onrender.com/accounts/login/",
    period: "Feb '26 – Mar '26"
  },
  {
    name: "Elective Recommendation System",
    tagline: "Smart course recommendations for 100+ courses based on student profiles",
    description:
      "Built a web-based elective recommendation platform suggesting from over 100 courses based on students' academic profiles, interests, and career goals — with seat availability tracking and community course rankings. Developed a responsive React UI using TypeScript and shadcn-ui with real-time feedback, admin dashboards, registration approval workflows, and guest exploration mode with sub-second load times. Programmed configurable recommendation logic with backup and restore capabilities, deployed on Vercel for scalable access.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui"],
    image: "/projects/elective.png",
    repo: "https://github.com/katariarjunvarma/elective-guide",
    demo: "https://electiveguide.vercel.app/select-university",
    period: "Oct '25 – Dec '25"
  },
  {
    name: "Smart Text Editor",
    tagline: "Desktop text editor with advanced editing features",
    description:
      "Enhanced a desktop-based text editor with open/save, search with live highlighting, replace popup, undo/redo, theme toggle, and real-time status indicators. Implemented using Python and Tkinter, integrating a scrollable text area, font size selector, and menu-driven UI for clean navigation. Completed as a fully functional GUI editor during hands-on training at Board Infinity.",
    tech: ["Python", "Tkinter"],
    image: "/projects/smart-text-editor.png",
    repo: "https://github.com/katariarjunvarma/TextEditorSmart",
    demo: "#",
    period: "Jun '25 – Jul '25"
  }
] as const;

export const blogPosts = [
  {
    slug: "building-a-face-recognition-system",
    title: "Building a Face Recognition Attendance System",
    category: "Computer Vision",
    readTime: "7 min read",
    date: "Mar 28, 2026",
    excerpt:
      "How I built automated face recognition attendance with OpenCV LBPH, ambiguity detection, and multi-input support — and what I learned shipping it to production.",
    content: [
      "## The Problem With Manual Attendance",
      "Every college has the same problem. Attendance is marked manually, proxies happen, and by the time anyone catches it, the semester is half over. When I started building CampusOne, I wanted to solve this properly — not just digitise a clipboard, but actually automate it using computer vision.",
      "The constraint was real: this had to run on a basic server, work with regular webcams, and not require expensive GPU infrastructure. That ruled out most deep learning approaches immediately.",
      "## Why I Chose LBPH",
      "LBPH (Local Binary Pattern Histograms) is a classical face recognition algorithm. It works by looking at the texture patterns around each pixel relative to its neighbours, encoding them into histograms, and using those histograms as a face signature. It is lightweight, runs in real-time on CPU, and trains in seconds even with a small dataset.",
      "I had looked at FaceNet and DeepFace, but both required either pretrained models that were too heavy for my deployment budget, or large datasets that students obviously couldn't provide on day one. LBPH let me start recognising faces with as few as 5-10 photos per person.",
      "## The Ambiguity Problem",
      "The hardest part wasn't recognition — it was handling uncertainty. LBPH gives you a confidence distance. A low distance means high confidence. But where do you draw the line? If two students look similar, or the lighting is bad, the system can confuse them.",
      "My solution: anything above a confidence threshold gets flagged for manual review instead of being marked automatically. The system never guesses when it isn't sure. This felt like the right tradeoff — a bit of extra manual work on edge cases beats wrong attendance records.",
      "## Multi-Input Strategy",
      "I built three fallback modes: live webcam capture, photo upload, and manual entry by the faculty. The idea is that the system should always have a path forward. Webcam fails? Upload a photo. Camera not available? Mark manually. This redundancy is what made the system actually deployable instead of just a demo.",
      "## The 4-Role System",
      "CampusOne ended up being more than just attendance. Admins manage everything — users, reports, system config. Faculty handle attendance, schedule makeup classes, and generate reports. Students view their own records, check timetables, and pre-order food from vendors. Vendors manage food orders and see demand data.",
      "Building role-based access in Django was straightforward, but getting the UX right for four completely different user types took a lot of iteration. Each role needed its own mental model of the system.",
      "## Shipping to Production",
      "I deployed on Render with a PostgreSQL database and persistent media storage for face images. The free tier has cold start delays, but for a college system where most usage is clustered around class times, it works fine.",
      "The thing I underestimated most was data management — making sure face images are stored securely, linked correctly to user accounts, and don't bloat the storage. I ended up building a cleanup routine that removes orphaned images when a student is deleted.",
      "## What I'd Do Differently",
      "Honestly, I'd add a confidence calibration step during onboarding. Currently the threshold is global. A better approach would be per-student calibration — if someone consistently scores 55 where others score 30, their threshold should reflect that. That's the next upgrade."
    ]
  },
  {
    slug: "stock-signals-with-technical-analysis",
    title: "Generating Stock Signals with Technical Analysis",
    category: "AI",
    readTime: "6 min read",
    date: "Mar 20, 2026",
    excerpt:
      "How RSI, MACD, and moving averages combine into a BUY/SELL/HOLD signal engine — and why removing emotional bias from trading decisions actually matters.",
    content: [
      "## Why I Started Building AV Capitals",
      "I got interested in markets during my second year. Not to trade — I had no capital — but because the signal processing problem fascinated me. Prices move based on thousands of human decisions. Can you extract a reliable signal from that noise? That question is what pushed me to build AV Capitals.",
      "## RSI: Reading Momentum",
      "RSI (Relative Strength Index) is a momentum oscillator that runs between 0 and 100. Above 70, the asset is considered overbought — price has moved too fast, a correction may follow. Below 30, it is oversold — potentially undervalued, a bounce may be near.",
      "The key word is 'may'. RSI alone is not a trading system. An overbought RSI in a strong uptrend can stay overbought for weeks. That's why RSI needs confirmation from other indicators.",
      "## MACD: Trend and Momentum Together",
      "MACD (Moving Average Convergence Divergence) tracks the relationship between two exponential moving averages — typically 12-day and 26-day. The signal line is a 9-day EMA of the MACD itself. When MACD crosses above the signal line, it's a bullish crossover. Below the signal line, bearish.",
      "Combined with RSI, MACD gives you both momentum direction and trend confirmation. If RSI is coming up from oversold territory AND MACD is doing a bullish crossover, that's a much stronger BUY signal than either alone.",
      "## The Signal Engine",
      "My signal engine scores each indicator and combines them with configurable weights. RSI contributes to overbought/oversold classification. MACD crossovers contribute trend direction. Moving averages (50-day and 200-day) contribute long-term support and resistance context. The output is a BUY, SELL, or HOLD rating with a confidence percentage.",
      "The goal is not to predict the market — it's to surface rule-based signals consistently. No emotional bias, no second-guessing, no FOMO.",
      "## Backtesting and Paper Trading",
      "Before trusting any signal, you need to test it against historical data. I built a backtesting module that runs the signal engine against 1-5 years of price history and shows you what the hypothetical returns would have been. This gives you a realistic sense of how reliable the signals are for a given asset.",
      "Paper trading lets you run the system live against real market data without real money. It's the safest way to validate that the system works in current market conditions before committing capital.",
      "## Claude AI Integration",
      "I've been integrating Claude AI to generate natural language summaries of the signal analysis — something like 'RSI is approaching oversold territory at 34, MACD shows weakening bearish momentum, suggesting a potential reversal. Short-term outlook cautiously bullish.' This makes the data accessible without requiring users to interpret raw indicators.",
      "The technical analysis is still the source of truth. Claude just makes it readable."
    ]
  },
  {
    slug: "ai-native-engineering-as-a-student",
    title: "AI-native Engineering as a Student",
    category: "Engineering",
    readTime: "5 min read",
    date: "Mar 15, 2026",
    excerpt:
      "What it actually means to use AI as a student engineer — not as a shortcut, but as a way to build faster without losing your grip on the fundamentals.",
    content: [
      "## What AI-Native Actually Means",
      "When people hear 'AI-native engineering', they usually picture someone who pastes everything into ChatGPT and ships whatever comes out. That's not engineering — that's copy-paste with extra steps.",
      "AI-native, to me, means using AI as a force multiplier at every stage of the engineering process — not as a replacement for thinking. The distinction matters more than anything else.",
      "## The Wrong Way",
      "I see this a lot. A student gets stuck on a problem, pastes the entire thing into an AI tool, gets code back, pastes it into their project, and moves on. Repeat. By the end of the project, they have working code they don't understand and can't debug when it breaks in production.",
      "That might get you through a hackathon. It won't get you through a real engineering problem, an interview, or a job that expects you to own what you ship.",
      "## The Right Way",
      "My workflow: frame the problem first, always. Write down what you're trying to solve, what constraints exist, and what a good solution looks like. Then use AI to generate scaffolding — the boilerplate, the structure, the first draft. Then review it line by line. Understand every decision. Modify what doesn't fit. Write tests. Measure the output.",
      "The AI saves me hours on the parts that don't require deep thought. The parts that do require deep thought — architecture decisions, tradeoff analysis, debugging — I own those completely.",
      "## How It Changes the Pace",
      "The honest truth is I build significantly faster than I did two years ago. Not because I understand less, but because I spend less time on things that aren't worth spending time on. Setting up a Django project, writing boilerplate REST endpoints, generating migration files — these used to take hours. Now they take minutes.",
      "That freed-up time goes into the actual hard problems: how does the recommendation logic handle conflicting constraints? What happens when the face recognition confidence is borderline? How do I structure the signal engine so it's testable and configurable?",
      "## Staying Sharp",
      "The risk of AI-assisted development is that you stop building the mental muscles you need. I counter this by making sure I can always explain every piece of code I ship. If I can't explain why a line of code is there, it doesn't go in.",
      "I also still build things from scratch sometimes — just to stay calibrated. It keeps me honest about what I actually know versus what I've outsourced to tooling.",
      "## The Bottom Line",
      "AI is the best tool available to a student engineer right now. Use it. But use it the way a senior engineer would use Stack Overflow — as a resource, not as a brain transplant. The understanding has to be yours."
    ]
  },
  {
    slug: "system-thinking-in-machine-learning",
    title: "System Thinking in Machine Learning",
    category: "Machine Learning",
    readTime: "6 min read",
    date: "Feb 15, 2026",
    excerpt:
      "Why the model is almost never the bottleneck — and how architecture and constraint modeling decide real-world ML outcomes.",
    content: [
      "## The Model Selection Trap",
      "Every time I see a machine learning project fail in production, the problem is almost never the model. The model usually works fine. What fails is everything around it — the data pipeline, the serving infrastructure, the failure handling, the feedback loop.",
      "I used to fall into this trap myself. Spend 80% of the time picking the right algorithm, tuning hyperparameters, optimising accuracy by half a percent. Then deploy into a system where the data pipeline occasionally sends corrupted inputs and the whole thing breaks silently.",
      "## What Actually Determines ML Quality",
      "From what I've built — recommendation systems, signal generators, recognition pipelines — the deciding factors are almost always: data quality, failure handling, and observability.",
      "Data quality means your training distribution actually matches your production distribution. If you train on clean, curated samples and deploy against messy real-world data, you'll get garbage outputs that look like they're working.",
      "Failure handling means the system degrades gracefully. In my face recognition system, when confidence is low, it doesn't guess — it flags for review. That's a systems decision, not a model decision.",
      "Observability means you can see what the system is doing in production. Without logging inputs, outputs, and confidence scores, you're flying blind.",
      "## Data Contracts",
      "A data contract is an explicit agreement about what data a component will receive and what it will produce. It sounds obvious but almost nobody enforces it. When I built the signal engine for AV Capitals, every function has a type-checked input and output. No silent type coercions, no implicit conversions.",
      "This feels like overhead until the day you refactor something and the type checker catches three downstream breakages before you even run the code.",
      "## Constraint Modeling",
      "In the elective recommendation system, the model can't just recommend whatever scores highest. Seats are limited. Prerequisites must be satisfied. Faculty approval is required for some electives. These constraints have to be modelled explicitly — not learned from data, not inferred.",
      "Getting this wrong means recommending courses students can't actually take. Constraints are first-class citizens in any real system.",
      "## Architecture Coherence",
      "When the architecture is coherent — data contracts enforced, failures handled explicitly, constraints modelled correctly — changing the model becomes almost trivial. Swap LBPH for a deep learning embedder? The rest of the system doesn't care. Adjust RSI weights in the signal engine? The backtesting module runs automatically.",
      "That's the goal. Systems that are easy to improve because the fundamentals are solid."
    ]
  },
  {
    slug: "recommendation-systems-for-students",
    title: "Recommendation Systems for Academic Use",
    category: "Machine Learning",
    readTime: "5 min read",
    date: "Dec 12, 2025",
    excerpt:
      "Building an elective recommendation engine that actually works — why basic collaborative filtering isn't enough and how hard constraints change everything.",
    content: [
      "## The Problem With Manual Course Selection",
      "Every semester, students in my college spend days trying to figure out which electives to pick. There's no central system. You ask seniors, check old syllabi, guess based on the course name, and hope for the best. Half the time you end up in something that doesn't align with what you actually want to do after graduation.",
      "That's the problem the Elective Recommendation System is built to solve. Not just 'here are popular courses' — but 'here are courses aligned with your profile, that have available seats, that fit your schedule, that faculty have approved.'",
      "## Why Collaborative Filtering Alone Doesn't Work",
      "Collaborative filtering says: 'Users like you picked X, so you might like X.' For Netflix, this works great. For academic electives, it breaks immediately.",
      "If everyone in your batch with similar CGPA and interests picked the same three electives, and those electives are now full, the recommendation is useless. Collaborative filtering doesn't know about seat limits. It doesn't know about prerequisites. It doesn't know about faculty approval workflows.",
      "Real academic recommendation needs hard constraints baked in, not bolted on after.",
      "## The Constraint Layer",
      "I built a constraint layer that runs after the scoring model. Before any elective surfaces as a recommendation, it checks: are seats available? Does the student meet the prerequisites? Is the elective approved for this batch? Has the student already registered for something that conflicts?",
      "Only electives that pass all constraints are shown. The recommendation score determines the order, but the constraints determine eligibility.",
      "## The Configurable Logic",
      "Different universities weight things differently. Some care more about CGPA alignment. Some weight career-path fit. Some weight community popularity. I built a configurable admin panel where weightings can be adjusted without touching the codebase.",
      "This felt over-engineered at first. But it turned out to be the thing that made the system actually adoptable. Admins need to trust the logic before they trust the output.",
      "## Community Rankings",
      "One feature I'm proud of: community course rankings. Students can rate electives after completing them. These ratings feed into the recommendation score with a configurable weight. It's like a Yelp review layer on top of the academic logic.",
      "The data is thin at first — obviously. But even 5-10 reviews per course is enough to surface patterns. 'This course sounds great on paper but the exams are brutal' is information a GPA-optimising student needs.",
      "## What I Learned",
      "The technical side was actually the easier part. The harder part was understanding what students, faculty, and admins each needed from the system — and designing an interface that worked for all three without confusing anyone.",
      "Building for multiple user types forced me to think much more carefully about information architecture and workflow design than any purely technical project had before."
    ]
  },
  {
    slug: "the-art-of-prompt-engineering",
    title: "The Art of Prompt Engineering",
    category: "AI",
    readTime: "7 min read",
    date: "Nov 5, 2025",
    excerpt:
      "Why prompt engineering is more like software engineering than magic — and how to approach it systematically instead of hoping for the best.",
    content: [
      "## It's Not About Magic Words",
      "There's a lot of mysticism around prompt engineering. People share 'power prompts' like they're cheat codes. Add 'think step by step' and the model gets smarter. Tell it 'you are an expert' and the output improves. Some of this is real. Most of it is folk knowledge without a model of why it works.",
      "I've been using AI models heavily for over a year now — in my projects, in my workflow, in my research. Here's what I actually believe: prompt engineering is software engineering applied to language model inputs. The same principles apply.",
      "## Treat Prompts Like Code",
      "The first shift is treating prompts as artefacts that need to be maintained, tested, and versioned — not as one-off strings you type and forget.",
      "When I integrated Claude into AV Capitals for signal summaries, I didn't write one prompt and ship it. I wrote a prompt, tested it against 20 different market scenarios, documented what broke, iterated. The current prompt is version 4 of something that looked completely different at the start.",
      "Version your prompts. Test them against real inputs. Know exactly what they do and don't handle well.",
      "## Understand Model Behavior, Not Just Model Output",
      "Good prompts come from understanding how the model processes your input, not just observing what it outputs. Models are pattern completers. They predict the most likely continuation of your input based on training. If your prompt looks like the beginning of a high-quality response, the completion is more likely to be high-quality.",
      "This is why role assignment works. 'You are a senior software engineer' shifts the predicted completion toward how a senior engineer would write — not because the model becomes a senior engineer, but because that framing biases the output distribution.",
      "## Chain of Thought",
      "For complex tasks, asking the model to reason step by step before giving an answer genuinely improves output quality. This isn't magic — it's giving the model space to work through the problem before committing to an answer.",
      "The practical version: instead of 'What is the signal for this stock?', ask 'First analyse the RSI value and what it indicates. Then analyse the MACD crossover. Then combine both signals and give a BUY/SELL/HOLD recommendation with reasoning.' The output is more accurate and more trustworthy.",
      "## Structured Outputs",
      "One of the most underused techniques is asking for structured output explicitly. 'Respond with a JSON object containing: signal (BUY/SELL/HOLD), confidence (0-100), reasoning (string).' This makes downstream processing trivial and makes testing much easier.",
      "When you know exactly what format to expect, you can validate it, parse it, and use it programmatically. Freeform output is fine for human readers. Systems need structure.",
      "## When Prompting Isn't Enough",
      "There are problems that prompting genuinely cannot solve. If the model doesn't have the knowledge, better prompting won't create it. If the task requires real-time data, prompting a static model won't help. If you need 100% reliable structured output in a critical system, you need validation logic outside the prompt.",
      "Prompt engineering is a powerful tool. It's not a substitute for proper system design. Know when to use it and when to reach for something else.",
      "## The Practical Takeaway",
      "Write prompts like you write code. Test them. Iterate. Understand why they work. Document the edge cases. And never ship a prompt into a system you haven't stress-tested against real inputs. That's it. There's no magic."
    ]
  }
] as const;

export const certifications = [
  {
    title: "Mendix Rapid Developer Certification",
    issuer: "Mendix",
    date: "Mar 2026",
    description: "Certified proficiency in building enterprise-grade applications on the Mendix low-code platform.",
    image: "/certs/mendix.png",
    verifyUrl: "#"
  },
  {
    title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    issuer: "Oracle",
    date: "Aug 2025",
    description: "Validates knowledge of AI services and solutions on Oracle Cloud Infrastructure platform.",
    image: "/certs/oracle-ai.png",
    verifyUrl: "#"
  },
  {
    title: "HackerRank Python Certification",
    issuer: "HackerRank",
    date: "Nov 2025",
    description: "Verified Python programming skills covering data structures, algorithms, and problem solving.",
    image: "/certs/hackerrank-python.png",
    verifyUrl: "#"
  },
  {
    title: "Design and Analysis of Algorithms",
    issuer: "NPTEL",
    date: "Apr 2025",
    description: "Rigorous IIT-backed study of algorithm design, complexity analysis, and optimization strategies.",
    image: "/certs/nptel-algorithms.png",
    verifyUrl: "#"
  },
  {
    title: "Machine Learning and NLP Basics",
    issuer: "Coursera",
    date: "Dec 2025",
    description: "Foundations of machine learning algorithms and natural language processing techniques.",
    image: "/certs/coursera-ml-nlp.png",
    verifyUrl: "#"
  },
  {
    title: "Machine Learning and Image Processing",
    issuer: "thingQbator RGIPT",
    date: "Dec 2025",
    description: "Hands-on training in ML models and computer vision for real-world image analysis tasks.",
    image: "/certs/thingqbator-ml.png",
    verifyUrl: "#"
  },
  {
    title: "ChatGPT-4 Prompt Engineering: Generative AI & LLM",
    issuer: "Infosys Springboard",
    date: "Jul 2025",
    description: "Advanced prompt design for LLMs, ChatGPT-4, and generative AI application development.",
    image: "/certs/infosys-prompt-eng.png",
    verifyUrl: "#"
  },
  {
    title: "Python Programming Internship",
    issuer: "Oasis Infobyte",
    date: "May 2025",
    description: "Applied Python development through real-world internship projects and deliverables.",
    image: "/certs/oasis-python.png",
    verifyUrl: "#"
  }
] as const;

export const keyMetrics = [
  {
    label: "Projects Built",
    value: 4,
    suffix: "+",
  },
  {
    label: "Certifications",
    value: 8,
    suffix: "+",
  },
  {
    label: "AI/ML Focus",
    value: 100,
    suffix: "%",
  }
] as const;

export const techStackStrip = [
  // Languages & Core
  "Python", "C", "C++", "JavaScript", "TypeScript", "HTML", "CSS", "SQL",
  // AI/ML Libraries
  "TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", "NumPy", "Pandas", "Matplotlib", "OpenCV",
  // AI/ML Concepts
  "Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision",
  "Reinforcement Learning", "Fine-tuning", "Prompt Engineering", "RAG", "LLMs",
  "Regression", "Clustering", "Feature Engineering", "Model Deployment",
  // Backend & APIs
  "FastAPI", "Django", "React", "Tailwind CSS", "Bootstrap",
  "REST APIs", "JWT Authentication", "SQLAlchemy", "bcrypt", "TOTP 2FA",
  // Databases & DevOps
  "PostgreSQL", "MySQL", "Git", "GitHub", "Vercel", "Render",
  "Jupyter Notebook", "VS Code", "Linux",
  // Domain Skills
  "Face Recognition", "LBPH", "Recommendation Systems", "Signal Analysis",
  "Data Pipelines", "Model Training", "API Integration", "Claude AI", "Backtesting"
] as const;

export const techUsageByProject: Record<string, string> = {
  Python: "AV Capitals, CampusOne, Smart Text Editor",
  FastAPI: "AV Capitals backend API",
  Django: "CampusOne full campus system",
  OpenCV: "CampusOne face recognition attendance",
  "Chart.js": "AV Capitals portfolio dashboard",
  React: "AV Capitals frontend, Elective Recommendation System",
  TypeScript: "Elective Recommendation System",
  PostgreSQL: "CampusOne production database on Render",
  SQLAlchemy: "AV Capitals ORM layer",
  JWT: "AV Capitals authentication (TOTP 2FA)",
  Tkinter: "Smart Text Editor GUI"
};

export const currentlyExploring = [
  {
    title: "LLM Integration",
    description: "Integrating Claude AI for live stock signal generation and natural language portfolio insights in AV Capitals.",
    relatedProject: "AV Capitals",
    href: "#projects"
  },
  {
    title: "Sentiment Analysis",
    description: "News sentiment analysis pipeline feeding into BUY/SELL/HOLD signal confidence scoring.",
    relatedProject: "AV Capitals",
    href: "#projects"
  },
  {
    title: "Deep Learning for CV",
    description: "Upgrading from LBPH to deep learning face embeddings for higher accuracy attendance recognition.",
    relatedProject: "CampusOne",
    href: "#projects"
  },
  {
    title: "ML Recommendation Logic",
    description: "Improving elective recommendation with collaborative filtering and career-path weighting models.",
    relatedProject: "Elective Recommendation System",
    href: "#projects"
  }
] as const;

export const skillCategories = [
  {
    name: "Machine Learning",
    skills: [
      { label: "Supervised Learning", value: 85 },
      { label: "Classification", value: 88 },
      { label: "Regression", value: 84 },
      { label: "Signal Analysis (RSI/MACD)", value: 80 },
      { label: "Recommendation Systems", value: 82 }
    ]
  },
  {
    name: "Computer Vision",
    skills: [
      { label: "OpenCV", value: 86 },
      { label: "Face Recognition (LBPH)", value: 84 },
      { label: "Image Processing", value: 80 },
      { label: "Webcam Integration", value: 82 }
    ]
  },
  {
    name: "Programming",
    skills: [
      { label: "Python", value: 92 },
      { label: "C", value: 78 },
      { label: "C++", value: 78 }
    ]
  },
  {
    name: "Tools & Frameworks",
    skills: [
      { label: "FastAPI", value: 83 },
      { label: "Django", value: 80 },
      { label: "Git", value: 88 },
      { label: "PostgreSQL", value: 78 },
      { label: "REST APIs", value: 85 }
    ]
  }
] as const;

export const projects = [
  {
    name: "AV Capitals",
    description: "AI-powered stock signal platform with RSI/MACD/moving average indicators.",
    keywords: ["Stock Signals", "FastAPI", "Chart.js", "Paper Trading"],
    tech: ["Python", "FastAPI", "React", "Chart.js", "SQLAlchemy", "JWT"],
    featured: true,
    // Drop your screenshot here: public/projects/av-capitals.png (or .jpg)
    image: "/projects/av-capitals.png",
  },
  {
    name: "CampusOne",
    description: "Campus management system with OpenCV face recognition attendance.",
    keywords: ["Face Recognition", "OpenCV", "Django", "PostgreSQL"],
    tech: ["Django", "OpenCV", "PostgreSQL", "Bootstrap", "Python"],
    featured: true,
    // Drop your screenshot here: public/projects/campusone.png (or .jpg)
    image: "/projects/campusone.png",
  },
  {
    name: "Elective Recommendation System",
    description: "Course recommendation engine based on student academic profiles.",
    keywords: ["Recommendation", "TypeScript", "React", "Vercel"],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    featured: true,
    // Drop your screenshot here: public/projects/elective.png (or .jpg)
    image: "/projects/elective.png",
  },
  {
    name: "Smart Text Editor",
    description: "Feature-rich desktop text editor with live search and theme toggle.",
    keywords: ["Python", "Tkinter", "GUI", "Desktop"],
    tech: ["Python", "Tkinter"],
    featured: false,
    // Drop your screenshot here: public/projects/smart-text-editor.png (or .jpg)
    image: "/projects/smart-text-editor.png",
  },
] as const;

export const training = {
  title: "Board Infinity Training Internship",
  org: "Board Infinity",
  date: "Jun 2025 – Jul 2025",
  description:
    "Built a fully functional desktop GUI text editor demonstrating Python fundamentals, Tkinter GUI design, and structured software development under hands-on industry training.",
  tags: ["Python", "Tkinter", "GUI Design", "Desktop Applications"]
} as const;
