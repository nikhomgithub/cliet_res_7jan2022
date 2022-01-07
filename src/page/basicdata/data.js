
const pageData={
    shopInfo :{
        sectionTitle:"รายละเอียดร้าน (หัวบิล)",
        name:"ชื่อร้าน",
        address:"ที่อยู่",
        contact:"ติดต่อ",
        branch:"สาขา",
        other:"อื่นๆ",
        logo:"โลโก้"
    },
    setting:{
        sectionTitle:"ตั้งค่าระบบ",
        name:"สำรองข้อมูลเมื่อเปิดโปรแกรม",
        password:"เปลี่ยนรหัสผ่านร้าน",
        user:"เพิ่มผู้ใช้",
        routeAuth:"กำหนดสิทธิ์ผู้ใช้",
        language:"เลือกภาษา ตั้งค่าภาษา"   
    },
    
    basicValue:{
        sectionTitle:"ตั้งค่าอื่นๆ",
        branch:"สาขา",
        customerType:"ประเภทลูกค้า",
        
        unit:"หน่วย",
        title:"คำนำหน้า",
        billType:"ประเภทบิล",

        table:"โต๊ะ",
        tableStatus:"สถานะโต๊ะ",
        jobStatus:"สถานะงาน",
        billStatus:"สถานะบิล",
        
        tax:"อัตราภาษี",
        reduction:"ส่วนลด",
        userLevel:"ระดับผู้ใช้",
        
        paymentType:"ประเภทการชำระเงิน",
    },
    shopChangePassword:
    {
        sectionTitle:"เปลี่ยนรหัสร้าน",
        shopName:"ชื่อร้าน",
        password:"รหัสร้าน",
        newPassword1:"รหัสร้านใหม่" ,
        newPassword2:"ยืนยันรหัสร้านใหม่"
    },
    addUser:
    {
        sectionTitle:"เพิ่มผู้ใช้",
        id:"ไอดี",
        username:"ยูสเซอร์เนม",
        password:"รหัสร้าน",
        userLevel:"ระดับผู้ใช้",
        name:"ชื่อ" ,
        surname:"นามสกุล"
    },

}

const pageDataStandard={
    shopInfo :{
        sectionTitle:"shopDetail (Bill Header)",
        name:"shop name",
        address:"address",
        contact:"contact",
        branch:"branch",
        other:"other",
        logo:"logo"
    },
    setting:{
        sectionTitle:"Setting",
        name:"auto backup when start",
        password:"change shop password",
        user:"add user",
        routeAuth:"access control",
        language:"language setting"   
    },
    
    basicValue:{
        sectionTitle:"basic data setting",
        branch:"branch",
        customerType:"customer type",
        
        unit:"unit",
        title:"title",
        billType:"bill type",

        table:"table",
        tableStatus:"table status",
        jobStatus:"job status",
        billStatus:"bill status",
        
        tax:"tax",
        reduction:"reduction",
        userLevel:"user level",
        
        paymentType:"payment type",
    },
    shopChangePassword:
    {
        sectionTitle:"change shop password",
        shopName:"shop name",
        password:"password",
        newPassword1:"new password" ,
        newPassword2:"confirm new password"
    },
    addUser:
    {
        sectionTitle:"add user",
        id:"id",
        username:"username",
        password:"password",
        userLevel:"user level",
        name:"name" ,
        surname:"surname"
    },

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
    userLevel:["admin","staff","visitor"],
    routeAuth:[ 
        {_id:1,id:1,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},
        {_id:4,id:4,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
        {_id:5,id:5,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},
        {_id:11,id:11,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},
        {_id:14,id:14,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
        {_id:15,id:15,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},
        {_id:21,id:21,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},
        {_id:24,id:24,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
        {_id:25,id:25,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},
        {_id:31,id:31,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},
        {_id:34,id:34,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
        {_id:35,id:35,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},
        {_id:41,id:41,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},
        {_id:44,id:44,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
        {_id:45,id:45,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},
        {_id:51,id:51,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},
        {_id:54,id:54,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
        {_id:55,id:55,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},
        {_id:61,id:61,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},
        {_id:64,id:64,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},

    ]
}


const basicDataTableTemplate={
    id            :
    { lb:'ไอดี',     type:"number",
      width:50,   showCol:true,  showColHead:true,    
    },
    
    routeAddress            :
    { lb:'url',     type:"string",
      width:200,   showCol:true,  showColHead:true,    
    },
    routeName           :
    { lb:'ชื่อสิทธิ์',type:"string",
      width:100,   showCol:true,  showColHead:true,    
    },
    userLevel           :
    { lb:'กลุ่มผู้มีสิทธิ์',type:"array",
      width:350,   showCol:true,  showColHead:true,    
    }
}


const data={pageData,basicData,basicDataTableTemplate,pageDataStandard}

export default data
