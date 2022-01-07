const FormTemplate=[
   
    //===========================
    {   formName:"shopInfo",
        formHead:"Shop Infomation",
        /* formLanguage:"English",
        id: "English-shopInfo",
        shopId:"shopa", */
        template:[
        {key:"logoActive",lb:"Logo"},
        ]
    },
    //=========================
    {   formName:"setting",
        formHead:"System Setting",
        /* formLanguage:"English",
        id: "English-setting",
        shopId:"shopa", */
        template:[
            {key:"changePassword",lb:"Change Shop Password"},
            {key:"addNewUser",lb:"Add User"},
            {key:"routeAuth",lb:"User Level"},
            {key:"language",lb:"Language Setting"},
            {key:"printPage",lb:"Print Page"},
            {key:"widthLeft",lb:"Width Left"}
        ]
    },
    //=======================
    {formName:"basicValue",
    formHead:"Basic Setting",
    /* formLanguage:"English",
    id: "English-basicValue",
    shopId:"shopa", */
    template:[
        {key:"language",lb:"Language"},
        {key:"branch",lb:"Branch"},
        {key:"partnerType",lb:"Customer Type"},
        {key:"unit",lb:"Unit"},
        {key:"title",lb:"Title"},
        {key:"transaction",lb:"Bill"},
        {key:"transactionStatus",lb:"Bill Status"},
        {key:"table",lb:"Table"},
        {key:"tableStatus",lb:"Table Status"},
        {key:"queueStatus",lb:"Queue Status"},
        {key:"jobStatus",lb:"Job Status"},
        {key:"tax",lb:"Tax"},
        {key:"reduction",lb:"Reduction"},
        {key:"userLevel",lb:"User Level"},
        {key:"paymentType",lb:"Payment Type"},
    ]
    },
        //=============================
    {   formName:"shopChangePassword",
        formHead:"เปลี่ยนรหัสร้าน",
        /* formLanguage:"English",
        id: "English-shopChangePassword",
        shopId:"shopa", */
        template:[
            {key:"shopName",lb:"Shop Name"},
            {key:"password",lb:"Password"},
            {key:"newPassword1",lb:"New Password"},
            {key:"newPassword2",lb:"Confirm New Password"},
        ]
    },

    {   
        formName:"user",
        formHead:"user",
        /* formLanguage:"English",
        id: "English-addUser",
        shopId:"shopa", */
        template:[
        ]
    },

    {   
        formName:"addUser",
        formHead:"Add User",
        /* formLanguage:"English",
        id: "English-addUser",
        shopId:"shopa", */
        template:[
            {key:"id",lb:"ID"},
            {key:"username",lb:"Username"},
            {key:"password",lb:"password"},
            {key:"userLevel",lb:"User Level"},
            {key:"name",lb:"Name"},
            {key:"surname",lb:"Surname"},
            {key:"branch",lb:"Branch"},
            //{key:"branchId",lb:"Branch ID"},
            //{key:"branchName",lb:"Branch Name"},
        ]
    },
 
    {   
        formName:"editUser",
        formHead:"Edit User",
        /* formLanguage:"English",
        id: "English-addUser",
        shopId:"shopa", */
        template:[
            {key:"id",lb:"ID"},
            {key:"username",lb:"Username"},
            {key:"userLevel",lb:"User Level"},
            {key:"name",lb:"Name"},
            {key:"surname",lb:"Surname"},
            {key:"branch",lb:"Branch"},
            //{key:"branchId",lb:"Branch ID"},
            //{key:"branchName",lb:"Branch Name"},
        ]
    },
 
    {   
        formName:"changeUserPassword",
        formHead:"Change User Password",
        /* formLanguage:"English",
        id: "English-addUser",
        shopId:"shopa", */
        template:[
            {key:"id",lb:"ID"},
            {key:"newPassword1",lb:"New Password"},
        ]
    },
 
    {   
        formName:"widthLeftForm",
        formHead:"Set Width",
        /* formLanguage:"English",
        id: "English-addUser",
        shopId:"shopa", */
        template:[
            {key:"widthLeft",lb:"Width"},
        ]
    },
//=======================
    {   
        formName:"basicDataTableTemplate",
        formHead:"Route Auth Table",
        /* formLanguage:"English",
        id: "English-basicDataTableTemplate",
        shopId:"shopa", */
        template:[
            {key:"id",lb:"ID"},
            {key:"routeAddress",lb:"url"},
            {key:"routeName",lb:"Route Name"},
            {key:"userLevel",lb:"User Level"}
        ]
    },
    //================================
    {   
        formName:"partnerTableTemplate",
        formHead:"Partner Table",
        /* formLanguage:"English",
        id: "English-partnerTableTemplate",
        shopId:"shopa", */
        template:[
            {key:"selectedLine",lb:"_"},
            {key:"id",lb:"ID"},
            {key:"title",lb:"title"},
            {key:"name",lb:"name"},
            {key:"phone",lb:"phone"},
            {key:"partnerType",lb:"type"},
            {key:"address",lb:"address"},
            {key:"remark",lb:"remark"},
        ]
    },
    //============================
    {   
        formName:"productTableTemplate",
        formHead:"Product Table",
        /* formLanguage:"English",
        id: "English-productTableTemplate",
        shopId:"shopa", */
        template:[
            {key:"selectedLine",lb:"_"},
            {key:"id",lb:"ID"},
            {key:"barcode",lb:"barcode"},
            {key:"productName",lb:"Product Name"},
            {key:"groupId",lb:"Group Id"},
            {key:"groupName",lb:"Group Name"},
            {key:"unit",lb:"Unit"},
            {key:"price",lb:"Price"},
            {key:"isRawMat",lb:"isRawMat"},
            {key:"stock",lb:"Stock"},
            //{key:"order",lb:"Order"},
            //{key:"plan",lb:"Plan"},
            {key:"remark",lb:"Remark"},
        ]
    },
    //============================
    {   
        formName:"transactionTableTemplate",
        formHead:"Bill Table",
        /* formLanguage:"English",
        id: "English-transactionTableTemplate",
        shopId:"shopa", */
        template:[
            {key:"selectedLine",lb:"_"},
            {key:"id",lb:"ID"},
            {key:"date",lb:"Date"},
            {key:"remindDate",lb:"Remind Date"},
            //{key:"branchId",lb:"Branch ID"},
            //{key:"branchName",lb:"Branch Name"},
            {key:"transactionType",lb:"Bill Type"},
            {key:"transactionStatus",lb:"Bill Status"},
            {key:"active",lb:"Active"},
            {key:"table",lb:"Table"},
            {key:"tableStatus",lb:"Table Status"},
            {key:"effectStock",lb:"Effect Stock"},
            {key:"effectCustomerPoint",lb:"Effect Customer Point"},
            {key:"effectSpending",lb:"Effect Spending"},
            {key:"partnerId",lb:"Customer ID"},
            {key:"partnerType",lb:"Customer Type"},
            {key:"title",lb:"Title"},
            {key:"name",lb:"Name"},
            {key:"phone",lb:"Phone"},
            {key:"address",lb:"Address"},
            {key:"paymentType",lb:"Payment Type"},
            {key:"total",lb:"Total"},
            {key:"reduction",lb:"Reduction"},
            {key:"tax",lb:"Tax"},
            {key:"grandTotal",lb:"Grand Total"},
            {key:"remark",lb:"Remark"},
        ]
    },
    //=========================
    {   
        formName:"ProductDetailTableTemplate",
        formHead:"Product Detail Table",
        /* formLanguage:"English",
        id: "English-ProductDetailTableTemplate",
        shopId:"shopa", */
        template:[
            {key:"selectedLine",lb:"_"},
            {key:"id",lb:"ID"},
            {key:"barcode",lb:"Barcode"},
            {key:"productName",lb:"Product Name"},
            {key:"groupId",lb:"Group ID"},
            {key:"groupName",lb:"Group Name"},
            {key:"quantity",lb:"Quantity"},
            {key:"unit",lb:"Unit"},
            {key:"price",lb:"Price"},
            {key:"result",lb:"Result"},
            {key:"isRawMat",lb:"isRawMat"},
            {key:"remark",lb:"Remark"},
        ]
    },
    
//===============================
    {   
        formName:"ProductDetailTableTemplateForForm",
        formHead:"Product Detail Table2",
        /* formLanguage:"English",
        id: "English-ProductDetailTableTemplateForForm",
        shopId:"shopa", */
        template:[
            {key:"selectedLine",lb:"_"},
            {key:"id",lb:"ID"},
            {key:"barcode",lb:"Barcode"},
            {key:"productName",lb:"Product Name"},
            {key:"groupId",lb:"Group ID"},
            {key:"groupName",lb:"Group Name"},
            {key:"quantity",lb:"Quantity"},
            {key:"unit",lb:"Unit"},
            {key:"price",lb:"Price"},
            {key:"result",lb:"Result"},
            {key:"isRawMat",lb:"isRawMat"},
            {key:"remark",lb:"Remark"},

            {key:"partnerId",lb:"Partner ID"},
            {key:"name",lb:"Name"},
            {key:"jobStatus",lb:"Job Status"},
        ]
    },
    {
        formName:"partnerFilter",
        formHead:"",
        /* formLanguage:"English",
        id: "English-partnerFilter",
        shopId:"shopa", */
        template:[
            {key:"id",lb:"ID"},
            {key:"title",lb:"Title"},
            {key:"name",lb:"Name"},
            {key:"phone",lb:"Phone"},
            {key:"remainingCustomerPoint",lb:"Remaining Customer Point"},
            {key:"totalSpending",lb:"Total Spending"},
            {key:"remark",lb:"Remark"},
        ]
    },
  //========================================
    {
        formName:"productFilter",
        formHead:"",
        /* formLanguage:"English",
        id: "English-productFilter",
        shopId:"shopa", */
        template:[
            {key:"id",lb:"ID"},
            {key:"barcode",lb:"Barcode"},
            {key:"productName",lb:"Product Name"},
            {key:"groupId",lb:"Group ID"},
            {key:"groupName",lb:"Group Name"},
            {key:"unit",lb:"Unit"},
            {key:"price",lb:"Price"},
            {key:"stock",lb:"Stock"},
            {key:"isRawMat",lb:"IsRawMat"},
            {key:"remark",lb:"Remark"},
        ]
    },

    {
        formName:"rawMatFilter",
        formHead:"",
        /* formLanguage:"English",
        id: "English-productFilter",
        shopId:"shopa", */
        template:[
            {key:"id",lb:"ID"},
            {key:"barcode",lb:"Barcode"},
            {key:"rawMatName",lb:"Raw Mat Name"},
            {key:"rawMatGroupId",lb:"Raw Mat Group ID"},
            {key:"rawMatGroupName",lb:"Raw Mat Group Name"},
            {key:"unit",lb:"Unit"},
            {key:"price",lb:"Price"},
            {key:"remark",lb:"Remark"},
        ]
    },



    {
        formName:"transactionFilter",
        formHead:"",
        /* formLanguage:"English",
        id: "English-transactionFilter",
        shopId:"shopa", */
        template:[
            {key:"id",lb:"ID"},
            {key:"date",lb:"Date"},
            //{key:"branchId",lb:"Branch ID"},
            {key:"transactionType",lb:"Transaction Type"},
            {key:"transactionStatus",lb:"Transaction Status"},
            {key:"partnerId",lb:"Partner ID"},
            {key:"name",lb:"Name"},
            {key:"phone",lb:"Phone"},
        ]
    },
   
    {
        formName:"partnerFilterForm",
        formHead:"Search Customer",
        /* formLanguage:"English",
        id: "English-partnerFilterForm",
        shopId:"shopa", */
        template:[
            {key:"formHead",lb:"Search Customer"},
            {key:"subject",lb:"Subject"},
            {key:"allTrue",lb:"All True"},
            {key:"someTrue",lb:"Some True"},
            {key:"sortBySubject",lb:"Sort By Subject"},
            {key:"recordLimit",lb:"Record Limit"},
            {key:"recordPerPage",lb:"Record Per Page"},
        ]
    },

    {
        formName:"productFilterForm",
        formHead:"Search Product",
        /* formLanguage:"English",
        id: "English-productFilterForm",
        shopId:"shopa", */
        template:[
            {key:"groupHead",lb:"Product Group"},
            {key:"formHead",lb:"Search Product"},
            {key:"subject",lb:"Subject"},
            {key:"allTrue",lb:"All True"},
            {key:"someTrue",lb:"Some True"},
            {key:"sortBySubject",lb:"Sort By Subject"},
            {key:"recordLimit",lb:"Record Limit"},
            {key:"recordPerPage",lb:"Record Per Page"},
        ]
    },
   
    {
        formName:"transactionFilterForm",
        formHead:"Search Bill",
        /* formLanguage:"English",
        id: "English-transactionFilterForm",
        shopId:"shopa", */
        template:[
            {key:"formHead",lb:"Search Bill"},
            {key:"subject",lb:"Subject"},
            {key:"allTrue",lb:"All True"},
            {key:"someTrue",lb:"Some True"},
            {key:"sortBySubject",lb:"Sort By Subject"},
            {key:"recordLimit",lb:"Record Limit"},
            {key:"recordPerPage",lb:"Record Per Page"},
        ]
    },

    {
        formName:"billMenuFilterForm",
        formHead:"Search Bill",
        /* formLanguage:"English",
        id: "English-transactionFilterForm",
        shopId:"shopa", */
        template:[
            {key:"formHead",lb:"Search Bill"},
            {key:"subject",lb:"Subject"},
            {key:"allTrue",lb:"All True"},
            {key:"someTrue",lb:"Some True"},
            {key:"sortBySubject",lb:"Sort By Subject"},
            {key:"recordLimit",lb:"Record Limit"},
            {key:"recordPerPage",lb:"Record Per Page"},
        ]
    },


    {
        formName:"ModalForm",
        formHead:"",
        /* formLanguage:"English",
        id: "English-partnerFilterForm",
        shopId:"shopa", */
        template:[
            {key:"insertUp",lb:"Insert Up"},
            {key:"insertDown",lb:"Insert Down"},
            {key:"selectAll",lb:"Select All"},
            {key:"unSelectAll",lb:"Unselect All"},
            {key:"moveUp",lb:"Move Up"},
            {key:"moveDown",lb:"Move Down"},
            {key:"delete",lb:"Delete"},
            {key:"import",lb:"Import"},
            {key:"selectImage",lb:"Select Image"},
            {key:"productAddForm",lb:"Product Add Form"},
            {key:"productEditForm",lb:"Product Edit Form"},
            {key:"groupAddForm",lb:"Product Group Add Form"},
            {key:"groupEditForm",lb:"Product Group Edit Form"},
            {key:"partnerAddForm",lb:"Partner Add Form"},
            {key:"partnerEditForm",lb:"Partner Edit Form"},

        ]
    },
  
    {
        formName:"customerConfirmForm",
        formHead:"Please Confirm Customer",
        template:[
            {key:"partnerId",lb:"Partner ID"},
            {key:"title",lb:"Title"},
            {key:"name",lb:"Name"},
            {key:"partnerType",lb:"Customer Type"},
            {key:"phone",lb:"Phone"},
            {key:"address",lb:"Address"}
        ]
    },
    {
        formName:"transactionConfirmForm",
        formHead:"Please Confirm Transaction",
        template:[
            {key:"id",lb:"ID"},
            {key:"branch",lb:"Branch"},
            {key:"date",lb:"Date"},  
            {key:"table",lb:"Table"},
            {key:"partnerId",lb:"Customer ID"},
            {key:"phone",lb:"Phone"},
            {key:"address",lb:"Address...."},
            {key:"includeTransactionHead",lb:"Include Transaction Head"}
        ]
    },
    {
        formName:"billForm",
        formHead:"",
        template:[
            {key:"id",lb:"ID"},
            {key:"date",lb:"Date"},  
            {key:"time",lb:"เวลา"},
            {key:"table",lb:"Table"},
            {key:"queue",lb:"Queue"},
            {key:"partnerId",lb:"Customer ID"},
            {key:"phone",lb:"Phone"},
            {key:"address",lb:"Address"},
            {key:"total",lb:"Total"},
            {key:"totalTax",lb:"Total Tax"},
            {key:"totalReduction",lb:"Total Reduction"},
            {key:"grandTotal",lb:"Grand Total"}
        ]
    },
    {
        formName:"editBillForm",
        formHead:"Bill Info",
        template:[
            {key:"id",lb:"ID"},
            
            {key:"date",lb:"Date"},  
            //{key:"branchId",lb:"Branch ID"},
            //{key:"branchName",lb:"Branch Name"}, 
            {key:"transactionType",lb:"Transaction Type"},
            {key:"transactionStatus",lb:"Transaction Status"},
            {key:"active",lb:"Active"},

            {key:"table",lb:"Table"},
            {key:"tableStatus",lb:"Table Status"},
            {key:"queue",lb:"Queue"},
            {key:"queueStatus",lb:"Queue Status"},

            {key:"partnerId",lb:"Customer ID"},
            {key:"title",lb:"Title"},
            {key:"name",lb:"Name"},
            {key:"phone",lb:"Phone"},
            {key:"address",lb:"Address"},
            {key:"partnerType",lb:"Partner Type"},

            {key:"remark",lb:"Remark"},

            {key:"totalPoint",lb:"Total Point"},
            {key:"remainingCustomerPoint",lb:"Remaining Customer Point"},

            {key:"reductCustomerPoint",lb:"Reduct Customer Point"},
            
            {key:"paymentType",lb:"Payment Type"},
            {key:"total",lb:"Total"},

            {key:"tax",lb:"ภาษี"},
            {key:"totalTax",lb:"Total Tax"},
            {key:"reduction",lb:"ส่วนลด"},
            {key:"totalReduction",lb:"Total Reduction"},
            
            {key:"grandTotal",lb:"Grand Total"}
            
        ]
    },
    {
        formName:"reductionForm",
        formHead:"Reduction Table",
        template:[
            {key:"selection",lb:"#"},
            {key:"reductionName",lb:"Reduction Name"},
            {key:"reductionRate",lb:"Reduction Rate"},
            {key:"reductionInPercentage",lb:"in %"},
            {key:"reductionAmount",lb:"Total"},
        ]
    },
    {
        formName:"customerPointForm",
        formHead:"Customer Point",
        template:[
            {key:"remainingCustomerPoint",lb:"Remaining Customer Point"},
            {key:"reductCustomerPoint",lb:"Reduct Customer Point"},
            {key:"remainingPoint",lb:"Remaining Point"}
        ]
    },
    {
        formName:"taxForm",
        formHead:"Tax Table",
        template:[
           {key:"selection",lb:"#"},
           {key:"taxName",lb:"Tax Name"},
           {key:"taxRate",lb:"Tax Rate"},
           {key:"taxInPercentage",lb:"in %"},
           {key:"taxAmount",lb:"Tax Amount"}
        ]
    },
    {
        formName:"transactionForm",
        formHead:"Transaction Table",
        template:[
            {key:"id",lb:"ID"},
        ]
    },
    {
        formName:"printForm",
        formHead:"Print Form",
        template:[
            {key:'widthUnit',lb:'Width Unit'},
            {key:'fontUnit',lb:'Font Unit'},
            {key:'totalWidth',lb:'Total Width'},
            {key:'showTableHead',lb:'Show Table Head'},
            {key:'header1',lb:'Header 1'},
            {key:'header2',lb:'Header 2'},
            {key:'table1',lb:'Table'},
            {key:'footer1',lb:'Footer 1'},
            {key:'footer2',lb:'Footer 2'},
            {key:'printLb',lb:'Label'},
            {key:'printValue',lb:'Constant'},
            {key:'printFieldName',lb:'Variable'},
            {key:'printFontSize',lb:'Font Size'},
            {key:'printWidth',lb:'Width'},
            {key:'printPosition',lb:'Position'},

        
        ]
    },
    {
        formName:"branchSettingPage",
        formHead:"Branch Setting",
        template:[
            {key:'languageSetting',lb:'Language Setting'},
            {key:'printPageSetting',lb:'Print Page Setting'},
            {key:'widthLeft',lb:'Width Left'},
            {key:'branch',lb:'Branch'},
            //{key:'branchId',lb:'Branch ID'},
            //{key:'branchName',lb:'Branch Name'},
     
            {key:'table',lb:'Table'},
            {key:'tableName',lb:'Table Name'},
            {key:'tableActive',lb:'Table Active'}

        ]
    },
    {
        formName:"tableSettingModal",
        formHead:"Table Setting",
        template:[
            {key:'subject',lb:'Subject'},
            {key:'show',lb:'Show'}
        ]
    },
    {
        formName:"shopLogInForm",
        formHead:"Shop Log In Form",
        template:[
            {key:'shopName',lb:'Shop Name'},
            {key:'password',lb:'Password'}
        ]
    },
    {
        formName:"userLogInForm",
        formHead:"User Log In Form",
        template:[
            {key:'username',lb:'User Name'},
            {key:'password',lb:'Password'},
            {key:'createNewUser',lb:'Create New User'}
        ]
    },

    {
        formName:"groupPage",
        formHead:"Group Page",
        template:[
        ]
    },

    {
        formName:"addGroupForm",
        formHead:"Add Group Form",
        template:[
            {key:"treeTitle",lb:"เลือกกลุ่มสินค้าแม่"},
            {key:"id",lb:"ไอดี"},
            {key:"gcode",lb:"โค้ดกลุ่ม"},
            {key:"groupName",lb:"ชื่อกลุ่ม"},
            {key:"level",lb:"ระดับกลุ่ม"}
        ]
    }
    ,
    {
        formName:"editGroupForm",
        formHead:"Edit Group Form",
        template:[
            {key:"treeTitle",lb:"เลือกกลุ่มสินค้าแม่"},
            {key:"id",lb:"ไอดี"},
            {key:"gcode",lb:"โค้ดกลุ่ม"},
            {key:"groupName",lb:"ชื่อกลุ่ม"},
            {key:"level",lb:"ระดับกลุ่ม"}
        ]
    },

    {
        formName:"jobStatusForm",
        formHead:"Job Status Form",
        template:[
            {key:"jobStatus",lb:"สถานะงาน"}
        ]
    },
    {
        formName:"billBarcodeForm",
        formHead:"",
        template:[
            {key:"productId",lb:"เลือกกลุ่มสินค้าแม่"},
            {key:"barcode",lb:"ไอดี"},


            {key:"partnerId",lb:"โค้ดกลุ่ม"},
            {key:"phone",lb:"ชื่อกลุ่ม"},
            {key:"table",lb:"Table"},

            {key:"queue",lb:"โค้ดกลุ่ม"},
            {key:"paymentType",lb:"ชื่อกลุ่ม"},
            {key:"cash",lb:"Table"},

            {key:"grandTotal",lb:"Table"},

            {key:"change",lb:"Table"},

        ]


    },
    /*
    key:'formHead-shopLogInForm',lb:'Shop Log In',
    key:'formHead-userLogInForm',lb:'User Log In',
    key:'createNewUser',lb:'Create New User'
    */
 /*
    key:'formHead-shopLogInForm',lb:'ล็อกอินร้านค้า',
    key:'formHead-userLogInForm',lb:'ล็อกอินผู้ใช้',
    key:'createNewUser',lb:'สร้างบัญชีผู้ใช้ใหม่'
    */


]


module.exports = FormTemplate