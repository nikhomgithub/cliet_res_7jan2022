import React from 'react';
import { BsTelephoneForward } from 'react-icons/bs';
import {FaFolderPlus,FaFolder,FaFolderOpen,FaCheck,FaBan,
       FaCaretDown,FaCaretUp,FaLaptopHouse} from 'react-icons/fa';
import {MdSearch} from 'react-icons/md';

function ModalNewTreeForm(props) {

const {tree,loadData,submitFunc,cancelFunc,pageData,
      setTree,openUpFolder,closeFolder,checkLevel,findMinMax,
      findMainGroupMinMax,getParent,changeParent,getParentPart,
      isAdd
} = props

/*
const groupAddForm={
      formHead:"เพิ่มกลุ่ม",
      id:"ไอดี",
      gcode:"โค้ดกลุ่ม",
      groupName:"ชื่อกลุ่ม",
      level:"ระดับกลุ่ม"
}
*/

let [inputState,setInputState]=React.useState(loadData)

React.useEffect(()=>{
   //console.log('inputState')
   //console.log(inputState)
},[inputState])

let [arrayState,setArrayState]=React.useState({
   deletArray:null,
   updateArray:null
})

const [selectGroup,setSelectGroup]=React.useState({
   id:0,
   gcode:null,
   groupName:"",
   level:0
})

React.useEffect(()=>{
   console.log('selectGroup.....')
   console.log(selectGroup)
   
   if(selectGroup.gcode!=null){
      if(isAdd){
         //console.log(findNextChildOfParent(tree,selectGroup))
         genCode(selectGroup)
      }
      else{
         //console.log(findNextChildOfParent(tree,selectGroup))
         genAllFamilyGroup(selectGroup)
      }
   }
},[selectGroup])

const checkSelectGroupColor=(i)=>{
   let color={color:"black"}
   if(selectGroup){
      if(selectGroup.id==i.id){
         color={color:"green"}        
      }
   }
   if(inputState){
      if(inputState.id==i.id){
         color={color:"red"}        
      }
   }

   return color
}


//

const findParent=(loadData)=>{
   if(loadData.level>1){
      let temp=loadData.gcode.toString()
      if(temp.length==15){
         temp=`0${temp}`
      }
      const parentLevel=loadData.level-1
      let tempParent=temp.substring(0,parentLevel*2)+'0000000000000000'
      tempParent=parseInt(tempParent.substring(0,16))
      return tempParent
   }
   else{
      return null
   }
}


//-----------------------------
const findMaxLevel=(minGcode,maxGcode)=>{
   let maxLevel=0

   tree.map((i,idx)=>{
       
      if( (i.gcode>=minGcode)&&(i.gcode<=maxGcode) ){
            if(i.level>maxLevel){
               maxLevel=i.level
            }
      }
   })
   return maxLevel
}

//1 00 00 00 00 00 00 00
const findNextChildOfParent=(tree,parent)=>{
   if(parent.level<=7){

      const temp1=findMinMax(parent.gcode,parent.level)      
      const temp1Min=temp1.minGcode
      const temp1Max=temp1.maxGcode   
      let tempArray=[]
      
      tree.map(i=>{
         if( i.gcode>=temp1Min&&
            i.gcode<=temp1Max&&
            i.level==(parent.level+1)
            ){
               let tempString=i.gcode.toString()
               if(tempString.length==15){
                   tempString=`0${tempString}`
               }
               const meLevel=parent.level+1
               const tempGcode=parseInt(tempString.substring(meLevel*2-2,meLevel*2))
               tempArray=[...tempArray,tempGcode]
         }
      })  
      tempArray=tempArray.sort()

      let nextGcode=1
      if(tempArray.length>0){
         nextGcode=tempArray[tempArray.length-1]+1
      }
      //console.log('tempArray....')
      //console.log(tempArray)
      if(nextGcode>=100){
         
         let foundGCode

            for(let i=1;i<=99;i++){
               foundGCode=false

               for (let j=0;j<=tempArray.length-1;j++){
                  if(i==tempArray[j]){
                     foundGCode=true
                     //console.log(`match ${i}`)
                     break
                  }
               }               
               if(foundGCode==false){
                   //console.log(`${i}...OKKKK.`)
                   nextGcode=i
                   break
               }
            }

         if(foundGCode){
            return null
         }
      }
      return nextGcode
   }
   else{
      return null
   }
}
//-------------------------------
const findAllChildren=(tree,minGcode,maxGcode,inputState)=>{
   
   //const childLevel=loadData.level+1
   let deleteArray=[inputState.gcode]
   let updateArray=[inputState]

   tree.map(i=>{
      if( i.gcode>=minGcode&&i.gcode<=maxGcode ){

         deleteArray=[...deleteArray,i.gcode]
         updateArray=[...updateArray,i]
      }
   })
   return {updateArray,deleteArray}
}
//-------------------------------
const genAllFamilyGroup=(newParent)=>{
   
   const temp2=findMainGroupMinMax(loadData.gcode,loadData.level)
   const temp2Min=temp2.minGcode
   const temp2Max=temp2.maxGcode 
   const temp3MaxLevel=findMaxLevel(temp2Min,temp2Max)

   const tempChildren=findAllChildren(tree,temp2Min,temp2Max,inputState)

   if (newParent.level==0){
      //case1......................................
      console.log('case1')
      const childLevel=inputState.level+1
      const difLevel=inputState.level-1
      let newMePart=findNextChildOfParent(tree,newParent)

      if(newMePart){
         
         if(newMePart>=1&&newMePart<=9){
            newMePart="0"+parseInt(newMePart)
         }  
         else{
            newMePart=parseInt(newMePart)
         }

         let tempArray=[]
        
         tempChildren.updateArray.map(i=>{
            //console.log(i)
            let tempString=i.gcode.toString()
            if(tempString.length==15){
                tempString=`0${tempString}`
            }
            
            let newGcode=newMePart+tempString.substring(childLevel*2-2,16)+"0000000000000000"   
            newGcode=parseInt(newGcode.substring(0,16))

            const tempObj={...i,gcode:newGcode,level:i.level-difLevel}
            tempArray=[...tempArray,tempObj]
         })

         setArrayState({
            deleteArray:tempChildren.deleteArray,
            updateArray:tempArray
         })
        
      }
   }
   else if( (newParent.level<loadData.level)||
            (temp3MaxLevel-loadData.level+1+newParent.level<=8)
          )
   {
      //case2.................................
      console.log('case2')
      
      let tempNewParent=newParent.gcode.toString()
      if(tempNewParent.length==15){
          tempNewParent=`0${tempNewParent}`
      }
      let parentPart=tempNewParent.substring(0,newParent.level*2)

      let newMePart=findNextChildOfParent(tree,newParent)
      if(newMePart){
         if(newMePart>=1&&newMePart<=9){
            newMePart="0"+parseInt(newMePart)
         }  
         else{
            newMePart=parseInt(newMePart)
         }
      }
      else{
         return
      }

      const childLevel=inputState.level+1

      let tempArray=[]
      tempChildren.updateArray.map(i=>{
         //console.log(i)
         let tempString=i.gcode.toString()
         if(tempString.length==15){
             tempString=`0${tempString}`
         }
               
         let newGcode=parentPart+newMePart+tempString.substring(childLevel*2-2,16)+"0000000000000000"   
         newGcode=parseInt(newGcode.substring(0,16))

         const tempObj={...i,
                        gcode:newGcode,
                        level:newParent.level+(i.level-inputState.level+1)
                     }
         tempArray=[...tempArray,tempObj]

      })

      setArrayState({
         deleteArray:tempChildren.deleteArray,
         updateArray:tempArray
      })
   
   }
   
   else {
      //case3....................................
      console.log('case reject')
   }
}

//-------------------------------
const genCode=(parent)=>{

   if(parent.level==0){

      let nextGcode=findNextChildOfParent(tree,parent)

      if( (nextGcode>=1)&&(nextGcode<=99) ){
         nextGcode=nextGcode.toString()+"00000000000000"
         const newGcode=parseInt(nextGcode)

         const tempObj={
            id:newGcode,
            gcode:newGcode,
            level:1,
         }

         setInputState({...inputState,...tempObj})
      }
   }
   else if(parent.level<=7){
     
      const nextGcode=findNextChildOfParent(tree,parent)

      let mePart=""
      if(nextGcode>=1&&nextGcode<=9){
         mePart="0"+nextGcode.toString() 
      }
      else if(nextGcode>=19&&nextGcode<=99){
         mePart=nextGcode.toString() 
      }
      else{
         return
      }

      let tempParent=parent.gcode.toString()
      if(tempParent.length==15){
          tempParent=`0${tempParent}`
      }
      
      const parentPart=tempParent.substring(0,parent.level*2)

      let newGcode=parentPart+mePart+"0000000000000000"

      newGcode=parseInt(newGcode.substring(0,16))

      const tempObj={
         id:newGcode,
         gcode:newGcode,
         level:parent.level+1,
      }
      setInputState({...inputState,...tempObj})
   }
}

const renderBody=()=>{
   return (
      <div className="w100 h-100" style={{display:"flex"}}>
         
         <div className="" 
              style={{width:"50%",height:"100%",padding:"0.5rem",
                      overflowY:"scroll",overflowX:"auto"}}>
            <h4>{pageData.treeTitle}</h4>
            <div style={{display:"flex"}}>

               <FaFolderOpen className="sm-icon"/>
               <div  style={{color:selectGroup.gcode==0?"green":"black"}}
                     onClick={e=>{
                        const temp={
                           gcode:0,
                           level:0
                        }
                        setSelectGroup(temp)
               }}>
                  ##0
               </div>
            </div>
           
            {
            renderTree(tree)
            }
         </div>

         <div className="" style={{width:"50%",padding:"0.5rem"}}>

               <div className="flex-center-center jc-start w-100"
                    style={{marginBottom:"0.5rem"}}
               >
                   <div className="xc4">
                     {pageData.id}
                   </div>
                   <div className="xc8">
                       <input
                           value={inputState.id}
                           disabled={"disaled"}
                       />
                   </div>
               </div>

               <div className="flex-center-center jc-start w-100"
                     style={{marginBottom:"0.5rem"}}
               >
                   <div className="xc4">
                       {pageData.gcode}
                   </div>
                   <div className="xc8">
                       <input
                           value={inputState.gcode}
                           disabled={"disaled"}
                       />
                   </div>
               </div>

               <div className="flex-center-center jc-start w-100"
                     style={{marginBottom:"0.5rem"}}
               >
                   <div className="xc4">
                     {pageData.level}
                   </div>
                   <div className="xc8">
                       <input
                           value={inputState.level}
                           disabled={"disaled"}
                       />
                   </div>
               </div>

               <div className="flex-center-center jc-start w-100"
                     style={{marginBottom:"0.5rem"}}
               >
                   <div className="xc4">
                     {pageData.groupName}
                   </div>
                   <div className="xc8">
                       <input
                           value={inputState.groupName}
                           onChange={e=>{
                              setInputState({...inputState,
                                 groupName:e.target.value
                              })
                           }}
                       />
                   </div>
               </div>
         </div>
      </div>
   )
}

const renderTree=(array)=>{
   return(
      array.map((i,idx)=>{
         const {id,show,gcode,level,groupName,
                open,haveChild}=i
         return (
         show
         ?<div key={idx}
               style={{display:"flex",marginLeft:`${level}rem`}}>
                 {open
                 ?<FaFolderOpen className="sm-icon"
                     onClick={e=>{
                         setTree(closeFolder(i))
                     }}
                  />
                 :haveChild
                     ?<FaFolderPlus className="sm-icon"
                         onClick={e=>{
                             openUpFolder(i)
                             .then(result=>setTree(result))
                         }}
                     />
                     :<FaFolder className="sm-icon"/>
                 }
                  <div style={checkSelectGroupColor(i)}
                        onClick={e=>{
                           //console.log('pppppppp')
                           //console.log(i)
                          
                           if(isAdd){
                              if(i.level<=7){
                                 setSelectGroup(i)
                              }
                           } 
                           else{
                              if((loadData.gcode!=i.gcode)&&(i.level<=7)&&(loadData.id!=i.id)){
                                 const temp2=findParent(loadData)
                                 if(i.gcode==temp2){
                                    return
                                 }
                                 
                                 const temp=findMainGroupMinMax(loadData.gcode,loadData.level)
                                 const minGcode=temp.minGcode
                                 const maxGcode=temp.maxGcode
                                 if( (i.gcode<minGcode)||(i.gcode>maxGcode) ){
                                    setSelectGroup(i)
                                 }
                                

                              }
                           }
                          
                  }}>
                        {`${gcode}-${groupName}`}
                  </div>
                  
          </div>
         :null
         )
     })

   )
}


return(
<div className="Modal-background">
   <div className="Modal-box" 
        style={{width:"90%",height:"90%",overflow:"hidden"}}>

      <div className="Modal-header" style={{width:"100%",height:"5%"}}>
           <h4>{pageData.formHead}</h4>
      </div>

      <div className="w-100 bd-pureWhite" style={{width:"100%",height:"80%"}}>
               {renderBody()}
      </div>
      <div className="Modal-footer" style={{width:"100%",height:"15%"}}>
         <div>
               <button
                  onClick={e=>{
                     if(isAdd){
                        submitFunc(inputState)
                     }
                     else{
                        submitFunc(arrayState)
                     }
                     //submitFunction()
                  }}
               
               >
                  <FaCheck/>
               </button>
         </div>
         <div>
               <button
                  onClick={e=>{
                     cancelFunc()
                  }}
               >
                  <FaBan/>
               </button>
         </div>

      </div>

   </div>
</div>
)

}
export default ModalNewTreeForm;
