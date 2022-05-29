// Modal pop-up for attendance after face-recognition

import React, { useState } from 'react';
import { Button, Modal} from 'react-bootstrap'; 
import { ExclamationCircle, BoxArrowInDownRight, BoxArrowUpRight } from 'react-bootstrap-icons';

function ModalScreen(props) {
    const [show, setShow] = useState(true); // true for showing modal, false for closing
  
    const handleClose = () => setShow(false);

    const present = props.present // true for check-in, false for check-out
    const banned = props.banned // true for restricted users
  
    return (
      <>
        <Modal show={show} onHide={handleClose} style={{marginLeft:"135px"}}>
          { banned ?
              <div>
                <Modal.Header style={{backgroundColor: "#ff7e7e", height: "170px"}}>
                      <Modal.Title><ExclamationCircle style={{color:"white", fontSize:"100px", marginLeft:"180px"}}/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding:"10px", textAlign: "center", fontSize: "25px" }}><b>ENTRY RESTRICTED</b></div><br/>
                    <div style={{textAlign: "center"}}>
                    Looks like this user has been restricted to enter. <br/>
                    If you think this is a mistake, contact administration.
                    </div>
                </Modal.Body>
              </div>
                :
              <div>
              {
                present ?
                <>
                <Modal.Header style={{backgroundColor: "rgb(126 200 255)", height: "170px"}}>
                  <Modal.Title><BoxArrowInDownRight style={{color:"white", fontSize:"100px", marginLeft:"180px"}}/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding:"10px", textAlign: "center", fontSize: "25px" }}><b>Hello {props.label}</b></div><br/>
                    <div style={{textAlign: "center"}}>
                    Welcome! Hope you have a good day ahead
                    <br/>
                        Date : {props.date} <br/>
                        Check-In Time : {props.checkIn} 
                    </div>
                </Modal.Body>
                </>
                      :
                <>
                <Modal.Header style={{backgroundColor: "rgb(126 200 255)", height: "170px"}}>
                  <Modal.Title><BoxArrowUpRight style={{color:"white", fontSize:"100px", marginLeft:"180px"}}/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding:"10px", textAlign: "center", fontSize: "25px" }}><b>Hello {props.label}</b></div><br/>
                    <div style={{textAlign: "center"}}>
                    Bye! See you later
                    <br/>
                        Date : {props.date} <br/>
                        Check-Out Time : {props.checkOut} <br/>
                        Attendance for today : {props.sumDay}%
                    </div>
                </Modal.Body>
                </>
              }
              </div>
          }
          <Modal.Footer>
            <Button variant="dark" style={{border:"none"}} onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </>
    );
  }

export default ModalScreen;