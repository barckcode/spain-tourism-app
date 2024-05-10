import { useRoutes, BrowserRouter } from "react-router-dom"
import Home from '../Home'
import NotFound from '../NotFound'



const AppRoutes = () => {
	let routes = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/*', element: <NotFound /> },
	])

	return routes
}


export default function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	)
}
