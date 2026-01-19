import { Link } from 'react-router-dom'
import { useBlogs } from '../lib/hooks/blogs'
import BlogCard from '../components/BlogCard'
import Skeleton from '../components/Skeleton'
import { Card, CardContent } from '../components/ui/card'

export default function BlogsList() {
  const { data, isLoading, isError, error } = useBlogs()

  if (isLoading)
    return (
      <div className="grid grid-cols-3 gap-6">
        <aside className="col-span-1">
          <h2 className="text-lg font-semibold mb-4">Latest Articles</h2>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </aside>
        <main className="col-span-2">
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    )

  if (isError) return <div>Error: {error?.message}</div>

  const first = data && data.length ? data[0] : null

  return (
    <div className="grid grid-cols-3 gap-6">
      <aside className="col-span-1">
        <h2 className="text-lg font-semibold mb-4">Latest Articles</h2>
        <div className="space-y-4">
          {data?.map((b) => (
            <div key={b.id}>
              <BlogCard blog={b} />
            </div>
          ))}
        </div>
      </aside>

      <main className="col-span-2">
        {first ? (
          <Card>
            <img src={first.coverImage} alt={first.title} className="w-full h-64 object-cover rounded mb-4" />
            <CardContent>
              <h2 className="text-2xl font-bold mb-2">{first.title}</h2>
              <div className="text-sm text-gray-500 mb-4">{first.category?.join(' | ')} • {first.date ? new Date(first.date).toLocaleDateString() : ''}</div>
              <p className="text-gray-700">{first.description}</p>
            </CardContent>
          </Card>
        ) : (
          <div>No blogs yet</div>
        )}
      </main>
    </div>
  )
}
