import { Outlet, NavLink, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-green-700">Atolagbe Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { to: '/', label: 'Dashboard' },
            { to: '/posts', label: 'Blog Posts' },
            { to: '/projects', label: 'Projects' },
          ].map(({ to, label }) => (
            <NavLink key={to} to={to} end
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button onClick={logout} className="w-full text-sm text-red-500 hover:text-red-700">
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}