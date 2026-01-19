import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateBlog } from '../lib/hooks/blogs'
import { useToast } from './ToastProvider'

export default function BlogForm() {
  const navigate = useNavigate()
  const mutation = useCreateBlog()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [categoryInput, setCategoryInput] = useState('')
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newBlog = {
        title,
        description,
        content,
        category: categoryInput ? categoryInput.split(',').map((c) => c.trim().toUpperCase()) : ['GENERAL'],
        coverImage: coverImage || undefined,
        date: new Date().toISOString(),
      }
      await mutation.mutateAsync(newBlog)
      toast.show('Blog created', 'success')
      navigate('/')
    } catch (err) {
      toast.show('Failed to create blog', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border rounded p-2" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border rounded p-2" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full border rounded p-2 h-40" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Cover Image URL</label>
        <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." className="mt-1 block w-full border rounded p-2" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Categories (comma separated)</label>
        <input value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} placeholder="FINANCE, TECH" className="mt-1 block w-full border rounded p-2" />
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving...' : 'Save'}
      </button>

      {mutation.isError && <div className="mt-2 text-red-600">Error creating blog</div>}
    </form>
  )
}
