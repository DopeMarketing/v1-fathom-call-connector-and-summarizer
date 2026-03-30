import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function CallDetailsPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const callId = params.id
  
  // TODO: Fetch call details by ID
  // TODO: Fetch action items for this call
  // TODO: Fetch insights for this call
  // TODO: Fetch contact information

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/calls" className="text-blue-600 hover:underline text-sm mb-2 block">
            ← Back to Call Library
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Weekly Sync with Product Team</h1>
          <p className="text-gray-600">Dec 15, 2024 • 45 minutes • 3 participants</p>
        </div>
        <div className="flex space-x-2">
          <Link href="/compare" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
            Compare
          </Link>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transcript Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Transcript</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium text-sm text-gray-600 mb-1">John Doe - 10:00 AM</p>
                <p className="text-gray-800">Thanks everyone for joining. Let's start with the sprint review...</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium text-sm text-gray-600 mb-1">Jane Smith - 10:02 AM</p>
                <p className="text-gray-800">We completed 8 out of 10 story points this sprint. The two remaining items are blocked by...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="space-y-6">
          {/* Action Items Extracted */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Action Items</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="text-sm font-medium">Follow up with design team on mockups</p>
                  <p className="text-xs text-gray-500">Assigned to: John Doe • Due: Dec 20</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="text-sm font-medium">Schedule client review meeting</p>
                  <p className="text-xs text-gray-500">Assigned to: Jane Smith • Due: Dec 18</p>
                </div>
              </div>
            </div>
            <Link href="/action-items" className="text-blue-600 text-sm hover:underline mt-4 block">
              View all action items →
            </Link>
          </div>

          {/* Call Metadata */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Call Details</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">Participants:</span>
                <p className="text-sm">John Doe, Jane Smith, Mike Johnson</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Sprint Review</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}