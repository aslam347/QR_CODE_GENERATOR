import React, { useState } from 'react'




const QrCode = () => {

  const[img, setimg] = useState("")

  const[loading, setloading] = useState(false)

  const[qrdata, setqrdata] = useState("")

  const[qrsize, setqrsize] = useState("")


  async function generateQR()
  {


    setloading(true)

    try{

      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;

      setimg(url)

    }  
    catch(error)
    {
      console.log("Error Generating QR Code", error)
    } 
    finally {
      setloading(false)
    }


  }
  

  function downloadQR()
  {
    
    fetch(img)
    
    .then((response) => response.blob())
    .then((blob) =>
    {

     const link = document.createElement("a");

     link.href = URL.createObjectURL(blob);
     link.download = "QRCODE.png";
     document.body.appendChild(link);
     link.click();

    }
    ).catch((error)=> {
      console.log("Error in Download QR CODE",error)
    })

    


  }
  


  return (
    <div>

    <h1>QR CODE GENERATOR</h1>
    <div className="qr-container">
    {img && <img src={img} className='qr-code-image' alt=''/> } 
    
    {loading && <p>Please Wait...</p>}     <div/>

 
      <div>
    
     <label htmlFor='dataInput' className='input-label'>Data For QR Code</label>
     <input type='text' value={qrdata} id='dataInput' placeholder='Enter The Data For QR Code' onChange={(e) => (setqrdata(e.target.value))}/>
   

     <label htmlFor='sizeInput' className='input-label'>QR Code Image Size (e.g., 150) </label>
     <input type='text' value={qrsize} id='sizeInput' placeholder='Enter The Image Size' onChange={(e) => (setqrsize (e.target.value))} />

     <button className='generate-button'disabled={loading} onClick={generateQR}> Generate QR Code</button>
     <button className='download-button' onClick={downloadQR}>Download QR Code</button>

     <p className="footer">

       Designed By <a href="https://github.com/aslam347">Mohamed Aslam M</a>

       </p>
        </div>
      </div>
    </div>
  );
};


export default QrCode
