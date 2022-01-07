
const convertTableTemplateObjToArray=(objTableTemplate)=>{
    
    if(!objTableTemplate){
        return null
    }
    
    const objKeys=Object.keys(objTableTemplate)

    let tempArray=[]

    objKeys.map(i=>{
        const {lb,type,width,showCol,colOrder,
               showColHead,showSum}=objTableTemplate[i]

        const temp={
            colName:i,
            lb,type,width,showCol,showColHead,showSum,colOrder
        }
        tempArray=[...tempArray,temp]
    })

    return tempArray
}

const converTableTemplateArrayToObj=(arrayTableTemplate)=>{
    
    if(!arrayTableTemplate){
        console.log('null')
        return null
    }

    if(Array.isArray(arrayTableTemplate)){
        if(arrayTableTemplate.length==0){
            console.log('Array length = 0')
            return null
        }
    }
    
    let tempObj={}

    arrayTableTemplate.map(i=>{
        const {colName,_id,...remaining}=i
        const temp={[colName]:remaining}
        tempObj={...tempObj,...temp}
    })

    return tempObj
}

const createTableTemplate=({tableTemplate,userId,shopId})=>{
    console.log(userId)
    console.log(shopId)
    
    if(!tableTemplate || !userId || !shopId){
        return null
    }

    let tempArray=[]

    const objKeys=Object.keys(tableTemplate)

    objKeys.map(i=>{
        
        const a ={
            tableName:i,
            id:userId,
            shopId,
            template:convertTableTemplateObjToArray(tableTemplate[i])
        }
        tempArray=[...tempArray,a]
    })

    return tempArray
}

const createTableTemplateForPage=(loadTableTemplate)=>{

    if(!loadTableTemplate){
        console.log('null')
        return null
    }

    if(Array.isArray(loadTableTemplate)){
        if(loadTableTemplate.length==0){
            console.log('Array length = 0')
            return null
        }
    }

    let tempObj={}

    loadTableTemplate.map(i=>{
        const {tableName,id,shopId,template}=i
        const temp={[tableName]:converTableTemplateArrayToObj(template)}
        tempObj={...tempObj,...temp}
    })

    return tempObj
}

const convertFormTemplateArrayToObj=(formTemplateArray)=>{
    let formTemplateObj={}

    formTemplateArray.map(i=>{       
        let tempObj={["formHead"]:i.formHead}
        i.template.map(j=>{
            tempObj[j.key]=j.lb
        })
        formTemplateObj[i.formName]=tempObj
    })
    return formTemplateObj

}


const changeLanguageTableTemplate=(originalFormTemplate,originalTableTemplate)=>{
    
    let tableTemplate={...originalTableTemplate}
    const formTemplate={...originalFormTemplate}
    //console.log('changeLanguageTableTemplate')
    //console.log(formTemplate)
    //console.log(tableTemplate)

    const arrayKeyTableName=Object.keys(tableTemplate) 

    arrayKeyTableName.map(i=>{
        
        if(tableTemplate[i]&&formTemplate[i]){
            const arraySubKey=Object.keys(tableTemplate[i])
            arraySubKey.map(j=>{
                if(tableTemplate[i][j]&&formTemplate[i][j]){
                    tableTemplate[i][j]["lb"]=formTemplate[i][j]
                }
            })
        }
    })

    return tableTemplate
}



const genLanguageObjFromFormTemplate=(array)=>{
    let languageArray=[]
    
    array.map(i=>{
        if(i.formLanguage){
            languageArray=[...languageArray,i.formLanguage]
        }
    })
    
    const uniqueArray= [...new Set(languageArray)]
    
    let tempObj={}

    uniqueArray.map(i=>{
        let tempOneLanguageArray=[]

        array.map(j=>{
            if(j.formLanguage==i){
                tempOneLanguageArray=[...tempOneLanguageArray,j]
            }
        })

        tempObj[i]=convertFormTemplateArrayToObj(tempOneLanguageArray)
    })
    
    //console.log('...tempObj')
    //console.log(tempObj)
    return tempObj
}




const ctUtil= {createTableTemplate,
    createTableTemplateForPage,
    converTableTemplateArrayToObj,
    convertTableTemplateObjToArray,
    convertFormTemplateArrayToObj,
    changeLanguageTableTemplate,
    genLanguageObjFromFormTemplate
}

export default ctUtil