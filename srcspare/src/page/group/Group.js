import React from 'react';
import axios from 'axios';

import treeUtil from '../../render/renderTree/treeUtil'
import renderTree from '../../render/renderTree/renderTree'

import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'

import StateUtil from '../../model/StateUtil'

import ModalForm from '../../render/renderForm/ModalForm'
//==================
import ModalConfirm from '../../render/ModalConfirm'
import {MainContext} from '../../context/MainContext'


const {convertToObject,createGroupTree,findAllChildrenId}=treeUtil
const {renderTreeWithState}=renderTree

const {groupForm}=FormTemplate      
const {groupState}=StateTemplate
const {genBlankState}=StateUtil

function Group({selectGroup,setSelectGroup}) {
    const {basicData,setBasicData,
          }=React.useContext(MainContext)

    const [showModalConfirm,setShowModalConfirm]=React.useState(false)
    //=========================
    
    const [showAdd,setShowAdd]=React.useState(false)
    const [showEdit,setShowEdit]=React.useState(false)
    
    //====================================
    const [reloadGroup,setReloadGroup] = React.useState(true);
    //====================================
    const blankData=genBlankState({template:groupState}).state
    //=====================    
    const [groupTree,setGroupTree]=React.useState(null)
    const [tempObj,setTempObj]=React.useState([])
    let [selectGroupObject,setSelectGroupObject]=React.useState(blankData)
    let [allDeleteId,setAllDeleteId]=React.useState([])


    React.useEffect(()=>{
      setSelectGroup({
        id:selectGroupObject.id,
        groupName:selectGroupObject.groupName
      })

      if(selectGroupObject.id>0){
        const tempAllDeleteId=
              findAllChildrenId(selectGroupObject.id,selectGroupObject)
        setAllDeleteId(tempAllDeleteId)
      }

    },[selectGroupObject])


    React.useEffect(()=>{
        if(groupTree){
            setTempObj(convertToObject(groupTree,groupState))
        }
    },[groupTree])

    //=====================
    const [filterData,setFilterData]=React.useState([blankData])

    React.useEffect(()=>{
        if(reloadGroup){
          axios.post('/group/getcustom',
            {},
            {headers: {'Content-Type': 'application/json',
                'Shopauthorization':localStorage.getItem('shopauthorization'),
                'Userauthorization':localStorage.getItem('userauthorization')
            }}
          )
          .then(result=>{

            setReloadGroup(false)
            setFilterData(result.data)
            const groupTree=createGroupTree(result.data)

            setGroupTree(groupTree)
            setTempObj(convertToObject(groupTree,groupState))
            setSelectGroupObject(blankData)
          })
          .catch(err=>{
            setReloadGroup(false)
          })
        }
    },[reloadGroup])
//=============
const actionAfterSuccess=()=>{
  setReloadGroup(true)
}
//==============================
//Add Form  
  
  const param1={
    isAddForm:false,
    lb:'เพิ่มกลุ่มสินค้าใหม่',
    formTemplate:groupForm,
    stateTemplate:groupState,
    
    selectData:{basicData},
    loadData:{parentId:selectGroupObject.id},
    show:showAdd,
    setShow:setShowAdd,
    url:'/group/addcustom',
    
    keyName:null,
    iconAction:null,
    actionAfterSuccess:actionAfterSuccess,//
    useGenFD:false
  }

//=============
//edit Form
//blankData genไว้แล้ว line 34
//[editData,setEditData] สร้างไว้แล้ว line 45

  let param2={
    isAddForm:false,
    lb:'แก้ไขกลุ่มสินค้า',
    formTemplate:groupForm,
    stateTemplate:groupState,

    selectData:{basicData},
    loadData:selectGroupObject,
    setLoadData:setSelectGroupObject,
    show:showEdit,
    setShow:setShowEdit,
    url:'/group/updatecustom',

    keyName:null,
    iconAction:null,
    actionAfterSuccess:actionAfterSuccess,//
    useGenFD:false
  
  }

//=============

return (
  <div className="h-100 w-100">
      <div className="flex-center-center"
           style={{height:"5%"}}
      >
        <h1>กลุ่มสินค้า</h1>
      </div>
      <div className="w-100"
           style={{height:"95%"}}
      >
        {
      
        tempObj  
        ?renderTreeWithState({
          arrs:tempObj,
          selectGroupObject,setSelectGroupObject,
          groupTree,setGroupTree,
          setShowAdd,
          setShowEdit,
          setShowModalConfirm,
          blankData
        })
        :null
        
      }
      </div>
    
    {showAdd?<ModalForm param={param1}/>:null}
    {showEdit?<ModalForm param={param2}/>:null}

    { showModalConfirm
      ?<ModalConfirm
        show={showModalConfirm}
        setShow={setShowModalConfirm}
        url={'/group/deletecustom'}
        //editData:{id:1000},
        editData={{...selectGroupObject,allDeleteId}}
        setReload={setReloadGroup}
        submitOption={0}
        actionAfterSuccess={actionAfterSuccess}
    />
    :null
    } 

  </div>
  );
}

export default Group;
