import axios from "axios";
import { useContext, useState } from "react";
import Header from "../../../components/Header";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [accept, setAccept] = useState(false);
    const [err,setErr] = useState(false);

    const nav = useNavigate();

    const cookie = new Cookies();
 
    const userNow = useContext(User);

    async function submit(e) {
        e.preventDefault();
        setAccept(true);
        try{
            let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
                email: email,
                password: password,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;  
            userNow.setAuth({token, userDetails});
            nav('/dashboard');
            } catch(err) {
                if(err.response.status === 401) {
                    setErr(true);
                }
                setAccept(true);
            }
    }

    return( 
    <div>
        <Header/>
        <div className="parent" >
            <div className="register">
                <form onSubmit={submit} >
                    <label htmlFor="email">Email: </label>
                    <input id="email"
                            type="email" 
                            placeholder="Email..." required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password: </label>
                    <input id="password" 
                            type="password" 
                            placeholder="Password..." 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    {password.length < 8 && accept && (<p className="error">Password must be more than 8 Char</p>)}
                    {accept && err && (<p className="error">Password Or Email Is Not Correct</p>)}
                    <div className="register" style={{textAlign:"center"}}>
                        <button type="submit" >Login</button>
                    </div>  
                </form>
            </div>
        </div>
    </div>
    )
}