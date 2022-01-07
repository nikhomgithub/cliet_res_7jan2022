import React from 'react';
import {MdClose,MdCheck} from 'react-icons/md';

const renderHeightRangeBar=({showRange,setShowRange,heightTop,setHeightTop})=>{
/*
<div  style={{position:"absolute",bottom:"2rem",right:"0",
        width:`50%`,zIndex:"200"}}>
*/
return(
showRange  
?<div  style={{width:`100%`}}>
    
    <div className="flex-center-center jc-space-between">
        <div className="w-95">
            <input type="range" min="0" max="90" orient="vertical"
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
                onClick={e=>{setShowRange(!showRange,"showRange")}}/>
        </div>
    </div>
</div> 
:<MdCheck className="sm-icon"
         style={{position:"absolute",bottom:"1.5rem",zIndex:"200",right:"0",
                backgroundColor:"rgba(255,255,255,0.5)"}}
          onClick={e=>{setShowRange(!showRange,"showRange")}}/>
)
}

export default renderHeightRangeBar

