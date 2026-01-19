import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-indigo-600 text-white px-3 py-2 font-bold">CA MONK</div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link to="#">Tools</Link>
            <Link to="#">Practice</Link>
            <Link to="#">Events</Link>
            <Link to="#">Job Board</Link>
            <Link to="#">Points</Link>
            <Link to="/new" className="text-indigo-600 font-medium">New Post</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="default" size="sm">Profile</Button>
        </div>
      </div>
    </header>
  )
}
