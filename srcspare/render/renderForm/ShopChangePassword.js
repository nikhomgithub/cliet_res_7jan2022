import React from 'react';
import {MdVisibility,MdVisibilityOff} from 'react-icons/md';
import {FaBan,FaCheck} from 'react-icons/fa'
import '../Modal.css'

function ShopChangePassword({
    pageData,
    lb,
    setShow,
    submitFunction,
    //submitCancel
}) {


    const [isSecond,setIsSecond]=React.useState(false)

    React.useEffect(()=>{
        //console.log(`isSecond : ${isSecond}`)
        if(!isSecond){
            setIsSecond(true)
        }
    },[isSecond])
    
    
    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก    
    
    const refShopName=React.createRef() //ตกลง
    const refPassword=React.createRef() //ตกลง
    const refNewPassword1=React.createRef() //ตกลง
    const refNewPassword2=React.createRef() //ตกลง

    const [hidePassword,setHidePassword]=React.useState(true)
    let [formInputState,setFormInputState]=React.useState({
        shopName:"",password:"",newPassword1:"",newPassword2:""
    })
  
    React.useEffect(()=>{

        //console.log('formInputState')
        //console.log(formInputState)

    },[formInputState])
    //===================================


  //==============================
  //==============================
  //==============================


  const genInputRef=(i)=>{
    if(i=="shopName"){return refPassword}
    else if(i=="password"){return refPassword}
    else if(i=="newPassword1"){return refNewPassword1}
    else if(i=="newPassword2"){return refNewPassword2}
    else return null
  }


  const goToNextRef=(e,i)=>{
    if(e.key=="Enter"){
        if(i=="shopName"){refPassword.current.focus()}
        if(i=="password"){refNewPassword1.current.focus()}
        if(i=="newPassword1"){refNewPassword2.current.focus()}
        if(i=="newPassword2"){refSubmitForm.current.focus()}
    }
   }

   const changeInputState = (e,i)=>{
        setFormInputState({...formInputState,[i]:e.target.value})
   }

//==============================  
const clearForm=()=>{
    //setFormInputState(blankData)
}
//==============================
/*
name:{lb:"ชื่อร้าน",value:"อร่อยบาร์",active:true},
        address:{lb:"ที่อยู่",value:"123 บางแสน บางโฉลก ลาดยาว กทม",active:true},
        contact:{lb:"ติดต่อ",value:"1234 4567",active:true},
        branch:{lb:"สาขา",value:"สาขาหลัก",active:true},
        other:{lb:"",value:"",active:true},
*/

const genInputType=(i)=>{
    if(i=="shopName"){
        return "text"
    }
    else {
        if(hidePassword){
            return "password"
        }
        else {
            return "text"
        }
    }
}


const renderBody=()=>{
    const objKeys=["shopName","password","newPassword1","newPassword2"]

    return (objKeys.map((i,idx)=>{
        return (
            <div key={idx}
                 className="w-100 flex-center-center jc-start" 
                 style={{marginBottom:"0.2rem"}}>
                
                <div className="w-30">{pageData.shopChangePassword[i]}</div>
                
                <div className="w-70" style={{position:"relative"}}>
                    <input
                        ref={genInputRef(i)}
                        type={genInputType(i)}
                        onChange={e=>{
                            changeInputState(e,i)
                        }}
                        onKeyDown={e=>{goToNextRef(e,i)}}
                        autoComplete={i=="password"||i=="newPassword1"||i=="newPassword2"?"one-time-code":null}
                        autoFocus={i=="shopName"?"autoFocus":null}
                    />
                    
                    {
                        i!="shopName"
                        ? hidePassword
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
                        :null
                    }
                </div>
              
            </div>
        )
    }))
}

//====================
//console.log('ShopChangePassword')
//====================
const renderFooter=()=>{
    return(
    <div style={{display:"flex",position:"fixed",bottom:"1rem",right:"2rem",zIndex:"100"}}
    >
        <div>
            <button
                ref={refSubmitForm}
                onKeyDown={e=>{
                    //if(e.key=="ArrowRight"){
                    //    refCancelForm.current.focus()
                    //}
                }}
                onClick={e=>{
                    if(submitFunction){
                        submitFunction(formInputState)
                    }
                }}
            >
                <FaCheck/>
            </button>
        </div>
        
        <div>
            <button
                ref={refCancelForm}
                onKeyDown={e=>{
                    //if(e.key=="ArrowLeft"){
                    //    refCancelForm.current.focus()
                    //}
                }}
                onClick={e=>{
                    setShow(false)
                }}
            >
                <FaBan/>
            </button>
        </div>

    </div>
    )
}

return (
    <div className="Modal-background">
        <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"70%",minHeight:"100px"}}>
            <div className="Modal-header">
                <div>
                    <h5>{pageData.shopChangePassword.formHead}</h5>
                </div>
                {renderFooter()}
            </div>
            <div className="Modal-body" >
                <div className="ModalInsideBody">
                {
                    renderBody()
                }
                </div>
            </div>
        
        </div>
    </div>
  );
}


ShopChangePassword.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default ShopChangePassword;
