import React from 'react';
import PageComponentTransaction  
from '../../component/pageComponent/PageComponentTransaction';

function Transaction() {

    console.log('Transaction.......')


return(
<div>
    ssssss
</div>
)
}
export default Transaction;


/*










import React from 'react';
import {MainContext} from '../../context/MainContext'

import PageComponentTransaction  
from '../../component/pageComponent/PageComponentTransaction';
//import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import filterDataTemplate from './filterDataTemplate';
import filterDataTemplate2 from './filterDataTemplate2';
import filterDataTemplate3 from './filterDataTemplate3';
import filterDataTemplate4 from './filterDataTemplate4';

//import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import Navbar from '../../component/navbar/Navbar';


function Transaction() {

    console.log('Transaction.......')

    const {basicDataSt,tokenSt,setReloadCheckToken,myheader,setReloadBasicData}=React.useContext(MainContext)

    const calDigit=100


return(
<div style={{height:"100vh",width:"100vw",overflow:"hidden"}}>
    <div className="h-5 w-100 hide-on-print">
        <Navbar/>
    </div>
    
    <div className="h-95 w-100">
     {basicDataSt.basicData&&myheader&&
        <PageComponentTransaction
            setReloadBasicData={setReloadBasicData}
            filterDataTemplate={filterDataTemplate}
            filterDataTemplate2={filterDataTemplate2}
            filterDataTemplate3={filterDataTemplate3}
            filterDataTemplate4={filterDataTemplate4}

            filterTemplate={basicDataSt.pageFilter.transactionFilter}
            inputState={inputState.transactionInputState}
            basicDataSt={basicDataSt}
            myheader={myheader}
            
            formTemplate={basicDataSt.modalFormTemplate.transactionForm}
            editFormTemplate={basicDataSt.modalFormTemplate.transactionEditForm}
         
            stateTemplate={StateTemplate.transactionState}
            pageFilterForm={basicDataSt.pageFilterForm.transactionFilterForm}
            
            pageDataModalForm={basicDataSt.pageData.ModalForm}
            
            addFormTitle={basicDataSt.pageData.ModalForm.transactionAddForm}
            editFormTitle={basicDataSt.pageData.ModalForm.transactionEditForm}
            
            rawMatFilterTemplate={basicDataSt.pageFilter.productFilter}
            rawMatInputState={inputState.productInputState}
            rawMatPageFilterForm={basicDataSt.pageFilterForm.productFilterForm}
                        
            partnerFilterTemplate={basicDataSt.pageFilter.partnerFilter}
            partnerInputState={inputState.partnerInputState}
            partnerFilterForm={basicDataSt.pageFilterForm.partnerFilterForm}
            
            calDigit={calDigit}

        />
     }
     </div>

</div>
)
}
export default Transaction;









*/

