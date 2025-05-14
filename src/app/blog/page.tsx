
import { Metadata } from 'next'
import Link from 'next/link'
import { getSEOTags, getOpenGraphTags } from '@/lib/config'
import { generateBlogCollectionPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  ...getSEOTags({
    title: 'Blog - Jain Community Services of Canada',
    description: 'News, events and updates from JCS Canada'
  }),
  openGraph: getOpenGraphTags({
    title: 'Blog - Jain Community Services of Canada',
    description: 'News, events and updates from JCS Canada',
    url: 'https://jcscanada.org/blog'
  })
}

const posts = [
  {
    title: "Jain Community Services of Canada Hosts Milestone Event Celebrating Community Service and Empowering Careers",
    date: "2025-05-03",
    category: "events",
    slug: "career-mentorship-event",
    description: "JCS Canada marked a momentous occasion celebrating community service and empowering careers through mentorship."
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogCollectionPageSchema())
        }}
      />
      
      <h1 className="text-4xl font-bold mb-8">Blog & Updates</h1>
      
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link href={`/blog/${post.slug}`} className="block group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <div className="text-gray-600">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span className="capitalize">{post.category}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
