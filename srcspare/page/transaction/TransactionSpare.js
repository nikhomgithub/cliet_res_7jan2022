

import React from 'react';
import axios from 'axios'
import {MainContext} from '../../context/MainContext'
import Table from '../../component/table/Table'
import uuid from 'react-uuid'
import ModalConfirm from '../../render/ModalConfirm'

//import Badge from '../../render/renderBadge/Badge'
import renderBadge from '../../render/renderBadge/renderBadge'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import StateUtil from '../../model/StateUtil'

import FilterTemplate from '../../render/renderFilter/FilterTemplate'

import filterDataTemplate from './filterDataTemplate'

import inputState from '../../component/table/inputState'
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'
import tableTemplate from '../../component/table/tableTemplate'

import PageForm from '../../render/renderForm/PageForm'
import renderModalError from '../../render/renderModalError'
import axiosUtil from '../../util/axiosUtil'

import ctUtil from '../../util/ctUtil'

import NewGroupComponent from '../../render/renderTree/NewGroupComponent'
import renderWidthRangeBar from '../../component/table/renderWidthRangeBar'
import renderHeightRangeBar from '../../component/table/renderHeightRangeBar'

import pageUtil from '../util/pageUtil'

const dataTableTemplateName="transactionTableTemplate"
const detailTableTemplateName="productDetailTableTemplate"
const {createTableTemplateForPage,convertTableTemplateObjToArray}=ctUtil
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil
//const {reloadAxiosAll,setShowRange,setWidthLeft,setHeightTop} = pageUtil

const {transactionForm}=FormTemplate
const {transactionState}=StateTemplate
const {transactionFilter}=FilterTemplate
const {transactionInputState}=inputState
const { transactionTableTemplate,productDetailTableTemplate}=tableTemplate

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
       submitFunctionEdit,submitFunctionAdd,filterAxios,
       setUnSelectAll,submitFunctionDelete
} = pageUtil

function Transaction() {

console.log('Transaction')

const {basicDataSt,tokenSt,setReloadCheckToken,myheader}=React.useContext(MainContext)

const {basicData}=basicDataSt
const {reloadCheckToken,haveShopToken,haveUserToken,userName}=tokenSt

const setShowRange=(data)=>{setFilterData({...filterData,showRange:data})}
const setHeightTop=(data)=>{setFilterData({...filterData,heightTop:data})}
const setWidthLeft=(data)=>{setFilterData({...filterData,widthLeft:data})}
const setShowModalError=(data)=>{setFilterData({...filterData,showModalError:data})}
const setShowModalConfirm=(data)=>{setFilterData({...filterData,showModalConfirm:data})}
const setPageNumber=(data)=>{setFilterData({...filterData,pageNumber:data})}
const setShowAdd=(data)=>{setFilterData({...filterData,showAdd:data})}
const setShowEdit=(data)=>{setFilterData({...filterData,showEdit:data})}
const setTableTemplate=(data)=>{setFilterData({...filterData,tableTemplate:data})}
const setDetailTableTemplate=(data)=>{setFilterData({...filterData,detailTableTemplate:data})}
const updateEditData=(data)=>{setFilterData({...filterData,editData:data})}
//to save filterData when sort Up and down each column
const setFilterDataData0=(data)=>{setFilterData({...filterData, data0:data})}
const setSort=(data)=>{setFilterData({...filterData,sort:data})}
const setLimitRow=(data)=>{setFilterData({...filterData,limitRow:data})}

//when click FaBullEyes it change data0.selectedLine 
//and set selectProct to null 
//and uncheck all input radio 
const setUnSelectAllFunc=()=>{
    setFilterData(setUnSelectAll(filterData))
}


const submitFunctionDeleteFunc=async(data)=>{
    const temp = await submitFunctionDelete(filterData,myheader)
    setFilterData(temp)
}


const updateWithSelectGroup=()=>{
    if(filterData.selectGroup){        
        const {id,...remaining}=filterData.selectGroup
        setFilterData({...filterData,iconActionData:{groupId:id,...remaining}})
    }
}

//=================================
const reloadAxiosAllFunc=async()=>{
    const temp=await reloadAxiosAll(filterData,myheader)
    setFilterData(temp)
}

//------------------
const refreshPage=(data)=>{
    //data = true
    const {limitRow,sort}=filterData
    const temp = {...filterData, limitRow,sort,
                editData:null,qry:null,reloadData:true
            }
    setFilterData(temp)
}


//<LineForm/> onBlur => updateFilterData with LineForm
const updateFilterDataFunc=(index,i)=>{
    //<LineForm/>   onBlur => updateFilterData

    const temp=updateFilterData(index,i,filterData)
    setFilterData({...filterData,...temp})

}

const submitFunctionEditFunc=async (formInputState)=>{
    const temp = await submitFunctionEdit(formInputState,filterData,transactionState,myheader)
}

const submitFunctionAddFunc=async (formInputState)=>{
    const temp = await submitFunctionAdd(formInputState,filterData,transactionState,myheader)
}

const filterAxiosFunc=async (option,inputState)=>{
    const temp = await filterAxios(option,inputState,transactionFilter,filterData,myheader)
    setFilterData(temp)
}


const dataTableTemplateName="transactionTableTemplate"
const detailTableTemplateName="productDetailTableTemplate"

const saveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,"transactionTableTemplate",myheader)
}

const saveDetailTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,"productDetailTableTemplate",myheader)

}

//-------------------------
let [filterData,setFilterData]=React.useState(filterDataTemplate)

React.useEffect(()=>{
    if(filterData.reloadData){
        reloadAxiosAllFunc()
    }
},[filterData])

//===================================


//To render Filter 
const renderFilter=()=>{
    const {limitRow,sort}=filterData
    return (
        <ModalFilterInput
            title={`ค้นหา `}
            show={true} setShow={()=>{}}
            filterTemplate={transactionFilter}
            inputState={transactionInputState} 
            setInputState={()=>{}}
            limitRow={limitRow} 
            setLimitRow={setLimitRow}
            sort={sort} 
            setSort={setSort}
            filterAxios={filterAxiosFunc}
        />
    )
}

//==================================

const renderGroup=()=>{

    return (
    <div className="w-100 h-100" style={{overflow:"auto",paddingBottom:"80px"}}>
        {
            renderFilter()
        }
    </div>
    )
}

//===================================
//there are 3 case to render add PageForm, edit PageForm or Table for detail of product
const renderSubTable=()=>{
    const {showAdd,showEdit,editData}=filterData
    
    if(editData){

        return(<div className="w-100 h-100">
                <div className="flex-center-center" 
                        style={{height:"1.4rem",margin:"0",padding:"0"}}>
                    <p>สินคาย่อย</p>
                </div>
               
                <Table
                    colorHead={"#aaa"}
                    tableTemplate={filterData.detailTableTemplate}
                    setTableTemplate={setDetailTableTemplate}
                    filterDataKey={["detailTableTemplate"]}

                    filterData={filterData.editData.detail}
                    setFilterData={()=>{}}

                    editData={null}
                    setEditData={()=>{}}
                    saveTableTemplateFunc={saveDetailTableTemplateFunc}
                    isSubTable={false}
                    updateFilterData={()=>{}}
                    useInput={false}
                    selectData={null}
                />
            </div>    
        )

    }
    else {
        return null
    }
    
}

//====================================
const renderTable=()=>{
    //console.log('renderTable ............')
    //console.log(filterData.tableTemplate)
    //console.log(filterData.data0)
    return (
            filterData.data0
            ?<Table
                colorHead={"#888"}
                tableTemplate={filterData.tableTemplate}
                setTableTemplate={setTableTemplate}
                filterDataKey={"tableTemplate"}

                filterData={filterData.data0}
                setFilterData={setFilterDataData0}
                
                editData={filterData.editData}
                setEditData={updateEditData}
                saveTableTemplateFunc={saveTableTemplateFunc}
                isSubTable={false}
                updateFilterData={updateFilterDataFunc}
                useInput={false}
                selectData={filterData.selectData}
            />
            :null
    )
}

//===================================
const renderBody=()=>{
    return (
        <div className="bd-green"
             style={{display:"flex",height:"100%",width:"100%"}}
        >
            <div className="bd-darkGray" 
            style={{height:"100%",width:`${filterData.widthLeft}%`}}>
                { 
                  renderGroup() 
                }
            </div>


            {true    
            ?<div className="bd-darkGray" 
                style={{height:"100%",width:`${100-filterData.widthLeft}%`}}>

                        <div 
                             style={{height:"5%",width:"100%"}}
                        >
                            { renderBadge({
                                filterData,
                                setPageNumber,
                                
                                totalSwapPage:1, 
                                setSwapState:()=>{},
                                
                                setReloadData:refreshPage,
                                setShowFilter:()=>{},
                                setShowAdd:setShowAdd,
                                setShowEdit:setShowEdit,
                                setShowModalConfirm:setShowModalConfirm,
                                setUnSelectAll:setUnSelectAllFunc
                            }) }
                        </div>

                        <div style={{height:"95%",width:"100%"}}>    

                                <div className="bd-green" 
                                    style={{width:"100%",
                                            height:`${filterData.heightTop}%`,
                                }}>
                                    { 
                                    renderTable() 
                                    }
                                    
                                </div>

                                <div className="bd-yellow"
                                    style={{width:"100%",
                                            height:`${95-filterData.heightTop}%`
                                            }}>
                                                
                                {
                                    renderSubTable()
                                }

                                </div>

                        </div>

            </div>

            :null
            }              
        </div>
    ) 
}

//===================================

return(
<div className="w-100 h-100">
    {
        renderWidthRangeBar({showRange:filterData.showRange,
                             setShowRange:setShowRange,
                             widthLeft:filterData.widthLeft,
                             setWidthLeft:setWidthLeft})
    }

    {
        renderHeightRangeBar({showRange:filterData.showRange,
                              setShowRange:setShowRange,
                              heightTop:filterData.heightTop,
                              setHeightTop:setHeightTop})
    }
    
    {   
        renderBody()    
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
export default Transaction;