import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner";
import './index.css'
import App from './App'

document.documentElement.classList.add("dark");
createRoot(document.getElementById('root')!).render(
    //<StrictMode>
        <Router>
            <App />
            <Toaster />
        </Router>
    //</StrictMode>,
)
