import "./App.css";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from "./pages/Users";
import TamaStatus from "./pages/TamaStatus";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/status" element={<TamaStatus/>} />
                </Routes>
            </BrowserRouter>
            <Outlet />
        </div>
    );
}

export default App;
