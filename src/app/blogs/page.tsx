'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Blog, Category } from '@/types/types';
import BlogCard from '@/components/BlogCard';
import CategoryFilter from '@/components/CategoryFilter';
import { getBlogs, getCategories, getMoreBlogs } from '@/services/wordpressApi';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const { selectedCategory } = useSelector((state: RootState) => state.category);

  const filteredBlogs = selectedCategory 
    ? blogs.filter(blog => blog.categories.includes(selectedCategory))
    : blogs;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (isScrolling || loadingMore || !hasMore) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
          setIsScrolling(true);
          loadMorePosts();
        }
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [loadingMore, hasMore, isScrolling]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogsResponse, categoriesResponse] = await Promise.all([
        getBlogs(),
        getCategories()
      ]);
      setBlogs(blogsResponse || []);
      setCategories(categoriesResponse || []);
      setPage(2);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    console.log('Loading page:', page);
    
    try {
      const moreBlogs = await getMoreBlogs(page);
      if (moreBlogs.length === 0 || moreBlogs.length < 12) {
        setHasMore(false);
      } else {
        setBlogs(prev => [...prev, ...moreBlogs]);
      }
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load more posts:', error);
    }
    
    setLoadingMore(false);
    setIsScrolling(false);
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Blog</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Blog</h1>
      <CategoryFilter categories={categories} />
      
      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          {loadingMore && (
            <div className="flex justify-center mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
