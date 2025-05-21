import { Link, useNavigate } from "react-router-dom"
import { useUser } from "@/Context/user-context"
import { useState } from "react"

const SignupPage = () => {
    const { register, error } = useUser()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
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
            await register(
                formData.name,
                formData.email,
                formData.password
            )
            // Registration successful - user context will handle navigation
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
                setFormError('Registration failed. Please try again.')
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
                        <h3 className="text-3xl font-bold text-white">Sign up</h3>
                        <p className="mt-4 text-sm text-white">Create an account to submit, track, or manage complaints.</p>
                    </div>
                </div>

                <div className="h-max w-full max-w-md rounded-xl border bg-white px-4 py-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto sm:px-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-8">
                            <h3 className="text-3xl font-extrabold text-gray-800">Sign up</h3>
                        </div>

                        {(error || formError) && (
                            <div className="mb-4 rounded-md bg-red-50 p-4">
                                <div className="text-sm text-red-700">
                                    {error || formError}
                                </div>
                            </div>
                        )}

                        <div className="mb-8 space-x-4 max-sm:space-y-4 sm:flex sm:items-start">
                            <button type="button" className="w-full rounded-md bg-blue-100 px-4 py-2.5 text-sm font-semibold text-blue-500 hover:bg-blue-200 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="mr-4 inline" viewBox="0 0 512 512">
                                    <path fill="#fbbd00"
                                        d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                        data-original="#fbbd00" />
                                    <path fill="#0f9d58"
                                        d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                        data-original="#0f9d58" />
                                    <path fill="#31aa52"
                                        d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                        data-original="#31aa52" />
                                    <path fill="#3c79e6"
                                        d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                        data-original="#3c79e6" />
                                    <path fill="#cf2d48"
                                        d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                        data-original="#cf2d48" />
                                    <path fill="#eb4132"
                                        d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                        data-original="#eb4132" />
                                </svg>
                                Sign up with Google
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm text-gray-800">Full name</label>
                            <div className="relative flex items-center">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                                    placeholder="Enter full name"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm text-gray-800">Email</label>
                            <div className="relative flex items-center">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                                    placeholder="Enter email address"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="absolute right-4 size-[18px]" viewBox="0 0 24 24">
                                    <path d="M12 12a1.5 1.5 0 0 1-.832-.254l-9-6a1.5 1.5 0 0 1 1.664-2.492L12 8.618l8.168-5.364a1.5 1.5 0 0 1 1.664 2.492l-9 6A1.5 1.5 0 0 1 12 12z" data-original="#000000"></path>
                                    <path d="M20.5 9.5a1.5 1.5 0 0 1-1.5 1.5h-14a1.5 1.5 0 0 1-1.5-1.5V6.618l7.168 4.778a3.5 3.5 0 0 0 3.664 0L20.5 6.618V9.5z" data-original="#000000"></path>
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
                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </button>
                        </div>
                        <p className="mt-8 text-center text-sm text-gray-800">
                            Already have an account? <Link to="/login" className="ml-1 whitespace-nowrap font-semibold text-blue-600 hover:underline">Log in here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
