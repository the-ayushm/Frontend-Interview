import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateBlog, useBlogs } from '../lib/hooks/blogs'
import { useToast } from './ToastProvider'
import { Card, CardContent, CardHeader } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'

export default function BlogForm() {
  const navigate = useNavigate()
  const mutation = useCreateBlog()
  const { data: blogs } = useBlogs()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [categoryInput, setCategoryInput] = useState('')

  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const numericIds = (blogs || [])
        .map((blog) => Number(blog.id))
        .filter((id) => !isNaN(id))

      const nextIdNumber =
        numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1

      const nextId = String(nextIdNumber)

      const newBlog = {
        id: nextId,
        title,
        description,
        content,
        category: categoryInput
          ? categoryInput.split(',').map((c) => c.trim().toUpperCase())
          : ['GENERAL'],
        coverImage: coverImage || undefined,
        date: new Date().toISOString(),
      }

      await mutation.mutateAsync(newBlog)
      toast.show('Blog created', 'success')
      navigate('/')
    } catch {
      toast.show('Failed to create blog', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
      <Card>
        <CardHeader className="pb-0">
          <div className="px-6">
            <h2 className="text-xl font-semibold tracking-tight">New Post</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Publish a new article
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid gap-5">

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to crack a finance interview"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary shown in cards"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-48"
                placeholder="Write your article..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Categories (comma separated)</Label>
              <Input
                id="category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="FINANCE, TECH"
              />
              <p className="text-xs text-muted-foreground">
                Tip: categories are auto-uppercased
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <div className="flex items-center gap-3">
                {mutation.isError && (
                  <div className="text-sm text-destructive">
                    Error creating blog
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="cursor-pointer"
                >
                  {mutation.isPending ? 'Saving…' : 'Publish'}
                </Button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </form>
  )
}
