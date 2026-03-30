import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function ActionItemsPage() {
  const supabase = createClient()
  
  // TODO: Fetch all action items with status
  // TODO: Fetch associated call data
  // TODO: Fetch contact information for assignees

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Action Items Dashboard</h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Follow-up</option>
            <option>Meeting</option>
            <option>Research</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Pending (8)</h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
              <h3 className="font-medium text-sm mb-2">Follow up with design team on mockups</h3>
              <p className="text-xs text-gray-600 mb-2">From: Weekly Sync call</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Due: Dec 20</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Overdue</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
              <h3 className="font-medium text-sm mb-2">Schedule client review meeting</h3>
              <p className="text-xs text-gray-600 mb-2">From: Discovery call</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Due: Dec 18</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Urgent</span>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">In Progress (3)</h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="font-medium text-sm mb-2">Research competitor pricing models</h3>
              <p className="text-xs text-gray-600 mb-2">From: Strategy call</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Due: Dec 22</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Completed (12)</h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 opacity-75">
              <h3 className="font-medium text-sm mb-2">Send contract to legal team</h3>
              <p className="text-xs text-gray-600 mb-2">From: Contract review</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Completed: Dec 14</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deadline Calendar */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {/* Calendar would go here */}
          <div className="text-center p-2 border rounded">
            <p className="text-xs font-medium">Mon 16</p>
            <div className="mt-1">
              <div className="w-2 h-2 bg-red-500 rounded-full mx-auto"></div>
            </div>
          </div>
          <div className="text-center p-2 border rounded">
            <p className="text-xs font-medium">Tue 17</p>
          </div>
          <div className="text-center p-2 border rounded">
            <p className="text-xs font-medium">Wed 18</p>
            <div className="mt-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}