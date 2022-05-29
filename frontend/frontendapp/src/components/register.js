// Registration form

import React, { useState, useEffect } from 'react'
import { useAuth } from './auth'
import notif from '../components/notif';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { token, setToken } = useAuth() // get parameters for logged-in user

  useEffect(() => {
    // if user is already logged-in, redirect to user profile
    if(token){   
        navigate("/profile");
    }
  }, [token])

  const navigate = useNavigate();

  const [name, setName] = useState(''); // form name
  const [email, setEmail] = useState(''); // form email
  const [password, setPassword] = useState(''); // form password
  const [passConf, setPassConf] = useState(''); // form confirm password 
  const [username, setUsername] = useState(''); // form username
  const [photo1, setPhoto1 ] = useState(); // form photo number 1
  const [photo2, setPhoto2 ] = useState(); // form photo number 2


  // check if form fields are valid
  const validateFields = () => {
    if(name === '' || email === '' || username === '' || password === '') 
    {
      notif('Error','Please fill all the fields correctly','danger')
      return false
    }
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      notif('Error','Please enter a valid email address','danger')
      return false
    }

    if (passConf !== password) {
      notif('Error','Passwords do not match','danger')
      return false
    }

    if (photo1 === undefined || photo2 === undefined) {
      notif('Error','Please add your photos','danger')
      return false
    }
    
    return true
  }

  const register = (e) => {
    e.preventDefault()

    if( validateFields() ) {

    let uploadData = new FormData();
    uploadData.append('username', username);
    uploadData.append('password', password);
    uploadData.append('name', name);
    uploadData.append('email', email);
    uploadData.append('photo1', photo1, photo1.name);
    uploadData.append('photo2', photo2, photo2.name);


    // put register request with form data
    fetch('http://127.0.0.1:8000/auth/register/', {
      method: 'POST',
      body: uploadData,
    })
    .then( data => data.json())
    .then(
      data => {
        setToken(data.token);
        notif('Success','Registration successful...','info')
        navigate("/");
      }
    )
    .catch( error => console.error(error))
    }

  }

  return (
    <>
    <div className="wrapper">
    <div className="heading"> REGISTRATION </div>

      <div style={{display:"flex", flexDirection:"column"}}>

      <input
        type='text'
        className='block border border-grey-light w-full p-2 rounded mb-4'
        name='inputName'
        id='inputName'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Full Name'
      />
      <input
        type='text'
        className='block border border-grey-light w-full p-2 rounded mb-4'
        name='inputUsername'
        id='inputUsername'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
      />

      <input
        type='email'
        className='block border border-grey-light w-full p-2 rounded mb-4'
        name='inputEmail'
        id='inputEmail'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email Address'
      />

      <input
        type='password'
        className='block border border-grey-light w-full p-2 rounded mb-4'
        name='inputPassword'
        id='inputPassword'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />

      <input
        type='password'
        className='block border border-grey-light w-full p-2 rounded mb-4'
        name='confirmPassword'
        id='confirmPassword'
        value={passConf}
        onChange={(e) => setPassConf(e.target.value)}
        placeholder='Confirm Password'
      />

      <input
        type='file'
        className='block border border-grey-light w-full p-1 rounded mb-4'
        name='inputPhoto1'
        id='inputPhoto1'
        onChange={(e) => setPhoto1(e.target.files[0])}
        placeholder='Photo1'
      />

      <input
        type='file'
        className='block border border-grey-light w-full p-1 rounded mb-4'
        name='inputPhoto2'
        id='inputPhoto2'
        onChange={(e) => setPhoto2(e.target.files[0])}
        placeholder='Photo2'
      />

      </div>

      <button
        type='submit'
        className=' rounded login_btn'
        onClick={register}
      >
        Register
      </button>
      </div>

      <style jsx>{`
      .wrapper {
        background-color: white;
        margin: 30px auto;
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
        margin: 10px;
        border: none;
        background-color: #183a58;
      }

      `}</style>
      
    </>
  )
}