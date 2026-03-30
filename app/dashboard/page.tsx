import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = createClient()
  
  // TODO: Fetch recent calls data
  // TODO: Fetch pending action items count
  // TODO: Fetch weekly metrics data
  // TODO: Fetch pipeline status

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link href="/calls" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          View All Calls
        </Link>
      </div>

      {/* Recent Calls Widget */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Call with John Doe</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Call with Jane Smith</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Action Items Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Action Items</h3>
          <div className="text-3xl font-bold text-blue-600">12</div>
          <p className="text-sm text-gray-500">Pending items</p>
          <Link href="/action-items" className="text-blue-600 text-sm hover:underline">
            View all →
          </Link>
        </div>

        {/* Weekly Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">This Week</h3>
          <div className="text-3xl font-bold text-green-600">8</div>
          <p className="text-sm text-gray-500">Calls processed</p>
          <Link href="/summaries" className="text-blue-600 text-sm hover:underline">
            View summaries →
          </Link>
        </div>

        {/* Pipeline Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Pipeline Status</h3>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Active</span>
          </div>
          <Link href="/pipeline" className="text-blue-600 text-sm hover:underline">
            View details →
          </Link>
        </div>
      </div>
    </div>
  )
}