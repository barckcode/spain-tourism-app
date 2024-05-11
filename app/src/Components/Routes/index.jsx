import { useRoutes } from "react-router-dom"
import Home from '../../Pages/Home'
import NotFound from '../../Pages/NotFound'
import Tourists from '../../Pages/Tourists'

export default function AppRoutes() {
    let routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/*', element: <NotFound /> },
        { path: '/tourists', element: <Tourists /> },
    ])

    return routes
}
