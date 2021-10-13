import React,{useState} from 'react'
import  { userService } from '../redux/services'


const DropLocalFile = () => {
  const [picture,setPicture] = useState('');
  const upl = base64EncodedImage =>{
    setPicture(base64EncodedImage)
    // console.log(base64EncodedImage)
    userService.uploadPicture(base64EncodedImage);
  }
  const handleSubmit = (file) => {
    // console.log({RAW_IMG:file})
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onloadend = ()=>{
      upl(reader.result)
    }
    // console.log({target:e})
  }

  return (
    <form style={{textAlign:'center', marginTop:20, width:"100%", marginBottom:20}}>
      <p>Select your profile ficture <b style={{color:'red'}}>*</b></p>
      <input 
      type="file"
      name="image"
      placeholder='Upload file'
      onChange={e=>{handleSubmit(e.target.files[0])}} />
     {picture && (<img src={picture} alt='' style={{width:50, height:50}} />)}
    </form>)

}

export default DropLocalFile;