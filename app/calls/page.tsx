import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function CallsPage() {
  const supabase = createClient()
  
  // TODO: Fetch all calls with pagination
  // TODO: Fetch contact names for calls
  // TODO: Fetch tags for filtering

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Call Library</h1>
        <div className="flex items-center space-x-4">
          {/* Search Filter */}
          <input
            type="text"
            placeholder="Search calls..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Tags</option>
            <option>Important</option>
            <option>Follow-up</option>
          </select>
        </div>
      </div>

      {/* Call List */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {/* Call Card */}
          <div className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Weekly Sync with Product Team</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Important</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Call with John Doe, Jane Smith</p>
                <p className="text-sm text-gray-500">Duration: 45 minutes • Dec 15, 2024</p>
              </div>
              <Link
                href="/calls/1"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Client Discovery Call</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Follow-up</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Call with Sarah Wilson</p>
                <p className="text-sm text-gray-500">Duration: 30 minutes • Dec 14, 2024</p>
              </div>
              <Link
                href="/calls/2"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
        <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">1</button>
        <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
        <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
      </div>
    </div>
  )
}