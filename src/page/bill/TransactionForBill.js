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
import filterDataTemplate from './filterDataTemplate';
import download from 'js-file-download'

const {filterAxios,reloadAxiosAll,saveTableTemplate} =pageUtil
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

function TransactionForBill(props) {

const {basicDataSt,myheader,pageFilter,pageFilterForm,
      captureTransaction,transactionInputState,setTransactionInputState
}=props
const {basicData}=basicDataSt

console.log('TransactionForBill')

const [filterData,setFilterData]=React.useState({
    counst:0,
    data0:null,
    dataUrl:"p35transaction",
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

const [editData,setEditData]=React.useState(null)

const [filterInputState,setFilterInputState]=React.useState(transactionInputState)


let tempTransactionTableTemplate=basicDataSt.tableTemplate.transactionTableTemplate
let tempSelectedLine=tempTransactionTableTemplate.selectedLine
tempSelectedLine={...tempSelectedLine,showCol:false}
tempTransactionTableTemplate={...tempTransactionTableTemplate,
                            selectedLine:tempSelectedLine
                         }

const [tableTemplate,setTableTemplate]=React.useState(tempTransactionTableTemplate)

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
    saveTableTemplate(tableTemplate,'p35tabletemplate',"transactionTableTemplate",myheader)
}

const filterAxiosFunc=(option,inputState)=>{


    filterAxios(option,inputState,FilterTemplate.transactionFilter,filterData,myheader)
    .then(result=>{
        setFilterData(result)
        setTransactionInputState(filterInputState)
    })
    .catch(error=>{
        setFilterData(error)
        setTransactionInputState(filterInputState)
    })

    
}

const backToFilter=()=>{
    setFilterData({...filterData,data0:null})
}

const setSortFunc=(data)=>{setFilterData({...filterData,sort:data})}
const setLimitRowFunc=(data)=>{setFilterData({...filterData,limitRow:data})}
const setShowModalErrorFunc=(data)=>{setFilterData({...filterData,showModalError:data})}
const setPageNumberFunc=(data)=>{setFilterData({...filterData,pageNumber:data})}

// qry:{},

const genCsv=()=>{
    console.log('genCsv')
    console.log(filterData.data0)
    
    if(filterData.data0){
 
          const columnDelimiter = ","
          const lineDelimiter = "\n"
          
          const keys = Object.keys(filterData.data0[0])
 
          let result = ""
          result += keys.join(columnDelimiter)
          result += lineDelimiter
 
          filterData.data0.map((item,indexItem)=>{
 
             keys.map((key,indexKey)=>{
                if(indexKey>0){
                      result+=columnDelimiter
                }
                result += typeof item[key] === "string"&& 
                            item[key].includes(columnDelimiter) 
                            ? `"${item[key]}"` 
                            : item[key]
 
             })
 
             result += lineDelimiter
          })
 
          download(result,`${pageFilterForm.formHead}${filterData.pageNumber}.csv`)
    }
    
 }
 



const renderTableAndBadge=()=>{
    return(
        <div className="w-100 h-100">
            <div className="w-100">
                { renderBadgeForBill({
                    filterData,
                    setPageNumber:setPageNumberFunc,
                    bgColor:"#72a2d9",
                    backToFilter:backToFilter,
                    editData:editData,
                    captureEditData:captureTransaction,
                    setReloadDataFunc:setReloadDataFunc,
                    genCsv:genCsv
                }) }
            </div>

            <div className="w-100 h90">
                <Table
                    colorHead={"#4b6d62"}
                    //tableTemplate={basicDataSt.tableTemplate.transactionTableTemplate}   
                    tableTemplate={tableTemplate}
                    setTableTemplate={setTableTemplate}

                    filterData={filterData.data0}
                    setFilterData={()=>{}}//setFilterDataFunc}//{setFilterDataData0}
                    
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
            title={"ค้นหาบิล"}//filterTitle}
            show={false} 
            setShow={()=>{}}


            filterTemplate={pageFilter.transactionFilter}

            inputState={filterInputState} 
            setInputState={setFilterInputState}
            
            limitRow={filterData.limitRow}//limitRow} 
            setLimitRow={setLimitRowFunc}//setLimitRow}

            sort={{id:-1}}//sort} 
            setSort={setSortFunc}//setSort}
            
            filterAxios={filterAxiosFunc}//filterAxiosFunc}
            basicData={basicData}

            LB={pageFilterForm.transactionFilterForm}
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
export default TransactionForBill;

