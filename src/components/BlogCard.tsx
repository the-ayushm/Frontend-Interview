import type { Blog } from '../lib/hooks/blogs'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

export default function BlogCard({ blog }: { blog: Blog }) {
  const navigate = useNavigate()

  return (
    <Card className="hover:shadow-md overflow-hidden">
      {blog.coverImage && (
        <img src={blog.coverImage} alt={blog.title} className="w-full h-28 object-cover" />
      )}

      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-3">
            <Badge>{blog.category?.[0]}</Badge>
            <div className="font-semibold text-base">{blog.title}</div>
          </div>
          <div className="text-xs text-gray-500">{blog.date ? new Date(blog.date).toLocaleDateString() : ''}</div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-gray-600 line-clamp-3">{blog.description}</div>
      </CardContent>

      <CardFooter>
        <Button size="sm" variant="default" onClick={() => navigate(`/blogs/${String(blog.id)}`)}>
          Read
        </Button>
      </CardFooter>
    </Card>
  )
}
