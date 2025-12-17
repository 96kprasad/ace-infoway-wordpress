import Image from 'next/image'
import Link from 'next/link'
import { Blog } from '@/types/blog'

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  console.log('Blog data:', blog)
  
  const featuredImage = blog._embedded?.['wp:featuredmedia']?.[0]
  const categories = blog._embedded?.['wp:term']?.[0] || []
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {featuredImage && (
        <div className="relative h-48">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || blog.title.rendered}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.slice(0, 2).map((category: any) => (
            <span 
              key={category.id}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {category.name}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-3">
          <Link 
            href={`/blogs/${blog.slug}`}
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            {blog.title.rendered}
          </Link>
        </h3>
        <div 
          className="text-gray-600 mb-4"
          dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}
        />
        <div className="flex justify-between items-center text-sm text-gray-500">
          <time dateTime={blog.date}>
            {new Date(blog.date).toLocaleDateString()}
          </time>
          <Link 
            href={`/blogs/${blog.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  )
}