import Router, { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { server } from '../../config';


const adminHome = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [extension, setExtension] = useState("");

    let token = ""

    const scarch = () => {
        token = Cookies.get('accesstoken');
        if(typeof token === 'undefined') {
            Router.push('/');
        }
    }
    
    function onSubmitHandler(e) {
        e.preventDefault();
        Router.push(`/admin/${name}`)
    }
    useEffect(() => {
        scarch();
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center',width: '100%' ,height:'100vh', flexDirection:'column'}}>
            <h1>Admin Scarch</h1>
            <br/>
            <form style={{ display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Enter File Name</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <br />
                <button type='submit'>
                    Scarch
                </button>
            </form>
        </div>
    )
}

export default adminHome;