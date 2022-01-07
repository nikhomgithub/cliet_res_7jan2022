import React from 'react';

import PageComponent from '../../component/dataComponent/PageComponent.js'
import {MainContext} from '../../context/MainContext';

import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../../render/renderForm/FormTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import ModalComponent from '../../render/ModalComponent'

function Product() {

const {groupForm,productForm,productEditForm,
      }=FormTemplate
const {groupState,productState,
      }=StateTemplate
const {productFilter}=FilterTemplate
const {productInputState}=inputState

const [showGroupModal,setShowGroupModal]=React.useState(false)
const [showProductModal,setShowProductModal]=React.useState(false)

const {basicDataSt,widthLeft,setWidthLeft,myheader}=React.useContext(MainContext)
const {basicData}=basicDataSt

const [selectProduct,setSelectProduct]=React.useState(null)
const [selectGroup,setSelectGroup]=React.useState(null)

const [iconActionData,setIconActionData]=React.useState(null)
const [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)

const productCalculation=(formInputState)=>{
    console.log('productCalculaton')
    console.log(formInputState)

        const {total,reduction,grandTotal,detail}=formInputState
        
        let tempTotal = 0
        let tempDetail=[]

        detail.map(i=>{
            const roundQuantity=parseInt(i.quantity*100)
            const roundPrice=parseInt(i.price*100)
            const tempResult=roundQuantity*roundPrice

            tempTotal=tempTotal+tempResult

            const tempObj={...i,["result"]:tempResult/10000}
            
            tempDetail=[...tempDetail,tempObj]
        })
        const roundReduction=parseInt(reduction*10000)

        const tempGrandTotal=(tempTotal-roundReduction)/10000
        let tempFormInputState={...formInputState,
                                ["detail"]:tempDetail
                                }
    return tempFormInputState
}


React.useEffect(()=>{
    if(selectGroup){
    console.log('selectGroup')
    setIconActionData({groupId:selectGroup.id,
                       groupName:selectGroup.groupName})
    }
},[selectGroup])

React.useEffect(()=>{
    if(selectProduct){
    console.log('selectProduct')
    setIconActionDataDetail(selectProduct)
    }
},[selectProduct])

return(
<div className="bgc-lightGray" style={{height:"100%",width:"100%"}}>
    
    
    <PageComponent
        basicData={basicData}
        dataForm={productForm}
        dataGroupForm={groupForm}
        dataState={productState}
        dataGroupState={groupState}
        dataFilter={productFilter}
        dataInputState={productInputState}
        groupTitle={"ประเภทสินค้า"}
        tableTitle={"รายการสินค้า"}
        addFormTitle={"เพิ่มสินค้า"}
        editFormTitle={"แก้ไขสินค้า"}
        tableHeadColor={"#B55A30"}
        detailTableHeadColor={"#FDAC53"}
        dataUrl={"p27product"}
        groupDataUrl={"p27group"}
        tableTemplateUrl={"p27tabletemplate"}
        canDataChange={true}
        dataTableTemplateName={"productTableTemplate"}
        detailTableTemplateName={"productDetailTableTemplate"}

        calculation={productCalculation}

        iconAction={[
            ()=>setShowGroupModal(true),
            ()=>setShowProductModal(true),
        ]}
        iconActionData={iconActionData}
        iconActionDataDetail={iconActionDataDetail}

        widthLeft={widthLeft}
        setWidthLeft={setWidthLeft}
        myheader={myheader}
        totalSwapPage={2}
        swapPageOption={["group-table","table-detailTable"]}
        keyName={["photoUrl1"]}
    />
    
    {showGroupModal
    ?<ModalComponent className="bd-red"
        funcCancel={()=>{
            setIconActionData({groupId:"",groupName:""})
            setShowGroupModal(false)
        }}
        funcOK={()=>setShowGroupModal(false)}
        children={
            <PageComponent
                dataGroupState={groupState}
                groupDataUrl={"p27group"}
                setSelectGroup={setSelectGroup}
                groupTitle={"ประเภทสินค้า"}
                myheader={myheader}
                totalSwapPage={1}
                swapPageOption={["group"]}
                canGroupChange={false}
            />
        }
    />
    :null
    }

    {showProductModal
     ?<ModalComponent className="bd-red"
        funcOK={()=>setShowProductModal(false)}
        children={
            <PageComponent
                basicData={basicData}
                dataForm={productForm}
                dataGroupForm={groupForm}
                dataState={productState}
                dataGroupState={groupState}
                dataFilter={productFilter}
                dataInputState={productInputState}
                groupTitle={"กลุ่มสินค้า"}
                tableTitle={"ตารางสินค้า"}
                tableHeadColor={"#6B5B95"}
                dataUrl={"p27product"}
                groupDataUrl={"p27group"}
                tableTemplateUrl={"p27tabletemplate"}
                canDataChange={false}
                dataTableTemplateName={"productTableTemplate"}
                detailTableTemplateName={"productDetailTableTemplate"}
                setSelectData={setSelectProduct}
                widthLeft={widthLeft}
                setWidthLeft={setWidthLeft}
                myheader={myheader}
                totalSwapPage={1}
                swapPageOption={["group-table"]}
            />
     }
    />
    :null
    }
</div>
)

}
export default Product;