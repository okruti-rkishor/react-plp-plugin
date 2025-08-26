import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import PlPAdventureworks from "./plp-adventureworks";

const Router = ()=>{
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/plp/:name",
            element: <PlPAdventureworks />,
        },
            ])

    return(
        <RouterProvider router={router} />
    )
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router />
    </StrictMode>,
)
