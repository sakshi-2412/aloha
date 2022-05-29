// Face-Recognition for attendance

import * as faceapi from 'face-api.js';
import React from 'react';
import { CameraVideo, CameraVideoOff } from 'react-bootstrap-icons';
import ModalScreen from './modal';

function Recognition() {

  const labels = getUsers()
  
  // store details of recognised user
  const [label, setLabel] = React.useState('');
  const [present, setPresent] = React.useState('');
  const [date, setDate] = React.useState('');
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [sumDay, setSumDay] = React.useState('');
  const [banned, setBanned] = React.useState(false);
  
  const [modelsLoaded, setModelsLoaded] = React.useState(false); // true for models loaded
  const [captureVideo, setCaptureVideo] = React.useState(false); // true for video on
  const [modalShow, setModalShow] = React.useState(false); // true for showing modal after recognition

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();


  // get all registered usernames for labels array
  function getUsers() {
    var array = []
    fetch('http://127.0.0.1:8000/api/users', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then( data => data.json())
    .then(
      data => {
        data.forEach((datai) => {
          array.push(datai.username);
        })
      }
    )
    .catch( error => console.error(error))
    return array
  }

  React.useEffect(() => {

    // load face-recognition models from public models folder
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';

      Promise.all([
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
      ]).then(setModelsLoaded(true));
    }

    loadModels();

  }, []);

  // play video when camera button clicked
  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });

  }

  // detect faces in live video
  const handleVideoOnPlay = () => {
    setModalShow(false);

    setInterval(async () => {
      const labeledFaceDescriptors = await loadLabeledImages() // load labeled photos from backend
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current); // create canvas for detection box
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);

        // for current video instance, detect faces
        const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);

        // for each recognised face, draw box with result label and display on canvas video
        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box
          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
          drawBox.draw(canvasRef.current)
          
          checkLabel(result.label) // check if recognised user is a registered user

        })
      }
    }, 3000) // video instance changes for every 3 seconds
  }

  function checkLabel( result) {
    const isThere = labels.includes(result)

    // if result label is in labels array, close video and mark attendance for the user
    if (isThere === true) {
      
        closeWebcam();
        
        fetch('http://127.0.0.1:8000/api/attend/create/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ username: result })
        })
        .then( data => data.json())
        .then(
          data => {
            if(data.banned === true) {
              setBanned(data.banned);
            }
            else {
              setLabel(data.username);
              setPresent(data.present);
              setDate(data.date);
              setCheckIn(data.checkIn);
              setCheckOut(data.checkOut);
              setSumDay(data.sumDay);
              setBanned(data.banned);
            }
            setModalShow(true);
          }
        )
        .catch( error => console.error(error))

    }
  }
  
  // fetch django-backend hosted user photos for each user in labels array
  function loadLabeledImages() {
    return Promise.all(
      
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`http://127.0.0.1:8000/media/${label}/${i}.jpg`)
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }

  // stop video streaming
  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

  return (
    <div>
      <div>
          {
            modalShow ?
              <ModalScreen banned = {banned} label = {label} present = {present} date = {date} checkIn = {checkIn} checkOut = {checkOut} sumDay = {sumDay}/>
              :
              <>
              </>
          }
        <div style={{ textAlign: 'center', padding: '40px' }}>
          {
            captureVideo && modelsLoaded ?
              <button onClick={closeWebcam} style={{ cursor: 'pointer', margin: '10px', backgroundColor: '#075361', padding: '25px', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px', border: 'none', borderRadius: '10px' }}>
                <CameraVideo color="white" size={30} />
              </button>
              :
              <button onClick={startVideo} style={{ cursor: 'pointer', margin: '10px', backgroundColor: '#075361', padding: '25px', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px', border: 'none', borderRadius: '10px' }}>
                <CameraVideoOff color="white" size={30} />
              </button>
          }
        </div>
      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', borderRadius: '10px' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
              <canvas height={videoHeight} width={videoWidth} style={{ margin:'auto', position: 'absolute', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', backgroundColor: '#333333', borderRadius: '10px' }} />
            </div>
          </div>
      }
      </div>
    </div>
  );
}

export default Recognition;