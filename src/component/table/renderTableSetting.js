import React from 'react';
import stateUtil from '../../util/stateUtil'
import {FaRegArrowAltCircleUp,FaRegArrowAltCircleDown,FaBan,FaCheck} from 'react-icons/fa'; 

import '../../render/Modal.css'
//=============================

const {changeKeyKey}=stateUtil

const renderTableSetting=({
    setShowTableSetting,
    tableTemplate,setTableTemplate,
    pageData,
    moveup,movedown,
    genObjKeysByColOrder
    })=>{

const objKeys = genObjKeysByColOrder(tableTemplate);                
console.log('objKeys............')
console.log(objKeys)

return(
<div className="Modal-background">
    <div className="Modal-box">
   
        <div className="Modal-header">
            <div>
                <h5>{pageData.formHead}</h5>
            </div>
        </div>
   
        <div className='w-100'>
            <div className="flex-center-baseline jc-start" >
                <div className="xc6"
                     style={{textAlign:"center"}}
                >
                    <div>{pageData.subject}</div>
                </div>
                <div className="xc2"
                     style={{textAlign:"center"}}
                >
                    <div>{pageData.show}</div>
                </div>
            </div>
            {
             objKeys.map((i,index)=>(
                <div className="flex-center-baseline flex-no-wrap m-1" 
                     key={index} >
                    <div className="xc6">
                        <div>{tableTemplate[i].lb}</div>
                    </div>
                    <div className="xc2">
                        <input
                            type="checkbox"
                            checked={tableTemplate[i].showCol}
                            onChange={e=>{
                                if(index>0){
                                    changeKeyKey({
                                        key:`${i}`,
                                        subKey:'showCol',
                                        value:e.target.checked,
                                        inputState:tableTemplate,
                                        setInputState:setTableTemplate
                                    })
                                }
                            }}
                        />
                    </div>
                    <div className='xc2'> 
                        <div className='flex-center-center'>
                        <FaRegArrowAltCircleUp className="md-icon"
                            style={{opacity:index>1?1:0}}
                            onClick={e=>{
                                moveup(index,i,tableTemplate[i])
                            }}
                        />
                        </div>
                    </div>

                    <div className='xc2'>
                        <div className='flex-center-center'>
                        <FaRegArrowAltCircleDown className="md-icon"
                            style={{opacity:(index>0&&index<objKeys.length-1)?1:0}}
                            onClick={e=>{
                                movedown(index,i,tableTemplate[i])
                            }}
                        />
                        </div>
                    </div>

                </div>
             ))   
            }
        </div>
       
        <div className="Modal-footer">
            <div>
                <button
                    onClick={e=>{setShowTableSetting(false)}}
                >
                    <FaCheck/>
                </button>
            </div>
            <div>
                <button
                    onClick={e=>{setShowTableSetting(false)}}
                >
                    <FaBan/>
                </button>
            </div>
        </div>

    </div>
</div>
)}
//=============================
export default renderTableSetting
