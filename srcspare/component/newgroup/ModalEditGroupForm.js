import React from 'react';
import { BsTelephoneForward } from 'react-icons/bs';
import {FaFolderPlus,FaFolder,FaFolderOpen,FaCheck,FaBan,
       FaCaretDown,FaCaretUp,FaLaptopHouse} from 'react-icons/fa';
import {MdSearch,MdRefresh,MdEdit} from 'react-icons/md';

import axios from 'axios';
import newGroupUtil  from './newGroupUtil';

const {
    genTree,
    genTreeWithI,
    checkEditGroup,
    checkEditGroupColor,
    closeFolder,
    openFolder,
    loadMainGroup
} = newGroupUtil


function ModalEditTreeForm(props) {

const {
      loadData,
      submitFunc,
      cancelFunc,      
      pageData,
      dataUrl,
      myheader,
} = props

//========================

let [inputState,setInputState]=React.useState(loadData)

const [groupSt,setGroupSt]=React.useState({
    tree:null,
    reloadGroup:true,
    editGroup:null,
    lastRecordId:0,
    qry:{   sort:{gcode:1},
            $or:[{level:1},{level:2},{level:3}]
        },
})

const [showEditParent,setShowEditParent]=React.useState(false)
const [showEditGroupName,setShowEditGroupName]=React.useState(false)
const [showMdEdit,setShowMdEdit]=React.useState(true)
const [isReady,setIsReady]=React.useState(false)

React.useEffect(()=>{

    if(groupSt.reloadGroup){
        //axios.post(`/${dataUrl}/getcustom`,groupSt.qry,myheader)
        axios.post(`/${dataUrl}/getcustom`,groupSt.qry,myheader)
        .then(result=>{
            //console.log('result')
            //console.log(result.data)
            setGroupSt({...groupSt,
                tree:genTree(result.data.data),
                reloadGroup:false,
                lastRecordId:result.data.lastRecordId
            })
        })
        .catch(error=>{
            console.log('error')
        })
    }

},[groupSt])

React.useEffect(()=>{
    
    console.log('editGroup')
    console.log(groupSt.editGroup)

    if(groupSt.editGroup){

        const isChildren=new RegExp("^"+loadData.gcode+"*","gi").test(groupSt.editGroup.gcode)
        
        if(!isChildren){
            const newParent=groupSt.editGroup.gcode   
            const newGcode=newParent+"/"+loadData.groupName
            const tempLevel=newGcode.split("/").length   
            //console.log(newGcode)
            setInputState({...loadData,gcode:newGcode,level:tempLevel})
            setIsReady(true)
        }
    }

},[groupSt.editGroup])

React.useEffect(()=>{
   //console.log('inputState')
   //console.log(inputState)
},[inputState])

//========================

const renderTree=(array)=>{
    return(
        array.map((i,idx)=>{
            const {id,show,gcode,level,groupName,
                   open,haveChild}=i
            return (
            show
            ?<div key={idx}
                  style={{display:"flex",marginLeft:`${level}rem`}}>
                    {open
                    ?<FaFolderOpen className="sm-icon"
                        onClick={e=>{
                            if(i.level>2){
                                setGroupSt({
                                    ...groupSt,
                                    tree:closeFolder(groupSt.tree,i)
                                })
                            }
                           
                            if(i.level==2){
                                //console.log('ssssss')
                                //console.log(i)
                                
                                let tempArray=[]
                                groupSt.tree.map(j=>{
                                    const isChildren=new RegExp("^"+i.gcode+"*","gi").test(j.gcode)

                                    if(isChildren){
                                        let tempObj
                                        if(j.level==2){
                                            tempObj={...j,open:false}
                                            tempArray=[...tempArray,tempObj]
                                        }
                                        else {
                                            tempObj={...j,show:false}
                                            tempArray=[...tempArray,tempObj]
                                        }
                                    }
                                    else{
                                        tempArray=[...tempArray,j]
                                    }
                                    
                                })
                                setGroupSt({
                                    ...groupSt,
                                    tree:tempArray
                                })
                            }
                        }}
                     />
                     :haveChild
                     ?<FaFolderPlus className="sm-icon"
                         onClick={e=>{   
                            if(i.level>2){ 
                                setGroupSt({
                                    ...groupSt,
                                    tree:openFolder(groupSt.tree,i)
                                })
                            }
                          
                         }}
                     />
                     :<FaFolder className="sm-icon"
                         onClick={e=>{
                             console.log('tttttt')
                         }}
                     />
                    
                    }
                    <div style={{display:"flex"}}>
                        <div style={checkEditGroupColor(i,groupSt,"green")}
                            onClick={e=>{
                            //if(canGroupChange){
                                const isChildren=new RegExp("^"+loadData.gcode+"*","gi")
                                                 .test(i.gcode)

                                if(i.level==2&&i.haveChild){
                                    
                                    loadMainGroup(i,dataUrl,myheader)
                                    .then(result=>{
                                        //console.log('loadMainGroup')
                                        //console.log(result)
                                        setGroupSt({...groupSt,
                                            editGroup:isChildren?null:i,
                                            tree:genTreeWithI(result,i)
                                        })

                                    })
                                    
                                }
                                else if(i.level>1){
                                    setGroupSt({...groupSt,
                                        editGroup:isChildren?null:i,
                                    })
                                }
                            //}
                            //else{
                                
                            //}
                        }}>
                            {`${id}.${groupName}`}
                        </div>
                        
                    </div>
             </div>
            :null
            )
        })
    )
}

//========================
const renderBody=()=>{
    return (
        <div className="w100 h-100" style={{display:"flex"}}>
           
            <div className="" 
                style={{width:"50%",height:"100%",padding:"0.5rem",
                        overflowY:"scroll",overflowX:"auto"}}>
                
                {showEditParent&&
                <h5>{pageData.treeTitle}</h5> 
                }
                { groupSt.tree&&showEditParent&&
                    renderTree(groupSt.tree)
                }
           </div>
            
  
           <div className="" style={{width:"50%",padding:"0.5rem"}}>
  
                 <div className="flex-center-center jc-start w-100"
                      style={{marginBottom:"0.5rem"}}
                 >
                     <div className="xc4"> {pageData.id} </div>
                     <div className="xc8">
                        {inputState.id}
                     </div>
                 </div>
              
                 <div className="flex-center-center jc-start w-100"
                      style={{marginBottom:"0.5rem"}}
                 >
                     <div className="xc4" style={{display:"flex"}}> 
                        {pageData.gcode}
                        {!showEditParent&&showMdEdit&&
                        <MdEdit className="sm-icon"
                            onClick={e=>{
                                setShowEditParent(true)
                                setShowMdEdit(false)
                            }}
                        />
                        } 
                     </div>
                     <div className="xc8">
                        {showEditParent
                         ?<input
                             value={inputState.gcode}
                             disabled={"disaled"}
                         />
                         :<div>
                             {inputState.gcode}
                         </div>
                        }
                     </div>
                 </div>

                 <div className="flex-center-center jc-start w-100"
                      style={{marginBottom:"0.5rem"}}
                 >
                     <div className="xc4" style={{display:"flex"}}> 
                        {pageData.groupName} 
                        {!showEditGroupName&&showMdEdit&&
                        <MdEdit className="sm-icon"
                            onClick={e=>{
                                setShowEditGroupName(true)
                                setShowMdEdit(false)
                            }}
                        />
                        }
                    </div>
                     <div className="xc8">
                         {showEditGroupName
                         ?<input
                             value={inputState.groupName}
                             onChange={e=>{
                                 let tempArray=inputState.gcode.split("/")
                                 tempArray[tempArray.length-1]=e.target.value

                                 setInputState({
                                     ...inputState,
                                     groupName:e.target.value,
                                     gcode:tempArray.join("/")
                                 })
                                 setIsReady(true)
                             }}
                         />
                         :<div>
                             {inputState.groupName}
                          </div>
                        }
                     </div>
                 </div>

                 <div className="flex-center-center jc-start w-100"
                      style={{marginBottom:"0.5rem"}}
                 >
                     <div className="xc4"> {pageData.level} </div>
                     <div className="xc8">
                       {inputState.level}
                     </div>
                 </div>

           </div>
        </div>
     )


}
//==========================
return(
    <div className="Modal-background">
       <div className="Modal-box" 
            style={{width:"90%",height:"90%",overflow:"hidden"}}>
    
          <div className="Modal-header" style={{width:"100%",height:"5%"}}>
               <h4>{pageData.formHead}</h4>
          </div>
    
          <div className="w-100 bd-pureWhite" style={{width:"100%",height:"80%"}}>
                   {
                    renderBody()
                   }
          </div>
          
          <div className="Modal-footer" style={{width:"100%",height:"15%"}}>
            {isReady&&
             <div>
                   <button
                      onClick={e=>{
                        submitFunc(inputState)
                      }}
                   >
                      <FaCheck/>
                   </button>
             </div>
             }
             <div>
                   <button
                      onClick={e=>{
                         cancelFunc()
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
    export default ModalEditTreeForm;