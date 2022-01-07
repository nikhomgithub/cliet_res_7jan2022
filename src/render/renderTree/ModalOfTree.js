import React from 'react';

import {Route,Switch,Redirect} from 'react-router-dom';
import ModalConfirm from '../../render/ModalConfirm'
import ModalForm from '../../render/renderForm/ModalForm'
import renderModalError from '../RenderModalError.bak'

function ModalOfTree(props){
    console.log('ModalOfTree')
    const { groupForm, groupState,
            editGroup, 
            submitAddFunction,submitDeleteFunction,

            groupSt, selectData,
    } = props



const [showAdd,setShowAdd]=React.useState(true) //addIcon
const [showEdit,setShowEdit]=React.useState(false) //editIcon
const [showModalConfirm,setShowModalConfirm]=React.useState(false) //delIcon
const [showModalError,setShowModalError]=React.useState(false)

return(
<>
        {
            showModalConfirm
            ?<ModalConfirm
            setShow={setShowModalConfirm}
            submitFunction={submitDeleteFunction}
            />
            :null
        }
        {
            showAdd
            ?<ModalForm
                lb={"เพิ่มข้อมูล"}
                formTemplate={groupForm}
                stateTemplate={groupState}
                
                loadData={{id:groupSt.lastRecordGroup.id,parentId:editGroup?editGroup.id:null}}
                submitFunction={submitAddFunction}
                setShow={setShowAdd}
                submitFuction={submitAddFunction}
                selectData={selectData}
             />
            :null
        }
        {   /*
            showEdit
            ?<ModalForm
                lb={"แก้ไขข้อมูล"}
                formTemplate={groupForm}
                stateTemplate={groupState}
                loadData={editGroup}
                submitFunction={submitEditFunction}
                setShow={setShowEdit}
                submitFuction={submitEditFunction}
                selectData={selectData}
            />
            :null
            */
        }
        { /*
            showModalError
            ?renderModalError({
                show:showModalError,
                setShow:setShowModalError
            })
            :null
            */
        }
      
</>
)

}
export default ModalOfTree;
