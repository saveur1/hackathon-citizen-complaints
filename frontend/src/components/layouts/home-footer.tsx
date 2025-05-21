import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const navigation = {
    main: [
        { name: 'About', href: '/about' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Agencies', href: '/agencies' },
        { name: 'Contact', href: '/contact' },
    ],
    support: [
        { name: 'Submit Complaint', href: '/submit-complaint' },
        { name: 'Track Status', href: '/track-status' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Help Center', href: '/help' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Accessibility', href: '/accessibility' },
        { name: 'Security', href: '/security' },
    ],
    social: [
        {
            name: 'Facebook',
            href: '#',
            icon: FaFacebook,
        },
        {
            name: 'Twitter',
            href: '#',
            icon: FaTwitter,
        },
        {
            name: 'LinkedIn',
            href: '#',
            icon: FaLinkedin,
        },
        {
            name: 'Email',
            href: 'mailto:contact@citizenengagement.gov',
            icon: FaEnvelope,
        },
    ],
}

const HomeFooter = () => {
    return (
        <footer className="bg-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-indigo-600">Citizen Engagement System</h3>
                        <p className="text-sm leading-6 text-gray-600">
                            Empowering citizens and government agencies through efficient communication and complaint management.
                        </p>
                        <div className="flex space-x-6">
                            {navigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Navigation</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.main.map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} Citizen Engagement System. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default HomeFooter