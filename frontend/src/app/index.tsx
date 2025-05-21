import HomeFooter from "@/components/layouts/home-footer"
import HomeHeader from "@/components/layouts/home-header"
import Features from "@/components/pages/landing/features"
import HappyClients from "@/components/pages/landing/happy-clients"
import Home from "@/components/pages/landing/home"
import { AgenciesProvider } from "@/Context/agencies-context"
import { ComplaintsProvider } from "@/Context/complaints-context"

function Dashboard() {
    return(
        <ComplaintsProvider>
            <AgenciesProvider>
                <div className="mx-auto max-w-[1920px]">
                    <div className="bg-[#f8f9ff] text-[15px] text-black">
                        <HomeHeader />
                        <Home />
                        <div className="px-4 sm:px-10">
                            <Features />
                            <HappyClients />
                        </div>
                        <HomeFooter />
                    </div>
                </div>
            </AgenciesProvider>
        </ComplaintsProvider>
    )
}

export default Dashboard
