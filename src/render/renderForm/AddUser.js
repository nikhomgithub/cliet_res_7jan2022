import React from 'react';

import Table from '../../component/table/Table'
import axios from 'axios'
import uuid from 'react-uuid'
import axiosUtil from '../../util/axiosUtil'
import pageUtil from '../../component/pageComponent/pageUtil'
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import ChangeUserPasswordModal from './ChangeUserPasswordModal';
import {FaPlusCircle,FaBan} from 'react-icons/fa';
import {MdRefresh,MdAddCircle,MdEdit,MdDelete,MdSwapHoriz,MdClose,MdPassword
} from 'react-icons/md'
import ModalConfirm from '../ModalConfirm';
import '../Modal.css'
import renderModalError from '../renderModalError';
import Ticon from '../../component/ticon/Ticon'

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil
const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil


function AddUser({
    pageData,
    basicData,
    tableTemplate,
    myheader,
    setShow,
    submitFunction,
    //submitCancel
}) {
    //console.log('AddUser')
    //console.log(pageData)

    const [filterData,setFilterData]=React.useState({
        data0:null,
        count:0,
        lastRecordId:null,
        reloadData:true
    })


    const [userTableTemplate,setUserTableTemplate]=React.useState(tableTemplate.userListTableTemplate)
    const [editData,setEditData]=React.useState(null)

    const [showAddUser,setShowAddUser]=React.useState(false)
    const [showEditUser,setShowEditUser]=React.useState(false)
    const [showChangeUserPasswordModal,setShowChangeUserPasswordModal]=React.useState(false)
    const [showModalConfirm,setShowModalConfirm]=React.useState(false)

    const [error,setError]=React.useState({
        showModalError:false,
        message:""
    })

    const saveTableTemplateFunc=(tableTemplate)=>{
        let tempObj={}
        Object.keys(tableTemplate).map(i=>{
           const temp={...tableTemplate[i],showColHead:true}
            tempObj={...tempObj,[i]:temp}
        })
        //console.log(tableTemplate)
        //console.log(tempObj)
        setUserTableTemplate(tempObj)
        saveTableTemplate(tableTemplate,'p35tabletemplate',
        'userListTableTemplate',myheader)
    }

    React.useEffect(()=>{


    },[filterData])

    React.useEffect(()=>{
        if(filterData.reloadData){
        
            axios.post(`/p35user/getuser`,{sort:{id:1}},myheader)
            .then(result=>{
                //console.log(result)
                console.log('result.data.data.....')
                console.log(result.data.data)
                
                const tempResult={...filterData,
                    data0:result.data.data,
                    count:result.data.count,
                    lastRecordId:result.data.lastRecordId,
                    reloadData:false
                }
                setFilterData(tempResult)
            })
            .catch(error=>{
                const tempError={...filterData,
                    reloadData:false,
                    message:catchErrorToMessage(error),
                    showModalConfirm:false,
                    showModalError:true,
                }
                setFilterData(tempError)
            })
        }
    },[filterData])
    //==============================
  const addUserFunc=(formInputState)=>{

    axios.post(`/p35user/adduser`,formInputState,myheader)
    .then(result=>{
        console.log('result.....')
        console.log(result)
        
        const tempResult={...filterData,
            reloadData:true
        }
        setFilterData(tempResult)
        setShowAddUser(false)
    })
    .catch(error=>{
        const tempError={...filterData,
            reloadData:false,
            message:catchErrorToMessage(error),
            showModalConfirm:false,
            showModalError:true,
        }
        setFilterData(tempError)
    })
  }
  //==============================
  const updateUserFunc=(formInputState)=>{

    axios.post(`/p35user/updateuser`,formInputState,myheader)
    .then(result=>{
        console.log('result.....')
        console.log(result)
        
        const tempResult={...filterData,
            reloadData:true
        }
        setFilterData(tempResult)
        setShowEditUser(false)
    })
    .catch(error=>{
        const tempError={...filterData,
            reloadData:false,
            message:catchErrorToMessage(error),
            showModalConfirm:false,
            showModalError:true,
        }
        setFilterData(tempError)
    })
  }

  const changePasswordFunc=(formInputState)=>{
    const {id,password}=formInputState

    axios.post(`/p35user/changeuserpassword`,{id,password},myheader)
    .then(result=>{
        
        const tempResult={...filterData,
            reloadData:true
        }
        setFilterData(tempResult)
        setShowChangeUserPasswordModal(false)
    })
    .catch(error=>{
        const tempError={...filterData,
            reloadData:false,
            message:catchErrorToMessage(error),
            showModalConfirm:false,
            showModalError:true,
        }
        //setFilterData(tempError)
    })
  }
  //==============================
  const deleteFunc=()=>{

    if(editData.id==1){
        setError({
            showModalError:true,
            message:"Do not delete ID=1"
        })
    }
    else{
        axios.post(`/p35user/deleteuser`,{id:editData.id},myheader)
        .then(result=>{
            
            const tempResult={...filterData,
                reloadData:true
            }
            setFilterData(tempResult)
            setShowModalConfirm(false)
        })
        .catch(error=>{
            const tempError={...filterData,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            }
            //setFilterData(tempError)
        })
    }
  }
  //==============================
  //==============================
  //==============================
const styleRight={position:"fixed",
  top:"3rem",right:"0.5rem",zIndex:"100",
  width:"",backgroundColor:"white",
  borderRadius:"10px",margin:""
}
const styleLeft={position:"fixed",
  top:"3rem",Left:"0.5rem",zIndex:"100",
  width:"",backgroundColor:"white",
  borderRadius:"10px",margin:""
}

const [swapStyleRight,setSwapStyleRight]=React.useState(true)

const renderToolBox=()=>{
  return(
      <div style={swapStyleRight?styleRight:styleLeft}>
          <div className="iconbox"
               style={{height:"3.5rem"}}
                onClick={e=>{
                    //setShowAddUser()
                    setShowModalConfirm(true)
               }}
          >
              <Ticon
                  iconName="MdDelete" 
                  className="md-icon"
                  textStyle={{color:"black"}}
              />
          </div>
          <div className="iconbox"
                style={{height:"3.5rem"}}
                 onClick={e=>{
                    setShowAddUser(true)
                   // insertLine()
                }}
          >
              <Ticon
                  iconName="MdAddCircle" 
                  className="md-icon"
                  textStyle={{color:"black"}}
              />
          </div>
          <div className="iconbox"
                style={{height:"3.5rem"}}
                onClick={e=>{
                    setShowEditUser(true)
                    //editUser()
                }}
          >
              <Ticon 
                iconName="MdEdit" 
                className="md-icon"
                textStyle={{color:"black"}}
              />
          </div>
          <div className="iconbox"
               style={{height:"3.5rem"}}
             onClick={e=>{
                setShowChangeUserPasswordModal(true)
             }}
          >
              <Ticon
                  iconName="MdPassword" 
                  className="md-icon"
                  textStyle={{color:"black"}}
              />
          </div>

          <div className="iconbox"
               style={{height:"3.5rem"}}
                onClick={e=>{
                    setSwapStyleRight(!swapStyleRight)
                }}
          >
              <Ticon
                iconName="MdSwapHoriz" 
                className="xl-icon"
                textStyle={{color:"black"}}
              />
          </div>

          <div className="iconbox"
                style={{height:"3.5rem"}}
                 onClick={e=>{
                    setEditData(null)
                    setShow(false)
                }}
          >
              <Ticon
                iconName="MdClose" 
                className="md-icon"
                textStyle={{color:"black"}} 
              />
          </div>
      </div>
  )
}
//=====================================
const renderFooter=()=>{
    return(
    <div className="" 
        style={{display:"flex",justifyContent:"flex-end"}}
    > 
        <div>
            <button
           
                onClick={e=>{
                    setEditData(null)
                    setShow(false)
                }}
            >
                <MdClose/>
            </button>
        </div>

    </div>
    )
}


//=====================================
return (
    <div className="Modal-background">
        <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"70%",minHeight:"100px"}}>
            
            <div className="Modal-header">
                <h5>{pageData.user.formHead}</h5>
            </div>
        
            <div className="Modal-body" >
            {   filterData.data0&&
               <Table
                        tableTemplate={userTableTemplate}
                        setTableTemplate={setUserTableTemplate}//{setTableTemplate}
        
                        filterData={filterData.data0}
                        setFilterData={()=>{}}//{setFilterDataData0}
                        
                        editData={editData}
                        setEditData={setEditData}
                        saveTableTemplateFunc={saveTableTemplateFunc}
                        isSubTable={false}
                        updateFilterData={()=>{}}
                        useInput={false}
                        basicData={basicData}
                        pageData={pageData.tableSettingModal}
               />
            }
            </div>

            {
                renderFooter()
            }

        {editData&&
            renderToolBox()
        }

        {showEditUser&&
             <EditUserModal
             pageData={pageData}
             basicData={basicData}
             setShow={setShowEditUser}
             submitFunction={updateUserFunc}
             loadData={editData}
            />
        }
        {showChangeUserPasswordModal&&
              <ChangeUserPasswordModal
              pageData={pageData}
              basicData={basicData}
              setShow={setShowChangeUserPasswordModal}
              submitFunction={changePasswordFunc}
              loadData={editData}
             />
        }
        {showAddUser&&
             <AddUserModal
                pageData={pageData}
                basicData={basicData}
                setShow={setShowAddUser}
                submitFunction={addUserFunc}
                loadData={{id:"",username:"",password:"",active:true,
                          userLevel:"staff",name:"",surname:"",
                          //branchId:1,branchName:"main"
                        }}
            />
        }
        </div>
        {
         showModalConfirm&&
            <ModalConfirm
                setShow={setShowModalConfirm}
                submitFunction={deleteFunc}
            />   
        }

        {error.showModalError&&
            renderModalError({
                show:error.showModalError,
                setShow:(value)=>{setError({showModalError:value,message:""})},
                message:error.message,
                setMessage:()=>{}
            })
        }

    </div>
  );
}


AddUser.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default AddUser;
