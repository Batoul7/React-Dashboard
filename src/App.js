import { Route, Routes } from "react-router-dom";
// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
// User
import Users from "./pages/Dashboard/Users/Users";
import CreateUser from "./pages/Dashboard/Users/CreateUser";
import UpdateUser from "./pages/Dashboard/Users/UpdateUser";
import Products from "./pages/Dashboard/Products/Products";
import NewProduct from "./pages/Dashboard/Products/NewProduct";
import UpdateProduct from "./pages/Dashboard/Products/UpdateProduct";
// Web site
import SignUp from "./pages/Website/Auth/SignUp";
import Login from "./pages/Website/Auth/Login";
import Home from "./pages/Website/Home";
import RequireAuth from "./pages/Website/Auth/RequireAuth";
import PersistLogin from "./pages/Website/Auth/PersistLogin";


export default function App() {
    return (<div>
        <Routes>
            <Route path="/register" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Home/>} />
            {/* Protected Routes */}
            <Route element={<PersistLogin/>}>
                <Route element={<RequireAuth/>}>
                    <Route path="/dashboard" element={<Dashboard/>}>
                        <Route path="users" element={<Users/>}/>
                        <Route path="user/create" element={<CreateUser/>}/>
                        <Route path="users/:id" element={<UpdateUser/>}/>
                        <Route path="products" element={<Products/>}/>
                        <Route path="products/create" element={<NewProduct/>}/>
                        <Route path="products/:id" element={<UpdateProduct/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
        </div>);
}