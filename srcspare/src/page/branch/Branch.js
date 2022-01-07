import React from 'react';
import {MainContext} from '../../context/MainContext'

import Navbar from '../../component/navbar/Navbar';

import BranchInfo from './BranchInfo'
import StateTemplate from '../../model/StateTemplate';
import FormTemplate from '../../render/renderForm/FormTemplate';

function Branch() {

console.log('Branch')

const {basicDataSt,
    setReloadBasicData,
    myheader,
    setBasicData
    //widthLeft,setWidthLeft
}=React.useContext(MainContext)

const {basicData,pageData,tableTemplate,languageObj}=basicDataSt

let [pageState,setPageState]=React.useState({
    reloadData:false,
    pageData:null,
    basicData:null,
    tableTemplate:null
    //pageDataStandard:null
})
  
React.useEffect(()=>{
    setPageState({
        reloadData:false,
        pageData:pageData,
        basicData:basicData,
        tableTemplate:tableTemplate
    })
},[basicDataSt])

return(
<div style={{height:"100vh",width:"100vw",overflow:"hidden"}}>
    <div className="h-5 w-100 hide-on-print">
        <Navbar/>
       
    </div>
   
    <div className="h-95 w-100">
        { 
            pageState.pageData&&pageState.basicData&&pageState.tableTemplate&&
            <BranchInfo 
                pageData={pageState.pageData} 
                basicData={pageState.basicData}
                FormTemplate={FormTemplate}
                StateTemplate={StateTemplate}   
                myheader={myheader} 
                setReloadBasicData={setReloadBasicData}
                languageObj={languageObj}
                tableTemplate={tableTemplate}
            />
        }
    </div>
</div>
)

}
export default Branch;
