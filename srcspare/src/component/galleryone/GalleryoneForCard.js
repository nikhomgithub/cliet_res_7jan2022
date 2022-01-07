import { SignalCellularNullRounded, TrainRounded } from '@material-ui/icons';
import React from 'react'

//import $ from 'jquery';
//import './Galleryone.css';
//FaExpand
import {FaExpand,FaCompress} from 'react-icons/fa';

//import Galleryone from './component/galleryone/Galleryone'
//<div style={{width:"300px",border:"1px solid black"}}>
//  <Galleryone imgarrs={["/upload/employee/room-5.jpeg","/upload/employee/room-1.jpeg"]}/>
//</div>

import renderModalImage from './renderModalImage'

export default function GalleryoneForCard({imgarrs,width,showFullScreen}) {
    
    const [showModalImage,setShowModalImage]=React.useState(false)
    let [imageSrc,setImageSrc]=React.useState(null)

    let [modalImageWidth,setModalImageWidth]=React.useState(50);

    const [videoUrl,setVideoUrl]=React.useState(null)

    const renderFullVideo=()=>{
        if(videoUrl){
            return(
                <div style={{width:"100vw",height:"100vh",position:"fixed",left:"0",top:"0",zIndex:"5000"}}>
                    <div style={{width:"100%",height:"100%"}}>
                        <embed style={{width:"100%",height:"100%"}}
                               src={videoUrl}
                        />
                        <FaCompress className="md-icon" 
                            style={{position:"fixed",left:"0.1rem",bottom:"5rem",
                                    backgroundColor:"white",borderRadius:"3px",
                                   fontSize:"5rem",zIndex:"5001"}}
                            onClick={e=>setVideoUrl(null)}
                        />
                    </div>
                </div>
            )
        }
        else{
            return(null)
        }
    }

    const renderImg=(arrs)=>{

        if(arrs){
            return arrs.map((i,index)=>{
                let checkYoutubeUrl=false

                if(typeof i == "string"){
                    if(i.split("/embed/").length==2){
                         checkYoutubeUrl=true
                    }
                }
  
                if(i!==""){

                    let imgSrc
                    let imgName
                    let isFile
                    if(i.blob){
                        isFile=true
                        imgSrc=i.blob
                        imgName=i.name 
                    }    
                    else {
                        isFile=false
                        imgSrc=i
                        imgName=i
                    }
                    //style={{height:'100%',width:'100%',
                    //display:'grid',placeItems: 'center',
                    //}}
                    return    (
                        <div key={index} style={{height:'100%',width:'100%'}}>
                            {checkYoutubeUrl
                            ?
                            <div className="h-100 w-100" 
                                 style={{position:"relative"}}
                            >
                                <embed style={{width:"100%"}}
                                            src={i}
                                />
                                <div style={{position:"absolute",top:"0",left:"0",
                                            width:"100%",height:"100%",
                                            backgroundColor:"blue",
                                            opacity:"0.05",
                                            zIndex:"1"
                                            }}
                                     onClick={e=>{
                                         setVideoUrl(i)
                                         //console.log(i)
                                         //console.log("zzzzzzzzzzzzzzzzzz")
                                     }}
                                >
                                    ....
                                </div>
                            </div>
                           
                            :<img className="img" 
                                 src={imgSrc} 
                                 style={{
                                        width:'100%',
                                        objectFit:"cover"
                                    }}
                                    onClick={e=>{
                                        setImageSrc(imgSrc)
                                        setTimeout(()=>{
                                            setShowModalImage(true)
                                        },50)
                                    }} 
                            />
                            }
                        </div>   
                    )

                } //if(i!=="")

            }) 
        }
    } 
    //console.log($(`#img-id`).width()*0.57)
    //style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}
    // <div style={{height:"100%",width:entparWidth}} >
    //
    //
    //
    //<div style={{height:"100%"}} >
    return (
        <div style={{width:"100%",height:"100%"}} >
        {
            renderModalImage({show:showModalImage,setShow:setShowModalImage,imgSrc:imageSrc,
                            modalImageWidth,setModalImageWidth
            })
        }

        {
            renderFullVideo()
        }

        {
        (imgarrs)
        ?
            <div className="img-frame h-100" 
                id="img-id"
                style={{width:`${width}%`,overflow:"auto"}}    
            >       
                <div className="img-track h-100" 
                        style={{display:'flex',width:`${width*imgarrs.length}%`}}>
                {
                  renderImg(imgarrs)
                }
                </div>  
            </div>
        :<p>No Photo</p>
        }
        
        </div>
    )
}


/*




 {!showFullVideo

                                 ?<div className="w-100 h-100" style={{position:"relative"}} >
                                    <embed style={{width:"100%"}}
                                            src={i}
                                    />
                                    <FaExpand className="md-icon"
                                        style={{position:"absolute",bottom:"1rem",right:"1rem",
                                                backgroundColor:"white",borderRadius:"5px"
                                        }}
                                        onClick={e=>{
                                            setShowFullVideo(true)
                                            //setFullScreenVideo(true)
                                            //showFullScreen(i)
                                        }}
                                    />
                                  </div>    
                                 
                                :<div style={{
                                    position:"fixed",width:"100vw",
                                    height:"100vh",
                                    left:"0",top:"0",
                                    zIndex:"10"
                                    }}>
                                    
                                    <embed style={{width:"100%",height:"100%"}}
                                           src={i}/>
                                    <FaCompress className="md-icon"
                                    style={{position:"fixed",bottom:"1rem",right:"5rem",
                                            backgroundColor:"white",borderRadius:"5px",
                                            zIndex:"11",fontSize:"5rem"                            
                                    }}
                                    onClick={e=>{
                                        setShowFullVideo(false)
                                        //setFullScreenVideo(true)
                                        //showFullScreen(i)
                                    }}
                                />
                                    
                                </div>   
                                 }





*/
