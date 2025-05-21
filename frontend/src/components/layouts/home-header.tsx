import { Link, useNavigate } from "react-router-dom"
import { useUser } from '@/Context/user-context'
import { FaUserCircle } from 'react-icons/fa'

const HomeHeader = () => {
    const navigate = useNavigate()
    const { user, logout } = useUser()

    return (
        <header className='z-50 min-h-[70px] p-4 sm:px-10 sticky top-0 bg-white border-b'>
        <div className='relative flex flex-wrap items-center gap-4'>
            <Link to="/" className="flex items-center space-x-2">
                <img src="/web_logo.png" alt="logo" className='w-20' />
                <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase leading-none">Citizen</span>
                    <span className="text-sm font-bold uppercase leading-none">Engagement</span>
                </div>
            </Link>

            <div id="collapseMenu"
            className='z-50 max-lg:fixed max-lg:hidden max-lg:before:fixed max-lg:before:inset-0 max-lg:before:z-50 max-lg:before:bg-black max-lg:before:opacity-50 lg:!block'>
            <button id="toggleClose" className='fixed right-4 top-2 z-[100] rounded-full bg-white p-3 lg:hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
                <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"></path>
                <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"></path>
                </svg>
            </button>

            <ul className='z-50 gap-x-6 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-1/2 max-lg:min-w-[300px] max-lg:space-y-3 max-lg:overflow-auto max-lg:bg-white max-lg:p-6 max-lg:shadow-md lg:ml-12 lg:flex'>
                <li className='mb-6 hidden max-lg:block'>
                <Link to="/"><img src="/web_logo.png" alt="logo" className='w-36' />
                </Link>
                </li>
                <li className='px-3 max-lg:border-b max-lg:py-3'>
                <Link to='/'
                    className='block font-semibold text-blue-600 transition-all hover:text-blue-600'>Home</Link>
                </li>
                <li className='px-3 max-lg:border-b max-lg:py-3'>
                <Link to='/#Features'
                    className='block font-semibold transition-all hover:text-blue-600'>Features</Link>
                </li>
                <li className='px-3 max-lg:border-b max-lg:py-3'>
                <Link to='/#Feedbacks'
                    className='block font-semibold transition-all hover:text-blue-600'>Feedbacks</Link>
                </li>
                <li className='px-3 max-lg:border-b max-lg:py-3'>
                <Link to='/#About'
                    className='block font-semibold transition-all hover:text-blue-600'>About</Link>
                </li>
                {user && (
                    <li className='px-3 max-lg:border-b max-lg:py-3'>
                        <Link to='/track-ticket'
                            className='block font-semibold transition-all hover:text-blue-600'>View Tickets</Link>
                    </li>
                )}
            </ul>
            </div>

                <div className='ml-auto flex items-center gap-4'>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {user.profilePicture ? (
                                    <img 
                                        src={user.profilePicture} 
                                        alt={user.name} 
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="h-10 w-10 text-gray-400" />
                                )}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                    <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                                </div>
                            </div>
                            <button 
                                onClick={logout}
                                className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white transition-all hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <button 
                                className='rounded-xl bg-cyan-900 px-6 py-3 text-white transition-all hover:bg-cyan-800'
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                            <button 
                                className='rounded-xl border border-cyan-900 px-6 py-3 text-cyan-900 transition-all hover:bg-cyan-50'
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </button>
                        </>
                    )}
            <button id="toggleOpen" className='ml-7 lg:hidden'>
                <svg className="size-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"></path>
                </svg>
            </button>
            </div>
        </div>
        </header>
    )
}

export default HomeHeader