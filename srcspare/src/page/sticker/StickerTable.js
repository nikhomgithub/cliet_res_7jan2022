import React from 'react';
import axios from 'axios'
import tableTemplate from '../../component/table/tableTemplate'
import Table from '../../component/table/Table'
import ModalConfirm from '../../render/ModalConfirm'
import renderModalError from '../../render/renderModalError'
import axiosUtil from '../../util/axiosUtil'
import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput'
import renderBadge from '../../render/renderBadge/renderBadge'
import uuid from 'react-uuid'
import StateUtil from '../../model/StateUtil'
import renderRangeBar from '../../component/table/renderRangeBar'
import renderWidthRangeBar from '../../component/table/renderWidthRangeBar'

import Sticker from './Sticker'

import {MainContext} from '../../context/MainContext';


const {stickerTableTemplate}=tableTemplate
const {productForm}=FormTemplate
const {productState}=StateTemplate
const {stickerFilter}=FilterTemplate
const {stickerInputState}=inputState
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil
const {genBlankState,genRefAndValue,revRefAndValue,combineLoadDataBlankState}=StateUtil  

const blankInputState ={
    id:0, recordName:"", date:new Date().toISOString().substring(0,10), recordBy:"",
    xPerLine:4, heightP:297, widthP:210,
    gridColumnGap:2, gridRowGap:2, showBorder:true,
    paddingTopP:5, paddingBottomP:5, paddingLeftP:5, paddingRightP:5,
    showCode:true, showBarCode:true,
    barcodeValue:'', heightB:20, widthB:1, fontSizeCode:10,
    showName:true, name:"", fontSizeName:10,
    showPrice:true, price:0, fontSizePrice:10,
    showUnit:true, unit:"", fontSizeUnit:10,
    productData : []
}


function StickerTable() {

console.log('StickerTable')

const {myheader,basicDataSt}=React.useContext(MainContext)

const {basicData}=basicDataSt

//whet use reloadAxiosAll we add selectedLine = false 
//and _id with uuid() to make it unique
const genFilterDataWithIndex=(filterData)=>{
    let tempArray=[]

    filterData.map((i,idx)=>{
        
        const temp={...i,selectedLine:false,_id:uuid()}
        //const temp={...i,tempIndex:idx,selectedLine:false}
        tempArray=[...tempArray,temp]
         
    })

    return tempArray
}

//when click a line of table set that line as editData
//color of text turn red 
//or line change to input
const updateEditData=(data)=>{
    //console.log('editData')
    //console.log(data)
    const temp=data
     setFilterData({...filterData,editData:temp})
}

//to save filterData when sort Up and down each column
const setFilterDataData0=(data)=>{
    setFilterData({...filterData,
        data0:data
    })
}

const refreshPage=(data)=>{
    console.log('pageNumber')
    //console.log(data.pageNumber)
    const {limitRow,sort}=data
    const temp = {...data,limitRow,sort,editData:null,
                  qry:null,reloadData:true,selectProduct:[]
                }
    setFilterData(temp)
    
}

const setShowAdd=(data)=>{
    const {lastRecordId}=filterData
    setFilterData({...filterData,
        showAdd:data,
        showEdit:false,
        loadData:{...blankInputState,id:parseInt(lastRecordId)+1}
    })
}

const setShowEdit=(data)=>{
    setFilterData({...filterData,
        showAdd:false,
        showEdit:data,

    })
}

//-------------------------
//when change page with input or icon page number is change 
//and send request to server for data of that page
const setPageNumber=(number)=>{
    console.log(number)
    setFilterData({...filterData,pageNumber:number,reloadData:true})
}


//when press MdDelete it show showModalConfirm
const setShowModalConfirm=(data)=>{
    setFilterData({...filterData,
        showModalConfirm:data,
    })
}

//when change input select of sort such as sort by name, price it 
const setSort=(data)=>{
    //console.log('setSort')
    //console.log(data)
    setFilterData({...filterData,sort:data})
}

//when click MdPlus or MdMinus it change limitRow of data per page
const setLimitRow=(data)=>{
    //console.log(data)
    setFilterData({...filterData,limitRow:data})
}

//when .catch activate it show ModalError
const setShowModalError=(data)=>{
    setFilterData({...filterData,showModalError:data})
}


//when .catch activate it show ModalError
const setShowRange=(data)=>{
    setFilterData({...filterData,showRange:data})
}

const setWidthLeft=(data)=>{
    setFilterData({...filterData,widthLeft:data})
}
const setHeightTop=(data)=>{
    setFilterData({...filterData,heightTop:data})
}

const limitRange=({value,floor,ceiling,unit})=>{
    let temp

    if(value>ceiling){
        temp=`${ceiling}${unit}`
    }
    else if(value<floor){
        temp=`${floor}${unit}`
    }
    else {
        temp=`${value}${unit}`
    }
    console.log('limitRange')
    console.log(temp)
    return temp
}

//when click FaBullEyes it change data0.selectedLine 
//and set selectProct to null 
//and uncheck all input radio 
const setUnSelectAll=()=>{
    let tempArray=[]

    filterData.data0.map(i=>{
        tempArray=[...tempArray,{...i,selectedLine:false}]
    })

    setFilterData({...filterData,
        selectSticker:[],
        data0:tempArray
    })

}
const setTableTemplate=(data)=>{
    setFilterData({...filterData,tableTemplate:data})
}

//when we click search $in or $or 
//it gen arrayForFilter and reload data again 
//========================================
const filterAxiosFunc=(option,inputState)=>{
    //console.log('npms.....')
    //console.log(option)
    //console.log(inputState)
    const {pageNumber,limitRow,sort,dataUrl} = filterData

    const arrayCommand=genArrayForFilterAxios({
        filterTemplate:stickerFilter,
        inputState
    })

    console.log(arrayCommand)

    let qry = null
    
    if(option=="and"){ qry={$and:arrayCommand} }
    if(option=="or"){ qry={$or:arrayCommand} }


    console.log(qry)
    /*
    setFilterData({
        ...filterData,
        pageNumber:1,
        qry:qry
    })
    */
    //setPageNumber(1)
    //setQry(qry)

    axios.post(`/${dataUrl}/getlimit`,{pageNumber:1,limitRow,sort,...qry},myheader)
    .then(result=>{
        setFilterData(
        {
        ...filterData,
        data0:result.data.data,
        count:result.data.count,
        lastRecordId:result.data.lastRecordId,
        pageNumber:1,
        qry:qry,
        reloadData:false
        })
    })
    .catch(error=>{
        //catchErrorToMessage(error,setMessage)
        //setMessage(error.response.data.message)
        setFilterData({...filterData,
            reloadData:false,
            message:catchErrorToMessage(error),
            showModalConfirm:false,
            showModalError:true,
            pageNumber:1,
            qry:qry,
        })
    })
    
}


//when press MdDelete 
//it delete all line with have selectedLine = true
const submitDeleteFunction=()=>{

    const {dataUrl,selectSticker}=filterData
    let controller="deletemany"

    if(dataUrl=="transaction"){
        controller="deletetransaction"
    }

    let tempId=[]

    selectSticker.map(i=>{
        if (i.selectedLine){
            tempId=[...tempId,i.id]
        }
    })
    
    const qry = {id:{$in:tempId}}

    axios.post(`/${dataUrl}/${controller}`,qry,myheader)
    .then(result=>{
        setFilterData(
        {
        ...filterData,
        reloadData:true,
        showModalConfirm:false,
        selectSticker:[]
        })

    })
    .catch(error=>{
        //console.log('errrrrrr')
        //console.log(error.response.data.error.message)
        setFilterData({...filterData,
            reloadData:false,
            message:catchErrorToMessage(error),
            showModalConfirm:false,
            showModalError:true,
        })
    })
    
}


//----------------------------------

const renderTable=()=>{
    return (
            filterData.data0
            ?<Table
                colorHead={"#888"}
                tableTemplate={stickerTableTemplate}
                setTableTemplate={setTableTemplate}
                filterDataKey={"tableTemplate"}

                filterData={filterData.data0}
                setFilterData={setFilterDataData0}
                
                editData={filterData.editData}
                setEditData={updateEditData}
                saveTableTemplateFunc={()=>{}}
                isSubTable={false}
                updateFilterData={updateFilterData}
                useInput={false}
                selectData={filterData.selectData}
            />
            :null
    )
}

//--------------------------------------------
//To render Filter 
const renderFilter=()=>{
    const {limitRow,sort}=filterData
    return (
        <div className="h-100 w-100" style={{overflowY:"auto"}}>
            <ModalFilterInput
                title={`ค้นหา `}
                show={true} setShow={()=>{}}
                filterTemplate={stickerFilter}
                inputState={stickerInputState} 
                setInputState={()=>{}}
                limitRow={limitRow} 
                setLimitRow={setLimitRow}
                sort={sort} 
                setSort={setSort}
                filterAxios={filterAxiosFunc}
                basicData={basicData}
            />
        </div>
    )
}


//<LineForm/> onBlur => updateFilterData with LineForm
const updateFilterData=(index,i)=>{
    //<LineForm/>   onBlur => updateFilterData

    const {data0,selectSticker}=filterData
    //console.log(i)


    let tempArray=[] //for update  data0 with... i of LineForm
    data0.map(j=>{
        if(j._id==i._id){
            tempArray=[...tempArray,i]
        }   
        else{
            tempArray=[...tempArray,j]
        }
    })
    //get i from <LineForm/>

    //update selectSticker with LineForm as well 
    let tempArray2=[]

    selectSticker.map(k=>{
        if(k._id==i._id){
            //tempArray2=[...tempArray2,k]
        }
        else {
            tempArray2=[...tempArray2,k]
        }
    })
    tempArray2=[...tempArray2,i]
    setFilterData({...filterData,
        data0:tempArray,
        selectSticker:tempArray2
    })

}

//==================================
const deleteSelectProduct=()=>{
    setFilterData({...filterData,selectProduct:[]})
}
//==================================
const addToSelectProduct=(loadData)=>{
    
    if(loadData){
        if(loadData.productData){
            const temp=loadData.productData
            let tempArray=[]
            temp.map(i=>{
                if(i.selectedLine){
                    tempArray=[...tempArray,i]
                }
            })
            
            const temp2=[...filterData.selectProduct,...tempArray]
            setFilterData({...filterData,selectProduct:temp2})
        }
    }
    
}




const [filterData,setFilterData] = React.useState({
    dataUrl:"p29sticker",

    reloadData:true,

    data0:null,
    lastRecordId:1,
    count:0,


    limitRow:15,
    pageNumber:1,
    sort:{id:1},
    editData:null,

    loadData:blankInputState,

    badgeState:{
        swapShow:false,swapFunc:()=>{},
        reloadShow:true,reloadFunc:refreshPage,
        filterShow:false,filterFunc:()=>{},
        addShow:true,addFunc:()=>{},
        editShow:true,editFunc:()=>{},
        delShow:true,delFunc:()=>{},
        printerShow:true,printerFunc:()=>{}
    },

    showAdd:false,
    showEdit:false,
    selectSticker:[],

    message:null,
    showModalError:false,    
    showModalConfirm:false,

    showRange:true,
    widthLeft:40,
    heightTop:40,

    selectProduct:[]

})






const reloadAxiosAll=()=>{
        console.log('reloadAxiosAll')
        const {pageNumber,limitRow,sort,qry,dataUrl}=filterData    

        axios.post(`/${dataUrl}/getlimit`,
                    //{},myheader)
                    {pageNumber,limitRow,sort,...qry},myheader)

        .then(result=>{
            console.log('result')
            console.log(result)
            const temp2= genFilterDataWithIndex(result.data.data)

            //const temp2=result.data.data
            setFilterData({
                ...filterData,
                data0:temp2,
                count:result.data.count,
                lastRecordId:result.data.lastRecordId,
                reloadData:false,
            })

        })
        .catch(error=>{
            setFilterData({
                ...filterData,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            })
            //setMessage(error.response.data.message)
            //console.log(error.response)
        })
}


//
// when click confirm in add PageForm it request for addcustom to server
const submitFunctionAdd=(formInputState)=>{
    
    const {_id,...remaining}=formInputState

    const {dataUrl} = filterData

    let controller="addcustom"
     
    if(dataUrl.includes("transaction")){
        controller="addtransaction"
    }

    //const tempFormInputState1={...formInputState}

    //const tempFormInputState2=addFileNameInPhotoUrl(tempFormInputState1)  
    
    //const tempFormInputState3=combineLoadDataBlankState({template:productState,loadData: tempFormInputState1})


    //const fd=genFD({inputState:tempFormInputState3,template:productState})

    axios.post(`/${dataUrl}/${controller}`,remaining,myheader)
        .then(result=>{
            //console.log('result')
            //console.log(result)

            setFilterData({...filterData,
                reloadData:true,
                showAdd:false,
                showEdit:false
                //heightTop:95,
            })
            //setShowAdd(false)
            //setReloadData(true)
        })
        .catch(error=>{
            setFilterData({...filterData,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
                //editData:tempFormInputState1
            })
            //catchErrorToMessage(error)
            //catchErrorToMessage(error,setMessage)
            //setShowModalError(true)
        })
}   

const submitFunctionCancel=()=>{
    setFilterData({
        ...filterData,
        showAdd:false,
        showEdit:false
    })
}


//when click confirm in edit PageForm it request updatecustom to server
const submitFunctionEdit=(formInputState)=>{

    const {dataUrl} = filterData

    let controller="updatecustom"

    if(dataUrl.includes("transaction")){
        controller="updatetransaction"
    }

    const {_id,...remaining}=formInputState

    //const tempFormInputState1={...formInputState}

    //const tempFormInputState2=addFileNameInPhotoUrl(tempFormInputState1)  
    
    //const tempFormInputState3=combineLoadDataBlankState({template:productState,loadData:tempFormInputState2})

    //const fd=genFD({inputState:tempFormInputState3,template:productState})

    axios.post(`/${dataUrl}/${controller}`,remaining,myheader)
        .then(result=>{

            setFilterData({...filterData,
                reloadData:true,
                showEdit:false,
                showAdd:false
                //heightTop:95,
                //editData:null
            })

            //setShowEdit(false)
            //setReloadData(true)
        })
        .catch(error=>{
            //console.log(error.response.data.error)
            setFilterData({...filterData,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
                //editData:tempFormInputState1
            })
            //catchErrorToMessage(error,setMessage)
            //setMessage(error.response.data.message)
            //setShowModalError(true)
        })
}   
    

React.useEffect(()=>{
    console.log('filterData')
    console.log(filterData)

    if(filterData.reloadData){
        reloadAxiosAll()
    }
},[filterData])

const [showBig,setShowBig]=React.useState(true)

return(
    <div className="bd-red" style={{position:"fixed",zIndex:"2000",height:"300%"}}>
        
            sss

    </div>

)

}
export default StickerTable;








/*




<div className="h-100 w-100 hide-on-print">

            <div className="flex-center-center w-100"
                style={{height:limitRange({value:filterData.heightTop,
                                           floor:0,ceiling:90,unit:"vh"})}}
            >

                <div className="h-100 bd-black"
                    style={{width:limitRange({value:filterData.widthLeft,
                                             floor:2,ceiling:98,unit:"%"}) }}
                >
                    {
                        renderFilter()
                    }   
                </div>
                <div className="h-100 bd-blue"
                    style={{width:limitRange({value:100-filterData.widthLeft,
                                             floor:2,ceiling:98,unit:"%"})}}
                >
                    <div style={{height:"7%"}}>
                        { renderBadge({
                            filterData,
                            setPageNumber,
                            
                            totalSwapPage:1, 
                            setSwapState:()=>{},
                            
                            setReloadData:refreshPage,
                            setShowFilter:()=>{},
                            setShowAdd:setShowAdd,
                            setShowEdit:setShowEdit,
                            setShowModalConfirm:setShowModalConfirm,
                            setUnSelectAll:setUnSelectAll
                        }) }  
                    </div>
                    <div style={{height:"93%"}}>
                        {
                            renderTable()
                        }     
                    </div>

                </div>
            </div>
            <div className="bd-yellow" 
                 style={{height:limitRange({value:90-filterData.heightTop,
                                            floor:0,ceiling:90,unit:"vh"})}}
            >
                Big
            </div>
            
                    
            <div className="bd-black" style={{height:"5vh"}}>
                {   filterData.showRange
                    ?renderRangeBar({showRange:filterData.showRange,
                        setShowRange:setShowRange,
                        widthLeft:filterData.widthLeft,
                        setWidthLeft:setWidthLeft,
                        heightTop:filterData.heightTop,
                        setHeightTop:setHeightTop
                    })
                    :null
                }    
            </div>

        </div>









*/