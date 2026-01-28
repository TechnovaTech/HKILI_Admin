'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/admin/login')
  }

  const isActive = (path: string) => pathname === path

  // Don't show sidebar and header for login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 shadow-2xl fixed h-full z-10">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white">HKILI</h1>
              <p className="text-sm text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="mt-6 px-3">
          <Link 
            href="/admin" 
            className={`flex items-center px-4 py-3 mb-2 rounded-xl font-medium transition-colors ${
              isActive('/admin') 
                ? 'text-white bg-slate-800' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            Dashboard
          </Link>
          <Link 
            href="/admin/users" 
            className={`flex items-center px-4 py-3 mb-2 rounded-xl font-medium transition-colors ${
              isActive('/admin/users') 
                ? 'text-white bg-slate-800' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Users Management
          </Link>
          <Link 
            href="/admin/stories" 
            className={`flex items-center px-4 py-3 mb-2 rounded-xl font-medium transition-colors ${
              isActive('/admin/stories') 
                ? 'text-white bg-slate-800' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Stories Management
          </Link>
          <Link 
            href="/admin/characters" 
            className={`flex items-center px-4 py-3 mb-2 rounded-xl font-medium transition-colors ${
              isActive('/admin/characters') 
                ? 'text-white bg-slate-800' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Characters
          </Link>
          <Link 
            href="/admin/settings" 
            className={`flex items-center px-4 py-3 mb-2 rounded-xl font-medium transition-colors ${
              isActive('/admin/settings') 
                ? 'text-white bg-slate-800' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {pathname === '/admin' && 'Dashboard'}
                  {pathname === '/admin/users' && 'Users Management'}
                  {pathname === '/admin/stories' && 'Stories Management'}
                  {pathname === '/admin/characters' && 'Characters'}
                  {pathname === '/admin/settings' && 'Settings'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {pathname === '/admin' && 'Welcome to your admin dashboard'}
                  {pathname === '/admin/users' && 'Manage and monitor user accounts'}
                  {pathname === '/admin/stories' && 'Review and moderate stories'}
                  {pathname === '/admin/characters' && 'Manage story characters'}
                  {pathname === '/admin/settings' && 'Configure system settings'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}