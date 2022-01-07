const transaction={
    data0:null, 

    dataCsv:null,
    count:0, 
    lastRecordId:null,
    showRange:true, 

    widthLeft:30, 
    heightTop:30,

    pageNumber:1, 
    limitRow:10, 
    sort:{id:1},
    qry:{}, 

    tableTemplateUrl:"p35tabletemplate",
    dataUrl:"p35transaction",
    selectGroup:null,
    groupDataUrl:null,


    tableTemplate:null,
    detailTableTemplate:null,
    detailTableTemplateForForm:null,
    
    tableTemplateName:"transactionTableTemplate",
    detailTableTemplateName:"productDetailTableTemplate",
    detailTableTemplateForFormName:"productDetailTableTemplateForForm",

    reloadData:false,
    message:null,
    showModalError:false,
    editData:null,
    badgeState:{
            swapShow:false,swapFunc:()=>{},
            reloadShow:false,reloadFunc:()=>{},
            filterShow:false,filterFunc:()=>{},
            addShow:false,addFunc:()=>{},
            editShow:false,editFunc:()=>{},

            delShow:false,delFunc:()=>{},
            printerShow:false,printerFunc:()=>{},
            csvShow:false,csvFunc:()=>{},
            closeShow:false,

            forwardShow:false,forwardFunc:()=>{},
            bullEyeShow:false,
            unSelectShow:false,
    },
    selectProduct:[],

    
    showBillForm:false,
    showModalConfirm:false,
    showModalError:false,
    showModalCsv:false,

    message:null,
    iconActionData:null,
    iconActionDataDetail:null,
    keyName:null,

    showRenderTransaction:true,
    showRenderProduct:false,
    showRenderCustomer:false,
    //includeTransactionHead:true,
    //showTransactionConfirm:false,
    //showProductConfirm:false
}

const filterDataTemplate=transaction

export default filterDataTemplate