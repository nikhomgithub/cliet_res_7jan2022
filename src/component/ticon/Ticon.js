import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import {RiHandCoinFill,RiLogoutCircleRLine,RiLogoutBoxRFill,RiShareForwardLine} from 'react-icons/ri'
import {FaHome,FaMoneyBill,FaRegMoneyBillAlt,FaMoneyBillWaveมconsole,FaMoneyBillWave,
        FaBullseye,FaFileCsv,FaRegArrowAltCircleDown,FaRegArrowAltCircleUp,
        FaChair,FaRegFolderOpen,FaChevronCircleLeft,FaChevronCircleRight,
        FaBarcode,FaRegArrowAltCircleRight
} from 'react-icons/fa';
import {MdFastfood,MdPerson,MdTune,MdLogout,
        MdRefresh,MdSwapHoriz,MdSettings,
        MdSearch,MdEdit,MdAddCircle,MdDelete,MdPrint,
        MdChevronLeft,MdChevronRight,MdLastPage,
        MdRadioButtonChecked,MdClose,MdPassword,MdSave,
        MdMergeType,MdRawOn,MdGroups
} from 'react-icons/md';
import {GiCook,GiStack,GiBugleCall,GiOpenBook} from 'react-icons/gi'
import {BsShop} from 'react-icons/bs'
import {TiSortNumericallyOutline} from 'react-icons/ti';
import {SiBookstack,SiAirtable} from 'react-icons/si'
import {MainContext} from '../../context/MainContext'

import '../../App2.css'
import './Ticon.css'


const iconLabel={
    "FaHome":"หน้าหลัก",
    "MdTune":"ตั้งค่าสาขา",
    "MdPerson":"ลูกค้า",
    "MdFastfood":"สินค้า",
    //"FaRegMoneyBillAlt":"บิล",
    "SiBookstack":"บิล",
    "RiLogoutBoxRFill":"ล็อกเอา",
    "MdLogout":"ล็อกเอา",
    "MdRefresh":"รีโหลด",
    "MdSwapHoriz":"ย้าย",
    "MdSettings":"ตั้งค่า",
    "MdSearch":"ค้นหา",
    "MdEdit":"แก้ไข",
    "MdAddCircle":"เพิ่ม",
    "MdDelete":"ลบ",
    "MdPrint":"พิมพ์",
    "MdRadioButtonChecked":"เลือก",
    "MdClose":"ปิด",
    "RiShareForwardLine":"ดึงค่า",
    "FaFileCsv":"CSVไฟล์",
    "FaRegArrowAltCircleDown":"เลื่อนลง",
    "FaRegArrowAltCircleUp":"เลื่อนขึ้น",
    "MdPassword":"แก้รหัส",
    "MdSave":"บันทึก",
    "MdMergeType":"รวมสินค้า",
    "MdRawOn":"แตกวัตถุดิบ",
    "SiAirtable":"โต๊ะ",
    //"FaChair":"โต๊ะ",
    "FaRegFolderOpen":"กลุ่มสินค้า",
    "GiCook":"ครัว",
    "FaBullseye":"ไม่เลือก",
    "FaBarcode":"บาร์โค้ด",
    "TiSortNumericallyOutline":"คิว",
    //"MdGroups":"คิว",
    "FaRegArrowAltCircleRight":"เลือก",
    "RiHandCoinFill":"ปิดบิล",
    "BsShop":"POS",
    "FaMoneyBillWave":"ชำระค่ารายเดือน",
    "GiStack":"รายงานสินค้า"
}

function Ticon(props) {

const {iconName,className,textStyle,iconStyle}=props
const {basicDataSt}=React.useContext(MainContext)

const [showIcon,setShowIcon]=React.useState(true)

React.useEffect(()=>{
    if(!showIcon){
        setTimeout(()=>{
            setShowIcon(true)
        },[1000])
    }
},[showIcon])

const renderIcon=()=>{
    switch(iconName) {
        case "FaHome":
          return <FaHome className={className} style={iconStyle}/>
        case "MdTune":
          return <MdTune className={className} style={iconStyle}/>
        case "MdPerson":
          return <MdPerson className={className} style={iconStyle}/>
        case "MdFastfood":
          return <MdFastfood className={className} style={iconStyle}/>
        case "SiBookstack":
          return <SiBookstack className={className} style={iconStyle}/>
        case "MdLogout":
          return <MdLogout className={className} style={iconStyle}/>
        case "RiLogoutBoxRFill":
          return <RiLogoutBoxRFill className={className} style={iconStyle}/>
        case "MdRefresh":
          return <MdRefresh className={className} style={iconStyle}/>
        case "MdRefresh":
          return <MdRefresh className={className} style={iconStyle}/>
        case "MdSwapHoriz":
          return <MdSwapHoriz className={className} style={iconStyle}/>
        case "MdSettings":
          return <MdSettings className={className} style={iconStyle}/>
        case "MdSearch":
          return <MdSearch className={className} style={iconStyle}/>
        case "MdEdit":
          return <MdEdit className={className} style={iconStyle}/>
        case "MdAddCircle":
          return <MdAddCircle className={className} style={iconStyle}/>
        case "MdDelete":
          return <MdDelete className={className} style={iconStyle}/>
        case "MdPrint":
          return <MdPrint className={className} style={iconStyle}/>
        case "MdRadioButtonChecked":
          return <MdRadioButtonChecked className={className} style={iconStyle}/>
        case "MdClose":
          return <MdClose className={className} style={iconStyle}/>
        case "RiShareForwardLine":
          return <RiShareForwardLine className={className} style={iconStyle}/>
        case "FaFileCsv":
          return <FaFileCsv className={className} style={iconStyle}/>
        
        case "FaRegArrowAltCircleUp":
          return <FaRegArrowAltCircleUp className={className} style={iconStyle}/>
        case "FaRegArrowAltCircleDown":
          return <FaRegArrowAltCircleDown className={className} style={iconStyle}/>
        case "MdPassword":
           return <MdPassword className={className} style={iconStyle}/>
        case "MdSave":
           return <MdSave className={className} style={iconStyle}/>  
        case "MdMergeType":
            return <MdMergeType className={className} style={iconStyle}/>
        case "MdRawOn":
            return <MdRawOn className={className} style={iconStyle}/>  
        case "SiAirtable":
            return <SiAirtable className={className} style={iconStyle}/>  
        case "FaRegFolderOpen":
            return <FaRegFolderOpen className={className} style={iconStyle}/>
        case "GiCook":
            return <GiCook className={className} style={iconStyle}/>  
        case "FaBullseye":
            return <FaBullseye className={className} style={iconStyle}/>  
        case "FaBarcode":
            return <FaBarcode className={className} style={iconStyle}/>  
        case "TiSortNumericallyOutline":
            return <TiSortNumericallyOutline className={className} style={iconStyle}/> 
        case "FaRegArrowAltCircleRight":
            return <FaRegArrowAltCircleRight className={className} style={iconStyle}/>
        case "RiHandCoinFill":
            return <RiHandCoinFill className={className} style={iconStyle}/>
        case "FaMoneyBillWave":
            return <FaMoneyBillWave className={className} style={iconStyle}/>
          
        case "BsShop":
            return <BsShop className={className} style={iconStyle}/>     
        case "GiStack":
            return <GiStack className={className} style={iconStyle}/>         
        default:
          return null
      }
}

return (
    <div className=''
        style={{display:"flex",alignItems:"center",
                flexWrap:"nowrap",height:"100%"}}
         onMouseOver={e=>{
            setShowIcon(false)
         }}
         onMouseLeave={e=>{
            setShowIcon(true)
         }}
    >
        {
         showIcon
         ?renderIcon()
         :<div className='flex-center-center' 
              style={{color:"white",whiteSpace:"nowrap",height:"100%",
                      padding:"0.24rem",...textStyle
        }}>
            <div >
            {iconLabel[iconName]}
            </div>
          </div>
        }
    </div>

)

}


Ticon.defaultProps={
  iconName:"",
  classNam:"",
  textStyle:null,
  iconStyle:null
}




export default Ticon;

