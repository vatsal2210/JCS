
import { notFound } from 'next/navigation'
import CareerMentorshipEvent from '@/content/events/career-mentorship-event.mdx'
import BlogLayout from '@/components/blog-layout'

const posts = {
  'career-mentorship-event': {
    component: CareerMentorshipEvent,
    metadata: {
      title: "Jain Community Services of Canada Hosts Milestone Event Celebrating Community Service and Empowering Careers",
      date: "2025-05-03",
      category: "events"
    }
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
      <PostContent />
    </BlogLayout>
  )
}
