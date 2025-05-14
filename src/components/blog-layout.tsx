
import { ReactNode } from 'react'

interface BlogLayoutProps {
  children: ReactNode
  title: string
  date: string
  category: string
}

export default function BlogLayout({ children, title, date, category }: BlogLayoutProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <div className="text-gray-600">
          <span>{new Date(date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span className="capitalize">{category}</span>
        </div>
      </header>
      <div className="prose max-w-none">
        {children}
      </div>
    </article>
  )
}
