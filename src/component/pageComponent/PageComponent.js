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
import NewGroup from '../../component/newgroup/NewGroup'

import PageForm from '../../render/renderForm/PageForm'
import ModalCsv from './ModalCsv'
import BillForm from '../../page/bill/BillForm'
import renderTransactionConfirm from '../../page/bill/renderTransactionConfirm';
import {FaCheck,FaBan,FaFolder} from 'react-icons/fa';

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil

function PageComponent(props) {

console.log('PageComponent')
//const {basicDataSt,tokenSt,setReloadCheckToken,myheader}=React.useContext(MainContext)

const {filterDataTemplate,filterDataTemplate2,filterDataTemplate3,
      pageFilter,pageFilterForm,...remaining}=props



const {filterTitle,inputState,filterTemplate,myheader,basicDataSt,
      formTemplate,editFormTemplate,stateTemplate,
      groupFormTemplate,groupEditFormTemplate,
      pageDataModalForm,
      addFormTitle,
      editFormTitle,
      groupAddFormTitle,
      groupEditFormTitle,
      bgColor,
      calDigit,
      setReloadBasicData

}=props

const {basicData,pageData,tableTemplate,reloadBasicData}=basicDataSt
//console.log('tableTemplate............dddddddddd')
//console.log(tableTemplate)

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
    detailTableTemplate:
    filterDataTemplate.detailTableTemplateName
    ?tableTemplate[filterDataTemplate.detailTableTemplateName]
    :null,
    detailTableTemplateForForm:
    filterDataTemplate.detailTableTemplateForFormName?
    tableTemplate[filterDataTemplate.detailTableTemplateForFormName]
    :null,
    widthLeft:basicData.widthLeft,
    limitRow:basicData.limitRow
})


React.useEffect(()=>{
    //console.log('filterData PageComponent')
    //console.log(filterData)

    if(filterData.reloadData){
        const {dataUrl,pageNumber,limitRow,sort,qry}=filterData
    
        axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
        .then(result=>{
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



const setShowRange=(data)=>{setFilterData({...filterData,showRange:data})}
const setHeightTop=(data)=>{setFilterData({...filterData,heightTop:data})}
const setWidthLeft=(data)=>{setFilterData({...filterData,widthLeft:data})}
const setShowModalError=(data)=>{setFilterData({...filterData,showModalError:data})}
const setShowModalConfirm=(data)=>{setFilterData({...filterData,showModalConfirm:data})}
const setPageNumber=(data)=>{setFilterData({...filterData,pageNumber:data,reloadData:true})}

const setShowAdd=(data)=>{
    console.log('setShowAdd')
    console.log(data)
    setFilterData({
        ...filterData,
        showAdd:data
        
    })
}

const setShowEdit=(data)=>{
    console.log('setShowEdit')
    console.log(data)
    setFilterData({
        ...filterData,
        showEdit:data
    })
}

const setShowModalCsv=()=>{
    setFilterData({
        ...filterData,
        showModalCsv:true
    })
}

const setTableTemplate=(data)=>{setFilterData({...filterData,tableTemplate:data})}
const setDetailTableTemplate=(data)=>{setFilterData({...filterData,detailTableTemplate:data})}



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

const setSelectGroupFunc=(data)=>{
    console.log('selectGroupFunc....')
    //console.log(data)
    setFilterData({...filterData,selectGroup:data})
}

const setUnSelectAllFunc=()=>{
    setFilterData(setUnSelectAll(filterData))
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



const refreshPage=()=>{
    //console.log('refreshPage')
    const {limitRow,sort}=filterData
    const temp = {...filterData, limitRow,sort,selectProduct:[],
                editData:null,qry:{},reloadData:true
            }
    setFilterData(temp)
    setReloadBasicData(true)
}

const submitFunctionDeleteFunc=async(data)=>{
    submitFunctionDelete(filterData,myheader)
    .then(result=>setFilterData(result))
    .catch(error=>setFilterData(error))
}

const submitFunctionEditFunc=async (formInputState)=>{
    submitFunctionEdit(formInputState,filterData,stateTemplate,myheader)
    .then(result=>{
        
        setFilterData(result)
    })
    .catch(error=>setFilterData(error))
}

const submitFunctionAddFunc=async (formInputState)=>{
    
    submitFunctionAdd(formInputState,filterData,stateTemplate,myheader)
    .then(result=>setFilterData(result))
    .catch(error=>setFilterData(error))
}

//{pageNumber,limitRow,sort,dataUrl} = filterData
const filterAxiosFunc=(option,inputState)=>{
    console.log('filterAxios')
    //console.log(filterTemplate)
    filterAxios(option,inputState,filterTemplate,filterData,myheader)
    .then(result=>{
        console.log("result.....")
        //console.log(result)
        const temp2= genFilterDataWithIndex(result.data0,filterData.selectProduct)
        //console.log('result......')
        //console.log(result)
        setFilterData({...result,data0:temp2})
    })
    .catch(error=>setFilterData(error))
}



const filterDataByGroup=(i)=>{
    console.log('filterDataByGroup.........')
    //console.log(i)
    //const {folders,...remaining}=i
    const temp = {...filterData,
        pageNumber:1,
        qry:{groupId:i.id},
        //selectGroup:remaining,
        reloadData:true}
    setFilterData(temp)
}



const saveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData.tableTemplateName,myheader)
}


const updateFilterDataFunc=(index,i)=>{

    const temp=updateFilterData(index,i,filterData)
    console.log('temp')
    console.log(temp)
    setFilterData({...filterData,...temp})
}

const closeBillForm=()=>{
    setFilterData({...filterData,
        showAdd:false,showEdit:false
    })
}
//----------------------------
const transactionConfirmSubmitFunc=()=>{
    let tempEditData=filterData.editData

    if(!filterData.includeTransactionHead){
        tempEditData={...filterData.editData,
            detail:[...filterData.editData.detail,
                    ...filterData.editData.detail
                    ]
        }
    }

    setFilterData({...filterData,
        data1:tempEditData,
        showTransactionConfirm:false,
        showBillForm1:false,
        reloadBillForm1:true
    })
  
}


const transactionConfirmCancelFunc=()=>{
    setFilterData({...filterData,
        showTransactionConfirm:false
    })
}
//=============================

//-----------------------------
const renderTable=()=>{

    //console.log('renderTable')
    //console.log(filterData)

    return (
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
    )
}

//-----------------------------
const renderFilter=()=>{
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
const renderGroup=()=>{

    return (
    <div className="w-100" 
         style={{ooverflowX:"hidden",
                 paddingBottom:"5rem"}}>
        {
            renderFilter()
        }
       
        {
        filterData.groupDataUrl&&pageData
        ?<div className="" style={{margin:"1rem 0"}}>
            <NewGroup
                myheader={myheader}
                dataUrl={filterData.groupDataUrl}
                filterByGroupId={filterDataByGroup}
                captureEditGroup={setSelectGroupFunc}
                bgColor={bgColor}
                pageData={pageData}
            />
        </div>
        :null
        }

        {
         filterData.showAdd||filterData.showEdit
         ?renderRight({...filterData,
                    badgeState:{...filterData.badgeState,
                        addShow:false,
                        editShow:false,
                        delShow:false,
                        printerShow:false,
                        csvShow:false,
                        forwardShow:false
                    }})
         :null   
        }
    </div>
    )
}
//------------------------
//-----------------------------
const renderRight=(filterData)=>{
    //console.log('renderRight')
    //console.log(renderRight)

    return(
    <div className="w-100 h-100">
        <div className="hide-on-print"
        style={{height:filterData.showAdd||filterData.showEdit?"2rem":"5%",width:"100%"}}
        >
            {
                    renderBadge({
                        filterData,
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
                        setShowForwardConfirm:(value)=>{setFilterData({...filterData,showTransactionConfirm:value})},
                        setClose:()=>{},
                        bgColor:bgColor,
                        captureSelect:()=>{}//captureSelect
                    })        
            }

        </div>

        <div className=""
                style={!filterData.showEdit&&!filterData.showAdd
                        ?{width:"100%",height:"95%"}
                        :{width:"100%"}
                    }//height:"95%"
        >
            <div style={!filterData.showEdit&&!filterData.showAdd
                    ?{width:"100%",height:"100%"}
                    :{width:"100%"}
                }//height:"100%"
                className="show-on-print"
            >
                {
                    renderTable()
                }
            </div>
            
        </div>
    </div>
    )
}
//=============================



//-----------------------------
const renderBillForm=(loadData)=>{
    return(
    <BillForm
        blankData={filterDataTemplate3.blankData}
        dataIdx={"cancel"}
        closeBillForm={closeBillForm}
        data={loadData}
        selectOfSelectProduct={()=>{}}//{selectProductToBillForm}
        setResetProductList={()=>{}}//{setResetProductList}
        pageData={pageData} 
        basicData={basicData}
        tableTemplate={billTableTemplate}
        saveTableTemplateFunc={()=>{}}//{saveTableTemplateFunc}
        submitFunctionAddFunc={()=>{}}//{submitFunctionAddFunc}
        submitFunctionEditFunc={()=>{}}//{submitFunctionEditFunc}
        submitFunctionDeleteFunc={()=>{}}//{submitFunctionDeleteFunc}
        isGenIdOfBillForm={false}//{filterData.isGenIdOfBillForm1}
        runIsGenId={()=>{}}//{runIsGenIdOfBillForm1}
        updateData={()=>{}}//{updateData}
        bgColor={"#72a2d9"}
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
                         overflowY:"scroll",
                         overflowX:"hidden"
                         }}>
                     {
                       renderGroup()
                     }
            </div>
        
            <div className="" 
                style={{height:"100%",width:`${100-filterData.widthLeft}%`}}>
                 {
                    filterData.showAdd
                    ?renderPageFormAdd()
                    :filterData.showEdit
                      ?renderPageFormEdit()
                      :renderRight(filterData) 
                 }
            </div>
    </div>
)
}
//===============================
//===============================
const renderPageFormAdd=()=>{

    return(
        <PageForm
        isAddForm={true}
        lb={addFormTitle}
        formTemplate={formTemplate}
        stateTemplate={stateTemplate}
        selectData={{basicData:basicData}}
    
        iconAction={[()=>{}]}
        iconActionData={null}
        iconActionDataDetail={null}
        loadData={{id:parseInt(filterData.lastRecordId)+1}}
        keyName={filterData.keyName}
        setShow={setShowAdd}
    
        calculation={null}
        submitFunction={submitFunctionAddFunc}
        selectGroup={filterData.selectGroup}
        setSelectGroup={setSelectGroupFunc}
        selectProduct={filterData.selectProduct}
        pageDataModalForm={pageDataModalForm}
        dataUrl={filterData.dataUrl}
        myheader={myheader}
        tableTemplateUrl={filterData.tableTemplateUrl}
        tableTemplateName={filterData.detailTableTemplateForFormName}
        detailTableTemplate={filterData.detailTableTemplateForForm}
        calDigit={calDigit}
    />
    )

}


//==================================
const renderPageFormEdit=()=>{

        return(
            <PageForm
                lb={editFormTitle}
                formTemplate={editFormTemplate}
                stateTemplate={stateTemplate}
                selectData={{basicData:basicData}}
            
                iconAction={[()=>{}]}
                iconActionData={null}
                iconActionDataDetail={null}
                loadData={filterData.editData}
                keyName={filterData.keyName}
                setShow={setShowEdit}
            
                calculation={null}
                submitFunction={submitFunctionEditFunc}
                selectGroup={filterData.selectGroup}
                setSelectGroup={setSelectGroupFunc}
                selectProduct={filterData.selectProduct}
                pageDataModalForm={pageDataModalForm}
                dataUrl={filterData.dataUrl}
                myheader={myheader}

                tableTemplateUrl={filterData.tableTemplateUrl}
                tableTemplateName={filterData.detailTableTemplateForFormName}
                detailTableTemplate={filterData.detailTableTemplateForForm}
            />  
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

    {filterData.showTransactionConfirm&&
      renderTransactionConfirm({
          editTransaction:filterData.editData,
          submitFunc:transactionConfirmSubmitFunc,
          cancelFunc:transactionConfirmCancelFunc,
          pageData:pageData,
          changeIncludeTransactionHead:()=>{},//changeIncludeTransactionHead,
          includeTransactionHead:filterData.includeTransactionHead
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




export default PageComponent ;




/*




















*/