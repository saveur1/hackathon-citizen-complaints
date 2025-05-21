const HappyClients = () => {
    return (
        <div className="mt-32">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-extrabold md:text-4xl">What our happy client say</h2>
            </div>
            <div className="relative mx-auto grid max-w-7xl gap-8 max-md:max-w-lg md:grid-cols-3 md:py-16">
                <div className="absolute inset-0 mx-auto size-full max-w-[80%] rounded-3xl bg-blue-100 max-md:hidden lg:max-w-[70%]"></div>
                <div className="relative mx-auto h-auto rounded-md bg-white p-4 max-md:shadow-md lg:p-6">
                    <div>
                        <img src="https://readymadeui.com/profile_2.webp" className="size-12 rounded-full" />
                        <h4 className="mt-2 whitespace-nowrap font-semibold">John Doe</h4>
                        <p className="mt-1 text-xs">Founder of Rubik</p>
                    </div>
                    <div className="mt-4">
                        <p>
                            The service was amazing. I never had to wait that long for my food.
                            The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                    </div>
                </div>
                <div className="relative mx-auto h-auto rounded-md bg-white p-4 max-md:shadow-md lg:p-6">
                    <div>
                    <img src="https://readymadeui.com/profile_3.webp" className="size-12 rounded-full" />
                    <h4 className="mt-2 whitespace-nowrap font-semibold">Mark Adair</h4>
                    <p className="mt-1 text-xs">Founder of Alpha</p>
                    </div>
                    <div className="mt-4">
                    <p>The service was amazing. I never had to wait that long for my food.
                        The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                    </div>
                </div>
                <div className="relative mx-auto h-auto rounded-md bg-white p-4 max-md:shadow-md lg:p-6">
                    <div>
                    <img src="https://readymadeui.com/profile_4.webp" className="size-12 rounded-full" />
                    <h4 className="mt-2 whitespace-nowrap font-semibold">Simon Konecki</h4>
                    <p className="mt-1 text-xs">Founder of Labar</p>
                    </div>
                    <div className="mt-4">
                    <p>The service was amazing. I never had to wait that long for my food.
                        The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HappyClients
