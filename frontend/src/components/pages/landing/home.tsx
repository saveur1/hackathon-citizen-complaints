import ComplaintForm from "./complaint-form"

const Home = () => {
    return (
        <div className="relative">
            <div className="grid grid-cols-1 gap-8 px-4 sm:px-10 md:grid-cols-2">
                <div className="relative z-10 mx-auto mt-16 max-w-4xl text-center md:text-left">
                    <h1 className="mb-6 text-4xl font-extrabold md:text-6xl md:!leading-[75px]">
                        Transform Public Services with Your Feedback
                    </h1>
                    <p className="text-base">
                        Empower your community by reporting issues directly to local authorities. Fast, transparent, 
                        and effective resolution for better neighborhoods.
                    </p>
                    <div className="mt-10">
                        <button className="rounded-xl bg-cyan-900 px-6 py-3 text-white transition-all hover:bg-cyan-800">
                            Learn more
                        </button>
                    </div>
                </div>
                <div className="relative z-40">
                    <ComplaintForm />
                </div>
            </div>
            <hr className="my-2 mt-28 border-gray-300" />
            <div className="px-4 sm:px-10">
                <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-4">
                    <img src="/ict-chamber.png" className="mx-auto w-28" alt="google-logo" />
                    <img src="/risa.png" className="mx-auto w-28" alt="facebook-logo" />
                    <img src="minict.png" className="mx-auto w-28" alt="linkedin-logo" />
                    <img src="kLab.png" className="mx-auto w-28" alt="pinterest-logo" />
                </div>
            </div>
            <img src="/bg-effect.svg" className="absolute inset-0 size-full" />
        </div>
    )
}

export default Home