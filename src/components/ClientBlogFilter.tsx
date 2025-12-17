'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Blog, Category } from '@/types/types';
import BlogCard from '@/components/BlogCard';
import CategoryFilter from '@/components/CategoryFilter';

interface ClientBlogFilterProps {
  blogs: Blog[];
  categories: Category[];
}

export default function ClientBlogFilter({ blogs, categories }: ClientBlogFilterProps) {
  const { selectedCategory } = useSelector((state: RootState) => state.category);
  
  const filteredBlogs = selectedCategory 
    ? blogs.filter(blog => blog.categories.includes(selectedCategory))
    : blogs;

  return (
    <>
      <CategoryFilter categories={categories} />
      
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
}