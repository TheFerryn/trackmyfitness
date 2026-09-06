import { Login } from "@/pages/login"
import { OTP } from "@/pages/otp"
import { Dashboard } from "@/pages/dashboard/dashboard"
import { GettingStarted } from "@/pages/getting-started"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  )
}

export default App
