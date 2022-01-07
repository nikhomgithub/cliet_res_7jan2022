import React from 'react';
import axios from 'axios'
//import {MainContext} from '../../context/MainContext'
import uuid from 'react-uuid'
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'
import pageUtil from './pageUtil'
import NewGroupComponent from '../../render/renderTree/NewGroupComponent'
import axiosUtil from '../../util/axiosUtil'
import Table from '../../component/table/Table'
import renderWidthRangeBar from '../../component/table/renderWidthRangeBar'
import renderBadge from '../../render/renderBadge/renderBadge'
import renderModalError from '../../render/renderModalError'
import ModalConfirm from '../../render/ModalConfirm'
import ModalForm from '../../render/renderForm/ModalForm'


const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil

function PageComponent(props) {

console.log('PageComponent')
//const {basicDataSt,tokenSt,setReloadCheckToken,myheader}=React.useContext(MainContext)

const {filterDataTemplate,pageFilter,pageFilterForm,...remaining}=props

const {filterTitle,inputState,filterTemplate,myheader,basicDataSt,
      formTemplate,editFormTemplate,stateTemplate,
      groupFormTemplate,groupEditFormTemplate,
      pageDataModalForm,
      addFormTitle,
      editFormTitle,
      groupAddFormTitle,
      groupEditFormTitle,
      dataUrl
}=props

const {basicData,pageData,tableTemplate,reloadBasicData}=basicDataSt


let [filterData,setFilterData]=React.useState({
    ...filterDataTemplate,...remaining,
    widthLeft:basicDataSt.basicData.widthLeft,
    tableTemplate:filterDataTemplate.tableTemplateName?tableTemplate[filterDataTemplate.tableTemplateName]:null,
    detailTableTemplate:filterDataTemplate.detailTableTemplateName?tableTemplate[filterDataTemplate.detailTableTemplateName]:null,
    detailTableTemplateForForm:filterDataTemplate.detailTableTemplateForFormName?tableTemplate[filterDataTemplate.detailTableTemplateForFormName]:null,
})

React.useEffect(()=>{
    console.log('filterData PageComponent')
    console.log(filterData)

    if(filterData.reloadData){
        const {dataUrl,pageNumber,limitRow,sort,qry}=filterData
    
        axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
        .then(result=>{
            //console.log(result)
            const temp2= genFilterDataWithIndex(result.data.data,filterData.selectProduct)
            console.log('temp2')
            console.log(temp2)
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
const setShowAdd=(data)=>{setFilterData({...filterData,showAdd:data})}
const setShowEdit=(data)=>{setFilterData({...filterData,showEdit:data})}
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
    console.log('refreshPage')
    const {limitRow,sort}=filterData
    const temp = {...filterData, limitRow,sort,selectProduct:[],
                editData:null,qry:null,reloadData:true
            }
    setFilterData(temp)
}

const submitFunctionDeleteFunc=async(data)=>{
    const temp = await submitFunctionDelete(filterData,myheader)
    setFilterData(temp)
}

const submitFunctionEditFunc=async (formInputState)=>{
    const temp = await submitFunctionEdit(formInputState,filterData,stateTemplate,myheader)
    setFilterData(temp)
}

const submitFunctionAddFunc=async (formInputState)=>{
    const temp = await submitFunctionAdd(formInputState,filterData,stateTemplate,myheader)
    setFilterData(temp)
}


const filterAxiosFunc=(option,inputState)=>{
    console.log('filterAxios')
    console.log(filterTemplate)
    filterAxios(option,inputState,filterTemplate,filterData,myheader)
    .then(result=>{
        const temp2= genFilterDataWithIndex(result.data0,filterData.selectProduct)
        //console.log('result......')
        //console.log(result)
        setFilterData({...result,data0:temp2})
    })
    .catch(error=>setFilterData(error))
}

const filterDataByGroup=(i)=>{
    const {folders,...remaining}=i
    const temp = {...filterData,pageNumber:1,qry:{groupId:i.id},selectGroup:remaining,reloadData:true}
    setFilterData(temp)

}

const saveTableTemplateFunc=(tableTemplate)=>{
    console.log('tableTemplate>>>>>>>>>>>')
    console.log(tableTemplate)
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,tableTemplateUrl,filterData.tableTemplateName,myheader)
}
const updateFilterDataFunc=(index,i)=>{

    const temp=updateFilterData(index,i,filterData)
    setFilterData({...filterData,...temp})
}

//-----------------------------
const renderTable=()=>{

    //console.log('renderTable')
    //console.log(filterData)

    return (
            filterData.data0
            ?<Table
                colorHead={"#888"}
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
                selectData={filterData.selectData}
                
            />
            :null
    )
}

//-----------------------------
const renderFilter=()=>{
    const {limitRow,sort}=filterData
    return (
        <div>
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
            
            filterAxios={filterAxiosFunc}
            basicData={basicData}
            
            LB={pageFilterForm}
            />
        </div>
    )
}
//-----------------------------
const renderGroup=()=>{

    return (
    <div className="w-100 h-100" style={{overflowY:"auto",paddingBottom:"5rem"}}>
        {
            renderFilter()
        }
        {pageFilterForm
        ?<div className="flex-center-center"  style={{borderTop:"1px black solid"}}>
            <h3>{pageFilterForm.groupHead}</h3>
        </div>
        :null
        }

        {
        filterData.groupDataUrl
        ?<div className="" style={{marginBottom:"4rem"}}>
            <NewGroupComponent
                groupAddFormTitle={groupAddFormTitle}
                groupEditFormTitle={groupEditFormTitle}

                groupFormTemplate={groupFormTemplate}
                groupEditFormTemplate={groupEditFormTemplate}

                groupDataUrl={filterData.groupDataUrl}
                canGroupChange={true}
                selectData={{basicData:basicData}}
                setSelectGroup={setSelectGroupFunc}
                filterDataByGroup={filterDataByGroup}
                editData={filterData.editData}
            />
        </div>
        :null
        }

    </div>
    )
}

//-----------------------------
const renderBody=()=>{
return(
    filterData&&
    <div className=""
             style={{display:"flex",height:"95%",width:"100%"}}
    >
            
        
            <div className="bd-darkGray hide-on-print" 
                 style={{height:"100%",width:`${filterData.widthLeft}%`}}>
                     {
                        renderGroup()
                     }
            </div>
        

        
            <div className="" 
                style={{height:"100%",width:`${100-filterData.widthLeft}%`}}>

                 <div className="hide-on-print"
                      style={{height:"5%",width:"100%"}}
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
                                setUnSelectAll:setUnSelectAllFunc,
                                setClose:()=>{},
                                bgColor:"gray",
                                captureSelect:()=>{}//captureSelect
                            }) 
                            
                    }

                </div>
              
                <div className=""
                      style={{height:"95%",width:"100%"}}
                >
                    <div style={{height:"100%",width:"100%"}}
                         className="show-on-print bd-red"
                    >
                        {
                         renderTable()
                        }
                    </div>
                    
                </div>
                 
            </div>
                
    </div>

)
}


return(
<div className="w-100 h-100">
    {   
        renderBody()    
    }
   
    <div className="hide-on-print" 
        style={{width:"100%",display:"flex",position:"relative"}}>
            {
            renderWidthRangeBar({    showRange:filterData.showRange,
                                setShowRange:setShowRange,
                                widthLeft:filterData.widthLeft,
                                setWidthLeft:setWidthLeft,
                                //heightTop:filterData.heightTop,
                                //setHeightTop:setHeightTop
                            })
            }
   
    </div>

    {
      filterData.showEdit
      ?<ModalForm
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
        detailTableTemplate={filterData.detailTableTemplateForForm}
        submitFunction={submitFunctionEditFunc}
        selectGroup={filterData.selectGroup}
        selectProduct={filterData.selectProduct}
        pageDataModalForm={pageDataModalForm}
        dataUrl={dataUrl}
        myheader={myheader}
      />  
      :null
    }

    {
      filterData.showAdd
      ?<ModalForm
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
        detailTableTemplate={filterData.detailTableTemplateForForm}
        submitFunction={submitFunctionAddFunc}
        selectGroup={filterData.selectGroup}
        selectProduct={filterData.selectProduct}
        pageDataModalForm={pageDataModalForm}
        dataUrl={dataUrl}
        myheader={myheader}
      />  
      :null
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