'use client'

import { useEffect, useState } from 'react'

interface User {
  _id: string
  email: string
  name?: string
  createdAt: string
  status: 'active' | 'blocked'
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setUsers([
        { _id: '1', email: 'user1@test.com', name: 'John Doe', createdAt: new Date().toISOString(), status: 'active' },
        { _id: '2', email: 'user2@test.com', name: 'Jane Smith', createdAt: new Date().toISOString(), status: 'active' },
        { _id: '3', email: 'user3@test.com', name: 'Bob Wilson', createdAt: new Date().toISOString(), status: 'blocked' },
        { _id: '4', email: 'user4@test.com', name: 'Alice Johnson', createdAt: new Date().toISOString(), status: 'active' }
      ])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUnblock = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active'
    setUsers(users.map(user => 
      user._id === userId ? { ...user, status: newStatus as 'active' | 'blocked' } : user
    ))
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    setUsers(users.filter(user => user._id !== userId))
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
      {/* Search and Stats */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Total: </span>
              <span className="font-semibold text-gray-900">{users.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Active: </span>
              <span className="font-semibold text-green-600">{users.filter(u => u.status === 'active').length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Blocked: </span>
              <span className="font-semibold text-red-600">{users.filter(u => u.status === 'blocked').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
        </div>
        
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || 'No Name'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleBlockUnblock(user._id, user.status)}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                            user.status === 'active'
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {user.status === 'active' ? 'Block' : 'Unblock'}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 text-xs font-medium rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'No users have registered yet'}
            </p>
          </div>
        )}
      </div>
    </>
  )
}