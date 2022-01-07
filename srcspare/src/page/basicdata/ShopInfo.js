import React from 'react';

import {Route,Switch,Redirect} from 'react-router-dom';
import {MdEdit} from 'react-icons/md';
import axios from 'axios'

import axiosUtil from '../../util/axiosUtil'
import ctUtil from '../../util/ctUtil'
import StateUtil from '../../model/StateUtil'
import pageUtil from '../../component/pageComponent/pageUtil'

import ShopChangePassword from '../../render/renderForm/ShopChangePassword'

import BasicValueSetting from '../../render/renderForm/BasicValueSetting'

import BasicValueSetting2 from '../../render/renderForm/BasicValueSetting2'

import AddUser from '../../render/renderForm/AddUser'

import RouteAuth from '../../render/renderForm/RouteAuth'
import Language from '../../render/renderForm/Language'
import PrintPage from '../../render/renderForm/PrintPage'
import WidthLeft from '../../render/renderForm/WidthLeft'
import renderModalError from '../../render/renderModalError'
import ModalTable from './ModalTable'

const {createTableTemplateForPage,convertTableTemplateObjToArray}=ctUtil
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,
    addSingleFileNameInsteadOfPhotoUrl,
    catchErrorToMessage}=axiosUtil
const {genBlankState,genRefAndValue,revRefAndValue,combineLoadDataBlankState}=StateUtil 

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil

function ShopInfo(props) {
const {pageData,basicData,FormTemplate,StateTemplate,
        basicDataTableTemplate,pageDataStandard,languageObj,
        myheader, setReloadBasicData,tableTemplate
    }=props

console.log('shopInfo........')
//console.log(basicData)
//console.log(pageData)

//const {pageData,basicData,FormTemplate,StateTemplate,
//       basicDataTableTemplate,pageDataStandard}=props


//const {shopInfoState} = StateTemplate
//const {shopInfoForm} = FormTemplate

const [inputState,setInputState]=React.useState(null)

const [showShopInfo,setShowShopInfo]=React.useState(false)
const [showShopChangePassword,setShowShopChangePassword]=React.useState(false)
const [showAddUser,setShowAddUser]=React.useState(false)
const [showPrintPage,setShowPrintPage]=React.useState(false)

const [error,setError]=React.useState({
    showModalError:false,
    message:null
})

const [basicValueSetting,setBasicValueSetting]=React.useState({
    key:null,
    show:false,
    lb:null,
    array:null
})

const [basicValueSetting2,setBasicValueSetting2]=React.useState({
    key:null,
    show:false,
    lb:null,
    array:null
})

const [showRouteAuth,setShowRouteAuth]=React.useState(false)
const [showLanguage,setShowLanguage]=React.useState(false)
const [showWidthLeft,setShowWidthLeft]=React.useState(false)
const [showModalTable,setShowModalTable]=React.useState(false)
const [myTableTemplate,setMyTableTemplate]=React.useState(tableTemplate)

const [modalTableState,setModalTableState]=React.useState({
    key:null,
    showModalTable:false,
    pageForm:null,
    tableTemplate:null,
    data:null,
    blankData:null
})

const setShowShopChangePasswordFunc=()=>{
    setShowShopChangePassword(true)
}

const setShowAddUserFunc=()=>{
    setShowAddUser(true)    
}

const setShowPrintPageFunc=()=>{
    setShowPrintPage(true)    
}



const addPrintPage=(filterData)=>{
    const lastIdx=filterData.length-1
    const newId=parseInt(filterData[lastIdx].printId)+1

    let tempArray=filterData
   
    const tempObj={...filterData[0],
        printId:newId,
        printPageName:newId.toString()
    }
    tempArray=[...tempArray,tempObj]

    axios.post('/p35basicdata/updatecustom',
                {id:basicData.id,printPage:tempArray},
                myheader)
    .then(result=>{
        //console.log('result')
        setShowPrintPage(false)
        setReloadBasicData(true)
    })
    .catch(error=>{  
        console.log('error')
        
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })
}


const deletePrintPage=(printId)=>{
    let tempArray=[]
    basicData.printPage.map(i=>{
        if(i.printId!=printId){
            tempArray=[...tempArray,i]
        }
    })

    axios.post('/p35basicdata/updatecustom',
                {id:basicData.id,printPage:tempArray},
                myheader)
    .then(result=>{
        //console.log('result')
        setShowPrintPage(false)
        setReloadBasicData(true)
    })
    .catch(error=>{  
        console.log('error')
        
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })
}

const updatePrintPageFunc=(filterData)=>{
    axios.post('/p35basicdata/updatecustom',
    {   id:basicData.id, printPage:filterData},
    myheader)
    .then(result=>{
    //console.log('result')
    setShowPrintPage(false)
    setReloadBasicData(true)
    })
    .catch(error=>{  
    console.log('error')

    const tempObj={showModalError:true,message:catchErrorToMessage(error)}
    setError(tempObj)  
    })
}

const updatePrintPageFunc2=(pageSetup,filterData)=>{

    console.log('updatePrintPageFunc2')

    const {_id,...remaining}=pageSetup
    let tempObj=remaining
    const temp=["header1","header2","table1","footer1","footer2"]
    temp.map(i=>{
        let tempArray2=[]
        pageSetup[i].map(j=>{
            const {_id,...remaining2}=j
            tempArray2=[...tempArray2,remaining2]
        })
        tempObj={...tempObj,[i]:tempArray2}
    })

    let tempArray=[]
    filterData.map(i=>{
        if(i.printId==pageSetup.printId){
              tempArray=[...tempArray,tempObj]
        }
        else{
            tempArray=[...tempArray,i]
        }
    })

    axios.post('/p35basicdata/updatecustom',
        {id:basicData.id, printPage:tempArray},
        myheader)
    .then(result=>{
        setShowPrintPage(false)
        setReloadBasicData(true)
    })
    .catch(error=>{  
        console.log('error')
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })
}
//======================
const addLanguage=(filterData)=>{
    const lastIdx=filterData.length-1
    const newId=parseInt(filterData[lastIdx].id)+1

    let tempArray=[]
    Object.keys(filterData[0].template).map(i=>{
        const tempObj={key:i,lb:filterData[0].template[i]}
        tempArray=[...tempArray,tempObj]
    })
  
    const tempObj={
        id:newId,
        formLanguage:newId.toString(),
        template:tempArray
    }

    axios.post('/p35formtemplate/addcustom',
                tempObj,
                myheader)
    .then(result=>{
        //console.log('result')
        setShowLanguage(false)
        setReloadBasicData(true)
    })
    .catch(error=>{  
        console.log('error')
        
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })
}
const deleteLanguage=(id)=>{
    //console.log('deleteLan.........')
    axios.post('/p35formtemplate/deletecustom',
        {id:id},
        myheader)
    .then(result=>{
        setShowLanguage(false)
        setReloadBasicData(true)
    })
    .catch(error=>{  
    //console.log('error')
    const tempObj={showModalError:true,message:catchErrorToMessage(error)}
    setError(tempObj)  
    })
}

const updateLanguageSettingFunc=(filterData,arrayOfChange)=>{
    console.log('updateLanguageSettingFunc')
    
    let tempPromise=[]

    if(arrayOfChange){
        if(arrayOfChange.length>0){
       
            arrayOfChange.map(i=>{
                
                filterData.map(j=>{
                    if(i==j.id){
                        const temp=axios.post(`/p35formtemplate/updatecustom`,j,myheader)
                        tempPromise=[...tempPromise,temp]
                    }
                })
                
            })
        }
    }
    
    Promise.all(tempPromise)
    .then(result=>{
        //console.log('result')
        setShowLanguage(false)
        setReloadBasicData(true)
    })
    .catch(error=>{  
        //console.log('error')
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })
    
}
const updateLanguageSettingFunc2=(editData)=>{
    console.log('updateLanguageSettingFunc2')
    
    let tempArray=[]
    Object.keys(editData.template).map(i=>{
        
        const tempObj={
            key:i,
            lb:editData.template[i]
        }
        tempArray=[...tempArray,tempObj]
    })
  
    const tempObj={
        id:editData.id,
        formLanguage:editData.formLanguage,
        template:tempArray
    }

    axios.post(`/p35formtemplate/updatecustom`,tempObj,myheader)    
    .then(result=>{
        //console.log('result')
        setShowLanguage(false)
        setReloadBasicData(true)
    })
    .catch(error=>{  
        //console.log('error')
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })
    
}

const updateAddUserFunc=(inputState)=>{
    console.log('updateAddUserFunc.........')
    axios.post(`/user/adduser`,inputState,myheader)
    .then(result=>{
        //resoladdve(true)
        setShowAddUser(false)
    })
    .catch(error=>{  
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })
}


const updateWidthLeftFunc=(formInputState)=>{
    console.log('updateWidthLeftFunc.........')
    const {id}=basicData
    const temp={id,widthLeft:formInputState.widthLeft}
      
    axios.post(`/p35basicdata/updatecustom`,temp,myheader)
    .then(result=>{
        setReloadBasicData(true)
        setShowWidthLeft(false)
    })
    .catch(error=>{  
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })

}

const updateShopInfoFunc=(inputState)=>{
    console.log('updateShopInforFunc')
    console.log(inputState)

    const {file1,photoUrl1,...remaining}=inputState
    const {id}=basicData
    const tempFormInputState1={id,shopInfo:remaining}
        
    let promise1=axios.post(`/p35basicdata/updatecustom`,tempFormInputState1,myheader)

    let promise2=null

    if(file1){
        const tempFormInputState2=addSingleFileNameInsteadOfPhotoUrl({id,file1,photoUrl1})  

        const fd=genFD({
            inputState:tempFormInputState2,
            template:{
                id:StateTemplate.shopInfoState.id,
                file1:StateTemplate.shopInfoState.file1,
                photoUrl1:StateTemplate.shopInfoState.photoUrl1,
            }
        })

        promise2=axios.post(`/p35basicdata/updatecustom`,fd,myheader)
    }
    else{
        promise1=axios.post(`/p35basicdata/updatecustom`,{...tempFormInputState1,photoUrl1},myheader)
    }

    Promise.all([promise1,promise2])
        .then(result=>{
            setReloadBasicData(true)
            setShowShopInfo(false)
        })
        .catch(error=>{
            const tempObj={showModalError:true,message:catchErrorToMessage(error)}
            setError(tempObj)
            
         })
}


const updateBasicValueSettingFunc=(inputState)=>{
    console.log('updateBasicDataFunc........')
    const tempObj={id:basicData.id,[basicValueSetting.key]:inputState}

    axios.post(`/p35basicdata/updatecustom`,tempObj,myheader)
    .then(result=>{
        console.log('result')
        //resolve(true)
        setReloadBasicData(true)
        setBasicValueSetting({...basicValueSetting,show:false})
    })
    .catch(error=>{  
        console.log('error')
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)
        
    })
    
}

const updateRouteAuthFunc=(routeAuth)=>{
    //console.log('updateRouteAuthFunc')
    //console.log(routeAuth)
    const tempBasicData ={...basicData,routeAuth:routeAuth}
    axios.post(`/p35basicdata/updatecustom`,tempBasicData,myheader)
    .then(result=>{
        //resolve(true)
        setReloadBasicData(true)
        setShowRouteAuth(false)
    })
    .catch(error=>{  
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)
        
    })
}

const updateShopChangePasswordFunc=(inputState)=>{
    axios.post(`/shop/shopchangepassword`,inputState,myheader)
    .then(result=>{
        //resolve(true)
        setShowShopChangePassword(false)
    })
    .catch(error=>{  
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)  
    })
}

const setShowBasicValueSettingFunc=(value)=>{
    setBasicValueSetting({...basicValueSetting,show:value})
}

const setShowBasicValueSettingFunc2=(value)=>{
    setBasicValueSetting2({...basicValueSetting2,show:value})
}


const setShowRouteAuthFunc=()=>{
    setShowRouteAuth(true)
}

const setShowLanguageFunc=()=>{
    setShowLanguage(true)
}


const setShowWidthLeftFunc=()=>{
    setShowWidthLeft(true)
}

const setShowModalErrorFunc=(value)=>{
    setError({...error,showModalError:value})
}

const genArrayFromArrayObj=(Array,key)=>{
    let tempArray=[]
    Array.map(i=>{
        tempArray=[...tempArray,i[key]]
    })
    return tempArray
}

const updateBasicDataFunc=(value)=>{
    console.log('updateBa.............')
    if(value){

        let tempArray=[]

        value.map(i=>{
            const {_id,...remaining}=i
            tempArray=[...tempArray,remaining]
        })

        const tempObj={...basicData,[modalTableState.key]:tempArray}

        axios.post(`/p35basicdata/updatecustom`,tempObj,myheader)
        .then(result=>{
            //resolve(true)
            setReloadBasicData(true)
            setModalTableState({
                key:null,
                showModalTable:false,
                pageForm:null,
                tableTemplate:null,
                data:null,
                blankData:null
            })
            //setBasicValueSetting({...basicValueSetting,show:false})
        })
        .catch(error=>{  
            const tempObj={showModalError:true,message:catchErrorToMessage(error)}
            setError(tempObj)
            
        })
    }
}

const updateBasicValueSettingFunc2=(formInputState,editData)=>{
    console.log('updateBasicValueSettingFunc2')

    console.log(formInputState)
    console.log(editData)

    let tempArray=[]
    if(editData._id){
        formInputState.map(i=>{
            if(editData._id==i._id){
                const {_id,...remaining2}=editData
                tempArray=[...tempArray,remaining2]
            }
            else{
                const {_id,...remaining}=i
                tempArray=[...tempArray,remaining]
            }
        })
    }
    else{
        formInputState.map(i=>{
            const {_id,...remaining}=i
            tempArray=[...tempArray,remaining]
        })
    }

    const tempObj={id:basicData.id,["branch"]:tempArray}

    axios.post(`/p35basicdata/updatecustom`,tempObj,myheader)
    .then(result=>{
        console.log('result')
        setReloadBasicData(true)
        setBasicValueSetting2({
            key:null,
            show:false,
            lb:null,
            array:null
        })
        //setBasicValueSetting({...basicValueSetting,show:false})
    })
    .catch(error=>{  
        console.log('error')
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)
        
    })
    
}

const savePrintTableTemplateFunc=(tableTemplate)=>{
    //console.log('savePrintTableTemplateFunc')
    //console.log(tableTemplate)
    
    let tempObj={}
    Object.keys(tableTemplate).map(i=>{
       const temp={...tableTemplate[i],showColHead:true}
        tempObj={...tempObj,[i]:temp}
    })
    
    const tableName="printTableTemplate"
    saveTableTemplate(tempObj,'p35tabletemplate',tableName,myheader)
}

const saveTableTemplateFunc=(tableTemplate)=>{
    const key=modalTableState.key
    let tableName
    if(key=="reduction"){
        tableName="basicDataReductionTableTemplate"
    }
    if(key=="tax"){
        tableName="basicDataTaxTableTemplate"
    }
    if(key=="transaction"){
        tableName="basicDataTransactionTableTemplate"
    }

    let tempObj={}
    Object.keys(tableTemplate).map(i=>{
       const temp={...tableTemplate[i],showColHead:true}
        tempObj={...tempObj,[i]:temp}
    })
    //console.log(tableTemplate)
    //console.log(tempObj)
    setMyTableTemplate({...myTableTemplate,[tableName]:tempObj})
    saveTableTemplate(tempObj,'p35tabletemplate',tableName,myheader)
}


const tempFunc2=(key,lb,array)=>{
    console.log('tempFunc2')

    if(key=="tax"||key=="reduction"||key=="transaction"){
        let capKey
        let blankData
        if(key=="tax"){
            capKey="Tax"
            blankData={
                taxName:"",
                taxActive:false,
                taxRate:0,
                taxInPercentage:false
            }
        }
        if(key=="reduction"){
            capKey="Reduction"
            blankData={
                reductionName:"",
                reductionActive:false,
                reductionRate:0,
                reductionInPercentage:false
            }
        }
        if(key=="transaction"){
            capKey="Transaction"
            blankData={
                transactionType:"",    
                effectStock:"unChange",// กระทบสต็อก
                effectSpending:"unChange",// กระทบจอง
                effectCustomerPoint:"unChange",//  กระทบแผน
            }
        }
 
        setModalTableState({
            key:key,
            showModalTable:true,
            pageForm:pageData[`${key}Form`],
            tableTemplate:myTableTemplate[`basicData${capKey}TableTemplate`],
            data:basicData[key],
            blankData:blankData,
        })
    }
    else if(key=="branch"){
        setBasicValueSetting2({
            key:key,
            show:true,
            lb:lb,
            array:basicData.branch
        })
    }
    else {
        setBasicValueSetting({
            key:key,
            show:true,
            lb:lb,
            array:array
        })
    }
}

const renderSettingLine=(lb,func)=>{
    return (
        <div style={{display:"flex"}}>   
            <div>{lb}</div>
            
            <MdEdit className="sm-icon" style={{marginLeft:"0rem"}}
                onClick={()=>func()}
            />
        </div>
    )
}

const renderSetting=()=>{
    const {formHead,changePassword,addNewUser,routeAuth,language,printPage,widthLeft} = pageData.setting
    return(
        <div className="w-100"
        style={{
                marginBottom:"0.5rem",
                padding:"0.5rem"
        }}>
            <div className="w-100 bd-pureWhite"  style={{padding:"0.5rem"}}>
                <h5>{formHead}</h5>
    
                {renderSettingLine(changePassword,setShowShopChangePasswordFunc)}
                {renderSettingLine(addNewUser,setShowAddUserFunc)}
                {renderSettingLine(routeAuth,setShowRouteAuthFunc)}
                {renderSettingLine(language,setShowLanguageFunc)}
                {renderSettingLine(printPage,setShowPrintPageFunc)}

                {
                //renderSettingLine(widthLeft,setShowWidthLeftFunc)
                }

            </div>
        </div>
    )   
}


const renderBasicValueLine=(key,func,array)=>{

    const lb=pageData.basicValue[key]

    return(
        <div className="xc6 sc12" style={{margin:"0.2rem 0"}}>
            <div style={{display:"flex",width:"100%"}}>   
                <div className="w-35">{lb}</div>
                
                <div className="w-50">
                    <select>
                        {
                        array.map((i,idx)=><option key={idx}>{i}</option>)
                        }

                    </select>
                </div>
                
                <MdEdit className="sm-icon" style={{marginLeft:"0rem"}}
                    onClick={()=>func(key,lb,array)}
                />
            </div>
        </div>
    )
    
}

const renderBasicValue=()=>{

    return(
        <div className="w-100"
        style={{
                marginBottom:"0.5rem",
                padding:"0.5rem"
        }}>
            <div className="w-100 bd-pureWhite"
                 style={{padding:"0.5rem"}}
            >
                <div  
                    >
                    <h5>{pageData.basicValue.formHead}</h5>
                </div>
                <div className="flex-center-center jc-start">
                    
                    {renderBasicValueLine("title",tempFunc2,basicData.title)}
                    {renderBasicValueLine("unit",tempFunc2,basicData.unit)}
                    {renderBasicValueLine("userLevel",tempFunc2,basicData.userLevel)}

                    
                    {
                        //renderBasicValueLine("transactionStatus",tempFunc2,basicData.transactionStatus)
                    }
                    {
                        //renderBasicValueLine("jobStatus",tempFunc2,basicData.jobStatus)
                    }

                    {
                        //renderBasicValueLine("tableStatus",tempFunc2,basicData.tableStatus)
                    }
                    {renderBasicValueLine("partnerType",tempFunc2,basicData.partnerType)}
                    {renderBasicValueLine("paymentType",tempFunc2,basicData.paymentType)} 

                    {
                    //renderBasicValueLine("branch",tempFunc2,genArrayFromArrayObj(basicData.branch,"branchName"))
                    }
                    {renderBasicValueLine("tax",tempFunc2,genArrayFromArrayObj(basicData.tax,"taxName"))}
                    {renderBasicValueLine("reduction",tempFunc2,genArrayFromArrayObj(basicData.reduction,"reductionName"))}
                    {renderBasicValueLine("transaction",tempFunc2,genArrayFromArrayObj(basicData.transaction,"transactionType"))}

                </div>
            </div>
        </div>
        
    )
}


return(
<div className="w-100 h-100" style={{overflowY:"auto"}} >

    {
    pageData&&renderSetting()
    }

    {
    pageData&&renderBasicValue()
    }

    {showPrintPage&&basicData.printPage
    ?<PrintPage
        pageData={pageData}
        submitFunction={updatePrintPageFunc}
        submitFunction2={updatePrintPageFunc2}
        setShow={(value)=>setShowPrintPage(value)}
        printPage={basicData.printPage}
        basicData={basicData}
        addPrintPage={addPrintPage}
        deletePrintPage={deletePrintPage}
        tableTemplate={tableTemplate}
        saveTableTemplateFunc={savePrintTableTemplateFunc}
    />
    :null
    }
    {
     showShopChangePassword
     ?<ShopChangePassword
        pageData={pageData}
        setShow={setShowShopChangePassword}
        submitFunction={updateShopChangePasswordFunc}
    />
     :null
    }

    {
     showAddUser
     ?<AddUser
        pageData={pageData}
        basicData={basicData}
        tableTemplate={tableTemplate}
        myheader={myheader}
        setShow={setShowAddUser}
        submitFunction={updateAddUserFunc}
    />
     :null
    }

    {
    basicValueSetting.show
    ?<BasicValueSetting
        pageData={pageData}
        basicData={basicData}
        basicValueSetting={basicValueSetting}
        setShow={setShowBasicValueSettingFunc}
        submitFunction={updateBasicValueSettingFunc}
    />
    :null
    }

    {
    basicValueSetting2.show
    ?<BasicValueSetting2
        pageData={pageData}
        basicData={basicData}
        basicValueSetting={basicValueSetting2}
        setShow={setShowBasicValueSettingFunc2}
        submitFunction={updateBasicValueSettingFunc2}
    />
    :null
    }
    
    {
    showRouteAuth
    ?<RouteAuth
        pageData={pageData}
        basicData={basicData}
        setShow={setShowRouteAuth}
        submitFunction={updateRouteAuthFunc}
        basicDataTableTemplate={basicDataTableTemplate}
    />
    :null
    }

    {
     showLanguage
     ?<Language
        pageData={pageData}
        basicData={basicData}
        setShow={setShowLanguage}
        submitFunction={updateLanguageSettingFunc}
        submitFunction2={updateLanguageSettingFunc2}

        myheader={myheader}
        languageObj={languageObj}
        addLanguage={addLanguage}
        deleteLanguage={deleteLanguage}
     />
     :null   
    }

    {modalTableState.showModalTable
    ?<ModalTable
        modalTableState={modalTableState}
        submitFunc={updateBasicDataFunc}
        cancelFunc={(value)=>setModalTableState({...modalTableState,showModalTable:value})}
        basicData={basicData}
        saveTableTemplateFunc={saveTableTemplateFunc}
        pageData={pageData}
    />
    :null
    }

    {  
    error.showModalError
    ?renderModalError({
        setShow:setShowModalErrorFunc,
        message:error.message
    })
    :null
    }
</div>
)
}
export default ShopInfo;

/*
          
  





*/