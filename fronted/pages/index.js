import Image from 'next/image'
import { useState } from 'react';
import Router from 'next/router';
import styles from '../styles/Home.module.css'
import Cookies from 'js-cookie';

const Login = (props) => {
  const [loginerror, setLoginerror] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const token = Cookies.get('accesstoken');
  //console.log(token);
  if(typeof token != 'undefined') {
    Router.push('/home');
  }
  function onSubmitHandler(e) {
    e.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        password
      }),
    })
    .then((r) => {
      return r.json();
    })
    .then((data) => {
      if (data && data.errorMessage) {
        alert(data.errorMessage);
      } else if (data && data.accessToken) {
        const inhour = 1/24;
        Cookies.set('accesstoken', data.accessToken, { expires: inhour })
        if(id === 'admin') {
          Router.push('/admin');
        } else {
          Router.push('/home');
        }
      }
    });
  }
  
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width: '100%' ,height:'100vh'}}>
      <form style={{ display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
              <label>ID</label>
              <input type="text" name="id" value={id} onChange={(e) => setId(e.target.value)}/>
              <label>Password</label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <br />
              <button type='submit'>
                  Login
              </button>
      </form>
  </div>
  );
}

export default Login;