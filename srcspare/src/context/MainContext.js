import React from 'react'
import axios from 'axios';
import tableUtil from '../component/table/tableUtil'
import ctUtil from '../util/ctUtil'
import FilterTemplate from '../render/renderFilter/FilterTemplate' 
import FormTemplate from './FormTemplate';
import ModalFormTemplate from '../render/renderForm/FormTemplate'

const {sortColumn} = tableUtil
const {createTableTemplateForPage,convertTableTemplateObjToArray,
      convertFormTemplateArrayToObj,
      changeLanguageTableTemplate
    }=ctUtil

export const MainContext=React.createContext();

const findHaveToken=(tokenName)=>{
    if(localStorage.getItem(tokenName)){
        return true
    }
    else {
        return false
    }
}



const MainContextProvider=(props)=>{
    console.log('MainContext....')
  
    const [tokenSt,setTokenSt] = React.useState({
        reloadCheckToken:true,
        haveShopToken:findHaveToken('shopauthorization'),
        haveUserToken:findHaveToken('userauthorization'),
        userName:null
    })

    const [basicDataSt,setBasicDataSt]=React.useState({
        reloadBasicData:true,
        basicData:null,
        pageData:null,
        tableTemplate:null
    })

    React.useEffect(()=>{
        //console.log('basicDataSt')
        //console.log(basicDataSt)
    },[basicDataSt])

    const myheader={headers: {'Content-Type': 'application/json',
    'Shopauthorization':localStorage.getItem('shopauthorization'),
    'Userauthorization':localStorage.getItem('userauthorization')
    }}

    
    const setBasicData=(temp)=>{
        setBasicDataSt({...basicDataSt,
            basicData:temp
        })
    }
    const setReloadBasicData=(value)=>{
        setBasicDataSt({ ...basicDataSt,reloadBasicData:true})
    }
    const setReloadCheckToken=(value)=>{
        setTokenSt({...tokenSt,reloadCheckToken:true})
    }



    React.useEffect(()=>{
        const {
            reloadCheckToken,
            haveShopToken,
            haveUserToken,
            userName
        }=tokenSt
        
        let tempSt={...tokenSt}

        if(reloadCheckToken){

            if(localStorage.getItem('shopauthorization')){
                tempSt={...tempSt,haveShopToken:true}
            }
            else{
                tempSt={...tempSt,haveShopToken:false}
                localStorage.removeItem('userauthorization')
                localStorage.removeItem('username')
            }

            if(localStorage.getItem('userauthorization')&&
            localStorage.getItem('username')){
                
                tempSt={...tempSt,
                        haveUserToken:true,
                        userName:localStorage.getItem('username')
                    }
                }
            else{
                
                localStorage.removeItem('userauthorization')
                localStorage.removeItem('username')

                tempSt={...tempSt,
                    haveUserToken:false,
                    userName:null
                }
            }
            tempSt={...tempSt,
                reloadCheckToken:false
            }
            setTokenSt(tempSt)

        }
    },[tokenSt])


    React.useEffect(()=>{  
        console.log('------------')
        const {reloadBasicData,basicData}=basicDataSt
        let tempSt

        if(reloadBasicData){
            const promise1=axios.post('/p35basicdata/getcustom',{},myheader)
            const promise2=axios.post('/p35formtemplate/getcustom',{},myheader)
            const promise3=axios.post('/p35tabletemplate/getcustom',{},myheader)
            const promise4=axios.post('/p35branch/getcustom',{},myheader)
            const promise5=axios.post('/p35user/getuserbyid',{},myheader)

            const tempFormTemplate=convertFormTemplateArrayToObj(FormTemplate)
            
            Promise.all([promise1,promise2,promise3,promise4,promise5])
            //    .then(result=>{
            .then(result=>{

                console.log('2222222222222')
                //console.log(result[4].data.data)
                //console.log(result)
                const tempBasicData=result[0].data.data[0]
                //console.log('1')
                //console.log('tempBasicData')
                //console.log(tempBasicData)
                let listOfPrintPage=[]
                tempBasicData.printPage.map(i=>{
                    listOfPrintPage=[...listOfPrintPage,i.printPageName]
                })
                
                const tempRouteAuth=sortColumn(result[0].data.data[0].routeAuth,"id","number","a-b")
                //console.log('2')
                //console.log(result[2])
                let tempTableTemplate = createTableTemplateForPage(result[2].data.data)
                //console.log('3')
                //let tempFormTemplate=result[1].data.data
                //console.log('tempTableTemplate') 
                //console.log(tempTableTemplate)                
                let tempLanguageArray=result[1].data.data

               // console.log('4')
                let tempBrD=result[3].data.data[0]

                const tempUser=result[4].data.data[0]
                //console.log('tempBrD')
                //console.log(tempBrD)

                const {id,...remaining}=tempBrD 
                const tempBranchData={...remaining,
                                      branchId:id
                                      }
                                    
                //console.log('tempBranchData')
                //console.log(tempBranchData)
                //==============================
                //console.log('tempLanguageArray')
                //console.log(tempLanguageArray)

                let listOfLanguage=[]
                let tempLanguageObj={}

                tempLanguageArray.map(i=>{
                        //console.log(i.id)
                        let tempObj={}

                        i.template.map(j=>{
                            tempObj={...tempObj,[j.key]:j.lb}
                        })
                        tempObj={...tempObj,["thisId"]:i.id}
                        tempLanguageObj={...tempLanguageObj,[i.formLanguage]:tempObj}

                        listOfLanguage=[...listOfLanguage,i.formLanguage]
                })
                //console.log('5')
                //console.log('tempLanguageObj')
                //console.log(tempLanguageObj)

                 //==============================
                //const selectLanguage=tempLanguageObj["Thai"]
                const selectLanguage=tempLanguageObj[tempBranchData.languageSetting]

                //console.log('selectLanguage')
                //console.log(selectLanguage)
                //===============================
                let tempModalFormTemplate={}

                
                //console.log('6')
                //console.log(Object.keys(ModalFormTemplate))
                //console.log(ModalFormTemplate)
                //console.log(selectLanguage)

                Object.keys(ModalFormTemplate).map(formName=>{
                    //console.log('formName')
                    //console.log(formName)
                    let tempFormObj={}
                    Object.keys(ModalFormTemplate[formName]).map(fieldName=>{
                        //console.log('fieldName')
                        //console.log(fieldName)
                        if(!selectLanguage[fieldName]){
                            //console.log('fieldName not found')
                            //console.log(fieldName)
                        }
                        //console.log('pppp')

                       let tempField ={...ModalFormTemplate[formName][fieldName],lb:selectLanguage[fieldName]}

                       if(ModalFormTemplate[formName][fieldName].subFormTemplate){
                         
                         let tempSubFormTemplate={}
                         Object.keys(ModalFormTemplate[formName][fieldName].subFormTemplate).map(subFormField=>{
                            //console.log('subFormField')
                            if(!selectLanguage[subFormField]){
                                //console.log('subFormField not found')
                                //console.log(subFormField)
                            }
                            //console.log(subFormField)

                            const x=ModalFormTemplate[formName][fieldName].subFormTemplate[subFormField]
                            tempSubFormTemplate={...tempSubFormTemplate,
                                [subFormField]:{...x,lb:selectLanguage[subFormField]}} 
                         })

                         tempField={...tempField,subFormTemplate:tempSubFormTemplate}
                       }
                       tempFormObj={...tempFormObj,[fieldName]:tempField}
                    })
                    tempModalFormTemplate={...tempModalFormTemplate,[formName]:tempFormObj}   
                })
                //console.log('7')
                //console.log('tempModalFormTemplate')
                //console.log(tempModalFormTemplate)
                //===============================
                //console.log('tempFormTemplate')
                //console.log(tempFormTemplate)
                //customerConfirmForm:{formHead,id,name,price.......
                let finalFormTemplate={}
                const tempTP=Object.keys(tempFormTemplate)
                
                
                //formHead-customerConfirmForm
                tempTP.map(i=>{ //productDetailTableTemplate,customerConfirmForm

                    let subObj={}
                    if(selectLanguage[`formHead-${i}`]){
                        subObj={["formHead"]:selectLanguage[`formHead-${i}`]}
                    }

                    const subTP=Object.keys(tempFormTemplate[i])
                    subTP.map(j=>{//barcode
                        if(!selectLanguage[j]){
                            //console.log('iiiiiiiiiiii')
                            //console.log(j)
                        }

                        if(j!="formHead"){
                            subObj={...subObj,[j]:selectLanguage[j]}
                        }

                    })
                    finalFormTemplate={...finalFormTemplate,[i]:subObj}
                })
                //console.log('8')
                //console.log('finalFormTemplate')
                //console.log(finalFormTemplate)
                //==============================
                let pageFilterForm={
                    ["productFilterForm"]:finalFormTemplate["productFilterForm"],
                    ["partnerFilterForm"]:finalFormTemplate["partnerFilterForm"],
                    ["transactionFilterForm"]:finalFormTemplate["transactionFilterForm"],
                }
                //==============================
                let pageFilter={}

                let tempKeyFilterTemplate = Object.keys(FilterTemplate)
                
                tempKeyFilterTemplate.map(i=>{
                    let tempArray=[]

                    FilterTemplate[i].map(j=>{
                        const tempObj={...j,lb:selectLanguage[j.keyName]}
                        tempArray=[...tempArray,tempObj]
                    })

                    pageFilter={...pageFilter,[i]:tempArray}
                })
                //================================
                //console.log('kkkkktempTableTemplate')
                //console.log(tempTableTemplate)
                
                let tableTemplate={}    
    
                let tempKeyTableTemplate = Object.keys(tempTableTemplate)
                tempKeyTableTemplate.map(i=>{ //partnerTP,productTP,basicDtaTP
                    
                    let tempTp={}

                    const subTableTemplateKey=Object.keys(tempTableTemplate[i])
                    subTableTemplateKey.map(j=>{ //j=>id,routeAddress,routeName 
                        tempTp={...tempTp,[j]:{...tempTableTemplate[i][j],["lb"]:selectLanguage[j]} }
                                          //j=>id,routeAddress, 
                    })

                    tableTemplate={...tableTemplate ,[i]:tempTp }
                })

                //==================================

                //console.log('9')
                //console.log('pageFilterForm')
                //console.log(pageFilterForm)
                
                //console.log('++++++++++tableTemplate')
                //console.log(tableTemplate)
                
                tempSt={...basicDataSt,
                    reloadBasicData:false,
                    basicData:{...tempBasicData,
                        routeAuth:tempRouteAuth,
                        ...tempBranchData,
                        listOfLanguage:listOfLanguage,
                        listOfPrintPage:listOfPrintPage
                    },
                    pageData:finalFormTemplate,
                    tableTemplate:tableTemplate,
                    pageFilter:pageFilter,
                    pageFilterForm:pageFilterForm,
                    languageObj:tempLanguageObj,
                    modalFormTemplate:tempModalFormTemplate,
                    user:tempUser
                }
                
                console.log('tempSt')
                console.log(tempSt)
                setBasicDataSt(tempSt)

            })
            .catch(err=>{
                console.log('err')
                console.log(err)
                tempSt={...basicDataSt,
                    reloadBasicData:false
                }
                setBasicDataSt(tempSt)
            })
        }
    },[basicDataSt])




//=========================================
//=========================================
return(
        <MainContext.Provider value={
            {
               //allTableTemplate,
               myheader,
               tokenSt,setTokenSt,
               setReloadCheckToken,
               basicDataSt,
               setReloadBasicData,
               setBasicData
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;
