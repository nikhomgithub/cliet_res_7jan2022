import React from 'react';
import {MdClose,MdCheck} from 'react-icons/md';
import {FaChevronCircleLeft,FaChevronCircleRight} from 'react-icons/fa'

const renderWidthRangeBar=({showRange,setShowRange,
    widthLeft,setWidthLeft,
    //heightTop,setHeightTop
})=>{
/*
<div  style={{position:"absolute",bottom:"2rem",left:"0",
        width:`50%`,zIndex:"200"}}>
*/


return(
<div className="hide-on-print" 
      style={{width:`100%`,height:"5vh"}}>
    
    <div className="flex-center-center jc-space-between">
        <div className=""
             style={{width:`15%`,height:"5vh",display:"flex",alignItems:"center",justifyContent:"center"}}
        >
            <FaChevronCircleLeft className="md-icon"
                onClick={e=>{
                    setWidthLeft(0)
                }}
            />
        </div>
        
        <div className=""
            style={{width:`70%`,height:"5vh",display:"flex",alignItems:"center",justifyContent:"center"}}
        >
            <input type="range" min="0" max="100"   
                style={{visibility:showRange?"visible":"hidden"}}
                value={widthLeft}
                onChange={e=>{setWidthLeft(e.target.value)}} 
            />
        </div>
        
        <div className="" 
             style={{width:`15%`,height:"5vh",display:"flex",alignItems:"center",justifyContent:"center"}}
        >
            <FaChevronCircleRight className="md-icon"
                onClick={e=>{
                    setWidthLeft(100)
                }}
            />
        </div>

        {/*
        <div className="w-5"
             style={{display:"flex",justifyContent:"flex-end"}}
        >
            {
            showRange
            ?<MdClose className="sm-icon" 
                style={{backgroundColor:"rgba(255,255,255,0.5)"}}
                onClick={e=>{
                    setShowRange(!showRange)
                }}/>
            
            :<MdCheck className="sm-icon" 
                style={{backgroundColor:"rgba(255,255,255,0.5)"}}
                onClick={e=>{setShowRange(!showRange)}}/>
            }
        </div>
        */
        }
    </div>

</div>


)
}

export default renderWidthRangeBar
