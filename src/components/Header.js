
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {

   const cookie = new Cookies();
   const token = cookie.get("Bearer");

   function handleLogOut() {
    axios.post("http://127.0.0.1:8000/api/logout", null , {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    cookie.remove("Bearer");
    window.location.pathname='/';
   }
    return(
        <div className="container shadow">
            <nav className="d-flex p-2">
                <div className="d-flex">
                <Link to="/home" 
                        style={{textAlign:"center",
                                fontSize:"15px",
                                marginRight:"20px", 
                                textDecoration:"none",
                                color:"black"
                                }}>Home</Link>
                <Link to="/services" 
                        style={{textAlign:"center",
                                fontSize:"15px",
                                marginRight:"20px", 
                                textDecoration:"none",
                                color:"black"
                                }}>Services</Link>
                <Link to="/pricing" 
                        style={{textAlign:"center",
                                fontSize:"15px",
                                marginRight:"20px", 
                                textDecoration:"none",
                                color:"black"
                                }}>Pricing</Link>
                <Link to="/about" 
                        style={{textAlign:"center",
                                fontSize:"15px",
                                marginRight:"20px", 
                                textDecoration:"none",
                                color:"black"
                                }}>About</Link>
                 <Link to="/contact" 
                        style={{textAlign:"center",
                                fontSize:"15px",
                                marginRight:"20px", 
                                textDecoration:"none",
                                color:"black"
                                }}>Contact</Link>
                                
                </div>
                <div className="d-flex">
                   { !token ? (
                   <>
                    <Link to="/register" style={{textAlign:"center"}} className="register-nav">Register</Link>
                    <Link to="/login" style={{textAlign:"center"}} className="register-nav">Login</Link>
                    </>
                    ) : (
                    <>
                    <Link to="/dashboard" style={{textAlign:"center"}} className="register-nav">Dashboard</Link>
                    <Link style={{textAlign:"center"}} className="register-nav" onClick={handleLogOut}>Log Out</Link>
                    </>
                    )}
                   {/* <div className="register-nav" onClick={handleLogout}>Logout</div>  */}
                </div>
            </nav>
        </div>
    )
}