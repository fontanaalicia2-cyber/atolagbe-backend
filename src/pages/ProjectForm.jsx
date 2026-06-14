import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

export default function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', location: '', capacity: '', status: 'Ongoing', description: '', coverImage: '' })

  useEffect(() => {
    if (id) api.get(`/projects/${id}`).then(r => setForm(r.data))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (id) await api.put(`/projects/${id}`, form)
    else await api.post('/projects', form)
    navigate('/projects')
  }

  const field = (key, label) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="w-full border rounded-lg px-4 py-2.5 text-sm" />
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{id ? 'Edit Project' : 'New Project'}</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4 max-w-2xl">
        {field('title', 'Title')}
        {field('location', 'Location')}
        {field('capacity', 'Capacity (e.g. 2.5 MW)')}
        {field('coverImage', 'Cover Image URL')}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
            className="w-full border rounded-lg px-4 py-2.5 text-sm">
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea rows={4} value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-lg px-4 py-2.5 text-sm" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700">
          {id ? 'Update Project' : 'Create Project'}
        </button>
      </form>
    </div>
  )
}