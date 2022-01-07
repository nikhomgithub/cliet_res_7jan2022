const filterDataTemplate={
    data0:null, 
    detail0:null,
    count:0, 
    lastRecordId:null,
    showRange:true, 

    widthLeft:25, 
    heightTop:70,
    
    pageNumber:1, 
    limitRow:10, 
    sort:{id:1},
    qry:{}, 

    tableTemplate:null,
    
    /*
    dataUrl:"p29transaction",
    tableTemplateUrl:"p29tabletemplate",
    tableTemplateName:"transactionTableTemplate",
    detailTableTemplateName:"productDetailTableTemplate",
    detailTableTemplateForFormName:"productDetailTableTemplateForForm",
    */
   
    reloadData:true,
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
            csvShow:false,
            closeShow:true,closeFunc:()=>{},
            forwardShow:false,
            bullEyesShow:false,
            unSelectShow:false,
            
    },
    
    rawMatBadgeState:{
        swapShow:false,swapFunc:()=>{},
        reloadShow:true,reloadFunc:()=>{},
        filterShow:false,filterFunc:()=>{},
        addShow:false,addFunc:()=>{},
        editShow:false,editFunc:()=>{},
        delShow:true,delFunc:()=>{},
        printerShow:false,printerFunc:()=>{},
        closeShow:true,closeFunc:()=>{}
    },


    selectProduct:[],
    showEdit:false,
    showAdd:false,
    showModalConfirm:false,
    showModalError:false,
    message:null,
    iconActionData:null,
    iconActionDataDetail:null
}


export default filterDataTemplate