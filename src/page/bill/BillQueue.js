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
function BillQueue(props) {

const {basicDataSt,queueArray,captureBillFromTable,updateQueue}=props

console.log('BillQueue')

const {basicData}=basicDataSt

const [editQueue,setEditQueue]=React.useState(null)

//==========================
const renderTable=()=>{
    return(
        <div className="grid-flex bd=green"
             style={{margin:"0.2rem"}}
        >
            {
                queueArray.map((i,idx)=>{

                    return i.queueStatus=="open"
                        ?<div className="grid-flextile2"
                              key={idx}
                        >
                        
                            <div key={idx}
                                
                                style={{ minHeight:"5rem",minWidth:"5rem",
                                    border:"2px solid rgb(0,153,0)",
                                    backgroundColor:"rgba(153,255,153,0.1)",
                                    borderRadius:"5px",marginBottom:"0.2rem"    
                                }}

                                
                            >
                                <div className="circle-p"
                                    style={{
                                            width:"2rem",height:"2rem",
                                            borderRadius:"50%",
                                            opacity:"0.7",
                                        }}
                                    onClick={e=>setEditQueue(i.queue)}    
                                >
                                    <div className="w-100 h-100 flex-center-center">
                                        <div className='bill-p'>
                                        {i.queue}   
                                        </div>
                                    </div>
                                </div>   
                                <div className='bill-p' 
                                     style={{display:"flex",alignItems:"center",
                                             justifyContent:"space-between"}}>
                                    <div 
                                        onClick={e=>captureBillFromTable(i)}
                                    >
                                    {`${i.table}-${i.name}`}
                                    </div>
                                    {editQueue==i.queue
                                        ?<div style={{marginLeft:"1rem"}}>
                                            <select
                                                onChange={e=>{
                                                    updateQueue(e,i)
                                                }}
                                            >
                                                <option>...</option>
                                                <option>close</option>
                                            </select>
                                        </div>
                                        :null
                                    }
                                </div>


                                {/*
                                tempBillArray.map((j,idx)=>{
                                    return(
                                        <div className="bill-p"
                                            style={{display:"flex",justifyContent:"space-between",
                                                   padding:"0 0.1rem"}}
                                            onClick={e=>{
                                                captureBillFromTable(j)
                                            }}
                                        >
                                            <div>{`${j.name}`}</div>
                                            <div 
                                                style={j.queueStatus=="close"
                                                       ?{textDecoration:"line-through",color:"#676f76"}
                                                       :null
                                                       }
                                            >{`Q-${j.queue}:`}
                                            </div>
                                        </div>
                                    )
                                })
                                */}
                            </div>
                        </div>
                        :null
                    
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
export default BillQueue;
