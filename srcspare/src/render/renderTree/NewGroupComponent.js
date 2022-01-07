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
import renderModalError from '../renderModalError'
import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../renderForm/FormTemplate'
import ModalForm from '../renderForm/ModalForm'


const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

const {convertToObject,createGroupTree,findAllChildrenId,findAllChildrenByGroupTree,
       openAllParentId} = treeUtil

const {groupState,testData}=testTemplate

function NewGroupComponent(props) {
  const {groupDataUrl,canGroupChange,
         selectData,setSelectGroup,
         filterDataByGroup,editData,
         groupFormTemplate,
         groupEditFormTemplate,
         groupAddFormTitle,
         groupEditFormTitle

        }=props

console.log('NewGroupComponent')

const {myheader}=React.useContext(MainContext)

const [groupSt,setGroupSt]=React.useState({
    reloadGroup:true,
    groupTree:null,
    openArray:[1],
    tempObj:null,
    mainGroup:null,
    lastRecordGroup:{id:0},
    showError:false,
    message:null,
    showAdd:false,
    showEdit:false,
    showConfirm:false,
    allDeleteId:[]
})

const [editGroup,setEditGroup]=React.useState(null)          
//const [editData,setEditData]=React.useState(null)


//=====================================================

const changeKeyInData=({data,id,key,value,openArray})=>{
  console.log('changeKeyInData')

  let tempArray=[]
  if(value==false){
    openArray.map((i,idx)=>{
      if(i!=id){
        tempArray=[...tempArray,i]
      }
    })
  }

  if(value==true){
    tempArray=[...openArray,id]
  }

  //tempArray=[...tempArray,id]

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
  //console.log('000df0df')
  return {groupTree:tempData,openArray:tempArray}
}   


const reloadAxiosGroup=({mainGroup,openArray})=>{
  console.log('reloadAxios')
  //1: initial load
  //default, load for id=1, parentID =1 
  let qry={$or:[{parentId:1},{id:1}]}

  //2: load after select mainGroup
  //if mainGroup is selected, load for mainGroup as well
  if(mainGroup>0){
    qry={$or:[{parentId:1},{id:1},{mainGroup}]}
  }
  
  //3. load for addGroup
  //default, tempOpenArray=[1]
  //if mainGroup is selected,openArry has mainGroup as well 
  let tempOpenArray = [1]
  if(mainGroup>1){
    tempOpenArray=[1,mainGroup]
  }
  
  //if there is openArray,use openArray instead 
  // for delete,add and update
  if(openArray){
    tempOpenArray=openArray
  }

  if(groupDataUrl){
      axios.post(`/${groupDataUrl}/getcustom`,qry,myheader)
      .then(result=>{
          //console.log('....result.......')
          //console.log(result.data.data)
          const temp= createGroupTree({group:result.data.data,openArrayIn:tempOpenArray})
          const groupTree=temp.groupTree
          const openArray=temp.openArray

          const temp35=convertToObject(groupTree,groupState)
          //console.log(temp35)
          //setReloadGroup(false)
          let tempSt = { ...groupSt,
            groupTree: groupTree,
            openArray: openArray,
            tempObj:convertToObject(groupTree,groupState),
            lastRecordGroup: {id:result.data.lastRecordId},
            reloadGroup:false,
            showAdd:false,
            showEdit:false,
            showConfirm:false,
            mainGroup
          }

          setGroupSt(tempSt)
      })
      .catch(error=>{
          catchErrorToMessage(error,(value)=>{setGroupSt({...groupSt,message:value})})
          //setMessage(error.response.data.message)
          const tempSt={...groupSt,
            reloadGroup:false,
            showError:true
          }
          console.log(tempSt)
          //setGroupSt(tempSt)
          //setReloadGroup(false)
      })
  } 
}
//=================================
const deleteAxiosGroup=(id,parentId,allDeleteId)=>{
  
  const qry = {id,parentId,allDeleteId}

  if(groupDataUrl){
    axios.post(`/${groupDataUrl}/deletegroup`,qry,myheader)
    .then(result=>{ 
      reloadAxiosGroup({mainGroup:groupSt.mainGroup,openArray:groupSt.openArray})
    } )
    .catch(error=>{
      catchErrorToMessage(error,(value)=>{setGroupSt({...groupSt,message:value})})
    })
  }
}

const addAxiosGroup = (formInputState)=>{
  let qry = formInputState

  console.log('formInputState')
  console.log(formInputState)

  if(formInputState.parentId==1){
    qry.mainGroup=qry.id
  }

  // id,groupName,
  //parentId,mainGroup,parentGroup
  //children
  if(groupDataUrl){
    axios.post(`/${groupDataUrl}/addgroup`,qry,myheader)
    .then(result=>{ 
      reloadAxiosGroup({mainGroup:groupSt.mainGroup,openArray:groupSt.openArray})
    } )
    .catch(error=>{
      showErrorModal()
    })
  }
}
//=================================
const folderOpenFunc=(i)=>{
  if(i.id>1){
    const {groupTree}=groupSt
    const temp = changeKeyInData({data:groupTree,id:i.id,key:"open",value:false,
                                  openArray:groupSt.openArray})
    const temp2 = convertToObject(temp.groupTree,groupState)
    const tempSt={...groupSt,tempObj:temp2,groupTree:temp.groupTree,openArray:temp.openArray}
    setGroupSt(tempSt)
  }
}

const folderClosePlusFunc=(i)=>{
  if(i.parentId!=1){
    const {groupTree}=groupSt
    const temp = changeKeyInData({data:groupTree,id:i.id,key:"open",value:true,
                                  openArray:groupSt.openArray})
    const temp2 = convertToObject(temp.groupTree,groupState)
    const tempSt={...groupSt,tempObj:temp2,groupTree:temp.groupTree,openArray:temp.openArray}
    setGroupSt(tempSt)
  }
  else {
    reloadAxiosGroup({mainGroup:i.id,openArray:null})
  } 
}
const folderCloseFunc=(i)=>{
  if(i.parentId!=1){
    const {groupTree}=groupSt
    const temp = changeKeyInData({data:groupTree,id:i.id,key:"open",value:true,
                                 openArray:groupSt.openArray})
    const temp2 = convertToObject(temp.groupTree,groupState)
    const tempSt={...groupSt,tempObj:temp2,groupTree:temp.groupTree,openArray:temp.openArray}
    setGroupSt(tempSt)
  }
  else {
    reloadAxiosGroup({mainGroup:i.id,openArray:null})
  } 
}

const pOpenFunc=(i)=>{
  console.log(`filterGroup : ${i.id}`)
  filterDataByGroup(i)
  //filterDataByGroup(i.id)
  
  if(i.parentId==1){
    const {folders,...remaining}=i
    //setSelectGroup(remaining)
    setEditGroup(remaining)
    reloadAxiosGroup({mainGroup:i.id,openArray:null})
  }
  else {
    const {folders,...remaining}=i
    //setSelectGroup(remaining)
    setEditGroup(remaining)
  }

}

const pCloseFunc=(i)=>{
  console.log(`filterGroup : ${i.id}`)
  filterDataByGroup(i)
  //filterDataByGroup(i.id)


  if(i.parentId==1){
    const {folders,...remaining}=i
    //setSelectGroup(remaining)
    setEditGroup(remaining)
    reloadAxiosGroup({mainGroup:i.id,openArray:null})

  }
  else{
    const {folders,...remaining}=i
    //setSelectGroup(remaining)
    setEditGroup(remaining)
  }

}

const setEditGroupFunc=(i)=>{
  const {folders,...remaining}=i
  setEditGroup(remaining)
  setSelectGroup(remaining)
}

const hideConfirmModal=()=>{
  const temp = {...groupSt,showConfirm:false}
  setGroupSt(temp)
}

const hideErrorModal=()=>{
  const temp = {...groupSt,showError:false}
  setGroupSt(temp)
}

const hideEditModal=()=>{
    const temp={...groupSt,showEdit:false}
    setGroupSt(temp)
}

const hideAddModal=()=>{
  const temp={...groupSt,showAdd:false}
  setGroupSt(temp)
}

const showErrorModal=()=>{
    const temp = {...groupSt,showError:true}
    setGroupSt(temp)
}

const showDelModal=()=>{
  //if(editGroup.mainGroup==groupSt.mainGroup){
    const temp = {...groupSt,showConfirm:true}
    setGroupSt(temp)
  //}
}

const showAddModal=()=>{
  const temp = {...groupSt,showAdd:true}
  setGroupSt(temp)
}

const showEditModal=()=>{
  const temp = {...groupSt,showEdit:true}
  setGroupSt(temp)
}

const delFunc=()=>{
  console.log('delFunc')
  const temp=findAllChildrenByGroupTree(editGroup.id,groupSt.groupTree)
  const id=editGroup.id
  const parentId=editGroup.parentId
  const allDeleteId=temp.allDeleteId
  deleteAxiosGroup(id,parentId,allDeleteId)
}

const addFunc=(formInputState)=>{
  console.log('addFunc')
  addAxiosGroup(formInputState)
}


const editFunc=(formInputState)=>{
  let {id,newId,parentId,newParentId,mainGroup,parentGroup} = formInputState
  //สองค่านี้อยู่ในฟอร์มต้องเปลี่ยนเป็นตัวเลข 
  newId = parseInt(newId)
  newParentId = parseInt(newParentId) 
  //ปรับแก้ค่าใน formInputStte ที่เป็นสตริงให้เป็น number 
  let newFormInputState = {...formInputState,newId,parentId}

  //if(newId<=1){ error  }

  //4................................
  if( (newId!=id)&&(newId>1) ){
    let newMainGroup=null
    if(parentId==1){ newMainGroup=newId } else{ newMainGroup=mainGroup }
    newFormInputState={...newFormInputState,newMainGroup}
    
    const temp=findAllChildrenByGroupTree(id,groupSt.groupTree)
    const allChildrenId=temp.allDeleteId
    let tempAllChilden=temp.allDeleteObject

    let newAllChildren = []

    tempAllChilden.map((i,idx)=>{
      if(idx>0){  //ไม่เอาตัวเราเอง
        let temp=[]  //ไว้จัดเก็บ parentGroup ใหม่ ของลูกๆ 
        i.parentGroup.map(j=>{
          if(j==id){
            temp=[...temp,newId]
          }
          else{
            temp=[...temp,j]
          }
        })
        const newParentIdOfChildren=temp[temp.length-1]
        const newI={...i,
          mainGroup:newMainGroup,
          parentId:newParentIdOfChildren,
          parentGroup:temp
        }
        newAllChildren=[...newAllChildren,newI]
      }
    }) 
  
    let parentObject
    groupSt.groupTree.map(i=>{
      if(i.id==parentId){
        const {_id,v,...remaining}=i
        parentObject=remaining
      }
    })  

    let tempParentNewChildren=[]
    parentObject.children.map(i=>{
      if(i==id){
        tempParentNewChildren=[...tempParentNewChildren,newId]
      }
      else{
        tempParentNewChildren=[...tempParentNewChildren,i]
      }
    })
    parentObject={...parentObject,children:tempParentNewChildren}

    const tempFormInputState={...newFormInputState,id:newId,mainGroup:newMainGroup}

    const tempForIdChange = {
      ...newFormInputState,
        deleteMany:[parentObject.id,...allChildrenId],
        create:[parentObject,tempFormInputState,...newAllChildren]
      
    }
   
    axios.post(`/${groupDataUrl}/updategroup`,tempForIdChange,myheader)
    .then(result=>{ 
      reloadAxiosGroup({mainGroup:groupSt.mainGroup,openArray:groupSt.openArray})
    } )
    .catch(error=>{
      showErrorModal()
    })
  }
  else if( (parentId!=newParentId) && (newParentId>0) ){
    const temp=findAllChildrenByGroupTree(id,groupSt.groupTree)
    const allChildrenId=temp.allDeleteId
    let tempAllChilden=temp.allDeleteObject

    let parentObject
    groupSt.groupTree.map(i=>{
      if(i.id==parentId){
        const {_id,v,...remaining}=i
        parentObject=remaining
      }
    }) 

    const tempForParentIdChange = {
        ...newFormInputState,
        parentObject,
        allChildrenId,
        tempAllChilden
    }

    axios.post(`/${groupDataUrl}/updategroup`,tempForParentIdChange,myheader)
    .then(result=>{ 
      reloadAxiosGroup({mainGroup:groupSt.mainGroup,openArray:groupSt.openArray})
    } )
    .catch(error=>{
      showErrorModal()
    })

  }
  else {
    axios.post(`/${groupDataUrl}/updategroup`,newFormInputState,myheader)
    .then(result=>{ 
      reloadAxiosGroup({mainGroup:groupSt.mainGroup,openArray:groupSt.openArray})
    } )
    .catch(error=>{
      showErrorModal()
    })
  }

}


const refreshFunc=()=>{
  reloadAxiosGroup({mainGroup:null,openArray:null})
}

const zoomFunc=()=>{
  console.log('zoomFunc')

  if(editData){
    const qry={id:editData.groupId}
    axios.post(`/${groupDataUrl}/getcustom`,qry,myheader)
    .then(result=>{
        const temp=result.data.data[0]
        reloadAxiosGroup({mainGroup:temp.mainGroup,openArray:temp.parentGroup})
    })
    .catch(error=>{
        catchErrorToMessage(error,(value)=>{setGroupSt({...groupSt,message:value})})
    })

  }
  //reloadAxiosGroup(selectData)
}
//==================================
React.useEffect(()=>{
  if(groupSt.reloadGroup){
    reloadAxiosGroup({mainGroup:null,openArray:null})
  }
},[groupSt])

//=================================

//=================================
return(
<div className="bgc-lightGray" 
     style={{height:"100%"}}>

  <Tree
      tempObj={groupSt.tempObj}
      canGroupChange={canGroupChange}
      selectGroupObjectId={editGroup?editGroup.id:null}

      folderOpenFunc={folderOpenFunc}
      folderClosePlusFunc={folderClosePlusFunc}
      folderCloseFunc={folderCloseFunc}
      pOpenFunc={pOpenFunc}
      pCloseFunc={pCloseFunc}
      delFunc={showDelModal}
      addFunc={showAddModal}
      editFunc={showEditModal}
      refreshFunc={refreshFunc}
      zoomFunc={zoomFunc}
      setEditGroupFunc={setEditGroupFunc}
  />

  {
      groupSt.showConfirm
      ?<ModalConfirm
        setShow={hideConfirmModal}
        submitFunction={delFunc}
      />
      :null
  }
  { 
      groupSt.showAdd
      ?<ModalForm
          lb={groupAddFormTitle}
          formTemplate={groupFormTemplate}
          stateTemplate={StateTemplate.groupState}
          loadData={{
            id:groupSt.lastRecordGroup.id+1,
            parentId:editGroup.id,
            mainGroup:editGroup.mainGroup,
            parentGroup:[...editGroup.parentGroup,editGroup.id]
          }}
          submitFunction={addFunc}
          setShow={hideAddModal}
          selectData={selectData}
        />
      :null
  }
  { 
      groupSt.showEdit
      ?<ModalForm
          lb={groupEditFormTitle}
          formTemplate={groupEditFormTemplate}
          stateTemplate={StateTemplate.groupState}
          loadData={{...editGroup,newId:editGroup.id,newParentId:editGroup.parentId}}
          submitFunction={editFunc}
          setShow={hideEditModal}
          selectData={selectData}
        />
      :null
  }
  { 
    groupSt.showError 
    ?renderModalError({
      setShow:hideErrorModal,
      message:groupSt.message,
      setMessage:()=>{}
    })
    :null

  }

</div>
)
}

NewGroupComponent.defaultProps={
  groupAddFormTitle:"Add Group",
  groupEditFormTitle:"Edit Group"
}

export default NewGroupComponent;
