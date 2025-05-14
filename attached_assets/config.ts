/**
 * Get SEO tags
 * @returns
 */
export const getSEOTags = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return {
      title: title,
      description: description,
    };
  };
  
  /**
   * Get Open Graph tags
   * @returns
   */
  export const getOpenGraphTags = ({
    title,
    description,
    url,
    image = "/images/profile.png", // optional default image
  }: {
    title: string;
    description: string;
    url: string;
    image?: string;
  }) => {
    return {
      title: title,
      description: description,
      type: "website",
      url: url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Vatsal Shah Logo",
        },
      ],
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [image],
        creator: "@vatsal_shah_",
        site: "@vatsal_shah_",
      },
    };
  };
  