import { useRoutes } from "react-router-dom"
import Home from '../Pages/Home'
import NotFound from '../Pages/NotFound'
import Tourists from '../Pages/Tourists'
import AccessRoute from '../Pages/AccessRoute'
import AccommodationType from '../Pages/AccommodationType'


export default function AppRoutes() {
    let routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/*', element: <NotFound /> },
        { path: '/tourists', element: <Tourists /> },
        { path: '/access-road', element: <AccessRoute /> },
        { path: '/accommodation-type', element: <AccommodationType /> },
    ])

    return routes
}
