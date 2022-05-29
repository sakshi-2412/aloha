// Introductory page for app

import React from 'react'
import { PersonCheck, CardChecklist, BarChartLine } from 'react-bootstrap-icons';

export default function Home() {
      
  return (
    <>
    <div style={{display:"flex", justifyContent: "space-evenly", margin:"50px", boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" }}>
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}> 
    <div className="heading p-3">WELCOME TO ALOHA</div>
    <div className="heading_body">Verify yourself for entry in a quick and easy way !!</div>
    </div>
    <img src="/facedetect.png" alt="Face Detection" style={{width:"200px", height:"300px"}} ></img>
    </div>

    <div className="d-flex flex-sm-column">
      <div className="card_wrap">

        <div className="card_inner">
          <span><CardChecklist style={{fontSize:"70px", color:"white"}}/></span>
          <h5>
            <b>REGISTRATION</b>
          </h5>
          <p>
            Register with employee details and two photographs
          </p>
        </div>

        <div className="card_inner">
          <span><PersonCheck style={{fontSize:"70px", color:"white"}}/></span>
          <h5>
            <b>ATTENDANCE</b>
          </h5>
          <p>
            Verify yourself to enter the office and mark your attendance
          </p>
        </div>

        <div className="card_inner">
          <span><BarChartLine style={{fontSize:"70px", color:"white"}}/></span>
          <h5>
            <b>PROFILE</b>
          </h5>
          <p>
            Login to see your profile with attendance status for the last 6 days
          </p>
        </div>

      </div>
    </div>

    <style jsx>{`
      .heading {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        text-align: center;
        font-weight: 900;
        color: #000000;
        font-size: 50px;
      }

      .heading_body {
        color: #024973;
        font-weight: 900;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 20px;
        text-align: center;
      }
      
      .card_wrap {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        margin: 0px 1.5vw;
      } 
      
      .card_inner {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        text-align: center;
        background-color: #0c354d;
        border-radius: 15px;
        padding: 35px 20px;
        width: 225px;
        height: 315px;
        box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.459);
        transition: 0.5s ease-in-out;
        margin: 15px 15px;
      }
      
      .card_inner:hover {
        transform: scale(1.07) translateY(-10px);
      }
      
      .card_inner h5 {
        color: #aee1ff;
        padding-top: 10px;
      }
      .card_inner p {
        padding-top: 7px;
        line-height: 20px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        color: #f4f4f4;
      }
 
    `}</style>

    </>
  )
}