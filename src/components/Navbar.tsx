import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            CA
          </span>
          <span className="hidden sm:inline">Monk Blog</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {["Tools","Practice","Events","Job Board","Points"].map(item => (
            <Link key={item} to="#" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent">
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link to="/new">New Post</Link>
          </Button>
          <Button size="sm">Profile</Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background px-4 pb-4">
          {["Tools","Practice","Events","Job Board","Points"].map(item => (
            <Link
              key={item}
              to="#"
              className="block py-2 text-sm text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}

          <Link
            to="/new"
            className="block py-2 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            New Post
          </Link>

          <button className="mt-2 w-full rounded-md bg-primary py-2 text-sm text-primary-foreground">
            Profile
          </button>
        </div>
      )}
    </header>
  )
}
