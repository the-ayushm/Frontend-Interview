import { Outlet } from 'react-router-dom'
import BlogListAside from './BlogListAside'

export default function LayoutWithAside() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <BlogListAside />
        </div>

        <div className="md:col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
