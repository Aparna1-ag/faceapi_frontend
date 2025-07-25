






// import React, { useEffect } from 'react'
// import './App.css'
// import * as faceapi from "face-api.js"


// const App = () => {


//   const run = async()=>{
  

//     let stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: false
//     })
    
//     let videoEl = document.getElementById("web-cam-video")
    
//     videoEl.srcObject = stream

//   try {

//     await Promise.all([
//         faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
//         faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//         faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//         faceapi.nets.ageGenderNet.loadFromUri('/models'),
//         faceapi.nets.faceExpressionNet.loadFromUri('/models')

       

//     ]

// )

// console.log("Models loaded")
    
//   } catch (err) {
//     console.log(err)
//   }


// // try {
// //     const net = new faceapi.SsdMobilenetv1()
// // await net.loadFromUri('/models')

// // const net2 = new faceapi.FaceLandmarkNet()
// // await net2.loadFromUri('./models')

// // const net3 = new faceapi.faceRecognitionNet()
// // await net3.loadFromUri('./models')

// // const net4 = new faceapi.ageGenderNet()
// // await net4.loadFromUri('./models')

// // const net5 = new faceapi.ageGenderNet()
// // await net5.loadFromUri('./models')



// // } catch (err) {
// //     console.log(err)
// // }


//     const myCanvas = document.getElementById("myCanvas") 
//     myCanvas.style.left = videoEl.offsetLeft
//     myCanvas.style.top = videoEl.offsetTop
//     videoEl.onloadedmetadata = () => {
//         myCanvas.width = videoEl.videoWidth;
//         myCanvas.height = videoEl.videoHeight;
//       };



//     //Aparna


//     // let refImg = "https://media.licdn.com/dms/image/v2/D4E03AQEpDpguX_qLiw/profile-displayphoto-shrink_800_800/B4EZXWvt2aGwAg-/0/1743064589207?e=1755734400&v=beta&t=Qq4iBj-jxerLrcx5k63kwnoXDqCUDUT9KHw8lgu9TRk"


    


//     //Revanth

//     // let refImg = "https://media.licdn.com/dms/image/v2/D5603AQEHKYTcm7dB8g/profile-displayphoto-shrink_800_800/B56Zc2KhFZGoBs-/0/1748960416768?e=1755734400&v=beta&t=GDeUSWpn4IwSocWLUqgPlz6tLG8zjE1o8XVvI-ew1L4"


//     //Chandru

//     // let refImg = "https://media.licdn.com/dms/image/v2/D4D03AQEY6_VuxMJR8A/profile-displayphoto-shrink_400_400/B4DZZ381G_GcAg-/0/1745769158026?e=1755734400&v=beta&t=QMQoJAFuH5c5UOB2qZ5rjRYoaM3Vr5h6zVg6trvGeCQ"


//     //Shreya
    

//     // let refImg = "https://media.licdn.com/dms/image/v2/D5603AQEJcOoKNIJBmA/profile-displayphoto-shrink_800_800/B56ZNcKjWuGgAk-/0/1732418092329?e=1755734400&v=beta&t=G_sZRtkQbCAperb1ilLvdGYyhPuonGo5UEh3URXIiHg"


//     //Noel






//     //Aishwarya Rai



//     // let refImg = await faceapi.fetchImage("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTHTM5eTtFS2l2sOXp5k0xixuMmBKcQzbWCGRifMaBCKDuSqrIqAVKa2F0uQK5Yqq71jbXjuU8oJxKbSwO17ZrOU4WPXOSWLfGlppy5fA5TvA")



// let refImgAddresses = [
//     "https://media.licdn.com/dms/image/v2/D4E03AQEpDpguX_qLiw/profile-displayphoto-shrink_800_800/B4EZXWvt2aGwAg-/0/1743064589207?e=1755734400&v=beta&t=Qq4iBj-jxerLrcx5k63kwnoXDqCUDUT9KHw8lgu9TRk",
//     "https://media.licdn.com/dms/image/v2/D5603AQEHKYTcm7dB8g/profile-displayphoto-shrink_800_800/B56Zc2KhFZGoBs-/0/1748960416768?e=1755734400&v=beta&t=GDeUSWpn4IwSocWLUqgPlz6tLG8zjE1o8XVvI-ew1L4",
//     "https://media.licdn.com/dms/image/v2/D4D03AQEY6_VuxMJR8A/profile-displayphoto-shrink_400_400/B4DZZ381G_GcAg-/0/1745769158026?e=1755734400&v=beta&t=QMQoJAFuH5c5UOB2qZ5rjRYoaM3Vr5h6zVg6trvGeCQ",
//     "https://media.licdn.com/dms/image/v2/D5603AQEJcOoKNIJBmA/profile-displayphoto-shrink_800_800/B56ZNcKjWuGgAk-/0/1732418092329?e=1755734400&v=beta&t=G_sZRtkQbCAperb1ilLvdGYyhPuonGo5UEh3URXIiHg",
//     "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTHTM5eTtFS2l2sOXp5k0xixuMmBKcQzbWCGRifMaBCKDuSqrIqAVKa2F0uQK5Yqq71jbXjuU8oJxKbSwO17ZrOU4WPXOSWLfGlppy5fA5TvA"




// ]





// const faceMatcherArr = []

//     let refImg = "https://media.licdn.com/dms/image/v2/D4D03AQEY6_VuxMJR8A/profile-displayphoto-shrink_400_400/B4DZZ381G_GcAg-/0/1745769158026?e=1755734400&v=beta&t=QMQoJAFuH5c5UOB2qZ5rjRYoaM3Vr5h6zVg6trvGeCQ"

// // for (let each of refImgAddresses) {

//     // let referenceImg = await faceapi.fetchImage(each)

//     // const referenceImg = await faceapi.bufferToImage(await fetch(each).then(res => res.blob()))

//     const response = await fetch(refImg);
// const blob = await response.blob();
// const referenceImg = await faceapi.bufferToImage(blob);




//     let refernceImgAIData = await faceapi.detectAllFaces(referenceImg).withFaceLandmarks().withFaceDescriptors().withAgeAndGender().withFaceExpressions()

//     let faceMatcher = new faceapi.FaceMatcher(refernceImgAIData)

//     // console.log(faceMatcher)


//     // faceMatcherArr.push(faceMatcher)


// // }

// // console.log(faceMatcherArr)

    
// setInterval(async () => {

//     let faceAPIRead = await faceapi.detectAllFaces(videoEl).withFaceLandmarks().withFaceDescriptors().withAgeAndGender().withFaceExpressions()

//     myCanvas.getContext("2d").clearRect(0, 0 , myCanvas.width, myCanvas.height)

//     faceAPIRead = faceapi.resizeResults(faceAPIRead, videoEl)

//     faceapi.draw.drawDetections(myCanvas, faceAPIRead)
//     faceapi.draw.drawFaceLandmarks(myCanvas, faceAPIRead)
//     faceapi.draw.drawFaceExpressions(myCanvas, faceAPIRead)



//     faceAPIRead.forEach(face => {
        
//             const {age, gender, detection, descriptor} = face

//             const ageText = `${Math.round(age)} yrs`
//             const genderText = `${gender}`
//             const textField = new faceapi.draw.DrawTextField([ageText, genderText], face.detection.box.topRight)

//             textField.draw(myCanvas)

//         //    for (let item of faceMatcherArr) {
//             const label = faceMatcher.findBestMatch(descriptor).toString()
//             let options = {label: "Person"}
//             if (label.includes("unknown")) {
//                 options =  {label : "Unknown person detected"}
//             }

//             const drawBox =  new faceapi.draw.DrawBox(detection.box, options)


//         //    }

//             // let options = {label: "Aparna"}
//             // let options = {label: "Aishwarya"}
//             // let options = {label: "Revanth"}

//             // let options = {label: "Shreya"}
            


         
        
        
        
//             drawBox.draw(myCanvas)
        
       
//     })


  





//     // console.log(faceAPIRead)


    
// }, 2000)

// }



// console.log(faceapi)




// console.log("appleee")







//   useEffect(() => {

//     run()


//   }, [])












//   return (
//     <div>
// Yoooo
// <canvas id="myCanvas"></canvas>
    
//     <div className="container">
//         <video height="500" width="800" autoPlay id="web-cam-video"> 
            
    
//         </video>
//     </div>
      
//     </div>
//   )
// }

// export default App
