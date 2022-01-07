import React from 'react';
import './Calendar.css';

import {FaRegCalendarAlt} from 'react-icons/fa';
import {MdClose} from 'react-icons/md';

//==================
function Calendar(props) {

const {onMyClick,value,style,styleIcon,
       showDateOption,timeOption,
       days,thaiMonths  
    }=props
//value id isostring

/*
const thaiMonths=[
    "มค","กพ","มีค","เมย","พค","มิย",
    "กค","สค","กย","ตค","พย","ธค"
]

const thaiMonths=[
    "01","02","03","04","05","06",
    "07","08","09","10","11","12"
]
*/
/*
const days=[
    "Su","Mo","Tu","Wd","Th","Fr","Sa"
]
*/

/*
const datePattern=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gi

const valDate= (pttn,str)=>{
    return new RegExp(pttn).test(str)
}
*/

/*
const convertNewDateToString=(newDate)=>{
        const temp =newDate.toString()

        let tempMonth=temp.substring(4,7)
        if(tempMonth=="Jan"){tempMonth="01"}
        else if(tempMonth=="Feb"){tempMonth="02"}
        else if(tempMonth=="Mar"){tempMonth="03"}
        else if(tempMonth=="Apr"){tempMonth="04"}
        else if(tempMonth=="May"){tempMonth="05"}
        else if(tempMonth=="Jun"){tempMonth="06"}
        else if(tempMonth=="Jul"){tempMonth="07"}
        else if(tempMonth=="Aug"){tempMonth="08"}
        else if(tempMonth=="Sep"){tempMonth="09"}
        else if(tempMonth=="Oct"){tempMonth="10"}
        else if(tempMonth=="Nov"){tempMonth="11"}
        else if(tempMonth=="Dec"){tempMonth="12"}

        const tempDate=temp.substring(8,10)
        const tempYear=temp.substring(11,15)

        const tempNewDate=`${tempYear}-${tempMonth}-${tempDate}`

        return tempNewDate
}
*/

/*
const convertISOtoLocale=(date)=>{
    const date1=new Date(date).toISOString()
    const date2=new Date(date1).toLocaleString('fr-ca')
    const date3=new Date(date1).toLocaleString('en-GB')
    const date4=date2.substring(0,10)+'T'+date3.substring(12,date3.length)
    return date4
}
*/

/*
const convertLocaleToISO=(date)=>{
    const date5=new Date(date).toISOString()
    return date5
}

const genCurrentDate=()=>{
    const date1=new Date().toISOString()
    //2021-10-29T05:43:33.516Z
    const date4=convertISOtoLocale(date1)
    
    return new Date(date4)
}
*/

const genDate=(value)=>{
    //value is date in ISOstring which is UK time
    if(value){
        let tempDate=new Date(value)

        if(timeOption){
            const {hour,minute,second}=timeOption
            tempDate=new Date(tempDate.setHours(hour,minute,second))
        }

        return tempDate//.toLocaleString('en-GB')

    }
    else{
        return new Date()//.toLocaleString('en-GB')
    }
    
    /*
    if(value){
        const shortDate = value.substring(0,10)
        if(valDate(datePattern,shortDate)){
            const temp=convertISOtoLocale(value)
            return new Date(temp)
        }
        else{
            return genCurrentDate()
        }
    }
    else{
        return genCurrentDate()
    }
    */
}

let [date,setDate]=React.useState(genDate(value))

React.useEffect(()=>{
    //console.log('date........')
    //console.log(date)
},[date])

const [showCalendar,setShowCalendar]=React.useState(false)

const getSelectedDateThisMonth=(i,date)=>{

    let temp=date.setDate(i)
    temp=new Date(temp)

    setDate(temp)

    onMyClick(temp.toISOString())

    //const dateUK="2021-12-31T18:50:41.750Z"
    //Sat Jan 01 2022 01:50:41 GMT+0700 (Indochina Time)
}

const genThaiFullDate=(value)=>{

    if(value){
        //const shortDate = value.substring(0,10)
        //if(valDate(datePattern,shortDate)){
        let tempDate=new Date(value)
        
        //console.log('timeOption')
        //console.log(timeOption)

        if(timeOption){
            const {hour,minute,second}=timeOption
            tempDate=new Date(tempDate.setHours(hour,minute,second))
        }

        const date2=tempDate.toLocaleString('en-GB')

        if(showDateOption=="date"){
            return date2.substring(0,10)
        }
        else if(showDateOption=="datetime"){
            return date2
        }
        else if(showDateOption=="time"){
            return date2.substring(12,21)
        }
        else{
            return '--'
        }
        //}
        //else{
        //}
    }

    else {
        return '--'
    }
    /*
        const thaiDays=[
            "อา","จ","อ","พ","พฤ","ศ","ส"
        ]
       
        const thaiMonth=thaiMonths[date.getMonth()]
        const thaiDay=thaiDays[date.getDay()]
        const thaiYear=date.getFullYear()+543
        const thaiDate=date.getDate()
        const temp=`${thaiDay} ${thaiDate} ${thaiMonth} ${thaiYear}`
        return temp
        */
}

const genThaiMonth=(date)=>{

    const thaiMonth=thaiMonths[date.getMonth()]
    const thaiYear=date.getFullYear()//+543

    const temp=`${thaiMonth}-${thaiYear}`
    return temp
}

const genPrevMonthDay=(date)=>{
    const lastFullDayPrevMonth=new Date(date.getFullYear(),date.getMonth(),0)
    const lastDayPrevMonth=lastFullDayPrevMonth.getDay()
    const lastDatePrevMonth=lastFullDayPrevMonth.getDate()

    let prevMonthDay =[]
    for (let i=lastDatePrevMonth-lastDayPrevMonth;i<=lastDatePrevMonth;i++){
        prevMonthDay=[...prevMonthDay,i]
    }
    return prevMonthDay
}

const genThisMonthDay=(date)=>{
    const lastDate=new Date(date.getFullYear(),date.getMonth()+1,0).getDate()
    let thisMonthDay=[]
    for (let j=1;j<=lastDate;j++){
        thisMonthDay=[...thisMonthDay,j]
    }
    return thisMonthDay
}

const genNextMonthDay=(date)=>{
    const lastFullDayThisMonth=new Date(date.getFullYear(),date.getMonth()+1,0)
    const lastDayThisMonth=lastFullDayThisMonth.getDay()

    let nextMonthDay=[]
    for (let k=1;k<=6-lastDayThisMonth;k++){
        nextMonthDay=[...nextMonthDay,k]
    }
    return nextMonthDay
}

//==================================
return (
    !showCalendar
    ?<div style={{width:"100%",height:"100%",backgroundColor:"white",
                  display:"flex",justifyContent:"flex-start",alignItems:"center",
                  borderRadius:"5px 5px",
                  ...style
    }}>
        <FaRegCalendarAlt style={styleIcon}
            onClick={e=>setShowCalendar(true)}
        />
        {genThaiFullDate(value)}

    </div>
    :<div className="container" style={{width:"100vw",height:"100vh"}}>
        <div className="calendar">

            <div className="month">
                <div className="arrow"
                      onClick={e=>{
                        let temp=date.setFullYear(date.getFullYear()-1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                 >
                    <i>&lt;&lt;</i>
                </div>


                <div className="arrow"
                      onClick={e=>{
                        let temp=date.setMonth(date.getMonth()-1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                 >
                    <i>&lt;</i>
                </div>


                <div className="date">
                    <div>{genThaiMonth(date)}</div>
                </div>
               
                <div className="arrow"
                      onClick={e=>{
                        let temp=date.setMonth(date.getMonth()+1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                >
                    <i>&gt;</i>
                </div>

                <div className="arrow"
                      onClick={e=>{
                        let temp=date.setFullYear(date.getFullYear()+1)
                        temp=new Date(temp)
                        setDate(temp)
                      }}
                >
                    <i>&gt;&gt;</i>
                </div>
                <MdClose className='md-icon'
                    onClick={e=>{
                        setShowCalendar(!showCalendar)
                    }}
                />

            </div>



            {
            
            <div className="weekdays">
                {
                    days.map((i,index)=>{
                        return(
                            <div key={index}>{i}</div>
                        )        
                    })
                }
            </div>
            
            }

            {
            
            <div className="days">
                
                {
                genPrevMonthDay(date).map((i,index)=>(
                    <div key={index} className="prev-date">
                        {i}
                    </div>
                ))
                }

                {
                genThisMonthDay(date).map((i,index)=>(
                    <div key={index} 
                         className={i==date.getDate()?"today":null}
                         onClick={e=>{
                            getSelectedDateThisMonth(i,date)
                            setShowCalendar(false)
                        }}
                    >
                        {i}
                    </div>
                ))
                }
                
                {
                genNextMonthDay(date).map((i,index)=>(
                    <div key={index} className="next-date">
                        {i}
                    </div>
                ))
                }
            </div>   
            
            }
        </div>
    </div>
  );
}


Calendar.defaultProps={
    onMyClick:()=>{},
    showDateOption:"date",
    value:new Date().toISOString(),
    days:["Su","Mo","Tu","Wd","Th","Fr","Sa"],
    thaiMonths:[
        "01","02","03","04","05","06",
        "07","08","09","10","11","12"
    ],
    timeOption:null
}

export default Calendar;



//=========================
/*
การใช้งาน 

เราเก็บข้อมูลใน mongoDB 
const dateUK="2021-12-31T18:50:41.750Z"

พอแปลงจะได้
new Date(dateUK)
Sat Jan 01 2022 01:50:41 GMT+0700 (Indochina Time)

เราสามารถแก้ไข วัน เดือน ปี เดย์ ชม นาที วินาทีได้ด้วย 
.setFullYear()    .getFullYear()
.setMonth() ค่า 0-11      .getMonth()
.setDate()         .getDate()
.setDay() ค่า 0-6   .getDay()
.setHours(0,0,0)   .getHours()    get

ISOstring > new Date(ISOstring) > ใช้ set ต่างๆ แก้ new Date().setDate(1) เป็นต้น 

พอได้ ก็ toLocaleString('en-GB')

จะได้ 25/12/2021, 19:55:03 เอาไปใช้ได้


<Calendar
        style={{height:"1.6rem",fontSize:"1rem"}}         
        showDateOption={"datetime"}
        onMyClick={
        (e)=>{
            console.log('onMyClick')
            console.log(e)
        }
        }
        value={dateUK}
        timeOption={{hour:0,minute:0,second:0}}
/>


*/
//=========================