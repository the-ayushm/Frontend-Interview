import { useBlog } from '../lib/hooks/blogs'
import Skeleton from '../components/Skeleton'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


export default function BlogDetail() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useBlog(id)
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  if (isLoading)
    return (
      <div>
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-32 w-full" />
      </div>
    )

  if (isError) return <div>Error: {error?.message}</div>
  if (!data) return <div>Blog not found</div>

  const words = (data.content || '').split(/\s+/).filter(Boolean).length
  const readMins = Math.max(1, Math.ceil(words / 200))

 
  const handleShare = async () => {
    const url = `${window.location.origin}/blogs/${id}`
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({ title: data.title, text: data.description, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className="mx-auto w-full max-w-3xl">
       <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="mb-4 md:hidden"
    >
      ← Back
    </Button>
      {data.coverImage && (
        <div className="overflow-hidden rounded-2xl border bg-card">
          <img src={data.coverImage} alt="cover" className="h-72 w-full object-cover" />
        </div>
      )}

      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{data.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{data.description}</p>
        </div>

        <Button variant="secondary" size="sm" onClick={handleShare} className="cursor-pointer"
        >
          {copied ? 'Copied' : 'Share'}
        </Button>
      </div>

      <div className="mt-5">
        <Card>
          <CardContent className="py-4">
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Category</div>
                <div className="font-medium">{data.category?.join(', ') || 'GENERAL'}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Read time</div>
                <div className="font-medium">{readMins} min read</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Date</div>
                <div className="font-medium">{data.date ? new Date(data.date).toLocaleDateString() : ''}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <article className="mt-8 space-y-4 text-sm leading-7 text-foreground sm:text-base">
        <p>{data.content}</p>
      </article>

      <div className="mt-10 border-t pt-8">
        <div className="flex items-start gap-4">
          <Avatar className="size-12">
            {data.author?.avatar ? (
              <AvatarImage src={data.author.avatar} alt={data.author?.name || 'Author'} />
            ) : (
              <AvatarFallback>
                {(data.author?.name || 'AM')
                  .split(' ')
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join('')}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold">{data.author?.name || 'Arjun Mehta'}</div>
                <div className="text-xs text-muted-foreground">Senior Financial Analyst</div>
              </div>
              <FollowButton authorKey={data.author?.name || `blog-${id}`} />
            </div>

            <div className="mt-3 text-sm text-muted-foreground">
              {data.author?.bio ||
                'Arjun writes about finance, fintech and accounting careers. He focuses on practical insights for professionals.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FollowButton({ authorKey }: { authorKey: string }) {
  const key = `followed:${authorKey}`
  const [followed, setFollowed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(key) === '1'
    } catch {
      return false
    }
  })

  const toggle = () => {
    try {
      const next = !followed
      setFollowed(next)
      localStorage.setItem(key, next ? '1' : '0')
    } catch (e) {
      setFollowed(!followed)
    }
  }

  return (
    <Button variant={followed ? 'secondary' : 'default'} size="sm" onClick={toggle}>
      {followed ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
