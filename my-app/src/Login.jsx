import React, { useEffect, useRef } from 'react'
import * as faceapi from "face-api.js"

const Login = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const run = async () => {
    try {
      // 1. Load all models
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.ageGenderNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ])
      console.log("Models loaded successfully")

      // 2. Start the webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // 3. Setup canvas
      const videoEl = videoRef.current
      const myCanvas = canvasRef.current
      
      if (videoEl && myCanvas) {
        myCanvas.style.position = 'absolute'
        myCanvas.style.left = videoEl.offsetLeft + 'px'
        myCanvas.style.top = videoEl.offsetTop + 'px'
        
        videoEl.onloadedmetadata = () => {
          myCanvas.width = videoEl.videoWidth
          myCanvas.height = videoEl.videoHeight
        }

        // 4. Load multiple reference images
    let refImgAddresses = [
   {
    imgUrl:  "https://media.licdn.com/dms/image/v2/D4E03AQEpDpguX_qLiw/profile-displayphoto-shrink_800_800/B4EZXWvt2aGwAg-/0/1743064589207?e=1755734400&v=beta&t=Qq4iBj-jxerLrcx5k63kwnoXDqCUDUT9KHw8lgu9TRk",
    username: "Aparna"
   },
   {
    imgUrl:  "https://media.licdn.com/dms/image/v2/D5603AQEHKYTcm7dB8g/profile-displayphoto-shrink_800_800/B56Zc2KhFZGoBs-/0/1748960416768?e=1755734400&v=beta&t=GDeUSWpn4IwSocWLUqgPlz6tLG8zjE1o8XVvI-ew1L4",
    username: "Revanth"
   },
   {
    imgUrl:  "https://media.licdn.com/dms/image/v2/D4D03AQEY6_VuxMJR8A/profile-displayphoto-shrink_400_400/B4DZZ381G_GcAg-/0/1745769158026?e=1755734400&v=beta&t=QMQoJAFuH5c5UOB2qZ5rjRYoaM3Vr5h6zVg6trvGeCQ",
    username: "Chandru"
   },
   {
    // imgUrl:  "https://media.licdn.com/dms/image/v2/D5603AQEJcOoKNIJBmA/profile-displayphoto-shrink_800_800/B56ZNcKjWuGgAk-/0/1732418092329?e=1755734400&v=beta&t=G_sZRtkQbCAperb1ilLvdGYyhPuonGo5UEh3URXIiHg",
    imgUrl: "/assets/shreya.jpeg",
    username: "Shreya"
   },
   {
    imgUrl:  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTHTM5eTtFS2l2sOXp5k0xixuMmBKcQzbWCGRifMaBCKDuSqrIqAVKa2F0uQK5Yqq71jbXjuU8oJxKbSwO17ZrOU4WPXOSWLfGlppy5fA5TvA",
    username: "Aishwarya"
   },
   
    
   
    




]

        // Combine all reference descriptors into one array
        let allReferenceDescriptors = []

        for (let each of refImgAddresses) {
          try {
            const referenceImg = await faceapi.fetchImage(each.imgUrl)
            const detections = await faceapi
              .detectAllFaces(referenceImg)
              .withFaceLandmarks()
              .withFaceDescriptors()

              console.log(detections)
            
            if (detections.length > 0) {
              // Label each face with the image URL for identification
              const labeledDescriptors = detections.map(detection => 
                new faceapi.LabeledFaceDescriptors(
                  each.username,
                  [detection.descriptor]
                )
              )
              allReferenceDescriptors = allReferenceDescriptors.concat(labeledDescriptors)
            }
          } catch (err) {
            console.error(`Error processing image ${each.imgUrl}:`, err)
          }
        }

        // Create a single face matcher with all reference descriptors
        const faceMatcher = new faceapi.FaceMatcher(allReferenceDescriptors)

        // 5. Start detection loop
        setInterval(async () => {
          try {
            const detections = await faceapi
              .detectAllFaces(videoEl)
              .withFaceLandmarks()
              .withFaceDescriptors()
              .withAgeAndGender()
              .withFaceExpressions()


              console.log(detections)

            const ctx = myCanvas.getContext("2d")
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
            
            const resizedDetections = faceapi.resizeResults(detections, {
              width: videoEl.videoWidth,
              height: videoEl.videoHeight
            })

            faceapi.draw.drawDetections(myCanvas, resizedDetections)
            faceapi.draw.drawFaceExpressions(myCanvas, resizedDetections)

            resizedDetections.forEach(face => {
              const { age, gender, detection, descriptor } = face
              const ageText = `${Math.round(age)} yrs`
              const genderText = `${gender}`
              const textField = new faceapi.draw.DrawTextField(
                [ageText, genderText], 
                face.detection.box.topRight
              )
              textField.draw(myCanvas)

              // Find best match among all reference faces
              const bestMatch = faceMatcher.findBestMatch(descriptor)
              
              const options = {
                label: bestMatch.toString(),
                lineWidth: 2,
                boxColor: bestMatch.distance < 0.5 ? 'green' : 'red'
              }

              const drawBox = new faceapi.draw.DrawBox(detection.box, options)
              drawBox.draw(myCanvas)
            })
          } catch (err) {
            console.error("Error in detection loop:", err)
          }
        }, 2000)
      }
    } catch (err) {
      console.error("Error in face detection setup:", err)
    }
  }

  useEffect(() => {
    run()
    return () => {
      // Cleanup
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div>
      <h1 className='text-3xl'>Login</h1>
      <div className="container" style={{ position: 'relative' }}>
        <video 
          ref={videoRef}
          height="500" 
          width="800" 
          autoPlay 
          playsInline
        ></video>
        <canvas 
          ref={canvasRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0
          }}
        ></canvas>
      </div>
    </div>
  )
}

export default Login



















