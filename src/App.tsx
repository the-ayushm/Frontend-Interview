import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogDetail from './pages/BlogDetail'
import BlogForm from './components/BlogForm'
import { ToastProvider } from './components/ToastProvider'
import Navbar from './components/Navbar'
import './App.css'
import LayoutWithAside from './components/LayoutWithAside'
import HomeMain from './pages/HomeMain'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Navbar />
        <div className="py-8">
          <header className="mx-auto mb-8 max-w-6xl px-4">
            <div className="rounded-2xl border bg-card p-6 sm:p-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  CA Monk Blog
                </h1>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Stay updated with the latest trends in finance, accounting, and career growth.
                </p>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<LayoutWithAside />}>
              <Route index element={<HomeMain />} />
              <Route path="blogs/:id" element={<BlogDetail />} />
              <Route path="new" element={<BlogForm />} />
            </Route>
          </Routes>
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
