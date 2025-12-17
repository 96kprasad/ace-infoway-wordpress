import Image from 'next/image';
import { Blog, BlogPostProps } from '@/types/types';
import { formatDate } from '@/utils/helper';
import { getBlogBySlug, getBlogs } from '@/services/wordpressApi';
import { Metadata } from 'next';

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs.map((blog: Blog) => ({
      slug: blog.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  try {
    const blog = await getBlogBySlug(params.slug);
    return {
      title: blog?.title?.rendered || 'Blog Post',
      description: blog?.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Blog post description',
    };
  } catch {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  let blog: Blog | null = null;

  try {
    blog = await getBlogBySlug(params.slug);
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  }

  if (!blog) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600">The requested blog post could not be found.</p>
      </div>
    );
  }

  const featuredImage = blog._embedded?.['wp:featuredmedia']?.[0];
  const categories = blog._embedded?.['wp:term']?.[0] || [];
  const author = blog._embedded?.author?.[0];

  return (
    <article className="max-w-4xl mx-auto">
      {/* {featuredImage && (
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || blog.title.rendered}
            fill
            className="object-cover"
            priority
          />
        </div>
      )} */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category: any) => (
            <span 
              key={category.id}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded"
            >
              {category.name}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {blog?.title?.rendered || 'Untitled'}
        </h1>

        <div className="flex items-center text-gray-600 text-sm">
          {author && <span className="mr-4">By {author.name}</span>}
          <time>
            {formatDate(blog.date)}
          </time>
        </div>
      </header>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content?.rendered || blog.content }}
      />
    </article>
  );
}
