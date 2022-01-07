import React from 'react'

import {RiLogoutBoxRLine,RiLogoutCircleRLine,RiLogoutBoxRFill} from 'react-icons/ri'
import {FaHome,FaMoneyBill,FaRegMoneyBillAlt,FaMoneyBillWave} from 'react-icons/fa';
import {MdFastfood,MdPerson,MdTune,MdSettingsApplications,MdLogout} from 'react-icons/md';
import {BsShop} from 'react-icons/bs'
import LogOutTool from '../../page/login/LogOutTool';
import Ticon from '../ticon/Ticon';

import {Link} from 'react-router-dom';
import {MainContext} from '../../context/MainContext';

import './Navbar.css';

export default function Navbar() {
    const {basicDataSt,
           setReloadCheckToken,
           tokenSt,
           }=React.useContext(MainContext)
    //const {haveUserToken,haveShopToken,userName}=tokenSt
    //const {user}=basicDataSt

    const refHome=React.createRef()
    const refBranch=React.createRef()
    const refPartner=React.createRef()
    const refProduct=React.createRef()
    const refTransaction=React.createRef()
    const refBill=React.createRef()


  const getIconStyle=()=>{
     
    const toDate=new Date()
    
    let temp1=localStorage.getItem("expirationDate")
    const expirationDate=new Date(temp1)
    
    if(!temp1){
       return null
    }

    const temp3=new Date(expirationDate.toISOString())
    temp3.setDate(temp3.getDate()-3)
    const threeDayBeforeExpirationDate=new Date(temp3)
    //const temp2=expirationDate.getDate()-3
    //const temp3=expirationDate.toISOString()
   
     const a=toDate.getTime()-expirationDate.getTime()
     //console.log('a....')
     //console.log(a)

     //console.log('toDate')
     //console.log(toDate)

     //console.log('exp')
     //console.log(expirationDate)

     //console.log('3 d before')
     //console.log(threeDayBeforeExpirationDate)

     if(toDate>expirationDate){
        return {color:"red"}
     }
     else if(toDate>threeDayBeforeExpirationDate){
        return {color:"yellow"}
     }
     else{
        return {color:"#74b979"}
     }

 }

    return (
    <div className="navFrame flex-center-center jc-space-between">

            <div id="1" className="h-100" 
                 style={{
                         position:"absolute",top:"0",left:"0",
                         width:"87%",display:"flex",alignItems:"center",
                         justifyContent:"start",overflowX:"auto",overflowY:"hidden"}}>
        
                <div className="navLink" onClick={e=>refHome.current.click()}> 
                    <div className="navIconBox"
                         style={{position:"relative"}}
                    >
                        <Ticon
                            iconName="FaHome"
                            className="navIcon"
                            iconStyle={getIconStyle()}
                        />
                    </div>
                    {/*
                    <div className="navTextBox">
                        <p className="navText">หน้าหลัก</p>
                    </div>
                    */}
                </div>
             
                <div className="navLink" onClick={e=>refBranch.current.click()}> 
                    <div className="navIconBox">
                        <Ticon
                            iconName="MdTune"
                            className="navIcon"
                        />
                    </div>
                    {/*
                    <div className="navTextBox">
                        <p className="navText">ตั้งค่า</p>
                    </div>
                    */}
                </div>
                <div className="navLink" onClick={e=>refPartner.current.click()}> 
                    <div className="navIconBox">
                        <Ticon 
                            iconName="MdPerson"
                            className="navIcon"
                        />
                    </div>
                    {/*
                    <div className="navTextBox">
                        <p className="navText">คู่ค้า</p>
                    </div>
                    */}
                </div>
                
                <div className="navLink" onClick={e=>refProduct.current.click()}> 
                    <div className="navIconBox">
                        <Ticon
                            iconName="MdFastfood"
                            className="navIcon"
                        />
                    </div>
                    {/*
                    <div className="navTextBox">
                        <p className="navText">สินค้า</p>
                    </div>
                    */}
                </div>
                
                <div className="navLink" onClick={e=>refBill.current.click()}> 
                    <div className="navIconBox">
                        <Ticon
                            iconName="BsShop" 
                            className="navIcon"/>
                    </div>
                    {/*
                    <div className="navTextBox">
                        <p className="navText">ธุรกรรม</p>
                    </div>
                    */}
                </div>

            </div>    

            <div id="2" className="hide-logouttool">
                {
                tokenSt&&setReloadCheckToken&&basicDataSt&&
                <LogOutTool 
                    tokenSt={tokenSt}
                    setReloadCheckToken={setReloadCheckToken}
                    user={basicDataSt.user}
                    useHomeIcon={false}
                    useShopLogOut={false}
                />
                }
            {/*
            haveUserToken
            ?
            <div style={{
                position:"absolute",top:"0",right:"0",
                display:"flex",justifyContent:"flex-end"
                }}>
                {user
                ?<div className="sc-hide mt-1" style={{color:"white"}}>
                    {`${user.username}@${user.branchName}@${user.shopId}`}
                </div>
                :null
                }
                <div className="">
                    <RiLogoutBoxRFill
                    className="navIcon"
                        onClick={e=>{
                            localStorage.removeItem('userauthorization');
                            setReloadCheckToken(true)
                            window.location.reload()
                        }}
                    />
                </div>
            </div>
            :null 
            */}
            </div>

            <div className="d-none">
                <Link ref={refHome} to="/pos/home"/>
                <Link ref={refBranch} to="/pos/branch"/>
                <Link ref={refPartner} to="/pos/partner"/>
                <Link ref={refProduct} to="/pos/product"/>
                <Link ref={refTransaction} to="/pos/transaction"/>
                <Link ref={refBill} to="/pos/bill"/>

            </div>
    </div>
        //renderNavbar()
    )

}



 /*
import {Link} from 'react-router-dom';
<Link ref={refTransactionLog} to="/pagetransactionlog"/>


    const checkscroll=()=>{
        let stopY= 0;
        let currentY=0;

        //true="down", false="up"
        let movedown = true;
        let premovedown = true;

        //คอยฟังการขยับของ window จากการ scroll
        window.addEventListener("scroll", (e)=>{    
            //เมื่อหน้าจอมีการขยับในแนวดิ่ง 
            currentY = window.pageYOffset;
                //ถ้าค่า y ที่ได้ต่ำกว่า ค่าเดิม 5 แสดงว่า มีการเคลื่อนที่ลง
                if(currentY>(stopY+5)){
                    stopY=currentY; 
                    movedown=true;
                }
                //ถ้าค่า y ที่ได้น้อยกว่า ค่าเดิม 5 แสดงว่า มีการเคลื่อนที่ขึ้น
                else if(currentY<(stopY-5)){
                    stopY=currentY;
                    movedown=false;
                }
                //ค่าระหว่าง +5 และ -5 ไม่นำมาพิจารณาเพราะอาจเกิด bouncing
                //ดังนั้นค่า movedown เหมือนเดิม
              
                //เราจะจำกัดการเปลี่ยนค่า showNave ตามเงื่อนไขที่กำหนดไว้เท่านั้น
                //ถ้ามีการเปลี่ยนแปลงทิศทางการเคลื่อนที่ 
                //และการเคลื่อนที่ปัจจบัน เป็น การเคลื่อนที่ลง ไม่ต้องแสดง navbar
                //แต่ถ้ากำลังเคลื่อนที่ขึ้น ให้แสดง navbar 
                if(movedown!=premovedown){
                    //console.log('change')
                    if(movedown){
                        //setShowNav(false);
                    }
                    else{
                        //setShowNav(true)
                    }
                    //ทำการบันทึกการเคลื่อนที่ของรอบนี้ไว้เทียบกับของรอบหน้า
                    premovedown=movedown
                }
        })
    }

    
    const showMouseCoor=()=>{
        window.addEventListener("mousemove", (e)=>{    
            console.log(`x:${e.pageX}, y:${e.pageY}`)
        })
    }
    showMouseCoor()
    */
