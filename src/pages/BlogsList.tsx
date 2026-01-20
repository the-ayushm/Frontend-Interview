import { useBlogs } from '../lib/hooks/blogs'
import BlogCard from '../components/BlogCard'
import Skeleton from '../components/Skeleton'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function BlogsList() {
  const { data, isLoading, isError, error } = useBlogs()

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <h2 className="text-base font-semibold tracking-tight mb-3">Latest Articles</h2>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </aside>
        <main className="lg:col-span-8">
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    )

  if (isError) return <div>Error: {error?.message}</div>

  const first = data && data.length ? data[0] : null

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        <h2 className="text-base font-semibold tracking-tight mb-3">Latest Articles</h2>
        <div className="space-y-4">
          {data?.map((b) => (
            <div key={b.id}>
              <BlogCard blog={b} />
            </div>
          ))}
        </div>
      </aside>

      <main className="lg:col-span-8">
        {first ? (
          <Card className="overflow-hidden">
            {first.coverImage && (
              <img src={first.coverImage} alt={first.title} className="w-full h-64 object-cover" />
            )}
            <CardContent className="pt-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-md">{first.category?.[0] ?? 'GENERAL'}</Badge>
                <span className="text-xs text-muted-foreground">
                  {first.date ? new Date(first.date).toLocaleDateString() : ''}
                </span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">{first.title}</h2>
              <p className="text-sm text-muted-foreground">{first.description}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">No blogs yet.</div>
        )}
      </main>
    </div>
  )
}
