const partner={
    data0:null,
    dataCsv:null,
    count:0,
    lastRecordId:null,
    showRange:true,
    
    widthLeft:30,
    heightTop:30,

    pageNumber:1,
    limitRow:3,
    sort:{id:-1},
    qry:{},
    tableTemplateUrl:"p35tabletemplate",
    dataUrl:"p35partner",
    selectGroup:null,

    tableTemplate:null,
    detailTableTemplate:null,
    detailTableTemplateForForm:null,

    tableTemplateName:"partnerTableTemplate",
    detailTableTemplateName:null,
    detailTableTemplateForFormName:null,

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
        forwardShow:false,forwardFunc:()=>{},
        bullEyeShow:true,
        unSelectShow:true
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

const filterDataTemplate=partner

export default filterDataTemplate