import React from 'react';
import Barcode from 'react-barcode'
import './Sticker.css'
import {FaPlusSquare,FaMinusSquare} from 'react-icons/fa'; 
import {MdClose,MdArrowUpward,MdArrowDownward,
    MdSettings,MdSave,MdRadioButtonChecked,MdRadioButtonUnchecked
} from 'react-icons/md';
import Calendar from '../../component/calendar/Calendar'


function Sticker(props) {

    const {loadData,isAdd,confirmFunc1,confirmFunc2,cancelFunc,
           selectProduct,addToSelectProduct,deleteSelectProduct,
    }=props

const blankData = {code:"",name:"",price:0,unit:"pcs",qty:0,selectedLine:false}

/*
const blankInputState ={
    id:1,
    recordName:"",
    date:"",
    recordBy:"",

    xPerLine:4,
    heightP:297,
    widthP:210,

    gridColumnGap:2,
    gridRowGap:2,
    showBorder:true,

    paddingTopP:5,
    paddingBottomP:5,
    paddingLeftP:5,
    paddingRightP:5,

    showCode:true,
    showBarCode:true,

    barcodeValue:'',
    heightB:20,
    widthB:1,
    fontSizeCode:10,

    showName:true,
    name:"",
    fontSizeName:10,

    showPrice:true,
    price:0,
    fontSizePrice:10,
    
    showUnit:true,
    unit:"",
    fontSizeUnit:10,

    productData : []
}
*/
const [thaiDate,setThaiDate]=React.useState(null)

const genSelectedLine=(loadData)=>{
    let temp={...loadData}
    if(loadData){
        if(loadData.productData){
            let tempArray=[]
            loadData.productData.map(i=>{
                const tempObj={...i,selectedLine:false}
                tempArray=[...tempArray,tempObj]
            })
            temp={...temp,productData:tempArray}
        }
    }
    return temp
}

let [inputState,setInputState]=React.useState(genSelectedLine(loadData))

/*
const [inputState,setInputState]=React.useState({
    id:1,
    recordName:"abcd",
    date:"2021-12-31",
    recordBy:"Peter",

    xPerLine:4,
    heightP:297,
    widthP:210,

    gridColumnGap:2,
    gridRowGap:2,
    showBorder:true,

    paddingTopP:5,
    paddingBottomP:5,
    paddingLeftP:5,
    paddingRightP:5,

    showCode:true,
    showBarCode:true,

    //barcodeValue:'P-0101',
    heightB:20,
    widthB:1,
    fontSizeCode:10,

    showName:true,
    fontSizeName:10,

    showPrice:true,
    fontSizePrice:10,
    
    showUnit:true,
    fontSizeUnit:10,

    productData : [
        {code:"1234",name:"coloa",price:100,unit:"?????????",qty:10},
        {code:"4aa5",name:"pepsi",price:200,unit:"?????????",qty:5},
    ]

})
*/

React.useEffect(()=>{
    if(inputState){
        if(inputState.date){
            const temp=inputState.date.split("-")
            const year= parseInt(temp[0])+543
            const month= parseInt(temp[1])
            const date= parseInt(temp[2])
            
            let thaiMonth
            if(month==1){thaiMonth="???.???."}
            if(month==2){thaiMonth="???.???."}
            if(month==3){thaiMonth="??????.???."}
            if(month==4){thaiMonth="??????.???."}
            if(month==5){thaiMonth="???.???."}
            if(month==6){thaiMonth="??????.???."}
            if(month==7){thaiMonth="???.???."}
            if(month==8){thaiMonth="???.???."}
            if(month==9){thaiMonth="???.???."}
            if(month==10){thaiMonth="???.???."}
            if(month==11){thaiMonth="???.???."}
            if(month==12){thaiMonth="???.???."}

            setThaiDate(`${date}${thaiMonth}${year}`)
        }

        /*
        if(inputState.widthB){
            const temp=parseInt(inputState.widthB)-100
            if( (temp<100)&&(temp>0)){
                setInputState({
                    ...inputState,
                    tempWidthB:temp,
                    format:"CODE128"
                })
            }
        }
        */
    }
},[inputState])

const handleInputState=({e,key,inputType})=>{
    let value
    if(inputType=="checkbox"){
        value=e.target.checked
    }
    else {
        value=e.target.value
    }
    setInputState({...inputState,[key]:value})
}

const inputTemplate0=[
    {lb:"??????????????????",inputType:"number",width:["15%","50%","50%"],key:"id" },
    {lb:"??????????????????????????????",inputType:"text",width:["30%","70%","30%"],key:"recordName" },
    {lb:"??????????????????",inputType:"date",width:["30%","50%","50%"],key:"date" },
    {lb:"????????????????????????",inputType:"text",width:["25%","50%","50%"],key:"recordBy" },
]


const inputTemplate1=[

    {lb:"????????? ??????.",inputType:"number",width:["16%","50%","50%"],key:"heightP" },
    {lb:"??????????????? ??????.",inputType:"number",width:["16%","50%","50%"],key:"widthP"  },
    {lb:"??????????????? ??????.",inputType:"number",width:["16%","30%","70%"],key:"paddingTopP" },
    {lb:"????????????????????? ??????.",inputType:"number",width:["16%","30%","70%"],key:"paddingBottomP"},
    {lb:"????????????????????? ??????.",inputType:"number",width:["16%","30%","70%"],key:"paddingLeftP" },
    {lb:"?????????????????? ??????.",inputType:"number",width:["16%","30%","70%"],key:"paddingRightP" },
]

const inputTemplate2=[
    {lb:"????????????????????????????????????",inputType:"checkbox",width:["25%","20%","80%"],key:"showBarCode" },
    {lb:"?????????????????????????????????????????????",inputType:"number",width:["25%","20%","80%"],key:"heightB"  },
    {lb:"???????????????????????????????????????????????????",inputType:"number",width:["20%","25%","75%"],key:"widthB" },
    {lb:"?????????????????????????????????????????????????????????????????????",inputType:"number",width:["30%","30%","70%"],key:"xPerLine"},
    
    {lb:"?????????????????????????????????",inputType:"checkbox",width:["25%","20%","80%"],key:"showBorder" },
    {lb:"?????????????????????????????????????????? ??????.",inputType:"number",width:["25%","20%","80%"],key:"gridRowGap" },
    {lb:"?????????????????????????????????????????????????????? ??????.",inputType:"number",width:["50%","10%","90%"],key:"gridColumnGap" },

    {lb:"????????????????????????",inputType:"checkbox",width:["25%","20%","80%"], key:"showCode" },
    {lb:"???????????????????????????????????????",inputType:"number",width:["25%","20%","80%"], key:"fontSizeCode" },

    {lb:"??????????????????????????????????????????",inputType:"checkbox",width:["25%","20%","80%"], key:"showName" },
    {lb:"?????????????????????????????????????????????",inputType:"number",width:["25%","20%","80%"], key:"fontSizeName" },

    {lb:"????????????????????????",inputType:"checkbox",width:["25%","20%","80%"], key:"showPrice" },
    {lb:"???????????????????????????????????????",inputType:"number",width:["25%","20%","80%"], key:"fontSizePrice" },

    {lb:"???????????????????????????",inputType:"checkbox",width:["25%","20%","80%"], key:"showUnit" },
    {lb:"??????????????????????????????????????????",inputType:"number",width:["25%","20%","80%"], key:"fontSizeUnit" },

]


const productData=[
    {code:"123df12323434",name:"coloa",price:100,unit:"?????????"},
    {code:"4aa51243432443",name:"pepsi",price:200,unit:"?????????"},
]


const renderInputFromTemplate=({
    i,idx
})=>{
    const {width,lb,key,inputType} = i
   
    let tempValue=inputState[key]

    

    /*
    if(inputType=="date"){
        if(inputState[key]){
            tempValue=inputState[key].substring(0,10)
        }
    }
    */
    return (
        <div key={idx} className="xc2"
             style={{display:"flex",width:width[0],margin:"0.2rem 0"}}>
            {false//inputType=="date"
            ?<Calendar
                style={{height:"1.6rem"}}
                onMyClick={
                (e)=>{
                    setInputState({...inputState,[key]:e})
                }
                }
                value={tempValue}//.substring(0,10)}
            />
            :<input  style={{width:width[1]}} 
                    checked={inputState[key]}
                    value={tempValue}
                    type={inputType}
                    onChange={e=>handleInputState({e,key,inputType})}
            />
            }
            <p className="" style={{width:width[2],textAlign:"left",paddingLeft:"5px"}}>
                {lb}
            </p>


        </div>
    )
}

const handleProductDataInput=(value,idx,key)=>{
    let temp=inputState.productData
    let tempArray=[]

    temp.map((obj,index)=>{
        if(idx==index){
            const tempObj={...obj,[key]:value}
            tempArray=[...tempArray,tempObj]
        }
        else{
            tempArray=[...tempArray,obj]
        }
    })

    setInputState({...inputState,productData:tempArray})
}

const insertRowZero=()=>{
    let temp=inputState.productData
    let tempArray=[]

    tempArray=[blankData,...temp]
    setInputState({...inputState,productData:tempArray})

}

const insertRow =(idx)=>{
    let temp=inputState.productData
    let tempArray=[]
 
    temp.map((i,index)=>{
        if(index==idx){
            tempArray=[...tempArray,i,blankData]
        }
        else {
            tempArray=[...tempArray,i]
        }
    })
    

    setInputState({...inputState,productData:tempArray})
}

const deleteRow =(idx)=>{
    let temp=inputState.productData
    let tempArray=[]
 
    temp.map((i,index)=>{
        if(index!=idx){
            tempArray=[...tempArray,i]
        }
    })
    
    setInputState({...inputState,productData:tempArray})
}


const handleSelectedLine=(data,idx)=>{
    if(inputState){
        if(inputState.productData){
            let temp=inputState.productData
            let tempArray=[]
            
            temp.map((i,index)=>{
                if(index==idx){
                    let tempObj={...i,selectedLine:data}
                    tempArray=[...tempArray,tempObj]
                }
                else{
                    tempArray=[...tempArray,i]
                }
            })

            setInputState({...inputState,productData:tempArray})
        }
    }
}

const renderData=(i,idx)=>{

    const {code,name,unit,price,qty,selectedLine}=i
    return (
        <div key={idx} className="xc12 sticker-data" style={{display:"flex"}}>
        
            <div className="" 
                    style={{display:"flex",alignItems:"flex-start", justifyContent:"center", 
                           width:"7%"}}>
                <FaPlusSquare  className="sm-icon" 
                    style={{marginTop:"0",borderRadius:"0"}}
                    onClick={e=>insertRow(idx)}
                />
                <FaMinusSquare className="sm-icon" 
                    style={{marginTop:"0",borderRadius:"0"}}
                    onClick={e=>deleteRow(idx)}
                />
                {selectedLine
                ?<MdRadioButtonChecked className="sm-icon"
                    onClick={e=>{
                        handleSelectedLine(false,idx)
                    }}
                />
                :<MdRadioButtonUnchecked className="sm-icon"
                    onClick={e=>{
                        handleSelectedLine(true,idx)

                    }}
                />
                }

            </div>

            <div className="" style={{display:"flex",width:"18%"}}>
                <input className="" style={{width:"80%"}} type="text" value={code} 
                    onChange = { e => handleProductDataInput(e.target.value,idx,"code")}
                />
                <div className="" style={{width:"20%"}}>
                    ????????????
                </div>
            </div>

            <div className="" style={{display:"flex",width:"33%"}}>
                <input className="" style={{width:"80%"}} type="text" value={name}
                    onChange = { e => handleProductDataInput(e.target.value,idx,"name")}

                />
                <div className="" style={{width:"20%"}}>
                    ??????????????????????????????
                </div>
            </div>

            <div className="" style={{display:"flex",width:"15%"}}>
                <input className="" style={{width:"70%"}} type="number" value={price} 
                       onChange = { e => handleProductDataInput(e.target.value,idx,"price")}
                />
                <div className="" style={{width:"30%"}}>
                    ????????????
                </div>
            </div>

            <div className="" style={{display:"flex",width:"15%"}}>
                <input className="" style={{width:"70%"}} type="text" value={unit}
                    onChange = { e => handleProductDataInput(e.target.value,idx,"unit")}
                />
                <div className="" style={{width:"30%"}}>
                    ???????????????
                </div>
            </div>

            <div className="" style={{display:"flex",width:"10%"}}>
                <input className="" style={{width:"50%"}}type="number" value={qty}
                    onChange = { e => handleProductDataInput(e.target.value,idx,"qty")}
                />
                <div className="" style={{width:"50%"}}>
                    ???????????????
                </div>
            </div>
            
        </div>
    )
}

/*  
    showBarCode:true,
    heightB:50,
    widthB:1,


    showCode:true,
    barcodeValue:'P-0101',
    fontSizeCode:10,

*/


const renderInput=()=>{
    return (
        <div className="flex-center-center" style={{width:"100%"}}>
                
                <div className="xc12" style={{display:"flex",flexWrap:"wrap",
                     paddingTop:"1rem"
                }}>

                    <div className="xc12" style={{fontSize:"1.2rem"}}>  
                            ?????????????????????????????????????????????????????????????????????
                    </div>

                    {/*
                        inputTemplate0.map((i,idx)=>{
                            return (
                                renderInputFromTemplate({
                                    i,idx,
                                })
                            )
                        })
                    */}


                    <div className="xc12" style={{fontSize:"1.2rem"}}>  
                            ???????????????????????????????????????????????????
                    </div>

                    {/*
                        inputTemplate1.map((i,idx)=>{
                            return (
                                renderInputFromTemplate({
                                    i,idx,
                                })
                            )
                        })
                    */}

                </div>

                <div className="xc12" style={{display:"flex",flexWrap:"wrap",
                     paddingTop:"1rem"
                }}>

                    <div className="xc12" style={{fontSize:"1.2rem"}}>  
                            ????????????????????????????????????????????????????????????
                    </div>

                   

                    {/*
                        inputTemplate2.map((i,idx)=>{
                            return(
                                renderInputFromTemplate({
                                    i,idx,
                                })
                            )
                        })
                    */}

                    {/*
                    <div style={{display:"flex",width:"100%",marginBottom:"1rem"}}>
                        <div className="xc1" style={{marginTop:"1rem",fontSize:"1.2rem"}}>  
                            ????????????????????????????????????
                        </div>
                         <FaPlusSquare  className="sm-icon bd-black" 
                            style={{marginBottom:"0",borderRadius:"0",textAlign:"start"}}
                            onClick={e=>insertRowZero()}
                        />
                        <div style={{marginTop:"1rem",fontSize:"1.2rem",width:"30%",textAlign:"right"}}>
                            {`???????????????????????????????????????????????????????????? = ${selectProduct.length}`}
                        </div>
                        <div style={{display:"flex",alignItems:"flex-end"}}>
                            <button 
                                onClick={e=>addToSelectProduct(inputState)}
                            >??????????????????????????????????????????????????????????????????????????????</button>
                        </div>

                        <div style={{display:"flex",alignItems:"flex-end"}}>
                            <button 
                                onClick={e=>deleteSelectProduct()}
                            >????????????????????????????????????????????????????????????????????????</button>
                        </div>
                        

                        <div style={{display:"flex",alignItems:"flex-end"}}>
                            <button 
                                onClick={e=>{
                                    //console.log('pullSelectProduct')
                                    //console.log(selectProduct)
                                    const temp=[...inputState.productData,...selectProduct]
                                    const tempInputState={...inputState,productData:temp}
                                    setInputState(tempInputState)
                                    deleteSelectProduct()
                                }
                                }
                            >????????????????????????????????????????????????????????????????????????????????????</button>
                        </div>
                        

                    </div>
                            */}

                    {/*
                        inputState.productData.map((i,idx)=>{
                            return(
                                renderData(i,idx)
                            )
                        })
                    */}
                
                </div>


        </div>
    )
}


const genArray=(x)=>{
    let tempArray=[]    
    for (let i=0;i<x;i++){
        tempArray=[...tempArray,i]
    }
    return tempArray
}

const genFr=(x)=>{
    let tempString=""
    for (let i=1;i<=x;i++){
        tempString=`${tempString} 1fr`
    }
    return tempString
}

const renderPriceAndUnit =({price,unit})=>{
    const {showPrice,showUnit}=inputState
    if(showPrice&&showUnit){
        return (
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <p className="sticker-p" 
                    style={{textAlign:"center",fontSize:`${inputState.fontSizePrice}px`}}
                >{price}</p>

                <p className="sticker-p" 
                    style={{textAlign:"center",fontSize:`${inputState.fontSizeUnit}px`}}
                >{`/${unit}`}</p>
            </div>
        )
    } 
    else if(showPrice){
        return (
            <p className="sticker-p" 
                style={{textAlign:"center",fontSize:`${inputState.fontSizeUnit}px`}}
            >{`${inputState.price}`}</p>
        )
    }
    else if(showUnit){
        return (
            <p className="sticker-p" 
                style={{textAlign:"center",fontSize:`${inputState.fontSizeUnit}px`}}
            >{`${inputState.unit}`}</p>
        )
    }
    else {
        return null
    }
}


const renderBarcode=(obj,idxs)=>{
    const {code,name,price,unit}=obj

    return(
        
        <div  
             style={{border:inputState.showBorder
                     ?"1px solid rgba(0,0,0,1)"
                     :"1px solid rgba(0,0,0,0)",
                    }}
             key={idxs} >
            <div className="flex-center-center" style={{paddingTop:'3px'}}>
                {inputState.showBarCode
                ?<Barcode
                    value={code}
                    height={inputState.heightB}
                    width={inputState.widthB}
                    displayValue={false}
                    font={"monocode"}
                    marginTop={-1}
                    marginBottom={-1}

                />
                :null
                }
            </div>
            
            {inputState.showCode
            ?<p  className="sticker-p" 
                style={{textAlign:"center",fontSize:`${inputState.fontSizeCode}px`}}
                >{code}</p>
            :null
            }

            {inputState.showName
            ?<p className="sticker-p" 
                style={{textAlign:"center",fontSize:`${inputState.fontSizeName}px`}}
                >{name}</p>
            :null
            }

            {
                renderPriceAndUnit({price:price,unit:unit})
            }
           
        </div>
    )
}



const renderAllBarcode=(obj,idx)=>{
    const {qty,...remaining}=obj
    return(
        genArray(qty).map((i,idx2)=>renderBarcode(remaining,`${idx}-${idx2}`))
    )
}

const renderBarcodePage=({heightP,widthP,
            paddingTopP,paddingBottomP,paddingLeftP,paddingRightP
        })=>{
    return (
        <div className="bgc-white sticker-border" 
        style={{
            height:`${heightP}mm`,
            width:`${widthP}mm`,
            paddingTop:`${paddingTopP}mm`,
            paddingBottom:`${paddingBottomP}mm`,
            paddingLeft:`${paddingLeftP}mm`,
            paddingRight:`${paddingRightP}mm`,


            backgroundColor:"white",
            }}
        >
        
        <div 
            style={{
                width:"100%",
                display:"grid",
                gridTemplateColumns:genFr(inputState.xPerLine),
                gridRowGap:`${inputState.gridRowGap}mm`,
                gridColumnGap:`${inputState.gridColumnGap}mm`
            }}
        >
            {
                inputState.productData.map((obj,idx)=>renderAllBarcode(obj,idx))
            }


        </div>


    </div>
    )
}


return(

<div style={{width:"100%"}}> 


    <div className="hide-on-print" style={{width:"100%",padding:"1rem",marginBottom:"1rem"}}>
        <div style={{display:"flex",marginTop:"1rem"}}>
            
            <button
                onClick={e=>confirmFunc1(inputState)}
            >{isAdd?"????????????????????????????????????????????????":"???????????????????????????????????????????????????????????????"}</button>
            
            {!isAdd
            ?<button
                onClick={e=>confirmFunc2(inputState)}
            >{"???????????????????????????????????????????????????????????? ?????????????????????????????????Id"}</button>
            :null
            }
            <button
                onClick={e=>cancelFunc()}
            >??????????????????????????????</button>
            
        </div>

        {
            renderInput()
        }

    </div>



</div>
)



}
export default Sticker;




/*





        <div className="hide-on-print" style={{width:"100%",padding:"1rem",marginBottom:"1rem"}}>
            <div style={{display:"flex",marginTop:"1rem"}}>
                
                <button
                    onClick={e=>confirmFunc1(inputState)}
                >{isAdd?"????????????????????????????????????????????????":"???????????????????????????????????????????????????????????????"}</button>
                
                {!isAdd
                ?<button
                    onClick={e=>confirmFunc2(inputState)}
                >{"???????????????????????????????????????????????????????????? ?????????????????????????????????Id"}</button>
                :null
                }
                <button
                    onClick={e=>cancelFunc()}
                >??????????????????????????????</button>
             

            </div>
            {
                renderInput()
            }

        </div>

        <div className="sticker-padding" style={{width:"100%"}}>
            {renderBarcodePage({
                heightP:inputState.heightP,
                widthP:inputState.widthP,
                paddingTopP:inputState.paddingTopP,
                paddingBottomP:inputState.paddingBottomP,
                paddingRightP:inputState.paddingRightP,
                paddingLeftP:inputState.paddingLeftP

            })}
        </div>



*/