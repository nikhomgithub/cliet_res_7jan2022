const partner={
   data0:null,
   
   dataCsv:null,
   count:0,
   lastRecordId:null,
   showRange:true,
   
   widthLeft:30,
   heightTop:30,

   pageNumber:1,
   limitRow:2,
   sort:{id:-1},
   qry:{},
   
   tableTemplateUrl:"p35tabletemplate",
   dataUrl:"p35partner",
   selectGroup:null,
   groupDataUrl:null,
   

   tableTemplate:null,
   detailTableTemplate:null,
   detailTableTemplateForForm:null,

   tableTemplateName:"partnerTableTemplate",
   detailTableTemplateName:"",//"productDetailTableTemplate",
   detailTableTemplateForFormName:"",//"productDetailTableTemplateForForm",//"productDetailTableTemplateForForm",
   
   reloadData:false,
   message:null,
   showModalError:false,
   editData:null,
   badgeState:{
       swapShow:false,swapFunc:()=>{},
       reloadShow:true,reloadFunc:()=>{},
       filterShow:false,filterFunc:()=>{},
       addShow:true,addFunc:()=>{},
       editShow:true,editFunc:()=>{},
       delShow:true,delFunc:()=>{},
       printerShow:true,printerFunc:()=>{},
       csvShow:true,csvFunc:()=>{},
       forwardShow:true,forwardFunc:()=>{},
       bullEyeShow:false
   },


   selectProduct:[],
   
   showAdd:false,
   showModalConfirm:false,
   showModalError:false,
   showModalCsv:false,

   message:null,
   iconActionData:null,
   iconActionDataDetail:null,
   keyName:null
}




const filterDataTemplate4=partner

export default filterDataTemplate4