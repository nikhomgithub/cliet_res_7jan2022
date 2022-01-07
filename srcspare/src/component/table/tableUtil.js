const tableResize=({tableTemplate/*,showTable,setShowTable*/})=>{

    if(tableTemplate){
       

        let tempWidth=0;
        let tempGridCol=""
    
        const objKeys = Object.keys(tableTemplate);
        
        objKeys.map(i=>{
          if(tableTemplate[i].showCol){
            tempWidth=tempWidth+parseInt(tableTemplate[i].width);
            tempGridCol=`${tempGridCol} ${tableTemplate[i].width}px`
          }
        })  

        return {width:tempWidth,gridCol:tempGridCol}
    }
    else {
      console.log('tableTemplate null')
      return null
    }
      

}
//========================================

/*
const tableResize=({tableTemplate})=>{
  if(tableTemplate){
  
      let tempWidth=0;
      let tempGridCol=""
  
      const objKeys = Object.keys(tableTemplate);
      
      objKeys.map(i=>{
        if(tableTemplate[i].showCol){
          tempWidth=tempWidth+parseInt(tableTemplate[i].width);
          tempGridCol=`${tempGridCol} ${tableTemplate[i].width}px`
        }
      })  

      return {width:tempWidth,gridCol:tempGridCol}
  
      //setShowTable({...showTable,width:tempWidth,gridCol:tempGridCol})
    }
    

}
*/
//========================================

const numberWithCommas=(x,calDigit,k)=>{
  //console.log('numberWithCommas')
  //console.log(`x: ${x}, calDigit : ${calDigit}, k: ${k}`)

  //const temp=x.toString().split(".")
  //console.log(temp)
  let n=2
  try{
    if(x>0&&!isNaN(x)){

      if(calDigit==1){n=0}
      else if(calDigit==10){n=1}
      else if(calDigit==100){n=2}
      else if(calDigit==1000){n=3}
      else if(calDigit==10000){n=4}
    

      //console.log(`n: ${n}`)

      //const tmx.toFixed(n)
      const temp=x.toFixed(n).toString().split(".")
      const beforeDot=temp[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

      if(temp.length>1){
        return `${beforeDot}.${temp[1]}`
      }
      else{
        return beforeDot
      }
    }
    else if(x===0){
      return "0.00"
    }
    else{
      return "0.00"
    }
  }
  catch (error){
    console.log(typeof x)
    console.log(x)
    console.log(error)
  }
}

//=========================================
const sortColumn=(filterData,colName,colType,sortType)=>{
  //console.log('sortColumn')
  if(! (colType=="number"||
       colType=="date"||
       colType=="string"||
       colType=="time"||
       colType=="price")
  ){
    return
  }

  let tempArray=[]
  let tempFilterData=[]
 
  filterData.map(i=>{
    //this Array will be sorted
    if(colType=="number"){
      tempArray=[...tempArray,parseInt(i[colName])]
    }
    if(colType=="string"||colType=="date"){
      tempArray=[...tempArray,i[colName]]
    }

    //Add ["<checked/>"] filed to tempFilterData
    let tempI={...i,["<checked/>"]:false}
    tempFilterData=[...tempFilterData,tempI]
  })

  if (colType=="number") {    
    if(sortType=="a-b"){
      tempArray.sort(function(a, b){return a - b});
      //console.log('a-b')
    }
    if(sortType=="b-a"){
      tempArray.sort(function(a, b){return b - a});
      //console.log('b-a')
    }
  }

  if (colType=="string"||colType=="date") {
    if(sortType=="a-b"){
      tempArray.sort();
    }
    if(sortType=="b-a"){
      tempArray.sort();
      tempArray.reverse();
    }
  }

  let tempResult=[]

  tempArray.map(i=>{
    
    for (let j=0;j<tempFilterData.length;j++){
      if(!tempFilterData[j]["<checked/>"]){
        if(i==tempFilterData[j][colName]){
          tempResult=[...tempResult,filterData[j]]
          tempFilterData[j]["<checked/>"]=true
          break;
        }
      }
    }

  })
  return tempResult    
}

//=======================================

const tableUtil={tableResize,sortColumn,numberWithCommas}

export default tableUtil
