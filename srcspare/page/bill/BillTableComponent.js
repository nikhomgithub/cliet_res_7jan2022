import React from 'react';
import pageUtil from '../../component/pageComponent/pageUtil'
import filterDataTemplate from './filterDataTemplate'
import {MainContext} from '../../context/MainContext'
import {MdSwapHoriz} from 'react-icons/md';
import {FaPlusCircle,FaMinusCircle} from 'react-icons/fa'
import Ticon from '../../component/ticon/Ticon'
import { SiHandlebarsdotjs } from 'react-icons/si';

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil
//==================================
function BillTableComponent(props) {

const {basicDataSt,transactionArray,captureBillFromTable,
       updateAllTransaction,captureAllTransaction
}=props

console.log('BillTableComponent')

const {basicData}=basicDataSt

const [editTable,setEditTable]=React.useState(null)
const [tableIdArray,setTableIdArray]=React.useState([])

React.useEffect(()=>{
    console.log('tableIdArray')
    console.log(tableIdArray)
},[tableIdArray])

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

const handleCheckbox=(e,j)=>{
    //console.log('handleCheckbox')
    //console.log(e.target.checked)
    //console.log(j)
    if(e.target.checked){
        const temp1=[...tableIdArray,j.id]
        const temp2=[...new Set(temp1)]
        setTableIdArray(temp2)
    }
    else{
        let tempArray=[]
        tableIdArray.map(k=>{
            if(k!=j.id){
                tempArray=[...tempArray,k]
            }
        })
        setTableIdArray(tempArray)
    }
}

//==========================
const renderTable=()=>{
    return(
        <div className="grid-flex"
             style={{margin:"0.2rem 0"}}
        >
            {
                basicData.table.map((i,idx)=>{
                    
                    let tempBillArray=[]
                    transactionArray.map(j=>{ 
                        if(j.table==i.tableName){
                            tempBillArray=[...tempBillArray,j]
                        }
                    })
                    
                    return(i.tableActive
                        ?<div className="grid-flextile2" key={idx}
                        >
                        
                            <div 
                                style={{ minHeight:"5rem",minWidth:"5rem",
                                    border:"2px solid white",
                                    backgroundColor:"rgba(255,255,255,0.3)",
                                    borderRadius:"5px",    
                                }}
                                
                            >
                                <div className='circle-p'
                                    style={{
                                            width:"2rem",height:"2rem",
                                            //color:"red",backgroundColor:"white",
                                            borderRadius:"50%",
                                            opacity:"0.7",
                                        }}
                                    onClick={e=>{
                                        if(transactionArray){
                                            //console.log('transactionArray')
                                            //console.log(transactionArray)
                                            let foundTable=false
                                            transactionArray.map(k=>{
                                                if(k.table==i.tableName){
                                                    foundTable=true
                                                }
                                            })
                                            if(foundTable){
                                                setTableIdArray([])
                                                setEditTable(i.tableName)
                                            }
                                            else{
                                                setEditTable(null)
                                            }
                                        }
                                    }}
                                >
                                    <div className="w-100 h-100 flex-center-center">
                                        <div>
                                        {i.tableName}   
                                        </div>
                                    </div>
                                </div>   

                                {tempBillArray.map((j,idx)=>{
                                    return(
                                    <div style={{display:"flex",alignItems:"center",
                                                 justifyContent:"space-between"}}>
                                        <div className="bill-p"
                                            style={{display:"flex",alignItems:"center",
                                                    justifyContent:"space-between",
                                                   padding:"0 0.1rem"}}
                                            onClick={e=>{
                                                captureBillFromTable(j)
                                            }}
                                        >
                                            
                                            <div
                                                style={{marginRight:"0.5rem"}}
                                            >{`${j.name}`}</div>
                                            
                                            <div 
                                                style={j.queueStatus=="close"
                                                       ?{textDecoration:"line-through"}
                                                       :null
                                                       }
                                            >{`Q-${j.queue}:`}
                                            </div>
                                         
                                        </div>
                                        {editTable==i.tableName&&
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    style={{width:"1.2rem",height:"1.2rem"}}
                                                    onChange={e=>{handleCheckbox(e,j)}}
                                                />
                                            </div>
                                            }
                                    </div>
                                    )
                                })}
                                {editTable==i.tableName
                                ?<div style={{display:"flex"}}>
                                    <select
                                        onChange={e=>{updateAllTransaction(e,tableIdArray)}}
                                    >
                                        <option>...</option>
                                        <option>close</option>
                                    </select>

                                    <div className='flex-center-center navLink' 
                                         onClick={e=>{
                                             captureAllTransaction(tableIdArray)
                                         }}
                                    >
                                        <Ticon
                                            iconName="RiShareForwardLine"
                                            className="navIcon"
                                        />
                                    </div>
                                </div>
                                :null  
                                }
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
