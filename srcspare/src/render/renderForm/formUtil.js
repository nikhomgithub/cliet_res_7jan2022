
const convertFormTemplateToTableTemplate=(formTemplate,detailTableTemplate)=>{


  //console.log('formTemplate............')
  //console.log(formTemplate)

  //console.log('detailTableTemplate..............')
  //console.log(detailTableTemplate)

  if(!formTemplate){
    return null
  }

  if(!formTemplate["detail"]){
    return null
  }

  if(!formTemplate["detail"]["subFormTemplate"]){
    return null
  }
  else{


      const detailFormTemplate=formTemplate["detail"]["subFormTemplate"]
      const temp={}
      const objKeys = Object.keys(detailFormTemplate)
      objKeys.map(i=>{
        const {templateType,subCName,...remaining} = detailFormTemplate[i]         
        
        if(detailTableTemplate[i]){
          temp[i]={...detailFormTemplate[i],...detailTableTemplate[i]}
        }      
        else{
          temp[i]={ type:templateType, 
                    width:subCName[0],
                    showCol:true,
                    showColHead:true,
                    ...remaining}
        }
      })

      //console.log('formTemplate............')
      //console.log(temp)
    
      return temp
      
  }
}







/*
const convertFormTemplateToTableTemplate=(formTemplate)=>{

    if(!formTemplate){
      return null
    }

    if(!formTemplate["detail"]){
      return null
    }

    if(!formTemplate["detail"]["subFormTemplate"]){
      return null
    }
    else{

        
        const detailFormTemplate=formTemplate["detail"]["subFormTemplate"]
        const temp={}
        const objKeys = Object.keys(detailFormTemplate)
        objKeys.map(i=>{
          const {templateType,subCName,...remaining} = detailFormTemplate[i]         
          
          //if(detailTableTemplate[i]){
          //  temp[i]={...detailFormTemplate[i],...detailTableTemplate[i]}
          //}      
          //else{
            temp[i]={ type:templateType, 
                      width:subCName[0],
                      showCol:true,
                      showColHead:true,
                      ...remaining}
          //}
        })

        //console.log('convertFormTemplateToTableTemplate')
        //console.log(temp)

        return temp
        
    }
  }
*/
  

const formUtil={convertFormTemplateToTableTemplate}

export default formUtil




/*

const convertFormTemplateToTableTemplate=(formTemplate,detailTableTemplate)=>{


  console.log('formTemplate............')
  console.log(formTemplate)

  console.log('detailTableTemplate..............')
  console.log(detailTableTemplate)

  if(!formTemplate){
    return null
  }

  if(!formTemplate["detail"]){
    return null
  }

  if(!formTemplate["detail"]["subFormTemplate"]){
    return null
  }
  else{


      const detailFormTemplate=formTemplate["detail"]["subFormTemplate"]
      const temp={}
      const objKeys = Object.keys(detailFormTemplate)
      objKeys.map(i=>{
        const {templateType,subCName,...remaining} = detailFormTemplate[i]         
        
        if(detailTableTemplate[i]){
          temp[i]={...detailFormTemplate[i],...detailTableTemplate[i]}
        }      
        else{
          temp[i]={ type:templateType, 
                    width:subCName[0],
                    showCol:true,
                    showColHead:true,
                    ...remaining}
        }
      })
      return temp
      
  }
}
*/