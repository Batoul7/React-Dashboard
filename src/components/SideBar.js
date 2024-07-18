import { NavLink } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="side-bar">
            <NavLink to="/dashboard/users" className="item-link">
                <i className="fa-solid fa-users"></i>Users</NavLink>
            <NavLink to="/dashboard/user/create" className="item-link">
                <i className="fa-solid fa-user-plus"></i>New User</NavLink>
            <NavLink to="/dashboard/products/" className="item-link">
                <i className="fa-solid fa-brands fa-product-hunt"></i>Products</NavLink>
            <NavLink to="/dashboard/products/create" className="item-link">
                <i className="fa-solid fa-plus"></i>New Product</NavLink>
        </div>
    )
}