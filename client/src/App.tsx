import { Login } from "@/pages/login"
import { OTP } from "@/pages/otp"
import { Dashboard } from "@/pages/dashboard/dashboard"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  )
}

export default App
