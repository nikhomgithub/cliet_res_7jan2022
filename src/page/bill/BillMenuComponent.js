import React from 'react';
import axios from 'axios';

import pageUtil from '../../component/pageComponent/pageUtil'
import filterDataTemplate from './filterDataTemplate'
//import {MainContext} from '../../context/MainContext'
import {MdClose} from 'react-icons/md';
import {FaPlusCircle,FaMinusCircle,FaCheck,FaBan} from 'react-icons/fa'
import Table from '../../component/table/Table'
import { EditTwoTone } from '@material-ui/icons';
import axiosUtil from '../../util/axiosUtil';
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput';
//import renderTable from '../../component/table/renderTable';
import renderModalError from '../../render/renderModalError'
import renderBadgeForBill from './renderBadgeForBill'
import download from 'js-file-download'

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil
//==================================
function BillMenuComponent(props) {

const {pageData,basicDataSt,myheader,
    billMenuFilter,
    billMenuInputState,
    billMenuSort,
    billMenuLimitRow,
    billMenuShowTransaction,
    billMenuOption,
    setFilterDataFunc,
    //transactionArray,refreshTransactionFunc
}=props


console.log('BillMenuComponent')

/*
const jobStatusForm={
    formHead:"Job Status"
}
*/

const {basicData}=basicDataSt
const {jobStatusForm}=pageData
//console.log(basicDataSt)

React.useEffect(()=>{
    //console.log('billMenuInputState')
    //console.log(billMenuInputState)
},[billMenuInputState])

const saveTableTemplateFunc=(tableTemplate)=>{
    saveTableTemplate(tableTemplate,
        "p35tabletemplate",
        "billMenuTableTemplate",
        myheader)
}

const genTransactionData=(data)=>{
   //console.log('data')
   //console.log(data[0])
  

   let tempArray=[]
   data.map(i=>{
      const {_id,detail,date,...remaining}=i

      //const date1=new Date(date).toISOString()
      //const date3=new Date(date1).toLocaleString('en-GB')
      //const tempTime=date3.substring(12,17)

      
      detail.map(j=>{
         const {id,barcode,...remaining2}=j

         /*
         let tempDetailTime=null
         if(detailTime){
            const detailDate1=new Date(detailTime).toISOString()
            const detailDate3=new Date(detailDate1).toLocaleString('en-GB')
            tempDetailTime=detailDate3.substring(12,17)
         }
         */

         const tempObj={...remaining,
               productId:id,
               productBarcode:barcode,
               date:date,
               time:date,
               //detailTime:tempDetailTime,
               ...remaining2
            }
         tempArray=[...tempArray,tempObj]
      })
   })

   return tempArray
}



const [transactionData,setTransactionData]=React.useState(null)
const [tableTemplate,setTableTemplate]=React.useState(basicDataSt.tableTemplate.billMenuTableTemplate)
const [editData,setEditData]=React.useState(null)
const [showJobStatus,setShowJobStatus]=React.useState(false)
const [transactionArray,setTransactonArray]=React.useState(null)
const [iForJobStatus,setIForJobStatus]=React.useState(null)
const [newJobStatus,setNewJobStatus]=React.useState(null)
const [message,setMessage]=React.useState(null)
const [showModalError,setShowModalError]=React.useState(false)
const [count,setCount]=React.useState(null)
const [pageNumber,setPageNumber]=React.useState(1)

const [filterData,setFilterData]=React.useState({
        pageNumber:1,
        limitRow:billMenuLimitRow,
        sort:billMenuSort,
        dataUrl:'p35transaction',
        count:null
})

React.useEffect(()=>{
    //console.log('transactionData=========')
    //console.log(transactionData)
},[transactionData])

React.useEffect(()=>{
    //console.log('transactionArray')
    //console.log(transactionArray)
},[transactionArray])


const filterAxiosFunc=(option,inputState)=>{

    console.log('filterAxios')
    //console.log(filterTemplate)
    const filterTemplate=basicDataSt.pageFilter.billMenuFilter
    
    filterAxios(option,inputState,filterTemplate,filterData,myheader)
    .then(result=>{
        console.log("result.....")
        console.log(result.data0)
        //console.log(result.count)
        setCount(result.count)
        const temp=genTransactionData(result.data0)
        //console.log('temp')
        //console.log(temp)
        setTransactonArray(result.data0)
        setTransactionData(temp)
        setFilterDataFunc({
            ["billMenuShowTransaction"]:true,
            ["billMenuOption"]:option
        })
        
    })
    .catch(error=>{
        console.log(error)
    }
    )
}


React.useEffect(()=>{
   if(basicDataSt.tableTemplate){
      setTableTemplate(basicDataSt.tableTemplate.billMenuTableTemplate)
    }    
},[basicDataSt])

React.useEffect(()=>{
    if(editData){
        //setShowJobStatus(true)
    }
},[editData])

//====================


const genCsv=()=>{
    console.log('genCsv')
    //console.log(filterData.data0)

    /*
    
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
    */
 }
 







//====================
const renderFilter=()=>{
return(
    <ModalFilterInput
        show={true} setShow={()=>{}}
        
        filterTemplate={basicDataSt.pageFilter.billMenuFilter}

        inputState={billMenuInputState} 
        setInputState={(data)=>setFilterDataFunc({["billMenuInputState"]:data})}
        
        limitRow={billMenuLimitRow} 
        setLimitRow={(data)=>setFilterDataFunc({["billMenuLimitRow"]:data})}
        
        sort={billMenuSort} 
        setSort={(data)=>setFilterDataFunc({["billMenuSort"]:data})}
        
        filterAxios={filterAxiosFunc}
        basicData={basicData}

        LB={basicDataSt.pageFilterForm.transactionFilterForm}
        />
   
)

}
//--------------------
const renderTableAndBadge=()=>{
  return(
<div className="w-100 h-100">
    <div className="w-100">
        
        {
        renderBadgeForBill({
            filterData,
            setPageNumber:()=>{},
            bgColor:"#72a2d9",
            editData:editData,
            captureEditData:()=>{},//captureTransaction,
            setReloadDataFunc:()=>{},//setReloadDataFunc,
            genCsv:genCsv
        }) 
        
        }
    </div>
    <div className="w-100 h90"></div>
    <Table
        colorHead={"#4b2c17"}
        tableTemplate={tableTemplate}
        setTableTemplate={setTableTemplate}

        filterData={transactionData}
        setFilterData={setTransactionData}
        
        editData={editData}
        setEditData={setEditData}
        saveTableTemplateFunc={saveTableTemplateFunc}
        isSubTable={false}
        updateFilterData={()=>{}}
        useInput={false}
        selectData={null}
        //editIconField={"jobStatus"}
        //editIconFieldFunc={(i)=>{
        //    setShowJobStatus(true)
        //    setIForJobStatus(i)
        //}}//setShowEditForm(true)}
    />
</div>
  )
}
//====================
/*
const renderJobStatus=()=>{
return (
<div className="Modal-background">
    <div className="Modal-box">
        <div className="Modal-header">
            <h4>{jobStatusForm.formHead}</h4>
        </div>

        <div className="flex-center-center" style={{marginBottom:"02rem"}}>
            <div className="xc6">
                {jobStatusForm.jobStatus}
            </div>
            <div className="xc6">
                {
                <select style={{width:"100%"}}
                        className="xc8"
                        onChange={e=>{
                            setNewJobStatus(e.target.value)
                        }}
                >
                    <option>....</option>
                    {basicData["jobStatus"].map((j,idx2)=>(
                        <option key={idx2}
                                selected={iForJobStatus.jobStatus==j?"selected":""}
                        >{j}</option>
                    ))}
                </select>
                }
            </div>

        </div>



        <div className="Modal-footer">
               <div>
                   <button
                    onClick={e=>{
                           //submitFunc()
                           //submitFunction()

                        if(newJobStatus=="open"||newJobStatus=="close"){
                            let tempArray=[]
                            let tempDetail=[]

                            transactionData.map(k=>{
                                const {_id,
                                    productId,productBarcode,
                                    productName,
                                    groupId,groupName,
                                    unit,price,priceLevel,quantity,result,remark,
                                    isRawMat,point,jobStatus,
                                    ...remaining}=k

                                if(k.id==iForJobStatus.id){
                                    let tempObj={
                                        id:productId,
                                        barcode:productBarcode,
                                        productName,
                                        groupId,groupName,
                                        unit,price,priceLevel,
                                        quantity,result,remark,isRawMat,point,
                                        jobStatus
                                    }

                                    if(k.productId==iForJobStatus.productId){
                                        tempArray=[...tempArray,
                                            {...k,jobStatus:newJobStatus}
                                        ]
                                        tempDetail=[...tempDetail,
                                            {...tempObj,jobStatus:newJobStatus}
                                        ]
                                    }
                                    else{
                                        tempArray=[...tempArray,k]
                                        tempDetail=[...tempDetail,tempObj]
                                    }
                                }
                                else{
                                    tempArray=[...tempArray,k]
                                }

                            })

                            const tempObj={id:iForJobStatus.id,detail:tempDetail}   

                            axios.post('/p35transaction/updatecustom',tempObj,myheader)
                            .then(result=>{
                                setTransactionData(tempArray)
                                setShowJobStatus(false)
                            })
                            .catch(error=>{
                                setShowModalError(true)
                                setMessage(catchErrorToMessage(error))
                            })
                            
                           
                        }
                           
                    }}
                   >
                       <FaCheck/>
                   </button>
               </div>
               <div>
                   <button
                       onClick={e=>{
                            setShowJobStatus(false)
                            //cancelFunc()
                       }}
                   >
                       <FaBan/>
                   </button>
               </div>

           </div>

    </div>
</div>
)
}
*/
//=====================

//====================
return(
<div className=" w-100" 
     style={{marginBottom:"4rem",position:"relative"}} >
      
      {
        renderFilter()
      }

      {
       //showJobStatus&&basicDataSt&&
       //renderJobStatus() 
      }    


      { billMenuShowTransaction&&transactionData
        ?renderTableAndBadge()
        :null//renderFilter()
      }
        
      {  
        showModalError
        ?renderModalError({
            setShow:setShowModalError,
            message:message
        })
        :null
      }

</div>

)

}
export default BillMenuComponent;
