import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function UpdateUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError,setEmailError] = useState("");

    const context = useContext(User);
    const token = context.auth.token;
    const nav = useNavigate();

    const id = window.location.pathname.split("/").slice(-1)[0];

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`,
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => res.json())
        .then((data) => {
           setName(data[0].name);
           setEmail(data[0].email);
        });
 } , []);

 async function submit(e) {
    e.preventDefault();
    setAccept(true);
    try{
       await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        nav("/dashboard/users");
        } catch(err) {
            if(err.response.status === 422) {
                setEmailError(true);
            }
            setAccept(true);
        }
}


    return (
        <div className="add">
            <h1>Update User</h1>
            <form onSubmit={submit}  >
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
                    <button type="submit" >Update</button>
                </div>
            </form>
        </div>
    )
}