import { Link } from 'react-router-dom'
import { useBlogs } from '../lib/hooks/blogs'
import BlogCard from './BlogCard'
import Skeleton from './Skeleton'

export default function BlogListAside() {
  const { data, isLoading } = useBlogs()

  if (isLoading)
    return (
      <aside className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </aside>
    )

  return (
    <aside className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Latest Articles</h2>
      <div className="space-y-4">
        {data?.map((b) => (
          <Link key={b.id} to={`/blogs/${b.id}`} className="block">
            <div className="p-3 rounded-lg border hover:shadow-sm bg-white">
              <div className="text-xs text-gray-400 mb-1">{b.category?.slice(0,1).join(' | ')}</div>
              <div className="font-medium">{b.title}</div>
              <div className="text-sm text-gray-500 mt-2 line-clamp-2">{b.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
