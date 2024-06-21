import { ReactNode } from "react"
import Header from "./Header"

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="flex h-full justify-center">
        <div className="container bg-white p-4 sm:p-6">{children}</div>
      </main>
    </div>
  )
}

export default Layout
