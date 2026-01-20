import { Outlet, useLocation } from 'react-router-dom'
import BlogListAside from './BlogListAside'

export default function LayoutWithAside() {
  const location = useLocation()

  const hideAside =
    location.pathname.startsWith('/blogs/') ||
    location.pathname.startsWith('/new')

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

        {!hideAside && (
          <aside className="lg:col-span-4">
            <BlogListAside />
          </aside>
        )}

        <main className={hideAside ? "lg:col-span-12" : "lg:col-span-8"}>
          <Outlet />
        </main>

      </div>
    </div>
  )
}
