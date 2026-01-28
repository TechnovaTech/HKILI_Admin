'use client'
import { useState } from 'react'
import { mockUsers } from '../../../lib/mockData'
import Link from 'next/link'

export default function UsersManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')

  const handleBlockUnblock = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active'
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
  }

  const handleDelete = (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    setUsers(users.filter(user => user.id !== userId))
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 fixed h-full z-10">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">HKILI</h1>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-4 border-blue-600 font-medium">
            Users Management
          </Link>
          <Link href="/admin/stories" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">
            Stories Management
          </Link>
          <Link href="/admin/characters" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">
            Characters
          </Link>
          <Link href="/admin/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">
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
                <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
                <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  window.location.href = '/admin/login'
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleBlockUnblock(user.id, user.status)}
                        className="mr-2 px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded"
                      >
                        {user.status === 'active' ? 'Block' : 'Unblock'}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}