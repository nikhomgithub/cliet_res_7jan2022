import React from 'react';
import {MainContext} from '../../context/MainContext'

import PageComponent  from '../../component/pageComponent/PageComponent';
//import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import filterDataTemplate from './filterDataTemplate';
//import filterDataTemplate2 from './filterDataTemplate2';

//import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import Navbar from '../../component/navbar/Navbar';


function Product() {

console.log('Product')

const {basicDataSt,tokenSt,setReloadCheckToken,myheader,setReloadBasicData}=React.useContext(MainContext)



return(
<div style={{height:"100vh",width:"100vw",overflow:"hidden"}}>
    <div className="h-5 w-100 hide-on-print">
        <Navbar/>
    </div>
    
    <div className="h-95 w-100">
     {basicDataSt.basicData&&myheader&&
        <PageComponent
            setReloadBasicData={setReloadBasicData}
            filterDataTemplate={filterDataTemplate}

            filterTemplate={basicDataSt.pageFilter.productFilter}
            inputState={inputState.productInputState}
            basicDataSt={basicDataSt}
            myheader={myheader}
            
            formTemplate={basicDataSt.modalFormTemplate.productForm}
            editFormTemplate={basicDataSt.modalFormTemplate.productEditForm}
         
            stateTemplate={StateTemplate.productState}
            pageFilterForm={basicDataSt.pageFilterForm.productFilterForm}
            
            pageDataModalForm={basicDataSt.pageData.ModalForm}
            
            addFormTitle={basicDataSt.pageData.ModalForm.productAddForm}
            editFormTitle={basicDataSt.pageData.ModalForm.productEditForm}
            
            groupAddFormTitle={basicDataSt.pageData.ModalForm.groupAddForm}
            groupEditFormTitle={basicDataSt.pageData.ModalForm.groupEditForm}
            
            groupFormTemplate={basicDataSt.modalFormTemplate.groupForm}
            groupEditFormTemplate={basicDataSt.modalFormTemplate.groupEditForm}
            bgColor={"#d1adbf"}

        />
     }
     </div>

</div>
)
}
export default Product;

//#e5d1db

/*

return(
<div style={{height:"100vh",width:"100vw",overflow:"hidden"}}>
    <div className="h-5 w-100 hide-on-print">
        <Navbar/>
    </div>
    
    <div className="h-95 w-100">
     {basicDataSt.basicData&&myheader&&
        <PageComponent
            filterDataTemplate={filterDataTemplate}
            filterDataTemplate2={filterDataTemplate2}

            filterTemplate={basicDataSt.pageFilter.productFilter}
            inputState={inputState.productInputState}
            basicDataSt={basicDataSt}
            myheader={myheader}
            
            formTemplate={basicDataSt.modalFormTemplate.productForm}
            editFormTemplate={basicDataSt.modalFormTemplate.productEditForm}
         
            stateTemplate={StateTemplate.productState}
            pageFilterForm={basicDataSt.pageFilterForm.productFilterForm}
            
            pageDataModalForm={basicDataSt.pageData.ModalForm}
            
            addFormTitle={basicDataSt.pageData.ModalForm.productAddForm}
            editFormTitle={basicDataSt.pageData.ModalForm.productEditForm}
            
            groupAddFormTitle={basicDataSt.pageData.ModalForm.groupAddForm}
            groupEditFormTitle={basicDataSt.pageData.ModalForm.groupEditForm}
            
            groupFormTemplate={basicDataSt.modalFormTemplate.groupForm}
            groupEditFormTemplate={basicDataSt.modalFormTemplate.groupEditForm}
            

            useRawMat={true}
            rawMatFilterTemplate={basicDataSt.pageFilter.rawMatFilter}
            rawMatInputState={inputState.rawMatInputState}
            rawMatPageFilterForm={basicDataSt.pageFilterForm.rawMatFilterForm}


        />
     }
     </div>

</div>
)








*/