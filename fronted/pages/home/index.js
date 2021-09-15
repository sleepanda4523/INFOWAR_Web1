import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';



const Home = (props) => {
    const [image, setImage] = useState(null);
    const [fileType, setFileType] = useState("");
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const router = useRouter()
    const token = Cookies.get('accesstoken');

    async function check() {
        if(typeof token === 'undefined') {
            router.push('/');
        }
    }
    useEffect(() => {
        check();
    });

    const uploadInput = (event) => {
        if (event.target.files && event.target.files[0]) { 
            setImage(event.target.files[0]);
            setCreateObjectURL(URL.createObjectURL(event.target.files[0]));
        }
    };

    const uploadToServer = async () => {
        if (!image) { return; }
        const body = new FormData();
        body.append("image", image);
        fetch("/api/upload", {
            method: "POST",
            headers: {
                //'Content-Type': 'multipart/form-data',
                'accesstoken': token
            },
            body
        })
        .then((r) => {
            if(r.status === 404){
                return r;
            } else {
                return r.json();
            }
        })
        .then((data) => {
            if(data.status === 404) {
                //alert(data.text);
            } else if (data && data.errorMessage) {
                alert(data.errorMessage);
            } else {
                setFileType(data.filetype);
            }
        });
        
    };
    
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems:'center'
            ,width: '100%' ,height:'100vh', flexDirection:'column'}}>
            <p>File Upload</p>
            <div style={{ display:'flex', flexDirection:'column'}}>
                <img src={createObjectURL} />
                <div>
                    file : <input type="file" onChange={uploadInput} accept="image/*" />
                </div>
                <button type='submit' style={{margin: '10px'}} onClick={uploadToServer}>
                      Image Upload
                </button>
            </div>
            <h3>Extension : {fileType}</h3>
        </div>
    );
}




export default Home; 


  