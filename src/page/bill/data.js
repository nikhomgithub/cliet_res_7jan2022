const blankData={
    id:"",date:new Date().toISOString().substring(0,10),
    remindDate:"",branch:"สาขาหลัก",
    transactionName:"",transactionType:"",transactionCode:"",
    transactionGroupType:"",transactionStatus:"เปิด",reference:"",
    active:"active",
    effectStock:"unChange", effectSpending:"unChange", effectCustomerPoint:"unChange",
    photoUrl1:[""],partnerId:"",partnerType:"",
    title:"",name:"",phone:[""], 
    address:{number:"",tambon:"",district:"",province:"",postcode:""},       
    remark:"",total:0,reduction:0,grandTotal:0,
    tax:[],
    detail:[
        { id:"",barcode:"",productName:"",
          groupId:"",groupName:"",
          unit:"",price:0,
          priceLevel:[{price:"",remark:""}],
          quantity:1,result:0,remark:"",isRawMat:true,
          partnerId:"",name:""
        }
    ],
    editExistingBill:false
}



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
    reloadData:true
}


const basicData={

    shopInfo:{
        name:"อร่อยบาร์",
        nameActive:true,
        address:"123 บางแสน บางโฉลก ลาดยาว กทม",
        addressActive:true,
        contact:"1234 4567",
        contactActive:true,
        branch:"สาขาหลัก",
        branchActive:true,
        other:"",
        otherActive:false,
        photoUrl1:["https://picsum.photos/id/7/300/200"],
        logoActive:true
    },


    id:1,

    branch:["สาขาหลัก","สาขาย่อย1"],
    customerType:["ผู้ซื้อ","ผู้ขาย"],

    unit:["อัน","ชิ้น","แผ่น"],
    title:["นาย","นาง","นางสาว"],
    billType:["บิลเงินสด"],
    
    table:["T1","T2","T3"],
    tableStatus:["จอง","ว่าง","ปิด"],
    jobStatus:["เสร็จ","กำลังทำ"],
    billStatus:["ปิด","ยกเลิก","เปิด"],

    paymentType:["สด","บัตร"],

    tax:[{
        taxName:"vat",
        taxActive:true,
        taxRate:7,
    }],
    
    reduction:[
        {
        reductionName:"ทั่วไป",
        type:"number",
        rate:"200",
        remark:""
        },
        {
        reductionName:"10แถม1",
        type:"number",
        rate:"200",
        remark:""
        },
    ],
    userLevel:["admin","staff","visitor"]
}


const data={basicData,filterDataTemplate,blankData}

export default data