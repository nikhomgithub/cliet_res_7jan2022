import React from 'react';
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'

import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import pageUtil from '../../component/pageComponent/pageUtil'
import renderModalError from '../../render/renderModalError'
import Table from '../../component/table/Table'
import renderBadgeForBill from './renderBadgeForBill'
import axios from 'axios'
import axiosUtil from '../../util/axiosUtil'

const {filterAxios,reloadAxiosAll,saveTableTemplate} =pageUtil
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

function PartnerForBill(props) {

const {basicDataSt,myheader,captureCustomer,partnerInputState,setPartnerInputState}=props
const {basicData}=basicDataSt

console.log('PartnerForBill')

const [filterData,setFilterData]=React.useState({
    counst:0,
    data0:null,
    dataUrl:"p35partner",
    lastRecordId:null,
    limitRow:basicData.limitRow,//3,
    pageNumber:1,
    initPageNumber:true,
    qry:{},
    reloadData:false,
    sort:{id:-1},
    message:null,
    showModalError:false,
   
})

React.useEffect(()=>{
    console.log('filterData')
    console.log(filterData)
},[filterData])

React.useEffect(()=>{
    //console.log('pageNumber')
    //console.log(filterData.pageNumber)
    
    setFilterData({...filterData,initPageNumber:false})

    if((filterData.pageNumber>0)&&(!filterData.initPageNumber)){
        const {dataUrl,pageNumber,limitRow,sort,qry}=filterData

        axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
        .then(result=>{
            const tempResult= { ...filterData,
                                data0:result.data.data,
                                count:result.data.count,
                                lastRecordId:result.data.lastRecordId,
                                reloadData:false,
                             }
            setFilterData(tempResult)
        })
        .catch(error=>{
            //catchErrorToMessage(error,setMessage)
            //setMessage(error.response.data.message)
            const tempError={...filterData,
                                reloadData:false,
                                message:catchErrorToMessage(error),
                                showModalConfirm:false,
                                showModalError:true,
                            }
            setFilterData(tempError)
        })
    }
    
},[filterData.pageNumber])


let tempPartnerTableTemplate=basicDataSt.tableTemplate.partnerTableTemplate
let tempSelectedLine=tempPartnerTableTemplate.selectedLine
tempSelectedLine={...tempSelectedLine,showCol:false}
tempPartnerTableTemplate={...tempPartnerTableTemplate,
                            selectedLine:tempSelectedLine
                         }

const [editData,setEditData]=React.useState(null)

const [filterInputState,setFilterInputState]=React.useState(partnerInputState)

const [tableTemplate,setTableTemplate]=React.useState(
    tempPartnerTableTemplate
)


const setReloadDataFunc=()=>{
    console.log('setReloadDataFunc')
    const {dataUrl,pageNumber,limitRow,sort,qry}=filterData
    axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
    .then(result=>{
        const tempResult= { ...filterData,
                            data0:result.data.data,
                            count:result.data.count,
                            lastRecordId:result.data.lastRecordId,
                            reloadData:false,
                         }
        setFilterData(tempResult)
    })
    .catch(error=>{
        //catchErrorToMessage(error,setMessage)
        //setMessage(error.response.data.message)
        const tempError={...filterData,
                            reloadData:false,
                            message:catchErrorToMessage(error),
                            showModalConfirm:false,
                            showModalError:true,
                        }
        setFilterData(tempError)
    })
}


const saveTableTemplateFunc=(tableTemplate)=>{
    const {tableTemplateUrl}=filterData
    saveTableTemplate(tableTemplate,'p35tabletemplate',"partnerTableTemplate",myheader)
}

const filterAxiosFunc=(option,inputState)=>{

    filterAxios(option,inputState,FilterTemplate.partnerFilter,filterData,myheader)
    .then(result=>{
        setFilterData(result)
        setPartnerInputState(filterInputState)
    })
    .catch(error=>{
        setFilterData(error)
        setPartnerInputState(filterInputState)
    })

}
const setFilterDataData0Func=(data)=>{
    console.log('setFilterDataData0Func')
    console.log(data)
    setFilterData({...filterData,data0:data})
}
const backToFilter=()=>{setFilterData({...filterData,data0:null})}
const setSortFunc=(data)=>{setFilterData({...filterData,sort:data})}
const setLimitRowFunc=(data)=>{setFilterData({...filterData,limitRow:data})}
const setShowModalErrorFunc=(data)=>{setFilterData({...filterData,showModalError:data})}
const setPageNumberFunc=(data)=>{setFilterData({...filterData,pageNumber:data})}
const updateFilterData=(data)=>{
    console.log('updateFilterData')
    console.log(updateFilterData)
}
// qry:{},

const renderTableAndBadge=()=>{
    return(
        <div className="w-100 h-100" style={{paddingTop:"1rem"}}>
            <div className="w-100">
                { renderBadgeForBill({
                    filterData,
                    setPageNumber:setPageNumberFunc,
                    bgColor:"#74b979",
                    backToFilter:backToFilter,
                    editData:editData,
                    captureEditData:captureCustomer,
                    setReloadDataFunc:setReloadDataFunc
                }) }
            </div>

            <div className="w-100 h90">
                <Table
                    colorHead={"#4b6d62"}
                    //tableTemplate={basicDataSt.tableTemplate.partnerTableTemplate}
                    tableTemplate={tableTemplate}
                    setTableTemplate={setTableTemplate}//setTableTemplateFunc}

                    filterData={filterData.data0}
                    setFilterData={setFilterDataData0Func}//setFilterDataFunc}//{setFilterDataData0}
                    
                    editData={editData}
                    setEditData={setEditData}//{updateEditData}
                    saveTableTemplateFunc={saveTableTemplateFunc}
                    isSubTable={false}
                    useInput={false}
                    updateFilterData={()=>{}}//{updateEditData}

                    basicData={basicData}
                />
            </div>

        </div>
    )
}

return(
<div className="w-100" >

        <ModalFilterInput
            title={"ค้นหา"}//filterTitle}
            show={false} 
            setShow={()=>{}}

            //filterTemplate={FilterTemplate.partnerFilter}
            filterTemplate={basicDataSt.pageFilter.partnerFilter}

            inputState={filterInputState} 
            setInputState={setFilterInputState}
            
            limitRow={filterData.limitRow}//limitRow} 
            setLimitRow={setLimitRowFunc}//setLimitRow}

            sort={filterData.sort}//sort} 
            setSort={setSortFunc}//setSort}
            
            filterAxios={filterAxiosFunc}//filterAxiosFunc}
            basicData={basicData}

            LB={basicDataSt.pageFilterForm.partnerFilterForm}
            //LB={pageFilterForm}

        />

        {filterData.data0
        ?renderTableAndBadge()
        :null
        }

        {  
        filterData.showModalError
        ?renderModalError({
            setShow:setShowModalErrorFunc,
            message:filterData.message
        })
        :null
        }
</div>

)

}
export default PartnerForBill;

