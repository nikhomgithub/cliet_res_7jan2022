import FormTemplate from '../../render/renderForm/FormTemplate'
import StateTemplate from '../../model/StateTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import PageComponent from '../../component/pageComponent/SparePageComponent';
import uuid from 'react-uuid';


const {partnerForm,productForm,transactionForm}=FormTemplate
const {partnerState,productState,transactionState}=StateTemplate
const {partnerFilter,productFilter,transactionFilter,billMenuFilter}=FilterTemplate
const {partnerInputState,productInputState,transactionInputState,billMenuInputState}=inputState


const blankData={
    id:"",date:new Date().toISOString(),
    remindDate:"",
    //branchId:"",
    //branchName:"",
    transactionType:"บิลขาย",transactionStatus:"open",active:true,
    table:"",tableStatus:"open",
    paymentType:"สด",

    effectStock:"-",effectSpending:"unChange",effectCustomerPoint:"unChange",
    
    partnerId:"",partnerType:"",
    title:"",name:"",phone:[""], 
    address:"",       
    
    remark:"",
    total:0,

    totalReduction:0,
    reduction:[{
        reductionName:"",
        reductionActive:true,
        reductionRate:0,
        reductionAmount:0
    }],

    grandTotal:0,
    totalTax:0,
    tax:[{
        taxName:"",
        taxActive:true,
        taxRate:0,
        taxAmount:0
    }],

    detail:[],
    /*
    detail:[
        { _id:uuid(),
          id:"",barcode:"",productName:"",
          groupId:"",groupName:"",
          unit:"",price:0,
          priceLevel:[{price:0,remark:""}],
          quantity:0,result:0,remark:"",isRawMat:false,
          point:0,
          partnerId:"",name:"",jobStatus:"open"
        }
    ],
    */

    totalPoint:0,
    editExistingBill:false
}


const bill={
    queueArray:null,
    transactionArray:null,
    colorHead:"#7da097",
    dataIdx:"",
    //dataIdx:"data1",
    //dataIdx:"data0",
    //data0:null,
    //data0:blankData,
    data1:null,//{...blankData},
    data2:null,//{...blankData},
    //data3:blankData,
    //data4:blankData,
    //data5:blankData,
    count:0,
    lastRecordId:null,
    showRange:true,
    
    widthLeft:31,
    heightTop:60,

    pageNumber:1,
    limitRow:11,
    sort:{id:-1},
    qry:{},

    qryProduct:{isRawMat:false},

    tableTemplateUrl:"p35tabletemplate",
    dataUrl:"p35transaction",
    selectGroup:null,
    tableTemplate:null,

    detailTableTemplate:null,
    detailTableTemplateForForm:null,

    reloadData:true,
    message:null,
    showModalError:false,
    editData:null,

    badgeState:{
        swapShow:false,swapFunc:()=>{},
        reloadShow:true,reloadFunc:()=>{},////////////////refreshPage
        filterShow:false,filterFunc:()=>{},
        addShow:true,addFunc:()=>{},
        editShow:true,editFunc:()=>{},
        delShow:true,delFunc:()=>{},
        printerShow:true,printerFunc:()=>{}
    },

    customerConfirm:null,

    showParter:false,
    showGroup:false,
    showProductGrid:false,
    showTable:false,//
    showTransaction:false,
    showBillMenu:false,
    showBarcode:false,
    showQueue:false,
    showKitchen:false,

    showModalFromTable:false,
    showBillForm1:true,
    showBillForm2:false,
    reloadBillForm1:false,
    reloadBillForm2:false,

    showCustomerConfirm:false,
    includeTransactionHead:true,
    showTransactionConfirm:false,
    dataToDelete:null,

    reloadSelectProduct:true,
    selectProduct:[],
    selectOfSelectProduct:null,
    showAdd:false,
    showModalConfirm:false,
    showModalError:false,
    message:null,
    iconActionData:null,
    iconActionDataDetail:null,

    editTransaction:null,
    editProduct:null,
    editPartner:null,

    showImageBill:true,

    isGenIdOfBillForm1:false,
    isGenIdOfBillForm2:false,

    billMenuFilter:billMenuFilter,
    billMenuInputState:billMenuInputState,
    billMenuSort:{date:1},
    billMenuLimitRow:31,
    billMenuShowTransaction:false,
    billMenuOption:"and",

}

const product={
    dataUrl:"p35product",
    tableTemplateUrl:"p35tabletemplate",
    tableTemplateName:"productTableTemplate",
    detailTableTemplateName:"productDetailTableTemplate",
    detailTableTemplateForFormName:"productDetailTableTemplateForForm",
    dataState:productState,
    dataFilter:productFilter,
    dataInputState:productInputState,
    dataForm:productForm,

    groupTitle:"สวัสดี",
    groupDataUrl:"p35group",

    badgeState:{
        
        swapShow:false,swapFunc:()=>{},
        reloadShow:true,reloadFunc:()=>{},////////////////refreshPage
        filterShow:false,filterFunc:()=>{},
        addShow:false,addFunc:()=>{},
        editShow:false,editFunc:()=>{},
        delShow:true,delFunc:()=>{},
        printerShow:true,printerFunc:()=>{},
        csvShow:true,csvFunc:()=>{}
    }
}

const transaction={
    dataUrl:"p35transaction",
    tableTemplateUrl:"p35tabletemplate",
    tableTemplateName:"transactionTableTemplate",
    detailTableTemplateName:"productDetailTableTemplate",
    detailTableTemplateForFormName:"productDetailTableTemplateForForm",

    dataState:transactionState,
    dataFilter:transactionFilter,
    dataInputState:transactionInputState,
    dataForm:transactionForm,

    badgeState:{
        swapShow:false,swapFunc:()=>{},
        reloadShow:true,reloadFunc:()=>{},////////////////refreshPage
        filterShow:false,filterFunc:()=>{},
        addShow:false,addFunc:()=>{},
        editShow:false,editFunc:()=>{},
        delShow:true,delFunc:()=>{},
        printerShow:true,printerFunc:()=>{},
        csvShow:true,csvFunc:()=>{}

    }
}

const partner={
    dataUrl:"p35partner",
    tableTemplateUrl:"p35tabletemplate",
    tableTemplateName:"partnerTableTemplate",
    detailTableTemplateName:"productDetailTableTemplate",
    dataState:partnerState,
    dataFilter:partnerFilter,
    dataInputState:partnerInputState,
    dataForm:partnerForm,

    badgeState:{
        swapShow:false,swapFunc:()=>{},
        reloadShow:true,reloadFunc:()=>{},////////////////refreshPage
        filterShow:false,filterFunc:()=>{},
        addShow:false,addFunc:()=>{},
        editShow:false,editFunc:()=>{},
        delShow:true,delFunc:()=>{},
        printerShow:true,printerFunc:()=>{},
        csvShow:true,csvFunc:()=>{}

    }
}


const filterDataTemplate={
    blankData:blankData,
    bill:bill,
    product:product,
    transaction:transaction,
    product:product,
    partner:partner,
    blankData:blankData
}
export default filterDataTemplate