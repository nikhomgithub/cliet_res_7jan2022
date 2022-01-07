
import React from 'react'
import {MdDelete,MdSkipPrevious,MdSkipNext,MdFastForward,MdFastRewind} from 'react-icons/md';
import photoUtil from '../../component/galleryone_add/photoUtil'

import './Galleryone_add.css';

const {fileListItem,changeArrayFile,handleInputFile,
       reloadImage,resetFile,deleteFileUrl,deletePhotoUrl,
       moveFirst,movePrevious,moveNext,moveLast,
}=photoUtil

export default function Galleryone_add({
            //imgarrs,totalImages,
            fileUrl,arrayFile,setArrayFile,keyName,
            setShowImage,
            inputState,setInputState,
            useYoutubeLink

        }) {

    let temp=[]
    inputState[keyName].map(i=>{
        if(i!=""){ temp=[...temp,i] }
    })        
    //imarrs = photoUrl+fileUrl
    const imgarrs=[...temp,...fileUrl]
    const totalImages=temp.length+fileUrl.length
           
    //const [imgFrameHeight,setImgFrameHeight]=React.useState('')

    const [imgTrackWidth,setImgTrackWidth]=React.useState('')

    const refFrame=React.useRef();
    
    const refButtonAddPicture=React.useRef()
    

    const [youtubeURL,setYoutubeURL]=React.useState("")

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

        const arrsLength=arrs.length

        let isAllPhotoUrl=true
        for(let i=0;i<arrsLength;i++){
            if(arrs[i].blob){
                isAllPhotoUrl=false
                break
            }
        }


        if(arrs){
            return arrs.map((i,index)=>{
                let checkYoutubeUrl=false
                if(typeof i == "string"){
                    if(i.split("/embed/").length==2){
                         checkYoutubeUrl=true
                    }
                }
                //if(i.split("/embed/").length==2){
                //    checkYoutubeUrl=true
                //}

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
                        {checkYoutubeUrl
                        ?<embed style={{width:"100%",height:"100%"}}
                                src={i}
                        />
                        :<img className="img" src={imgSrc} style={{width:"100%",height:"auto"}} />
                        }
                        {((isAllPhotoUrl)&&(index>0))
                        ?<MdSkipPrevious
                                style={{
                                    position:"absolute",border:isFile?"3px solid red":"3px solid green",fontSize:"2rem",
                                    backgroundColor:"white",bottom:"1rem",left:"1rem",
                                    zIndex:"0",borderRadius:"50%"
                                }}
                                onClick={e=>moveFirst({idx:index,inputState,setInputState,keyName,reloadImage,setShowImage})}
                        />
                        :null
                        }

                        {((isAllPhotoUrl)&&(index>1))
                        ?<MdFastRewind
                                style={{
                                    position:"absolute",border:isFile?"3px solid red":"3px solid green",fontSize:"2rem",
                                    backgroundColor:"white",bottom:"1rem",left:"5rem",
                                    zIndex:"0",borderRadius:"50%"
                                }}
                                onClick={e=>movePrevious({idx:index,inputState,setInputState,keyName,reloadImage,setShowImage})}
                        />
                        :null
                        }

                        {((isAllPhotoUrl)&&(index<arrsLength-2))
                        ?<MdFastForward
                                style={{
                                    position:"absolute",border:isFile?"3px solid red":"3px solid green",fontSize:"2rem",
                                    backgroundColor:"white",bottom:"1rem",left:"9rem",
                                    zIndex:"0",borderRadius:"50%"
                                }}
                                onClick={e=>moveNext({idx:index,inputState,setInputState,keyName,reloadImage,setShowImage})}
                        />
                        :null
                        }

                        {((isAllPhotoUrl)&&(index<arrsLength-1))
                        ?<MdSkipNext
                                style={{
                                    position:"absolute",border:isFile?"3px solid red":"3px solid green",fontSize:"2rem",
                                    backgroundColor:"white",bottom:"1rem",left:"13rem",
                                    zIndex:"0",borderRadius:"50%"
                                }}
                                onClick={e=>moveLast({idx:index,inputState,setInputState,keyName,reloadImage,setShowImage})}
                        />
                        :null
                        }
                        
                        <MdDelete  
                            style={{
                                position:"absolute",border:isFile?"3px solid red":"3px solid green",fontSize:"2rem",
                                backgroundColor:"white",top:"1rem",right:"1rem",
                                zIndex:"0",borderRadius:"50%"
                            }}
                            onClick={e=>{
                                if(isFile){
                                    deleteFileUrl({name:imgName,arrayFile,setArrayFile,reloadImage,setShowImage})
                                    //console.log(imgName)                          
                                }else{
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
    <div style={{height:"100%",overflow:"hidden"}}>        
        <input
            type="file"
            multiple="multiple" accept="image/jpeg,image/png,image/jpg,image/*"
            style={{display:"none"}}
            ref={refButtonAddPicture}

            onChange={e=>{
                //console.log(e.target.files)
                //setArrayFile(e.target.files)
                handleInputFile({files:e.target.files,
                arrayFile,
                setArrayFile})
                



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
                เลือกรูป       
            </button>  
            <p>จำนวนรูป = {totalImages}</p>
        </div>
        {useYoutubeLink
        ?<div style={{margin:"0.1rem 0", height:"20%"}}>
            <button
                onClick={e=>{
                    //console.log('youtubeURL')
                    //console.log(youtubeURL)
                    

                    const temp = youtubeURL.split('watch?v=')
                    
                    if(temp.length==2){
                        const temp2=`${temp[0]}embed/${temp[1]}`
                        const temp3=inputState[keyName]
                        const tempInputState={...inputState,[keyName]:[...temp3,temp2]}
                        setInputState({...tempInputState})
                        reloadImage({setShowImage})
                    }
                
                }}
            >ใส่ URL ยูทูปด้านล่าง แล้วกดปุ่มนี้</button>
            <input value={youtubeURL}
                   onChange={e=>{
                        setYoutubeURL(e.target.value)
                   }}
            />
        </div>
        :null
        }
        {//style={{height:imgFrameHeight,overflow:"auto"}}

        (imgarrs)
        ?   <div style={{width:"100%",height:"100%",display:"flex",
                        justifyContent:"center"}}>
                <div className="img-frame" 
                    id="img-id"
                    ref={refFrame}
                    style={{height:'60%',width:"60%",overflow:"scroll"}}
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

Galleryone_add.defaultProps={
    useYoutubeLink:true
}



//style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}
