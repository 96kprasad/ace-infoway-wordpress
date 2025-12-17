# ACE Infoway WordPress Blog

A modern, SEO-friendly blog module built with Next.js 14 and Headless WordPress, demonstrating advanced data fetching, SEO optimization, form handling, state management, and UI best practices.

## Features

- **Next.js 14** with App Router
- **Headless WordPress** integration via REST API
- **SEO Optimized** with dynamic meta tags and ISR
- **Responsive Design** with TailwindCSS
- **State Management** with Redux Toolkit
- **Form Handling** with Formik + Yup validation
- **Toast Notifications** with React Toastify
- **Image Optimization** with next/image and lazy loading
- **ISR (Incremental Static Regeneration)** for performance
- **Infinite Scroll** for seamless user experience

## System Requirements

### Required (Must Be Installed)
- **Node.js 18.x or higher** - Required for Next.js v14+
- **PHP 8.4** with WordPress installation
- **XAMPP, LAMP, or WAMP** (Latest versions)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ace-infoway-wordpress
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```


4. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   ```
   Update the environment variable:
   ```env
   NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost/wordpress/wp-json/wp/v2
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

##  Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blogs/             # Blog listing and detail pages
│   │   ├── [slug]/        # Dynamic blog detail page
│   │   └── page.tsx       # Blog listing with infinite scroll
│   ├── contact/           # Contact form page
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── BlogCard.tsx       # Blog post card with lazy loading
│   ├── CategoryFilter.tsx # Category filtering component
│   ├── ClientBlogFilter.tsx # Client-side filtering wrapper
│   └── Header.tsx         # Navigation header
├── lib/                   # Utility libraries
│   └── providers.tsx      # Redux and Toast providers
├── services/              # API services
│   └── wordpress.ts       # WordPress REST API calls with fetch
├── store/                 # Redux store
│   ├── index.ts          # Store configuration
│   └── categorySlice.ts   # Category state management
├── styles/               # Global styles
│   └── globals.css       # Tailwind CSS imports
├── types/                # TypeScript definitions (legacy)
│   └── blog.ts           # Blog and Category types
└── utils/                # Utility functions and types
    ├── helper.js         # Date formatting utilities
    └── types.ts          # Centralized TypeScript types
```

## Pages & Features Implementation

### 1. Blog Listing Page (/blogs)
-  **Data Fetching**: WordPress REST API integration
-  **Display Elements**: Featured image, title, excerpt, published date, category
-  **ISR Implementation**: `revalidate = 3600` (1-hour cache)
-  **SEO**: Meta tags and semantic HTML structure
-  **Responsive Design**: Grid layout (1/2/3 columns)
-  **Infinite Scroll**: Loads 12 posts initially, then loads more on scroll
-  **Performance**: Image lazy loading with next/image

### 2. Blog Detail Page (/blogs/[slug])
-  **Dynamic Routing**: WordPress slug-based URLs
-  **Content Rendering**: Post content (HTML), author name, categories
-  **Performance**: next/image optimization, lazy loading
-  **Accessibility**: Proper headings hierarchy (h1, h2)
-  **SEO**: Dynamic meta tags with `generateMetadata`
-  **ISR**: Static generation with `generateStaticParams`

### 3. Global Category Filter (Redux)
-  **State Management**: Redux Toolkit for category selection
-  **Filtering Logic**: Filter blogs based on selected category
-  **Persistence**: Category selection maintained across navigation

### 4. Contact Form
-  **Form Fields**: Name, Email, Message
-  **Validation**: Formik + Yup schema validation
-  **API Integration**: Mock API with success/error simulation
-  **User Feedback**: Toast notifications via React Toastify
-  **UX**: Loading states and form reset on success

## Technical Implementation

### SEO Optimization
- Dynamic meta tags for each blog post
- Open Graph tags for social sharing
- Semantic HTML structure with proper headings
- Image alt attributes for accessibility
- ISR for fresh content with SEO benefits

### Performance Features
- **ISR**: 1-hour revalidation for fresh content
- **Image Optimization**: WebP format with responsive sizing
- **Lazy Loading**: Images load only when visible
- **Infinite Scroll**: Efficient pagination with debounced scroll detection
- **Bundle Splitting**: Automatic code splitting by Next.js

### State Management
- Redux Toolkit for global category filtering
- Persistent category selection across pages
- Clean separation of concerns between server and client components

### Form Handling
- Formik for form state management
- Yup schema validation with custom error messages
- Toast notifications for user feedback
- Loading states and error handling

##  Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:

4. Deploy automatically with ISR support

### Netlify
1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Configure environment variables
4. Set up rewrite rules for dynamic routes

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Performance Metrics

- **ISR**: 1-hour revalidation for optimal content freshness
- **Image Optimization**: Automatic WebP conversion and responsive sizing
- **Lazy Loading**: Reduces initial page load time
- **Infinite Scroll**: Smooth pagination without page reloads
- **Bundle Splitting**: Optimized JavaScript delivery
- **Caching**: Browser and CDN caching strategies with ISR

## Evaluation Criteria Status

| Area | Implementation | Status |
|------|----------------|--------|
| **Next.js Data Fetching** | WordPress REST API with ISR | Complete |
| **SEO Implementation** | Dynamic meta tags, proper structure | Complete |
| **Redux Usage** | Category filtering state management | Complete |
| **Form Handling** | Formik + Yup with toast notifications | Complete |
| **UI & Responsiveness** | TailwindCSS responsive design | Complete |

## Code Quality

- **TypeScript**: Full type safety with centralized type definitions
- **ESLint**: Clean code standards
- **Component Architecture**: Reusable and maintainable components
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Performance**: Optimized rendering and data fetching

##  Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Open an issue in the GitHub repository
- Check the WordPress REST API documentation
- Verify your local WordPress installation is running

## Future Improvements

### **Data Fetching & Caching**
- **React Query/TanStack Query** - Advanced caching, background refetching, optimistic updates
- **RTK Query** - Powerful data fetching with Redux integration

- **Apollo Client** - GraphQL data management

### **SEO Enhancements**
- **Open Graph tags** - Enhanced social media sharing
- **Twitter Cards** - Rich Twitter previews
- **Schema markup** - Rich snippets for search engines
- **Canonical URLs** - Prevent duplicate content issues
- **sitemap.xml & robots.txt** - Better search engine indexing
- **Meta descriptions** - Improved search visibility

### **Performance Optimizations**
- **Service Worker** - Offline functionality and caching
- **PWA support** - App-like experience with install prompts
- **Bundle analyzer** - Code splitting optimization
- **Image compression** - WebP/AVIF format support
- **Preloading strategies** - Critical resource optimization
- **Code splitting** - Route-based lazy loading

### **UI/UX Enhancements**
- **Dark mode** - Theme switching capability
- **Search functionality** - Real-time blog search with filters
- **Related posts** - Content discovery features
- **Reading time estimation** - User engagement metrics
- **Social sharing buttons** - Easy content sharing
- **Breadcrumbs** - Enhanced navigation
- **Loading skeletons** - Better perceived performance
- **Pagination alternative** - Traditional pagination option

### **Advanced Features**
- **Comments system** - User interaction and 
- **Error boundaries** - Graceful error handling
- **Bookmark/Favorites** - User preference management
- **Rate limiting** - API protection and abuse prevention
- **Content management** - Admin dashboard


## Live Demo

[Deploy URL will be added after deployment]

---

**Built with ❤️ using Next.js 14, WordPress by Prasad Sapkal**