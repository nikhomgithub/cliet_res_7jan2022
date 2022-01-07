

import React from 'react';
import axios from 'axios'

import photoUtil from '../../component/galleryone_add/photoUtil'
import {MdVisibility,MdVisibilityOff,MdAddCircle,MdVpnKey} from 'react-icons/md';
import {FaCheck,FaBan} from 'react-icons/fa'
import axiosUtil from '../../util/axiosUtil'
import StateTemplate from '../../model/StateTemplate';

import GallerySinglePhoto_add from '../../component/galleryone_add/GallerySinglePhoto_add'
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,
    addSingleFileNameInsteadOfPhotoUrl,
    catchErrorToMessage}=axiosUtil
 


function ShopPayment(props) {

    const {setShowShopMonthlyFee}=props

    const refSubmit=React.createRef()
    const refCancel=React.createRef()

    const allRef={
        shopName:React.createRef(),
        username:React.createRef(),
        password:React.createRef(),
     }


    const[showShopPayment,setShowShopPayment]=React.useState(false)
    const [hidePassword,setHidePassword]=React.useState(true)     

    const shopLogInForPaymentForm={
        formHead:"Shop Log In Before Payment",
        shopName:"Shop Name",
        password:"Password"
        }

    const shopMonthlyFeeForm={
        shopName:"Shop Name",
        expirationDate:"Expiration Date",
        monthlyFee:"Monthly Fee",
      }

    const [shopMonthlyFeeState,setShopMonthlyFeeState]=React.useState({
        shopName:"",
        token:"",
        expirationDate:"",
        monthlyFee:"",
        photoUrl1:[''],
        file1:null
     })
    
     const [shopState,setShopState]=React.useState({
         shopName:"",
         password:""
     })

     const shopLogInNextRef={
        shopName:()=>allRef.password.current.focus(),
        password:()=>refSubmit.current.focus()
     }
  


    const {changeArrayFile}=photoUtil

    const [showImage1,setShowImage1]=React.useState(true)
    const [arrayFile1,setArrayFile1]=React.useState([])
    const [fileUrl1,setFileUrl1]=React.useState([])

    React.useEffect(()=>{
        //console.log('fileUrl1')
        //console.log(fileUrl1)
    },[fileUrl1])

    React.useEffect(()=>{
    //console.log('useEffect ArrayFile1')
    //console.log(arrayFile1)
            
    changeArrayFile({ arrayFile:arrayFile1,
        fileUrl:fileUrl1,
        setFileUrl:setFileUrl1,
        inputState:shopMonthlyFeeState,
        setInputState:setShopMonthlyFeeState,
        keyName:"photoUrl1",
        //fileName,
        //serverFolder,
        //fileName:"file",
        //serverFolder:"/upload/customer",
        setShowImage:setShowImage1})
            
    },[arrayFile1])


//=============================
const submitShopLogInForPayment=(inputState)=>{
    console.log('shopLogInForPayment......')
    
    axios.post(`/p35shop/shoploginforpayment`,inputState)
    .then(result=>{

        const {shopName,monthlyFee,expirationDate,token}=result.data
    
        setShopMonthlyFeeState({
            ...shopMonthlyFeeState,
            shopName:shopName,
            monthlyFee:monthlyFee,
            expirationDate:expirationDate,
            token:token
        })
    
        setShopState({
            shopName:"",password:""
        })
    
        setShowShopPayment(true)
    
    })
    .catch(error=>{
        
        //setMessage(catchErrorToMessage(error))
        //setShowModalError(true)
    })
}


const submitShopPayment=(inputState)=>{

    const myheader={headers: {'Content-Type': 'application/json',
    'Shopauthorization':`b ${shopMonthlyFeeState.token}`,
    }}

    console.log('submitShopPayment')
    console.log(shopMonthlyFeeState)

    const {file1,photoUrl1}=inputState

    let tempFormInputState2

    if(!file1){return }
    if(!file1.length){return }
    if(!file1[0].name){return }
   
    tempFormInputState2=addSingleFileNameInsteadOfPhotoUrl({  
        file1,photoUrl1
    })  

    console.log('tempFormInputState2')
    console.log(tempFormInputState2)

    const fd=genFD({
        inputState:tempFormInputState2,
        template:{
            file1:StateTemplate.shopPaymentState.file1,
            photoUrl1:StateTemplate.shopPaymentState.photoUrl1,
        }
    })

    axios.post(`/p35shoppayment/payshopfee`,fd,myheader)
    .then(result=>{
        console.log('result')
        console.log(result)
        setShowShopMonthlyFee(false)
        showShopPayment(false)
    })
    .catch(error=>{
        //setMessage(catchErrorToMessage(error))
        //setShowModalError(true)
    })
}
//=============================
const renderLogin=({
    pageForm,setInputState,
    inputState,submitFunc,
    submitCancel,nextRef})=>{

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
                  />
               </div>
               
            </div>
         )
      }
   }




   return (
    <div className="w-100" style={{padding:"1rem"}}>
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




//------------------------------
const renderShopLogIn=()=>{
    return(
        <div className='w-100 h-100'>
            {
               renderLogin({
                     pageForm:shopLogInForPaymentForm,
                     setInputState:setShopState,
                     inputState:shopState,
                     submitFunc:submitShopLogInForPayment,
                     nextRef:shopLogInNextRef,
                     submitCancel:()=>{
                        setShopState({
                           shopName:"",
                           password:"",
                        })
                        setShowShopMonthlyFee(false)
                     },
               })
            }
         </div>
    )
}

//----------------------------
const renderShopPayment=()=>{
    let inputStateKey=Object.keys(shopMonthlyFeeState)
    let tempArray=[]
    inputStateKey.map(i=>{
       if((i=="token")||(i=="photoUrl1")||(i=="file1")){
       }
       else{
          tempArray=[...tempArray,i]
       }
    })
    inputStateKey=tempArray


    return(

        <div style={{}}>
            <div className="w-100" style={{padding:"1rem"}}>
               <div className="flex-center-center w-100"
                  style={{marginBottom:"1rem"}}
               >
                  <h3>{"Update Your Payment Slip"}</h3>
               </div>


               {
                  inputStateKey.map((i,idx)=>{
                     return(
                        <div key={idx} 
                           className="flex-center-center jc-start w-100"
                           style={{marginBottom:"1rem"}}
                        >
                              <div className="xc4">
                                 {shopMonthlyFeeForm[i]}
                              </div>
                              <div className="xc8"
                                 style={{position:"relative"}}
                              >
                                 {i=="expirationDate"
                                 ?new Date(shopMonthlyFeeState[i]).toLocaleString('en-GB').substring(0,17)
                                 :shopMonthlyFeeState[i]
                                 }
                              </div>
                        </div>
                     )    
                        
                  })
               }

                   
               <div className="xc12 form-row h-100"
                     style={{justifyContent:"space-around"}}>
                     <div className="xc4 sc10 bgc-darkGray bd-lightGray h-100">
                           {
                           showImage1
                           ?<GallerySinglePhoto_add 
                              fileUrl={fileUrl1}
                              arrayFile={arrayFile1}
                              setArrayFile={setArrayFile1}
                              keyName={"photoUrl1"}

                              setShowImage={setShowImage1}
                              inputState={shopMonthlyFeeState}
                              setInputState={setShopMonthlyFeeState}
                           />
                           :null
                           }   
                     </div>                       
               </div>




               <div className="flex-center-center jc-end jc-start w-100"
               >
                  <button
                     ref={refCancel}
                     onClick={e=>{
                        submitShopPayment(shopMonthlyFeeState)
                     }}
                  >
                     <FaCheck/>
                  </button>  
                  <button
                     //ref={refSubmit}
                     onClick={e=>{
                        setShowShopPayment(false)
                        setShowShopMonthlyFee(false)
                     }}
                  >
                     <FaBan/>
                  </button>
                
               </div>       

            </div>
         </div>

    )
}



const renderBody=()=>{
  return showShopPayment
  ?renderShopPayment()
  :renderShopLogIn()
}

return renderBody()

}
export default ShopPayment;
