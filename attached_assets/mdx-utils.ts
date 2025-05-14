import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import MDXComponents from "@/components/common/MDXComponents";

/**
 * Compile and render MDX content with components
 */
export async function renderMDX(source: string) {
  try {
    const { content } = await compileMDX({
      source,
      components: MDXComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
          format: "mdx",
        },
        parseFrontmatter: false,
      },
    });

    return content;
  } catch (error) {
    console.error("Error rendering MDX:", error);
    return null;
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
