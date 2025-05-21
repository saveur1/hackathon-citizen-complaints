import { FaFileAlt, FaRoute, FaChartLine, FaBuilding, FaComments, FaShieldAlt } from 'react-icons/fa'

const features = [
    {
        name: 'Easy Complaint Submission',
        description: 'Submit complaints and feedback through a user-friendly web interface. Track your submissions and receive timely updates on their status.',
        icon: FaFileAlt,
    },
    {
        name: 'Smart Routing System',
        description: 'Our intelligent system automatically categorizes and routes your complaints to the appropriate government agency for faster resolution.',
        icon: FaRoute,
    },
    {
        name: 'Real-time Status Tracking',
        description: 'Monitor the progress of your complaints in real-time. Receive notifications when there are updates or responses from agencies.',
        icon: FaChartLine,
    },
    {
        name: 'Agency Response Platform',
        description: 'Government agencies can efficiently manage and respond to citizen complaints through a dedicated administrative interface.',
        icon: FaBuilding,
    },
    {
        name: 'Two-way Communication',
        description: 'Engage in direct communication with agencies through the platform. Ask questions and provide additional information as needed.',
        icon: FaComments,
    },
    {
        name: 'Secure & Private',
        description: 'Your data is protected with industry-standard security measures. All communications are encrypted and your privacy is our priority.',
        icon: FaShieldAlt,
    },
]

export default function Features() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Citizen Engagement Made Simple</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to engage with government services
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Our platform streamlines the process of submitting and tracking complaints, making it easier for citizens to engage with government agencies and receive timely responses.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
} 