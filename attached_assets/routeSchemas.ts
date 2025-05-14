import {
  generateAboutPageSchema,
  generateAffiliatePageSchema,
  generateBlogCollectionPageSchema,
  generateContactPageSchema,
  generateFAQSchema,
  generateJourneyPageSchema,
  generateMediaCollectionPageSchema,
  generatePersonSchema,
  generateProjectsCollectionPageSchema,
  generateResourcesCollectionPageSchema,
  generateWebinarEpisodeSchema,
  generateWebsiteSchema,
  generateProductSchema,
  generateReviewSchema,
  generateResourceCategoryPageSchema,
  generateResourceArticleSchema,
  generateTeamPageSchema,
  generateTestimonialsCollectionPageSchema,
  generateServicesItemListSchema,
  generateServiceSchema,
  generateWebinarsCollectionPageSchema,
  generateWebinarBreadcrumbSchema,
  resourceArticleBreadcrumbSchema,
  resourceCategoryBreadcrumbSchema,
  webinarEpisodeBreadcrumbSchema,
  generateSearchPageSchema,
} from "./schema";
import resourceIndexData from "@/api/data/resources/index.json";
import servicesData from "@/api/data/services.json";
import faqData from "@/api/data/contact.json";
import {
  getArticleData,
  getCategoryData,
  getWebinarBySlug,
} from "@/utils/resources";
import { Category } from "@/types/resources";

// Define a type for schema objects
type SchemaObject = {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
};

// Define types for route schema mapping
type SchemaGenerator = () => SchemaObject;
type SchemaGeneratorWithParams = (
  params: string[]
) => Promise<SchemaObject | SchemaObject[] | null>;
type RouteSchemaValue =
  | SchemaGenerator
  | SchemaGenerator[]
  | SchemaGeneratorWithParams;

// Interface for route patterns
interface RoutePattern {
  pattern: RegExp;
  schemaGenerator: SchemaGeneratorWithParams;
}

const routeSchemaMap: Record<string, RouteSchemaValue> = {
  // Core pages
  "/": generateWebsiteSchema,
  "/about": generateAboutPageSchema,
  "/contact": [
    generateContactPageSchema,
    () => generateFAQSchema(faqData.questions),
  ],
  "/journey": generateJourneyPageSchema,
  "/blog": generateBlogCollectionPageSchema,
  "/projects": generateProjectsCollectionPageSchema,
  "/media": generateMediaCollectionPageSchema,
  "/resources": generateResourcesCollectionPageSchema,
  "/resources/webinars": [
    generateWebinarsCollectionPageSchema,
    generateWebinarBreadcrumbSchema,
  ],
  "/services": [
    () => generateServicesItemListSchema(servicesData.services),
    () => generateFAQSchema(servicesData.faqs),
  ],
  "/affiliate": generateAffiliatePageSchema,
  "/testimonials": generateTestimonialsCollectionPageSchema,
  "/team": generateTeamPageSchema,
  "/search": generateSearchPageSchema,
};

// Route patterns for dynamic routes
const dynamicRoutePatterns: RoutePattern[] = [
  // Resource category pages
  {
    pattern: /^\/resources\/([^\/]+)$/,
    schemaGenerator: async (params) => {
      const categoryId = params[1];
      // Skip if this is the webinars path which is handled separately
      if (categoryId === "webinars") return null;

      const category = resourceIndexData.categories.find(
        (c) => c.id === categoryId
      );
      if (!category) return null;

      // Type cast to Category to satisfy the type checker
      const typedCategory = category as unknown as Category;

      return [
        generateResourceCategoryPageSchema(typedCategory),
        resourceCategoryBreadcrumbSchema(typedCategory),
      ];
    },
  },
  // Resource article pages
  {
    pattern: /^\/resources\/([^\/]+)\/([^\/]+)$/,
    schemaGenerator: async (params) => {
      const categoryId = params[1];
      const articleId = params[2];

      const articleData = await getArticleData(categoryId, articleId);
      const categoryData = getCategoryData(categoryId);

      if (!articleData || !categoryData) return null;

      const articleForSchema = {
        id: articleId,
        category: categoryId,
        meta: {
          title: articleData.meta.title,
          description: articleData.meta.description,
          publishedDate: articleData.meta.publishedDate,
          date: articleData.meta.publishedDate,
          image: articleData.meta.image,
          author: articleData.meta.author,
          keywords: articleData.meta.tags,
        },
      };

      const schemas = [
        generateResourceArticleSchema(articleForSchema),
        resourceArticleBreadcrumbSchema(
          articleForSchema,
          categoryData as Category
        ),
        ...articleData.products.map((product) =>
          generateProductSchema(product)
        ),
        ...articleData.products.map((product) => generateReviewSchema(product)),
      ];

      return schemas;
    },
  },
  // Webinar pages
  {
    pattern: /^\/resources\/webinars\/([^\/]+)$/,
    schemaGenerator: async (params) => {
      const webinarSlug = params[1];
      const webinar = await getWebinarBySlug(webinarSlug);

      if (!webinar) return null;

      return [
        generateWebinarEpisodeSchema(webinar),
        webinarEpisodeBreadcrumbSchema(webinar),
      ];
    },
  },
  // Service pages
  {
    pattern: /^\/services\/([^\/]+)$/,
    schemaGenerator: async (params) => {
      const serviceSlug = params[1];
      const service = servicesData.services.find((s) => s.slug === serviceSlug);

      if (!service) return null;

      // Get service-specific FAQs
      // We'll include FAQs that mention this service in either the question or answer
      const serviceName = service.name.toLowerCase();
      const relevantFaqs = servicesData.faqs.filter((faq) => {
        const question = faq.question.toLowerCase();
        const answer = faq.answer.toLowerCase();

        return (
          question.includes(serviceName) ||
          answer.includes(serviceName) ||
          service.tags.some(
            (tag) =>
              question.includes(tag.toLowerCase()) ||
              answer.includes(tag.toLowerCase())
          )
        );
      });

      // Return both the service schema and FAQs if any are relevant
      if (relevantFaqs.length > 0) {
        return [
          generateServiceSchema(service),
          generateFAQSchema(relevantFaqs),
        ];
      }

      // Otherwise just return the service schema
      return generateServiceSchema(service);
    },
  },
];

/**
 * Check if the route matches any dynamic route patterns
 */
async function matchDynamicRoute(
  pathname: string
): Promise<SchemaObject[] | null> {
  for (const { pattern, schemaGenerator } of dynamicRoutePatterns) {
    const match = pathname.match(pattern);
    if (match) {
      const result = await schemaGenerator(match);
      return Array.isArray(result) ? result : result ? [result] : null;
    }
  }
  return null;
}

/**
 * Get the JSON-LD schema(s) for a specific route
 * Handles both static and dynamic routes
 * Falls back to the person schema if no specific schema is defined
 */
export async function getSchemasForRoute(
  route: string
): Promise<SchemaObject | SchemaObject[]> {
  // First check dynamic routes
  const dynamicMatch = await matchDynamicRoute(route);
  if (dynamicMatch) return dynamicMatch;

  // Then check static routes
  const schemaGenerator = routeSchemaMap[route];

  if (!schemaGenerator) {
    return generatePersonSchema();
  }

  if (Array.isArray(schemaGenerator)) {
    return schemaGenerator.map((generator) => generator());
  }

  return (schemaGenerator as SchemaGenerator)();
}
