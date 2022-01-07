import React from 'react';

import GallerySinglePhoto_add from '../../component/galleryone_add/GallerySinglePhoto_add'
import photoUtil from '../../component/galleryone_add/photoUtil'

import {FaPlusSquare,FaMinusSquare,FaCheck,FaBan} from 'react-icons/fa';

import '../Modal.css'

function ShopInfoModalForm({
    lb,
    basicData,
    shopInfo,
    keyName,
    setShow,
    submitFunction,
    
    //submitCancel
}) {
    console.log('ShopInfoModalForm....')
    //console.log(basicData)
    //console.log(branchSettingPage)

    const {changeArrayFile}=photoUtil

    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก     

    let [formInputState,setFormInputState]=React.useState(basicData)
  
    React.useEffect(()=>{
        console.log('formInputState')
        console.log(formInputState)
    },[formInputState])

    const getRefArray=(array)=>{
        let tempRefArray=[]
    
        if(Array){
            if(Array.isArray(array)){
                array.map(k=>{
                    tempRefArray=[...tempRefArray,React.createRef()]
                })
            }
        }
        
        return tempRefArray
    }
    
    const [refOfInputState,setRefOfInputState]=React.useState(
                                                getRefArray(formInputState.shopInfo)
                                            )
    //===================================

  //==============================
  //==============================
  //==============================
  //image
  // 1 = photoUrl1
  // 2 = photoUrl1 , photoUrl2
  
  //---------------
  //We limiet only 2 image which is photoUrl1,photoUrl2 perform
  //image1
  
  const [showImage1,setShowImage1]=React.useState(true)
  const [arrayFile1,setArrayFile1]=React.useState([])
  const [fileUrl1,setFileUrl1]=React.useState([])

  React.useEffect(()=>{
    console.log('fileUrl1')
    console.log(fileUrl1)
  },[fileUrl1])

  const changeInputState=(e,idx)=>{
    const {shopInfo}=formInputState

    let tempArray=[]
    shopInfo.map((i,idx2)=>{
        if(idx==idx2){
            tempArray=[...tempArray,e.target.value]
        }else {
            tempArray=[...tempArray,i]
        }
    })

    //let tempObj = {...shopInfo,[i]:e.target.value}
    setFormInputState({...formInputState,["shopInfo"]:tempArray})
  }


  const addRow=(idx)=>{
    const {shopInfo}=formInputState

    let tempArray=[]
    shopInfo.map((i,idx2)=>{
        if(idx==idx2){
            tempArray=[...tempArray,i,""]
        }
        else{
            tempArray=[...tempArray,i]
        }
    })

    setRefOfInputState(getRefArray(tempArray))
    setFormInputState({...formInputState,["shopInfo"]:tempArray})
  }

  const deleteRow=(idx)=>{
    const {shopInfo}=formInputState

    let tempArray=[]
    shopInfo.map((i,idx2)=>{
        if(idx!=idx2){
            tempArray=[...tempArray,i]
        }
    })

    setRefOfInputState(getRefArray(tempArray))
    setFormInputState({...formInputState,["shopInfo"]:tempArray})
  }


  React.useEffect(()=>{
    console.log('useEffect ArrayFile1')
    console.log(arrayFile1)
    
    if(keyName){
        if(keyName[0]=="photoUrl1"){
            
            changeArrayFile({ arrayFile:arrayFile1,
                fileUrl:fileUrl1,
                setFileUrl:setFileUrl1,
                inputState:formInputState,
                setInputState:setFormInputState,
                keyName:keyName[0],
                //fileName,
                //serverFolder,
                //fileName:"file",
                //serverFolder:"/upload/customer",
                setShowImage:setShowImage1})
            
        }
    }
    
  },[arrayFile1])
  //----------------

//==============================  
//==============================
/*
name:{lb:"ชื่อร้าน",value:"อร่อยบาร์",active:true},
        address:{lb:"ที่อยู่",value:"123 บางแสน บางโฉลก ลาดยาว กทม",active:true},
        contact:{lb:"ติดต่อ",value:"1234 4567",active:true},
        branch:{lb:"สาขา",value:"สาขาหลัก",active:true},
        other:{lb:"",value:"",active:true},
*/

/*
const renderBody=()=>{
    const objKeys=["nameOfShop","address","contact","branch","other"]

    return (objKeys.map((i,idx)=>{
        return (
            <div className="w-100 flex-center-center jc-start" style={{marginBottom:"0.2rem"}}>
   
                <div className="w-10">
                    <div className="flex-center-center">
                        <input type="checkbox"
                            checked={formInputState[`${i}Active`]}
                            //ref={ref}
                            onChange={e=>{
                                changeCheckBox(e,i)
                            }}
                        />
                    </div>
                </div>
                <div className="w-20">{pageData.shopInfo[i]}</div>
                <div className="w-70">
                    <input type="text"
                        value={formInputState[i]}
                        ref={genInputRef(i)}
                        onChange={e=>{
                            changeInputState(e,i)
                        }}
                        onKeyDown={e=>{goToNextRef(e,i)}}
                        autoFocus={i=="nameOfShop"?"autoFocus":null}
                    />
                </div>
            </div>
        )
    }))
}
*/
//====================
const renderBody=()=>{
    return formInputState.shopInfo.map((i,idx)=>(
    <div className="flex-center-center" key={idx}>
        <div className="w-10">
            <FaPlusSquare className="sm-icon"
                onClick={e=>{
                    addRow(idx)
                }}
            />
        </div>
        <div className="w-10">
            {idx>0
            ?<FaMinusSquare className="sm-icon"
                onClick={e=>{
                    deleteRow(idx)
                }}
            />
            :null
            }
        </div>
        <div className="w-80">
            <input
                type="text"
                ref={refOfInputState[idx]}
                value={i}

                onKeyDown={e=>{
                    if(e.key=="Enter"){
                        if(formInputState.shopInfo){
                            if(idx==formInputState.shopInfo.length-1){
                                refSubmitForm.current.focus()
                            }
                            else{
                                refOfInputState[idx+1].current.focus()
                            }

                        }   
                    }
                }}

                onChange={e=>{
                    changeInputState(e,idx)
                }}
            />
        </div>
    </div>

    ))  
}

//====================
//console.log('ShopInfoModalForm')
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
                        //refCancelForm.current.focus()
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
                     //   refCancelForm.current.focus()
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
                    <h5>{shopInfo.formHead}</h5>
                </div>
                {
                    renderFooter()
                }
            </div>
            <div className="Modal-body" >
                <div className="ModalInsideBody">
                {
                    renderBody()
                }
                </div>
            </div>
          
            <div className="xc12 form-row h-100"
                  style={{justifyContent:"space-around"}}>
                   <div className="xc4 sc10 bgc-darkGray bd-lightGray h-100">
                        {
                        showImage1
                        ?<GallerySinglePhoto_add 
                            fileUrl={fileUrl1}
                            arrayFile={arrayFile1}
                            setArrayFile={setArrayFile1}
                            keyName={keyName[0]}

                            setShowImage={setShowImage1}
                            inputState={formInputState}
                            setInputState={setFormInputState}
                        />
                        :null
                        }   
                    </div>                       
            </div>
         
        </div>
    </div>
  );
}


ShopInfoModalForm.defaultProps={
    lb:"Form",
    loadData:null,
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default ShopInfoModalForm;
