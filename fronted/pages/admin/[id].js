import { useState, useEffect } from "react";
import Router, { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import Image from "next/image";

const Print = () => {
    const router = useRouter();
    const [extension, setextension] = useState("");
    const [Id, setId] = useState("");

    const getImage = () => {
        const { id } = router.query;
        //console.log(router.query);
        const sendName = {
            filename : id
        }
        const token = Cookies.get('accesstoken');
        fetch('/api/print', {
            method: 'POST', 
            headers: {
                'accesstoken' : token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendName)
        })
        .then((r) => {
            return r.json();
        })
        .then((data) => {
            if (data && data.errorMessage) {
                alert(data.errorMessage);
                router.push('/admin');
            } else {
                setextension(data.extension);
                setId(id);
            }
        })
    }

    useEffect(() => {
        getImage();
    }, []);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center',width: '100%' ,height:'100vh', flexDirection:'column'}}>
            <div>
                <img 
                    src={`/api/print/${Id}`}
                    layout='fill'
                />
            </div>
            <p>name : {Id}</p>
            <p>extension : {extension}</p>
        </div>
    )
}

export default Print;