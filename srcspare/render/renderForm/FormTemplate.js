import React from 'react';
import MainContext from '../../context/MainContext'

function test() {
    //const {basicData,setBasicData}=React.useContext(MainContext)

}

const shopChangePasswordForm={
    shopName:
        {   lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"password", 
            placeholder:'',   
        },
    newPassword1:
        {   lb:'รหัสร้านใหม่', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"password", 
            placeholder:'',   
        },
    newPassword2:
        {   lb:'ยืนยันรหัสร้านใหม่', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"password", 
            placeholder:'',   
        },
}

const addUserForm={
    id:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:''
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"password", 
        placeholder:'',   
    },
    userLevel:{
        lb:'ระดับผู้ใช้', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"select", 
        placeholder:'', 
        //selectObj:["นาย","นาง"]
        selectDataKey:"basicData",
        selectObj:'userLevel'
    },
    name:{
        lb:'ชื่อจริง', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
    },
    surname:{
        lb:'นามสกุล', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
    },
    branch:{
        lb:'สาขา', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'branch'
    }
}





/*
const testForm={
    id:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    date:{
        lb:'วันที่', 
        templateType:"string" , 
        cName:"pl-4 xc3 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"thaiDate", 
        placeholder:'', 
    },
    title:{
        lb:'คำนำหน้า', 
        templateType:"string" , 
        cName:"pl-4 xc3 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'title'
    },
    name:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"pl-4 xc3 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
    },
    password:
    {   lb:'รหัสร้าน', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"password", 
        placeholder:'',   
    },
    icon:{
        lb:"กลุ่มคู่ค้า",
        templateType:"icon",
        cName:"pl-4 xc4 sc12 pt-1",  
        subCName:["xc6","xc6"], 
        inputType:"searchIcon",
        iconActionIdx:0,
    },
    groupId:{
        lb:'รหัสกลุ่ม', 
        templateType:"string" , 
        cName:"pl-4 xc4 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
    },
    groupName:{
        lb:'ประเภทกลุ่ม', 
        templateType:"string" , 
        cName:"pl-4 xc3 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
        unchangeable:true
    },
    isRawMat:{
        lb:'เป็นวัตถุดิบ', 
        templateType:"string" , 
        cName:"pl-4 xc3 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"checkbox", 
        placeholder:'', 
    },
    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc2 alignSelfStart","xc10"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:3
    },
    phone:{
        lb:'โทรศัพท์', 
        templateType:"array" , 
        cName:"pl-4 xc3 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
    },
    address:{
        lb:'ที่อยู่รอง',    
        templateType:"arrayObject", 
        //cName:["xc12 pt-1 bd-lightGrayxx","form-row flex-justify-start flex-align-stretch"], 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc12","xc12"], 

        placeholder:'',
        subFormTemplate:{
            number:{
                lb:'เลขที่', 
                templateType:"string" , 
                cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
                subCName:["xc4","xc8"], 
                inputType:"text", 
                placeholder:'', 
            },
            tambon:{
                lb:'ตำบล', 
                templateType:"string" , 
                cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
                subCName:["xc4","xc8"], 
                inputType:"text", 
                placeholder:'', 
            }
          
        }
      
    }, 
    mainaddress:{
        lb:'ที่อยู่หลัก',    
        templateType:"object", 
        //cName:["xc12 pt-1 bd-lightGrayxx","form-row flex-justify-start flex-align-stretch"], 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc12","xc12"], 

        placeholder:'',
        subFormTemplate:{
            number:{
                lb:'เลขที่', 
                templateType:"string" , 
                cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
                subCName:["xc4","xc8"], 
                inputType:"text", 
                placeholder:'', 
            },
            tambon:{
                lb:'ตำบล', 
                templateType:"string" , 
                cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
                subCName:["xc4","xc8"], 
                inputType:"text", 
                placeholder:'', 
            }
        }
      
    }, 
    detail:{
        lb: "รายละเอียด",
        templateType:"arrayObjectInTable",
        cName:"pl-4 ",
        subFormTemplate:{
          
          icon:{
            templateType:"icon",
            subCName:[60],
            inputType:"icon",
            iconActionIdx:1,
          },
          
          id:{
            lb:"ไอดี",
            templateType:"number",
            subCName:[60,""],
            inputType:"number",
            placeholder:"",
            aotuFocus:"autoFocus"
          },
          barcode:{
            lb:"บาร์โค้ด",
            templateType:"string",
            subCName:[100,""],
            inputType:"text",
            placeholder:"", 
            nextEnter:{nextKey1:["detail",0,"quantity"],lastKey:null}
          },
          name:{
            lb:"ชื่อ",
            templateType:"string",
            subCName:[240,""],
            inputType:"text",
            placeholder:"", 
          },

          groupId:{
            lb:"ไอดีกลุ่ม",
            templateType:"number",
            subCName:[60,""],
            inputType:"number",
            placeholder:"",
            aotuFocus:"autoFocus"
          },
          groupName:{
            lb:"ชื่อกลุ่ม",
            templateType:"string",
            subCName:[90,""],
            inputType:"text",
            placeholder:"", 
          },
          quantity:{
            lb:"จำนวน",
            templateType:"string",
            subCName:[60,""],
            inputType:"number",
            placeholder:"", 
            nextEnter:{nextKey1:["detail",1,"barcode"],lastKey:"endForm"}
          },

          unit:{
            lb:"หน่วย",
            templateType:"string",
            subCName:[80,""],
            inputType:"select",
            placeholder:"", 
            //selectObj:["นาย","นาง"]
            selectDataKey:"basicData",
            selectObj:'unit'
          },
          price:{
            lb:"ราคา",
            templateType:"string",
            subCName:[100,""],
            inputType:"number",
            placeholder:"", 
          },
          result:{
            lb:"รวม",
            templateType:"string",
            subCName:[100,""],
            inputType:"number",
            placeholder:"", 
          },
          remark:{
            lb:"หมายเหตุ",
            templateType:"string",
            subCName:[200,""],
            inputType:"text",
            placeholder:"", 
          },
          isRawMat:{
            lb:"เป็นวัตถุดิบ",
            templateType:"boolean",
            subCName:[40,""],
            inputType:"checkbox",
            placeholder:"", 
          }
        }
      }
}

const shopSignUpForm={
    shopName:
        {  lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"password", 
            placeholder:'',   
        },
    ownerName:
        {   lb:'ชื่อผู้ใช้', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"text", 
            placeholder:'', 
        },
    ownerPassword:
        {   lb:'รหัสผู้ใช้', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"password", 
            placeholder:'',   
        },
    ownerEmail: {  
            lb:'อีเมลผู้ใช้', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"text", 
            placeholder:'',   
        },     
}

//====================

const shopLogInForm={
    shopName:
        {  lb:'ชื่อร้าน', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"text", 
            placeholder:'', 
            autoFocus:"autoFocus"
        },
    password:
        {   lb:'รหัสร้าน', 
            templateType:"string" , 
            cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
            subCName:["xc4","xc8"], 
            inputType:"password", 
            placeholder:'',   
        },

}

//=======================


const logInForm={
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'',
        autoFocus:"autoFocus"
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"password", 
        placeholder:'',   
    }    
}

const changePasswordForm={
    username:{
        lb:'ยูสเซอร์เนม', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    password:{
        lb:'รหัส', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"password", 
        placeholder:'',   
    },
    newPassword1:{   
        lb:'รหัสใหม่', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"password", 
        placeholder:'',   
    },
    newPassword2:{   
        lb:'ยืนยันรหัสใหม่', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"password", 
        placeholder:'',   
    },
}

*/


const partnerForm={
    id:{
        lb:'ไอดี', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"genId", 
        placeholder:'', 
        autoFocus:"autoFocus",
        //calculation:{method:"autoId"},
    },
    partnerType:{
        lb:'ประเภทคู่ค้า', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'partnerType'
    },

    title:{
        lb:'คำนำหน้า', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'title'
    },
    name:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
    },
    remainingCustomerPoint:{
        lb:'แต้มสะสม', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //calculation:{method:"autoId"},
    },
    totalSpending:{
        lb:'ยอดใช้จ่าย', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //calculation:{method:"autoId"},
    },
    active:{
        lb:'แอคทีฟ', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"checkbox", 
        placeholder:'', 
    },

    phone:{
        lb:'โทรศัพท์', 
        templateType:"array" , 
        cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc2","xc10"], 
        inputType:"text", 
        placeholder:'', 
    },
    //=====================

    //==============================  
    address:{
        lb:'ที่อยู่',    
        templateType:"array", 
        cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc2","xc10"], 
        inputType:"text", 
        placeholder:'',       
    }, 
    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc2 alignSelfStart","xc10"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:3
    },

}



const partnerEditForm={
    id:{...partnerForm.id,inputType:"number",cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx"},
    newId:{
        lb:'ไอดีใหม่', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"genId", 
        placeholder:'', 
    },
    partnerType:{...partnerForm.partnerType,cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx"},
    remainingCustomerPoint:{...partnerForm.remainingCustomerPoint,cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",subCName:["xc4","xc8"]},
    totalSpending:{...partnerForm.totalSpending,cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",subCName:["xc4","xc8"]},

    active:{...partnerForm.active,cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",subCName:["xc4","xc8"]},

    title:{...partnerForm.title,cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx"},
    name:{...partnerForm.name,cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",subCName:["xc4","xc8"]},
    
    phone:{...partnerForm.phone,cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",subCName:["xc2","xc10"]},

    address:{...partnerForm.name,cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",subCName:["xc2","xc10"]},
    remark:{...partnerForm.remark,cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",subCName:["xc2","xc10"]},
    
}


const groupForm={
    id:{
        lb:'ไอดีกลุ่มสินค้า', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus"
    },
    groupName:{
        lb:'ชื่อกลุ่มสินค้า', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
    },

    parentId:{
        lb:'ไอดีกลุ่มแม่', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },
}
//===============================
const groupEditForm={
    id:{
        lb:'ไอดีกลุ่มสินค้า', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus",
        disabled:"disabled"
    },
    newId:{
        lb:'ไอดีกลุ่มสินค้าใหม่', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
    },

    groupName:{
        lb:'ชื่อกลุ่มสินค้า', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
    },

    parentId:{
        lb:'ไอดีกลุ่มแม่', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        disabled:"disabled"
    },
    newParentId:{
        lb:'ไอดีกลุ่มแม่ใหม่', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
    },
}
//================================
//======================================
const productForm={
    
    id:{
        lb:'ไอดี', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"genId", 
        placeholder:'', 
        autoFocus:"autoFocus",
        //calculation:{method:"autoId"},
    },
    barcode:{
        lb:'บาร์โค้ด', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"genId", 
        placeholder:'', 
    },
    productName:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
    },
    active:{
        lb:'แอคทีฟ', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"checkbox", 
        placeholder:'', 
    },
    isRawMat:{
        lb:'เป็นวัตถุดิบ', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"checkbox", 
        placeholder:'', 
        //disabled:"disabled"
    },
    //==================
    point:{
        lb:'แต้ม', 
        templateType:"number" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },

    //==========================
    price:{
        lb:'ราคา', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
    },
    unit:{
        lb:'หน่วย', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'unit'
    },
    
    stock:{
        lb:'ยอดสต็อค', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },
    /*
    order:{
        lb:'ยอดจอง', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },

    plan:{
        lb:'ยอดแผน', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },
    */
    //========================
    priceLevel:{
        lb:'ระดับราคา',    
        templateType:"arrayObject", 
        //cName:["xc12 pt-1 bd-lightGrayxx","form-row flex-justify-start flex-align-stretch"], 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc12","xc12"], 

        placeholder:'',
        subFormTemplate:{
            price:{
                lb:'ราคา', 
                templateType:"string" , 
                cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
                subCName:["xc4","xc8"], 
                inputType:"number", 
                placeholder:'', 
            },
            remark:{
                lb:'หมายเหตุ', 
                templateType:"string" , 
                cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
                subCName:["xc4 alignSelfStart","xc8"], 
                inputType:"text", 
                placeholder:'',            
            }, 
        }
    },

    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"pl-4 xc12 lc12 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc2 alignSelfStart","xc10"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:5,
        lastRef:true
    }, 
    //======================
    icon:{
        lb:"กลุ่มสินค้าที่เลือกไว้",
        templateType:"icon-group",
        cName:"pl-4 xc6 lc6 sc12  pt-1",  
        subCName:["xc1 flex-center-center jc-start","xc11"], 
        inputType:"searchIcon",
        iconActionIdx:0,
    },
    /*
    groupId:{
        lb:'ไอดีกลุ่ม', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //unchangeable:true
        //disabled:"disabled"
    },
    */
    groupName:{
        lb:'ชื่อกลุ่ม', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
        //unchangeable:true
        disabled:"disabled"
    },


    //======================

    detail:{
        lb: "รายละเอียด",
        templateType:"arrayObjectInTable",
        cName:"pl-4 xc12 lc12 sc12",
        subFormTemplate:{
          _id:{
            templateType:"string",
          },
          selectedLine:{
            templateType:"boolean",
          },
          id:{
            lb:"ไอดี",
            templateType:"number",
          },
          barcode:{
            lb:"บาร์โค้ด",
            templateType:"string",
          },
          productName:{
            lb:"ชื่อ",
            templateType:"string",
          },

          groupId:{
            lb:"ไอดีกลุ่ม",
            templateType:"number",
          },
          groupName:{
            lb:"ชื่อกลุ่ม",
            templateType:"string",
          },
          quantity:{
            lb:"จำนวน",
            templateType:"string",
          },

          unit:{
            lb:"หน่วย",
            templateType:"string",
          },
          price:{
            lb:"ราคา",
            templateType:"string",
          },
          result:{
            lb:"รวม",
            templateType:"string",
          },
          remark:{
            lb:"หมายเหตุ",
            templateType:"string",
          },
          isRawMat:{
            lb:"เป็นวัตถุดิบ",
            templateType:"boolean",
          }
        }
      }
}
//====================================
const {id,...remaining}=productForm

const productEditForm = {
    id:{...productForm.id,inputType:"number"},
    newId:{
        lb:'ไอดีใหม่', 
        templateType:"string" , 
        cName:"pl-4 xc6 lc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"genId", 
        placeholder:'', 
    },
    barcode:productForm.barcode,
    productName:productForm.productName,
    active:productForm.active,
    isRawMat:productForm.isRawMat,
    point:productForm.point,
    price:productForm.price,
    unit:productForm.unit,
    stock:productForm.stock,
    //order:productForm.order,
    //plan:productForm.plan,
    priceLevel:productForm.priceLevel,
    remark:productForm.remark,

    icon:productForm.icon,
    //groupId:productForm.groupId,
    groupName:productForm.groupName,
    detail:productForm.detail,
} 
//id,barcode,productName,isRawMat,
//icon,groupId,groupName,
//price,unit,stock,order,plan,
//priceLevel,remark,detail
//====================================

//====================================

const productDetailForm={
    
    icon:{
        lb:"ค้นหาสินค้า",
        templateType:"icon",
        cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc2","xc10"], 
        inputType:"searchIcon",
        iconActionIdx:0,
        
    },
    id:{
        lb:'ไอดี', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        autoFocus:"autoFocus",
        //disabled:"disabled"
    },
    barcode:{
        lb:'บาร์โค้ด', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
        //disabled:"disabled"
    },
    name:{
        lb:'ชื่อ', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
        //disabled:"disabled"
    },
    groupId:{
        lb:'ไอดีกลุ่ม', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },
    groupName:{
        lb:'ชื่อกลุ่ม', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"text", 
        placeholder:'', 
        //disabled:"disabled"
    },
    unit:{
        lb:'หน่วย', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"select", 
        placeholder:'', 
        selectDataKey:"basicData",
        selectObj:'unit',
        //disabled:"disabled"
    },
    isRawMat:{
        lb:'เป็นวัตถุดิบ', 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"checkbox", 
        placeholder:'', 
        //disabled:"disabled"
    },
    quantity:{
        lb:"จำนวน", 
        templateType:"string" , 
        cName:"pl-4 xc6 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc4","xc8"], 
        inputType:"number", 
        placeholder:'', 
        //disabled:"disabled"
    },
    remark:{
        lb:'หมายเหตุ', 
        templateType:"string" , 
        cName:"pl-4 xc12 sc12 pt-1 bd-lightGrayxx",  
        subCName:["xc2 alignSelfStart","xc10"], 
        inputType:"textarea", 
        placeholder:'', 
        textRow:3
    }
}

const FormTemplate={
    shopChangePasswordForm,addUserForm,
    partnerForm,partnerEditForm,
    groupForm,groupEditForm,
    productForm,productEditForm,productDetailForm,

}

export default FormTemplate
//disabled:"disabled",
