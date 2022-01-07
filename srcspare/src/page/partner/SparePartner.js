import React from 'react';
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import PageComponent from '../../component/pageComponent/PageComponent';


const {partnerForm,partnerEditForm}=FormTemplate
const {partnerState}=StateTemplate
const {partnerFilter}=FilterTemplate
const {partnerInputState}=inputState
function Product() {
  console.log('partner...........')


  const captureSelect=(selectLine)=>{
    //console.log('selectLine..........')
    //console.log(selectLine)
    //setFilterData({...filterData,selectProduct:selectLine})
  }


//===================================
return (
    <PageComponent
        dataUrl="p29partner"
        tableTemplateUrl="p29tabletemplate"
        tableTemplateName="partnerTableTemplate"
        detailTableTemplateName="productDetailTableTemplate"
        dataState={partnerState}
        dataFilter={partnerFilter}
        dataInputState={partnerInputState}
        dataForm={partnerForm}
        dataEditForm={partnerEditForm}
        badgeState={{
            swapShow:false,swapFunc:()=>{},
            reloadShow:true,reloadFunc:()=>{},
            filterShow:false,filterFunc:()=>{},
            addShow:true,addFunc:()=>{},
            editShow:true,editFunc:()=>{},
            delShow:true,delFunc:()=>{},
            printerShow:true,printerFunc:()=>{},
            pageNumberShow:true,
            bullEyeShow:true

        }}
        addFormTitle={"เพิ่มคู่ค้า"}
        editFormTitle={"แก้ไขคู่ค้า"}
        filterTitle={"ค้นหาคู่ค้า"}
        captureSelect={captureSelect}
        />
  );
}

export default Product;

