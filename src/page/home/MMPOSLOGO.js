import React from 'react';
import {BsShop} from 'react-icons/bs'

function MMPOSLogo(props) {

const {bgColor}=props
//====================

const renderMM=()=>{

   return(
      <div
      style={{
         display:"flex",
         justifyContent:"flex-start", 
         alignItems:"center",
         marginBottom:"0.4rem"
      }}
      >
         <div style={{
            border:"1px solid white",
            borderRadius:"50%",
            width:"3rem",height:"3rem",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            //backgroundColor:"#dd3524"
            background:"rgb(254,139,128)",
            background:"radial-gradient(circle, rgba(254,139,128) 43%, rgba(255,23,0,1) 100%)"
         }}>
               <div
                    style={{
                     fontFamily:"Baumans",
                     color:"white",
                     fontWeight:"bold",
                     fontSize:"2.7rem",
                     letterSpacing:"3px",
                     paddingBottom:"0.6rem",
                  }}
               >
               m   
               </div>
         </div>

         <div style={{
            border:"1px solid white",
            borderRadius:"50%",
            width:"3rem",height:"3rem",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            //backgroundColor:"#dd3524"
            marginLeft:"-0.4rem",
            background:"rgb(255,210,127)",
            background:"radial-gradient(circle, rgba(255,210,127) 0%, rgba(251,156,6,1) 100%)"
         }}>
               <div
                    style={{
                     fontFamily:"Baumans",
                     color:"white",
                     fontWeight:"bold",
                     fontSize:"2.7rem",
                     letterSpacing:"3px",
                     paddingBottom:"0.6rem",
                  }}
               >
               m   
               </div>
         </div>         

      </div>


   )
}

  //=======================
return (

   <div
      style={{
         display:"flex",
         justifyContent:"flex-start", 
         alignItems:"flex-end",width:"",height:"",
         margin:"0",
         padding:"0.1rem",
         backgroundColor:bgColor,
      }}
   >
      
     {
        renderMM()
     }
      
      <div style={{
         
      }}
      >
         <BsShop
            style={{
               color:"gray",
               opacity:"0.2",
               fontSize:"5rem",
               marginLeft:"0rem"
            }}
         />
      </div>
      
     
         <div
            style={{
               right:"1rem",
               top:"2rem",
               fontFamily:"Baumans",
               color:"#2c3e75",
               fontWeight:"bold",
               fontSize:"3.6rem",
               letterSpacing:"1px",
               marginLeft:"-5.6rem",
               marginBottom:"0.3rem"
            }}
         >
            pos
      </div>

   </div>

  )
}

MMPOSLogo.defaultProps={
   bgColr:null
}


export default MMPOSLogo;


