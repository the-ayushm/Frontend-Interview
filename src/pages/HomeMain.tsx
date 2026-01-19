import { useBlogs } from '../lib/hooks/blogs'
import { Card, CardContent } from '../components/ui/card'
import Skeleton from '../components/Skeleton'

export default function HomeMain() {
  const { data, isLoading } = useBlogs()

  if (isLoading) return <Skeleton className="h-64 w-full" />

  const first = data && data.length ? data[0] : null

  return (
    <div>
      {first ? (
        <Card>
          {first.coverImage && <img src={first.coverImage} alt="cover" className="w-full h-64 object-cover rounded-t-md" />}
          <CardContent>
            <h2 className="text-2xl font-bold mb-2">{first.title}</h2>
            <div className="text-sm text-gray-500 mb-4">{first.category?.join(' | ')} • {first.date ? new Date(first.date).toLocaleDateString() : ''}</div>
            <p className="text-gray-700">{first.description}</p>
          </CardContent>
        </Card>
      ) : (
        <div>No blogs yet</div>
      )}
    </div>
  )
}
