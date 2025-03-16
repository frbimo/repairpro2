import type React from "react"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return <div className={`container py-10 px-6 md:px-10 ${className}`}>{children}</div>
}

