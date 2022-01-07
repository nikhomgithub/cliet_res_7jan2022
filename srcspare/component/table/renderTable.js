
import React from 'react'
import showUtil from '../../util/showUtil'
import tableUtil from './tableUtil'
import Galleryone from '../galleryone/Galleryone'

import LineForm from './LineForm'
import {MdClose,MdArrowUpward,MdArrowDownward,
       MdSettings,MdSave,MdRadioButtonChecked,MdRadioButtonUnchecked,
       MdCheckBox,MdCheckBoxOutlineBlank,MdEdit

} from 'react-icons/md';

import './Table.css'

const {showArray,showObject} = showUtil
const {sortColumn,numberWithCommas} = tableUtil

const renderTable=({
  colorHead,
  tableTemplate,setTableTemplate,
  filterData,setFilterData,
  editData,setEditData,
  showTable,
  isSubTable,
  sumAmount,
  setShowTableSetting,
  saveTableTemplateFunc,
  updateFilterData,
  useInput,
  basicData,
  findProductIdByKeyDown,
  findBarcodeByKeyDown,
  showSearchHeader,
  XY,setXY,
  captureClientXY,
  calDigit,
  editIconField,
  editIconFieldFunc,
  genObjKeysByColOrder
})=>{

  //console.log('renderTable..................')
  //console.log(tableTemplate)
  //updateFilterData()
  
  const calSumValue=({value,key})=>{
    if(showTable.showSum){
      //console.log(key)
      //console.log(value)
    }
  }

  /*
  const numberWithCommas=(x,caldigit)=>{
    //const temp=x.toString().split(".")
    //console.log(temp)
    if(x){
      const temp=x.toString().split(".")
      const beforeDot=temp[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

      if(temp.length>1){
        return `${beforeDot}.${temp[1]}`
      }
      else{
        return beforeDot
      }
    }
    else if(x===0){
      return 0
    }
  }
*/


  const getEditColor=(i)=>{
    let temp="black"
    if(editData){
      
      if(editData._id==i._id){
        temp="red"
      }

    }
    return temp
  }

  const renderSearchHeader=(tableTemplateI,i)=>{
    console.log('tableTemplateI')

    const filterByString=(value)=>{
        let tempArray=[]

        const word=value
        const suffix="\w*"
        const pattern=suffix+word+suffix

        filterData.map(j=>{
          const result=new RegExp(pattern,"gi").test(j[i])
          if(result){
            tempArray=[...tempArray,j]
          }
        })

        setFilterData(tempArray)
    }
    
    const filterByCheckbox=(value)=>{
        let tempArray=[]

        filterData.map(j=>{
          if(j[i]==value){
            tempArray=[...tempArray,j]
          }
        })

        setFilterData(tempArray)
    }

    const filterByNumber=(value)=>{
        let tempArray=[]

        const pattern=value.toString()

        filterData.map(j=>{
          const result=new RegExp(pattern,"gi").test(j[i])
          if(result){
            tempArray=[...tempArray,j]
          }
        })

        setFilterData(tempArray)
    }


    const {lb,showCol,showColHead,type,width}=tableTemplateI   

    const renderInput=()=>{
      if(type=="boolean"){
        return (
          <div style={{height:"100%",width:"1.7rem",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
            <input type="checkbox"
                   onKeyDown={e=>{
                    if(e.key=="Enter"){
                      filterByCheckbox(e.target.checked)
                    }
                   }}
            />
          </div>
        )
      }
      else if(type=="radio"){
        return null
      }
      else{
        return (
          <input type={type}
                onKeyDown={e=>{
                  if(e.key=="Enter"){
                    if(type=="number"){
                      filterByNumber(e.target.value)
                    }
                    else {
                      filterByString(e.target.value)
                    }
                  }
                }}
          />
        )
      }

    }
    
    return (
        <div className=""
             style={{paddingBottom:"5px",
                     //position:"relative",
                     display:"flex",
                     alignItems:"center",justifyContent:"center",
                     height:"1.9rem"
                    }}
        >
          {
            renderInput()
          }
        </div>
      
      )
  }


  const showContent=(i,j,type,width,children,index1)=>{
    //console.log(children)
    /*
    {showContent(
      i, each line of filterData
      j, each of Object Key
      tableTemplate[j].type,tableTemplate[j].width,
      tableTemplate[j].children)}
    */
    let showColor="black"
    
    if(editData){
      if(i._id==editData._id){
        showColor="red"
      }  
    }

    if(j=="selectedLine"){
      return  i.selectedLine
              ?<div className="w-100 h-100" style={{position:"relative",zIndex:"1"}}
              >
                  <MdRadioButtonChecked className="sm-icon"
                    style={{margin:"5px auto",width:"100%"}}
                    onClick={e=>{
                      //console.log('onClick')
                      //console.log(i)
                      updateFilterData(index1,{...i,selectedLine:false})
                    }}
                  />
                  
                  <p className="table-p" 
                     style={{position:"absolute",top:"0"}}>{index1+1}</p>
                    
                </div>
              :<div className="w-100 h-100" style={{position:"relative",zIndex:"1"}}
              >
                  <MdRadioButtonUnchecked className="sm-icon"
                    style={{margin:"5px auto",width:"100%"}}
                    onClick={e=>{
                      //console.log('onClick')
                        //console.log(i)
                      updateFilterData(index1,{...i,selectedLine:true})
                    }}
                  />
                  
                  <p className="table-p" 
                    style={{position:"absolute",top:"0"}}>{index1+1}</p>
                  
              </div>
    }
    else if(type=="array"){
      return <p className="table-p"
                style={{color:showColor,margin:"0.1rem 0"}}>
        {showArray(i[j])}</p>
    }
    else if(type=="arrayObject"){
      return( i[j].map((k,idx)=>{
        return (
        <p className="table-p" 
          style={{color:showColor,margin:"0.1rem 0"}} key={idx}>
          {showObject(k,children)}</p>
        )}
      ))

    }else if(type=="arrayPhoto"){
      
      return(  
        <Galleryone imgarrs={i[j]} width={width}/>
      )
    }
    //<p style={{color:showColor,margin:"0.5rem 0"}} >{i[j]?`จริง`:`เท็จ`}</p>
    //(i[j]?<MdCheckBox/>:<MdCheckBoxOutlineBlank/>)
    else if(type=="boolean"){
      return <div className="flex-center-center" style={{marginTop:"0.3rem"}}>
              {i[j]
              ?<MdCheckBox className="sm-icon"/>
              :<MdCheckBoxOutlineBlank className="sm-icon"/>
              }
            </div>
    }
    else if(type=="date"){
      let tempDate=null
      if(i[j]){
        const date1=new Date(i[j]).toISOString()
        const date2=new Date(date1).toLocaleString('en-GB')

        tempDate= date2.substring(0,10)

      }
      return  <p  className="table-p"
                 style={{color:showColor,margin:"0.1rem 0"}} >
        {tempDate
        /*?`${i[j].substring(8,10)}-${i[j].substring(5,7)}-${parseInt(i[j].substring(0,4))+543}`*/
        ?`${tempDate}`
        :null
        }</p>
    }
     
    else if(type=="time"){
      let tempTime=null
      if(i[j]){
        const date1=new Date(i[j]).toISOString()
        const date3=new Date(date1).toLocaleString('en-GB')
        tempTime=date3.substring(12,17)
      }
      return  <p className="table-p"
                  style={{color:showColor,margin:"0.1rem 0"}} >
        {tempTime
        ?`${tempTime}`
        :null
        }</p>
    }
    
    else if(j=="point"||j=="totalPoint"){
      return <p className="table-p"
                style={{color:showColor,margin:"0.1rem 0"}}>
            {numberWithCommas(i[j],calDigit,j)}
          </p>
    }
    else if(type=="price"||j=="result"||j=="quantity"||
            j=="price"||j=="total"||j=="grandTotal"||
            j=="totalReduction"||j=="totalTax"
            ){
      return <p className="table-p"
                  style={{color:showColor,margin:"0.1rem 0"}}>
              {
                numberWithCommas(i[j],calDigit,j)
              }
        </p>
    }
    else if(type=="number"){
      return <p className="table-p"
                  style={{color:showColor,margin:"0.1rem 0"}}>{i[j]}</p>
    
  }
    else if(type=="object"){
      return null
    }
    else{
      return <p className="table-p" 
              style={{color:showColor,margin:"0.1rem 0"}}>{i[j]}</p>
    }
  }

  const handleChange=(i,value)=>{
      let temp=tableTemplate[i]
      temp={...temp,width:value}
      setTableTemplate({...tableTemplate,[i]:temp}) 
  }

  const renderToolBarForColumn=(i)=>{
    return(
      <div className=""
      style={{
          width:"300px",
          height:"70px",
          backgroundColor:"#3b5d52",
          borderRadius:"15px",
          boxShadow:"5px 5px 10px",
          position:"absolute",
          top:`80px`,
          left:`0px`,
          zIndex:"600"
      }}    
  >  
    <input 
      style={{width:"100%"}}
      type="range" min="10" max="1000" 
      value={tableTemplate[i].width}
      onChange={e=>{
          //console.log('i...........')
          //console.log(i)
          //console.log(e.target.value)
          handleChange(i,e.target.value)
        }} 
    />
    <div style={{width:"100%",display:"flex",
           alignContent:"center",justifyContent:"space-around"}}>
          <MdSettings
              className="md-icon"
              onClick={e=>{
                if(setShowTableSetting){
                  setShowTableSetting(true)
                }
              }}
          />
          <MdSave
              className="md-icon"
              onClick={e=>{
                saveTableTemplateFunc(tableTemplate)
              }}
          />
      
          {isSubTable
          ?null
          :<MdArrowDownward 
            className="md-icon"
            onClick={e=>{
              const temp=
                sortColumn(filterData,i,tableTemplate[i].type,"a-b")
                //console.log('temp')
                //console.log(temp)  
              if(Array.isArray(temp)){
                setFilterData(temp)
              }                              
            }}
          />
          }
          {isSubTable
          ?null
          :<MdArrowUpward 
            className="md-icon"
            onClick={e=>{
              const temp=
                sortColumn(filterData,i,tableTemplate[i].type,"b-a")
              //console.log('temp')
              //console.log(temp)
              if(Array.isArray(temp)){
                setFilterData(temp)
              }                              
            }}
          />
          }
          <MdClose 
            className="md-icon"
            onClick={e=>{
              let temp=tableTemplate[i]
              let tempBool=tableTemplate[i].showColHead
              temp={...temp,showColHead:!tempBool}
              setTableTemplate({...tableTemplate,[i]:temp})

            }}
          />
    </div>
  </div>
    )
  }

  //-------------------------------

 
  const objKeys = genObjKeysByColOrder(tableTemplate)//Object.keys(tableTemplate);

  return(
  //Frame //overflow-hide-on-print
  <div className="w-100 h-100 overflow-hide-on-print"
       style={{padding:"0 0 2rem 0"}}
  >

    {/*Track*/}
    <div style={{width:`${showTable.width}px`}}>   
  

    {/*Table Head*/}
    <div className="TableGrid-head" 
        style={{display:"grid",
                 gridTemplateColumns:showTable.gridCol,
                 gridAutoRows:"minmax(1rem,auto)",
                 position:'sticky',top:'0',
                 backgroundColor:colorHead,
                 zIndex:"10"
              }}> 
      { objKeys.map((i,index)=>{
          
        return(
          tableTemplate[i].showCol
          ?<div 
              key={index}
              style={{
                  width:`${tableTemplate[i].width}px`,
                  padding:"0 0.3rem",
                  position:"relative",
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-around',
              }}   
          >   
          {tableTemplate[i].showColHead 
            ?null
            :renderToolBarForColumn(i)
          }
              
          { 
            tableTemplate[i].showColHead  
            ?<div className="w-100">

                <p className="tablehead-p"
                   style={{textAlign:"center"}}
                  onClick={e=>{  
                    //console.log('----------')
                    //console.log(e.clientX)
                    //console.log(e.clientY)
                    //setXY({x:e.clientX,y:e.clientY})

                    let temp=tableTemplate[i]
                    let tempBool=tableTemplate[i].showColHead
                    temp={...temp,showColHead:!tempBool}
                    setTableTemplate({...tableTemplate,[i]:temp})
                  }}
                >{tableTemplate[i].lb}</p>
                { 
                  showSearchHeader
                  ?renderSearchHeader(tableTemplate[i],i)
                  :null
                }
             </div>
            :
              <div className="flex-center-center flex-no-wrap"
              >
                <MdClose className="md-icon"
                  onClick={e=>{
                    //console.log('MdClose')
                    //console.log(`x=${e.clientX} y=${e.clientY}`)
                    let temp=tableTemplate[i]
                    let tempBool=tableTemplate[i].showColHead
                    temp={...temp,showColHead:!tempBool}
                    setTableTemplate({...tableTemplate,[i]:temp})
                    
                  }}
                className="md-icon"/>
               
              </div>                   
            }
          </div>
          :null
        )
      })}
    </div>
  
    {/*Table Body*/} 
    {filterData.map((i,index1)=> {
      let passCheck=false
      if( (editData)&&(useInput) ){
        if(editData._id==i._id){
          passCheck=true
        }
      }
            
      if(passCheck){
        return (
          <LineForm
            i={i}
            key={index1}
            idx={index1}
            objKeys={objKeys}
            tableTemplate={tableTemplate}
            showTable={showTable}
            updateFilterData={updateFilterData}
            basicData={basicData}
            findProductIdByKeyDown={findProductIdByKeyDown}
            findBarcodeByKeyDown={findBarcodeByKeyDown}
            calDigit={calDigit}
          />
        )
      }
      else {
        return(
            <div  key={index1} 
                className="TableGrid-body" 
                style={{display:"grid",
                    gridTemplateColumns:showTable.gridCol,
                    //gridAutoRows:minmax("10px,auto"),//dfsf
                }}
                
            >    
              {objKeys.map((j,index2)=>
                  tableTemplate[j].showCol
                  ?<div 
                      key={index2}
                      style={{
                          display:"flex",
                          textAlign:"left",
                          width:`${tableTemplate[j].width}px`,
                      }}

                      onClick={e=>{
                        //setEditData(null)
                        if(tableTemplate[j].type!="radio"){
                          setEditData(i,e)
                          captureClientXY(e.clientX,e.clientY)
                        }
                    }}
                  >
                  {showContent(i,j,
                    tableTemplate[j].type,
                    tableTemplate[j].width,
                    tableTemplate[j].children,
                    index1
                    )}

                    {
                      editIconField==j&&
                      <MdEdit className="sm-icon"
                              style={{color:getEditColor(i)}}
                              onClick={e=>{
                                editIconFieldFunc(i)
                              }}
                      />
                    }


                  </div>
                  
                  :null
              )}
            </div>
        )
      }
    })}
  
    {/*Table Footer*/}
    {
      sumAmount
      ? <div 
            className="TableGrid-body" 
            style={{display:"grid",
                gridTemplateColumns:showTable.gridCol,
                //gridAutoRows:"minmax(1rem,auto)",
                backgroundColor:"#2184A0"
            }}

        >    
          {objKeys.map((k,index3)=>{
            
            let tempCheck=false
            if(tableTemplate[k].type=="number"){
              if(k.includes("id")||k.includes("Id")||k=="queue"){
                tempCheck=false
              }
              else{
                tempCheck=true
              }
            }

            return tableTemplate[k].showCol
            
                  ?<div 
                      key={index3}
                      style={{
                          textAlign:"left",
                          width:`${tableTemplate[k].width}px`,
                      }}
                  >
                      {
                        tempCheck
                        ?numberWithCommas(sumAmount[k],calDigit,k)
                        :null
                      }
                  </div>
                  :null
          })}
      </div>
      :null
    }            
    </div>
  </div>
  
  )
}
export default renderTable



/*

    {
      sumAmount
      ? <div 
            className="TableGrid-body" 
            style={{display:"grid",
                gridTemplateColumns:showTable.gridCol,
                //gridAutoRows:"minmax(1rem,auto)",
                backgroundColor:"#2184A0"
            }}

        >    
          {objKeys.map((k,index3)=>{
            
            let tempCheck=false
            if(tableTemplate[k].type=="number"){
              if(k.includes("id")||k.includes("Id")){
                tempCheck=false
              }
              else{
                tempCheck=true
              }
            }

            return tableTemplate[k].showCol&&tempCheck
              ?<div 
                  key={index3}
                  style={{
                      textAlign:"left",
                      width:`${tableTemplate[k].width}px`,
                  }}
              >
                <div>
                  {
                    k
                    //numberWithCommas(sumAmount[k],calDigit,k)
                  }
                </div>
              </div>
              :<div style={{opacity:"1"}}>
                {k}
              </div>
          })}
      </div>
      :null
    }            


*/