import { Routes, Route } from "react-router-dom";
import { Home, Login, EmailVerify, PasswordReset } from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/verify-account" element={<EmailVerify/>}/>
        <Route path="/reset-password" element={<PasswordReset/>}/>
      </Routes>
    </div>
  )
}

export default App
