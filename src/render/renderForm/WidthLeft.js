
import React from 'react';

import '../Modal.css'



function WidthLeft({
   pageData,
   basicData,
   setShow,
   submitFunction
}) {

const refSubmitForm=React.createRef() //ตกลง
const refCancelForm=React.createRef() //ยกเลิก    

const [formInputState,setFormInputState]=React.useState({widthLeft:basicData.widthLeft})

/*
const widthLeftForm={
   formHead:"Set Width",
   WidthLeft:"Width"
}
*/

//=======================
const renderFooter=()=>{
   return(
   <div style={{display:"flex",position:"fixed",bottom:"1rem",right:"2rem",zIndex:"100"}}
   >
       <div>
           <button
               ref={refSubmitForm}
               onKeyDown={e=>{
                   if(e.key=="ArrowRight"){
                       refCancelForm.current.focus()
                   }
               }}
               onClick={e=>{
                   if(submitFunction){
                       submitFunction(formInputState)
                   }

               }}
           >Confirm</button>
       </div>
       
       <div>
           <button
               ref={refCancelForm}
               onKeyDown={e=>{
                   if(e.key=="ArrowLeft"){
                       refCancelForm.current.focus()
                   }
               }}
               onClick={e=>{
                   setShow(false)
               }}
           >Cancel</button>
       </div>

   </div>
   )
}
//=======================




return (
<div className="Modal-background">
   <div className="Modal-box" 
        style={{paddingBottom:"1rem",minWidth:"70%",minHeight:"100px"}}>
       <div className="Modal-header">
           <div className="flex-center-center">
               <h5>{pageData.widthLeftForm.formHead}</h5>
           </div>
       </div>

       <div 
            className="w-100 flex-center-center jc-start" 
            style={{marginBottom:"0.2rem"}}>
                
               <div className="w-30">{pageData.widthLeftForm.widthLeft}</div>
                
               <div className="w-70" style={{position:"relative"}}>
                    <input
                        type={"number"}
                        value={formInputState.widthLeft}
                        onChange={e=>{
                            setFormInputState({widthLeft:parseInt(e.target.value)})
                        }}
                    />
               </div>
      </div>

      {renderFooter()}

   </div>
</div>
)      
}

WidthLeft.defaultProps={

}


export default WidthLeft;
