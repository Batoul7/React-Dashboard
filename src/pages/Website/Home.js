import Header from "../../components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "./Context/UserContext";

export default function Home() {
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
    
    const showProducts = products.map((product,index) => 
        <div>
        <div className="shadow" style={{padding: "10px", width:"290px", borderRadius:"5px"}}>
        <div style={
            {backgroundImage: `url(${product.image})`,
            height:"250px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius:"5px"
            }
        }></div>
            <h1 style={{marginBottom:"0px" , fontSize:"25px"}}>{product.title}</h1>
            <h3 style={{fontWeight:"normal",fontSize:"14px"}}>
                {product.description}</h3>
        </div>
    </div>
        );

    return(
    <div>
        <Header/>
        <div style={{
            padding: "50px",
            display: "flex",
            flexWrap: "wrap",
            gap: "30px"
            }}>
             {showProducts}
        </div>
    </div>
    )
}