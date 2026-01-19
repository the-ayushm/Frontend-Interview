import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogsList from './pages/BlogsList'
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
        <div className="py-6">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold">CA Monk Blog</h1>
            <p className="text-gray-500 mt-2">Stay updated with the latest trends in finance, accounting, and career growth</p>
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
