import uuid from 'react-uuid';


const blankData={
    id:"",date:new Date().toISOString(),
    remindDate:"",
    //branchId:"",
    //branchName:"",
    transactionType:"บิลขาย",transactionStatus:"open",active:true,
    table:"",tableStatus:"open",
    paymentType:"สด",

    effectStock:"0",effectSpending:"0",effectCustomerPoint:"0",
    
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

    detail:[
        { _id:uuid(),
          id:"",barcode:"",productName:"",
          groupId:"",groupName:"",
          unit:"",price:0,
          priceLevel:[{price:0,remark:""}],
          quantity:1,result:0,remark:"",isRawMat:false,
          partnerId:"",name:"",jobStatus:"open"
        }
    ],
    editExistingBill:false
}




const bill={
    showBillForm:false,///======1

    blankData:blankData,

    showTransactionConfirm:false,

    transactionArray:null,
    colorHead:"#7da097",
    dataIdx:"cancel",
    //dataIdx:"data1",
    //dataIdx:"data0",
    //data0:null,
    //data0:blankData,
    data0:null,
    //data1:{...blankData},
    //data2:{...blankData},
    //data3:blankData,
    //data4:blankData,
    //data5:blankData,
    count:0,
    lastRecordId:null,
    showRange:true,
    
    widthLeft:30,
    heightTop:60,

    pageNumber:1,
    limitRow:10,
    sort:{id:-1},
    qry:{},

    tableTemplateUrl:"p35tabletemplate",
    dataUrl:"p35transaction",
    selectGroup:null,
    tableTemplate:null,

    detailTableTemplate:null,
    detailTableTemplateForForm:null,

    reloadData:false,
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
    includeTransactionHead:true,
    showTransactionConfirm:false,
    showProductConfirm:false,

    isGenIdOfBillForm:false,
    showModalConfirm:false,

    /*
    customerConfirm:null,

    showGroup:false,
    showProductGrid:false,
    showTable:true,
    showTransaction:false,
    showModalFromTable:false,
    

    showBillForm2:false,
    
    reloadBillForm1:false,
    reloadBillForm2:false,

    showParter:false,
    showCustomerConfirm:false,
    showTransactionConfirm:false,
    dataToDelete:null,
    showBillMenu:false,

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
    billMenuLimitRow:30,
    billMenuShowTransaction:false,
    billMenuOption:"and",
    */
}

const filterDataTemplate3=bill

export default filterDataTemplate3