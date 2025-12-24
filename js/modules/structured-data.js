/**
 * Structured Data Module
 * Generates Schema.org JSON-LD markup for SEO
 * Automatically converts portfolio data into machine-readable format
 */

import { portfolioData } from '../data/portfolio-data.js';

/**
 * Person Schema - Describes Rafi Atha as a professional
 */
export function generatePersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Rafi Atha",
        "jobTitle": "Senior Product Analyst",
        "description": "Data Analyst with 5 years of experience in fintech and e-commerce, specializing in business intelligence, data visualization, and analytics.",
        "email": "rafiatha.g@gmail.com",
        "telephone": "+6282118764518",
        "url": window.location.origin,
        "image": `${window.location.origin}/assets/images/profile.webp`,
        "sameAs": [
            "https://linkedin.com/in/rafi-atha"
        ],
        "knowsAbout": [
            "Python",
            "SQL",
            "R",
            "Excel",
            "Tableau",
            "Power BI",
            "Matplotlib",
            "Looker Studio",
            "Statistics",
            "Machine Learning",
            "A/B Testing",
            "Predictive Modeling",
            "Data Visualization",
            "Business Intelligence",
            "Data Analysis"
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Data Analyst",
            "occupationLocation": {
                "@type": "Country",
                "name": "Indonesia"
            },
            "estimatedSalary": {
                "@type": "MonetaryAmountDistribution",
                "name": "Senior Product Analyst Salary"
            }
        }
    };
}

/**
 * ProfilePage Schema - Marks the page as a professional profile
 */
export function generateProfilePageSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
            "@type": "Person",
            "name": "Rafi Atha",
            "jobTitle": "Senior Product Analyst",
            "description": "Data Analyst with 5 years of experience in fintech and e-commerce"
        },
        "about": "Professional portfolio showcasing data analysis projects, business intelligence work, and technical expertise",
        "dateCreated": "2025-12-24",
        "dateModified": new Date().toISOString().split('T')[0]
    };
}

/**
 * Organization Schemas - Work experience
 */
export function generateOrganizationSchemas() {
    const workExperience = [
        {
            organization: "Kredivo Group",
            role: "Senior Product Analyst",
            startDate: "2023-09",
            endDate: null,
            description: "Leading product analytics for fintech platform"
        },
        {
            organization: "Mapan",
            role: "Business Intelligence Analyst",
            startDate: "2022-08",
            endDate: "2023-08",
            description: "Built BI infrastructure and data pipelines"
        },
        {
            organization: "LinkAja!",
            role: "Business Insight Associate",
            startDate: "2021-06",
            endDate: "2022-08",
            description: "Analyzed user behavior and payment trends"
        },
        {
            organization: "tvOne",
            role: "Digital Commercial & Analytics",
            startDate: "2020-11",
            endDate: "2021-06",
            description: "Digital analytics and commercial strategy"
        },
        {
            organization: "Telkom Indonesia",
            role: "Data Scientist Intern",
            startDate: "2020-01",
            endDate: "2020-06",
            description: "Machine learning and predictive modeling projects"
        }
    ];

    return workExperience.map(job => ({
        "@context": "https://schema.org",
        "@type": "OrganizationRole",
        "startDate": job.startDate,
        "endDate": job.endDate,
        "roleName": job.role,
        "description": job.description,
        "member": {
            "@type": "Person",
            "name": "Rafi Atha"
        },
        "memberOf": {
            "@type": "Organization",
            "name": job.organization
        }
    }));
}

/**
 * CreativeWork Schemas - Portfolio projects
 * Automatically generated from portfolio-data.js
 */
export function generateCreativeWorkSchemas() {
    return Object.values(portfolioData).map(project => ({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description,
        "keywords": project.tags.join(', '),
        "image": project.image,
        "url": project.link || window.location.href,
        "author": {
            "@type": "Person",
            "name": "Rafi Atha",
            "jobTitle": "Senior Product Analyst"
        },
        "about": project.details ? project.details.join('. ') : project.description,
        "genre": "Data Analytics Project",
        "inLanguage": "en-US"
    }));
}

/**
 * WebSite Schema - Basic website information
 */
export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Rafi Atha - Portfolio",
        "description": "Professional portfolio of Rafi Atha, Data Analyst specializing in business intelligence and analytics",
        "url": window.location.origin,
        "author": {
            "@type": "Person",
            "name": "Rafi Atha"
        },
        "inLanguage": "en-US"
    };
}

/**
 * Inject all structured data into the page
 */
export function injectStructuredData(options = {}) {
    const {
        includePerson = true,
        includeProfilePage = true,
        includeOrganizations = true,
        includeProjects = true,
        includeWebSite = true
    } = options;

    try {
        const schemas = [];

        // Collect all schemas
        if (includePerson) {
            schemas.push(generatePersonSchema());
        }

        if (includeProfilePage) {
            schemas.push(generateProfilePageSchema());
        }

        if (includeOrganizations) {
            schemas.push(...generateOrganizationSchemas());
        }

        if (includeProjects) {
            schemas.push(...generateCreativeWorkSchemas());
        }

        if (includeWebSite) {
            schemas.push(generateWebSiteSchema());
        }

        // Inject each schema as a separate script tag
        schemas.forEach((schema, index) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = `structured-data-${index}`;
            script.textContent = JSON.stringify(schema, null, 2);
            document.head.appendChild(script);
        });

        // Success message removed for production
    } catch (error) {
        console.error('Error injecting structured data:', error);
    }
}

/**
 * Initialize structured data for the page
 * Call this from your main entry points
 */
export function initStructuredData(pageType = 'index') {
    // Different pages might need different schemas
    const options = {
        includePerson: true,
        includeProfilePage: true,
        includeWebSite: true,
        includeOrganizations: pageType === 'index', // Only on home page
        includeProjects: true // On both pages
    };

    injectStructuredData(options);
}
