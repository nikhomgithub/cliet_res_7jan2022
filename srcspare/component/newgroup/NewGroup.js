
import React from 'react';
import {MainContext} from '../../context/MainContext'
import {FaFolderPlus,FaFolder,FaFolderOpen, FaCaretDown,FaCaretUp,FaLaptopHouse} from 'react-icons/fa';
import {MdRefresh,MdEdit,MdAddCircle,MdDelete,MdFolderSpecial, MdZoomIn,MdSearch} from 'react-icons/md';
import {RiShareForwardLine} from 'react-icons/ri'
import ModalConfirm from '../../render/ModalConfirm';
import ModalEditGroupForm from './ModalEditGroupForm'
import ModalAddGroupForm from './ModalAddGroupForm'
import Ticon from '../../component/ticon/Ticon'

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

function NewGroup(props) {

const {myheader,dataUrl,filterByGroupId,captureEditGroup,canGroupChange,bgColor,pageData}=props

console.log('NewGroup')

const {groupPage,editGroupForm,addGroupForm}=pageData

/*
const groupPage={
    formHead:"กลุ่มสินค้า"
}

const editGroupForm={
    formHead:"แก้ไขกลุ่ม",
    treeTitle:"เลือกกลุ่มสินค้าแม่ใหม่ถ้าต้องการย้ายกลุ่ม",
    id:"ไอดี",
    gcode:"โค้ดกลุ่ม",
    groupName:"ชื่อกลุ่ม",
    level:"ระดับกลุ่ม",
}

const addGroupForm={
    formHead:"เพิ่มกลุ่ม",
    treeTitle:"เลือกกลุ่มสินค้าแม่",
    id:"ไอดี",
    gcode:"โค้ดกลุ่ม",
    groupName:"ชื่อกลุ่ม",
    level:"ระดับกลุ่ม"
}
*/

const blankData={
    id:null,
    gcode:null,
    level:null,
    groupName:""
}

const [groupSt,setGroupSt]=React.useState({
    tree:null,
    reloadGroup:true,
    editGroup:null,
    qry:{   sort:{gcode:1},
            $or:[{level:1},{level:2},{level:3}]
        },
    lastRecordId:0,
    showAddForm:false,
    showEditForm:false,
    showConfirm:false,
    showError:false
})
const [showTree,setShowTree]=React.useState(true)

//---------------------
const submitAddGroupFunc=(inputState)=>{
    axios.post(`/${dataUrl}/addcustom`,inputState,myheader)
    .then(result=>{
        setGroupSt({...groupSt,
            reloadGroup:true,
            showAddForm:false,
            //editGroup:null
        })
    })
    .catch(error=>{
        console.log('error')
        console.log(error)
    })

}
//---------------------
const submitUpdateGroupFunc=(inputState)=>{
    console.log('submitUpdateGroupFunc')

    let tempDeleteArray=[]
    let tempArray=[]

    groupSt.tree.map(i=>{
     
        if(i.id==inputState.id){
            const newGcode=i.gcode.replace(groupSt.editGroup.gcode,inputState.gcode)
            const newLevel=newGcode.split("/").length
            
            tempArray=[...tempArray,
                {...i,
                    level:newLevel,
                    gcode:newGcode,
                    groupName:inputState.groupName}
              ]
            tempDeleteArray=[...tempDeleteArray,i.id]
        }
        else{
            const newGcode=i.gcode.replace(groupSt.editGroup.gcode,inputState.gcode)
            const newLevel=newGcode.split("/").length

            const isChildren=new RegExp("^"+groupSt.editGroup.gcode+"\/","gi").test(i.gcode)
            if(isChildren){
                tempArray=[...tempArray,
                    {...i,
                        level:newLevel,
                        gcode:newGcode}
                  ]
                tempDeleteArray=[...tempDeleteArray,i.id]
            }
        }
    })
    //console.log(tempArray)
    //console.log(tempDeleteArray)
    
    if(tempDeleteArray.length>0){

        const qry={
            toDelete:{id:{$in:tempDeleteArray}},
            toUpdate:tempArray
        }

        axios.post(`/${dataUrl}/updategroup`,qry,myheader)
        .then(result=>{
            setGroupSt({...groupSt,
                reloadGroup:true,
                showEditForm:false,
                editGroup:null
            })
        })
        .catch(error=>{
            console.log('error')
            console.log(error)
        })
    }
    
}
//-------------------------
const submitDeleteGroupFunc=()=>{
    console.log(groupSt.editGroup)
    //const {id,parentId,allDeleteId}=req.body
    //const isChildren=new RegExp("^"+groupSt.editGroup.gcode+"*","gi").test(i.gcode)
    let tempArray=[groupSt.editGroup.id]

    groupSt.tree.map(i=>{
        if(i.level>groupSt.editGroup.level){
            const isChildren=new RegExp("^"+groupSt.editGroup.gcode+"\/","gi").test(i.gcode)
            if(isChildren){
                tempArray=[...tempArray,i.id]
            }
        }
        
    })

    //console.log(tempArray)
    const qry={allDeleteId:tempArray}
    axios.post(`/${dataUrl}/deletegroup`,qry,myheader)
    .then(result=>{
        setGroupSt({...groupSt,
            reloadGroup:true,
            editGroup:null,
            showConfirm:false
        })
    })
    .catch(error=>{
        console.log('error')
    })
    
}


//-------------------------
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

//------------------------------

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
                                    const isChildren=new RegExp("^"+i.gcode+"\/","gi").test(j.gcode)

                                    if(i.id==j.id){
                                        const tempObj={...j,open:false}
                                        tempArray=[...tempArray,tempObj]
                                    }
                                    else if(isChildren){
                                        const tempObj={...j,show:false}
                                        tempArray=[...tempArray,tempObj]
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
                        <div style={checkEditGroupColor(i,groupSt)}
                            onClick={e=>{
                            if(canGroupChange){
                                if(i.level==2&&i.haveChild){
                                    
                                    loadMainGroup(i,dataUrl,myheader)
                                    .then(result=>{
                                        //console.log('loadMainGroup')
                                        //console.log(result)
                                        setGroupSt({...groupSt,
                                            editGroup:i,
                                            tree:genTreeWithI(result,i)
                                        })
                                    })
                                    
                                }
                                if(i.level==2){
                                    setGroupSt({...groupSt,
                                        editGroup:i})
                                }
                                else if(i.level>2){
                                    setGroupSt({...groupSt,
                                        editGroup:i})
                                }
                            }
                            else{
                                
                            }
                        }}>
                            {`${groupName}`}
                        </div>
                        <MdSearch className="sm-icon" 
                            style={{marginLeft:"1rem"}}
                            onClick={e=>{
                                filterByGroupId(i)
                            }}
                        />
                    </div>
             </div>
            :null
            )
        })
    )
}


const renderBadge=()=>{
    return (
    <div className=""
        style={{height:"2rem",width:"100%",
                display:"flex",backgroundColor:bgColor
        }}
    >
        <div className="iconbox"
             onClick={e=>{
                setGroupSt({...groupSt,
                    reloadGroup:true,
                    editGroup:null
                })
            }}
        >
            <Ticon 
                iconName="MdRefresh" 
                className="sm-icon"
                textStyle={{color:"black"}}
               
            />
        </div>
     
        {canGroupChange&&
        <div className="iconbox"
            onClick={e=>{
                setGroupSt({
                        ...groupSt,
                        showAddForm:true
                })
            }}
        >
            <Ticon 
                iconName="MdAddCircle" 
                className="sm-icon"
                textStyle={{color:"black"}}

            />
        </div>
        }
        {checkEditGroup(groupSt)&&canGroupChange&&
        <div className="iconbox"
            onClick={e=>{
                setGroupSt({
                    ...groupSt,
                    showEditForm:true
                })
            }}
        >
            <Ticon
                iconName="MdEdit" 
                className="sm-icon"
                textStyle={{color:"black"}}

            />
        </div>
        }
        {checkEditGroup(groupSt)&&canGroupChange&&
        <div className="iconbox"
            onClick={e=>{
                setGroupSt({
                    ...groupSt,
                    showConfirm:true
                })
            }}
        >
            <Ticon
                iconName="MdDelete" 
                className="sm-icon"
                textStyle={{color:"black"}}

            />
        </div>
        }
        {checkEditGroup(groupSt)&&canGroupChange&&
        <div className="iconbox"
            onClick={e=>{
                captureEditGroup(groupSt.editGroup)
            }}
        >
            <   Ticon
                iconName="RiShareForwardLine" 
                className="sm-icon"
                textStyle={{color:"black"}}

            />
        </div>
        }
        
    </div>
    )
}


//=============================
return(
<div className=""
     style={{height:"100%",width:"100%"}}>

    <div className="flex-center-center"
        style={{height:"",width:"100%"}}
    >   
        
        <div className="flex-center-center">
            <h5>{groupPage.formHead}</h5>
            {
                showTree
                ?<FaCaretDown className="sm-icon"
                    onClick={e=>setShowTree(!showTree)}
                />
                :<FaCaretUp className="sm-icon"
                    onClick={e=>setShowTree(!showTree)}
                />
            }
        </div>
        
        {showTree&&groupSt.tree&&
            renderBadge()
        }

        {showTree&&groupSt.tree&&
        <div style={{height:"95%",width:"100%"}}
        >
            {
             renderTree(groupSt.tree)
            }
        </div>
        }
        
        {groupSt.showEditForm&&
            <ModalEditGroupForm
                loadData={groupSt.editGroup}
                submitFunc={submitUpdateGroupFunc}
                cancelFunc={()=>setGroupSt({...groupSt,showEditForm:false})}
                //setTree={setTree}
                myheader={myheader}
                pageData={editGroupForm}
                dataUrl={dataUrl}
            />
        }

        {groupSt.showAddForm&&
            <ModalAddGroupForm
                loadData={{...blankData,id:parseInt(groupSt.lastRecordId)+1}}
                submitFunc={submitAddGroupFunc}
                cancelFunc={()=>setGroupSt({...groupSt,showAddForm:false})}
                //setTree={setTree}
                myheader={myheader}
                pageData={addGroupForm}
                dataUrl={dataUrl}
            />
        }

        {groupSt.showConfirm&&
            <ModalConfirm
                setShow={(data)=>{setGroupSt({...groupSt,showConfirm:data})}}
                submitFunction={submitDeleteGroupFunc}
            />
        }

    </div>
</div>


)
}

NewGroup.defaultProps={
    myheader:null,
    dataUrl:"",
    filterByGroupId:()=>{},
    captureEditGroup:()=>{},
    canGroupChange:true,
    bgColor:"#72a2d9"
}


export default NewGroup;



