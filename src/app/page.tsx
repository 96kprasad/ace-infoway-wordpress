import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to ACE Infoway
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Discover our latest insights and expertise
      </p>
      <Link 
        href="/blogs" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Explore Blogs
      </Link>
    </div>
  )
}