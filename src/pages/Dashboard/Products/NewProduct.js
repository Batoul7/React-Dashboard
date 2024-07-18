import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function NewPoduct() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const [accept, setAccept] = useState(false);
    const context = useContext(User);
    const token = context.auth.token;

    const nav =useNavigate();

    async function submit(e) {
        e.preventDefault();
        setAccept(true);
        try{
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', desc);
            formData.append('image', image);
            
        await axios.post("http://127.0.0.1:8000/api/product/create",
        formData,
        {
        headers: {
            Authorization: "Bearer " + token,
        },
        }
        );
        nav("/dashboard/products");
   
        } catch(err) {
            setAccept(true);
        }
    }
    return(
            <div className="add">
                <h1>Add New Product</h1>
                <form onSubmit={submit} >
                    <label htmlFor="title">Title: </label>
                    <input id="title" 
                            type="text" 
                            placeholder="Title..." 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                    {title === '' && accept && (<p className="error">Title is required</p>)}
                    <label htmlFor="desc">Description: </label>
                    <input id="desc"
                            type="text" 
                            placeholder="Description..." required 
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)} />

                    <label htmlFor="img">Photo: </label>
                    <input id="img"
                            type="file" 
                            onChange={(e) => setImage(e.target.files.item(0))} />
                   
                    <div className="register" style={{textAlign:"center"}}>
                        <button type="submit" >Add Product</button>
                    </div>
                </form>
            </div>
    )
}