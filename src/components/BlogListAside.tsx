import { Link } from 'react-router-dom'
import { useBlogs } from '../lib/hooks/blogs'
import Skeleton from './Skeleton'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

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
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight">Latest Articles</h2>
        <span className="text-xs text-muted-foreground">{data?.length ?? 0}</span>
      </div>

      <div className="space-y-3">
        {data?.map((b) => (
          <Link key={b.id} to={`/blogs/${b.id}`} className="block">
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="rounded-md">{b.category?.[0] ?? 'GENERAL'}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {b.date ? new Date(b.date).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <div className="line-clamp-2 text-sm font-medium leading-snug">{b.title}</div>
                    <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </aside>
  )
}
