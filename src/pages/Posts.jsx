import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => { api.get('/posts').then(r => setPosts(r.data)) }, [])

  const deletePost = async (id) => {
    if (!confirm('Delete this post?')) return
    await api.delete(`/posts/${id}`)
    setPosts(posts.filter(p => p._id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blog Posts</h2>
        <Link to="/posts/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
          + New Post
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map(post => (
              <tr key={post._id}>
                <td className="px-6 py-4 font-medium text-gray-800">{post.title}</td>
                <td className="px-6 py-4 text-gray-500">{post.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <Link to={`/posts/edit/${post._id}`} className="text-blue-500 hover:underline">Edit</Link>
                  <button onClick={() => deletePost(post._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}