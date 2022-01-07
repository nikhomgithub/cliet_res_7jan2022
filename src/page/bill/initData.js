const transactionData={
    id:1, date:"2018-01-21", 
    remindDate:"2018-01-21",branch:"สาขาหลัก",

    transactionName:"tname",
    transactionType:"ใบจอง",
    transactionCode:"BR",
    
    transactionGroupType:"ขาย",
    transactionStatus:"open",
    reference:"",
    
    active:"active",   
    effectStock:"unChange",
    effectSpending:"unChange",
    effectCustomerPoint:"unChange",

    partnerId:1,
    partnerType:"ผู้ซื้อ",

    title:"นาย",
    name:"จิตติ",
    phone:["12345","67890"],

    address: {
        number:"12",
        tambon:"good",
        district:"bad",
        province:"well",
        postcode:"2345",
    },

    remark:"ของแท้",
    
    total:100,
    
    reduction:[{
        reductionName:"vat",
        reductionActive:true,
        reductionRate:7,
        reductionValue:100
    }],
    
    grandTotal:80,

    tax:[{
        taxName:"vat",
        taxActive:true,
        taxRate:7,
        taxValue:100
    }],

    detail:[
    {
        id:1,
        barcode:"1",
        productName:"สายพาน",

        groupId:1,
        groupName: "main",

        unit:"เส้น",
        price:100,
        priceLevel:[{price:100,remark:"ทุน"}],

        quantity:1,
        result:100,
        remark:"ok",
        isRawMat:false,

        partnerId:1,
        name:"John",
    },
    {
        id:2,
        barcode:"1",
        productName:"นำมันเครือ่ง",

        groupId:1,
        groupName: "main",

        unit:"แกลลอน",
        price:500,
        priceLevel:[{price:100,remark:"ทุน"}],

        quantity:1,
        result:100,
        remark:"ok",
        isRawMat:false,

        partnerId:1,
        name:"John",
    },
]
    
}


const initData={transactionData}

export default initData