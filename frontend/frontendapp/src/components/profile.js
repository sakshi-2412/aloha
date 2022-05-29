// Profile page for logged-in user showing attendance statistics

import React, { useEffect } from 'react';
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';
import { BarChartProfile } from './barchart';
import { PieChart1 } from './piechart1';
import { PieChart2 } from './piechart2';

function Profile() {

    const {token, profileName, avatarImage, banned, email, username } = useAuth() // get parameters for logged-in user
    const navigate = useNavigate();

    useEffect(() => {
        // if user is not logged-in, redirect to login page
        if(!token){   
            navigate("/login");
        }
    }, [token])

    const rest = {banned} // to display if user is restricted or not

    return (
        <>
        <div className="heading" style={{ backgroundImage: `url("./profilebg.jpg")` }}></div>

        <div className="wrapper">
        <div className="top">
            <div className="left">

            <img src={avatarImage} className="profile_image"/>
            </div>
            <div className="right">
            <h3><b>{profileName}</b></h3>
            <h6>Username : {username}</h6>
            <h6>E-Mail : {email}</h6>
            { rest.banned ?
                <h6>Entry Restricted</h6>
                :
                <div></div>
            }
            </div>
        </div>
        </div>

        <BarChartProfile username={username}/>
        <div style={{display: "flex", justifyContent: "center"}}>
        <PieChart1 username={username}/>
        <PieChart2 username={username}/>
        </div>

        <style jsx>{`
          .heading {
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
            height: clamp(200px, 15vw, 15vw);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 8px;
          }
          
          .wrapper {
            max-width: 500px;
            align-items: center;
            margin: 0 auto;
            margin-top: -150px;
            margin-bottom: 50px;
          }
          
          .wrapper .top {
            padding: 50px 40px;
            display: flex;
            flex-direction: row;
            text-align: center;
            align-content: center;
            background-color: rgb(29 29 29);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 8px;
            border-radius: 10px;
          }
          
          .wrapper .top .right {
            margin-left: 5em;
            margin-top: 0.75em;
          }
          
          .wrapper h3 {
            color: rgb(255, 255, 255);
          }
          
          .wrapper h4 {
            color: rgb(202, 198, 198);
          }
          
          .wrapper h6 {
            font-size: 13px;
            color: rgb(173 173 173 / 96%);
          }
          
          .wrapper .data p {
            color: rgb(89, 89, 90);
            font-weight: 630;
            text-align: left;
            padding-bottom: 3%;
          }
          
          .wrapper .data p a {
            text-decoration: none;
          }
          
          .wrapper .button, .wrapper .button a {
            background-color: #006666;
            color: white;
            font-size: 20px;
            padding: 20px 0px;
            width: 150px;
            border-radius: 9px;
            text-align: center;
          }
          
          .wrapper .button:hover, .wrapper .button a:hover{
            font-weight: bold;
            text-decoration: none;
          }
                    
          .profile_image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border-width:5px;
            border-style: solid;
            border-color: white;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 5px 3px;
          }
          `}</style>
        </>
    );
  }

export default Profile;