import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })

    const main = document.querySelector("main")
    if (main) {
      main.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [pathname])

  return null
}
