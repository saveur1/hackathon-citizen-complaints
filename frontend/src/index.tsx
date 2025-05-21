import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import 'tailwindcss/tailwind.css'

//@ts-ignore: this is a generated routes from app folder
import pagesRoutes from '~react-pages'
import { StrictMode, Suspense } from 'react'
import UserDashboardLayout from 'components/layouts/user-dashboard'
import SimpleLayout from 'components/layouts/simple-layout'
import { UserProvider } from '@/Context/user-context'
import AdminLayout from './components/layouts/dashboard-layout'
import { ComplaintsProvider } from './Context/complaints-context'
import { AgenciesProvider } from './Context/agencies-context'
// import { AdminLayout } from './components/layouts/dashboard-layout'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

// Redefine Routers
const routes =pagesRoutes.map((route: any) => {
    //Users routes
    const listOfPathsWithNavigationHeaders = ["/complaints", "/profile"];
    let layout = listOfPathsWithNavigationHeaders
                        .some((path)=>path.includes(route.path)) && <SimpleLayout />;

    //admin routes
    if(route?.path?.includes("dashboard"))
        layout = <AdminLayout />;

    return {
        path: "/",
        element: layout,
        children: [route]
    }
});

function App() {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        {useRoutes(routes)}
      </Suspense>
    )
}
  
root.render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <ComplaintsProvider>
                    <AgenciesProvider>
                        <App />
                    </AgenciesProvider>
                </ComplaintsProvider>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>,
)
