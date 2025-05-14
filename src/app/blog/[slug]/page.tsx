
import { notFound } from 'next/navigation'
import CareerMentorshipEvent from '@/content/events/career-mentorship-event.mdx'
import BlogLayout from '@/components/blog-layout'
import { getSEOTags, getOpenGraphTags } from '@/lib/config'
import { generateBlogCollectionPageSchema } from '@/lib/schema'
import { Metadata } from 'next'

const posts = {
  'career-mentorship-event': {
    component: CareerMentorshipEvent,
    metadata: {
      title: "Jain Community Services of Canada Hosts Milestone Event Celebrating Community Service and Empowering Careers",
      date: "2025-05-03",
      category: "events",
      description: "JCS Canada marked a momentous occasion celebrating community service and empowering careers through mentorship.",
      image: "/assets/events_images/Career_Guidance_&_Mentorship_session/JCS Career Guidance and Lifetime Achievement Award Group Pic - May 03, 2025.jpg"
    }
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return {}

  const seoTags = getSEOTags({
    title: `${post.metadata.title} | JCS Canada Blog`,
    description: post.metadata.description
  })

  const ogTags = getOpenGraphTags({
    title: post.metadata.title,
    description: post.metadata.description,
    url: `https://jcscanada.org/blog/${params.slug}`,
    image: post.metadata.image
  })

  return {
    ...seoTags,
    openGraph: ogTags,
    twitter: ogTags.twitter
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]
  
  if (!post) {
    notFound()
  }

  const PostContent = post.component
  
  return (
    <BlogLayout {...post.metadata}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogCollectionPageSchema())
        }}
      />
      <PostContent />
    </BlogLayout>
  )
}
