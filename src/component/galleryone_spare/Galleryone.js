import React from 'react'

//import $ from 'jquery';
//import './Galleryone.css';

//import Galleryone from './component/galleryone/Galleryone'
//<div style={{width:"300px",border:"1px solid black"}}>
//  <Galleryone imgarrs={["/upload/employee/room-5.jpeg","/upload/employee/room-1.jpeg"]}/>
//</div>

import renderModalImage from './renderModalImage'

export default function Galleryone({imgarrs,width}) {
    
    const [showModalImage,setShowModalImage]=React.useState(false)
    let [imageSrc,setImageSrc]=React.useState(null)

    let [modalImageWidth,setModalImageWidth]=React.useState(100);

    const renderImg=(arrs)=>{

        if(arrs){
            return arrs.map((i,index)=>{
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
                            <img className="img" 
                                 src={imgSrc} 
                                 style={{
                                        width:'100%',
                                        objectFit:"cover"
                                    }}
                                    onDoubleClick={e=>{
                                        setImageSrc(imgSrc)
                                        setTimeout(()=>{
                                            setShowModalImage(true)
                                        },50)
                                    }} 
                            />
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
        <div style={{width:"100%"}} >
        {
        renderModalImage({show:showModalImage,setShow:setShowModalImage,imgSrc:imageSrc,
                          modalImageWidth,setModalImageWidth
        })
        }

        {
        (imgarrs)
        ?
            <div className="img-frame border" 
                id="img-id"
                style={{width:`${width}px`,overflow:"auto"}}    
            >       
                <div className="img-track" 
                        style={{display:'flex',width:`${width*imgarrs.length}px`}}>
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
//style={{width:'100%',height:imgFrameHeight,overflow:"auto"}}