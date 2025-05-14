/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { YouTubeProps, LoomProps, TweetEmbedProps } from "@/types/blog";
import { ProductSection } from "@/components/products/ProductDisplay";

export const YouTube = ({
  id,
  width = "100%",
  height = "500px",
}: YouTubeProps) => {
  return (
    <div className="relative w-full aspect-video my-6 rounded-lg overflow-hidden shadow-md">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        width={width}
        height={height}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="top-0 left-0 w-full rounded-lg"
      />
    </div>
  );
};

export const Loom = ({ id }: LoomProps) => {
  return (
    <div className="relative w-full aspect-video my-6 rounded-lg overflow-hidden shadow-md">
      <iframe
        src={`https://www.loom.com/embed/${id}`}
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />
    </div>
  );
};

export const TweetEmbed = ({ tweetId }: TweetEmbedProps) => {
  return (
    <div className="flex justify-center my-6">
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/x/status/${tweetId}`}></a>
      </blockquote>
      {/* Add Twitter widgets script if not already included */}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </div>
  );
};

const MDXComponents = {
  img: (props: any) => (
    <div className="relative w-full h-[400px] my-8 rounded-lg overflow-hidden shadow-md bg-gray-50 dark:bg-gray-800/50">
      <Image
        {...props}
        alt={props.alt || "Blog image"}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw"
      />
    </div>
  ),
  a: (props: any) => (
    <Link {...props} className="text-primary hover:underline" />
  ),
  h1: (props: any) => (
    <h1 {...props} className="text-4xl font-bold mt-8 mb-4" />
  ),
  h2: (props: any) => (
    <h2 {...props} className="text-3xl font-bold mt-8 mb-4" />
  ),
  h3: (props: any) => (
    <h3 {...props} className="text-2xl font-bold mt-6 mb-3" />
  ),
  h4: (props: any) => <h4 {...props} className="text-xl font-bold mt-4 mb-2" />,
  p: (props: any) => <p {...props} className="my-4" />,
  ul: (props: any) => <ul {...props} className="list-disc pl-6 my-4" />,
  ol: (props: any) => <ol {...props} className="list-decimal pl-6 my-4" />,
  li: (props: any) => <li {...props} className="mb-1" />,
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-primary pl-4 italic my-6"
    />
  ),
  hr: () => <hr className="my-8 border-t border-border" />,
  code: (props: any) => {
    if (typeof props.children === "string") {
      return <code {...props} className="px-1.5 py-0.5 rounded text-sm" />;
    }
    return <code {...props} />;
  },
  pre: (props: any) => (
    <pre {...props} className="p-4 rounded-lg overflow-x-auto my-6 text-sm" />
  ),
  YouTube,
  Loom,
  TweetEmbed,
  ProductSection,
};

export default MDXComponents;
