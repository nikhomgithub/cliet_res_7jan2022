

import React from 'react';
import axios from 'axios'
import {MainContext} from '../../context/MainContext'
import Table from '../table/Table'
import uuid from 'react-uuid'
import ModalConfirm from '../../render/ModalConfirm'

//import Badge from '../../render/renderBadge/Badge'
import renderBadge from '../../render/renderBadge/renderBadge'


import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../table/inputState'

import filterDataTemplate from './filterDataTemplate'

import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'
import tableTemplate from '../table/tableTemplate'

import PageForm from '../../render/renderForm/PageForm'
import renderModalError from '../../render/renderModalError'
import axiosUtil from '../../util/axiosUtil'

import ctUtil from '../../util/ctUtil'

import NewGroupComponent from '../../render/renderTree/NewGroupComponent'
import renderRangeBar from '../table/renderRangeBar'
//import renderHeightRangeBar from '../table/renderHeightRangeBar'

import pageUtil from './pageUtil'

/*
const dataTableTemplateName="transactionTableTemplate"
const detailTableTemplateName="productDetailTableTemplate"
const {createTableTemplateForPage,convertTableTemplateObjToArray}=ctUtil
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil
//const {reloadAxiosAll,setShowRange,setWidthLeft,setHeightTop} = pageUtil
*/
/*
const {transactionForm}=FormTemplate
const {dataState}=StateTemplate
const {dataFilter}=FilterTemplate
const {dataInputState}=inputState
const { transactionTableTemplate,productDetailTableTemplate}=tableTemplate
*/

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
       submitFunctionEdit,submitFunctionAdd,filterAxios,
       setUnSelectAll,submitFunctionDelete
} = pageUtil

function PageComponent(props) {

const {dataState,dataFilter,dataInputState,captureEditData,captureSelect,bgColor,filterTitle}=props

/*
    dataUrl:"p29transaction",
    tableTemplateUrl:"p29tabletemplate",
    tableTemplateName:"transactionTableTemplate",
    detailTableTemplateName:"productDetailTableTemplate",
    detailTableTemplateForFormName:"productDetailTableTemplateForForm",
*/

console.log('PageComponent')

const {basicDataSt,tokenSt,setReloadCheckToken,myheader}=React.useContext(MainContext)

const {basicData}=basicDataSt
const {reloadCheckToken,haveShopToken,haveUserToken,userName}=tokenSt

const setShowRange=(data)=>{setFilterData({...filterData,showRange:data})}
const setHeightTop=(data)=>{setFilterData({...filterData,heightTop:data})}
const setWidthLeft=(data)=>{setFilterData({...filterData,widthLeft:data})}
const setShowModalError=(data)=>{setFilterData({...filterData,showModalError:data})}
const setShowModalConfirm=(data)=>{setFilterData({...filterData,showModalConfirm:data})}
const setPageNumber=(data)=>{setFilterData({...filterData,pageNumber:data,reloadData:true})}
const setShowAdd=(data)=>{setFilterData({...filterData,showAdd:data})}
const setShowEdit=(data)=>{setFilterData({...filterData,showEdit:data})}
const setTableTemplate=(data)=>{setFilterData({...filterData,tableTemplate:data})}
const setDetailTableTemplate=(data)=>{setFilterData({...filterData,detailTableTemplate:data})}
const setEditData=(data)=>{

    setFilterData({...filterData,editData:data})
    captureEditData(data)
}
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
    //console.log('reloadAxiosAllFunc..........')
    const temp=await reloadAxiosAll(filterData,myheader)
    setFilterData(temp)
}

//------------------
const refreshPage=(data)=>{
    //data = true
    console.log('refreshPage')
    const {limitRow,sort}=filterData
    const temp = {...filterData, limitRow,sort,selectProduct:[],
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
    const temp = await submitFunctionEdit(formInputState,filterData,dataState,myheader)
    setFilterData(temp)
}

const submitFunctionAddFunc=async (formInputState)=>{
    const temp = await submitFunctionAdd(formInputState,filterData,dataState,myheader)
    setFilterData(temp)
}

const filterAxiosFunc=async (option,inputState)=>{
    const temp = await filterAxios(option,inputState,dataFilter,filterData,myheader)
    setFilterData(temp)
}


const filterDataByGroup=(i)=>{
    const {folders,...remaining}=i
    const temp = {...filterData,pageNumber:1,qry:{groupId:i.id},selectGroup:remaining,reloadData:true}
    setFilterData(temp)

}

const dataTableTemplateName="transactionTableTemplate"
const detailTableTemplateName="productDetailTableTemplate"

const saveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData.tableTemplateName,myheader)
}

const saveDetailTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData.detailTableTemplateName,myheader)
}


const saveDetailTableTemplateForFormFunc=(tableTemplate)=>{

    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,
            filterData.detailTableTemplateForFormName,myheader)
}

/*
const captureSelect=(selectLine)=>{
    console.log('selectLine')
    setFilterData({...filterData,selectProduct:selectLine})
}
*/

//-------------------------
let [filterData,setFilterData]=React.useState({...filterDataTemplate,...props})

React.useEffect(()=>{

    //console.log('filterData PageComponent')
    //console.log(filterData)

    if(filterData.reloadData){
        reloadAxiosAllFunc()
    }
},[filterData])

//===================================


//To render Filter 
const renderFilter=()=>{
    const {limitRow,sort}=filterData
    return (
        <div>
            <ModalFilterInput
            title={filterTitle}
            show={true} setShow={()=>{}}
            filterTemplate={dataFilter}
            inputState={dataInputState} 
            setInputState={()=>{}}
            limitRow={limitRow} 
            setLimitRow={setLimitRow}
            sort={sort} 
            setSort={setSort}
            filterAxios={filterAxiosFunc}
            basicData={basicData}
            />
        </div>
    )
}

//==================================

const renderGroup=()=>{

    return (
    <div className="w-100 h-100" style={{overflowY:"auto",paddingBottom:"5rem"}}>
        {
            renderFilter()
        }
        {filterData.groupTitle
        ?<div className="flex-center-center"  style={{borderTop:"1px black solid"}}>
            <h3>{filterData.groupTitle}</h3>
        </div>
        :null
        }
        {
        filterData.groupDataUrl
        ?<div className="" style={{marginBottom:"4rem"}}>
            <NewGroupComponent
                groupDataUrl={"p29group"}
                canGroupChange={true}
                selectData={{basicData:basicData}}
                setSelectGroup={()=>{}}
                filterDataByGroup={filterDataByGroup}
                editData={filterData.editData}
            />
        </div>
        :null
        }

    </div>
    )
}


//===================================
//there are 3 case to render add PageForm, edit PageForm or Table for detail of product
const renderSubTable=()=>{
    const {showAdd,showEdit,editData}=filterData
    
    if(filterData.showAdd){
        return (
            <div style={{height:"100%",paddingBottom:"4rem"}}>

            <PageForm
                                lb={filterData.addFormTitle}
                                formTemplate={filterData.dataForm}
                                stateTemplate={filterData.dataState}
                                loadData={{id:filterData.lastRecordId+1}}
                                myFilterData={filterData}
                                selectData={{basicData:basicData}}
                                setShow={setShowAdd}
                                iconAction={[updateWithSelectGroup,()=>{}]}
                                iconActionData={filterData.iconActionData}
                                iconActionDataDetail={filterData.iconActionDataDetail}
                                detailTableTemplateForForm={filterData.detailTableTemplateForForm}
                                submitFunction={submitFunctionAddFunc}
                                keyName={["photoUrl1"]} //new ---------------------------------
                                calculation={null}
                                saveDetailTableTemplateForFormFunc={saveDetailTableTemplateForFormFunc}
            />
            </div>   
        )
    }
    else if(filterData.showEdit){
        return(
            <div style={{height:"100%",paddingBottom:"4rem"}}>
            <PageForm
                                lb={filterData.editFormTitle}
                                formTemplate={filterData.dataEditForm}
                                stateTemplate={filterData.dataState}
                                loadData={filterData.editData}
                                myFilterData={filterData}
                                selectData={{basicData:basicData}}
                                setShow={setShowEdit}
                                iconAction={[updateWithSelectGroup,()=>{}]}
                                iconActionData={filterData.iconActionData}
                                iconActionDataDetail={filterData.iconActionDataDetail}
                                detailTableTemplateForForm={filterData.detailTableTemplateForForm}
                                submitFunction={submitFunctionEditFunc}
                                keyName={["photoUrl1"]} //new ---------------------------------
                                calculation={null}
                                saveDetailTableTemplateForFormFunc={saveDetailTableTemplateForFormFunc}
            />
            </div>
        )
    }
     
}

/*
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
*/

//====================================
const renderTable=()=>{

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
                setEditData={setEditData}
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
        <div className=""
             style={{display:"flex",height:"95%",width:"100%"}}
        >
            <div className="bd-darkGray hide-on-print" 
                 style={{height:"100%",width:`${filterData.widthLeft}%`}}>
                { 
                  renderGroup() 
                }
            </div>


            {true    
            ?<div className="bd-darkGray" 
                style={{height:"100%",width:`${100-filterData.widthLeft}%`}}>

                        <div className="hide-on-print"
                             style={{height:"5%",width:"100%"}}
                        >
                            { renderBadge({
                                filterData,
                                setPageNumber:setPageNumber,
                                
                                totalSwapPage:1, 
                                setSwapState:()=>{},
                                
                                setReloadData:refreshPage,
                                setShowFilter:()=>{},
                                setShowAdd:setShowAdd,
                                setShowEdit:setShowEdit,
                                setShowModalConfirm:setShowModalConfirm,
                                setUnSelectAll:setUnSelectAllFunc,
                                setClose:()=>{},
                                bgColor:bgColor,
                                captureSelect:captureSelect

                            }) }
                        </div>

                        <div style={{height:"100%",width:"100%"}}>    

                                {
                                  //height:`${95-filterData.heightTop}%`
                                  //height:`${filterData.heightTop}%`,

                                }

                                <div className="" 
                                    style={{width:"100%",
                                            height:`${filterData.heightTop}%`,
                                           }}>
                                        { 
                                        renderTable() 
                                        }
                                </div>
                                
                                <div className=""
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
        renderBody()    
    }
       
    <div className="hide-on-print" 
        style={{width:"100%",display:"flex",position:"relative"}}>
            {
            renderRangeBar({showRange:filterData.showRange,
                                setShowRange:setShowRange,
                                widthLeft:filterData.widthLeft,
                                setWidthLeft:setWidthLeft,
                                heightTop:filterData.heightTop,
                                setHeightTop:setHeightTop
                            })
            }
   
    </div>
 
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



PageComponent.defaultProps={
    captureEditData:()=>{},
    captureSelect:null,
    bgColor:"radial-gradient(circle, rgba(241,239,225,1) 1%, rgba(125,160,151,1) 93%)",
    filterTitle:"ค้นหา"
}




export default PageComponent ;