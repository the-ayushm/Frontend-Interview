import { useParams } from 'react-router-dom'
import { useBlog } from '../lib/hooks/blogs'
import Skeleton from '../components/Skeleton'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { useState } from 'react'

export default function BlogDetail() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useBlog(id)
  const [copied, setCopied] = useState(false)

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <aside className="md:col-span-1">
        <Card className="p-4">
          <div className="text-sm text-gray-600">{data.category?.join(' | ')}</div>
          <h3 className="font-semibold mt-3">{data.title}</h3>
          <p className="text-gray-500 mt-2">{data.description}</p>
        </Card>
      </aside>

      <main className="md:col-span-2">
        {/* Image */}
        {data.coverImage && <img src={data.coverImage} alt="cover" className="w-full h-64 object-cover rounded-md mb-6" />}

        {/* Title + Share */}
        <div className="flex items-start justify-between mb-4">
          <div className="max-w-[70%]">
            <h2 className="text-3xl font-extrabold mb-2">{data.title}</h2>
            <div className="text-gray-500">{data.description}</div>
          </div>

          <div>
            <Button variant="default" size="sm" onClick={handleShare}>{copied ? 'Copied' : 'Share'}</Button>
          </div>
        </div>

        {/* Meta card: Category / Read Time / Date */}
        <div className="mb-6">
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Category</div>
                  <div className="font-medium">{data.category?.join(', ')}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Read Time</div>
                  <div className="font-medium">{readMins} min read</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Date</div>
                  <div className="font-medium">{new Date(data.date || '').toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Article content */}
        <article className="prose max-w-none">
          <p className="mb-4">{data.content}</p>
        </article>

        {/* Author block with follow toggle */}
        <div className="mt-8 border-t pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="size-12">
              {data.author?.avatar ? (
                <AvatarImage src={data.author.avatar} alt={data.author?.name || 'Author'} />
              ) : (
                <AvatarFallback>{(data.author?.name || 'AM').split(' ').map(n => n[0]).slice(0,2).join('')}</AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{data.author?.name || 'Arjun Mehta'}</div>
                  <div className="text-xs text-gray-500">Senior Financial Analyst</div>
                </div>
                <div>
                  <FollowButton authorKey={data.author?.name || `blog-${id}`} />
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600">{data.author?.bio || 'Arjun writes about finance, fintech and accounting careers. He focuses on practical insights for professionals.'}</div>
            </div>
          </div>
        </div>
      </main>
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
    <Button variant="default" size="sm" onClick={toggle}>{followed ? 'Unfollow' : 'Follow'}</Button>
  )
}
