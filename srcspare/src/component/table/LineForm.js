import React from 'react';
import {MdClose, MdRadioButtonChecked,MdRadioButtonUnchecked} from 'react-icons/md';
import {FaTags} from 'react-icons/fa'
import jsImageCompressor from 'js-image-compressor';
//=================================
function LineForm(props) {

const {i,idx,objKeys,tableTemplate,showTable,
       updateFilterData,basicData,
       findProductIdByKeyDown,findBarcodeByKeyDown,calDigit
}=props

console.log('LineForm i....')

//console.log(i)
let [inputState,setInputState]=React.useState(i)

const [showTag,setShowTag]=React.useState(false)

React.useEffect(()=>{
   setInputState(i)
},[i])


const priceLevelHeadCell={
        padding:"0.3rem",
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:"0.8rem",
        border:"0.5px solid #777"
}

const priceLevelHead={
        display:"grid",
        gridTemplateColumns:"100px 200px",
        gridAutoRows:"1.2rem",
        backgroundColor:"#ccc"
}

const priceLevelBody={
    display:"grid",
    gridTemplateColumns:"100px 200px",
    gridAutoRows:"1.2rem",
    backgroundColor:"white"
}

const renderSelectOption=(j)=>{
    //console.log(j)
    //console.log(basicData)
    //console.log(basicData[j])
    if(basicData){
        return basicData[j].map((i,index)=>(
                <option key={index} value={i}>{i}</option>
            )
        )
    }
    else {
        return null
    }
}
//<option selected="selected"> {inputState[j]}</option>


const renderSelect=(j)=>{
    return(
        <select style={{height:"100%",backgroundColor:"#e6ffcc"}} 
            defaultValue={inputState[j]}
            onChange={e=>{
                setInputState({...inputState,[j]:e.target.value})
                updateFilterData(idx,{...inputState,[j]:e.target.value})
            }}
        >
            <option value="" hidden>list below...</option>
            <option selected> {inputState[j]}</option>
            {
                renderSelectOption(j)
            }

        </select>       
    )
}


/*

 return (
        <select className="w-100"
            style={{height:"1.5rem"}}
            value={inputState[j]}
            onChange={e=>{

            }}
            >  
                <option value="" hidden>list below...</option>
                {
                    //renderSelectCondition()
                }
    
    
            </select>
        )

*/

const renderRadio=(idx,inputState_j)=>{
    //return <input type="radio"/>
    
    if(inputState_j){
        return <MdRadioButtonChecked className="sm-icon"
            onClick={e=>{
                setInputState({...inputState,selectedLine:false})
                updateFilterData(idx,{...inputState,selectedLine:false})
            }}
        />
    }
    else{
        return <MdRadioButtonUnchecked className="sm-icon"
            onClick={e=>{
                setInputState({...inputState,selectedLine:true})
                updateFilterData(idx,{...inputState,selectedLine:true})
            }}
        />
    }
}




const renderInput=(j)=>{
  
    if(tableTemplate[j].type=="boolean"){
        return (
        <div className="flex-center-center" style={{height:"100%",width:"100%"}}>
            <div style={{height:"80%",width:"1.2rem"}}>
             <input 
                type="checkbox"
                checked={inputState[j]}
                style={{margin:"0",padding:"0"}}
                onChange={e=>{
                    const temp={...inputState,[j]:e.target.checked}
                    setInputState(temp)
                }}
                onBlur={e=>{
                    updateFilterData(idx,inputState)
                }}
            />
            </div>
        </div>
        )
    }

    else if(tableTemplate[j].type=="price"){

        //console.log('price inputState.....................')
        //console.log(inputState)
        //console.log(inputState.priceLevel)
        //console.log(tableTemplate[j].type)

        return(
            <div className="flex-center-center h-100 w-100" style={{position:"relative"}}>
                {showTag
                ?<div style={{backgroundColor:"white",
                             position:"absolute",top:"2.5rem"
                            }}
                 >
                    
                    <div style={priceLevelHead}>    
                        <div style={priceLevelHeadCell}>    
                                ราคา
                        </div>

                        <div style={priceLevelHeadCell}>    
                                หมายเหตุ
                        </div>
                    </div>

                    {
                 
                        inputState.priceLevel.map((l,index3)=>{
                            return(
                            <div key={index3} style={priceLevelBody}
                                 onClick={e=>{
                                    
                                    //calDigit
                                    let myvalue=parseInt(l.price*calDigit)/calDigit
                                    //}
                                    const tempInputState={...inputState,
                                        ["price"]:myvalue,
                                        ["result"]:parseInt(myvalue*inputState.quantity*calDigit)/calDigit
                                    }

                                    //const tempInputState={...inputState,['price']:l.price}
                                    //console.log('tempInputState')
                                    // console.log(tempInputState)

                                    setInputState(tempInputState)
                                    setShowTag(false)
                                    updateFilterData(idx,tempInputState)

                                 }}
 
                    
                            >    
                                <div style={priceLevelHeadCell}>    
                                    {l.price}
                                </div>
        
                                <div style={priceLevelHeadCell}>    
                                    {l.remark}
                                </div>
                            </div>
                            )
                        })
                        
                    }

                </div>
                :null
                }
                <div className="w-15" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>     
                    <FaTags
                        onClick={e=>{
                             setShowTag(!showTag)
                        }}
                    />
                </div>
                <div className="w-85 h-100">
                    <input value={inputState[j]} 
                        checked={inputState[j]}
                        style={{height:j=="selectedLine"?"50%":"100%",
                                backgroundColor:"#e6ffcc"}}
                        type={"number"}
                        onChange={e=>{
                            if(tableTemplate[j].type!="radio"){
                                //console.log('aaaa')
                                //let myvalue=e.target.value
                                //if(tableTemplate[j].type=="number"){

                                //calDigit
                                let myvalue=parseInt(e.target.value*calDigit)/calDigit
                                //}
                                const temp={...inputState,
                                        [j]:myvalue,
                                        ["result"]:parseInt(myvalue*inputState.quantity*calDigit)/calDigit
                                    }

                                setInputState(temp)
                            }
                        }}
                        onBlur={e=>{
                            updateFilterData(idx,inputState)
                        }}
                    />
                </div>
            </div>
        )
    }

    else {

        if( (j=="unit")||(j=="jobStatus")||(j=="effectSpending")||
            (j=="effectCustomerPoint") ||(j=="effectStock")||(j=="position") ){
            return renderSelect(j)
        }
        else if(j=="id"||j=="barcode"){
            return (
                <input value={inputState[j]} 
                    style={{height:"100%",
                            backgroundColor:"#e6ffcc"
                           }} 
                    
                    type={tableTemplate[j].type}
                    onChange={e=>{
                        
                        let temp
                        let myvalue=e.target.value

                        temp={...inputState,[j]:myvalue}
                        setInputState(temp)
                        
                    }}

                    onKeyDown={e=>{
                        if(j=="id"){
                            findProductIdByKeyDown(e,j,inputState[j],idx)
                        }
                        if(j=="barcode"){
                            findBarcodeByKeyDown(e,j,inputState[j],idx)
                        }
                    }}

                    onBlur={e=>{
                        updateFilterData(idx,inputState)
                    }}
                />
            )
        }
    
        else {
            return (

                <input value={inputState[j]} 
                    checked={inputState[j]}
                    style={{height:j=="selectedLine"?"50%":"100%",
                            backgroundColor:"#e6ffcc"
                           }} 
                    
                    type={tableTemplate[j].type}
                    onChange={e=>{
                        if(tableTemplate[j].type!="radio"){
                            //console.log('aaaa')
                            let temp
                            let myvalue=e.target.value
                            if(tableTemplate[j].type=="number"){
                               
                                if(j=="price"){
                                    
                                    //calDigit
                                    myvalue=parseInt(e.target.value*calDigit)/calDigit
                                    temp={...inputState,
                                          [j]:myvalue,
                                          "result":parseInt(inputState.quantity*myvalue*calDigit)/calDigit
                                         }
                                    setInputState(temp)
                                }
                                else if(j=="quantity"){
                                    //myvalue=parseInt(e.target.value)
                                    //calDigit
                                    myvalue=parseInt(e.target.value*calDigit)/calDigit
                                    temp={...inputState,
                                        [j]:myvalue,
                                        "result":parseInt(inputState.price*myvalue*calDigit)/calDigit
                                    }
                                    setInputState(temp)
                                }
                                else {
                                    temp={...inputState,[j]:myvalue}
                                    setInputState(temp)
                                }
                              
                            }

                            else {
                                temp={...inputState,[j]:myvalue}
                                setInputState(temp)
                            }
                            
                        }
                    }}
                    onBlur={e=>{
                        updateFilterData(idx,inputState)
                    }}
                />
            )
        }
    }
}

//==========================
return(
<div 
    className="TableGrid-body" 
    style={{display:"grid",
        gridTemplateColumns:showTable.gridCol,
        gridAutoRows:"minmax(2rem,auto)"
    }}
   
>    
  
    {objKeys.map((j,index2)=>
            tableTemplate[j].showCol
            ?<div 
                key={index2}
                style={{
                    textAlign:"left",
                    width:`${tableTemplate[j].width}px`,
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:"#e6ffcc"
                }}
                onClick={e=>{
                    /*
                    if(tableTemplate[j].type=="radio"){
                        setInputState({...inputState,[j]:!inputState[j]})
                    }
                    */
                }}
            >

                {
                tableTemplate[j].type=="radio"
                ?renderRadio(idx,inputState[j])
                :renderInput(j)
                }

            </div>
            :null
    )}

</div>

)
}

LineForm.defaultProps={
  calDigit:100
}





export default LineForm;

