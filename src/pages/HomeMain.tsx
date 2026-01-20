import { useBlogs } from '../lib/hooks/blogs'
import { Card, CardContent } from '../components/ui/card'
import Skeleton from '../components/Skeleton'
import { Badge } from '../components/ui/badge'

export default function HomeMain() {
  const { data, isLoading } = useBlogs()

  if (isLoading) return <Skeleton className="h-64 w-full" />

  const first = data && data.length ? data[0] : null

  return (
    <div>
      {first ? (
        <Card className="overflow-hidden">
          {first.coverImage && <img src={first.coverImage} alt="cover" className="w-full h-64 object-cover" />}
          <CardContent className="pt-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-md">{first.category?.[0] ?? 'GENERAL'}</Badge>
              <span className="text-xs text-muted-foreground">
                {first.date ? new Date(first.date).toLocaleDateString() : ''}
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">{first.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{first.description}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">No blogs yet.</div>
      )}
    </div>
  )
}
