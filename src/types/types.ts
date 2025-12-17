// Blog related types
export interface Blog {
  id: number
  title: { rendered: string }
  slug: string
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  categories: number[]
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
    author?: Array<{
      name: string
    }>
  }
}

export interface Category {
  id: number
  name: string
  slug: string
}

// Component props interfaces
export interface BlogPostProps {
  params: { slug: string }
}

export interface CategoryFilterProps {
  categories: any[]
}