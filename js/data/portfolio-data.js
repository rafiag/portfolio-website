/**
 * Portfolio Data
 * Centralized data for all portfolio projects
 */

export const portfolioData = {
    1: {
        title: "The Year of Judge (2022)",
        description: "This project provides an interactive narrative of Aaron Judge’s historic 2022 season using pitch-level analytics gathered via the pybaseball API. It combines granular Statcast metrics with historical comparisons to analyze his record-breaking performance. The final dashboard transforms raw strike-zone and exit-velocity data into a compelling visual story of an MVP season.",
        image: "assets/images/portfolio/1.webp",
        tags: ["Python", "Tableau"],
        details: [
            "Automated Data Pipeline: Utilized the pybaseball Python library to programmatically scrape and aggregate pitch-by-pitch Statcast data for the entire 2022 MLB season. This ensured a high-fidelity dataset including exit velocities, launch angles, and precise coordinates for every plate appearance.",
            "Milestone Tracking: Developed a dynamic visualization comparing Judge’s 62-home-run pace against Roger Maris and Babe Ruth. This allowed for real-time analysis of Judge’s acceleration relative to historical record-holders.",
            "Pitch-Level Analysis: Designed interactive heat maps to visualize hitting proficiency across different pitch types and strike zone locations. These visuals identify Judge's \"hot zones\" and how pitchers adjusted their strategies throughout the season."
        ],
        link: "https://public.tableau.com/app/profile/rafiatha/viz/TheYearofJudge2022/Judge"
    },
    2: {
        title: "Mapping Bali's Tourism Hotspots",
        description: "This award-winning project analyzes a decade of tourism patterns in Bali by extracting geospatial metadata from user-uploaded photos. Using Python-based spatial clustering, it identifies high-density 'hotspots' to visualize the evolution of tourist movements between 2010 and 2019. The findings were presented and recognized at an international conference hosted by the University of Ryukyu in Japan.",
        image: "assets/images/portfolio/2.webp",
        tags: ["Python", "Scikit-learn", "Tableau"],
        details: [
            "Geospatial Data Mining: Programmatically extracted nearly ten years of user-generated metadata via the Flickr API to track tourist footprints. This provided a massive, real-world dataset for analyzing long-term spatial behavior and regional popularity trends",
            "Algorithmic Hotspot Detection: Applied the DBSCAN (Density-Based Spatial Clustering of Applications with Noise) algorithm to filter geographic noise and identify dense clusters of activity. This method successfully isolated key tourism hubs from scattered, non-relevant data points",
            "International Recognition: Presented the research findings at an international conference at the University of Ryukyu, Japan, where the project won a distinguished award. The work was praised for its innovative use of social media data in urban and tourism planning"
        ],
        link: "https://public.tableau.com/app/profile/rafiatha/viz/BaliTourismHotspot/Dashboard"
    },
    3: {
        title: "E-Commerce Performance Dashboard",
        description: "This project delivers a three-tier analysis of e-commerce health, focusing on sales performance, customer retention, and behavioral clustering. It utilizes a Python-driven backend to segment customers, providing actionable insights into revenue growth and user loyalty. The resulting Tableau dashboard allows stakeholders to interact with complex transactional data through a streamlined, multi-tab interface.",
        image: "assets/images/portfolio/3.webp",
        tags: ["Python", "Scikit-learn", "Tableau"],
        details: [
            "Multi-Dimensional Reporting: Developed a comprehensive dashboard featuring three distinct views: Sales Performance, Customer Retention, and RFM Segmentation. Each tab offers a specialized lens through which to evaluate business health and revenue drivers",
            "Advanced Customer Clustering: Integrated Python’s Scikit-learn library to perform K-Means clustering for RFM (Recency, Frequency, Monetary) segmentation. This data-driven approach allowed for the automated categorization of customers into distinct value groups",
            "Cohort & Behavioral Analysis: Designed retention charts to track customer lifecycles and repeat purchase patterns over time. These visualizations help identify when and why users churn, enabling more targeted marketing interventions"
        ],
        link: "https://public.tableau.com/app/profile/rafiatha/viz/e-CommercePerformanceDashboard1/SalesPerformance"
    }
    // 4: {
    //     title: "Customer Churn Prediction",
    //     description: "Predictive analytics project using Random Forest algorithm to identify customers at risk of churning. The model analyzes historical behavior patterns and engagement metrics to flag at-risk accounts, enabling proactive retention strategies.",
    //     image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&h=800&fit=crop",
    //     tags: ["Python", "Random Forest", "Pandas"],
    //     details: [
    //         "Built model with 92% accuracy in predicting churn",
    //         "Analyzed 200+ features including usage patterns and support tickets",
    //         "Reduced customer churn by 30% through early intervention",
    //         "Saved $2M annually in retention costs",
    //         "Deployed automated scoring system for real-time predictions"
    //     ],
    //     link: ""
    // },
    // 5: {
    //     title: "Financial Performance Analysis",
    //     description: "Automated financial reporting system that generates monthly performance metrics, variance analysis, and forecasting models. Built with Excel VBA and SQL to streamline financial close processes and provide executive-level insights.",
    //     image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
    //     tags: ["Excel", "VBA", "SQL"],
    //     details: [
    //         "Automated generation of 15+ financial reports",
    //         "Reduced report preparation time from 3 days to 4 hours",
    //         "Implemented variance analysis with automated highlighting",
    //         "Created rolling 12-month forecast model",
    //         "Integrated with ERP system for real-time data pulls"
    //     ],
    //     link: ""
    // },
    // 6: {
    //     title: "A/B Testing Framework",
    //     description: "Statistical analysis framework for evaluating marketing campaign effectiveness through rigorous A/B testing methodology. Implements hypothesis testing, power analysis, and confidence intervals to ensure statistically significant results.",
    //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
    //     tags: ["Python", "Statistics", "Hypothesis Testing"],
    //     details: [
    //         "Designed and executed 30+ A/B tests across email, web, and ads",
    //         "Implemented Bayesian and Frequentist testing approaches",
    //         "Created automated sample size calculator",
    //         "Increased email click-through rates by 35%",
    //         "Established company-wide testing best practices"
    //     ],
    //     link: ""
    // },
    // 7: {
    //     title: "Analytics Dashboard",
    //     description: "Real-time data visualization platform for enterprise clients with advanced filtering and custom reporting capabilities. This comprehensive solution provides actionable insights across multiple business units.",
    //     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    //     tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
    //     details: [
    //         "Built scalable dashboard serving 1000+ concurrent users",
    //         "Implemented 30+ interactive charts with real-time updates",
    //         "Reduced data processing time by 70% through optimization",
    //         "Created custom export functionality for PDF and Excel",
    //         "Integrated with 10+ third-party data sources"
    //     ],
    //     link: "https://example.com/analytics-dashboard"
    // },
    // 8: {
    //     title: "E-Commerce Platform",
    //     description: "Modern shopping experience with seamless checkout flow, inventory management, and personalized recommendations powered by machine learning algorithms.",
    //     image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
    //     tags: ["Next.js", "Stripe", "Tailwind", "MongoDB"],
    //     details: [
    //         "Processed $5M+ in transactions in first year",
    //         "Achieved 99.9% uptime with serverless architecture",
    //         "Implemented AI-powered product recommendations",
    //         "Reduced checkout abandonment by 35%",
    //         "Integrated multiple payment gateways for global reach"
    //     ],
    //     link: ""
    // },
    // 9: {
    //     title: "Design System",
    //     description: "Comprehensive component library for a fintech startup, featuring 100+ components with full documentation and accessibility compliance to WCAG 2.1 AA standards.",
    //     image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&h=800&fit=crop",
    //     tags: ["React", "Storybook", "TypeScript", "Figma"],
    //     details: [
    //         "Created 100+ reusable React components",
    //         "Achieved 100% accessibility compliance",
    //         "Reduced development time by 60%",
    //         "Documented all components in Storybook",
    //         "Synchronized design tokens between Figma and code"
    //     ],
    //     link: ""
    // },
    // 10: {
    //     title: "Fitness Tracking App",
    //     description: "Cross-platform fitness tracking application with workout plans, progress tracking, social features, and integration with popular wearable devices.",
    //     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    //     tags: ["React Native", "Firebase", "Redux"],
    //     details: [
    //         "Acquired 50,000+ active users in first 6 months",
    //         "Integrated with Apple Health and Google Fit",
    //         "Built real-time workout tracking with GPS",
    //         "Implemented social features and challenges",
    //         "Achieved 4.7-star rating on app stores"
    //     ],
    //     link: ""
    // },
    // 11: {
    //     title: "SaaS Platform",
    //     description: "Project management tool with real-time collaboration, task tracking, team communication features, and advanced reporting capabilities.",
    //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
    //     tags: ["Vue.js", "WebSocket", "PostgreSQL"],
    //     details: [
    //         "Scaled to support 10,000+ teams",
    //         "Built real-time collaboration with WebSockets",
    //         "Implemented role-based access control",
    //         "Created advanced reporting and analytics",
    //         "Integrated with Slack, Google, and Microsoft tools"
    //     ],
    //     link: ""
    // },
    // 12: {
    //     title: "Interactive Portfolio",
    //     description: "Interactive portfolio website for a creative agency featuring 3D animations, immersive storytelling, and award-winning user experience.",
    //     image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop",
    //     tags: ["Three.js", "GSAP", "WebGL"],
    //     details: [
    //         "Won Awwwards Site of the Day",
    //         "Achieved 95+ Lighthouse performance score",
    //         "Created custom 3D animations and transitions",
    //         "Implemented smooth scroll and parallax effects",
    //         "Optimized for mobile and touch interactions"
    //     ],
    //     link: ""
    // }
};
