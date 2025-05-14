import { Product, Webinar, Category, ResourceArticle } from "@/types/resources";
import { Service } from "@/types/services";

export function generatePersonSchema() {
  return {
    "@id": "https://vatsalshah.in/#person",
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vatsal Shah",
    url: "https://vatsalshah.in",
    sameAs: [
      "https://twitter.com/vatsal_n_shah",
      "https://github.com/vatsal2210",
      "https://linkedin.com/in/vatsalnshah",
    ],
    jobTitle: "Founder & Technical Leader",
    worksFor: {
      "@type": "Organization",
      name: "Speak Ai Inc",
    },
    image: "https://vatsalshah.in/images/profile.jpg",
    description:
      "Founder, Technical Leader, and Speaker sharing insights on technology, leadership, and personal growth.",
    knowsAbout: [
      "Founder",
      "Technical Leader",
      "Speaker",
      "Software Development",
      "Technical Leadership",
      "AI/ML",
      "Web Development",
      "System Architecture",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vatsal Shah",
    url: "https://vatsalshah.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://vatsalshah.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    author: {
      "@type": "Person",
      name: "Vatsal Shah",
    },
    description:
      "Technical Leader, Founder, and Speaker sharing insights on technology, leadership, and personal growth.",
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const generateAboutPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/about",
    "@context": "https://schema.org",
    "@type": "WebPage",
    mainEntity: {
      ...generatePersonSchema(),
    },
  };
};

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    url: product.productLink,
    brand: {
      "@type": "Brand",
      name: product.source,
    },
    offers: {
      "@type": "Offer",
      price: product.price.amount,
      priceCurrency: product.price.currency,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.customerReviews.rating,
      reviewCount: product.customerReviews.reviewsCount,
    },
  };
}

export function generateReviewSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.title,
      image: product.image,
      description: product.description,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.customerReviews.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: "Vatsal Shah",
      "@id": "https://vatsalshah.in/#person",
    },
    reviewBody: product.personalExperience,
    datePublished: product.publishedDate,
  };
}

export const generateTeamPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/team",
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Our Team - Vatsal Shah",
    description:
      "Meet the talented individuals who form the expert team at Vatsal Shah's consultancy.",
    url: "https://vatsalshah.in/team",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateProjectsCollectionPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects - Vatsal Shah",
    description:
      "A showcase of personal projects, open-source contributions, and technical experiments by Vatsal Shah.",
    url: "https://vatsalshah.in/projects",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateBlogCollectionPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/blog",
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog - Vatsal Shah",
    description:
      "Insights on technology, leadership, AI, software development, and personal growth.",
    url: "https://vatsalshah.in/blog",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://vatsalshah.in/blog",
    },
    publisher: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateMediaCollectionPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/media",
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Media Appearances - Vatsal Shah",
    description:
      "Podcast interviews, talks, articles, and other media features.",
    url: "https://vatsalshah.in/media",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateJourneyPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/journey",
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "My Journey - Vatsal Shah",
    description:
      "Exploring the professional journey, milestones, and experiences of Vatsal Shah.",
    url: "https://vatsalshah.in/journey",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateResourcesCollectionPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/resources",
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Resources - Vatsal Shah",
    description:
      "Curated tools, books, courses, and gadgets recommended by Vatsal Shah.",
    url: "https://vatsalshah.in/resources",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateTestimonialsCollectionPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/testimonials",
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Testimonials - Vatsal Shah",
    description:
      "Read what clients and colleagues say about working with Vatsal Shah.",
    url: "https://vatsalshah.in/testimonials",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateSchedulePageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/schedule",
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Schedule a Meeting - Vatsal Shah",
    description: "Book a consultation call directly on the calendar.",
    url: "https://vatsalshah.in/schedule",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateAffiliatePageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/affiliate",
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Affiliate Links & Recommendations - Vatsal Shah",
    description:
      "Recommended products and services with affiliate disclosures.",
    url: "https://vatsalshah.in/affiliate",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export const generateContactPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/contact",
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact - Vatsal Shah",
    description:
      "Get in touch for consulting, speaking, or collaboration opportunities.",
    url: "https://vatsalshah.in/contact",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@id": "https://vatsalshah.in/faq",
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// --- Schema for /resources/webinars ---
export const generateWebinarsCollectionPageSchema = () => {
  return {
    "@id": "https://vatsalshah.in/resources/webinars",
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Webinars - Vatsal Shah",
    description:
      "Watch insightful webinars on software engineering, technology, and professional development.",
    url: "https://vatsalshah.in/resources/webinars",
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

// Generate breadcrumb schema for main webinars page
export const generateWebinarBreadcrumbSchema = () => {
  return generateBreadcrumbSchema([
    { name: "Resources", url: "https://vatsalshah.in/resources" },
    { name: "Webinars", url: "https://vatsalshah.in/resources/webinars" },
  ]);
};

// --- Schema for /resources/webinars/[webinar] ---

// Generate video schema for individual webinar
export function generateWebinarEpisodeSchema(webinar: Webinar) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: webinar.title,
    description: webinar.description,
    uploadDate: webinar.publishedDate,
    thumbnailUrl: webinar.image,
    ...(webinar.youtubeUrl && { embedUrl: webinar.youtubeUrl }),
    ...(webinar.tags && { keywords: webinar.tags.join(", ") }),
    author: {
      "@type": "Person",
      name: webinar.author || "Vatsal Shah",
    },
    publisher: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
}

// Generate breadcrumb schema for individual webinar page
export const webinarEpisodeBreadcrumbSchema = (webinar: Webinar) =>
  generateBreadcrumbSchema([
    { name: "Resources", url: "https://vatsalshah.in/resources" },
    { name: "Webinars", url: "https://vatsalshah.in/resources/webinars" },
    {
      name: webinar.title,
      url: `https://vatsalshah.in/resources/webinars/${webinar.slug}`,
    },
  ]);

// --- Schema for /resources/[category] ---

// Generate schema for a resource category page
export const generateResourceCategoryPageSchema = (category: Category) => {
  return {
    "@id": `https://vatsalshah.in/resources/${category.id}`,
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} Resources - Vatsal Shah`,
    description:
      category.description ||
      `Explore recommended ${category.title.toLowerCase()} resources curated by Vatsal Shah.`,
    url: `https://vatsalshah.in/resources/${category.id}`,
    mainEntity: {
      "@id": "https://vatsalshah.in/#person",
    },
  };
};

// Generate breadcrumb schema for resource category page
export const resourceCategoryBreadcrumbSchema = (category: Category) =>
  generateBreadcrumbSchema([
    { name: "Resources", url: "https://vatsalshah.in/resources" },
    {
      name: category.title,
      url: `https://vatsalshah.in/resources/${category.id}`,
    },
  ]);

// --- Schema for /resources/[category]/[article] ---

// Generate Article schema for an individual resource article page
export function generateResourceArticleSchema(article: ResourceArticle) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vatsalshah.in";
  const pageUrl = `${siteUrl}/resources/${article.category}/${article.id}`;
  const imageUrl = article.meta.image
    ? `${siteUrl}${article.meta.image}`
    : `${siteUrl}/images/og-image.png`; // Default OG image

  return {
    "@id": pageUrl,
    "@context": "https://schema.org",
    "@type": "Article", // Or TechArticle, BlogPosting, Review as appropriate
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: article.meta.title,
    description: article.meta.description,
    image: imageUrl,
    datePublished:
      article.meta.publishedDate ||
      article.meta.date ||
      new Date().toISOString(), // Use specific date or fallback
    author: {
      "@type": "Person",
      name: article.meta.author || "Vatsal Shah", // Use author from frontmatter or default
      url: siteUrl, // Link to your main profile
    },
    publisher: {
      "@type": "Organization", // Assuming you publish as an org/brand
      name: "Vatsal Shah",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/profile.png`, // Link to your logo/profile image
      },
    },
    // If the article is specifically ABOUT a product/tool:
    // about: {
    //   "@type": "Product", // or Thing
    //   name: "Specific Product Name",
    //   url: article.productLink // If you have this in frontmatter
    // }
  };
}

// Generate breadcrumb schema for individual resource article page
export const resourceArticleBreadcrumbSchema = (
  article: ResourceArticle,
  category: Category
) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vatsalshah.in";
  return generateBreadcrumbSchema([
    { name: "Resources", url: `${siteUrl}/resources` },
    { name: category.title, url: `${siteUrl}/resources/${category.id}` }, // Use category info
    {
      name: article.meta.title,
      url: `${siteUrl}/resources/${article.category}/${article.id}`,
    },
  ]);
};

// --- Schema for Service Pages (Using data from services.json) ---

// Generate JSON-LD schema for a single Service defined in services.json
export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://vatsalshah.in"
    }/services/${service.slug}`,
    provider: {
      "@type": "Organization", // Or "Person"
      name: "Vatsal Shah",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://vatsalshah.in",
    },
    // Potential: Add category/serviceType based on service.tags or name
  };
}

// Generate JSON-LD schema for an ItemList of Services for the main /services page
export function generateServicesItemListSchema(services: Service[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vatsalshah.in";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Professional Services Offered by Vatsal Shah",
    description:
      "List of professional services including AI Consulting, App Development, and Fractional CTO.",
    url: `${siteUrl}/services`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.shortDescription,
        url: `${siteUrl}/services/${service.slug}`,
        provider: {
          "@type": "Organization", // Or "Person"
          name: "Vatsal Shah",
          url: siteUrl,
        },
      },
    })),
  };
}

export const generateSearchPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Search - Vatsal Shah",
    description:
      "Search for content across Vatsal Shah's blog, services, projects, and resources.",
    url: "https://vatsalshah.in/search",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://vatsalshah.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Search",
          item: "https://vatsalshah.in/search",
        },
      ],
    },
    mainEntity: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://vatsalshah.in/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
};
