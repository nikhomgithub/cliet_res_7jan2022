import React from 'react';
import axios from 'axios'
//import {MainContext} from '../../context/MainContext'
import uuid from 'react-uuid'
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'
import pageUtil from './pageUtil'
//import NewGroupComponent from '../../render/renderTree/NewGroupComponent'
import axiosUtil from '../../util/axiosUtil'
import Table from '../../component/table/Table'
import renderWidthRangeBar from '../../component/table/renderWidthRangeBar'
import renderBadge from '../../render/renderBadge/renderBadge'
import renderModalError from '../../render/renderModalError'
import ModalConfirm from '../../render/ModalConfirm'
//import ModalForm from '../../render/renderForm/ModalForm'
//import NewTree from '../../component/newtree/NewTree'
import NewGroup from '../newgroup/NewGroup';
import PageForm from '../../render/renderForm/PageForm'
import ModalCsv from './ModalCsv'
import BillForm from '../../page/bill/BillForm'
import renderTransactionConfirm from '../../page/bill/renderTransactionConfirm';
import {FaChair,FaRegFolderOpen,FaRegMoneyBillAlt,FaRegArrowAltCircleRight,FaMoneyBill} from 'react-icons/fa'
import {MdFastfood,MdPeople,MdPerson,MdClose} from 'react-icons/md'
import renderCustomerConfirm from '../../page/bill/renderCustomerConfirm';
import data from '../../page/bill/data';
import Ticon from '../../component/ticon/Ticon'

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil

function PageComponentTransaction(props) {

console.log('PageComponentTransaction')
//const {basicDataSt,tokenSt,setReloadCheckToken,myheader}=React.useContext(MainContext)

const {filterDataTemplate,filterDataTemplate2,filterDataTemplate3,filterDataTemplate4,
      pageFilter,pageFilterForm,...remaining}=props

const {filterTitle,inputState,filterTemplate,myheader,basicDataSt,
      formTemplate,editFormTemplate,stateTemplate,
      groupFormTemplate,groupEditFormTemplate,
      pageDataModalForm,
      addFormTitle,
      editFormTitle,
      groupAddFormTitle,
      groupEditFormTitle,

      rawMatFilterTemplate,
      rawMatInputState,
      rawMatPageFilterForm,

      partnerFilterTemplate,
      partnerInputState,
      partnerFilterForm,

      calDigit,
      setReloadBasicData
}=props

const {basicData,pageData,tableTemplate,reloadBasicData}=basicDataSt

const [billTableTemplate,setBillTableTemplate]=React.useState(null)

React.useEffect(()=>{
    if(tableTemplate){    
        setBillTableTemplate(tableTemplate.productDetailTableTemplateForForm)
    }
},[basicDataSt])


let [filterData,setFilterData]=React.useState({
    ...filterDataTemplate,...remaining,
    tableTemplate:
    filterDataTemplate.tableTemplateName
    ?tableTemplate[filterDataTemplate.tableTemplateName]
    :null,
    detailTableTemplate:filterDataTemplate.detailTableTemplateName?tableTemplate[filterDataTemplate.detailTableTemplateName]:null,
    detailTableTemplateForForm:filterDataTemplate.detailTableTemplateForFormName?tableTemplate[filterDataTemplate.detailTableTemplateForFormName]:null,
    widthLeft:basicData.widthLeft,
    limitRow:basicData.limitRow,
    badgeColor:"#72a2d9"
})

const genFilterData2=()=>{
        return {
            ...filterDataTemplate2,
            
            tableTemplate:
            filterDataTemplate2.tableTemplateName
            ?tableTemplate[filterDataTemplate2.tableTemplateName]
            :null,
        }
    
}

let [filterData2,setFilterData2]=React.useState(genFilterData2())

const genFilterData4=()=>{
    console.log('genFilterData4')

    let tempSelectedLine=tableTemplate[filterDataTemplate4.tableTemplateName].selectedLine
    tempSelectedLine={...tempSelectedLine,showCol:false}

    const tempTableTemplate={...tableTemplate[filterDataTemplate4.tableTemplateName],
                                selectedLine:tempSelectedLine
                            }


    return {
        ...filterDataTemplate4,
        tableTemplate:tempTableTemplate   
    }
}

let [filterData4,setFilterData4]=React.useState(genFilterData4())


React.useEffect(()=>{
     //console.log('filterData PageComponent')
     //console.log(filterData)
    if(filterData.reloadData){
        const {dataUrl,pageNumber,limitRow,sort,qry}=filterData
    
        axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
        .then(result=>{
            //console.log(`result...${dataUrl}/getlimit`)
            //console.log(result)
            const temp2= genFilterDataWithIndex(result.data.data,filterData.selectProduct)
            //console.log('temp2.....')
            //console.log(temp2)
            const tempResult={...filterData,
                data0:temp2,
                count:result.data.count,
                lastRecordId:result.data.lastRecordId,
                reloadData:false
            }
            setFilterData(tempResult)
        })
        .catch(error=>{
            const tempError={...filterData,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            }
            console.log(tempError.message)
            setFilterData(tempError)
        })
    }

},[filterData])

React.useEffect(()=>{
   // console.log('filterData2 PageComponent........')
   // console.log(filterData2)

    if(filterData2.reloadData){
        const {dataUrl,pageNumber,limitRow,sort,qry}=filterData2
    
        axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
        .then(result=>{
            //console.log(result)
            const temp2= genFilterDataWithIndex(result.data.data,filterData.selectProduct)
            //console.log('temp2.....')
           // console.log(temp2)
            const tempResult={...filterData2,
                data0:temp2,
                count:result.data.count,
                lastRecordId:result.data.lastRecordId,
                reloadData:false
            }
            setFilterData2(tempResult)
        })
        .catch(error=>{
            const tempError={...filterData2,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            }
            console.log(tempError.message)
            setFilterData2(tempError)
        })
    }

},[filterData2])



let [filterData3,setFilterData3]=React.useState(filterDataTemplate3)
React.useEffect(()=>{
    //console.log('filterData3')
    //console.log(filterData3)
    if(filterData3.reloadBillForm){
        setFilterData3({
            ...filterData3,
            showBillForm:true,
            reloadBillForm:false
        })
    }
},[filterData3])


React.useEffect(()=>{
    // console.log('filterData2 PageComponent........')
    // console.log(filterData2)
     if(filterData4.reloadData){
         const {dataUrl,pageNumber,limitRow,sort,qry}=filterData4
     
         axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
         .then(result=>{
             //console.log(result)
             const temp2= genFilterDataWithIndex(result.data.data,filterData4.selectProduct)
             //console.log('temp2.....')
            // console.log(temp2)
             const tempResult={...filterData4,
                 data0:temp2,
                 count:result.data.count,
                 lastRecordId:result.data.lastRecordId,
                 reloadData:false
             }
             setFilterData4(tempResult)
         })
         .catch(error=>{
             const tempError={...filterData4,
                 reloadData:false,
                 message:catchErrorToMessage(error),
                 showModalConfirm:false,
                 showModalError:true,
             }
             console.log(tempError.message)
             setFilterData4(tempError)
         })
     }
 
 },[filterData4])

React.useEffect(()=>{
    if(filterData4.editData){
        setFilterData4({
            ...filterData4,
            customerConfirm:{
                ...filterData4.editData,
                partnerId:filterData4.editData.id
            }
        })
    }
},[filterData4.editData])


const setShowRange=(data)=>{setFilterData({...filterData,showRange:data})}
const setHeightTop=(data)=>{setFilterData({...filterData,heightTop:data})}
const setWidthLeft=(data)=>{setFilterData({...filterData,widthLeft:data})}
const setShowModalError=(data)=>{setFilterData({...filterData,showModalError:data})}
const setShowModalConfirm=(data)=>{setFilterData({...filterData,showModalConfirm:data})}
const setPageNumber=(data)=>{setFilterData({...filterData,pageNumber:data,reloadData:true})}
const setRawMatPageNumber=(data)=>{
    setFilterData2({...filterData2,pageNumber:data,reloadData:true})
}
const setPartnerPageNumber=(data)=>{
    setFilterData4({...filterData4,pageNumber:data,reloadData:true})
}

const billFormSetShowModalConfirm=(data)=>{
    setFilterData3({
        ...filterData3,
        showModalConfirm:data
    })
}

const setShowAdd=(data)=>{
    //console.log('setShowAdd')
    if(data){
        setFilterData3({
            ...filterData3,
            showBillForm:data,
            data0:{...filterDataTemplate3.blankData,
                   //branchId:basicData.branchId,
                   //branchName:basicData.branchName 
                   }
        })
    }
    else{
        setFilterData({
            ...filterData,
            showBillForm:data,
            data0:null
        })
    }
}

const setShowEdit=(data)=>{
    //console.log('setShowEdit')
    if(data){
        setFilterData3({
            ...filterData3,
            showBillForm:data,
            data0:filterData.editData
        })
    }
    else{
        setFilterData3({
            ...filterData3,
            showBillForm:data,
            data0:null
        })
    }
}

const setShowModalCsv=()=>{
    setFilterData({
        ...filterData,
        showModalCsv:true
    })
}

const setTableTemplate=(data)=>{setFilterData({...filterData,tableTemplate:data})}
const setDetailTableTemplate=(data)=>{setFilterData({...filterData,detailTableTemplate:data})}

const rawMatSetTableTemplate=(data)=>{setFilterData2({...filterData2,tableTemplate:data})}
const partnerSetTableTemplate=(data)=>{setFilterData4({...filterData4,tableTemplate:data})}


const setRawMatEditData=(data)=>{
    setFilterData2({...filterData2,editData:data})
}
const setPartnerEditData=(data)=>{
    setFilterData4({...filterData4,editData:data})
}

const setEditData=(data)=>{
    let tempData=data
    //console.log('data..........')
    //console.log(data)

    /*
    if(data){
        if(data.detail){
            let tempArray=[]

            data.detail.map(i=>{
                let tempObj={...i,selectedLine:false,_id:uuid()}
                tempArray=[...tempArray,tempObj]
            })

            tempData={...data,detail:tempArray}
        }
    }
    */
    setFilterData({...filterData,editData:tempData})
    //captureEditData(data)
}
//to save filterData when sort Up and down each column
const setFilterDataData0=(data)=>{setFilterData({...filterData, data0:data})}
const setSort=(data)=>{setFilterData({...filterData,sort:data})}
const setLimitRow=(data)=>{setFilterData({...filterData,limitRow:data})}

const rawMatSetLimitRow=(data)=>{setFilterData2({...filterData2,limitRow:data})}
const rawMatSetSort=(data)=>{setFilterData2({...filterData2,sort:data})}

const partnerSetLimitRow=(data)=>{setFilterData4({...filterData4,limitRow:data})}
const partnerSetSort=(data)=>{setFilterData4({...filterData4,sort:data})}


const setUnSelectAllFunc=()=>{

    if(filterData.showRenderTransaction){
        setFilterData(setUnSelectAll(filterData))
    }
    else if(filterData.showRenderProduct){
        setFilterData2(setUnSelectAll(filterData2))
    }
    else if(filterData.showRenderCustomer){
        setFilterData4(setUnSelectAll(filterData4))
    }
    else{
        setFilterData(setUnSelectAll(filterData))
    }

}





const genFilterDataWithIndex=(filterData,selectProduct)=>{

    if(filterData){
        if(filterData.detail){
            if(filterData.detail.length()>0){
                let tempArray=[]

                filterData.detail.map(i=>{

                })

            }
        }
    }

    let tempSelectProduct
    if(selectProduct){tempSelectProduct=selectProduct}
    else {tempSelectProduct=[]}

    let tempArray=[]

    filterData.map((i,idx)=>{
         
        const temp={...i,selectedLine:false,_id:uuid()}
        tempArray=[...tempArray,temp]
        //const temp={...i,tempIndex:idx,selectedLine:false}
    })

    let tempArray2=[]

    tempArray.map(i=>{
        let tempObj=i
        tempSelectProduct.map(j=>{
            if(i.id==j.id){
                //console.log('j.id==i.id')
                tempObj={...tempObj,selectedLine:j.selectedLine}
                //tempArray2=[...tempArray2,]
            }
        })
        tempArray2=[...tempArray2,tempObj]
    })
 
    return tempArray2
}


const rawMatRefreshPage=()=>{
    const {limitRow,sort}=filterData2
    const temp = {...filterData2,selectProduct:[],
                editData:null,qry:null,reloadData:true
            }
    setFilterData2(temp)
}

const partnerRefreshPage=()=>{
    const {limitRow,sort}=filterData4
    const temp = {...filterData4,selectProduct:[],
                editData:null,qry:null,reloadData:true
            }
    setFilterData4(temp)
}


const refreshPage=()=>{
    //console.log('refreshPage')
    const {limitRow,sort}=filterData
    const temp = {...filterData, limitRow,sort,selectProduct:[],
                editData:null,qry:null,reloadData:true
            }
    setFilterData(temp)
    setReloadBasicData(true)
}

const submitFunctionDeleteFunc=async(data)=>{
    console.log('submitFunctionDeleteFunc filterData')
    console.log(filterData)
    const temp = await submitFunctionDelete(filterData,myheader)
    setFilterData(temp)
}


//============================
//============================
//============================

const billFormSaveTableTemplateFunc=(tableTemplate)=>{
    let tempObj={}
    Object.keys(tableTemplate).map(i=>{
       const temp={...tableTemplate[i],showColHead:true}
        tempObj={...tempObj,[i]:temp}
    })
    //console.log(tableTemplate)
    //console.log(tempObj)
    setBillTableTemplate(tempObj)
    saveTableTemplate(tableTemplate,'p35tabletemplate',
                    'productDetailTableTemplateForForm',myheader)
}


const setShowModalConfirmFunc=(data)=>{
    setFilterData({...filterData,
        showModalConfirm:data,
        dataToDelete:null
    })
}

const billFormSetShowModalConfirmFunc=(data)=>{
    setFilterData3({...filterData3,
        showModalConfirm:data
    })
}

const billFormSubmitFunctionDeleteFunc=()=>{
   // const {dataToDelete}=filterData3
    console.log('delete.......')
    //const temp = await submitFunctionDelete(data,myheader)
    //setFilterData(temp)
    axios.post(`/p35transaction/deletetransaction`,{id:filterData3.data0.id},myheader)
    .then(result=>{
        console.log('done delete.............')
        const temp={...filterData,
            reloadData:true,
        }
        setFilterData(temp)
        setFilterData3({...filterData3,
            showBillForm:false,
            data0:null,
            isGenIdOfBillForm:false,
            showModalConfirm:false
        })
    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:false,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)
    })
    
}

const billFormSubmitFunctionEditFunc=async (data)=>{
    console.log(`edit.......`)

    const {_id,detail,...remaining}=data
    let tempArray=[]
    detail.map(i=>{
        const {_id,...remaining2}=i
        tempArray=[...tempArray,remaining2]
    })

    const tempObj={...remaining,detail:tempArray}

    //console.log('tempObj')
    //console.log(tempObj)

    //const temp = await submitFunctionEdit(formInputState,filterData,stateTemplate,myheader)
    //setFilterData(temp)
    axios.post(`/p35transaction/updatetransaction`,tempObj,myheader)
    .then(result=>{
        console.log('done edit.............')
            const temp={...filterData,
                reloadData:true,
            }
            setFilterData(temp)
            setFilterData3({...filterData3,
                showBillForm:false,
                data0:null,
                isGenIdOfBillForm:false,
            })

    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:false,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)

    })
}

const billFormSubmitFunctionAddFunc=async (data)=>{
    console.log(`add.......`)
    console.log(data)
    //const temp = await submitFunctionAdd(formInputState,filterData,stateTemplate,myheader)
    //setFilterData(temp)
    
    const {_id,detail,...remaining}=data
    let tempArray=[]
    detail.map(i=>{
        const {_id,...remaining2}=i
        tempArray=[...tempArray,remaining2]
    })

    const tempObj={...remaining,detail:tempArray}
    
    //console.log('tempObj')
    //console.log(tempObj)

    axios.post(`/p35transaction/addtransaction`,tempObj,myheader)
    .then(result=>{
        console.log('done add............')
        
        const temp={...filterData,
            reloadData:true,
        }
        setFilterData(temp)
        setFilterData3({...filterData3,
            showBillForm:false,
            data0:null,
            isGenIdOfBillForm:false,
        })
    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:true,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)

    })
}

//===================================
//===================================
//===================================


//{pageNumber,limitRow,sort,dataUrl} = filterData
const filterAxiosFunc=(option,inputState)=>{
    //console.log('filterAxios')
    //console.log(filterTemplate)
    filterAxios(option,inputState,filterTemplate,filterData,myheader)
    .then(result=>{
        console.log("result.....")
        console.log(result)
        const temp2= genFilterDataWithIndex(result.data0,filterData.selectProduct)
        //console.log('result......')
        //console.log(result)
        setFilterData({...result,data0:temp2})
    })
    .catch(error=>setFilterData(error))
}


//{pageNumber,limitRow,sort,dataUrl} = filterData
const rawMatFilterAxiosFunc=(option,inputState)=>{
    //console.log('rawMatFilterAxiosFunc.......')
    const {pageNumber,limitRow,sort,dataUrl} = filterData2

    //console.log(filterTemplate)
    filterAxios(option,inputState,rawMatFilterTemplate,filterData2,myheader)
    .then(result=>{
        //console.log("result.....")
        //console.log(result)
        const temp2= genFilterDataWithIndex(result.data0,filterData2.selectProduct)
        //console.log(result)
        //console.log(temp2)
        setFilterData2({...result,data0:temp2})
    })
}

//{pageNumber,limitRow,sort,dataUrl} = filterData
const partnerFilterAxiosFunc=(option,inputState)=>{
    console.log('partnerFilterAxiosFunc.......')
    const {pageNumber,limitRow,sort,dataUrl} = filterData4

    //console.log(filterTemplate)
    filterAxios(option,inputState,partnerFilterTemplate,filterData4,myheader)
    .then(result=>{
        //console.log("result.....")
        //console.log(result)
        const temp2= genFilterDataWithIndex(result.data0,filterData4.selectProduct)
        //console.log(result)
        //console.log(temp2)
        setFilterData4({...result,data0:temp2})
    })
}



const filterDataByGroup=(i)=>{
    const {folders,...remaining}=i
    const temp = {...filterData,
        pageNumber:1,
        qry:{groupId:i.id},
        selectGroup:remaining,
        reloadData:true}
    setFilterData(temp)
}

const rawMatFilterDataByGroup=(i)=>{
    
    //console.log('rawMatFilterDataByGroup')
    const {folders,...remaining}=i
    const temp = {...filterData2,
        pageNumber:1,
        qry:{groupId:i.id},
        selectGroup:remaining,
        reloadData:true}
    setFilterData2(temp)
    
}


const saveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData.tableTemplateName,myheader)
}

const rawMatSaveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData2
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData2.tableTemplateName,myheader)
}

const partnerSaveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData4
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData4.tableTemplateName,myheader)
}


const updateFilterDataFunc=(index,i)=>{
    const temp=updateFilterData(index,i,filterData)
    //console.log('temp')
    //console.log(temp)
    setFilterData({...filterData,...temp})
}

const rawMatUpdateFilterDataFunc=(index,i)=>{
    const temp=updateFilterData(index,i,filterData2)
    //console.log('temp')
    //console.log(temp)
    setFilterData2({...filterData2,...temp})
}

const partnerUpdateFilterDataFunc=(index,i)=>{
    const temp=updateFilterData(index,i,filterData4)
    //console.log('temp')
    //console.log(temp)
    setFilterData4({...filterData4,...temp})
}


const closeBillForm=()=>{
    setFilterData3({...filterData3,
        showBillForm:false,
        data0:null
    })
}
//----------------------------
const customerConfirmSubmitFunc=()=>{

    const {id,title,name,partnerType,phone,selectAddress}=filterData4.customerConfirm
    const tempCustomer={
        partnerId:id,
        title:title,
        name:name,
        partnerType:partnerType,
        phone:phone,
        address:selectAddress
    }   

    setFilterData3({...filterData3,
        data0:{
            ...filterData3.data0,
            ...tempCustomer
        },
        showCustomerConfirm:false,
        showBillForm:false,
        reloadBillForm:true
    })

}
//----------------------------
const transactionConfirmSubmitFunc=()=>{
    let tempEditData=filterData.editData

    if(!filterData3.includeTransactionHead){
        tempEditData={...filterData3.data0,
            detail:[...filterData3.data0.detail,
                    ...filterData.editData.detail
                    ]
        }
    }

    setFilterData3({...filterData3,
        data0:tempEditData,
        showTransactionConfirm:false,
        showBillForm:false,
        reloadBillForm:true
    })
  
}


const transactionConfirmCancelFunc=()=>{
    setFilterData3({...filterData3,
        showTransactionConfirm:false
    })
}

const changeIncludeTransactionHead=()=>{
    setFilterData3({...filterData3,
        includeTransactionHead:!filterData3.includeTransactionHead
    })
}

const captureSelectProductToBillForm=()=>{
    //console.log('filterData2.selectProduct')
    //console.log(filterData2.selectProduct)
    let tempArray=[]

    filterData2.selectProduct.map(i=>{
        const {detail,...remaining}=i

        if(i.selectedLine){
            tempArray=[...tempArray,{...remaining,_id:uuid(),quantity:0,result:0}]
        }
    })

    const tempDetail=[...filterData3.data0.detail,...tempArray]

    const tempData0={...filterData3.data0,detail:tempDetail}

    setFilterData3({...filterData3,
        data0:tempData0,
        showBillForm:false,
        reloadBillForm:true
    })

}

//-----------------------------

//-----------------------------

//==============================
const renderFilter=({filterData,filterTemplate,inputState,
                     setLimitRow,
                     setSort,
                     filterAxiosFunc,pageFilterForm
                    })=>{
    const {limitRow,sort}=filterData

    return (
        <div className="" style={{marginBottom:"1rem"}}>
            <ModalFilterInput
            show={true} setShow={()=>{}}
            
            filterTemplate={filterTemplate}

            inputState={inputState} 
            setInputState={()=>{}}
            
            limitRow={limitRow} 
            setLimitRow={setLimitRow}
            
            sort={sort} 
            setSort={setSort}
            
            filterAxios={filterAxiosFunc}
            basicData={basicData}
            
            LB={pageFilterForm}
            />
        </div>
    )
}
//-----------------------------
//-----------------------------
//-----------------------------

//-----------------------------
const renderTransaction=()=>{
    //tableTemplate[filterDataTemplate.tableTemplateName]
    
    let tempTransactionTableTemplate=tableTemplate[filterDataTemplate.tableTemplateName]
    let tempSelectedLine=tempTransactionTableTemplate.selectedLine
    tempSelectedLine={...tempSelectedLine,showCol:false}

    tempTransactionTableTemplate={...tempTransactionTableTemplate,selectedLine:tempSelectedLine}
   
    /*
    tableTemplate:
    filterDataTemplate.tableTemplateName
    ?tableTemplate[filterDataTemplate.tableTemplateName]
    :null,
    */
    return(
        <div className="w-100">
        {
            renderFilter({
                filterData:filterData,
                filterTemplate:filterTemplate,
                inputState:inputState,
                setLimitRow:setLimitRow,
                setSort:setSort,
                filterAxiosFunc:filterAxiosFunc,
                pageFilterForm:pageFilterForm
               })
        }
        
        {
         filterData3.showBillForm
         ?renderRight({...filterData,

                    tableTemplate:tempTransactionTableTemplate,
                    //================
                    badgeState:{...filterData.badgeState,
                        reloadShow:true,
                        addShow:false,
                        editShow:false,
                        
                        delShow:false,
                        printerShow:false,
                        csvShow:false,
                        forwardShow:filterData.editData?true:false,
                    }})
         :null   
        }

        </div>

    )
}
//-----------------------------
const renderCustomer=()=>{
    console.log('renderCustoer')
    return(
        <div className="w-100 h-100">
          {
            renderFilter({
                filterData:filterData4,
                filterTemplate:partnerFilterTemplate,
                inputState:partnerInputState,
                setLimitRow:partnerSetLimitRow,
                setSort:partnerSetSort,
                filterAxiosFunc:partnerFilterAxiosFunc,
                pageFilterForm:partnerFilterForm
            })
        }

        {
            renderRawMatRight({
                filterData:{...filterData4,
                                badgeState:{...filterData4.badgeState,
                                    addShow:false,
                                    editShow:false,
                                    delShow:false,
                                    printerShow:false,
                                    csvShow:false,
                                    forwardShow:filterData4.editData?true:false,
                                    bullEyeShow:false
                                }},
                setPageNumber:setPartnerPageNumber,
                setReloadData:partnerRefreshPage,
                setShowForwardConfirm:()=>{
                   // console.log('setShowForwardConfrim')
                    setFilterData3({...filterData3,showCustomerConfirm:true})
                },//captureSelectProductToBillForm,
                setTableTemplate:partnerSetTableTemplate,
                setFilterData:setFilterData4,
                setEditData:setPartnerEditData,
                saveTableTemplateFunc:partnerSaveTableTemplateFunc,
                updateFilterData:partnerUpdateFilterDataFunc,
                bgColor:"#74b979"
            })
        }



        </div>
    )
}

//-----------------------------
const renderProduct=()=>{
    console.log('renderProduct')
    console.log(filterData2)


    return(
        <div className="w-100">
        {
        renderFilter({
            filterData:filterData2,
            filterTemplate:rawMatFilterTemplate,
            inputState:rawMatInputState,
            setLimitRow:rawMatSetLimitRow,
            setSort:rawMatSetSort,
            filterAxiosFunc:rawMatFilterAxiosFunc,
            pageFilterForm:rawMatPageFilterForm
           })
        }

        {
        filterData2.groupDataUrl&&pageData&&
        <div className="" style={{marginBottom:"4rem"}}>
            <NewGroup
                myheader={myheader}
                dataUrl={filterData2.groupDataUrl}
                filterByGroupId={rawMatFilterDataByGroup}
                captureEditGroup={()=>{}}
                bgColor={"#e5d1db"}
                pageData={pageData}
            />
        </div>
        }

        {
        renderRawMatRight({
            filterData:{...filterData2,
                            badgeState:{...filterData2.badgeState,
                                addShow:false,
                                editShow:false,
                                delShow:false,
                                printerShow:false,
                                csvShow:false,
                                forwardShow:filterData2.selectProduct.length>0?true:false,
                                unSelectShow:true
                            }},
            setPageNumber:setRawMatPageNumber,
            setReloadData:rawMatRefreshPage,
            setShowForwardConfirm:captureSelectProductToBillForm,
            setTableTemplate:rawMatSetTableTemplate,
            setFilterData:setFilterData2,
            setEditData:setRawMatEditData,
            saveTableTemplateFunc:rawMatSaveTableTemplateFunc,
            updateFilterData:rawMatUpdateFilterDataFunc,
            bgColor:"#e5d1db"
        })
        }
        </div>
    )
}
//-----------------------------
//-----------------------------
const renderGroup=()=>{

    return (
    <div className="w-100"
         style={{overflowX:"hidden",
                 paddingBottom:"5rem"}}>
        
        <div className="w-100" 
             style={{display:"flex",alignItems:"center",height:"2rem",
             backgroundColor:filterData.badgeColor}}
             >
            {
            //filterData3.showBillForm&&
            <div className="iconbox" 
                onClick={e=>{setFilterData({...filterData,
                    showRenderTransaction:false,
                    showRenderProduct:false,
                    showRenderCustomer:true,
                    badgeColor:"#74b979"
                    })
                }}
            >
                  <Ticon 
                      iconName="MdPerson"
                      className={filterData.showRenderCustomer?"md-icon ft-brown":"md-icon"} 
                      textStyle={{color:"black"}}
                      //style={{marginRight:"1.2rem",
                      //        color:filterData.showRenderCustomer?"#8b4131":"black" 
                      // }}
               
                    />
            </div>
          
            }

            {
            //filterData3.showBillForm&&

            <div className="iconbox"
                onClick={e=>{setFilterData({...filterData,
                    showRenderTransaction:false,
                    showRenderProduct:true,
                    showRenderCustomer:false,
                    badgeColor:"#e5d1db"
                    })
                }}
            >
                <Ticon
                    iconName="MdFastfood" 
                    className={filterData.showRenderProduct?"md-icon ft-brown":"md-icon"}
                    textStyle={{color:"black"}}
                    //style={{marginRight:"1.2rem",
                    //          color:filterData.showRenderProduct?"#8b4131":"black"
                    //}}
                />
            </div>
           
            }

            
            <div className="iconbox"
                 onClick={e=>{setFilterData({...filterData,
                    showRenderTransaction:true,
                    showRenderProduct:false,
                    showRenderCustomer:false,
                    badgeColor:"#72a2d9"
                    })
                }}

            >
                 <Ticon
                     iconName="FaRegMoneyBillAlt" 
                     className={filterData.showRenderTransaction?"md-icon ft-brown":"md-icon"}
                     textStyle={{color:"black"}}
                    //style={{marginRight:"1.2rem",
                    // color:filterData.showRenderTransaction?"#8b4131":"black"
                    //}}
                
                />
            </div>
           
        </div>

        <div className="w-100">
            {
             filterData.showRenderTransaction&&
                renderTransaction()
            }
            {
             filterData.showRenderProduct&&
                renderProduct()   
            }
            { 
             filterData.showRenderCustomer&&
                renderCustomer()  
            }


        </div>

    </div>
    )
}
//------------------------
//-----------------------------
const renderRight=(filterData)=>{
    //console.log('filterData')
    //console.log(filterData)
    return(
    <div className="w-100 h-100">
        <div className="hide-on-print"
        style={{height:filterData3.showBillForm?"2rem":"5%",
                width:"100%",
        }}
        >
            {
                renderBadge({
                    filterData,
                    //badgeState:{...filterData.badgeState,
                    //    addFunc:
                    //},
                    setPageNumber:setPageNumber,
                    
                    totalSwapPage:1, 
                    setSwapState:()=>{},
                    
                    setReloadData:refreshPage,
                    setShowFilter:()=>{},
                    setShowAdd:setShowAdd,
                    setShowEdit:setShowEdit,
                    setShowModalConfirm:setShowModalConfirm,
                    setShowModalCsv:setShowModalCsv,
                    setUnSelectAll:setUnSelectAllFunc,
                    setShowForwardConfirm:(value)=>{setFilterData3({...filterData3,showTransactionConfirm:value})},
                    setClose:()=>{},
                    bgColor:"#72a2d9",
                    captureSelect:()=>{}//captureSelect
                })        
            }

        </div>

        <div className=""
                style={{height:"95%",width:"100%"}}
        >
            <div style={{height:"100%",width:"100%"}}
                className="show-on-print"
            >
                {
                    filterData.data0
                    ?<Table
                        colorHead={"#4b6d62"}
                        tableTemplate={filterData.tableTemplate}
                        setTableTemplate={setTableTemplate}
        
                        filterData={filterData.data0}
                        setFilterData={setFilterDataData0}
                        
                        editData={filterData.editData}
                        setEditData={setEditData}
                        saveTableTemplateFunc={saveTableTemplateFunc}
                        isSubTable={false}
                        updateFilterData={updateFilterDataFunc}
                        useInput={false}
                        
                    />
                    :null
                }
            </div>
            
        </div>
    </div>
    )
}
//=============================

//============================


//-----------------------------

//
const renderRawMatRight=({
                            filterData,setPageNumber,
                            setReloadData,setShowForwardConfirm,
                            setTableTemplate,setFilterData,
                            setEditData,saveTableTemplateFunc,
                            updateFilterData,bgColor
                        })=>{

    console.log('renderRawMatRight')
    console.log(filterData)

    return(
    <div className="w-100">
        <div className="hide-on-print"
        style={{height:"2rem",width:"100%"}}
        >
            {filterData.data0&&
                    renderBadge({
                        filterData,
                        setPageNumber,//setRawMatPageNumber,
                        
                        totalSwapPage:1, 
                        setSwapState:()=>{},
                        
                        setReloadData,//rawMatRefreshPage,
                        setShowFilter:()=>{},
                        setShowAdd:()=>{},
                        setShowEdit:()=>{},
                        setShowModalConfirm:()=>{},
                        setShowModalCsv:()=>{},
                        setUnSelectAll:setUnSelectAllFunc,
                        setClose:()=>{},
                        setShowForwardConfirm,//captureSelectProductToBillForm,
                        bgColor:bgColor,
                        captureSelect:()=>{}//captureSelect
                    })        
                }

        </div>

        <div className=""
                style={{height:"95%",width:"100%"}}
        >
            <div style={{height:"100%",width:"100%"}}
                className="show-on-print"
            >
                {
                filterData.data0
                ?<Table
                    colorHead={"#4b6d62"}
                    tableTemplate={filterData.tableTemplate}
                    setTableTemplate={setTableTemplate}//{rawMatSetTableTemplate}

                    filterData={filterData.data0}
                    setFilterData={setFilterData}//{setFilterData2}
                    
                    editData={filterData.editData}
                    setEditData={setEditData}//{setRawMatEditData}
                    saveTableTemplateFunc={saveTableTemplateFunc}//{rawMatSaveTableTemplateFunc}
                    isSubTable={false}
                    updateFilterData={updateFilterData}//{rawMatUpdateFilterDataFunc}
                    useInput={false}
                    
                />
                :null
                }
            </div>
            
        </div>
    </div>
    )
}


//-----------------------------
const renderBillForm=()=>{
    return(
    <BillForm
        blankData={filterDataTemplate3.blankData}
        dataIdx={"cancel"}
        closeBillForm={closeBillForm}
        data={filterData3.data0}
        selectOfSelectProduct={()=>{}}//{selectProductToBillForm}
        setResetProductList={()=>{}}//{setResetProductList}
        pageData={pageData} 
        basicData={basicData}
        tableTemplate={billTableTemplate}
        saveTableTemplateFunc={billFormSaveTableTemplateFunc}
        submitFunctionAddFunc={billFormSubmitFunctionAddFunc}
        submitFunctionEditFunc={billFormSubmitFunctionEditFunc}
        submitFunctionDeleteFunc={billFormSetShowModalConfirmFunc}
        isGenIdOfBillForm={filterData3.isGenIdOfBillForm}
        runIsGenId={(value)=>{
            //console.log('runGenIdOfBillForm')
            //console.log(value)
            setFilterData3({...filterData3,
            isGenIdOfBillForm:value
        })
        }}
        
        updateData={(data)=>{
            //console.log('data')
            //console.log(data)

            setFilterData3({...filterData3,
                data0:data,
                ///reloadData:true,
                //showBillForm:false
            })
        }}
        myheader={myheader}
        calDigit={calDigit}
    />
    )
}



//==============================
const renderBody=()=>{
return(
    filterData&&
    <div className=""
             style={{display:"flex",height:"95%",width:"100%"}}
    >
            
            <div className="hide-on-print" 
                 style={{height:"100%",
                         width:`${filterData.widthLeft}%`,
                         overflowY:"scroll"
                         }}>
                     {
                       renderGroup()
                     }
            </div>
        
            <div className="" 
                style={{height:"100%",width:`${100-filterData.widthLeft}%`}}>
                 {
                    !filterData3.data0&&!filterData3.showBillForm
                    ?renderRight({...filterData,
                        badgeState:{...filterData.badgeState,
                            reloadShow:true,
                            editShow:filterData.editData?true:false,
                            addShow:true,
                            delShow:true,
                            csvShow:true,
                            printerShow:true,
                            bullEyeShow:true,
                            unSelectShow:true
                        }
                    }) 
                    :!filterData3.showBillForm
                     ?null
                     :renderBillForm()
                   
                 }
            </div>
    </div>
)
}
//================================
//=================================
/*
const renderModalCsv=()=>{
    const {limitRow,sort}=filterData

    return(
        <div className="Modal-background">
            <div className="Modal-box" style={{width:"60%"}}>
                <ModalFilterInput
                    title={filterTitle}
                    show={true} setShow={()=>{}}
                    
                    filterTemplate={filterTemplate}
        
                    inputState={inputState} 
                    setInputState={()=>{}}
                    
                    limitRow={limitRow} 
                    setLimitRow={setLimitRow}
                    
                    sort={sort} 
                    setSort={setSort}
                    
                    filterAxios={filterAxiosFunc2}
                    basicData={basicData}
                    
                    LB={pageFilterForm}
                />

                <div className="w-100 flex-center-center jc-end" >
             
                    <div>
                        <button
                            onClick={e=>{
                                setFilterData({
                                    ...filterData,
                                    showModalCsv:false
                                })
                            }}
                        >Cancel</button>
                    </div>

                </div>

            </div>             
        </div>
    )
}
*/

//=================================
return(
<div className="w-100 h-100">
    {   
      renderBody()    
    }
   
    <div className="hide-on-print" 
        style={{width:"100%",display:"flex",position:"relative"}}>
            {
            renderWidthRangeBar({showRange:filterData.showRange,
                                setShowRange:setShowRange,
                                widthLeft:filterData.widthLeft,
                                setWidthLeft:setWidthLeft,
                                //heightTop:filterData.heightTop,
                                //setHeightTop:setHeightTop
                            })
            }
   
    </div>

    {filterData.showModalCsv
    ?<ModalCsv
        filterDataTemplate={filterDataTemplate}
        inputState={inputState}
        filterTemplate={filterTemplate}
        myheader={myheader}
        pageFilterForm={pageFilterForm}
        basicData={basicData}
        cancelFunc={e=>{setFilterData({...filterData,showModalCsv:false})}}
    />//renderModalCsv()
    :null
    }

    {filterData3.showTransactionConfirm&&
      renderTransactionConfirm({
          editTransaction:filterData.editData,
          submitFunc:transactionConfirmSubmitFunc,
          cancelFunc:transactionConfirmCancelFunc,
          pageData:pageData,
          changeIncludeTransactionHead:changeIncludeTransactionHead,
          includeTransactionHead:filterData3.includeTransactionHead
        })
    }
    
    {
    filterData3.showCustomerConfirm&&
      renderCustomerConfirm({
            filterData:filterData4,
            setFilterData:setFilterData4,
            basicData:basicData,
            customerConfirmForm:pageData.customerConfirmForm,
            submitFunc:customerConfirmSubmitFunc,
            cancelFunc:()=>{
                setFilterData3({...filterData3,showCustomerConfirm:false})
            }
        })
    }




    {
    filterData.showModalConfirm
    ?<ModalConfirm
        setShow={setShowModalConfirm}
        submitFunction={submitFunctionDeleteFunc}
    />
    :null
    }

    {
    filterData3.showModalConfirm
    ?<ModalConfirm
        setShow={billFormSetShowModalConfirm}
        submitFunction={billFormSubmitFunctionDeleteFunc}
    />
    :null
    }

    {  
    filterData.showModalError
    ?renderModalError({
        setShow:setShowModalError,
        message:filterData.message
    })
    :null
    }
</div>
)

}




export default PageComponentTransaction ;












/*










import React from 'react';
import axios from 'axios'
//import {MainContext} from '../../context/MainContext'
import uuid from 'react-uuid'
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'
import pageUtil from './pageUtil'
//import NewGroupComponent from '../../render/renderTree/NewGroupComponent'
import axiosUtil from '../../util/axiosUtil'
import Table from '../../component/table/Table'
import renderWidthRangeBar from '../../component/table/renderWidthRangeBar'
import renderBadge from '../../render/renderBadge/renderBadge'
import renderModalError from '../../render/renderModalError'
import ModalConfirm from '../../render/ModalConfirm'
//import ModalForm from '../../render/renderForm/ModalForm'
//import NewTree from '../../component/newtree/NewTree'
import NewGroup from '../newgroup/NewGroup';
import PageForm from '../../render/renderForm/PageForm'
import ModalCsv from './ModalCsv'
import BillForm from '../../page/bill/BillForm'
import renderTransactionConfirm from '../../page/bill/renderTransactionConfirm';
import {FaChair,FaRegFolderOpen,FaRegMoneyBillAlt,FaRegArrowAltCircleRight,FaMoneyBill} from 'react-icons/fa'
import {MdFastfood,MdPeople,MdPerson,MdClose} from 'react-icons/md'
import renderCustomerConfirm from '../../page/bill/renderCustomerConfirm';
import data from '../../page/bill/data';
import Ticon from '../../component/ticon/Ticon'

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil

function PageComponentTransaction(props) {

console.log('PageComponentTransaction')
//const {basicDataSt,tokenSt,setReloadCheckToken,myheader}=React.useContext(MainContext)

const {filterDataTemplate,filterDataTemplate2,filterDataTemplate3,filterDataTemplate4,
      pageFilter,pageFilterForm,...remaining}=props

const {filterTitle,inputState,filterTemplate,myheader,basicDataSt,
      formTemplate,editFormTemplate,stateTemplate,
      groupFormTemplate,groupEditFormTemplate,
      pageDataModalForm,
      addFormTitle,
      editFormTitle,
      groupAddFormTitle,
      groupEditFormTitle,

      rawMatFilterTemplate,
      rawMatInputState,
      rawMatPageFilterForm,

      partnerFilterTemplate,
      partnerInputState,
      partnerFilterForm,

      calDigit,
      setReloadBasicData
}=props

const {basicData,pageData,tableTemplate,reloadBasicData}=basicDataSt

const [billTableTemplate,setBillTableTemplate]=React.useState(null)

React.useEffect(()=>{
    if(tableTemplate){    
        setBillTableTemplate(tableTemplate.productDetailTableTemplateForForm)
    }
},[basicDataSt])


let [filterData,setFilterData]=React.useState({
    ...filterDataTemplate,...remaining,
    tableTemplate:
    filterDataTemplate.tableTemplateName
    ?tableTemplate[filterDataTemplate.tableTemplateName]
    :null,
    detailTableTemplate:filterDataTemplate.detailTableTemplateName?tableTemplate[filterDataTemplate.detailTableTemplateName]:null,
    detailTableTemplateForForm:filterDataTemplate.detailTableTemplateForFormName?tableTemplate[filterDataTemplate.detailTableTemplateForFormName]:null,
    widthLeft:basicData.widthLeft,
    limitRow:basicData.limitRow,
    badgeColor:"#72a2d9"
})

const genFilterData2=()=>{
        return {
            ...filterDataTemplate2,
            
            tableTemplate:
            filterDataTemplate2.tableTemplateName
            ?tableTemplate[filterDataTemplate2.tableTemplateName]
            :null,
        }
    
}

let [filterData2,setFilterData2]=React.useState(genFilterData2())

const genFilterData4=()=>{
    console.log('genFilterData4')

    let tempSelectedLine=tableTemplate[filterDataTemplate4.tableTemplateName].selectedLine
    tempSelectedLine={...tempSelectedLine,showCol:false}

    const tempTableTemplate={...tableTemplate[filterDataTemplate4.tableTemplateName],
                                selectedLine:tempSelectedLine
                            }


    return {
        ...filterDataTemplate4,
        tableTemplate:tempTableTemplate   
    }
}

let [filterData4,setFilterData4]=React.useState(genFilterData4())


React.useEffect(()=>{
     //console.log('filterData PageComponent')
     //console.log(filterData)
    if(filterData.reloadData){
        const {dataUrl,pageNumber,limitRow,sort,qry}=filterData
    
        axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
        .then(result=>{
            //console.log(`result...${dataUrl}/getlimit`)
            //console.log(result)
            const temp2= genFilterDataWithIndex(result.data.data,filterData.selectProduct)
            //console.log('temp2.....')
            //console.log(temp2)
            const tempResult={...filterData,
                data0:temp2,
                count:result.data.count,
                lastRecordId:result.data.lastRecordId,
                reloadData:false
            }
            setFilterData(tempResult)
        })
        .catch(error=>{
            const tempError={...filterData,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            }
            console.log(tempError.message)
            setFilterData(tempError)
        })
    }

},[filterData])

React.useEffect(()=>{
   // console.log('filterData2 PageComponent........')
   // console.log(filterData2)

    if(filterData2.reloadData){
        const {dataUrl,pageNumber,limitRow,sort,qry}=filterData2
    
        axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
        .then(result=>{
            //console.log(result)
            const temp2= genFilterDataWithIndex(result.data.data,filterData.selectProduct)
            //console.log('temp2.....')
           // console.log(temp2)
            const tempResult={...filterData2,
                data0:temp2,
                count:result.data.count,
                lastRecordId:result.data.lastRecordId,
                reloadData:false
            }
            setFilterData2(tempResult)
        })
        .catch(error=>{
            const tempError={...filterData2,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            }
            console.log(tempError.message)
            setFilterData2(tempError)
        })
    }

},[filterData2])



let [filterData3,setFilterData3]=React.useState(filterDataTemplate3)
React.useEffect(()=>{
    //console.log('filterData3')
    //console.log(filterData3)
    if(filterData3.reloadBillForm){
        setFilterData3({
            ...filterData3,
            showBillForm:true,
            reloadBillForm:false
        })
    }
},[filterData3])


React.useEffect(()=>{
    // console.log('filterData2 PageComponent........')
    // console.log(filterData2)
     if(filterData4.reloadData){
         const {dataUrl,pageNumber,limitRow,sort,qry}=filterData4
     
         axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
         .then(result=>{
             //console.log(result)
             const temp2= genFilterDataWithIndex(result.data.data,filterData4.selectProduct)
             //console.log('temp2.....')
            // console.log(temp2)
             const tempResult={...filterData4,
                 data0:temp2,
                 count:result.data.count,
                 lastRecordId:result.data.lastRecordId,
                 reloadData:false
             }
             setFilterData4(tempResult)
         })
         .catch(error=>{
             const tempError={...filterData4,
                 reloadData:false,
                 message:catchErrorToMessage(error),
                 showModalConfirm:false,
                 showModalError:true,
             }
             console.log(tempError.message)
             setFilterData4(tempError)
         })
     }
 
 },[filterData4])

React.useEffect(()=>{
    if(filterData4.editData){
        setFilterData4({
            ...filterData4,
            customerConfirm:{
                ...filterData4.editData,
                partnerId:filterData4.editData.id
            }
        })
    }
},[filterData4.editData])


const setShowRange=(data)=>{setFilterData({...filterData,showRange:data})}
const setHeightTop=(data)=>{setFilterData({...filterData,heightTop:data})}
const setWidthLeft=(data)=>{setFilterData({...filterData,widthLeft:data})}
const setShowModalError=(data)=>{setFilterData({...filterData,showModalError:data})}
const setShowModalConfirm=(data)=>{setFilterData({...filterData,showModalConfirm:data})}
const setPageNumber=(data)=>{setFilterData({...filterData,pageNumber:data,reloadData:true})}
const setRawMatPageNumber=(data)=>{
    setFilterData2({...filterData2,pageNumber:data,reloadData:true})
}
const setPartnerPageNumber=(data)=>{
    setFilterData4({...filterData4,pageNumber:data,reloadData:true})
}

const billFormSetShowModalConfirm=(data)=>{
    setFilterData3({
        ...filterData3,
        showModalConfirm:data
    })
}

const setShowAdd=(data)=>{
    //console.log('setShowAdd')
    if(data){
        setFilterData3({
            ...filterData3,
            showBillForm:data,
            data0:{...filterDataTemplate3.blankData,
                   //branchId:basicData.branchId,
                   //branchName:basicData.branchName 
                   }
        })
    }
    else{
        setFilterData({
            ...filterData,
            showBillForm:data,
            data0:null
        })
    }
}

const setShowEdit=(data)=>{
    //console.log('setShowEdit')
    if(data){
        setFilterData3({
            ...filterData3,
            showBillForm:data,
            data0:filterData.editData
        })
    }
    else{
        setFilterData3({
            ...filterData3,
            showBillForm:data,
            data0:null
        })
    }
}

const setShowModalCsv=()=>{
    setFilterData({
        ...filterData,
        showModalCsv:true
    })
}

const setTableTemplate=(data)=>{setFilterData({...filterData,tableTemplate:data})}
const setDetailTableTemplate=(data)=>{setFilterData({...filterData,detailTableTemplate:data})}

const rawMatSetTableTemplate=(data)=>{setFilterData2({...filterData2,tableTemplate:data})}
const partnerSetTableTemplate=(data)=>{setFilterData4({...filterData4,tableTemplate:data})}


const setRawMatEditData=(data)=>{
    setFilterData2({...filterData2,editData:data})
}
const setPartnerEditData=(data)=>{
    setFilterData4({...filterData4,editData:data})
}

const setEditData=(data)=>{
    let tempData=data
    //console.log('data..........')
    //console.log(data)

 
    setFilterData({...filterData,editData:tempData})
    //captureEditData(data)
}
//to save filterData when sort Up and down each column
const setFilterDataData0=(data)=>{setFilterData({...filterData, data0:data})}
const setSort=(data)=>{setFilterData({...filterData,sort:data})}
const setLimitRow=(data)=>{setFilterData({...filterData,limitRow:data})}

const rawMatSetLimitRow=(data)=>{setFilterData2({...filterData2,limitRow:data})}
const rawMatSetSort=(data)=>{setFilterData2({...filterData2,sort:data})}

const partnerSetLimitRow=(data)=>{setFilterData4({...filterData4,limitRow:data})}
const partnerSetSort=(data)=>{setFilterData4({...filterData4,sort:data})}


const setUnSelectAllFunc=()=>{

    if(filterData.showRenderTransaction){
        setFilterData(setUnSelectAll(filterData))
    }
    else if(filterData.showRenderProduct){
        setFilterData2(setUnSelectAll(filterData2))
    }
    else if(filterData.showRenderCustomer){
        setFilterData4(setUnSelectAll(filterData4))
    }
    else{
        setFilterData(setUnSelectAll(filterData))
    }

}





const genFilterDataWithIndex=(filterData,selectProduct)=>{

    if(filterData){
        if(filterData.detail){
            if(filterData.detail.length()>0){
                let tempArray=[]

                filterData.detail.map(i=>{

                })

            }
        }
    }

    let tempSelectProduct
    if(selectProduct){tempSelectProduct=selectProduct}
    else {tempSelectProduct=[]}

    let tempArray=[]

    filterData.map((i,idx)=>{
         
        const temp={...i,selectedLine:false,_id:uuid()}
        tempArray=[...tempArray,temp]
        //const temp={...i,tempIndex:idx,selectedLine:false}
    })

    let tempArray2=[]

    tempArray.map(i=>{
        let tempObj=i
        tempSelectProduct.map(j=>{
            if(i.id==j.id){
                //console.log('j.id==i.id')
                tempObj={...tempObj,selectedLine:j.selectedLine}
                //tempArray2=[...tempArray2,]
            }
        })
        tempArray2=[...tempArray2,tempObj]
    })
 
    return tempArray2
}


const rawMatRefreshPage=()=>{
    const {limitRow,sort}=filterData2
    const temp = {...filterData2,selectProduct:[],
                editData:null,qry:null,reloadData:true
            }
    setFilterData2(temp)
}

const partnerRefreshPage=()=>{
    const {limitRow,sort}=filterData4
    const temp = {...filterData4,selectProduct:[],
                editData:null,qry:null,reloadData:true
            }
    setFilterData4(temp)
}


const refreshPage=()=>{
    //console.log('refreshPage')
    const {limitRow,sort}=filterData
    const temp = {...filterData, limitRow,sort,selectProduct:[],
                editData:null,qry:null,reloadData:true
            }
    setFilterData(temp)
    setReloadBasicData(true)
}

const submitFunctionDeleteFunc=async(data)=>{
    console.log('submitFunctionDeleteFunc filterData')
    console.log(filterData)
    const temp = await submitFunctionDelete(filterData,myheader)
    setFilterData(temp)
}


//============================
//============================
//============================

const billFormSaveTableTemplateFunc=(tableTemplate)=>{
    let tempObj={}
    Object.keys(tableTemplate).map(i=>{
       const temp={...tableTemplate[i],showColHead:true}
        tempObj={...tempObj,[i]:temp}
    })
    //console.log(tableTemplate)
    //console.log(tempObj)
    setBillTableTemplate(tempObj)
    saveTableTemplate(tableTemplate,'p35tabletemplate',
                    'productDetailTableTemplateForForm',myheader)
}


const setShowModalConfirmFunc=(data)=>{
    setFilterData({...filterData,
        showModalConfirm:data,
        dataToDelete:null
    })
}

const billFormSetShowModalConfirmFunc=(data)=>{
    setFilterData3({...filterData3,
        showModalConfirm:data
    })
}

const billFormSubmitFunctionDeleteFunc=()=>{
   // const {dataToDelete}=filterData3
    console.log('delete.......')
    //const temp = await submitFunctionDelete(data,myheader)
    //setFilterData(temp)
    axios.post(`/p35transaction/deletetransaction`,{id:filterData3.data0.id},myheader)
    .then(result=>{
        console.log('done delete.............')
        const temp={...filterData,
            reloadData:true,
        }
        setFilterData(temp)
        setFilterData3({...filterData3,
            showBillForm:false,
            data0:null,
            isGenIdOfBillForm:false,
            showModalConfirm:false
        })
    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:false,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)
    })
    
}

const billFormSubmitFunctionEditFunc=async (data)=>{
    console.log(`edit.......`)

    const {_id,detail,...remaining}=data
    let tempArray=[]
    detail.map(i=>{
        const {_id,...remaining2}=i
        tempArray=[...tempArray,remaining2]
    })

    const tempObj={...remaining,detail:tempArray}

    //console.log('tempObj')
    //console.log(tempObj)

    //const temp = await submitFunctionEdit(formInputState,filterData,stateTemplate,myheader)
    //setFilterData(temp)
    axios.post(`/p35transaction/updatetransaction`,tempObj,myheader)
    .then(result=>{
        console.log('done edit.............')
            const temp={...filterData,
                reloadData:true,
            }
            setFilterData(temp)
            setFilterData3({...filterData3,
                showBillForm:false,
                data0:null,
                isGenIdOfBillForm:false,
            })

    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:false,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)

    })
}

const billFormSubmitFunctionAddFunc=async (data)=>{
    console.log(`add.......`)
    console.log(data)
    //const temp = await submitFunctionAdd(formInputState,filterData,stateTemplate,myheader)
    //setFilterData(temp)
    
    const {_id,detail,...remaining}=data
    let tempArray=[]
    detail.map(i=>{
        const {_id,...remaining2}=i
        tempArray=[...tempArray,remaining2]
    })

    const tempObj={...remaining,detail:tempArray}
    
    //console.log('tempObj')
    //console.log(tempObj)

    axios.post(`/p35transaction/addtransaction`,tempObj,myheader)
    .then(result=>{
        console.log('done add............')
        
        const temp={...filterData,
            reloadData:true,
        }
        setFilterData(temp)
        setFilterData3({...filterData3,
            showBillForm:false,
            data0:null,
            isGenIdOfBillForm:false,
        })
    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:true,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)

    })
}

//===================================
//===================================
//===================================


//{pageNumber,limitRow,sort,dataUrl} = filterData
const filterAxiosFunc=(option,inputState)=>{
    //console.log('filterAxios')
    //console.log(filterTemplate)
    filterAxios(option,inputState,filterTemplate,filterData,myheader)
    .then(result=>{
        console.log("result.....")
        console.log(result)
        const temp2= genFilterDataWithIndex(result.data0,filterData.selectProduct)
        //console.log('result......')
        //console.log(result)
        setFilterData({...result,data0:temp2})
    })
    .catch(error=>setFilterData(error))
}


//{pageNumber,limitRow,sort,dataUrl} = filterData
const rawMatFilterAxiosFunc=(option,inputState)=>{
    //console.log('rawMatFilterAxiosFunc.......')
    const {pageNumber,limitRow,sort,dataUrl} = filterData2

    //console.log(filterTemplate)
    filterAxios(option,inputState,rawMatFilterTemplate,filterData2,myheader)
    .then(result=>{
        //console.log("result.....")
        //console.log(result)
        const temp2= genFilterDataWithIndex(result.data0,filterData2.selectProduct)
        //console.log(result)
        //console.log(temp2)
        setFilterData2({...result,data0:temp2})
    })
}

//{pageNumber,limitRow,sort,dataUrl} = filterData
const partnerFilterAxiosFunc=(option,inputState)=>{
    console.log('partnerFilterAxiosFunc.......')
    const {pageNumber,limitRow,sort,dataUrl} = filterData4

    //console.log(filterTemplate)
    filterAxios(option,inputState,partnerFilterTemplate,filterData4,myheader)
    .then(result=>{
        //console.log("result.....")
        //console.log(result)
        const temp2= genFilterDataWithIndex(result.data0,filterData4.selectProduct)
        //console.log(result)
        //console.log(temp2)
        setFilterData4({...result,data0:temp2})
    })
}



const filterDataByGroup=(i)=>{
    const {folders,...remaining}=i
    const temp = {...filterData,
        pageNumber:1,
        qry:{groupId:i.id},
        selectGroup:remaining,
        reloadData:true}
    setFilterData(temp)
}

const rawMatFilterDataByGroup=(i)=>{
    
    //console.log('rawMatFilterDataByGroup')
    const {folders,...remaining}=i
    const temp = {...filterData2,
        pageNumber:1,
        qry:{groupId:i.id},
        selectGroup:remaining,
        reloadData:true}
    setFilterData2(temp)
    
}


const saveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData.tableTemplateName,myheader)
}

const rawMatSaveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData2
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData2.tableTemplateName,myheader)
}

const partnerSaveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData4
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData4.tableTemplateName,myheader)
}


const updateFilterDataFunc=(index,i)=>{
    const temp=updateFilterData(index,i,filterData)
    //console.log('temp')
    //console.log(temp)
    setFilterData({...filterData,...temp})
}

const rawMatUpdateFilterDataFunc=(index,i)=>{
    const temp=updateFilterData(index,i,filterData2)
    //console.log('temp')
    //console.log(temp)
    setFilterData2({...filterData2,...temp})
}

const partnerUpdateFilterDataFunc=(index,i)=>{
    const temp=updateFilterData(index,i,filterData4)
    //console.log('temp')
    //console.log(temp)
    setFilterData4({...filterData4,...temp})
}


const closeBillForm=()=>{
    setFilterData3({...filterData3,
        showBillForm:false,
        data0:null
    })
}
//----------------------------
const customerConfirmSubmitFunc=()=>{

    const {id,title,name,partnerType,phone,selectAddress}=filterData4.customerConfirm
    const tempCustomer={
        partnerId:id,
        title:title,
        name:name,
        partnerType:partnerType,
        phone:phone,
        address:selectAddress
    }   

    setFilterData3({...filterData3,
        data0:{
            ...filterData3.data0,
            ...tempCustomer
        },
        showCustomerConfirm:false,
        showBillForm:false,
        reloadBillForm:true
    })

}
//----------------------------
const transactionConfirmSubmitFunc=()=>{
    let tempEditData=filterData.editData

    if(!filterData3.includeTransactionHead){
        tempEditData={...filterData3.data0,
            detail:[...filterData3.data0.detail,
                    ...filterData.editData.detail
                    ]
        }
    }

    setFilterData3({...filterData3,
        data0:tempEditData,
        showTransactionConfirm:false,
        showBillForm:false,
        reloadBillForm:true
    })
  
}


const transactionConfirmCancelFunc=()=>{
    setFilterData3({...filterData3,
        showTransactionConfirm:false
    })
}

const changeIncludeTransactionHead=()=>{
    setFilterData3({...filterData3,
        includeTransactionHead:!filterData3.includeTransactionHead
    })
}

const captureSelectProductToBillForm=()=>{
    //console.log('filterData2.selectProduct')
    //console.log(filterData2.selectProduct)
    let tempArray=[]

    filterData2.selectProduct.map(i=>{
        const {detail,...remaining}=i

        if(i.selectedLine){
            tempArray=[...tempArray,{...remaining,_id:uuid(),quantity:0,result:0}]
        }
    })

    const tempDetail=[...filterData3.data0.detail,...tempArray]

    const tempData0={...filterData3.data0,detail:tempDetail}

    setFilterData3({...filterData3,
        data0:tempData0,
        showBillForm:false,
        reloadBillForm:true
    })

}

//-----------------------------

//-----------------------------

//==============================
const renderFilter=({filterData,filterTemplate,inputState,
                     setLimitRow,
                     setSort,
                     filterAxiosFunc,pageFilterForm
                    })=>{
    const {limitRow,sort}=filterData

    return (
        <div className="" style={{marginBottom:"1rem"}}>
            <ModalFilterInput
            show={true} setShow={()=>{}}
            
            filterTemplate={filterTemplate}

            inputState={inputState} 
            setInputState={()=>{}}
            
            limitRow={limitRow} 
            setLimitRow={setLimitRow}
            
            sort={sort} 
            setSort={setSort}
            
            filterAxios={filterAxiosFunc}
            basicData={basicData}
            
            LB={pageFilterForm}
            />
        </div>
    )
}
//-----------------------------
//-----------------------------
//-----------------------------

//-----------------------------
const renderTransaction=()=>{
    //tableTemplate[filterDataTemplate.tableTemplateName]
    
    let tempTransactionTableTemplate=tableTemplate[filterDataTemplate.tableTemplateName]
    let tempSelectedLine=tempTransactionTableTemplate.selectedLine
    tempSelectedLine={...tempSelectedLine,showCol:false}

    tempTransactionTableTemplate={...tempTransactionTableTemplate,selectedLine:tempSelectedLine}
   
    
    return(
        <div className="w-100">
        {
            renderFilter({
                filterData:filterData,
                filterTemplate:filterTemplate,
                inputState:inputState,
                setLimitRow:setLimitRow,
                setSort:setSort,
                filterAxiosFunc:filterAxiosFunc,
                pageFilterForm:pageFilterForm
               })
        }
        
        {
         filterData3.showBillForm
         ?renderRight({...filterData,

                    tableTemplate:tempTransactionTableTemplate,
                    //================
                    badgeState:{...filterData.badgeState,
                        reloadShow:true,
                        addShow:false,
                        editShow:false,
                        
                        delShow:false,
                        printerShow:false,
                        csvShow:false,
                        forwardShow:filterData.editData?true:false,
                    }})
         :null   
        }

        </div>

    )
}
//-----------------------------
const renderCustomer=()=>{
    console.log('renderCustoer')
    return(
        <div className="w-100 h-100">
          {
            renderFilter({
                filterData:filterData4,
                filterTemplate:partnerFilterTemplate,
                inputState:partnerInputState,
                setLimitRow:partnerSetLimitRow,
                setSort:partnerSetSort,
                filterAxiosFunc:partnerFilterAxiosFunc,
                pageFilterForm:partnerFilterForm
            })
        }

        {
            renderRawMatRight({
                filterData:{...filterData4,
                                badgeState:{...filterData4.badgeState,
                                    addShow:false,
                                    editShow:false,
                                    delShow:false,
                                    printerShow:false,
                                    csvShow:false,
                                    forwardShow:filterData4.editData?true:false,
                                    bullEyeShow:false
                                }},
                setPageNumber:setPartnerPageNumber,
                setReloadData:partnerRefreshPage,
                setShowForwardConfirm:()=>{
                   // console.log('setShowForwardConfrim')
                    setFilterData3({...filterData3,showCustomerConfirm:true})
                },//captureSelectProductToBillForm,
                setTableTemplate:partnerSetTableTemplate,
                setFilterData:setFilterData4,
                setEditData:setPartnerEditData,
                saveTableTemplateFunc:partnerSaveTableTemplateFunc,
                updateFilterData:partnerUpdateFilterDataFunc,
                bgColor:"#74b979"
            })
        }



        </div>
    )
}

//-----------------------------
const renderProduct=()=>{
    console.log('renderProduct')
    console.log(filterData2)


    return(
        <div className="w-100">
        {
        renderFilter({
            filterData:filterData2,
            filterTemplate:rawMatFilterTemplate,
            inputState:rawMatInputState,
            setLimitRow:rawMatSetLimitRow,
            setSort:rawMatSetSort,
            filterAxiosFunc:rawMatFilterAxiosFunc,
            pageFilterForm:rawMatPageFilterForm
           })
        }

        {
        filterData2.groupDataUrl&&pageData&&
        <div className="" style={{marginBottom:"4rem"}}>
            <NewGroup
                myheader={myheader}
                dataUrl={filterData2.groupDataUrl}
                filterByGroupId={rawMatFilterDataByGroup}
                captureEditGroup={()=>{}}
                bgColor={"#e5d1db"}
                pageData={pageData}
            />
        </div>
        }

        {
        renderRawMatRight({
            filterData:{...filterData2,
                            badgeState:{...filterData2.badgeState,
                                addShow:false,
                                editShow:false,
                                delShow:false,
                                printerShow:false,
                                csvShow:false,
                                forwardShow:filterData2.selectProduct.length>0?true:false,
                                unSelectShow:true
                            }},
            setPageNumber:setRawMatPageNumber,
            setReloadData:rawMatRefreshPage,
            setShowForwardConfirm:captureSelectProductToBillForm,
            setTableTemplate:rawMatSetTableTemplate,
            setFilterData:setFilterData2,
            setEditData:setRawMatEditData,
            saveTableTemplateFunc:rawMatSaveTableTemplateFunc,
            updateFilterData:rawMatUpdateFilterDataFunc,
            bgColor:"#e5d1db"
        })
        }
        </div>
    )
}
//-----------------------------
//-----------------------------
const renderGroup=()=>{

    return (
    <div className="w-100"
         style={{overflowX:"hidden",
                 paddingBottom:"5rem"}}>
        
        <div className="w-100" 
             style={{display:"flex",alignItems:"center",height:"2rem",
             backgroundColor:filterData.badgeColor}}
             >
            {
            //filterData3.showBillForm&&
            <div className="iconbox" 
                onClick={e=>{setFilterData({...filterData,
                    showRenderTransaction:false,
                    showRenderProduct:false,
                    showRenderCustomer:true,
                    badgeColor:"#74b979"
                    })
                }}
            >
                  <Ticon 
                      iconName="MdPerson"
                      className={filterData.showRenderCustomer?"md-icon ft-brown":"md-icon"} 
                      textStyle={{color:"black"}}
                      //style={{marginRight:"1.2rem",
                      //        color:filterData.showRenderCustomer?"#8b4131":"black" 
                      // }}
               
                    />
            </div>
          
            }

            {
            //filterData3.showBillForm&&

            <div className="iconbox"
                onClick={e=>{setFilterData({...filterData,
                    showRenderTransaction:false,
                    showRenderProduct:true,
                    showRenderCustomer:false,
                    badgeColor:"#e5d1db"
                    })
                }}
            >
                <Ticon
                    iconName="MdFastfood" 
                    className={filterData.showRenderProduct?"md-icon ft-brown":"md-icon"}
                    textStyle={{color:"black"}}
                    //style={{marginRight:"1.2rem",
                    //          color:filterData.showRenderProduct?"#8b4131":"black"
                    //}}
                />
            </div>
           
            }

            
            <div className="iconbox"
                 onClick={e=>{setFilterData({...filterData,
                    showRenderTransaction:true,
                    showRenderProduct:false,
                    showRenderCustomer:false,
                    badgeColor:"#72a2d9"
                    })
                }}

            >
                 <Ticon
                     iconName="FaRegMoneyBillAlt" 
                     className={filterData.showRenderTransaction?"md-icon ft-brown":"md-icon"}
                     textStyle={{color:"black"}}
                    //style={{marginRight:"1.2rem",
                    // color:filterData.showRenderTransaction?"#8b4131":"black"
                    //}}
                
                />
            </div>
           
        </div>

        <div className="w-100">
            {
             filterData.showRenderTransaction&&
                renderTransaction()
            }
            {
             filterData.showRenderProduct&&
                renderProduct()   
            }
            { 
             filterData.showRenderCustomer&&
                renderCustomer()  
            }


        </div>

    </div>
    )
}
//------------------------
//-----------------------------
const renderRight=(filterData)=>{
    //console.log('filterData')
    //console.log(filterData)
    return(
    <div className="w-100 h-100">
        <div className="hide-on-print"
        style={{height:filterData3.showBillForm?"2rem":"5%",
                width:"100%",
        }}
        >
            {
                renderBadge({
                    filterData,
                    //badgeState:{...filterData.badgeState,
                    //    addFunc:
                    //},
                    setPageNumber:setPageNumber,
                    
                    totalSwapPage:1, 
                    setSwapState:()=>{},
                    
                    setReloadData:refreshPage,
                    setShowFilter:()=>{},
                    setShowAdd:setShowAdd,
                    setShowEdit:setShowEdit,
                    setShowModalConfirm:setShowModalConfirm,
                    setShowModalCsv:setShowModalCsv,
                    setUnSelectAll:setUnSelectAllFunc,
                    setShowForwardConfirm:(value)=>{setFilterData3({...filterData3,showTransactionConfirm:value})},
                    setClose:()=>{},
                    bgColor:"#72a2d9",
                    captureSelect:()=>{}//captureSelect
                })        
            }

        </div>

        <div className=""
                style={{height:"95%",width:"100%"}}
        >
            <div style={{height:"100%",width:"100%"}}
                className="show-on-print"
            >
                {
                    filterData.data0
                    ?<Table
                        colorHead={"#4b6d62"}
                        tableTemplate={filterData.tableTemplate}
                        setTableTemplate={setTableTemplate}
        
                        filterData={filterData.data0}
                        setFilterData={setFilterDataData0}
                        
                        editData={filterData.editData}
                        setEditData={setEditData}
                        saveTableTemplateFunc={saveTableTemplateFunc}
                        isSubTable={false}
                        updateFilterData={updateFilterDataFunc}
                        useInput={false}
                        
                    />
                    :null
                }
            </div>
            
        </div>
    </div>
    )
}
//=============================

//============================


//-----------------------------

//
const renderRawMatRight=({
                            filterData,setPageNumber,
                            setReloadData,setShowForwardConfirm,
                            setTableTemplate,setFilterData,
                            setEditData,saveTableTemplateFunc,
                            updateFilterData,bgColor
                        })=>{

    console.log('renderRawMatRight')
    console.log(filterData)

    return(
    <div className="w-100">
        <div className="hide-on-print"
        style={{height:"2rem",width:"100%"}}
        >
            {filterData.data0&&
                    renderBadge({
                        filterData,
                        setPageNumber,//setRawMatPageNumber,
                        
                        totalSwapPage:1, 
                        setSwapState:()=>{},
                        
                        setReloadData,//rawMatRefreshPage,
                        setShowFilter:()=>{},
                        setShowAdd:()=>{},
                        setShowEdit:()=>{},
                        setShowModalConfirm:()=>{},
                        setShowModalCsv:()=>{},
                        setUnSelectAll:setUnSelectAllFunc,
                        setClose:()=>{},
                        setShowForwardConfirm,//captureSelectProductToBillForm,
                        bgColor:bgColor,
                        captureSelect:()=>{}//captureSelect
                    })        
                }

        </div>

        <div className=""
                style={{height:"95%",width:"100%"}}
        >
            <div style={{height:"100%",width:"100%"}}
                className="show-on-print"
            >
                {
                filterData.data0
                ?<Table
                    colorHead={"#4b6d62"}
                    tableTemplate={filterData.tableTemplate}
                    setTableTemplate={setTableTemplate}//{rawMatSetTableTemplate}

                    filterData={filterData.data0}
                    setFilterData={setFilterData}//{setFilterData2}
                    
                    editData={filterData.editData}
                    setEditData={setEditData}//{setRawMatEditData}
                    saveTableTemplateFunc={saveTableTemplateFunc}//{rawMatSaveTableTemplateFunc}
                    isSubTable={false}
                    updateFilterData={updateFilterData}//{rawMatUpdateFilterDataFunc}
                    useInput={false}
                    
                />
                :null
                }
            </div>
            
        </div>
    </div>
    )
}


//-----------------------------
const renderBillForm=()=>{
    return(
    <BillForm
        blankData={filterDataTemplate3.blankData}
        dataIdx={"cancel"}
        closeBillForm={closeBillForm}
        data={filterData3.data0}
        selectOfSelectProduct={()=>{}}//{selectProductToBillForm}
        setResetProductList={()=>{}}//{setResetProductList}
        pageData={pageData} 
        basicData={basicData}
        tableTemplate={billTableTemplate}
        saveTableTemplateFunc={billFormSaveTableTemplateFunc}
        submitFunctionAddFunc={billFormSubmitFunctionAddFunc}
        submitFunctionEditFunc={billFormSubmitFunctionEditFunc}
        submitFunctionDeleteFunc={billFormSetShowModalConfirmFunc}
        isGenIdOfBillForm={filterData3.isGenIdOfBillForm}
        runIsGenId={(value)=>{
            //console.log('runGenIdOfBillForm')
            //console.log(value)
            setFilterData3({...filterData3,
            isGenIdOfBillForm:value
        })
        }}
        
        updateData={(data)=>{
            //console.log('data')
            //console.log(data)

            setFilterData3({...filterData3,
                data0:data,
                ///reloadData:true,
                //showBillForm:false
            })
        }}
        myheader={myheader}
        calDigit={calDigit}
    />
    )
}



//==============================
const renderBody=()=>{
return(
    filterData&&
    <div className=""
             style={{display:"flex",height:"95%",width:"100%"}}
    >
            
            <div className="hide-on-print" 
                 style={{height:"100%",
                         width:`${filterData.widthLeft}%`,
                         overflowY:"scroll"
                         }}>
                     {
                       renderGroup()
                     }
            </div>
        
            <div className="" 
                style={{height:"100%",width:`${100-filterData.widthLeft}%`}}>
                 {
                    !filterData3.data0&&!filterData3.showBillForm
                    ?renderRight({...filterData,
                        badgeState:{...filterData.badgeState,
                            reloadShow:true,
                            editShow:filterData.editData?true:false,
                            addShow:true,
                            delShow:true,
                            csvShow:true,
                            printerShow:true,
                            bullEyeShow:true,
                            unSelectShow:true
                        }
                    }) 
                    :!filterData3.showBillForm
                     ?null
                     :renderBillForm()
                   
                 }
            </div>
    </div>
)
}
//================================
//=================================


//=================================
return(
<div className="w-100 h-100">
    {   
      renderBody()    
    }
   
    <div className="hide-on-print" 
        style={{width:"100%",display:"flex",position:"relative"}}>
            {
            renderWidthRangeBar({showRange:filterData.showRange,
                                setShowRange:setShowRange,
                                widthLeft:filterData.widthLeft,
                                setWidthLeft:setWidthLeft,
                                //heightTop:filterData.heightTop,
                                //setHeightTop:setHeightTop
                            })
            }
   
    </div>

    {filterData.showModalCsv
    ?<ModalCsv
        filterDataTemplate={filterDataTemplate}
        inputState={inputState}
        filterTemplate={filterTemplate}
        myheader={myheader}
        pageFilterForm={pageFilterForm}
        basicData={basicData}
        cancelFunc={e=>{setFilterData({...filterData,showModalCsv:false})}}
    />//renderModalCsv()
    :null
    }

    {filterData3.showTransactionConfirm&&
      renderTransactionConfirm({
          editTransaction:filterData.editData,
          submitFunc:transactionConfirmSubmitFunc,
          cancelFunc:transactionConfirmCancelFunc,
          pageData:pageData,
          changeIncludeTransactionHead:changeIncludeTransactionHead,
          includeTransactionHead:filterData3.includeTransactionHead
        })
    }
    
    {
    filterData3.showCustomerConfirm&&
      renderCustomerConfirm({
            filterData:filterData4,
            setFilterData:setFilterData4,
            basicData:basicData,
            customerConfirmForm:pageData.customerConfirmForm,
            submitFunc:customerConfirmSubmitFunc,
            cancelFunc:()=>{
                setFilterData3({...filterData3,showCustomerConfirm:false})
            }
        })
    }




    {
    filterData.showModalConfirm
    ?<ModalConfirm
        setShow={setShowModalConfirm}
        submitFunction={submitFunctionDeleteFunc}
    />
    :null
    }

    {
    filterData3.showModalConfirm
    ?<ModalConfirm
        setShow={billFormSetShowModalConfirm}
        submitFunction={billFormSubmitFunctionDeleteFunc}
    />
    :null
    }

    {  
    filterData.showModalError
    ?renderModalError({
        setShow:setShowModalError,
        message:filterData.message
    })
    :null
    }
</div>
)

}




export default PageComponentTransaction ;















*/