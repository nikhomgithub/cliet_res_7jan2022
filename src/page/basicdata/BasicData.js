import React from 'react';
import {Link} from 'react-router-dom';
import {MainContext} from '../../context/MainContext';
import {FaHome} from 'react-icons/fa';
import Navbar from '../../component/navbar/Navbar';

import Ticon from '../../component/ticon/Ticon';
import LogOutTool from '../login/LogOutTool'
import ShopInfo from './ShopInfo'
import StateTemplate from '../../model/StateTemplate';
import FormTemplate from '../../render/renderForm/FormTemplate';

import '../../component/navbar/Navbar.css';

function BasicData() {

console.log('BasicData..........')

const { basicDataSt,
        setReloadBasicData,
        myheader,
        setBasicData,
        tokenSt,
        setReloadCheckToken
        //widthLeft,setWidthLeft
}=React.useContext(MainContext)

const {haveUserToken,haveShopToken,userName}=tokenSt  
const {basicData,pageData,tableTemplate,languageObj,user}=basicDataSt
const refHome=React.createRef()

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


React.useEffect(()=>{
    //console.log('pageState')
    //console.log(pageState)
},[pageState])

//<div style={{padding:"0 1rem",overflowY:"auto"}}>

return(
<div style={{height:"100vh",width:"100vw",overflow:"hidden",position:"relative"}}>
    <div className="h-5 w-100 hide-on-print">
        <Navbar/>
    </div>       

    <div className="h-95 w-100">
        { 
        pageState.pageData&&pageState.basicData&&pageState.tableTemplate&&(user.userLevel=="admin")&&
        <ShopInfo 
            pageData={pageState.pageData} 
            //pageDataStandard={pageState.pageDataStandard}
            basicData={pageState.basicData}
            FormTemplate={FormTemplate}
            StateTemplate={StateTemplate}   
            basicDataTableTemplate={pageState.tableTemplate.basicDataTableTemplate}   
            myheader={myheader} 
            setReloadBasicData={setReloadBasicData}
            languageObj={languageObj}
            tableTemplate={tableTemplate}
        />
    }
    </div>
    <div className="d-none">
        <Link ref={refHome} to="/pos/home"/>
    </div>
</div>
)

}
export default BasicData;

/*



    {
    
     pageState.pageData&&pageState.basicData&&pageState.tableTemplate&&
     <ShopInfo pageData={pageState.pageData} 
               //pageDataStandard={pageState.pageDataStandard}
               basicData={pageState.basicData}
               FormTemplate={FormTemplate}
               StateTemplate={StateTemplate}   
               basicDataTableTemplate={pageState.tableTemplate.basicDataTableTemplate}   
               myheader={myheader}     
    />
    
    }




*/