import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { server } from '../../config';

const adminHome = () => {
    //const token = Cookies.get('accesstoken');
    const router = useRouter();
    const [List, setList] = useState(['']);

    const init = () => {
        const token = Cookies.get('accesstoken');
        if(typeof token === 'undefined') {
            router.push('/');
        }
        fetch('/api/list', {
            method: 'GET',
            headers: {
                cache: 'no-cache',
                'accesstoken' : token
            }
        })
        .then((r) => {
            return r.json();
        })
        .then((data) => {
            if(data && data.errorMessage) {
                alert(data.errorMessage);
                router.push('/'); 
            } else {
                setList(data.list);
            }
        })
    }
    
    useEffect(() => {
        init();
    }, []);
    //console.log(List);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center',width: '100%' ,height:'100vh', flexDirection:'column'}}>
        <h1>Admin List</h1>
        <br/>
        <ul>
            {List.map((data, index) => (
                <li key={index}>
                    <Link href={`/admin/${data.name}`}>
                        <a key={index}>{data.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
        </div>
    )
}

export default adminHome;