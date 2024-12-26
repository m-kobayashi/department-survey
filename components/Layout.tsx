import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">部門別ヒアリングシート</h1>
          <p className="text-xl text-white opacity-80">あなたの部門を選択して、アンケートにお答えください</p>
        </header>
        <main className="bg-white rounded-lg shadow-2xl p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

