'use client'
import { useState } from 'react'
import { mockStories } from '../../../lib/mockData'

export default function StoriesManagement() {
  const [stories, setStories] = useState(mockStories)
  const [languageFilter, setLanguageFilter] = useState('')

  const handleDelete = (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return
    setStories(stories.filter(story => story.id !== storyId))
  }

  const filteredStories = stories.filter(story => 
    !languageFilter || story.language === languageFilter
  )

  const uniqueLanguages = [...new Set(stories.map(story => story.language))]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stories Management</h1>
      
      <div className="mb-4">
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Languages</option>
          {uniqueLanguages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Language</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStories.map((story) => (
              <tr key={story.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{story.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{story.language}</td>
                <td className="px-6 py-4 whitespace-nowrap">{story.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    story.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {story.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(story.id)}
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
    </div>
  )
}