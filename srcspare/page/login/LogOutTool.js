import React from 'react';
import {MainContext} from '../../context/MainContext'

import {RiLogoutBoxRFill} from 'react-icons/ri'
import {FaHome,FaUserCircle} from 'react-icons/fa';
import {MdLogout} from 'react-icons/md';
import Ticon from '../../component/ticon/Ticon';
import {Link} from 'react-router-dom';
import ShopPayment from './ShopPayment'

import '../../component/navbar/Navbar.css';

function LogOutTool(props) {

   const {//useShopLogOut,haveShopToken,haveUserToken,userName,
      useShopLogOut,
      tokenSt,
      setReloadCheckToken,
      user,
      useHomeIcon,
      myheader,
      useBillWaveIcon
   }=props
  
      console.log('LogOutTool')

   const {haveShopToken,haveUserToken}=tokenSt
  //const {myheader,tokenSt,setReloadCheckToken}=React.useContext(MainContext)
  //const {reloadCheckToken,haveShopToken,haveUserToken,userName}=tokenSt
  const refHome=React.createRef()

  const [showShopMonthlyFee,setShowShopMonthlyFee]=React.useState(false)


  const getIconStyle=()=>{
     
     const toDate=new Date()
     
     let temp1=localStorage.getItem("expirationDate")
     const expirationDate=new Date(temp1)
     
     if(!temp1){
        return null
     }

     const temp3=new Date(expirationDate.toISOString())
     temp3.setDate(temp3.getDate()-3)
     const threeDayBeforeExpirationDate=new Date(temp3)
     //const temp2=expirationDate.getDate()-3
     //const temp3=expirationDate.toISOString()
    
      const a=toDate.getTime()-expirationDate.getTime()
      //console.log('a....')
      //console.log(a)

      //console.log('toDate')
      //console.log(toDate)

      //console.log('exp')
      //console.log(expirationDate)

      //console.log('3 d before')
      //console.log(threeDayBeforeExpirationDate)

      if(toDate>expirationDate){
         return {color:"red"}
      }
      else if(toDate>threeDayBeforeExpirationDate){
         return {color:"yellow"}
      }
      else{
         return {color:"green"}
      }

  }

//=======================
return (
<div className="" style={{position:"fixed",right:"0.1rem",top:"0.1rem"}}>

   <div className="" 
        style={{borderRadius:"1.2rem",padding:"0 0.5rem",height:"2rem",
                display:"flex",justifyContent:"space-between",alignItems:"center",
                flexWrap:"nowrap"}}>
        
        {useHomeIcon&&
        <div className="iconbox"
         onClick={e=>refHome.current.click()}
        >
            <Ticon iconName="FaHome" className="navIcon" 
                   iconStyle={getIconStyle()}
            />
        </div>
         }

       {user //haveUserToken
       ?<div className="flex-center-center h-100"
             style={{color:"white",margin:"0 0.4rem"}}
        >
          {`${user.username}@${user.shopId}`}
         </div>
       :null
       }

       {haveUserToken
          ?<div className="iconbox"
               onClick={e=>{
                  localStorage.removeItem('userauthorization');
                  localStorage.removeItem('username');
                  setReloadCheckToken(true)
                  window.location.reload()
               }}
          >
            <Ticon iconName="RiLogoutBoxRFill" className="navIcon"
             />
          </div>
          :haveShopToken
            ?useShopLogOut&&
            <div className="iconbox"
               onClick={e=>{
                  localStorage.removeItem('shopauthorization');
                  localStorage.removeItem('expirationDate');
                  setReloadCheckToken(true)
                  window.location.reload()
               }}
            >
               <Ticon iconName="MdLogout" className="navIcon"
               />
            </div>
            :null
       
       }
   </div>

   {useBillWaveIcon&&
      <div className="iconbox"
           style={{ width:"100%",display:"flex",
                    justifyContent:"center",
                    paddingRight:"",
                    padding:"0.5rem"
                 }} 
            onClick={e=>{
               setShowShopMonthlyFee(true)
            }}
      >
            <Ticon iconName="FaMoneyBillWave" 
                   className="navIconCircle" 
            />
      </div>
   }  

   {
      showShopMonthlyFee&&
      <div className="Modal-background">
         <div className="Modal-box">
            <ShopPayment
               myheader={myheader}
               setShowShopMonthlyFee={setShowShopMonthlyFee}
            />      
         </div>
     </div>
   }
      

   <div style={{display:"none"}}>
         <div>
            <Link ref={refHome} to="/pos/home"/>
         </div>
   </div>


</div>

)}

LogOutTool.defaultProps={
   useShopLogOut:true,
   useHomeIcon:true
}
 


export default LogOutTool;
