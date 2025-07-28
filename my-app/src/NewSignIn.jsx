import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import * as faceapi from "face-api.js"
import { Link } from 'react-router-dom'

const NewSignIn = () => {

    const webcamEl = useRef(null)


    const [formdata, setFormData] = useState([])
    const [username, setUsername] = useState("")

    const [signInBtn, setSignInBtn] = useState(true)

    const [success, setSuccess] = useState(false)

    const [message, setMessage] = useState("")




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

                    const descriptorArrayResult = []

                    for (let x = 0; x < 128; x++) {
                        descriptorArrayResult.push(detections[0].descriptor[x])

                    }

                    console.log(JSON.stringify(descriptorArrayResult))


                    // setDescritorArr(detections[0].descriptor)
                    setFormData(JSON.stringify(descriptorArrayResult))




                }




            } catch (err) {
                console.log(err)
            }

        }


        setTimeout(() => {
            findDescriptors()
            setSignInBtn(false)

        }, 3000)












    }, [])




    const postfaceDataForSignIn = async () => {
        console.log(username)
        try {
            const response = await fetch("http://localhost:3608/sendfacedata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify({descriptorArray: formdata})
                body: JSON.stringify({ empName: username, descriptorArray: formdata })

            })

            const result = await response.json()

            if (result.success)  {
                setSuccess(true) 
            } else {
                setMessage(result.message)

            }


               


        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = () => {
        console.log(formdata)

        postfaceDataForSignIn()

    }






    // console.log(descriptorArr)







    return (
           <div className=''>

<h1 className='text-3xl'>Register</h1>
<h2 className='mb-5'> Look in the camera and click Submit </h2>

<video autoPlay width={600} height={500} ref={webcamEl} className='mb-5'>


</video>

<label className=''> Enter Username</label>
<br/>

<input className='input mt-5 ' onChange={(e) => setUsername(e.target.value)} />
<br/>

<button className='btn btn-secondary mt-5' disabled={signInBtn} onClick={handleSubmit}> Submit Face Data   </button>

{
    success && <div>
    <h1 className='text-3xl text-green-500'> Face data registered</h1>
    <br/>
    <Link to="/login"><button className='btn btn-primary'>  Login </button></Link>
    
    </div>
}

{
    <div className='text-3xl text-red-500 mt-5'> {message} </div>
}






</div>
    )
}

export default NewSignIn
