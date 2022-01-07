import React from 'react';

import tableUtil from './tableUtil'
import renderTable from  './renderTable'
import renderTableSetting from './renderTableSetting'

//=====================
const {tableResize}=tableUtil

//=================================
function Table({
    colorHead,
    tableTemplate,setTableTemplate,
    filterDataKey,

    filterData,setFilterData,
    editData,setEditData,
    saveTableTemplateFunc,
    isSubTable,
    updateFilterData,
    useInput,
   // selectData,
    basicData,
    findProductIdByKeyDown,
    findBarcodeByKeyDown,
    showSearchHeader,
    calDigit,
    pageData,
    captureClientXY,
    editIconField,
    editIconFieldFunc
}) {

if(isSubTable){
    //console.log('subTable')
} 
else {
    //console.log('table')
}
const genObjKeysByColOrder=(tableTemplate)=>{
    const objKeys = Object.keys(tableTemplate);
    //console.log('genObjKeysByColOrder')
    //console.log(objKeys)

    let tempArray=[]


    //console.log('gen..')
    //console.log(objKeys)

    for(let i=1;i<=objKeys.length;i++){
      //console.log(i)
      objKeys.map(j=>{
        //console.log(tableTemplate[j])
        if(tableTemplate[j].colOrder==i){
          tempArray=[...tempArray,j]
        }
      })

    }
    //console.log(tempArray)
    return tempArray
}
//console.log('tableTemplate....xxxxxxxxx........')
//console.log(tableTemplate)

let [sumAmount,setSumAmount]=React.useState(null)

const [showTableSetting,setShowTableSetting]=React.useState(false)
const [XY,setXY]=React.useState({x:0,y:0})

//=================================
//React.useEffect(()=>{},[selectData])

  
const [tableTemplate2,setTableTemplate2]=React.useState(
    tableTemplate
    //genObjKeysByColOrder(tableTemplate)
)

React.useEffect(()=>{
    //console.log('tableTemplate.............')
    //console.log(tableTemplate)

},[tableTemplate])


//=============================
React.useEffect(()=>{
    //console.log('filterData')
    //console.log(filterData)
    if(filterData&&tableTemplate2){
        const objKeys = Object.keys(tableTemplate2);
        
        let newSum={}

        let showSum=false

        objKeys.map(h=>{
            if(tableTemplate2[h].showSum){
                newSum={...newSum,[h]:0}
                showSum=true
            }
        })
       
        filterData.map((i,idx)=>{
            
            objKeys.map(j=>{  
                if(tableTemplate2[j].showSum){
                    const updateSum=newSum[j]+parseInt(i[j]*10000)

                    if(idx==filterData.length-1){
                        newSum={...newSum, [j]:updateSum/10000 }
                    }
                    else{
                        newSum={...newSum, [j]:updateSum }
                    }
                }
            })
        })

        if(showSum){
            setSumAmount(newSum)
        }
    }

},[filterData])


//=================================
let [showTable,setShowTable]=React.useState(
  
    tableResize({tableTemplate:genObjKeysByColOrder(tableTemplate)/*,showTable,setShowTable*/})
    //width:1200,
    //gridCol:"",
)
React.useEffect(()=>{
    //console.log('showTable')
    //console.log(showTable)
},[showTable])

//=================================
React.useEffect(()=>{

    //console.log('tableTemplate2.....')
    //console.log(tableTemplate2)
    
    const temp=tableResize({tableTemplate:tableTemplate2/*,showTable,setShowTable*/})

    setShowTable({...showTable,...temp})
    //console.log('showTable')
    //console.log(showTable)
},[tableTemplate2])
//==========================

const moveup=(idx,key,tableTemplateAtI)=>{
    const ObjKey=genObjKeysByColOrder(tableTemplate2)

    let tempObj={}

    const newIdx=idx-1
    
    ObjKey.map((i,index)=>{
        if(index==newIdx){
            
            const temp1={[i]:{...tableTemplate2[i],colOrder:tableTemplateAtI.colOrder}}

            const temp2={[key]:{...tableTemplate2[key],colOrder:newIdx}}
            tempObj={...tempObj,...temp2,...temp1}

        }
        else if(index==idx){

        }
        else{
            tempObj={...tempObj,[i]:tableTemplate2[i]}
        }
    })

    
    console.log('tempObj Up')
    console.log(tempObj)
    
    setTableTemplate2(tempObj)
}

const movedown=(idx,key,tableTemplateAtI)=>{
    const ObjKey=genObjKeysByColOrder(tableTemplate2)

    let tempObj={}

    const newIdx=idx+1
    
    ObjKey.map((i,index)=>{
        if(index==newIdx){
            
            const temp1={[i]:{...tableTemplate2[i],colOrder:tableTemplateAtI.colOrder}}

            const temp2={[key]:{...tableTemplate2[key],colOrder:newIdx}}
            tempObj={...tempObj,...temp1,...temp2}

        }
        else if(index==idx){

        }
        else{
            tempObj={...tempObj,[i]:tableTemplate2[i]}
        }
    })

    
    console.log('tempObj Up')
    console.log(tempObj)
    setTableTemplate2(tempObj)
}

//==========================
return(
    <div className="w-100 h-100" 
         style={{position:"relative"}}> 
        {renderTable({
          colorHead,
          tableTemplate:tableTemplate2,
          setTableTemplate:setTableTemplate2,
          
          filterData,setFilterData,

          editData,setEditData,
          showTable,setShowTable,
          sumAmount,
          setShowTableSetting,
          saveTableTemplateFunc,
          isSubTable,
          updateFilterData,
          useInput,
          basicData,
          findProductIdByKeyDown,
          findBarcodeByKeyDown,
          showSearchHeader,
          captureClientXY,
          editIconField,
          editIconFieldFunc,
          genObjKeysByColOrder:genObjKeysByColOrder,
          //XY,
          //setXY,
          calDigit:calDigit,
          })
        }
        {
        //true
        tableTemplate2
        ?showTableSetting
        //?true
            ?renderTableSetting({
                setShowTableSetting,
                tableTemplate:tableTemplate2,
                setTableTemplate:setTableTemplate2,
                pageData:pageData,
                moveup:moveup,
                movedown:movedown,
                genObjKeysByColOrder:genObjKeysByColOrder
            })
            :null
        :null
        }
    </div>

)
}

Table.defaultProps={
    colorHead:"#4b6d62",
    tableTemplate:{},
    setTableTemplate:()=>{},
    filterData:[],
    setFilterData:()=>{},
    editData:null,
    setEditData:()=>{},
    saveTableTemplateFunc:()=>{},
    isSubTable:false,
    useInput:false,
    //selectData:[],
    basicData:null,
    showSearchHeader:false,
    pageData:{
        formHead:"Table Setting",
        subject:"Subject",
        show:"Show"
    },
    captureClientXY:()=>{},
    editIconField:null,
    editIconFieldFunc:()=>{}
}

export default Table;
