const productInputState=
{
    id:     {toCheck:false,min:0,max:0},
    barcode:{toCheck:false,value:""},
    productName:   {toCheck:false,value:""},///
    //groupId:{toCheck:false,min:0,max:0},
    //groupName:{toCheck:false,value:""},
    //unit:   {toCheck:false,value:""},
    price:  {toCheck:false,min:0,max:0},///
    stock:{toCheck:false,min:0,max:0},///
    //order:{toCheck:false,min:0,max:0},
    //plan:{toCheck:false,min:0,max:0},
    active:{toCheck:true,value:true},///
    isRawMat:{toCheck:false,value:false},///
    remark: {toCheck:false,value:""},///
}


const partnerInputState={
    id:{toCheck:false,min:0,max:0},
    title:{toCheck:false,value:""},
    name:{toCheck:false,value:""},
    phone:{toCheck:false,value:""},
    active:{toCheck:true,value:true},
    remainingCustomerPoint:{toCheck:false,min:0,max:0},
    totalSpending:{toCheck:false,min:0,max:0},
    //partnerType:{toCheck:false,value:""},
    remark:{toCheck:false,value:""},
    //address_number:{toCheck:false,value:""},
    //address_tambon:{toCheck:false,value:""},
    //address_district:{toCheck:false,value:""},
    //address_province:{toCheck:false,value:""},
    //address_postcode:{toCheck:false,value:""},
  }


const transactionInputState={
  id:{toCheck:false,min:0,max:0},///
  date:{toCheck:false,min:new Date().toISOString(),max:new Date().toISOString()},///
  
  //remindDate:{toCheck:false,min:new Date().toISOString(),max:new Date().toISOString()},
  //branch:{toCheck:false,value:""},///
  //branchId:{toCheck:false,min:0,max:0},///
  //transactionName:{toCheck:false,value:""},
  transactionType:{toCheck:false,value:""},///
  //transactionCode:{toCheck:false,value:""},
  //transactionGroupType:{toCheck:false,value:""},
  transactionStatus:{toCheck:false,value:"open"},///

  //reference:{toCheck:false,value:""},
  active:{toCheck:true,value:true},///

  table:{toCheck:false,value:""},
  tableStatus:{toCheck:false,value:"open"},
  
  partnerId:{toCheck:false,min:0,max:0},///
  //partnerType:{toCheck:false,value:""},

  //title:{toCheck:false,value:""},
  name:{toCheck:false,value:""},///
  phone:{toCheck:false,value:""},///
  queueStatus:{toCheck:false,value:"open"},
  //remark:{toCheck:false,value:""},
  
  /*
  address_number:{toCheck:false,value:""},
  address_tambon:{toCheck:false,value:""},
  address_district:{toCheck:false,value:""},
  address_province:{toCheck:false,value:""},
  address_postcode:{toCheck:false,value:""},

  total:{toCheck:false,min:0,max:0},
  reduction:{toCheck:false,min:0,max:0},
  grandTotal:{toCheck:false,min:0,max:0},
  
  detail_id:     {toCheck:false,min:0,max:0},
  detail_barcode:{toCheck:false,value:""},
  detail_productName:   {toCheck:false,value:""},
  */
  /*
  detail_groupId:{toCheck:false,min:0,max:0},
  */
 /*
  detail_groupName:{toCheck:false,value:""},
  

  detail_unit:   {toCheck:false,value:""},
  detail_price:  {toCheck:false,min:0,max:0},

  
  detail_quantity: {toCheck:false,min:0,max:0},
  detail_result: {toCheck:false,min:0,max:0},
  detail_remark: {toCheck:false,value:""},
  detail_isRawMat:   {toCheck:false,value:false},

  detail_partnerId:{toCheck:false,min:0,max:0},
  detail_name:   {toCheck:false,value:""}
  */
}

const stickerInputState={
  id:{toCheck:false,min:0,max:0},
  recordName:{toCheck:false,value:""},
  date:{toCheck:false,
        min:new Date().toISOString(),
        max:new Date().toISOString(),
      },
  recordBy:{toCheck:false,value:""},
  
  productData_code:{toCheck:false,value:""},
  productData_name:   {toCheck:false,value:""},

}

const billMenuInputState={
  id:{toCheck:false,min:0,max:0},
  date:{toCheck:false,min:new Date().toISOString(),max:new Date().toISOString()},
  transactionType:{toCheck:false,value:""},
  active:{toCheck:true,value:true},
  tableStatus:{toCheck:true,value:"open"},

}


const inputState = {
    productInputState,
    partnerInputState,
    transactionInputState,
    stickerInputState,
    billMenuInputState,
}

export default inputState
