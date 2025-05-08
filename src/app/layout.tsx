import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Insurance MVP',
  description: 'Simple and modern insurance website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" className="text-2xl font-bold text-primary">InsureMVP</a>
                </div>
                <nav className="ml-6 flex items-center space-x-8">
                  <a href="/" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">Home</a>
                  <a href="/products" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">Products</a>
                </nav>
              </div>
              <div className="flex items-center">
                <a href="/chat" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Start with Chat
                </a>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} InsureMVP. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}