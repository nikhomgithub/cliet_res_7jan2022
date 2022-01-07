import React from 'react';
import pageUtil from '../../component/pageComponent/pageUtil'
import filterDataTemplate from './filterDataTemplate'
import {MainContext} from '../../context/MainContext'
import {MdSwapHoriz} from 'react-icons/md';
import {FaPlusCircle,FaMinusCircle} from 'react-icons/fa'

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil
//==================================
function BillTableComponent(props) {

const {basicDataSt,transactionArray,captureBillFromTable}=props

console.log('BillTableComponent')

const {basicData}=basicDataSt

const findOpenBill=(i)=>{
    let tableCount=0

    if(transactionArray){
        transactionArray.map(j=>{
            if(j.table==i.tableName){
                tableCount=tableCount+1
            }
        })
    }

    if (tableCount==0){
        return {tableCount:null,bgColor:"white"}
    }else {
        return {tableCount,bgColor:"green"}
    }
}

const findCustomerName=(i)=>{
    let name=[]
    if(transactionArray){
        transactionArray.map(j=>{
            if(j.table==i.tableName){
                name=[...name,`${j.name}`]
            }
        })
    }
    return name
}

const getBill=(i,k)=>{
    let tempObj=null 

    if(transactionArray){
        transactionArray.map(j=>{
            if((j.table==i.tableName)&&(k==j.name)) {
                tempObj=j
            }
        })
    }
    return tempObj
}

//==========================
const renderTable=()=>{
    return(
        <div className="grid-flex bd=green"
             style={{margin:"0.2rem"}}
        >
            {
                basicData.table.map((i,idx)=>{

                    return(i.tableActive
                        ?<div key={idx}
                            className="grid-flextile"
                            style={{ position:"relative",border:"2px solid white",
                                    
                            }}
                        >
                            {    
                                findCustomerName(i).map((k,idx)=>{
                                    return <p className="bill-p" key={idx} 
                                    style={{margin:"0",padding:"0"}}
                                    onClick={e=>captureBillFromTable(getBill(i,k))}
                                    >
                                        {k}
                                    </p>
                                })
                            }      
                            <div style={{position:"absolute",bottom:"0",width:"100%",textAlign:"center",
                                       color:"red",backgroundColor:"white",borderRadius:"0 0 0.5rem 0.5rem",
                                       opacity:"0.7",height:"20%",overflow:"hidden"
                                       }}
                            >
                               {i.tableName}
                            </div>

                            <div style={{position:"absolute",top:"0",right:"0",textAlign:"center",
                                        width:"1.5rem",height:"1.5rem",
                                       color:"white",borderRadius:"50%",
                                       opacity:"0.7",backgroundColor:findOpenBill(i).bgColor
                                       }}
                            >
                                {findOpenBill(i).tableCount}
                            </div>
                        </div>
                        :null
                    )
                })
            }
        </div>
    )
}

//====================
return(
<div className="w-100" style={{marginBottom:"4rem"}} >
           {  basicData&&
               renderTable()
           }
</div>

)

}
export default BillTableComponent;
