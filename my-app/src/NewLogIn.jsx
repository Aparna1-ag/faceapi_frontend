import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import * as faceapi from "face-api.js"
import { useNavigate } from 'react-router-dom'




const NewLogIn = () => {

    const webcamEl = useRef(null)

    const canvasRef = useRef(null)

    const navigate = useNavigate()


    const [formdata, setFormData] = useState([])

    const [loginBtn, setLoginBtn] = useState(true)

    const [recognisedFace, setRecognisedface] = useState("")

    const [currentUserId, setCurrentUserId] = useState("")
    const [matchResult, setMatchResult] = useState()
    const [multipleFacesMessage, setMultiplefacesMessage] = useState("")
    const [detectionScoreMessage, setDetectionScoreMessage] = useState("")




    useEffect(() => {

        const startWebCam = async () => {


            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: true
                })

                if (webcamEl.current) {
                    webcamEl.current.srcObject = stream
                    webcamEl.current.play()


                }

            } catch (err) {
                console.log(err)
            }

        }


        startWebCam()

        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),

                ])

                console.log("models loaded")

            } catch (err) {
                console.log(err)
            }
        }

        loadModels()


        const findDescriptors = async () => {

            try {

                if (webcamEl.current && canvasRef.current) {

                    canvasRef.current.style.top = webcamEl.current.offsetTop + 'px'
                    canvasRef.current.style.left = webcamEl.current.offsetLeft + 'px'

                // webcamEl.current.onloadedmetadata(() => {
                    canvasRef.current.width = webcamEl.current.videoWidth
                    canvasRef.current.height = webcamEl.current.videoHeight

                // }) 
                // = () => {
                    
                // }

                  




                    const detections = await faceapi.detectAllFaces(webcamEl.current).withFaceLandmarks().withFaceDescriptors()

                    if (detections.length > 1) {
                        setMultiplefacesMessage("Multiple Faces detected. Please insert only one face in the cam")
                    } else if (detections.length === 0) {
                        setMultiplefacesMessage("No face detected. Please make sure your whole face shows. Please remove sunglasses, caps, masks etc")

                    } else {
                        if (detections.length === 1) {
                            setMultiplefacesMessage("")


                        }
                    }


                    let faceWithBestDetection = detections[0]

                    for (let each of detections) {
                        if (each.detection.score > faceWithBestDetection) {
                            faceWithBestDetection = each
                        }
                    }

                    let detectionScore = faceWithBestDetection.detection.score



                    if (detectionScore < 0.8) {
                        setDetectionScoreMessage("Face not detected. Please make sure your whole face shows. Please remove sunglasses, caps, masks etc")
                    } else {
                        setDetectionScoreMessage("")
                    }

ß

                    // console.log(detections)
                    console.log(detectionScore)


                      const ctx = canvasRef.current.getContext("2d")
                    ctx.clearRect(0, 0 , canvasRef.current.width, canvasRef.current.height)




                       const resizedDetections = faceapi.resizeResults(detections, {
                                  width: webcamEl.current.videoWidth,
                                  height: webcamEl.current.videoHeight
                                })

                                console.log(resizedDetections)
                                
 
                              
                    
                                // faceapi.draw.drawDetections(canvasRef.current, resizedDetections)

                                const options  = {
                                    label: "",
                                    lineWidth: 4,
                                    boxColor: '#3f95c352'
                                }

                                // console.log(faceWithBestDetection.detection.box)

                                // const drawBox = new faceapi.draw.DrawBox(faceWithBestDetection.detection.box, options)

                                // drawBox.draw(canvasRef.current)





                    // console.log(detections[0].descriptor)
                    // console.log(detections[0].descriptor[0])
                    const descriptorArrayResult = []

                    for (let x = 0; x < 128; x++) {
                        descriptorArrayResult.push(faceWithBestDetection.descriptor[x])

                    }

                    // console.log(JSON.stringify(descriptorArrayResult))
                    // console.log(detections[0].descriptor)


                    // setDescritorArr(detections[0].descriptor)
                    setFormData(JSON.stringify(descriptorArrayResult))

                    // console.log("apple1")



                }

                // console.log("apple2")



            } catch (err) {
                console.log(err)
            }

        }


        setTimeout(() => {
            setInterval(() => {
                findDescriptors()

            }, 2000)

            setLoginBtn(false)

        }, 3000)












    }, [])


    const postfaceData = async () => {
        try {
            const response = await fetch("http://localhost:3608/loginface", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify({descriptorArray: formdata})
                body: JSON.stringify({ userFace: formdata, userId : currentUserId })

            })

            const result = await response.json()
            setMatchResult(result.matchResult)
            setTimeout(() => {
                if (result.matchResult === true) navigate('/dashboard')

            }, 1500)

            // setRecognisedface(result.bestMatchFace, + "(" + result.indicator + ")") 

            console.log(result)

        } catch (err) {
            console.log(err)
        }
    }



    const handleSubmit = () => {
        console.log(formdata)

        postfaceData()

    }






    // console.log(descriptorArr)







    return (
        <div>

            <h1 className='text-3xl'>Log In</h1>
            <h2 className='mb-5'> Look in the camera and click Log In </h2>

         <div className="container" style={{position: "relative", width: "550px", height: "650px", display: "flex", justifyContent: "center"}}> 
         <div className=' custom-line'  >


</div>
         <video autoPlay width={600} height={900} ref={webcamEl} playsInline style={{objectFit: "cover", width: "full", height: "full"}}>


</video>

<canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 10}}></canvas>
         </div>


            <div className=' text-red-500 text-xl text-center mt-5'> {multipleFacesMessage} </div>

<div className=' text-red-500 text-xl text-center mt-5'> {detectionScoreMessage} </div>






            {/* <h1 className='text-3xl text-green-500 mt-5'>{recognisedFace}</h1> */}
            <div className='text-3xl text-center mt-5'>{matchResult === true && <h1 className='text-green-500'>Face Matched!</h1> }</div>

            <div className='text-3xl text-center mt-5'>{matchResult === false && <h1 className='text-red-500'>Face Did Not Match!</h1> }</div>


            <div className='flex  mt-3'>
            <input className='input mt-5 ' onChange={(e) => setCurrentUserId(e.target.value)} />

            <button className='btn btn-secondary mt-5' disabled={loginBtn} onClick={handleSubmit}> Login   </button>

            </div>



        {/* <div className='animation-container'>
            hello
            <div className=' custom-line'  >


            </div>


        </div> */}



        



            



        </div>
    )
}

export default NewLogIn
