import React from 'react';
import pageUtil from '../../component/pageComponent/pageUtil'
import filterDataTemplate from './filterDataTemplate'
import {MainContext} from '../../context/MainContext'
import {MdSwapHoriz} from 'react-icons/md';
import {FaPlusCircle,FaMinusCircle} from 'react-icons/fa'
import Ticon from '../../component/ticon/Ticon'

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil
//==================================
function BillKitchen(props) {


console.log('BillKitchen')

const {basicDataSt,queueArray,captureBillFromTable,updateProductToCloseOrOpen}=props

console.log(queueArray)

const {basicData}=basicDataSt

const [editQueue,setEditQueue]=React.useState(null)
const [editTable,setEditTable]=React.useState(null)
const [queue_idArray,setQueue_idArray]=React.useState([])

React.useEffect(()=>{
    console.log('queue_idArray')
    console.log(queue_idArray)

},[queue_idArray])

const handleCheckbox=(e,j)=>{
    //console.log('handleCheckbox')
    //console.log(e.target.checked)
    //console.log(j)
    if(e.target.checked){
        const temp1=[...queue_idArray,j._id]
        const temp2=[...new Set(temp1)]
        setQueue_idArray(temp2)
    }
    else{

        let tempArray=[]
        
        queue_idArray.map(k=>{
            if(k!=j._id){
                tempArray=[...tempArray,k]
            }
        })
        setQueue_idArray(tempArray)
    }
}

//==========================
const renderTable=()=>{
    return(
        <div className="grid-flex"
             style={{margin:"0.2rem"}}
        >
            {
                queueArray.map((i,idx)=>{

                    return i.queueStatus=="open"
                        ?<div className="grid-flextile3"
                              key={idx}
                        >
                        
                            <div key={idx}
                                
                                style={{ minHeight:"5rem",minWidth:"5rem",
                                    border:"2px solid #5B5EA6",//rgb(0,153,0)",
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
                                    onClick={e=>{
                                        setEditQueue(i.queue)
                                        setQueue_idArray([])
                                    }}    
                                >
                                    <div className="w-100 h-100 flex-center-center">
                                        <div className='bill-p'>
                                        {i.queue}   
                                        </div>
                                    </div>
                                </div>   
                                <div className='bill-p' 
                                     style={{ //display:"flex",alignItems:"center",
                                              //justifyContent:"space-between"
                                             }}>
                                    <div 
                                        onClick={e=>captureBillFromTable(i)}
                                    >
                                    {`${i.table}-${i.name}`}
                                    </div>
                                    {/*
                                    editQueue==i.queue
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
                                    */
                                    }
                                    
                                </div>
                                {
                                    i.detail.map((m,idx3)=>(
                                        <div className='w-100' 
                                             key={idx3}
                                             style={{
                                                 display:"flex",
                                                 textDecoration:m.jobStatus=="close"?"line-through":null
                                                }}
                                        >
                                            
                                            <div style={{margin:"0 0.3rem 0 2rem",
                                                color:m.jobStatus=="open"?"rgb(0,100,0)":"rgb(50,50,50)"
                                                }}>
                                                {m.productName}
                                            </div>
                                            <div style={{margin:"0 0.3rem",
                                                color:m.jobStatus=="open"?"rgb(0,100,0)":"rgb(50,50,50)"
                                                }}>
                                                {`@${m.quantity}`}
                                            </div>
                                            <div style={{margin:"0 0.3rem",
                                                color:m.jobStatus=="open"?"rgb(0,100,0)":"rgb(50,50,50)"
                                                }}>
                                                {`*${m.price}`}
                                            </div>
                                            <div style={{margin:"0 0.3rem",
                                                    color:m.jobStatus=="open"?"rgb(0,100,0)":"rgb(50,50,50)"
                                                }}>
                                                {`=${m.result}`}
                                            </div>

                                            {editQueue==i.queue&&
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    style={{width:"1.2rem",height:"1.2rem"}}
                                                    onChange={e=>{handleCheckbox(e,m)}}
                                                />
                                            </div>
                                            }   

                                        </div>
                                    ))   
                                }


                                {editQueue==i.queue
                                    ?<div style={{display:"flex"}}>
                                        <select
                                            onChange={e=>{
                                            updateProductToCloseOrOpen(e,i,queue_idArray)
                                            

                                            //console.log('queue_idArray')
                                            //console.log(queue_idArray)
                                            }}
                                        >
                                            <option>...</option>
                                            <option>close</option>
                                            <option>open</option>
                                        </select>

                                       
                                    </div>
                                    :null  
                                }

                             
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
export default BillKitchen;
