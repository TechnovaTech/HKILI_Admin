'use client'

import { useEffect, useState } from 'react'

interface Story {
  _id: string
  title: string
  content: string
  userId: string
  createdAt: string
  language: string
}

interface NewStory {
  title: string
  content: string
  language: string
  userId: string
}

export default function StoriesManagement() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [languageFilter, setLanguageFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [newStory, setNewStory] = useState<NewStory>({
    title: '',
    content: '',
    language: 'EN',
    userId: '1'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      setStories([
        { _id: '1', title: 'The Magic Forest Adventure', content: 'Once upon a time in a magical forest, there lived a brave little rabbit who discovered a hidden treasure...', userId: '1', createdAt: new Date().toISOString(), language: 'EN' },
        { _id: '2', title: 'Le Château Enchanté', content: 'Il était une fois un château enchanté où vivait une princesse courageuse qui aimait les aventures...', userId: '2', createdAt: new Date().toISOString(), language: 'FR' },
        { _id: '3', title: 'Space Explorer Journey', content: 'In the year 2050, a young astronaut embarked on an incredible journey to discover new planets...', userId: '3', createdAt: new Date().toISOString(), language: 'EN' },
        { _id: '4', title: 'حكاية الأميرة الشجاعة', content: 'في قديم الزمان، كانت هناك أميرة شجاعة تحب المغامرات والاستكشاف...', userId: '4', createdAt: new Date().toISOString(), language: 'AR' }
      ])
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return
    setStories(stories.filter(story => story._id !== storyId))
  }

  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStory.title.trim() || !newStory.content.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      const story: Story = {
        _id: Date.now().toString(),
        title: newStory.title,
        content: newStory.content,
        language: newStory.language,
        userId: newStory.userId,
        createdAt: new Date().toISOString()
      }
      
      setStories([story, ...stories])
      setShowAddModal(false)
      setNewStory({ title: '', content: '', language: 'EN', userId: '1' })
      alert('Story added successfully!')
    } catch (error) {
      console.error('Error adding story:', error)
      alert('Error adding story. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setEditingStory(null)
    setNewStory({ title: '', content: '', language: 'EN', userId: '1' })
  }

  const handleEditStory = (story: Story) => {
    setEditingStory(story)
    setNewStory({
      title: story.title,
      content: story.content,
      language: story.language,
      userId: story.userId
    })
    setShowEditModal(true)
  }

  const handleUpdateStory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStory.title.trim() || !newStory.content.trim() || !editingStory) return

    setIsSubmitting(true)
    try {
      const updatedStories = stories.map(story => 
        story._id === editingStory._id 
          ? { ...story, title: newStory.title, content: newStory.content, language: newStory.language }
          : story
      )
      setStories(updatedStories)
      closeModal()
      alert('Story updated successfully!')
    } catch (error) {
      alert('Error updating story. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredStories = stories.filter(story => {
    const matchesLanguage = !languageFilter || story.language === languageFilter
    const matchesDate = !dateFilter || new Date(story.createdAt).toDateString() === new Date(dateFilter).toDateString()
    return matchesLanguage && matchesDate
  })

  const uniqueLanguages = Array.from(new Set(stories.map(story => story.language)))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
      {/* Filters and Stats */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Languages</option>
                {uniqueLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setLanguageFilter('')
                  setDateFilter('')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Add Story
            </button>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Total: </span>
              <span className="font-semibold text-gray-900">{stories.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Languages: </span>
              <span className="font-semibold text-blue-600">{uniqueLanguages.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Today: </span>
              <span className="font-semibold text-green-600">
                {stories.filter(story => {
                  const today = new Date().toDateString()
                  return new Date(story.createdAt).toDateString() === today
                }).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stories List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Stories</h3>
        </div>
        
        {filteredStories.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredStories.map((story) => (
              <div key={story._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 truncate">
                        {story.title || 'Untitled Story'}
                      </h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {story.language}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(story.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                      {story.content}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Created: {new Date(story.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex gap-2">
                    <button
                      onClick={() => handleEditStory(story)}
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(story._id)}
                      className="bg-red-100 text-red-800 hover:bg-red-200 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-500">
              {languageFilter || dateFilter 
                ? 'Try adjusting your filters' 
                : 'No stories have been created yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Story Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {showEditModal ? 'Edit Story' : 'Add New Story'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={showEditModal ? handleUpdateStory : handleAddStory} className="p-6">
              <div className="space-y-6">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Story Title *
                  </label>
                  <input
                    type="text"
                    value={newStory.title}
                    onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter story title"
                    required
                  />
                </div>

                {/* Language Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language *
                  </label>
                  <select
                    value={newStory.language}
                    onChange={(e) => setNewStory({ ...newStory, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="EN">English</option>
                    <option value="FR">French</option>
                    <option value="AR">Arabic</option>
                    <option value="ES">Spanish</option>
                    <option value="DE">German</option>
                    <option value="IT">Italian</option>
                    <option value="PT">Portuguese</option>
                    <option value="RU">Russian</option>
                    <option value="JA">Japanese</option>
                    <option value="KO">Korean</option>
                    <option value="ZH">Chinese</option>
                    <option value="HI">Hindi</option>
                  </select>
                </div>

                {/* Content Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Story Content *
                  </label>
                  <textarea
                    value={newStory.content}
                    onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Write your story content here..."
                    required
                  />
                  <div className="mt-1 text-sm text-gray-500">
                    {newStory.content.length} characters
                  </div>
                </div>

                {/* User ID Field (Hidden for now, can be made visible if needed) */}
                <input
                  type="hidden"
                  value={newStory.userId}
                  onChange={(e) => setNewStory({ ...newStory, userId: e.target.value })}
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newStory.title.trim() || !newStory.content.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {showEditModal ? 'Updating...' : 'Adding...'}
                    </div>
                  ) : (
                    showEditModal ? 'Update Story' : 'Add Story'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}