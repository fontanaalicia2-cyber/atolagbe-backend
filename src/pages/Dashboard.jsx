import { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {
  const [counts, setCounts] = useState({ posts: 0, projects: 0 })

  useEffect(() => {
    Promise.all([api.get('/posts'), api.get('/projects')]).then(([posts, projects]) => {
      setCounts({ posts: posts.data.length, projects: projects.data.length })
    })
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          { label: 'Blog Posts', count: counts.posts, color: 'bg-blue-50 text-blue-700' },
          { label: 'Projects', count: counts.projects, color: 'bg-green-50 text-green-700' },
        ].map(({ label, count, color }) => (
          <div key={label} className={`rounded-xl p-6 ${color}`}>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-4xl font-bold mt-1">{count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}