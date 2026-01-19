import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'

export type Blog = {
  id?: number
  title: string
  category: string[]
  description: string
  date?: string
  coverImage?: string
  content: string
}

const BLOGS_KEY = ['blogs'] as const

export function useBlogs() {
  return useQuery<Blog[], Error>({
    queryKey: BLOGS_KEY,
    queryFn: async () => {
      const { data } = await api.get('/blogs')
      return data
    },
  })
}

export function useBlog(id?: number | string) {
  return useQuery<Blog, Error>({
    queryKey: [...BLOGS_KEY, id],
    queryFn: async () => {
      const { data } = await api.get(`/blogs/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export function useCreateBlog() {
  const queryClient = useQueryClient()
  return useMutation<Blog, Error, Blog>({
    mutationFn: async (newBlog: Blog) => {
      const { data } = await api.post('/blogs', newBlog)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_KEY })
    },
  })
}
