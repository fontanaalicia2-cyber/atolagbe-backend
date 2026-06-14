import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => { api.get('/projects').then(r => setProjects(r.data)) }, [])

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`)
    setProjects(projects.filter(p => p._id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <Link to="/projects/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
          + New Project
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map(project => (
              <tr key={project._id}>
                <td className="px-6 py-4 font-medium text-gray-800">{project.title}</td>
                <td className="px-6 py-4 text-gray-500">{project.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <Link to={`/projects/edit/${project._id}`} className="text-blue-500 hover:underline">Edit</Link>
                  <button onClick={() => deleteProject(project._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}