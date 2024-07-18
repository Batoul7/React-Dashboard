import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function UpdatePoduct() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const id = window.location.pathname.split("/").slice(-1)[0];

    const [accept, setAccept] = useState(false);
    const context = useContext(User);
    const token = context.auth.token;

    const nav =useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`,{
        headers: {
            Accept:"application/json",
            Authorization: "Bearer " + token,
        },
        })
        .then((data) => {
        setTitle(data.data[0].title)
        setDesc(data.data[0].description);
        })
        .catch((err) => console.log(err));
    }, []);
  
    async function submit(e) {
        e.preventDefault();
        setAccept(true);
        try{
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', desc);
            formData.append('image', image);

        await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,
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
                <h1>Update Product</h1>
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
                        <button type="submit" >Update</button>
                    </div>
                </form>
            </div>
    )
}