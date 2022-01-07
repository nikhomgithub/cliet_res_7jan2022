
import React from 'react'
import {MdDelete} from 'react-icons/md';
import {RiImageAddLine} from 'react-icons/ri';

import photoUtil from '../../component/galleryone_add/photoUtil'

import './Galleryone_add.css';

const {fileListItem,changeArrayFile,handleInputFile,resetFile,

       reloadImage,deleteFileUrl,deletePhotoUrl,
       moveFirst,movePrevious,moveNext,moveLast,
}=photoUtil

export default function GallerySinglePhoto_add({
            //imgarrs,totalImages,
            fileUrl,arrayFile,setArrayFile,keyName,
            setShowImage,
            inputState,setInputState,
            useYoutubeLink,
            //reloadImage,deleteFileUrl,deletePhotoUrl,
        }) {

    let temp=[]
    inputState[keyName].map(i=>{
        if(i!=""){ temp=[...temp,i] }
    })        
    //imarrs = photoUrl+fileUrl
    //const imgarrs=[...temp,...fileUrl]

    let imgarrs
    
    if(fileUrl.length>0){
        imgarrs=[fileUrl[0]]
    }
    else {
        imgarrs=[temp[0]]
    }

    //const totalImages=temp.length+fileUrl.length
    
    
    //console.log('imgarrs.............')
    //console.log(imgarrs)
    let totalImages=imgarrs.length
    if(totalImages==1){
        if(!imgarrs[0]){
            totalImages=0
        }
    }
    

    //const [imgFrameHeight,setImgFrameHeight]=React.useState('')

    const [imgTrackWidth,setImgTrackWidth]=React.useState('')

    const refFrame=React.useRef();
    
    const refButtonAddPicture=React.useRef()
    
    React.useEffect(()=>{

        if(imgarrs){if(imgarrs.length>0){
            //to get imgFrameHeight 
            if(refFrame){
                //refFrame.current.click()
            }
            //to set imgTrackWidth
            let temp=imgarrs.length*100
            setImgTrackWidth(`${temp}%`)
        }} 
        
    },[])
    
 
/*
    React.useEffect(()=>{
        if(imgFrameHeight){
            //console.log(imgFrameHeight);
        }
    },[imgFrameHeight])
*/
    const renderImg=(arrs)=>{

        //console.log('renderImg................')
        //console.log(arrs)

        const arrsLength=arrs.length
        //console.log(arrsLength)

        let isAllPhotoUrl=true
        for(let i=0;i<arrsLength;i++){
            if(arrs[i]){
                if(arrs[i].blob){
                    isAllPhotoUrl=false
                    break
                }
            }
        }


        if(arrs){

            return arrs.map((i,index)=>{
                if(!i){
                    return null
                }

                let imgSrc
                let imgName
                let isFile
                //in case of fileUrl
                if(i.blob){
                    isFile=true
                    imgSrc=i.blob
                    imgName=i.name 
                }    
                //in case of PhotoUrl
                else {
                    isFile=false
                    imgSrc=i
                    imgName=i
                }

                return    (
                    <div 
                         key={index} 
                         style={{height:'100%',width:'100%',
                                display:'grid',placeItems: 'center',
                                position:"relative"}}
                        onClick={e=>{
                            reloadImage({setShowImage})
                        }}
                    >
                       
                        <img className="img" src={imgSrc} style={{width:"100%",height:"auto"}} />
                        
                        
                        <MdDelete  
                            style={{
                                position:"absolute",border:isFile?"3px solid red":"3px solid green",fontSize:"2rem",
                                backgroundColor:"white",top:"0.2rem",right:"0.2rem",
                                zIndex:"0",borderRadius:"50%"
                            }}
                            onClick={e=>{
                                //console.log('i............')
                                //console.log(i)
                                if(isFile){
                                    console.log('isFile True......')
                                    //console.log(imgName)                          

                                    deleteFileUrl({name:imgName,arrayFile,setArrayFile,reloadImage,setShowImage})
                                    //
                                }else{
                                    console.log('isFile false........................')
                                    //console.log(imgName)
                                    deletePhotoUrl({name:imgName,inputState,setInputState,keyName,reloadImage,setShowImage})
                                }
                                
                            }}             
                        />


                 

                    </div>   
                    )
                }
            ) 
        }
    } 
    //accept="image/jpeg,image/png,image/jpg,image/*"
    return (
    <div className="bgc-lightGray" style={{height:"100%",overflow:"hidden"}}>        
        <input
            type="file"
            //multiple="multiple" 
            accept="image/jpeg,image/png,image/jpg,image/*"
            style={{display:"none"}}
            ref={refButtonAddPicture}

            onChange={e=>{
                //console.log(e.target.files)
                setArrayFile(e.target.files)
                //handleInputFile({files:e.target.files,
                //arrayFile,
                //setArrayFile})
            
            }}    
        />
            
        <div 
            style={{
                display:"flex",
                alignItems:"baseline",
                justifyContent:"flex-start",
                flexWrap: "wrap",
                width:"100%",
                height:"10%"
            }}
        >
            <button
                onClick={e=>{
                    //console.log('inputState')
                    //console.log(inputState)
                    refButtonAddPicture.current.click()
                }} 
            >
                <RiImageAddLine/>
            </button>


            <p># = {totalImages}</p>
        </div>
      
        {//style={{height:imgFrameHeight,overflow:"auto"}}

        (imgarrs)
        ?   <div style={{width:"100%",height:"100%",display:"flex",
                        justifyContent:"center"}}>
                <div className="img-frame" 
                    id="img-id"
                    ref={refFrame}
                    style={{height:'60%',width:"60%"}}
                    //style={{height:'60%',width:"60%",overflow:"scroll"}}
                    onClick={e=>{
                        //const currentWidth=document.getElementById('img-id').getBoundingClientRect().width
                        //setImgFrameHeight(currentWidth*0.57)
                        //setImgFrameHeight($(e.currentTarget).width()*0.57)
                    }}    
                >       
                    <div className="img-track" 
                        style={{display:'flex',width:imgTrackWidth,height:"80%",marginBottom:"2rem"}}>
                        {renderImg(imgarrs)}
                    </div>  
                </div>
            </div>
        :null  
        }
    </div>
    )
}

GallerySinglePhoto_add.defaultProps={
    useYoutubeLink:true
}

