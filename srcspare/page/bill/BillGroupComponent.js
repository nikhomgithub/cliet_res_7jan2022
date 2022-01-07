import React from 'react';
import NewGroupComponent from '../../render/renderTree/NewGroupComponent'
//import NewTree from '../../component/newtree/NewTree'
import NewGroup from '../../component/newgroup/NewGroup';
import pageUtil from '../../component/pageComponent/pageUtil'
import filterDataTemplate from './filterDataTemplate'
import {MainContext} from '../../context/MainContext'

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil
//==================================
function BillGroupComponent(props) {

const {captureProductOfGroup,pageData}=props

const {basicDataSt,
        setReloadBasicData,
        myheader,
        setBasicData
        //widthLeft,setWidthLeft
}=React.useContext(MainContext)

console.log('BillGroupComponent')

let [filterData,setFilterData]=React.useState({...filterDataTemplate.product})

React.useEffect(()=>{
    //console.log('filterData BillGroupComponent')
    //console.log(filterData)
},[filterData])

//==========================
const filterDataByGroup=(i)=>{
    const {folders,...remaining}=i
    const temp = {...filterData,pageNumber:1,qry:{groupId:i.id},selectGroup:remaining,reloadData:true}
    setFilterData(temp)
}

const reloadAxiosAllFunc=async()=>{
    //console.log('reloadAxiosAllFunc..........')
    const temp=await reloadAxiosAll(filterData,myheader)
    //console.log(temp)
    captureProductOfGroup(temp)
    setFilterData(temp)
}
//====================
React.useEffect(()=>{
    //console.log('filterData PageComponent')
    //console.log(filterData)
    if(filterData.reloadData){
       reloadAxiosAllFunc()
    }
},[filterData])

//
//====================
return(
<div className="w-100" style={{paddingBottom:"0"}} >
            
            <NewGroup
                myheader={myheader}
                dataUrl={"p35group"}
                filterByGroupId={filterDataByGroup}
                captureEditGroup={()=>{}}
                bgColor={"#d1adbf"}
                pageData={pageData}
            />

</div>

)

}
export default BillGroupComponent;
//#e5d1db
/*
<NewGroupComponent
    groupDataUrl={"p35group"}
    selectData={null}
    setSelectGroup={()=>{}}
    filterDataByGroup={filterDataByGroup}
    editData={null}
    canGroupChange={false}
/>
*/



