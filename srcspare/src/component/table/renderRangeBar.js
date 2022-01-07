import React from 'react';
import {MdClose,MdCheck} from 'react-icons/md';


const renderRangeBar=({showRange,setShowRange,
    widthLeft,setWidthLeft,
    heightTop,setHeightTop
})=>{
/*
<div  style={{position:"absolute",bottom:"2rem",left:"0",
        width:`50%`,zIndex:"200"}}>
*/
return(
showRange  
?<div className="hide-on-print"  style={{width:`100%`}}>
    
    <div className="flex-center-center jc-space-between">

        <div className="w-50">
            <input type="range" min="0" max="95"   
                style={{visibility:showRange?"visible":"hidden"}}
                value={widthLeft}
                onChange={e=>{setWidthLeft(e.target.value)}} 
            />
        </div>

        <div className="w-45">
            <input type="range" min="0" max="93" orient="vertical"
                style={{visibility:showRange?"visible":"hidden"}}    
                value={heightTop}
                onChange={e=>{setHeightTop(e.target.value,"heightTop")}} 
            />
        </div>

       <div className="w-5"
             style={{display:"flex",justifyContent:"flex-end"}}
        >
           <MdClose className="sm-icon" 
                style={{backgroundColor:"rgba(255,255,255,0.5)"}}
                onClick={e=>{setShowRange(!showRange)}}/>
        </div>

    </div>

</div>

:<MdCheck className="sm-icon hide-on-print"
         style={{position:"absolute",top:"0.5rem",zIndex:"200",right:"0",
                backgroundColor:"rgba(255,255,255,0.5)"}}
          onClick={e=>{setShowRange(!showRange)}}/>
)
}

export default renderRangeBar
