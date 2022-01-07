import uuid from "react-uuid"

const patternNumber=/^\d{1,30}$/gi
const patternString=/^[ก-๙\w\+\-\*\/\\.=]{1,200}$/gi
const patternEmail=/^[\w@\.\-]{1,30}$/gi
const patternDate=/^\d{4}-\d{2}-\d{2}$/gi
const patternFileName=/^[\w\-\*\/\.\\=]{1,200}$/gi
const patternBoolean=/^(true)|(false)$/gi
const patternWildCard=/.{0,200}/gi
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi

const valBasic= (pttn,str)=>{
    return new RegExp(pttn).test(str)
}

const valArray= (pttn,array)=>{
    let tempResult=true

    for (let i=0; i<array.length;i++){
        tempResult= new RegExp(pttn).test(array[i])
        if(!tempResult){
            break
        }
    }
    return tempResult
}
const valNone=()=>{
  return true
}


const shopPaymentState={
  file1:{stType:"file",validate:valNone,pattern:null},
  photoUrl1:{stType:"array",  validate:valArray,    pattern:patternFileName},
}

const shopInfoState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
  file1:{stType:"file",validate:valNone,pattern:null},
  photoUrl1:{stType:"array",  validate:valArray,    pattern:patternFileName},

  shopInfo:{stType:"object",stChildren:{
    nameOfShop:      {stType:"string", validate:valBasic,  pattern:patternString},
    nameOfShopActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean},
    address:     {stType:"string", validate:valBasic,  pattern:patternString},
    addressActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean},
    contact:     {stType:"string", validate:valBasic,  pattern:patternString},
    contactActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean},
    branch:     {stType:"string", validate:valBasic,  pattern:patternString},
    branchActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean}, 
    other:     {stType:"string", validate:valBasic,  pattern:patternString},
    otherActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean},
    logoActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean},

  }}

}


const basicDataShopInfo={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
  branch:{stType:"array", validate:valArray, pattern:patternString, lb:"สาขา"},
  customerType:{stType:"array", validate:valArray, pattern:patternString, lb:"ประเภทลูกค้า"},
  
  unit:{stType:"array", validate:valArray, pattern:patternString, lb:"หน่วย"},  
  title:{stType:"array", validate:valArray, pattern:patternString, lb:"คำนำหน้า"},
  billType:{stType:"array", validate:valArray, pattern:patternString, lb:"ประเภทบิล"},

  table:{stType:"array", validate:valArray, pattern:patternString, lb:"โต๊ะ"},  
  tableStatus:{stType:"array", validate:valArray, pattern:patternString, lb:"สถานะโต๊ะ"},  
  jobStatus:{stType:"array", validate:valArray, pattern:patternString, lb:"สถานะงาน"},  
  billStatus:{stType:"array", validate:valArray, pattern:patternString, lb:"สถานะบิล"},  
  
  paymentType:{stType:"array", validate:valArray, pattern:patternString, lb:"ประเภทการชำระเงิน"},  

  userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"กลุ่มผู้ใช้"},
  routeAuth:{stType:"arrayObject",stChildren:{
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
    routeAddress:{stType:"string", validate:valBasic, pattern:patternString, lb:"url"},
    routeName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสิทธิ์"},
    userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
  }},

  tax:{stType:"arrayObject",stChildren:{
    taxName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ประเภทภาษี"},
    taxRate:{stType:"number", validate:valBasic, pattern:patternNumber, lb:"อัตรา"},
    taxActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true, lb:"แอคทีฟ"},
  }},

  reduction:{stType:"arrayObject",stChildren:{
    reductionName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ส่วนลด"},
    type:{stType:"string", validate:valBasic, pattern:patternString, lb:"ประเภท"},
    rate:{stType:"number", validate:valBasic, pattern:patternNumber, lb:"อัตรา"},
    remark:{stType:"string", validate:valBasic, pattern:patternString, lb:"หมายเหตุ"},

  }},
}


/*
const shopSignUpState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
  ownerName:    {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อเจ้าของ"},
  ownerPassword:{stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสเ้จ้าของ"},
  ownerEmail:   {stType:"string", validate:valBasic,  pattern:patternEmail, lb:"อีเมล"},
}

const shopLogInState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
}

const shopChangePasswordState={
  shopName:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อร้าน"},
  password:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้าน"},
  newPassword1: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้านใหม่"},
  newPassword2: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสร้านใหม่อีกรั้ง"},
}

const addUserState={
  id:       {stType:"string", validate:valBasic,  pattern:patternNumber, lb:"ไอดี"},
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
  userLevel:{stType:"string", validate:valBasic,  pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
  name:     {stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
  surname:  {stType:"string", validate:valBasic,  pattern:patternString, lb:"สกุล"},
}

const logInState={
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
}

const changePasswordState={
  username: {stType:"string", validate:valBasic,  pattern:patternString, lb:"ยูสเซอร์เนม"},
  password: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัส"},
  newPassword1: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสใหม่"},
  newPassword2: {stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสใหม่อีกครั้ง"},
}
*/

const partnerState={
  id: {stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสคู่ค้า"},
  newId: {stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสคู่ค้าใหม่"},

  title:{stType:"string", validate:valBasic,  pattern:patternString, lb:"คำนำหน้า"},
  name:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
  active:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true, lb:"active"},

  phone:{stType:"array",  validate:valArray,  pattern:patternNumber, lb:"โทรศัพท์"},
  partnerType:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ประเภทคู่ค้า"},

  address:{stType:"array",  validate:valArray,  pattern:patternNumber, lb:"ที่อยู่"},
  remark:{stType:"string",  validate:valBasic,     pattern:patternString, lb:"หมายเหตุ"},
  
  remainingCustomerPoint: {stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"แต้มสะสม"},
  totalSpending:{stType:"number", validate:valBasic,  pattern:patternNumber, stDefault:0, lb:"ยอดใช้จ่าย"},
}


const groupState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสประเภทคู่ค้า"},
  //newId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสประเภทคู่ค้าใหม่"},
  gcode:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสประเภทคู่ค้า"},
  groupName:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ประเภทคู่ค้า"},
  level:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสประเภทคู่ค้า"},
}

const productState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสสินค้า"},
  newId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสสินค้าใหม่"},

  barcode:{stType:"string", validate:valBasic,  pattern:patternString, lb:"บาร์โค้ด"},
  productName:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อสินค้า"},
  
  groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสกลุ่มสินค้า"},
  groupName:{stType:"string", validate:valBasic,  pattern:patternString, lb:"กลุ่มสินค้า"},

  unit:{stType:"string", validate:valBasic,  pattern:patternString, lb:"หน่วย"},

  price:{stType:"number", validate:valBasic, pattern:patternNumber, lb:"ราคา"},

  priceLevel:{stType:"arrayObject",stChildren:{
    price:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ราคาย่อย"},
    remark:{stType:"string", validate:valBasic, pattern:patternString, lb:"หมายเหต"},
    }
  },
  active:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true, lb:"active"},

  remark:{stType:"string", validate:valBasic,  pattern:patternString, lb:"หมายเหตุ"},
  isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean, lb:"เป็นวัตถุดิบ"},
  hasDetailProduct:{stType:"boolean", validate:valBasic,  pattern:patternBoolean, lb:"",stDefault:false},

  detail:{stType:"arrayObject",stChildren:{
    _id:{stType:"string", validate:valBasic, pattern:patternString,lb:"_id"},
    selectedLine:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:false, lb:""},
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสสินค้า"},
    barcode:{stType:"string", validate:valBasic, pattern:patternString, lb:"บาร์โค้ด"},
    
    productName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสินค้า"},
    groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสกลุ่มสินค้า"},
    groupName:{stType:"string", validate:valBasic, pattern:patternString, lb:"กลุ่มสินค้า"},
    unit:{stType:"string", validate:valBasic, pattern:patternString, lb:"หน่วย"},
    price:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ราคา"},

    quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน"},
    result:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รวม"},
    remark:{stType:"string",  validate:valBasic,  pattern:patternString, lb:"หมายเหตุ"},
    isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean, lb:"เป็นวัตถุดิบ",stDefault:false},
    hasDetailProduct:{stType:"boolean", validate:valBasic,  pattern:patternBoolean, lb:"",stDefault:false},

  }},//////////////////

  stock:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"สต็อก"},
  order:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จอง"},
  plan:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"แผน"},

  point:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"แต้ม"},

  file1:{stType:"file",validate:valNone,pattern:null, lb:"ไฟล์1"},
  photoUrl1:{stType:"array",  validate:valArray,    pattern:patternFileName, lb:"รูป1"},
}


/*
const basicDataState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
  title:{stType:"array", validate:valArray, pattern:patternString, lb:"คำนำหน้า"},
  unit:{stType:"array", validate:valArray, pattern:patternString, lb:"หน่วย"},
  userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
  branch:{stType:"array", validate:valArray, pattern:patternString, lb:"สาขา"},
  transactionGroupType:{stType:"array", validate:valArray, pattern:patternString, lb:"ประเภทธุรกรรม"},
  transactionStatus:{stType:"array", validate:valArray, pattern:patternString, lb:"สถานะ"},
  active:{stType:"array", validate:valArray, pattern:patternString, lb:"แอคทีฟ"},

  partnerType:{stType:"array", validate:valArray, pattern:patternString, lb:"ประเภทคู่ค้า"},

  transactionType:{stType:"arrayObject",stChildren:{
    groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสกลุ่ม"},
    groupName:{stType:"string",  validate:valBasic,  pattern:patternNumber, lb:"ชื่อกลุ่ม"},
    transactionGroupType:{stType:"string", validate:valBasic, pattern:patternString, lb:"ประเภทธุรกรรม"},
    transactionCode:{stType:"string", validate:valBasic, pattern:patternString, lb:"รหัสเอกสาร"},

    effectStock:{stType:"string", validate:valBasic, pattern:patternString, lb:"กระทบสต็อก"},
    effectOrder:{stType:"string", validate:valBasic, pattern:patternString, lb:"กระทบจอง"},
    effectPlan:{stType:"string", validate:valBasic, pattern:patternString, lb:"กระทบแผน"},
  }},
  effectStock:{stType:"array", validate:valArray, pattern:patternString, lb:"กระทบสต็อก"},
  effectOrder:{stType:"array", validate:valArray, pattern:patternString, lb:"กระทบจอง"},
  effectPlan:{stType:"array", validate:valArray, pattern:patternString, lb:"กระทบแผน"},

  tax:{stType:"arrayObject",stChildren:{
    taxName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ประเภทภาษี"},
    taxRate:{stType:"number", validate:valBasic, pattern:patternNumber, lb:"อัตรา"},
    taxActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true, lb:"แอคทีฟ"},
  }},

  routeAuth:{stType:"arrayObject",stChildren:{
      id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
      routeAddress:{stType:"string", validate:valBasic, pattern:patternString, lb:"url"},
      routeName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสิทธิ์"},
      userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
  }}

}

const routeAuthState={
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัส"},
    routeAddress:{stType:"string", validate:valBasic, pattern:patternString, lb:"url"},
    routeName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสิทธิ์"},
    userLevel:{stType:"array", validate:valArray, pattern:patternString, lb:"กลุ่มผู้มีสิทธิ์"},
}
*/
const transactionState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสเอกสาร"},
  newId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสเอกสารใหม่"},

  date:{stType:"date",  validate:valBasic,  pattern:patternDate, lb:"วันที่"},
  remindDate:{stType:"date",  validate:valBasic,  pattern:patternDate, lb:"วันที่แจ้งเตือน"},

  branch:{stType:"string", validate:valBasic,  pattern:patternString, lb:"สาขา"},

  transactionType:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ประเภทเอกสาร"},
  transactionStatus:{stType:"string", validate:valBasic,  pattern:patternString, lb:"สถานะเอกสาร"},
  active:{stType:"string", validate:valBasic,  pattern:patternString, lb:"แอคทีฟ"},

  table:{stType:"string", validate:valBasic,  pattern:patternString, lb:"โต๊ะ"},
  tableStatus:{stType:"string", validate:valBasic,  pattern:patternString, lb:"สถานะโต๊ะ"},

  paymentType:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ประเภทการชำระเงิน"},

  effectStock:{stType:"string", validate:valBasic,  pattern:patternString, lb:"กระทบสต็อก"},
  effectSpending:{stType:"string", validate:valBasic,  pattern:patternString, lb:"กระทบจอง"},
  effectCustomerPoint:{stType:"string", validate:valBasic,  pattern:patternString, lb:"กระทบแผน"},

  partnerId: {stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสคู่ค้า"},
  partnerType:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ประเภทคู่ค้า"},

  title:{stType:"string", validate:valBasic,  pattern:patternString, lb:"คำนำหน้า"},
  name:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
  phone:{stType:"array",  validate:valArray,  pattern:patternNumber, lb:"โทรศัพท์"},
  //arrayNumber
  address:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ที่อยู่"},
  remark:{stType:"string",  validate:valBasic,     pattern:patternString, lb:"หมายเหตุ"},

  total:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รวม"},
  totalReduction:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รวมส่วนลด"},
  totalTax:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รวมภาษี"},

  grandTotal:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"สุทฺธิ"},

  totalPoint:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"แต้ม"},
  
  customerPointReduction:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"หักแต้มสะสม"},

  detail:{stType:"arrayObject",stChildren:{
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสสินค้า"},
    barcode:{stType:"string", validate:valBasic, pattern:patternString, lb:"บาร์โค้ด"},
    productName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสินค้า"},
    groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสกลุ่มสินค้า"},
    groupName:{stType:"string", validate:valBasic, pattern:patternString, lb:"กลุ่มสินค้า"},
    
    unit:{stType:"string", validate:valBasic, pattern:patternString, lb:"หน่วย"},
    price:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ราคา"},
    
    priceLevel:{stType:"arrayObject",stChildren:{
      price:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ราคา"},
      remark:{stType:"string", validate:valBasic, pattern:patternString, lb:"หมายเหตุ"}
    }},
    
    quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน"},
    result:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รวม"},
    remark:{stType:"string",  validate:valBasic,  pattern:patternString, lb:"หมายเหตุ"},
    isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true, lb:"เป็นวัตถุดิบ"},
    jobStatus:{stType:"string",  validate:valBasic,  pattern:patternString, lb:"สถานะงาน"},

    point:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"แต้ม"},

  }},

}

/*

  //arrayNumber
  address:{stType:"object",stChildren:{
    number:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ที่อยู่"},
    tambon:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ตำบล"},
    district:{stType:"string", validate:valBasic,  pattern:patternString, lb:"อำเภอ"},
    province:{stType:"string", validate:valBasic,  pattern:patternString, lb:"จังหวัด"},
    postcode:{stType:"string", validate:valBasic,  pattern:patternString, lb:"รหัสไปรษณีย์"},
  }},////////

  remark:{stType:"string",  validate:valBasic,     pattern:patternString, lb:"หมายเหตุ"},
 
  total:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รวม"},
  reduction:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ส่วนลด"},
  grandTotal:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"สุทธิ"},

  tax:{stType:"arrayObject",stChildren:{
    taxName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ประเภทภาษี"},
    taxActive:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true, lb:"ใช้งานภาษี"},
    taxRate:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"อัตราภาษี"},
  }},

  detail:{stType:"arrayObject",stChildren:{
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสสินค้า"},
    barcode:{stType:"string", validate:valBasic, pattern:patternString, lb:"บาร์โค้ด"},
    productName:{stType:"string", validate:valBasic, pattern:patternString, lb:"ชื่อสินค้า"},
    groupId:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสกลุ่มสินค้า"},
    groupName:{stType:"string", validate:valBasic, pattern:patternString, lb:"กลุ่มสินค้า"},
    unit:{stType:"string", validate:valBasic, pattern:patternString, lb:"หน่วย"},
    price:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ราคา"},
    
    priceLevel:{stType:"arrayObject",stChildren:{
      price:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ราคา"},
      remark:{stType:"string", validate:valBasic, pattern:patternString, lb:"หมายเหตุ"}
    }},
    
    quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน"},
    result:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รวม"},
    remark:{stType:"string",  validate:valBasic,  pattern:patternString, lb:"หมายเหตุ"},
    isRawMat:{stType:"boolean", validate:valBasic,  pattern:patternBoolean,  stDefault:true, lb:"เป็นวัตถุดิบ"},
   
    partnerId: {stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"รหัสคู่ค้า"},
    name:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ชือ"},
    photoUrl1:{stType:"array",  validate:valArray,    pattern:patternFileName, lb:"รูป1"}
  }},
}

const transactionLogState={
  ...transactionState,
  status:{stType:"string", validate:valBasic,  pattern:patternString, lb:""},
}

const billDetailState={
  id:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"ID"},
  name:{stType:"string", validate:valBasic,  pattern:patternString, lb:"ชื่อ"},
  quantity:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน"},
  quantity2:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน2"},
  quantity3:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน3"},
  quantity4:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน4"},
  quantity5:{stType:"number",  validate:valBasic,  pattern:patternNumber, lb:"จำนวน5"},
}
*/


const StateTemplate={
  //shopSignUpState,shopLogInState,shopChangePasswordState,
  //addUserState,logInState,changePasswordState,
  partnerState,
  groupState,
  productState,
  //basicDataState,
  shopInfoState,
  shopPaymentState,
  //routeAuthState,
  transactionState,
  //transactionLogState,
  //billDetailState
}

export default StateTemplate
