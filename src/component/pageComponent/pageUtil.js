import axiosUtil from '../../util/axiosUtil'
import ctUtil from '../../util/ctUtil'
import StateUtil from '../../model/StateUtil'

import axios from 'axios'
import uuid from 'react-uuid'
import { DetailsOutlined } from '@material-ui/icons'

const {createTableTemplateForPage,convertTableTemplateObjToArray}=ctUtil
const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,
    addSingleFileNameInsteadOfPhotoUrl,
    catchErrorToMessage}=axiosUtil
const {genBlankState,genRefAndValue,revRefAndValue,combineLoadDataBlankState}=StateUtil  

//whet use reloadAxiosAll we add selectedLine = false 
//and _id with uuid() to make it unique
const genFilterDataWithIndex=(filterData,selectProduct)=>{
    //console.log('selectProduct')
    //console.log(selectProduct)
    let tempSelectProduct
    if(selectProduct){tempSelectProduct=selectProduct}
    else {tempSelectProduct=[]}

    let tempArray=[]

    filterData.map((i,idx)=>{
         
        const temp={...i,selectedLine:false,_id:uuid()}
        tempArray=[...tempArray,temp]
        //const temp={...i,tempIndex:idx,selectedLine:false}
    })

    let tempArray2=[]


    tempArray.map(i=>{
        let tempObj=i

        tempSelectProduct.map(j=>{
            if(i.id==j.id){
                //console.log('j.id==i.id')
                tempObj={...tempObj,selectedLine:j.selectedLine}
                //tempArray2=[...tempArray2,]
            }
        })

        tempArray2=[...tempArray2,tempObj]
    })
 
    return tempArray2
}
//------------------------------------
const genData=(length)=>{
    let tempArray=[]

    for (let i=1;i<=length;i++){
        const temp =  {id:i,
                     name:`name ${i}`,
                     quantity:i+100,
                     quantity2:100+i,
                     quantity3:20+i,
                     quantity4:1,
                     quantity5:15+i,
                     _id:uuid()
                    }
        tempArray=[...tempArray,temp]
    }
    return tempArray
}

//==================================
const reloadAxiosTableTemplate=(filterData,myheader)=>{
    //console.log('reloadAxiosAll')
    //console.log(filterData)
    const {pageNumber,limitRow,sort,qry,dataUrl,tableTemplateUrl,
           tableTemplateName,detailTableTemplateName,
           detailTableTemplateForFormName,selectProduct
          } = filterData

    return new Promise(function(resolve,reject){

        axios.post(`/${tableTemplateUrl}/getcustom`,{},myheader)
        .then(result=>{
            const temp = createTableTemplateForPage(result.data.data)
            const tempResult={...filterData,
                tableTemplate:temp[tableTemplateName],
                detailTableTemplate: temp[detailTableTemplateName],
                detailTableTemplateForForm: temp[detailTableTemplateForFormName],
                //tableTemplate:productTableTemplate,
                //detailTableTemplate:productDetailTableTemplate,
                reloadData:false
            } 
            resolve(tempResult)
        })
        .catch(error=>{
            const tempError={...filterData,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            }
            //console.log('tempError')
            reject(tempError)
            //console.log(tempError)
            //setFilterData(tempError)
        })
    })
}


//==================================
//when reloadDat is true => use Effect will start to use reloadAxiosAll()
//when press refresh => will start to use reloadAxiosAll()
//we get data ,count,lastRecordId and all tableTemplate 
const reloadAxiosAll=(filterData,myheader)=>{
    //console.log('reloadAxiosAll')
    //console.log(filterData)
    const {pageNumber,limitRow,sort,qry,dataUrl,tableTemplateUrl,
           tableTemplateName,detailTableTemplateName,
           detailTableTemplateForFormName,selectProduct
          } = filterData

    //console.log('reloadAxiosAll selectProduct')
    //console.log(selectProduct)

    //const temp2 = {pageNumber:pageNumber,limitRow:limitRow,sort:sort,...qry}
    //console.log('reloadAxiosAll..........')
    //console.log(qry)
    //console.log(temp2)

    //console.log(filterData.editData)
    return new Promise(function(resolve,reject){

        const promise1=axios.post(`/${dataUrl}/getlimit`,
        {pageNumber,limitRow,sort,...qry},myheader)
        const promise2=axios.post(`/${tableTemplateUrl}/getcustom`,{},myheader)
        Promise.all([promise1,promise2])
        .then(result=>{
            const temp = createTableTemplateForPage(result[1].data.data)
            //console.log(temp["productTableTemplate"])
            const temp2= genFilterDataWithIndex(result[0].data.data,selectProduct)
            //console.log('temp2')
            //console.log(temp2)
            
            //console.log('detailTableTemplateName')
            //console.log(detailTableTemplateName)
            //console.log(result[1])
            //console.log(productTableTemplate)
            //console.log(result[0].data.lastRecordId)
            //console.log('temp[tableTemplateName')
            //console.log(temp[tableTemplateName])
            const tempResult={...filterData,
                data0:temp2,
                count:result[0].data.count,
                lastRecordId:result[0].data.lastRecordId,
                tableTemplate:temp[tableTemplateName],
                detailTableTemplate: temp[detailTableTemplateName],
                detailTableTemplateForForm: temp[detailTableTemplateForFormName],

                //tableTemplate:productTableTemplate,
                //detailTableTemplate:productDetailTableTemplate,
                reloadData:false
            } 
            //console.log('tempResult')
            //console.log(tempResult)
            resolve(tempResult)
            //console.log(tempResult)
            //setFilterData(tempResult)

        })
        .catch(error=>{
            console.log(error)
            const tempError={...filterData,
                reloadData:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            }
            console.log('tempError')
            reject(tempError)
            //console.log(tempError)
            //setFilterData(tempError)
        })

    })
}
//=============================================
/*
console.log('inputState')
console.log(inputState)

const {file1,photoUrl1,...remaining}=inputState
const {id}=basicData
const tempFormInputState1={id,shopInfo:remaining}

const tempFormInputState2=addSingleFileNameInsteadOfPhotoUrl({id,file1,photoUrl1})  

const fd=genFD({
    inputState:tempFormInputState2,
    template:{
        id:StateTemplate.shopInfoState.id,
        file1:StateTemplate.shopInfoState.file1,
        photoUrl1:StateTemplate.shopInfoState.photoUrl1,
    }
})
//console.log(fd)

const promise1=axios.post(`/p35basicdata/updatecustom`,tempFormInputState1,myheader)
let promise2=null
if(file1){
    promise2=axios.post(`/p35basicdata/updatecustom`,fd,myheader)
}
*/








//=============================================
// when click confirm in add PageForm it request for addcustom to server
const submitFunctionAdd=(formInputState,filterData,productState,myheader)=>{

    return new Promise ((resolve,reject)=>{

        const {dataUrl} = filterData
        let controller="addcustom"
        let updateController="updatecustom"

        if(dataUrl.includes("transaction")){
            controller="addtransaction"
            updateController="updatetransaction"
        }

        
        //const tempFormInputState1={...formInputState}
        //const tempFormInputState2=addSingleFileNameInsteadOfPhotoUrl(tempFormInputState1)  
        /////////////const tempFormInputState2=addFileNameInPhotoUrl(tempFormInputState1)  
        //const tempFormInputState3=combineLoadDataBlankState({template:productState,loadData: tempFormInputState2})
        //const fd=genFD({inputState:tempFormInputState3,template:productState})

        const {id,file1,detail,photoUrl1,...remaining}=formInputState
        let tempFormInputState1={id,...remaining,hasDetailProduct:false}
        
        let tempArray=null
        if(detail){
            tempArray=[]
            detail.map(j=>{
                const {_id,...remaining2}=j
                tempArray=[...tempArray,remaining2]
            })
        
            tempFormInputState1={...tempFormInputState1,detail:tempArray}

            if(detail.length>0){
                if(detail[0]){
                    tempFormInputState1={...tempFormInputState1,hasDetailProduct:true}
                }
            }
        }

        //let promise1=axios.post(`/${dataUrl}/${controller}`,tempFormInputState1,myheader)
        
        if(file1){
            //console.log('have file1xxxxxxxxxx')
            const tempFormInputState2=addSingleFileNameInsteadOfPhotoUrl({id,file1,photoUrl1})  

            const fd=genFD({
                inputState:tempFormInputState2,
                template:{
                    id:productState.id,
                    file1:productState.file1,
                    photoUrl1:productState.photoUrl1,
                }
            })
    
            axios.post(`/${dataUrl}/${controller}`,tempFormInputState1,myheader)
            .then(result=>{
                return axios.post(`/${dataUrl}/${updateController}`,fd,myheader)
            })
            .then(result=>{
                //console.log('result')
                //console.log(result)
                const tempResult={...filterData,
                    reloadData:true,
                    showEdit:false,
                    showAdd:false,
                    selectGroup:null,
                    heightTop:95,
                }   
                resolve (tempResult)       
            })    
            .catch(error=>{
                const tempError={...filterData,
                    reloadData:false,
                    message:catchErrorToMessage(error),
                    showModalConfirm:false,
                    showModalError:true,
                    editData:tempFormInputState1,
                    selectGroup:null
                }
                reject(tempError)
            })
        }
    
        else{
            axios.post(`/${dataUrl}/${controller}`,{...tempFormInputState1,photoUrl1},myheader)
            .then(result=>{
               
                const tempResult={...filterData,
                    reloadData:true,
                    showEdit:false,
                    showAdd:false,
                    heightTop:95,
                }   
                resolve (tempResult)       
            })
            .catch(error=>{
                const tempError={...filterData,
                    reloadData:false,
                    message:catchErrorToMessage(error),
                    showModalConfirm:false,
                    showModalError:true,
                    editData:tempFormInputState1
                }
                reject(tempError)
            })

        }

    })   
}   

//when click confirm in edit PageForm it request updatecustom to server
const submitFunctionEdit=(formInputState,filterData,productState,myheader)=>{


    return new Promise ((resolve,reject)=>{
        const {dataUrl} = filterData

        let controller="updatecustom"

        if(dataUrl.includes("transaction")){
            controller="updatetransaction"
        }
        
        //const tempFormInputState1={...formInputState}
        //const tempFormInputState2=addSingleFileNameInsteadOfPhotoUrl(tempFormInputState1)  
        /////////const tempFormInputState2=addFileNameInPhotoUrl(tempFormInputState1)  
        //const tempFormInputState3=combineLoadDataBlankState({template:productState,loadData:tempFormInputState2})
        //const fd=genFD({inputState:tempFormInputState3,template:productState})

        const {id,file1,photoUrl1,detail,...remaining}=formInputState
        
        let tempFormInputState1={id,...remaining,hasDetailProduct:false}

        let tempArray=null
        if(detail){
            tempArray=[]
            detail.map(j=>{
                const {_id,...remaining2}=j
                tempArray=[...tempArray,remaining2]
            })
            tempFormInputState1={...tempFormInputState1,detail:tempArray}

            if(detail.length>0){
                if(detail[0]){
                    tempFormInputState1={...tempFormInputState1,hasDetailProduct:true}
                }
            }
        }

        if(file1){
            console.log('have file1------------------')
            const tempFormInputState2=addSingleFileNameInsteadOfPhotoUrl({id,file1,photoUrl1})  

            const fd=genFD({
                inputState:tempFormInputState2,
                template:{
                    id:productState.id,
                    file1:productState.file1,
                    photoUrl1:productState.photoUrl1,
                }
            })

                axios.post(`/${dataUrl}/${controller}`,fd,myheader)
                .then(result=>{
                    return axios.post(`/${dataUrl}/${controller}`,tempFormInputState1,myheader)
                })
                .then(result=>{
                    const tempResult=
                    {...filterData,
                        reloadData:true,
                        showEdit:false,
                        showAdd:false,
                        heightTop:95,
                        editData:null,
                        selectGroup:null
                    }
                    resolve(tempResult)
                })
                .catch (error=>{
                    const tempError = 
                    {...filterData,
                        reloadData:false,
                        message:catchErrorToMessage(error),
                        showModalConfirm:false,
                        showModalError:true,
                        editData:tempFormInputState1,
                        selectGroup:null
                    }
                    reject (tempError)
                })
        }
        else{
            
                axios.post(`/${dataUrl}/${controller}`,{...tempFormInputState1,photoUrl1},myheader)
                .then(result=>{
                    const tempResult=
                    {...filterData,
                        reloadData:true,
                        showEdit:false,
                        showAdd:false,
                        heightTop:95,
                        editData:null
                    }
                    resolve(tempResult)
                })
                .catch(error=>{
                    const tempError = 
                    {...filterData,
                        reloadData:false,
                        message:catchErrorToMessage(error),
                        showModalConfirm:false,
                        showModalError:true,
                        editData:tempFormInputState1
                    }
                    reject (tempError)
                })
        }
    })
}   
    
//============================

//when we click search $in or $or 
//it gen arrayForFilter and reload data again 
//========================================
const filterAxios=(option,inputState,filterTemplate,filterData,myheader,controller)=>{
        console.log('filterAxios.....')
        //console.log(option)
        //console.log(inputState)
    let myController="getlimit"
    if(controller){
        myController=controller
    }

    return new Promise ((resolve,reject)=>{
        const {pageNumber,limitRow,sort,dataUrl} = filterData

        const arrayCommand=genArrayForFilterAxios({
            filterTemplate:filterTemplate,
            inputState:inputState
        })
        //console.log(arrayCommand)
        let qry = null
        if(option=="and"){ qry={$and:arrayCommand} }
        if(option=="or"){ qry={$or:arrayCommand} }
        /*
        setFilterData({
            ...filterData,
            pageNumber:1,
            qry:qry
        })
        */
        //setPageNumber(1)
        //setQry(qry)
        axios.post(`/${dataUrl}/${myController}`,{pageNumber,limitRow,sort,...qry},myheader)
        .then(result=>{
            const tempResult= { ...filterData,
                                data0:result.data.data,
                                count:result.data.count,
                                lastRecordId:result.data.lastRecordId,
                                reloadData:false,
                                pageNumber:1,
                                qry:qry,
                             }
            resolve(tempResult)
        })
        .catch(error=>{
            //catchErrorToMessage(error,setMessage)
            //setMessage(error.response.data.message)
            const tempError={...filterData,
                                reloadData:false,
                                message:catchErrorToMessage(error),
                                showModalConfirm:false,
                                showModalError:true,
                                pageNumber:1,
                                qry:qry
                            }
            reject(tempError)
        })

    })
}

//=====================================

const saveTableTemplate=(tableTemplate,tableTemplateUrl,tableTemplateName,myheader)=>{
    console.log('saveTableTemplate')
    console.log(tableTemplateUrl)
    console.log(tableTemplateName)
    console.log(tableTemplate)
    
    //const {tableTemplateUrl} = filterData
    //const {tableTemplateUrl,tableTemplate} = filterData
    let tempTableTemplate={}
    const object=Object.keys(tableTemplate)
    
    //make sure showColHead  and not show MdClose
    object.map(i=>{
        let tempObj=tableTemplate[i]
        tempTableTemplate={...tempTableTemplate,[i]:{...tempObj,["showColHead"]:true}}
    })

    //change formate before save to DB 
    const temp={
        tableName:tableTemplateName,
        template: convertTableTemplateObjToArray(tempTableTemplate)
    }

    console.log('temp')
    console.log(temp)

    axios.post(`/${tableTemplateUrl}/updatetabletemplate`,temp,myheader)
    .then(result=>{console.log(result)})
    .catch(error=>{console.log(catchErrorToMessage(error))})
}

//=======================================
//<LineForm/> onBlur => updateFilterData with LineForm
const updateFilterData=(index,i,filterData)=>{
    //<LineForm/>   onBlur => updateFilterData


    const {data0,selectProduct}=filterData
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

    //update selectProduct with LineForm as well 
    let tempArray2=[]

    selectProduct.map(k=>{
        if(k._id==i._id){
            //tempArray2=[...tempArray2,k]
        }
        else {
            tempArray2=[...tempArray2,k]
        }
    })
    tempArray2=[...tempArray2,i]

    return {data0:tempArray,selectProduct:tempArray2}
    /*
    setFilterData({...filterData,
        data0:tempArray,
        selectProduct:tempArray2
    })
    */
}
//=====================================
const updateDetailOfFilterData=(index,i,filterData)=>{

    const {detail0,selectProduct}=filterData

    let tempArray=[] //for update  data0 with... i of LineForm
    detail0.map(j=>{
        if(j._id==i._id){
            tempArray=[...tempArray,i]
        }   
        else{
            tempArray=[...tempArray,j]
        }
    })

    let tempArray2=[]

    selectProduct.map(k=>{
        if(k._id==i._id){
            //tempArray2=[...tempArray2,k]
        }
        else {
            tempArray2=[...tempArray2,k]
        }
    })
    
    tempArray2=[...tempArray2,i]

    return {detail0:tempArray,selectProduct:tempArray2}
    
}


//=====================================
//when click FaBullEyes it change data0.selectedLine 
//and set selectProct to null 
//and uncheck all input radio 
const setUnSelectAll=(filterData)=>{
    let tempArray=[]

    filterData.data0.map(i=>{
        tempArray=[...tempArray,{...i,selectedLine:false}]
    })
    return {...filterData,
        selectProduct:[],
        data0:tempArray
    }
}

//-----------------------------------

//----------------------------------------
const submitFunctionDelete=(filterData,myheader)=>{
    return new Promise ((resolve,reject)=>{

        const {dataUrl,selectProduct}=filterData
        let controller="deletemany"

        if(dataUrl=="transaction"){
            controller="deletetransaction"
        }

        let tempId=[]

        selectProduct.map(i=>{
            if (i.selectedLine){
                tempId=[...tempId,i.id]
            }
        })
        
        const qry = {id:{$in:tempId}}

        axios.post(`/${dataUrl}/${controller}`,qry,myheader)
        .then(result=>{
            const tempResult={...filterData,
                                reloadData:true,
                                showModalConfirm:false,
                                selectProduct:[]
                             }
            resolve(tempResult)
        })
        .catch(error=>{
            //console.log('errrrrrr')
            //console.log(error.response.data.error.message)
            const tempError = {...filterData,
                                    reloadData:false,
                                    message:catchErrorToMessage(error),
                                    showModalConfirm:false,
                                    showModalError:true,
                                }
            reject(tempError)
        })
    })
}

//=====================================
const pageUtil={
    reloadAxiosAll,reloadAxiosTableTemplate,saveTableTemplate,
    updateFilterData,updateDetailOfFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
}

export default pageUtil

