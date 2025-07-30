import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import * as faceapi from "face-api.js"




const NewLogIn = () => {

    const webcamEl = useRef(null)


    const [formdata, setFormData] = useState([])

    const [loginBtn, setLoginBtn] = useState(true)

    const [recognisedFace, setRecognisedface] = useState("")

    const [currentUserId, setCurrentUserId] = useState("")
    const [matchResult, setMatchResult] = useState()



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

                if (webcamEl.current) {
                    const detections = await faceapi.detectAllFaces(webcamEl.current).withFaceLandmarks().withFaceDescriptors()
                    // console.log(detections[0].descriptor)
                    // console.log(detections[0].descriptor[0])
                    const descriptorArrayResult = []

                    for (let x = 0; x < 128; x++) {
                        descriptorArrayResult.push(detections[0].descriptor[x])

                    }

                    console.log(JSON.stringify(descriptorArrayResult))
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
            findDescriptors()
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

            <video autoPlay width={600} height={500} ref={webcamEl}>


            </video>


            <input className='input mt-5 ' onChange={(e) => setCurrentUserId(e.target.value)} />




            <button className='btn btn-secondary mt-5' disabled={loginBtn} onClick={handleSubmit}> Login   </button>


            {/* <h1 className='text-3xl text-green-500 mt-5'>{recognisedFace}</h1> */}
            <div className='text-3xl  mt-5'>{matchResult === true && <h1 className='text-green-500'>Face Matched!</h1> }</div>

            <div className='text-3xl  mt-5'>{matchResult === false && <h1 className='text-red-500'>Face Did Not Match!</h1> }</div>


            



        </div>
    )
}

export default NewLogIn
