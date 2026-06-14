import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

export default function PostForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: '', coverImage: '', published: false })

  useEffect(() => {
    if (id) api.get(`/posts/${id}`).then(r => setForm(r.data))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (id) await api.put(`/posts/${id}`, form)
    else await api.post('/posts', form)
    navigate('/posts')
  }

  const field = (key, label, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="w-full border rounded-lg px-4 py-2.5 text-sm" />
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{id ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4 max-w-2xl">
        {field('title', 'Title')}
        {field('slug', 'Slug (e.g. my-post-title)')}
        {field('excerpt', 'Excerpt')}
        {field('category', 'Category')}
        {field('coverImage', 'Cover Image URL')}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea rows={8} value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="w-full border rounded-lg px-4 py-2.5 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.published}
            onChange={e => setForm({ ...form, published: e.target.checked })} />
          Publish immediately
        </label>
        <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700">
          {id ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}