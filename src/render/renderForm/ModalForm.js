import React from 'react';
import StateUtil from '../../model/StateUtil'
import renderForm from './renderForm'
import GallerySinglePhoto_add from '../../component/galleryone_add/GallerySinglePhoto_add'
import photoUtil from '../../component/galleryone_add/photoUtil'
import formUtil from './formUtil'
import tableUtil from '../../component/table/tableUtil'
import uuid from 'react-uuid'

import axiosUtil from '../../util/axiosUtil'
import '../Modal.css'

function ModalForm({
    lb,
    formTemplate,stateTemplate,
    selectData,

    iconAction,
    iconActionData,
    iconActionDataDetail,
    loadData,
    keyName,
    setShow,

    calculation,
    detailTableTemplate,

    submitFunction,
    selectGroup,
    selectProduct,
    pageDataModalForm,
    dataUrl,myheader
    //submitCancel
}) {
    //console.log('ModalForm')
    const {genBlankState,genRefAndValue,revRefAndValue,combineLoadDataBlankState}=StateUtil  
    const {submitFunc}=axiosUtil  
    const {changeArrayFile}=photoUtil
    const {convertFormTemplateToTableTemplate}=formUtil
    const {tableResize}=tableUtil

    const [isSecond,setIsSecond]=React.useState(false)

    React.useEffect(()=>{
        //console.log(`isSecond : ${isSecond}`)
        if(!isSecond){
            setIsSecond(true)
        }
    },[isSecond])
    
      
    const [hidePassword,setHidePassword]=React.useState(true)

    const [calculate,setCalculate]=React.useState(true)


    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก     
    //const refClearForm=React.createRef() //ล้างข้อมูล     

    const blankData=genBlankState({template:stateTemplate}).state
    const refAndValueBlankData = genRefAndValue({template:formTemplate,FData:blankData})

    const genFormInputState =() =>{
        /*
        if(isAddForm){

            if(genAutoId){
                return {...blankData,id:lastRecordId+1}
            }
            else{
                return blankData
            }
        }
        */
        if(loadData){
            //we create combineLoadDataBlankState function
            //to make sure that every filed is valid at least ""
            //because in mongoDB if model type = number, it we send "" it will be save as null
            //when we receive data back it will be just like customerId=null
            //so this function will make customerId="" again
            //const temp=loadData //test
            let temp=combineLoadDataBlankState({template:stateTemplate,loadData})
            if(temp.newId>=0){
                temp={...temp,newId:temp.id}
            }
            //console.log('temp..............')
            //console.log(temp)
            return temp
        }
        else{
            return blankData
        }
    }
    
    let [formInputState,setFormInputState]=React.useState(genFormInputState())
    let [sumAmount,setSumAmount]=React.useState(null)

    
    React.useEffect(()=>{
    if(isSecond){
        //console.log('useEffect iconActionData')
        if(iconActionData){
            setFormInputState({...formInputState,...iconActionData})
        }
    }
    },[iconActionData])
    
    React.useEffect(()=>{
    if(isSecond){
        //console.log('useEffect iconActionDataDetail')

        if(iconActionDataDetail&&selectRow){
            if(iconActionDataDetail.id>0){

                let temp=[]
                formInputState.detail.map((i,index)=>{
                    if(selectRow.index==index){
                       const tempLine={...i,...iconActionDataDetail}
                       temp=[...temp,tempLine] 
                    }
                    else{
                        temp=[...temp,i]
                    }
                })

                setFormInputState({...formInputState,["detail"]:temp})
            }
        }
        
    }
    },[iconActionDataDetail])

    let [refAndValue,setRefAndValue]=React.useState(
        genRefAndValue({template:formTemplate,FData:formInputState})
    )
    

    React.useEffect(()=>{

    if(isSecond){
        //console.log('useEffect formInputState')
        
        let passCheck=false
        
        if(formInputState){
            if(formInputState.detail){
                passCheck=true
            }
        }

        if(tableTemplate){
           passCheck=true
        }

        if(passCheck){
            const objKeys=Object.keys(tableTemplate)
            let newSum={}
            let showSum=false

            objKeys.map(h=>{
                if(tableTemplate[h]){
                    if(tableTemplate[h].showSum){
                        newSum={...newSum,[h]:0}
                        showSum=true
                    }
                }
            })


            formInputState.detail.map((i,idx)=>{

                objKeys.map(j=>{
                    if(tableTemplate[j]){
                        
                        if(tableTemplate[j].showSum){
                            const updateSum=newSum[j]+parseInt(i[j]*10000)

                            if(idx==formInputState.detail.length-1){
                                newSum={...newSum,[j]:updateSum/10000}
                            }
                            else{
                                newSum={...newSum,[j]:updateSum}

                            }
                        }
                    }
                })
            })

            //console.log('newSum')
            //console.log(newSum)


            if(showSum){

                setSumAmount(newSum)
            }
        }
        
        const temp=genRefAndValue({
            template:formTemplate,
            FData:formInputState
            })

        setRefAndValue({...temp})
        
        if(calculation){
            if(calculate){
                setFormInputState(calculation(formInputState))
                setCalculate(false)
            }
        }
       

        console.log('formInputState....................')
        console.log(formInputState)
    
    }
    },[formInputState])
  //===================================
  //===================================
  //===================================
  //for tableForm
  let [showTable,setShowTable]=React.useState({
    width:1200,
    gridCol:""
  })
  

  const [tableTemplate,setTableTemplate]=React.useState(detailTableTemplate)
        //convertFormTemplateToTableTemplate(formTemplate,detailTableTemplate))
  
  React.useEffect(()=>{
  //if(isSecond){

    tableResize({tableTemplate,showTable,setShowTable})
    
  //}
  },[tableTemplate])

  const [selectRow,setSelectRow]=React.useState(null)

  React.useEffect(()=>{
    if(isSecond){
        //console.log(`selectRow : ${selectRow}`)
    }
   },[selectRow])

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
  if(isSecond){
    //console.log('useEffect ArrayFile1')

    
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
    
  }
  },[arrayFile1])
  //----------------
  //image1
  const [showImage2,setShowImage2]=React.useState(true)
  const [arrayFile2,setArrayFile2]=React.useState([])
  const [fileUrl2,setFileUrl2]=React.useState([])


  React.useEffect(()=>{
  if(isSecond){
    //console.log('useEffect ArrayFile2')

    if(keyName){
        if(keyName[1]=="photoUrl2"){
            changeArrayFile({ arrayFile:arrayFile2,
                fileUrl:fileUrl2,
                setFileUrl:setFileUrl2,
                inputState:formInputState,
                setInputState:setFormInputState,
                keyName:keyName[1],
                //fileName,
                //serverFolder,
                //fileName:"file",
                //serverFolder:"/upload/customer",
                setShowImage:setShowImage2})
        }
    }

   }
  },[arrayFile2])

//==============================  
const clearForm=()=>{
    setFormInputState(blankData)
}
//==============================
//==============================
//Table
//==============================
//==============================
const [editData,setEditData]=React.useState(null)

const updateFilterData=(idx,inputState)=>{
    console.log('updateFilterData')

    let tempArray=[]

    formInputState.detail.map((i,index)=>{
        if(idx==index){
            tempArray=[...tempArray,inputState]
        }
        else{
            tempArray=[...tempArray,i]
        }
    })
    
    //console.log(tempArray)
    setFormInputState({...formInputState,detail:tempArray})

}
//แทรกบน
const insertUp=()=>{
    console.log('insertUp.......blankData')
    console.log(blankData)

    if(formInputState.detail){
        if(editData){
            let tempFilterDataData0=[]
            //let tIdx=0
            let tempEditData=null
            formInputState.detail.map((i,idx)=>{
                //console.log("xxx")
                if(editData._id==i._id){
                    const temp={...blankData.detail[0],_id:uuid(),selectedLine:false,result:0} //empty line
                    tempFilterDataData0=[...tempFilterDataData0,temp,i]
                }
                else{
                    tempFilterDataData0=[...tempFilterDataData0,i]
                }
            })
            setFormInputState({...formInputState,
                detail:tempFilterDataData0,
            })
        }
    }
}
//แทรกล่าง
const insertDown=()=>{
    console.log('insertDown')

     //console.log('insertDown')

     if(formInputState.detail){
        if(editData){
            let tempFilterDataData0=[]
            //let tIdx=0  
            let tempEditData=null
            formInputState.detail.map((i,idx)=>{
                if(editData._id==i._id){

                    const temp={...blankData.detail[0],_id:uuid(),selectedLine:false,result:0} //empty line
                    tempFilterDataData0=[...tempFilterDataData0,i,temp]
                    tempEditData=i
                }
                else{
                    tempFilterDataData0=[...tempFilterDataData0,i]
                }
            })

            
            setFormInputState({...formInputState,
                detail:tempFilterDataData0,
            })
            
            //setFilterData({...filterData,data0:tempFilterDataData0,editData:tempEditData})
        }
    }

}
//เลือกทั้งหมด
const selectAll=()=>{
    console.log('selectAll')

    if(formInputState.detail){
        let tempArray=[]
        formInputState.detail.map(i=>{
            tempArray=[...tempArray,{...i,selectedLine:true}]
            
        })
        setFormInputState({...formInputState,detail:tempArray})
        setEditData(null)
        //setFilterData({...filterData,data0:tempArray})
    }
}
//ยกเลิกเลือก
const unSelectAll=()=>{
    console.log('unSelectAll')
        //console.log(data0)        
    if(formInputState.detail){
        let tempArray=[]
        //let idx=0
        formInputState.detail.map(i=>{
          
            tempArray=[...tempArray,{...i,selectedLine:false}]
            //tempArray=[...tempArray,{...i,tempIndex:idx,selectedLine:false}]
            //idx=idx+1
           
        })
        
        setFormInputState({...formInputState,detail:tempArray})
        setEditData(null)
    }
}
//ลบ
const deleteLine=()=>{
    console.log('deleteLine')

    //console.log(data0)        
    if(formInputState.detail){
        let tempArray=[]
        //let idx=0
        formInputState.detail.map(i=>{
            if(!i.selectedLine){
                tempArray=[...tempArray,{...i,selectedLine:false}]
                //tempArray=[...tempArray,{...i,tempIndex:idx,selectedLine:false}]
                //idx=idx+1
            }
        })
        
        setFormInputState({...formInputState,detail:tempArray})
        setEditData(null)
    }

}
//นำเข้า
const getSelectAll=()=>{
    console.log('getSelectAll')

    if(formInputState.detail){
        let tempNewSelectAll=[]

        if(selectProduct){
            selectProduct.map(i=>{
                if(i.selectedLine){
                    tempNewSelectAll=[...tempNewSelectAll,{...i,quantity:0,result:0}
                    ]
                }
            })
        
            //console.log(tempNewSelectAll)
            setFormInputState({...formInputState,
                detail:[...formInputState.detail,...tempNewSelectAll]
            })
            //console.log('getSelectAll')
            //console.log(myFilterData)
        }

    }
}
//เลื่อนลงล่าง
const moveSelectedDown=()=>{
    console.log('moveSelectedDown')

    if(formInputState.detail) {
        let beforeEditData=true
        let beforeArray = []
        let afterArray = []
        let selectedArray = []

        formInputState.detail.map(i=>{
            //1,2 beforeArray
            //5 editData
            //3,4,7,8 selectedArray
            //6,9,10 afterArray

            if(editData._id==i._id){
                beforeEditData=false
            }
            else if( (i.selectedLine==false)&&(beforeEditData==true) ){
                beforeArray=[...beforeArray,i]
            }
            else if( (i.selectedLine==false)&&(beforeEditData==false) ){
                afterArray=[...afterArray,i]
            } 
            else {
                selectedArray=[...selectedArray,i]
            }
        })
        const tempArray=[...beforeArray,editData,...selectedArray,...afterArray]
        
        setFormInputState({...formInputState,detail:tempArray})
    }

}
//เลื่อนขึ้นบน
const moveSelectedUp=()=>{
    console.log('moveSelectedUp')

    //console.log(editData)
    //console.log(formInputState.detail)


    if(formInputState.detail){

        let beforeEditData=true
        let beforeArray = []
        let afterArray = []
        let selectedArray = []

        formInputState.detail.map(i=>{
            //1,2 beforeArray
            //5 editData
            //3,4,7,8 selectedArray
            //6,9,10 afterArray

            if(editData._id==i._id){
                beforeEditData=false
            }
            else if( (i.selectedLine==false)&&(beforeEditData==true) ){
                beforeArray=[...beforeArray,i]
            }
            else if( (i.selectedLine==false)&&(beforeEditData==false) ){
                afterArray=[...afterArray,i]
            } 
            else {
                selectedArray=[...selectedArray,i]
            }
        })
        const tempArray=[...beforeArray,...selectedArray,editData,...afterArray]
        
        setFormInputState({...formInputState,detail:tempArray})

    }
}
//ค้นหาด้วย id
const findProductIdByKeyDown=()=>{
    console.log('findProductIdByKeyDown')
}
//ค้นหาด้วย Barcode
const findBarcodeByKeyDown=()=>{
    console.log('findBarcodeByKeyDown')
}












//====================
//console.log('ModalForm')
//====================
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
        {/*        
        <div>
            <button
                ref={refClearForm}
                onKeyDown={e=>{
                    if(e.key=="ArrowRight"){
                        refCancelForm.current.focus()
                    }
                    if(e.key=="ArrowLeft"){
                        refSubmitForm.current.focus()
                    }
                }}
                onClick={e=>{
                    clearForm();
                }}

            >
                ล้างข้อมูล
            </button>
        </div>
        */}
        
        <div>
            <button
                ref={refCancelForm}
                onKeyDown={e=>{
                    if(e.key=="ArrowLeft"){
                        refCancelForm.current.focus()
                    }
                }}
                onClick={e=>{
                    //if(submitCancel){
                    //    submitCancel()
                    //}
                    clearForm()
                    setShow(false)
                }}
            >Cancel</button>
        </div>

    </div>
    )
}

return (
    <div className="Modal-background">
        <div className="Modal-box" style={{paddingBottom:"7rem"}}>
            <div className="Modal-header">

                <div>
                    <h1>{lb}</h1>
                </div>
                {renderFooter()}
            </div>
            <div className="Modal-body" >
                <div className="ModalInsideBody">
                {
                 renderForm({
                    cName:"form-row flex-justify-start flex-align-stretch bd-green",
                    template:formTemplate,
                    ref1:refSubmitForm,
                    iconAction,
                    refAndValue, //origin dont have ModalRefAndValue
                    setRefAndValue, //Origin dont have ModalRefAndValue
                    loadData:formInputState,
                    setLoadData:setFormInputState,
                    selectData,
                    //basicData:basicData,
                    blankData,
                    refAndValueBlankData,
                    hidePassword,setHidePassword,

                    tableTemplate,setTableTemplate,
                    showTable,setShowTable,
                    selectRow,setSelectRow,
                    setCalculate,
                    sumAmount,
                    selectGroup,
                    selectProduct,
                    updateFilterData,
                    editData,setEditData,

                    updateFilterData,
                    insertUp,
                    insertDown,
                    selectAll,
                    unSelectAll,
                    deleteLine,
                    getSelectAll,
                    moveSelectedDown,moveSelectedUp,
                    findProductIdByKeyDown,
                    findBarcodeByKeyDown,
                    calDigit:100,
                    pageDataModalForm,
                    dataUrl,myheader
                 })
                 
                }
                </div>
            </div>

            {
            keyName
            ?<div className="xc12 form-row h-100"
                  style={{justifyContent:"space-around"}}>
                    {  
                    keyName[0]=="photoUrl1"
                    ?<div className="xc4 sc10 bgc-darkGray bd-lightGray h-100">
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
                    :null
                    }
                    {
                    keyName[1]=="photoUrl2"
                    ?<div className="xc4 sc10 bgc-darkGray bd-lightGray h-100">
                        {
                        showImage2
                        ?<GallerySinglePhoto_add 
                            fileUrl={fileUrl2}
                            arrayFile={arrayFile2}
                            setArrayFile={setArrayFile2}
                            keyName={keyName[1]}

                            setShowImage={setShowImage2}
                            inputState={formInputState}
                            setInputState={setFormInputState}
                        />
                        :null
                        }   
                    </div>    
                    :null
                    }
            </div>
            :null
            }
        </div>
    </div>
  );
}


ModalForm.defaultProps={
    lb:"Form",
    formTemplate:{},
    stateTemplate:{},
    selectData:{},

    iconAction:null,
    iconActionData:{},
    iconActionDataDetail:{},
    loadData:null,
    keyName:null,
    setShow:()=>{},

    calculation:null,
    detailTableTemplate:null,

    submitFunction:null,
    //submitCancel:null,
    selectGroup:null,
    selectProduct:[],
    modalFormTemplate:{
       insertUp:"Insert Up",
       insertDown:"Insert Down",
       selectAll:"Select All",
       unSelectAll:"Unselect All",
       moveUp:"Move Up",
       moveDown:"Move Down",
       delete:"Delete",
       import:"Import",
       selectImage:"Select Image",
    }
}


export default ModalForm;
