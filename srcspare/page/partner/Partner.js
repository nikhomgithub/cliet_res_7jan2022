
import React from 'react';
import {MainContext} from '../../context/MainContext'
import axios from 'axios';
import download from 'js-file-download'
import PageComponent  from '../../component/pageComponent/PageComponent';
//import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import filterDataTemplate from './filterDataTemplate';
//import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import Navbar from '../../component/navbar/Navbar';
import testTemplate from '../../render/renderTree/testTemplate';


function Partner() {

console.log('Partner')

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
            filterTemplate={basicDataSt.pageFilter.partnerFilter}
            inputState={inputState.partnerInputState}
            basicDataSt={basicDataSt}
            myheader={myheader}
            
            formTemplate={basicDataSt.modalFormTemplate.partnerForm}
            editFormTemplate={basicDataSt.modalFormTemplate.partnerEditForm}
            
            stateTemplate={StateTemplate.partnerState}
            pageFilterForm={basicDataSt.pageFilterForm.partnerFilterForm}

            modalFormTemplate={basicDataSt.pageData.ModalForm}
            addFormTitle={basicDataSt.pageData.ModalForm.partnerAddForm}
            editFormTitle={basicDataSt.pageData.ModalForm.partnerEditForm}
            bgColor={"#74b979"}
            calDigit={100}
        />
        }
    </div>
</div>


)
}
export default Partner;




/*



import React from 'react';
import {MainContext} from '../../context/MainContext'
import axios from 'axios';
import download from 'js-file-download'
import PageComponent  from '../../component/pageComponent/PageComponent';
//import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import filterDataTemplate from './filterDataTemplate';
//import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import Navbar from '../../component/navbar/Navbar';
import testTemplate from '../../render/renderTree/testTemplate';


function Partner() {

console.log('Partner')

const {basicDataSt,tokenSt,setReloadCheckToken,myheader}=React.useContext(MainContext)

return(
<div style={{height:"100vh",width:"100vw",overflow:"hidden"}}>
    <div className="h-5 w-100 hide-on-print">
        <Navbar/>
       
    </div>
    <button
        onClick={e=>{
            axios.post('/p35partner/mytest',{},myheader)
            .then(res=>{
                //download(result.data,"tree.jpg")
                const columnDelimiter = ","
                const lineDelimiter = "\n"
                
                //console.log('result')
                //console.log(result.data)
                const keys = Object.keys(res.data[0])

                let result = ""
                result += keys.join(columnDelimiter)
                result += lineDelimiter

                res.data.map((item,indexItem)=>{

                    keys.map((key,indexKey)=>{
                        if(indexKey>0){
                            result+=columnDelimiter
                        }
                        result += typeof item[key] === "string"&& 
                                    item[key].includes(columnDelimiter) 
                                    ? `"${item[key]}"` 
                                    : item[key]

                    })

                    result += lineDelimiter
                })

                console.log('result')
                //console.log(result)
                download(result,"partner3.csv")
            })
            .catch(error=>{
                console.log('error')
            })
        }}
    >aaaaaa</button>
    <div className="h-95 w-100">
        {basicDataSt.basicData&&myheader&&
        <PageComponent
            filterDataTemplate={filterDataTemplate}
            filterTemplate={basicDataSt.pageFilter.partnerFilter}
            inputState={inputState.partnerInputState}
            basicDataSt={basicDataSt}
            myheader={myheader}
            formTemplate={basicDataSt.modalFormTemplate.partnerForm}
            editFormTemplate={basicDataSt.modalFormTemplate.partnerEditForm}
            stateTemplate={StateTemplate.partnerState}
            pageFilterForm={basicDataSt.pageFilterForm.partnerFilterForm}

            modalFormTemplate={basicDataSt.pageData.ModalForm}
            addFormTitle={basicDataSt.pageData.ModalForm.partnerAddForm}
            editFormTitle={basicDataSt.pageData.ModalForm.partnerEditForm}
            dataUrl={'p35partner'}
        />
        }
    </div>
</div>


)
}
export default Partner;









*/