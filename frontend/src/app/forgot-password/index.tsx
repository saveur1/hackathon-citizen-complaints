"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMessage("")

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong")
            }

            setMessage("Password reset instructions have been sent to your email")
            setTimeout(() => {
                router("/login")
            }, 3000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    {message && (
                        <div className="text-green-500 text-sm text-center">{message}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? "Sending..." : "Send reset instructions"}
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Back to login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
} 