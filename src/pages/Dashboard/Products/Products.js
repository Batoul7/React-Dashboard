import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";


export default function Products() {
    
    const [products, setProducts] = useState([]);
    const [runUseEffect, setRun] = useState(0);
    
    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/product/show",{
        headers: {
            Accept:"application/json",
            Authorization: "Bearer " + token,
        },
    })
        .then((data) => setProducts(data.data))
        .catch((err) => console.log(err));
    }, [runUseEffect]);


   async function deleteProduct(id) {
    try {
        const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
            headers:
            {
                Authorization: "Bearer " + token,
            },
        });
        if(res.status === 200) {
            setRun((prev) => prev + 1);
        }
    } catch {
        console.log("none");
    }
    }
    const showProducts = products.map((product,index) => 
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>
                <Link to={`${product.id}`}>
                <i className="fa-solid fa-pen-to-square" 
                style={{color:"#a0c8cf", marginRight:"10px", fontSize:"20px"}}></i>
                </Link>
                <i className="fa-solid fa-trash" 
                style={{color:"red", cursor:"pointer",ontSize:"20px"}}
                onClick={() => deleteProduct(product.id)}></i>
            </td>
        </tr>
        );

    return (
        <div style={{padding: "20px"}}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {showProducts}
                </tbody>
            </table>
        </div>
    )
}