import { Link } from "react-router-dom"
import { useUser } from "@/Context/user-context"
import { useState } from "react"

const LoginPage = () => {
  const { login, error } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)
      // Login successful - user context will handle navigation
    } catch (err: any) {
      // Handle different types of errors
      if (err.response?.data?.message) {
        // Backend validation error
        setFormError(err.response.data.message)
      } else if (err.message) {
        // Other error with message
        setFormError(err.message)
      } else {
        // Fallback error
        setFormError('Login failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="font-[sans-serif]">
      <div className="grid h-[320px] gap-4 bg-gradient-to-r from-slate-500 to-slate-900 px-8 py-12 max-lg:gap-12 lg:grid-cols-2">
        <div>
         <Link to="/" className="flex items-center space-x-2">
                <img src="/web_logo.png" alt="logo" className='w-20' />
                <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase leading-none text-white">Citizen</span>
                    <span className="text-sm font-bold uppercase leading-none text-white">Engagement</span>
                </div>
          </Link>
          <div className="mt-16 max-w-lg max-lg:hidden">
            <h3 className="text-3xl font-bold text-white">Sign in</h3>
            <p className="mt-4 text-sm text-white">Access your dashboard to submit, track, or manage complaints.</p>
          </div>
        </div>

        <div className="h-max w-full max-w-md rounded-xl border bg-white px-4 py-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto sm:px-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-gray-800">Sign in</h3>
            </div>

            {(error || formError) && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  {error || formError}
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-gray-800">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                  placeholder="Enter email"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="absolute right-4 size-[18px]" viewBox="0 0 24 24">
                  <path d="M12 12.713 1.172 6.4A2 2 0 0 1 2 6h20a2 2 0 0 1 .828.4L12 12.713z" data-original="#000000"></path>
                  <path d="M22 8.118 12 14.431 2 8.118V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.118z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-sm text-gray-800">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                  placeholder="Enter password"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="absolute right-4 size-[18px] cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div className="mt-4 text-right">
              <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Log in'}
              </button>
            </div>
            <p className="mt-8 text-center text-sm text-gray-800">Don&apos;t have an account <Link to="/signup" className="ml-1 whitespace-nowrap font-semibold text-blue-600 hover:underline">Register here</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage