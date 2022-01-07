import React from 'react';
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import {MainContext} from '../../context/MainContext'
import {MdVisibility,MdVisibilityOff,MdAddCircle,MdVpnKey} from 'react-icons/md';
import {FaUserCircle,FaCheck,FaBan,FaMoneyBillWave,
        FaArrowCircleRight,FaArrowCircleLeft
} from 'react-icons/fa'
import {BsShop} from 'react-icons/bs'

import photoUtil from '../../component/galleryone_add/photoUtil'

import LogOutTool  from './LogOutTool';
import renderModalError from '../../render/renderModalError'
import axiosUtil from '../../util/axiosUtil'
import {Link} from 'react-router-dom';

const {catchErrorToMessage}=axiosUtil

function LogIn() {
  
  const {basicDataSt,myheader,tokenSt,setReloadCheckToken}=React.useContext(MainContext)
  const {reloadCheckToken,haveShopToken,haveUserToken,userName}=tokenSt
   console.log('LogIn......')
   //console.log(tokenSt)
   //console.log(basicDataSt)
   const {pageData,user}=basicDataSt

   const refHome=React.createRef()

   const refSubmit=React.createRef()
   const refCancel=React.createRef()


  const shopLogInForm={
     formHead:"Shop Log In",
     shopName:"Shop Name",
     password:"Password"
  }

  const userLogInForm={
     formHead:"User Log In",
     username:"User Name",
     password:"Password",
     createNewUser:"Create Default User"
  }

  const userChangePasswordForm={
     formHead:"User Change Password",
     username:"User Name",
     password:"Password",
     newPassword1:"New Password",
     newPassword2:"Confirm New Password"
  }

  const shopSignUpForm={
      formHead:"Shop Sign Up",
      shopName:"Shop Name",
      password:"Password",
      confirmPassword:"Confirm Password",
      ownerName:"Owner Name",
      ownerEmail:"Ower Email"
  }

  const shopForgetPasswordForm={
     formHead:"Set New Shop Password ",
     formHead1:"Recovery Password will be sent to your Email, use it to create new shop password",
     recoveryPassword:"Recovery password",
     shopName:"Shop Name",
     password:"Shop Password",
     confirmPassword:"confirm Shop Password"
  }


   const allRef={
      shopName:React.createRef(),
      username:React.createRef(),
      password:React.createRef(),
      confirmPassword:React.createRef(),
      newPassword1:React.createRef(),
      newPassword2:React.createRef(),
      ownerName:React.createRef(),
      ownerEmail:React.createRef(),
   }

   
   const userLogInNextRef={
      username:()=>allRef.password.current.focus(),
      password:()=>refSubmit.current.focus()
   }

   const shopLogInNextRef={
      shopName:()=>allRef.password.current.focus(),
      password:()=>refSubmit.current.focus()
   }

   const userChangePasswordNextRef={
      username:()=>allRef.password.current.focus(),
      password:()=>allRef.newPassword1.current.focus(),
      newPassword1:()=>allRef.newPassword2.current.focus(),
      newPassword2:()=>refSubmit.current.focus()
   }

   const shopSignUpNextRef={
      shopName:()=>allRef.password.current.focus(),
      password:()=>allRef.confirmPassword.current.focus(),
      confirmPassword:()=>allRef.ownerName.current.focus(),
      ownerName:()=>allRef.ownerEmail.current.focus(),
      ownerEmail:()=>refSubmit.current.focus(),
   }

   const shopForgetPasswordNextRef={
      recoveryPassword:()=>allRef.shopName.current.focus(),
      shopName:()=>allRef.password.current.focus(),
      password:()=>allRef.confirmPassword.current.focus(),
      confirmPassword:()=>refSubmit.current.focus(),
   }


   const [userChangePasswordState,setUserChangePasswordState]=React.useState({
      username:"",
      password:"",
      newPassword1:"",
      newPassword2:""
   })

   const [shopState,setShopState]=React.useState({
      shopName:"",
      password:""
   })

   const [userState,setUserState]=React.useState({
      username:"",
      password:""
   })

   const [shopSignUpState,setShopSignUpState]=React.useState({
      shopName:"",
      password:"",
      confirmPassword:"",
      ownerName:"",
      ownerEmail:"",
   })

   const [shopForgetPasswordState,setShopForgetPasswordState]=React.useState({
      recoveryPassword:"",
      shopName:"",
      password:"",
      confirmPassword:""
   })

   const refReCaptcha=React.useRef()

   const [hidePassword,setHidePassword]=React.useState(true)

  //====================================
  const [showModalError,setShowModalError]=React.useState(false)
  
  const [message,setMessage]=React.useState(null)
  //------------------------------------

  const [showChangePassword,setShowChangePassword]=React.useState(false)
  const [showShopSignUp,setShowShopSignUp]=React.useState(false)
  const [showShopForgetPassword,setShowShopForgetPassword]=React.useState(false)
  const [showReCaptcha,setShowReCaptcha]=React.useState(true)
  const [showResetRequest,setShowResetRequest]=React.useState(true)

  //====================================

  const submitShopLogIn=(inputState,setInputState)=>{
    const tempKey=Object.keys(inputState)

    axios.post(`/p35shop/shoplogin`,inputState)
    .then(result=>{
        //console.log(`/shop/shoplogin`)
        //console.log(result)
        
        localStorage.setItem('shopauthorization',
        `b ${result.data.shopToken}`)
        localStorage.setItem('expirationDate',
        `${result.data.expirationDate}`)

        setReloadCheckToken(true)
        
        setShopState({
           shopName:"",password:""
        })
        
        setUserState({
           username:"",password:""
        })

        window.location.reload();

    })
    .catch(error=>{
        setMessage(catchErrorToMessage(error))
        setShowModalError(true)
    })
  }
  //-------------------------------
  
  //-------------------------------
  
  const submitUserLogIn=(inputState,setInputState)=>{

   const tempKey=Object.keys(inputState)

   axios.post(`/p35user/login`,inputState,myheader)
   .then(result=>{
      console.log('result')
     localStorage.setItem('userauthorization',
       `b ${result.data.userToken}`)
     localStorage.setItem("username",
       result.data.username)
       setReloadCheckToken(true)
        
       setShopState({
         shopName:"",password:""
      })
      
      setUserState({
         username:"",password:""
      })
      window.location.reload();

   })
   .catch(error=>{
       setMessage(catchErrorToMessage(error))
       setShowModalError(true)
   })
 }
//============================
const submitUserChangePassword=(inputState,setInputState)=>{

   axios.post(`/p35user/changepassword`,inputState,myheader)
   .then(result=>{
      console.log('result')
      localStorage.removeItem('userauthorization');
      localStorage.removeItem('username');
      
      setUserChangePasswordState({
         username:"",
         password:"",
         newPassword1:"",
         newPassword2:""
       })
      
      setShowChangePassword(false)
      
      setReloadCheckToken(true)  
      window.location.reload();

   })
   .catch(error=>{
       setMessage(catchErrorToMessage(error))
       setShowModalError(true)
   })

}

//-----------------------------
const submitCancelChangePassword=()=>{
   setShowChangePassword(false)
   setUserChangePasswordState({
      username:"",
      password:"",
      newPassword1:"",
      newPassword2:""
   })
}
//-----------------------------
const submitShopSignUp=(inputState)=>{
   const {password,confirmPassword}=inputState
   if(password!=confirmPassword){
      setShopSignUpState({
         ...shopSignUpState,
         password:"",
         confirmPassword:""
      })
      setMessage(catchErrorToMessage("Invalid Password"))
      setShowModalError(true)
   }
   else{
         axios.post(`/p35shop/shopsignup`,inputState,myheader)
         .then(result=>{
            //console.log('result')      
            setShopSignUpState({
               shopName:"",
               password:"",
               confirmPassword:"",
               ownerName:"",
               ownerEmail:""
            })
            
            setShowShopSignUp(false)
            //setReloadCheckToken(true)  
            //window.location.reload();
         })
         .catch(error=>{
            setMessage(catchErrorToMessage(error))
            setShowModalError(true)
         })
   }
 
}
//------------------------------

const submitCreateShopPassword=(inputState)=>{

   if(inputState.confirmPassword!==inputState.password){
         setShopForgetPasswordState({
            ...shopForgetPasswordState,
            password:"",
            confirmPassword:""
         })

         setMessage("recheck your password and confirm password")
         setShowModalError(true)
   }
   else{

         axios.post(`/p35shop/createshoppassword`,inputState)
         .then(result=>{
            //console.log('result.......resetshoppassword')
            //console.log(result)
            //refReCaptcha.current.reset()
            //setShowReCaptcha(true)
            setShopForgetPasswordState({
               ...shopForgetPasswordState,
               shopName:"",
               password:"",
               recoveryPassword:"",
               confirmPassword:""
            })
            setHidePassword(true)
            setShowResetRequest(true)
            setShowShopForgetPassword(false)
         
         })
         .catch(error=>{
            setMessage(catchErrorToMessage(error))
            setShowModalError(true)
         })
   }
}
//----------------------------
const requestRecoveryPassword=(inputState)=>{

   axios.post(`/p35shop/resetshoppassword`,inputState)
   .then(result=>{
       //console.log('result.......resetshoppassword')
       //console.log(result)

       setShopForgetPasswordState({
         ...shopForgetPasswordState,
         shopName:"",
         password:"",
         recoveryPassword:"",
         confirmPassword:""
      })

       refReCaptcha.current.reset()
       setShowReCaptcha(true)
       setShowResetRequest(false)
   })
   .catch(error=>{
       setMessage(catchErrorToMessage(error))
       setShowModalError(true)
   })
}
//-----------------------------
const renderLogin=({pageForm,setInputState,inputState,submitFunc,submitCancel,nextRef})=>{
   const pageFormKey=Object.keys(pageForm)
   const inputStateKey=Object.keys(inputState)

     
   const renderInput=(i,idx)=>{
      if(i=="password"||i=="newPassword1"||i=="newPassword2"||i=="confirmPassword"){
         return (
         <div key={idx} 
            className="flex-center-center jc-start w-100"
            style={{marginBottom:"1rem"}}
        >
            <div className="xc4">
                 {pageForm[i]}
            </div>
            <div className="xc8"
                 style={{position:"relative"}}
            >
                <input
                   type={hidePassword?"password":"text"}
                   value={inputState[i]}
                   ref={allRef[i]}
                   onChange={e=>{setInputState({
                      ...inputState,
                      [i]:e.target.value
                   })}}
                   onKeyDown={e=>{
                      if(e.key=="Enter"){
                        //console.log(nextRef[i]) 
                        nextRef[i]()
                      }
                   }}
                   autoComplete='one-time-code'
                />
                    {
                    hidePassword
                    ?<MdVisibilityOff 
                       className="sm-icon" 
                       style={{position:'absolute',top:"0.2rem",right:'0.3rem'}}
                       onClick={e=>{
                       setHidePassword(!hidePassword)
                       }}
                    />
                    :<MdVisibility 
                       className="sm-icon" 
                       style={{position:'absolute',top:"0.2rem",right:'0.3rem'}}
                       onClick={e=>{
                       setHidePassword(!hidePassword)
                       }}
                    />
                    }
  
            </div>
         </div>
         )
      }
      
      else{
         return(
            
            <div key={idx}
               className="flex-center-center jc-start w-100"
               style={{marginBottom:"1rem"}}
            >
               
               <div className="xc4">
                  {pageForm[i]}
               </div>
               <div className="xc8">
                  <input
                        ref={allRef[i]}
                        type={(i=="id"//||
                              //i=="branchId"
                              )
                              ?"number":"text"}
                        value={inputState[i]}
                        onChange={e=>{setInputState({
                           ...inputState,
                           [i]:e.target.value
                        })}}
                        
                        onKeyDown={e=>{
                           if(e.key=="Enter"){
                              //console.log(nextRef[i])
                              nextRef[i]()
                           }
                        }}

                        disabled={ (
                                    //i=="branchId"||
                                    i=="userLevel")
                                   ?"disabled"
                                   :""
                                 }

                  />
               </div>
               
            </div>
         )
      }
   }

   return (
   <div className="w-100 bd-pureWhite" style={{padding:"1rem"}}>
         <div className="flex-center-center w-100"
            style={{marginBottom:"1rem"}}
         >
            <h3>{pageForm[pageFormKey[0]]}</h3>
         </div>

         {
            inputStateKey.map((i,idx)=>{
               return renderInput(i,idx)
            })
         }


         <div className="flex-center-center jc-end jc-start w-100"
         >
               <button
                  ref={refSubmit}
                  onClick={e=>submitFunc(inputState,setInputState)}
               >
                  <FaCheck/>
               </button>
            {submitCancel&&
               <button
                  ref={refCancel}
                  onClick={e=>submitCancel()}
               >
                  <FaBan/>
               </button>  
            }
         </div>
   </div>
   )
   
}

const renderAvatar=()=>{
   return user
      ?<div className="">
            <div className="w-100 flex-center-center">
               <FaUserCircle
                  style={{fontSize:"4.5rem",margin:"auto"}}
               />
            </div>
            <div 
               style={{textAlign:"center",fontSize:"1.5rem"}}>
                  {`${user.username}`}
            </div>
            <div className="divlink"
               onClick={e=>{
                  setShowChangePassword(true)
            }}>
                  Change User Password
            </div>
      </div>
      :null
   
}
//==========================
const renderShopMonthlyFee=()=>{
  
   
}
//-------------------------
const renderShopLogIn=()=>{
   if(showShopSignUp){
      return(
         <div className='w-100 h-100'>
            {
                  renderLogin({
                        pageForm:shopSignUpForm,
                        setInputState:setShopSignUpState,
                        inputState:shopSignUpState,
                        submitFunc:submitShopSignUp,
                        nextRef:shopSignUpNextRef,
                        submitCancel:()=>{
                           setShopSignUpState({
                              shopName:"",
                              password:"",
                              confirmPassword:"",
                              ownerName:"",
                              ownerEmail:"",
                           })
                           setShowShopSignUp(false)
                        }
                  })
               }
         </div>
      )
   }
   else if(showShopForgetPassword){
      console.log('showShopForgetPass')

      return showResetRequest
         ?<div className="w-100 bd-pureWhite" style={{padding:"1rem"}}>
               <div className="flex-center-center w-100"
                  style={{marginBottom:"1rem"}}
               >
                  <h3>{"Request For Recovery Password"}</h3>
               </div>
            
               <ReCAPTCHA
                     style={{visibility:showReCaptcha?"visible":"hidden"}}
                     ref={refReCaptcha}
                     sitekey={process.env.REACT_APP_SITE_KEY}//'6LcCvsQdAAAAAAqWKtgK3Tb6l3LYBjtCVrlaIog0'
                     onChange={value=>{
                        console.log(value)
                        setShowReCaptcha(false)
                     }}
               />
                 
               <div className='w-100'
                     style={{visibility:showReCaptcha?"hidden":"visible"}}
               >

                     <div
                        className="flex-center-center jc-start w-100"
                        style={{marginBottom:"1rem"}}
                     >
                        
                        <div className="xc4">
                           {shopForgetPasswordForm.shopName}
                        </div>
                        <div className="xc8">
                           <input
                              value={shopForgetPasswordState.shopName}
                              style={{width:"100%"}}
                              onChange={e=>{
                                 setShopForgetPasswordState({
                                    ...shopForgetPasswordState,
                                    shopName:e.target.value
                                 })
                              }}
                           />
                        </div>
                     </div>

                     <div
                        style={{marginBottom:"1rem"}}
                     >{`${shopForgetPasswordForm.formHead1}`}</div>

               </div>
                     

               <div className="flex-center-center jc-end jc-start w-100"
               >

                  <button
                     ref={refCancel}
                     onClick={e=>{
                        const tempToken=refReCaptcha.current.getValue()
                        console.log(tempToken)
                        refReCaptcha.current.reset()
                        requestRecoveryPassword({
                              shopName:shopForgetPasswordState.shopName,
                              token:tempToken})
                     }}
                  >
                     <FaCheck/>
                  </button>  
                  <button
                     //ref={refSubmit}
                     onClick={e=>{
                        refReCaptcha.current.reset()
                        setShopForgetPasswordState({
                           ...shopForgetPasswordState,
                           shopName:e.target.value
                        })
                        setShowShopForgetPassword(false)
                        
                     }}
                  >
                     <FaBan/>
                  </button>
           
               </div>               


         </div>
    
         :<div className='w-100 h-100'>
            {
               renderLogin({
                     pageForm:shopForgetPasswordForm,
                     setInputState:setShopForgetPasswordState,
                     inputState:shopForgetPasswordState,
                     submitFunc:submitCreateShopPassword,
                     nextRef:shopForgetPasswordNextRef,
                     submitCancel:()=>{
                        setShopForgetPasswordState({
                           recoveryPassword:"",
                           shopName:"",
                           password:"",
                           confirmPassword:""
                        })
                        setShowShopForgetPassword(false)
                     },
               })
            }
         </div>
      
   }

   
   
   
   else{
         return (
            <div className='w-100 h-100'>
                  {
                  renderLogin({
                        pageForm:shopLogInForm,
                        setInputState:setShopState,
                        inputState:shopState,
                        submitFunc:submitShopLogIn,
                        nextRef:shopLogInNextRef
                  })
                  }

                  <div className="bill-p"
                     style={{display:"flex",justifyContent:"flex-start",alignItems:"baseline",
                              margin:"1rem 0"}}
                     onClick={e=>{
                        setShowShopSignUp(true)
                     }}
                  >
                        <MdAddCircle style={{marginLeft:"-1rem"}}/>
                        <BsShop style={{fontSize:"2rem"}}/>

                        <div style={{marginLeft:"1rem"}}>
                           Create a new shop account

                        </div>
                  </div>


                  <div className="bill-p"
                     
                     style={{display:"flex",justifyContent:"flex-start",alignItems:"baseline",
                              margin:"1rem 0"}}

                     onClick={e=>{
                        setShowShopForgetPassword(true)
                        setShowReCaptcha(true)
                        setShowResetRequest(true)
                     }}
                  >
                     <MdVpnKey style={{marginLeft:"-1rem"}}/>
                     <BsShop   style={{fontSize:"2rem"}}/>

                     <div style={{marginLeft:"1rem"}}>
                        Forget shop password
                     </div>
                  </div>

                
            </div>
         )
   }
}


//=========================
const renderBody=()=>{
   return tokenSt.haveShopToken
      ?tokenSt.haveUserToken
         ?renderAvatar()
         :<div className="xc4 lc6 mc8 sc10" style={{padding:"0rem"}}>
            {
            renderLogin({
                  pageForm:userLogInForm,
                  setInputState:setUserState,
                  inputState:userState,
                  submitFunc:submitUserLogIn,
                  nextRef:userLogInNextRef
            })
            }
             
         </div>
      :<div className="xc4 lc6 mc8 sc10" style={{padding:"0rem"}}>
        {
           renderShopLogIn()
        }
         
      </div>
}

const renderChangePasswordModal=()=>{
return(
   <div className="xc4 lc6 mc8 sc10" style={{padding:"0rem"}}>
         {
         renderLogin({
               pageForm:userChangePasswordForm,
               setInputState:setUserChangePasswordState,
               inputState:userChangePasswordState,
               submitFunc:submitUserChangePassword,
               submitCancel:submitCancelChangePassword,
               nextRef:userChangePasswordNextRef
         })
         }
   </div>
)
}

//=======================
return (
   <div style={{height:"100vh",width:"100vw",position:"relative"}}
        className="flex-center-center"
   >
         <div style={{position:"fixed",
            width:"200vw",height:"20vh",
            top:"-2rem",left:"-5rem",
            transform: "rotate(15deg)",
            backgroundColor:"#ff9933"}}
         >
            
         </div>

         {showChangePassword
            ?renderChangePasswordModal()
            :tokenSt&&renderBody()
         }

         <LogOutTool
            tokenSt={tokenSt}
            setReloadCheckToken={setReloadCheckToken}
            user={user}
            myheader={myheader}
            useBillWaveIcon={true}
         />

         {
            showModalError
            ?renderModalError({show:showModalError,
                              setShow:setShowModalError,
                              message,setMessage
                           })
            :null
         }

         <div style={{display:"none"}}>
            <div>
               <Link ref={refHome} to="/home"/>
            </div>
         </div>



   </div>

)}

export default LogIn;



/*
 <img alt='robots' src={`https://robohash.org/${3}&200x200`} />




            <button
                  onClick={async(e)=>{
                       const temp=refA.current.getValue()
                        console.log(temp)
                        refA.current.reset()
                  }}
            >
                  button
            </button>

            <ReCAPTCHA
                  ref={refA}
                  sitekey='6LcCvsQdAAAAAAqWKtgK3Tb6l3LYBjtCVrlaIog0'
                  onChange={value=>{
                        console.log(value)
                  }}
            />


*/