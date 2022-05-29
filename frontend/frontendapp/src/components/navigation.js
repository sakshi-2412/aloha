// Sidebar navigation panel

import React from 'react';
import { useAuth } from './auth';
import { NavLink } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Navigation = () => {
   const {token, logout, username} = useAuth() // get parameters for logged-in user

   let check = false // check if there exists a logged-in user
   if(token){
      check=true
   }

   return (
      <>
      <ProSidebar>
      <SidebarContent>
      <img src="/logoAloha.png" alt="image" style={{width:"150px", height:"150px", margin: "0px auto", marginTop: "20px", display: "flex" }}/>
      <SidebarHeader>
         <div style = {{fontSize: "40px", textAlign: "center", fontFamily: "monospace", marginBottom: "30px"}}>ALOHA</div>
         { check?
            <div style = {{fontSize: "15px", textAlign: "center", marginBottom: "10px", color: "#65bfc2"}}>Hello {username} !</div>
            :
            <></>
         }
      </SidebarHeader>
      <Menu iconShape="square" style = {{ marginTop: "40px"}}>
         <MenuItem>
            <NavLink to="/">Home</NavLink>
         </MenuItem>
         { check?
            <MenuItem>
               <div onClick={logout}>Logout</div>
            </MenuItem>
            :
            <>
            <MenuItem>
               <NavLink to="/register">Register</NavLink>
            </MenuItem>
            <MenuItem>
               <NavLink to="/login" >Login</NavLink>
            </MenuItem>
            </>
         }
         <MenuItem>
            <NavLink to="/profile">Profile</NavLink>
         </MenuItem>
         <MenuItem>
            <NavLink to="/recognition">Attendance</NavLink>
         </MenuItem>
      </Menu>
      </SidebarContent>
      <div style = {{ fontSize: "13px", marginTop: "auto", marginBottom: "25px", textAlign: "center"}}>
         <b>Contact Us</b> <br/>
         <b>HELPLINE</b> : +91 9978xxxxxx <br/>
         <b>E-MAIL</b> : aloha.app@gmail.com <br/>
      </div>
      <SidebarFooter style = {{ padding: "10px", textAlign: "center", fontSize: "10px"}}>
            © 2022 Copyright: Aloha<br/>
            All rights reserved
      </SidebarFooter>
      </ProSidebar>

      <style jsx>{`
            .pro-sidebar {
               position: fixed;
               height: 100%;
               top: 0;
            }

            .pro-item-content {
               font-size: 20px;
               text-align: center;
            }
      `}</style>

      </>
    );
}
 
export default Navigation;