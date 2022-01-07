import React from 'react';

import {RiLogoutBoxRLine,RiLogoutCircleRLine} from 'react-icons/ri'
import {FaWrench,FaMoneyBill,FaMoneyBillWave,FaRegMoneyBillAlt} from 'react-icons/fa';
import {MdVpnKey,MdTune,MdWrench,MdClose,MdFastfood,MdPerson,MdSettingsApplications} from 'react-icons/md';
import {BsShop} from 'react-icons/bs'
import {SiBookstack,SiAirtable} from 'react-icons/si'
import {Link} from 'react-router-dom';
import MMPOSLogo from './MMPOSLOGO'

import './Home.css'

function Home() {

const refSetting=React.createRef()
const refPartner=React.createRef()
const refProduct=React.createRef()
const refLogIn=React.createRef()
//const refTransaction=React.createRef()
const refBill=React.createRef()
const refBranch=React.createRef()


const boxStyle={fontSize:"5rem"}
const bigDivStyle={gridRow:"1/3",gridColumn:"1/2"}
const mdDivStyle={gridRow:"1/2",gridColumn:"3/5"}

const LB={
    home:"หน้าร้าน",
    product:"สินค้า",
    partner:"ลูกค้า",
    branch:"ตั้งค่าสาขา",
    setting:"ตั้งค่าร้าน",
    login:"การเข้าใช้"
}

const boxArray=[
{bgColor:"#FAE03C",//"rgb(255,102,0)",
 ref:refBill,
 LB:LB.home,
 color:"#444",
 icon:<BsShop style={{...boxStyle,fontSize:"8rem",color:"#444"}}/>
},
{bgColor:"#B76BA3",//"rgb(214,0,147)",
 ref:refProduct,
 LB:LB.product,
 color:"white",
 icon:<MdFastfood style={{...boxStyle,color:"white"}}/>
},
{bgColor:"rgb(0,204,0)",//"rgb(255,192,0)", 
 ref:refPartner,
 LB:LB.partner,
 color:"#444",
 icon:<MdPerson style={{...boxStyle,color:"#444"}}/>
},
/*
{bgColor:"#300e9f",//"rgb(0, 155, 119)", 
 ref:refTransaction,
 icon:<SiBookstack style={{...boxStyle,color:"white"}}/>
},
*/
{bgColor:"#B18F6A", 
 ref:refBranch,
 LB:LB.branch,
 color:"#444",
 icon:<MdTune style={{...boxStyle,color:"#444"}}/>
},
{bgColor:"rgb(192,0,0)", 
 ref:refSetting,
 LB:LB.setting,
 color:"white",
 icon:<MdSettingsApplications style={{...boxStyle,color:"white"}}/>
},
{bgColor:"#ff9933", 
 ref:refLogIn,
 LB:LB.login,
 color:"#444",
 icon:<MdVpnKey style={{...boxStyle,color:"#444"}}/>
},

//{bgColor:"rgb(0,204,0)",icon:<MdSettingsApplications style={boxStyle}/>},

//{bgColor:"rgb(46,117,182)",icon:<MdVpnKey style={boxStyle}/>},
//{bgColor:"rgb(166,166,166)",icon:<MdClose style={boxStyle}/>},
//{bgColor:"#87CEEB",icon:<MdClose style={boxStyle}/>},
//255,153,255
//
]

const [target,setTarget]=React.useState(0)
const [target2,setTarget2]=React.useState(0)

React.useEffect(()=>{
    let randomInt=0
    let randomInt2=0
    while (randomInt===target){
        randomInt=Math.floor(Math.random() * boxArray.length)
        randomInt2=Math.floor(Math.random() * boxArray.length)
    }
 
    setTimeout(()=>{
        setTarget(randomInt)
        setTarget2(randomInt2)
    },2000)

},[target])

return (
    <div className="home-hero">
        <div className="home-bg-screen">
            <div className="home-box">
                    <div 
                        className="home-grid"
                    >
                      
                        {
                            boxArray.map((i,idx)=>{
                            return idx==0
                                ?<div className={"home-title" }
                                    key={idx} 
                                    style={{...bigDivStyle,
                                            backgroundColor:`${i.bgColor}`,
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            borderRadius:"5%",
                                            position:"relative",

                                            }}

                                    onClick={e=>{i.ref.current.click()}}
                                    >   
                                        {i.icon}
                                        <div 
                                            style={{position:"absolute",
                                                bottom:"0",
                                                right:"0.5rem",
                                                color:i.color,
                                                fontSize:"1.2rem",
                                                display:target==idx||target2==idx?"":"none"
                                            }}
                                        >
                                            {i.LB}
                                        </div>
                                    </div>
                                :<div className="home-tile" 
                                     key={idx} 
                                     style={{
                                            backgroundColor:`${i.bgColor}`,
                                            display:"flex",
                                             justifyContent:"center",
                                             alignItems:"center",
                                             borderRadius:"5%",
                                             position:"relative",

                                            }}
                                    onClick={e=>{i.ref.current.click()}}
                                >   
                                    {
                                    i.icon
                                    }
                                    <div 
                                        style={{position:"absolute",
                                            bottom:"0",
                                            right:"0.5rem",
                                            color:i.color,
                                            fontSize:"1.2rem",
                                            display:target==idx||target2==idx?"":"none"
                                        }}
                                    >
                                        {i.LB}
                                    </div>
                                </div>
                            })
                        }
    
                    </div>
                 
                    <div className="" 
                         style={{width:"100%",
                            marginTop:"0rem",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            transform:"scale(1.4)"
                    }}>
                        <div>
                            <MMPOSLogo/>
                        </div>
                        
                    </div>
            </div>
          
   
        </div>
       
        <div className="d-none">
            <Link ref={refSetting} to="/pos/basicdata"/>
            <Link ref={refPartner} to="/pos/partner"/>
            <Link ref={refProduct} to="/pos/product"/>
            <Link ref={refLogIn} to="/pos/login"/>
            <Link ref={refBill} to="/pos/bill"/>
            <Link ref={refBranch} to="/pos/branch"/>

         
        </div>
        
    </div>
)
}

export default Home;
/*

<Link ref={refTransaction} to="/pos/bill"/>


<div className="home-link"
onClick={e=>{refProduct.current.click()}}>
<div>
   <FaWarehouse className="home-icon"/>
</div>
<div>
   <h3>คลังสินค้า</h3>
</div>
</div>
*/



/*


             <div className="home-link" 
                     onClick={e=>{refUser.current.click()}}>
                    <div >
                        <FaUserEdit className="home-icon"/>
                    </div>
                    <div>
                        <h3>ผู้ใช้</h3>
                    </div>
                </div>
                
                <div className="home-link"
                     onClick={e=>{refSetting.current.click()}}>
                    <div>
                        <MdSettingsApplications className="home-icon"/>
                    </div>
                    <div>
                        <h3>ตั้งค่า</h3>
                    </div>
                </div>

                <div className="home-link"
                     onClick={e=>{refPartner.current.click()}}>
                    <div>
                        <FaUsers className="home-icon"/>
                    </div>
                    <div>
                        <h3>คู่ค้า</h3>
                    </div>
                </div>

                <div className="home-link"
                     onClick={e=>{refProduct.current.click()}}>
                    <div>
                        <FaWarehouse className="home-icon"/>
                    </div>
                    <div>
                        <h3>สินค้า</h3>
                    </div>
                </div>

                <div className="home-link"
                     onClick={e=>{refTransaction.current.click()}}>
                    <div>
                        <MdShoppingCart className="home-icon"/>
                    </div>
                    <div>
                        <h4>ธุรกรรม</h4>
                    </div>
                </div>

                <div className="home-link"
                     onClick={e=>{refTransactionLog.current.click()}}>
                    <div>
                        <FaChartLine className="home-icon"/>
                    </div>
                    <div>
                        <h4>บันทึก</h4>
                    </div>
                </div>






*/