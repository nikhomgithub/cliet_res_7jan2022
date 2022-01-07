import React from 'react';
import axios from 'axios';

import testTemplate from './testTemplate'
//===============================
//import renderModalError from './render/renderModalError'
import ModalConfirm from '../ModalConfirm'
import Tree from './Tree'
import treeUtil from './treeUtil'
import {MainContext} from '../../context/MainContext';

import axiosUtil from '../../util/axiosUtil'

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

const {convertToObject,createGroupTree,findAllChildrenIdByGroupTree,
       openAllParentId} = treeUtil

const {groupState,testData}=testTemplate

function AppTree() {

console.log('AppTree')

const {basicData,widthLeft,setWidthLeft,myheader}=React.useContext(MainContext)

const groupDataUrl = "spgroup"
//============================================

//const [loadDataGroup,setLoadDataGroup]=React.useState(null)

const [showAdd,setShowAdd]=React.useState(false)
const [showEdit,setShowEdit]=React.useState(false)
//const [showModalConfirm,setShowModalConfirm]=React.useState(false)
const [editData,setEditData]=React.useState(null)
const [editGroup,setEditGroup]=React.useState(null)
const [allDeleteId,setAllDeleteId]=React.useState(null)

//const [groupTree,setGroupTree]=React.useState(null)
//const [tempObj,setTempObj]=React.useState(convertToObject(groupTree,groupState))

const [selectGroupObjectId,setselectGroupObjectId]=React.useState(null)          
//const [mainGroup,setMainGroup]=React.useState(null)

//const [reloadGroup,setReloadGroup]=React.useState(true) //reloadData
const [showModalError,setShowModalError]=React.useState(false)
const [message,setMessage]=React.useState(null)
const [lastRecordGroup,setLastRecordGroup]=React.useState({id:0}) //data from server 

const [mainState,setMainState]=React.useState({
    reloadGroup:true,
    groupTree:null,
    tempObj:null,
    mainGroup:null
})

//=====================================================

const changeKeyInData=({data,setData,id,key,value})=>{
  let tempData=[]
  if(data){
    data.map(i=>{
        if (i.id==id){
            tempData=[...tempData,{...i,[key]:value}]
        }else{
            tempData=[...tempData,i]
        }
    })
  //setData([...tempData])
  }
  return tempData
}   

const submitFunction=()=>{
  //setShowModalConfirm(false)
}

//================================
//------------------------

/*
const deleteAxiosGroup=()=>{
  return new Promise((resolve,reject)=>{
      axios.post(`/${groupDataUrl}/deletegroup`,
          {...editGroup,allDeleteId:allDeleteIdGroup},
          myheader)
      .then(result=>{
          setReloadGroup(true)
          resolve(true)
      })
      .catch(error=>{
          catchErrorToMessage(error,setMessage)
          //setMessage(error.response.data.message)
          setShowModalError(true)
          setReloadGroup(false)
          reject(false)
      })
  })
}
const addAxiosGroup=(formInputState)=>{
  return new Promise((resolve,reject)=>{
      axios.post(`/${groupDataUrl}/addgroup`,formInputState,myheader)
      .then(result=>{
          setReloadGroup(true)
          resolve(true)
      })
      .catch(error=>{
          catchErrorToMessage(error,setMessage)
          //setMessage(error.response.data.message)
          setShowModalError(true)
          setReloadGroup(false)
          reject(false)
      })
  })
}
const editAxiosGroup=(formInputState)=>{
  setEditGroup(formInputState)
  return new Promise((resolve,reject)=>{
      axios.post(`/${groupDataUrl}/updategroup`,formInputState,myheader)
      .then(result=>{
          setReloadGroup(true)
          resolve(true)
      })
      .catch(error=>{
          catchErrorToMessage(error,setMessage)
          //setMessage(error.response.data.message)
          setShowModalError(true)
          setReloadGroup(false)
          reject(false)
      })
  })
}
*/

const reloadAxiosGroup=()=>{
  /*
  console.log('reloadAxiosGroup')
  let qry={$or:[{parentId:1},{id:1}]}
  if(mainGroup>0){
    qry={$or:[{parentId:1},{id:1},{mainGroup}]}
  }
  */
  if(groupDataUrl){
      axios.post(`/${groupDataUrl}/getcustom`,{},myheader)
      .then(result=>{
          //const temp = createGroupTree({group:result.data.data})
          //setGroupTree(temp)
          //setTempObj(convertToObject(temp,groupState))
          //setLastRecordGroup({id:result.data.lastRecordId})
          //setReloadGroup(false)
      })
      .catch(error=>{
          catchErrorToMessage(error,setMessage)
          //setMessage(error.response.data.message)
          setShowModalError(true)
          //setReloadGroup(false)
      })
  }
  
}

/*

const filterDataByGroup=(id)=>{
  setQry({groupId:id})
  setPageNumber(1)//04-06-2021
  setReloadData(true)
}
*/

React.useEffect(()=>{
  console.log('tempObj')
},[mainState.tempObj])


//--------------------------------
const folderOpenFunc=(i)=>{
  /*
  if(i.id!=1){
    const temp = changeKeyInData({
      data:groupTree,
      //setData:setGroupTree,
      id:i.id,
      key:"open",
      value:false
    })
    setGroupTree(temp)
    setTempObj(convertToObject(temp,groupState))
  }
  */
}

const folderClosePlusFunc=(i)=>{
  /*
  if(i.parentId==1){
    console.log(`load main group : ${i.id}`)
    //setMainGroup(i.id)
    setReloadGroup(true)
  }
  else {
    const temp = changeKeyInData({
      data:groupTree,
      //setData:setGroupTree,<p<p
      id:i.id,
      key:"open",
      value:true
    })
    setGroupTree(temp)
    setTempObj(convertToObject(temp,groupState))
  }
  */
}
const folderCloseFunc=(i)=>{
  /*
  const temp = changeKeyInData({
    data:groupTree,
    //setData:setGroupTree,
    id:i.id,
    key:"open",
    value:true
  })
  setGroupTree(temp)
  setTempObj(convertToObject(temp,groupState))
  */
}
const pOpenFunc=(i)=>{
  /*
  console.log(`filterGroup : ${i.id}`)

  const {folders,...remaining}=i
  setEditGroup(remaining)
  setselectGroupObjectId(i.id)
  setEditGroup(i)
  */
}
const pCloseFunc=(i)=>{
  /*
  console.log(`filterGroup : ${i.id}`)

  const {folders,...remaining}=i
  setEditGroup(remaining)
  setselectGroupObjectId(i.id)
  setEditGroup(i)
  */
}
const delFunc=()=>{
  /*
  const temp=findAllChildrenIdByGroupTree(selectGroupObjectId,loadDataGroup)
  setAllDeleteId(temp)
  setShowModalConfirm(true)
  */
}
const addFunc=()=>{
  setShowAdd(true)
}
const editFunc=()=>{
  setShowEdit(true)
}
const refreshFunc=()=>{
  console.log('refreshFunc')
}
//=================================
React.useEffect(()=>{
  if(mainState.reloadGroup){
      reloadAxiosGroup()
  }
},[mainState.reloadGroup])



//=================================
return(
<div className="bgc-lightGray" style={{height:"100%"}}>
  {
    <Tree
      tempObj={mainState.tempObj}
      canGroupChange={true}

      selectGroupObjectId={selectGroupObjectId}
      folderOpenFunc={folderOpenFunc}
      folderClosePlusFunc={folderClosePlusFunc}
      folderCloseFunc={folderCloseFunc}
      pOpenFunc={pOpenFunc}
      pCloseFunc={pCloseFunc}
      delFunc={delFunc}
      addFunc={addFunc}
      editFunc={editFunc}
      refreshFunc={refreshFunc}
    />
  }
  {/*
    showModalConfirm
    ?<ModalConfirm
      setShow={setShowModalConfirm}
      submitFunction={submitFunction}
     />
    :null
  */}
  <div style={{position:"fixed",top:"0",right:"0"}}>
    <button
      onClick={e=>{ /*setShowModalConfirm(true)*/}}
    > Delete Data
    </button>

    <button
      onClick={e=>setEditData({groupId:4,groupName:'pana'})}
    > Change selectGroupObject</button>
  </div>
</div>
)
}
export default AppTree;
/*










*/

/*

import React from 'react';

import {FaFolderPlus,FaFolder,FaFolderOpen} from 'react-icons/fa';

import {MdRefresh,MdEdit,MdAddCircle,MdDelete,MdFolderSpecial, MdSignalCellularNull} from 'react-icons/md';
import treeUtil from './treeUtil'

import './Tree.css'

const {convertToObject,createGroupTree,findAllChildrenIdByGroupTree,
  openAllParentId} = treeUtil

const Tree=(props)=>{
  //console.log('Tree')
  const {loadData,editData,
         setEditGroup,
         setAllDeleteId,
         groupState,
         setShowAdd,setShowEdit,setShowModalConfirm,
         reloadFunctionForGroup,
         filterDataByGroup,
         canGroupChange,
         clickFolderIcon,
         setClickFolderIcon

        }=props

  const [isSecond,setIsSecond] = React.useState(false)    

  React.useEffect(()=>{
    //console.log(`isSecond : ${isSecond}`)
    if(!isSecond){
        setIsSecond(true)
    }
  },[isSecond])
 
  const [groupTree,setGroupTree]=React.useState(createGroupTree({group:loadData}))
  const [tempObj,setTempObj]=React.useState(convertToObject(groupTree,groupState))
  const [selectGroupObjectId,setSelectGroupObjectId]=React.useState(null)          

  React.useEffect(()=>{
  if(isSecond){
    if(loadData){
      //console.log('loadData')
      if(Array.isArray(loadData)){
        if(loadData.length>0){
          const tempGroupTree=createGroupTree({
            group:loadData,
            prevGroupTree:groupTree
          })
          setGroupTree(tempGroupTree)
        }
      }
    }
  }
  },[loadData])

  React.useEffect(()=>{
  if(isSecond){
    if(groupTree){
      //console.log('groupTree')
      setTempObj(convertToObject(groupTree,groupState))
    }
  }  
  },[groupTree])

  React.useEffect(()=>{
  if(isSecond){
    if(editData){
      setSelectGroupObjectId(editData.groupId)
      setGroupTree(openAllParentId({groupTree,editGroupId:editData.groupId}))
    }
  }
  },[editData])

  React.useEffect(()=>{


  if(isSecond){

    if(selectGroupObjectId&&groupTree){
      groupTree.map(i=>{
        if(i.id==selectGroupObjectId){
          setEditGroup(i)
        }
      })
      const temp=findAllChildrenIdByGroupTree(selectGroupObjectId,groupTree)
      setAllDeleteId(temp)
    }
  }
  },[selectGroupObjectId])
  
  //===================================
  const getBGcolor=(id)=>{
    if(!selectGroupObjectId){return null}
    if(selectGroupObjectId==id){
      return '2px solid rgb(244, 248, 4)'
    }
  }

  const changeKeyInData=({data,setData,id,key,value})=>{
    let tempData=[]
    if(data){
      data.map(i=>{
          if (i.id==id){
              tempData=[...tempData,{...i,[key]:value}]
          }else{
              tempData=[...tempData,i]
          }
      })
    setData([...tempData])
    }
  }   

  //================================
  const renderSubFolder = (subArrs) =>{
    
    return ( subArrs.map((i,index)=> {

      //if(!i){return null}
      return(  
      <div key={index} className="Tree-box">    
        {
          i.open    
          ?<div>
              <FaFolderOpen 
                  className="Tree-open-icon"
                  style={{display:'inline'}}
                  onClick={e=>{                //ถ้าคลิกรูปไอคอน folder เปิดนี้    
                      if(i.parentId==1){
                        setClickFolderIcon(i.id)
                      }   
                    
                      changeKeyInData({
                          data:groupTree,
                          setData:setGroupTree,
                          id:i.id,
                          key:"open",
                          value:false
                      })
                  }}
              />
              
              {i.groupName
              ?<p id={i.groupName}
                  onClick={e=>{
                      setSelectGroupObjectId(i.id)
                      filterDataByGroup(i.id)
                  }}
                  className="Tree-p"
                  style={{color:selectGroupObjectId==i.id?'red':'black',
                          fontSize:i.groupName=="main"?"1.5rem":null
                          }}
              >{`${i.id}.${i.groupName}`}
              </p>
              :null
              }
              <div >
                  {
                  renderSubFolder(i.folders)
                  }    
              </div>
          </div>
          :<div>
              
              {i.children
                ?i.children.length>0  
                  
                  ?<FaFolderPlus 
                      className="Tree-close-icon"
                      style={{display:'inline',
                              border:getBGcolor(i.id)
                    }} 
                      onClick={e=>{    //ถ้าคลิกรูปไอคอน folder ปิดนี้  
                          if(i.parentId==1){
                            setClickFolderIcon(i.id)
                          }    
                          changeKeyInData({
                              data:groupTree,
                              setData:setGroupTree,
                              id:i.id,
                              key:"open",
                              value:true
                          })
                      }}
                  />
                  :<FaFolder
                      className="Tree-close-icon"
                      style={{display:'inline',
                              border:getBGcolor(i.id)
                      }} 
                      onClick={e=>{ //ถ้าคลิกรูปไอคอน folder ปิดนี้       
                          changeKeyInData({
                              data:groupTree,
                              setData:setGroupTree,
                              id:i.id,
                              key:"open",
                              value:true
                          })
                      }}
                  />
                  
                :null  
              }
              {i.groupName
              ?<p id={i.groupName}
                  onClick={e=>{
                    setSelectGroupObjectId(i.id)
                    filterDataByGroup(i.id)
                  }}
                  className="Tree-p"
                  style={{color:selectGroupObjectId==i.id?'red':'black',
                          fontSize:i.groupName=="main"?"1.5rem":null
                          }}
              >{`${i.id}.${i.groupName}`}
              </p>
              :null
              }
          </div>
        }
      </div>
      )}
    ))
  }
  
  //==============================

  return(
    <div className="h-100 w-100" style={{position:"relative"}}>
    
      <div className="h-5">
        <MdRefresh className="lg-icon" onClick={e=>{
          setSelectGroupObjectId(null)
          reloadFunctionForGroup()
        }}
        />
        {selectGroupObjectId>0&&canGroupChange
          ?<MdAddCircle className="lg-icon" onClick={e=>{setShowAdd(true)}}/>
          :null
        }
        {selectGroupObjectId>1&&canGroupChange
          ?<MdEdit className="lg-icon"  onClick={e=>{setShowEdit(true)}} />
          :null
        }
        {selectGroupObjectId>1&&canGroupChange
          ?<MdDelete className="lg-icon" 
              onClick={e=>{
                setShowModalConfirm(true)
                setSelectGroupObjectId(null)
              }}/>
          :null
        }
              
      </div>

      <div className="w-100 h-95"
            style={{overflowY:"scroll",overflowX:"scroll",}}
      >
        { tempObj
          ?renderSubFolder(tempObj)
          :null
        }
      </div>
    </div>
  )
}

Tree.defaultProps={
  loadData:[],
  editData:null,
  setEditGroup:()=>{},
  setAllDeleteId:()=>{},
  groupState:{},
  setShowAdd:()=>{},
  setShowEdit:()=>{},
  setShowModalConfirm:()=>{},
  filterDataByGroup:()=>{},
  canGroupChange:true
}  
export default Tree








*/