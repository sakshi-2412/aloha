// Login form

import React, { useState, useEffect } from 'react'
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom';
import notif from '../components/notif';

export default function Login(props) {
  const { token, setToken } = useAuth() // get parameters for logged-in user
  const navigate = useNavigate();

  const [password, setPassword] = useState('') // form password
  const [username, setUsername] = useState('') // form username

  useEffect(() => {
    // if user is already logged-in, redirect to user profile
    if(token){   
        navigate("/profile");
    }
  }, [token])

  const login = (e) => {
    e.preventDefault()
    
    // put login request with form data
    fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username, password: password})
      })
      .then( data => data.json())
      .then(
        data => {
          if(data.token == undefined)
          {
            notif('Error','Incorrect username or password','danger')
            navigate("/login");
          }
          else{
            setToken(data.token); // set token in cookies
            notif('Success','Login successful...','info')
            navigate("/profile");
          }
        }
      )
      .catch( error => console.error(error))

  }

  return (
      <>
      <div className="wrapper">
      <div className="heading"> LOGIN </div>

        <div style={{display:"flex", flexDirection:"column"}}>

        <input
          type='text'
          className='block border border-grey-light w-full p-3 rounded mb-4'
          name='inputUsername'
          id='inputUsername'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />

        <input
          type='password'
          className='block border border-grey-light w-full p-3 rounded mb-4'
          name='inputPassword'
          id='inputPassword'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />

        </div>

        <button
          type='submit'
          className='rounded login_btn'
          onClick={login}
        >
          Login
        </button>
        </div>

        <style jsx>{`
        .wrapper {
          background-color: white;
          margin: 70px auto;
          max-width: 600px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 8px;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .heading {
          font-family: 'Titillium Web', sans-serif;
          font-size: 40px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 30px;
          color: #183a58;
        }

        input[type=file]::file-selector-button {
          width: 100px;
          height: 40px;
          font-size: 15px;
          background-color: rgb(51, 51, 51);
          color: white;
          border: none;
          border-radius: 7px;
          margin-top: 5px;
          margin-right: 15px;
        }
          
        input[type=file]::file-selector-button:hover {
            font-weight: bold ;
        }
        
        input[type=file] {
            color: #757575;
            align-self:auto;
        }

        .login_btn {
          color: white;
          width: 200px;
          padding: 10px;
          margin: 40px;
          border: none;
          background-color: #183a58;
        }

        `}</style>
      </>
  );
}