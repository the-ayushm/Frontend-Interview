import { Outlet } from 'react-router-dom'
import BlogListAside from './BlogListAside'

export default function LayoutWithAside() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <BlogListAside />
        </aside>

        <main className="lg:col-span-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
