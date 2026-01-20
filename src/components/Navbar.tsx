import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold tracking-tight hover:bg-accent"
            aria-label="CA Monk home"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              CA
            </span>
            <span className="hidden sm:inline">Monk Blog</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link to="#" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground">
              Tools
            </Link>
            <Link to="#" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground">
              Practice
            </Link>
            <Link to="#" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground">
              Events
            </Link>
            <Link to="#" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground">
              Job Board
            </Link>
            <Link to="#" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground">
              Points
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
            <Link to="/new">New Post</Link>
          </Button>
          <Button variant="default" size="sm">Profile</Button>
        </div>
      </div>
    </header>
  )
}
