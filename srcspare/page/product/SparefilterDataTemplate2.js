const rawMat={
   data0:null,
   
   dataCsv:null,
   count:0,
   lastRecordId:null,
   showRange:true,
   
   widthLeft:30,
   heightTop:30,

   pageNumber:1,
   limitRow:1,
   sort:{id:-1},
   qry:{},
   tableTemplateUrl:"p35tabletemplate",
   dataUrl:"p35rawmat",
   selectGroup:null,
   groupDataUrl:"p35rawmatgroup",
   

   tableTemplate:null,
   detailTableTemplate:null,
   detailTableTemplateForForm:null,

   tableTemplateName:"rawMatTableTemplate",
   detailTableTemplateName:"",//"productDetailTableTemplate",
   detailTableTemplateForFormName:"",//"rawMatDetailTableTemplateForForm",//"productDetailTableTemplateForForm",
   
   reloadData:false,
   message:null,
   showModalError:false,
   editData:null,
   badgeState:{
       swapShow:false,swapFunc:()=>{},
       reloadShow:true,reloadFunc:()=>{},
       filterShow:false,filterFunc:()=>{},
       addShow:false,addFunc:()=>{},
       editShow:false,editFunc:()=>{},
       delShow:false,delFunc:()=>{},
       printerShow:false,printerFunc:()=>{},
       csvShow:false,csvFunc:()=>{},
       bullEyeShow:true
   },


   selectProduct:[],
   
   showAdd:false,
   showModalConfirm:false,
   showModalError:false,
   showModalCsv:false,

   message:null,
   iconActionData:null,
   iconActionDataDetail:null,
   keyName:null//["photoUrl1"]
}




const filterDataTemplate2=rawMat

export default filterDataTemplate2