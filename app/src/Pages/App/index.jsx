import { useState } from 'react'
import AppRoutes from "../../Routes"
import Sidebar from '../../Components/Sidebar'


const bucket_statics = import.meta.env.VITE_FRONTEND_ASSETS
const helmcode_logo = `${bucket_statics}/logo_transparent.png`


export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
        <>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} helmcode_logo={helmcode_logo} />
			<main className="py-10 lg:pl-72">
				<div className="px-4 sm:px-6 lg:px-8">
					<AppRoutes />
				</div>
			</main>
        </>
	)
}
