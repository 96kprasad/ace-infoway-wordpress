const API_URL = 'https://wordpress.org/news/wp-json/wp/v2';

export async function getBlogs() {
  try {
    const response = await fetch(`${API_URL}/posts?per_page=12&_embed`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getMoreBlogs(page: number) {
  try {
    const response = await fetch(`${API_URL}/posts?per_page=12&page=${page}&_embed`);
    if (!response.ok) throw new Error('Failed to fetch more blogs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching more blogs:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    const posts = await response.json();
    return posts[0];
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories?per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}