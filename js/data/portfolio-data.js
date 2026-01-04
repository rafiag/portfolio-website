/**
 * Portfolio Data
 * Centralized data for all portfolio projects
 */

import { validatePortfolioData, formatValidationErrors } from '../modules/portfolio-validator.js';

export const portfolioData = {
    1: {
        title: "Wordle Decoded",
        description: "Deep dive into what actually makes the puzzle 'hard'—moving beyond guesswork and into linguistic and performance-based data analysis.",
        image: "assets/images/portfolio/1.webp",
        tags: ["Python", "SQL", "NLP"],
        details: [
            "ETL & Data Engineering: Designed a pipeline to Extract data from multiple sources, Transform it using a multi-component difficulty algorithm, and Load it into a relational database with pre-computed aggregations for optimized dashboard performance.",
            "NLP & Sentiment Analysis: Custom NLTK VADER lexicon tuned for Wordle-specific slang and emoji patterns, processing 1M+ tweets to correlate community sentiment with puzzle difficulty.",
            "Modern Visualization: I used this project to learn Recharts, building 8+ interactive visualization dashboards including scatter plots, time series, sentiment analysis, and distribution charts."
        ],
        link: "https://rafiag.github.io/wordle-decoded/"
    },
    2: {
        title: "The Year of Judge (2022)",
        description: "This project provides an interactive narrative of Aaron Judge’s historic 2022 season using pitch-level analytics gathered via the pybaseball API. It combines granular Statcast metrics with historical comparisons to analyze his record-breaking performance. The final dashboard transforms raw strike-zone and exit-velocity data into a compelling visual story of an MVP season.",
        image: "assets/images/portfolio/2.webp",
        tags: ["Python", "Tableau"],
        details: [
            "Automated Data Pipeline: Utilized the pybaseball Python library to programmatically scrape and aggregate pitch-by-pitch Statcast data for the entire 2022 MLB season. This ensured a high-fidelity dataset including exit velocities, launch angles, and precise coordinates for every plate appearance.",
            "Milestone Tracking: Developed a dynamic visualization comparing Judge’s 62-home-run pace against Roger Maris and Babe Ruth. This allowed for real-time analysis of Judge’s acceleration relative to historical record-holders.",
            "Pitch-Level Analysis: Designed interactive heat maps to visualize hitting proficiency across different pitch types and strike zone locations. These visuals identify Judge's \"hot zones\" and how pitchers adjusted their strategies throughout the season."
        ],
        link: "https://public.tableau.com/app/profile/rafiatha/viz/TheYearofJudge2022/Judge"
    },
    3: {
        title: "Mapping Bali's Tourism Hotspots",
        description: "This award-winning project analyzes a decade of tourism patterns in Bali by extracting geospatial metadata from user-uploaded photos. Using Python-based spatial clustering, it identifies high-density 'hotspots' to visualize the evolution of tourist movements between 2010 and 2019. The findings were presented and recognized at an international conference hosted by the University of Ryukyu in Japan.",
        image: "assets/images/portfolio/3.webp",
        tags: ["Python", "Scikit-learn", "Tableau"],
        details: [
            "Geospatial Data Mining: Programmatically extracted nearly ten years of user-generated metadata via the Flickr API to track tourist footprints. This provided a massive, real-world dataset for analyzing long-term spatial behavior and regional popularity trends",
            "Algorithmic Hotspot Detection: Applied the DBSCAN (Density-Based Spatial Clustering of Applications with Noise) algorithm to filter geographic noise and identify dense clusters of activity. This method successfully isolated key tourism hubs from scattered, non-relevant data points",
            "International Recognition: Presented the research findings at an international conference at the University of Ryukyu, Japan, where the project won a distinguished award. The work was praised for its innovative use of social media data in urban and tourism planning"
        ],
        link: "https://public.tableau.com/app/profile/rafiatha/viz/BaliTourismHotspot/Dashboard"
    },
    4: {
        title: "E-Commerce Performance Dashboard",
        description: "This project delivers a three-tier analysis of e-commerce health, focusing on sales performance, customer retention, and behavioral clustering. It utilizes a Python-driven backend to segment customers, providing actionable insights into revenue growth and user loyalty. The resulting Tableau dashboard allows stakeholders to interact with complex transactional data through a streamlined, multi-tab interface.",
        image: "assets/images/portfolio/4.webp",
        tags: ["Python", "Scikit-learn", "Tableau"],
        details: [
            "Multi-Dimensional Reporting: Developed a comprehensive dashboard featuring three distinct views: Sales Performance, Customer Retention, and RFM Segmentation. Each tab offers a specialized lens through which to evaluate business health and revenue drivers",
            "Advanced Customer Clustering: Integrated Python’s Scikit-learn library to perform K-Means clustering for RFM (Recency, Frequency, Monetary) segmentation. This data-driven approach allowed for the automated categorization of customers into distinct value groups",
            "Cohort & Behavioral Analysis: Designed retention charts to track customer lifecycles and repeat purchase patterns over time. These visualizations help identify when and why users churn, enabling more targeted marketing interventions"
        ],
        link: "https://public.tableau.com/app/profile/rafiatha/viz/e-CommercePerformanceDashboard1/SalesPerformance"
    }
};

// Validate portfolio data in development mode
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    try {
        const validationResult = validatePortfolioData(portfolioData);
        const message = formatValidationErrors(validationResult);

        if (validationResult.valid) {
            console.log('%c[Portfolio Data Validation]', 'color: #4caf50; font-weight: bold', message);
        } else {
            console.error('%c[Portfolio Data Validation]', 'color: #f44336; font-weight: bold', '\n' + message);
        }
    } catch (error) {
        console.error('[Portfolio Data Validation] Validation error:', error);
    }
}
