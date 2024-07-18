import axios from "axios";
import { useContext, useState } from "react";
import Header from "../../../components/Header";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError,setEmailError] = useState(false);

    const nav = useNavigate();

    const cookie = new Cookies();

    const userNow = useContext(User);

    async function submit(e) {
        e.preventDefault();
        setAccept(true);
        try{
            let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordR,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;  
            userNow.setAuth({token, userDetails});
            nav('/dashboard');
            } catch(err) {
                if(err.response.status === 422) {
                    setEmailError(true);
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
                    <label htmlFor="name">Name: </label>
                    <input id="name" 
                            type="text" 
                            placeholder="Name..." 
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    {name === '' && accept && (<p className="error">Username is required</p>)}
                    <label htmlFor="email">Email: </label>
                    <input id="email"
                            type="email" 
                            placeholder="Email..." required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    {accept && emailError === 422 && (<p className="error">Email Is Already been taken</p>)}
                    <label htmlFor="password">Password: </label>
                    <input id="password" 
                            type="password" 
                            placeholder="Password..." 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    {password.length < 8 && accept && (<p className="error">Password must be more than 8 Char</p>)}
                    <label htmlFor="repeat">Repeat Password: </label>
                    <input id="repeat" 
                            type="password" 
                            placeholder="Repeat Password..." 
                            value={passwordR}
                            onChange={(e) => setPasswordR(e.target.value)}/>
                            {passwordR !== password && accept && (<p className="error">Password does not match</p>)}
                    <div className="register" style={{textAlign:"center"}}>
                        <button type="submit" >Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}