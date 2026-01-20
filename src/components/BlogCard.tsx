import type { Blog } from '../lib/hooks/blogs'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

export default function BlogCard({ blog }: { blog: Blog }) {
  const navigate = useNavigate()

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      {blog.coverImage && (
        <img src={blog.coverImage} alt={blog.title} className="w-full h-28 object-cover" />
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-md">{blog.category?.[0] ?? 'GENERAL'}</Badge>
              <span className="text-xs text-muted-foreground">
                {blog.date ? new Date(blog.date).toLocaleDateString() : ''}
              </span>
            </div>
            <div className="line-clamp-2 text-sm font-semibold leading-snug">{blog.title}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-muted-foreground line-clamp-3">{blog.description}</div>
      </CardContent>

      <CardFooter className="justify-between">
        <Button size="sm" variant="secondary" onClick={() => navigate(`/blogs/${String(blog.id)}`)}>
          Read
        </Button>
      </CardFooter>
    </Card>
  )
}
