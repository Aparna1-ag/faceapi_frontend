import React, { useEffect } from 'react'
import Webcam from "webcam-easy"
import { useRef } from 'react'

const SignIn = () => {

    const canvasRef = useRef(null)
    const videoRef = useRef(null)
    const audioRef = useRef(null)
    const snapBtnRef = useRef(null)
    const downloadImgLinkRef = useRef(null)
    const saveBtnRef = useRef(null)




 
   
   

   useEffect(() => {

    // const canvasEl = document.getElementById("canvas-el")
    // const videoEl = document.getElementById("video-el")
    // const audioEl = document.getElementById("snap-audio")
    saveBtnRef.current.disabled = true


    


    const webcam  = new Webcam(videoRef.current, "myWebcam", canvasRef.current, audioRef.current)



 
 
    webcam.start().then(() => console.log("webcam started")).catch((err) => console.log(err))

    snapBtnRef.current.addEventListener("click",  () => {
        audioRef.current.play()
        const clickedPhoto = webcam.snap()
        saveBtnRef.current.disabled = false
        // downloadImgLinkRef?.current?.href = clickedPhoto
    })

   }, [])





  return (
    <div>

      <h1 className='text-3xl'>
      Sign In Page
      </h1>

     <div className='mt-8'>
     <form>
           
           <input type="text" placeholder="Enter Name" className="input" />
           </form>
     </div>

    <div className='flex justify-center w-full'>
      
  <div>
  <video id='video-el' width={600} height={400} ref={videoRef} autoPlay playsInline> </video>
      <canvas id='canvas-el' ref={canvasRef} className='w-48 h-36 my-4'> </canvas>
      <audio id="snap-audio" preload = "auto" ref={audioRef}>   <source src="preview.mp3"  type="audio/mp3"  />  </audio>

    <div className=' mx-auto flex justify-center space-x-2'>
    <button className="btn btn-info" id='snap-btn' ref={snapBtnRef}>Capture</button>

<button className="btn btn-accent " id='snap-btn'  ref={saveBtnRef}>Submit</button>


<a ref={downloadImgLinkRef} className="btn btn-warning " download > Upload Image </a>
    </div>
  </div>
    </div>


      
    </div>
  )
}

export default SignIn
