
import React from 'react';
import {MainContext} from '../../context/MainContext'
import {FaFolderPlus,FaFolder,FaFolderOpen, FaCaretDown,FaCaretUp,FaLaptopHouse} from 'react-icons/fa';
import {MdRefresh,MdEdit,MdAddCircle,MdDelete,MdFolderSpecial, MdZoomIn,MdSearch} from 'react-icons/md';
import {RiShareForwardLine} from 'react-icons/ri'
import ModalNewTreeForm from './ModalNewTreeForm';
import ModalConfirm from '../../render/ModalConfirm';
import axios from 'axios';

function NewTree(props) {

const {myheader,dataUrl,filterByGroupId,captureEditGroup,canGroupChange,bgColor}=props

console.log('NewTree')

const groupPage={
    formHead:"กลุ่มสินค้า"
}

const editGroupForm={
    formHead:"แก้ไขกลุ่ม",
    treeTitle:"เลือกกลุ่มสินค้าแม่ใหม่ถ้าต้องการย้ายกลุ่ม",
    id:"ไอดี",
    gcode:"โค้ดกลุ่ม",
    groupName:"ชื่อกลุ่ม",
    level:"ระดับกลุ่ม",
}

const addGroupForm={
    formHead:"เพิ่มกลุ่ม",
    treeTitle:"เลือกกลุ่มสินค้าแม่",
    id:"ไอดี",
    gcode:"โค้ดกลุ่ม",
    groupName:"ชื่อกลุ่ม",
    level:"ระดับกลุ่ม"
}

const blankData={
    id:null,
    gcode:null,
    level:null,
    groupName:""
}



const getParent=(gcode,level)=>{
    let parentGcode=null    
    //console.log('getParent')
    let tempString=gcode.toString()

    if(tempString.length==15){
        tempString=`0${tempString}`
    }

    if(level>=2&&level<=8){
        const temp=tempString.substring(0,level*2-2)
        const factorZero=Math.pow(10,(8-(level-1))*2)
        
        parentGcode=parseInt(temp)*factorZero
         // 4=0-8
         // 5=0-10
         // 6=0-12
         // 0123456789012345
         // 1 2 3 4 5 6 7 8
         // 1234567890123456
         // 0101010000000000   
    }
    
    return parentGcode
}    
      

const checkLevel=(i)=>{
  let tempLevel=0
  if( i%Math.pow(10,14)==0 ){
    tempLevel=1
  }
  else if( i%Math.pow(10,12)==0 ){
    tempLevel=2
  }
  else if( i%Math.pow(10,10)==0 ){
    tempLevel=3
  }
  else if( i%Math.pow(10,8)==0 ){
    tempLevel=4
  }
  else if( i%Math.pow(10,6)==0 ){
    tempLevel=5
  }
  else if( i%Math.pow(10,4)==0 ){
    tempLevel=6
  }
  else if( i%Math.pow(10,2)==0 ){
    tempLevel=7
  }
  else{
    tempLevel=8
  }
  return tempLevel
} 

const getParentPart=(parentGcode)=>{
    const parentLevel=checkLevel(parentGcode)
    let tempParent=parentGcode.toString()

    if(tempParent.length==15){
        tempParent=`0${tempParent}`
    }

    const parentPart=tempParent.substring(0,parentLevel*2)

    return parentPart
}


const changeParent=(parentGcode,childGcode)=>{

    let newChildGcode
    let tempChild=childGcode.toString()

    if(tempChild.length==15){
        tempChild=`0${tempChild}`
    }

    const parentLevel=checkLevel(parentGcode)
    let tempParent=parentGcode.toString()

    if(tempParent.length==15){
        tempParent=`0${tempParent}`
    }

    const parentPart=tempParent.substring(0,parentLevel*2)
    const childPart=tempChild.substring(parentLevel*2,16)

    newChildGcode=parseInt(`${parentPart}${childPart}`)
         // 0123456789012345
         // 1 2 3 4 5 6 7 8
         // 1234567890123456
         // 0101010000000000   
    return newChildGcode
}

// 1234567890129999
// 1234567890120000
// 2222222222229999
           //1 2 3 4 5 6 7 8
const tempPt=1234567890120000
const tempI =2222222222229999
changeParent(tempPt,tempI)


const genTree=(array)=>{
    let tempArray=[]
    array.map((i,idx)=>{
        //const tempGcode=i.gcode.toString()
        //const ptn=`^${tempGcode}`
        //const regex = new RegExp(ptn); 
        //console.log(regex.test(str));
        const currentGcode=i.gcode
        const minGcode=1
        const maxGcode=Math.pow(10,(8-i.level)*2)-1
        
        let nextGcode=0
        if(idx<(array.length-1)){
            nextGcode=array[idx+1].gcode
        }

        let tempHaveChild=false
        const dif=nextGcode-currentGcode
        if(dif>=minGcode&&dif<=maxGcode){
            tempHaveChild=true
        }

        tempArray=[...tempArray,
          {...i,
            open:false,
            show:i.level==1?true:false,
            haveChild:tempHaveChild
          }
          
        ]
    })
    return tempArray
}

//---------------------------
const checkEditGroupColor=(i)=>{
    let color={color:"black"}
    if(groupSt){
        if(groupSt.editGroup){
            if(groupSt.editGroup.id==i.id){
                color={color:"red"}
            }
        }
    }
    return color
}

const checkEditGroup=()=>{
    let value=false
    if(groupSt){
        if(groupSt.editGroup){
            value=true
        }
    }
    return value
}
//---------------------------
const findMinMax=(thisGcode,thisLevel)=>{
    const minGcode=thisGcode+Math.pow(10,(8-(thisLevel+1))*2)
    const maxGcode=thisGcode+Math.pow(10,(8-thisLevel)*2)-1
    return {minGcode,maxGcode}
}

const findMainGroupMinMax=(thisGcode,thisLevel)=>{
    const minGcode=thisGcode+1
    const maxGcode=thisGcode+Math.pow(10,(8-thisLevel)*2)-1
    return {minGcode,maxGcode}
}

 
const closeFolder=(i)=>{
    let tempTree=[...groupSt.tree]

    let tempArray=[]

    const temp=findMainGroupMinMax(i.gcode,i.level)
    const tempMin=temp.minGcode
    const tempMax=temp.maxGcode

    tempTree.map(j=>{
   
        if(j.gcode==i.gcode){
            const tempObj={...j,open:false}
            tempArray=[...tempArray,tempObj]
        }
        else if( (j.gcode>=tempMin)&& 
                 (j.gcode<=tempMax)                    
        ){
            const tempObj={...j,show:false}
            tempArray=[...tempArray,tempObj]
        }
        else{
            tempArray=[...tempArray,j]
        }

    })
    return tempArray
}


const openUpFolder=(i)=>{

    const subFunction=(tempTree,i)=>{
        let tempArray=[]
    
        const temp=findMinMax(i.gcode,i.level)
        const minGcode=temp.minGcode
        const maxGcode=temp.maxGcode
    
        tempTree.map((j,idx)=>{
            if(i.gcode==j.gcode){
                const tempObj={...j,
                    open:true
                }
                tempArray=[...tempArray,tempObj]
            }
            else if( (j.gcode>=minGcode)&&
                (j.gcode<=maxGcode)&&
                (j.level==i.level+1) ){
    
                let tempObj={...j,show:true,open:false,haveChild:false}
                
                if(idx<(tempTree.length-1)){
                    const temp2=findMinMax(j.gcode,j.level)
                    const tempMax2=temp2.maxGcode
                    const tempMin2=temp2.minGcode
    
                    const nextGcode=tempTree[idx+1].gcode
                    const nextLevel=tempTree[idx+1].level
                    
                    if( (nextGcode>=tempMin2)&&
                        (nextGcode<=tempMax2)&&
                        (nextLevel==j.level+1)
                      ){
                        tempObj={...tempObj,haveChild:true} 
                    }
                }
                tempArray=[...tempArray,tempObj]
            }
            else{
                tempArray=[...tempArray,j]
            }
        })
        return tempArray
    }

    //--------------------------------
return new Promise((resolve,reject)=>{
      
    let tempTree=[...groupSt.tree]

    if(i.level==1){
        
        const temp=findMainGroupMinMax(i.gcode,i.level)
        const minGcode=temp.minGcode
        const maxGcode=temp.maxGcode

        const qry={sort:{gcode:1},gcode:{$gte:minGcode,$lte:maxGcode}}
        axios.post(`/${dataUrl}/getcustom`,qry,myheader)
        .then(result=>{
            const tempDownload=result.data.data
            tempTree =[...groupSt.tree,...tempDownload].sort((a,b)=>a.gcode-b.gcode)
            
            //find unique array from tempTree
            let tempUnqArray=[]

            tempTree.map((j,idx)=>{
                if(idx==0){
                    tempUnqArray=[...tempUnqArray,j]
                }else{
                    const lastObj=tempUnqArray[tempUnqArray.length-1]
                    if(lastObj.gcode!=j.gcode){
                        tempUnqArray=[...tempUnqArray,j]
                    }
                }
            })

            tempTree=tempUnqArray

            resolve(subFunction(tempTree,i))
        })
        .catch(error=>{
            console.log('error')
            console.log(error)
            reject(error)
        })

    }
    else{
        resolve(subFunction(tempTree,i))
    }
})
}
//--------------------------------


const loadMainGroup=(i)=>{

    //--------------------------------
return new Promise((resolve,reject)=>{
      
    let tempTree=[...groupSt.tree]

       const temp=findMainGroupMinMax(i.gcode,i.level)
        const minGcode=temp.minGcode
        const maxGcode=temp.maxGcode

        const qry={sort:{gcode:1},gcode:{$gte:minGcode,$lte:maxGcode}}
        axios.post(`/${dataUrl}/getcustom`,qry,myheader)
        .then(result=>{
            const tempDownload=result.data.data
            tempTree =[...groupSt.tree,...tempDownload].sort((a,b)=>a.gcode-b.gcode)
            
            //find unique array from tempTree
            let tempUnqArray=[]

            tempTree.map((j,idx)=>{
                if(idx==0){
                    tempUnqArray=[...tempUnqArray,j]
                }else{
                    const lastObj=tempUnqArray[tempUnqArray.length-1]
                    if(lastObj.gcode!=j.gcode){
                        tempUnqArray=[...tempUnqArray,j]
                    }
                }
            })

            tempTree=tempUnqArray

            resolve(tempTree)
        })
        .catch(error=>{
            console.log('error')
            console.log(error)
            reject(error)
        })
   
})
}

//--------------------------------
const submitFunctionEdit=(arrayState)=>{
 
    if(arrayState.deleteArray){

        const qry={
            toDelete:{gcode:{$in:arrayState.deleteArray}},
            toUpdate:arrayState.updateArray
        }
    
        axios.post(`/${dataUrl}/updategroup`,qry,myheader)
        .then(result=>{
            setGroupSt({...groupSt,
                reloadGroup:true,
                showEditForm:false,
                editGroup:null
            })
        })
        .catch(error=>{
            console.log('error')
            console.log(error)
        })
    }
}
//---------------------------------
const submitFunctionDelete=()=>{
    if(groupSt.editGroup){
        const {level,gcode}=groupSt.editGroup

        const temp=findMainGroupMinMax(gcode,level)
        const minGcode=temp.minGcode
        const maxGcode=temp.maxGcode
        
        let tempArray=[gcode]

        groupSt.tree.map(i=>{
            if( (i.gcode>=minGcode)&&
                (i.gcode<=maxGcode) 
              ){  
                tempArray=[...tempArray,i.gcode]
            }
        })
        const qry= {gcode:{$in:tempArray}}
        //const qry={$or:tempArray}
        
        axios.post(`/${dataUrl}/deletemany`,qry,myheader)
        .then(result=>{
            setGroupSt({...groupSt,
                reloadGroup:true,
                showConfirm:false,
                editGroup:null
            })
        })
        .catch(error=>{
            console.log('error')
            console.log(error)
        })

    }
}
//---------------------------------
const submitFunctionAdd=(inputState)=>{
    console.log('submitFunctionAdd')
    console.log(inputState)

    axios.post(`/${dataUrl}/addgroup`,inputState,myheader)
    .then(result=>{
        setGroupSt({...groupSt,
            reloadGroup:true,
            showAddForm:false,
            editGroup:null
        })
    })
    .catch(error=>{
        console.log('error')
        console.log(error)
    })
}
//---------------------------
//const [tree,setTree]=React.useState(genTree(groupData))//genTree(loadData(loadFrom,loadUntil)))
const [showTree,setShowTree]=React.useState(true)

const setTree=(data)=>{
    setGroupSt({
        ...groupSt,
        tree:data
    })
}

const [groupSt,setGroupSt]=React.useState({
    tree:null,
    reloadGroup:true,
    editGroup:null,
    qry:{sort:{gcode:1},$or:[{level:1},{level:2}]},
    showAddForm:false,
    showEditForm:false,
    showConfirm:false,
    showError:false
})


React.useEffect(()=>{
    //console.log('groupSt.tree...')
    //console.log(groupSt.tree)

    //console.log('groupSt.editGroup...')
    //console.log(groupSt.editGroup)


    if(groupSt.reloadGroup){
        axios.post(`/${dataUrl}/getcustom`,groupSt.qry,myheader)
        .then(result=>{
            //console.log('result')
            //console.log(result)
            setGroupSt({...groupSt,
                tree:genTree(result.data.data),
                reloadGroup:false
            })
        })
        .catch(error=>{
            console.log('error')
        })
    }

},[groupSt])

//------------------------------

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
                    <div style={{display:"flex"}}>
                        <div style={checkEditGroupColor(i)}
                            onClick={e=>{
                            if(canGroupChange){
                                if(i.level==1){
                                    
                                    loadMainGroup(i)
                                    .then(result=>{
                                        setGroupSt({...groupSt,
                                            editGroup:i,
                                            tree:result
                                        })
                                    })
                                    
                                }
                                else{
                                    setGroupSt({...groupSt,editGroup:i})
                                }
                            }
                            else{
                                
                            }
                        }}>
                            {`${groupName}`}
                        </div>
                        <MdSearch className="sm-icon" 
                            style={{marginLeft:"1rem"}}
                            onClick={e=>{
                                filterByGroupId(i)
                            }}
                        />
                    </div>
             </div>
            :null
            )
        })
    )
}


return(
<div className=""
     style={{height:"100%",width:"100%"}}>
        <div className="flex-center-center"
            style={{height:"",width:"100%"}}
        >   
                <h5>{groupPage.formHead}</h5>
            {
                showTree
                ?<FaCaretDown className="sm-icon"
                    onClick={e=>setShowTree(!showTree)}
                />
                :<FaCaretUp className="sm-icon"
                    onClick={e=>setShowTree(!showTree)}
                />
            }
        </div>  
        {showTree&&groupSt.tree&&
        <div className=""
            style={{height:"2rem",width:"",
                    display:"flex",backgroundColor:bgColor
            }}
        >
            <MdRefresh className="sm-icon"
                onClick={e=>{
                    setGroupSt({...groupSt,
                        reloadGroup:true,
                        editGroup:null
                    })
                }}
            />
            {canGroupChange&&
            <MdAddCircle className="sm-icon"
               onClick={e=>{
                setGroupSt({
                        ...groupSt,
                        showAddForm:true
                    })
                }}
            />
            }
            {checkEditGroup()&&canGroupChange&&
            <MdEdit className="sm-icon"
                onClick={e=>{
                    setGroupSt({
                        ...groupSt,
                        showEditForm:true
                    })
                }}
            />
            }
            {checkEditGroup()&&canGroupChange&&
            <MdDelete className="sm-icon"
                onClick={e=>{
                    setGroupSt({
                        ...groupSt,
                        showConfirm:true
                    })
                }}
            />
            }
            {checkEditGroup()&&canGroupChange&&
            <RiShareForwardLine className="sm-icon"
                onClick={e=>{
                    captureEditGroup(groupSt.editGroup)
                }}
            />
            }
            
        </div>
        }
        {showTree&&groupSt.tree&&
        <div style={{height:"95%",width:"100%"}}
        >
            {
             renderTree(groupSt.tree)
            }
        </div>
        }
        {groupSt.showAddForm&&
         <ModalNewTreeForm
            tree={groupSt.tree}
            loadData={blankData}
            submitFunc={submitFunctionAdd}
            cancelFunc={()=>setGroupSt({...groupSt,showAddForm:false})}
            setTree={setTree}
            openUpFolder={openUpFolder}
            closeFolder={closeFolder}
            checkLevel={checkLevel}
            findMinMax={findMinMax}
            findMainGroupMinMax={findMainGroupMinMax}
            getParent={getParent}
            getParentPart={getParentPart}
            changeParent={changeParent}
            pageData={addGroupForm}
            isAdd={true}
         />
        }
        {groupSt.showEditForm&&
         <ModalNewTreeForm
            tree={groupSt.tree}
            loadData={groupSt.editGroup}
            submitFunc={submitFunctionEdit}
            cancelFunc={()=>setGroupSt({...groupSt,showEditForm:false})}
            setTree={setTree}
            openUpFolder={openUpFolder}
            closeFolder={closeFolder}
            checkLevel={checkLevel}
            findMinMax={findMinMax}
            findMainGroupMinMax={findMainGroupMinMax}
            getParent={getParent}
            changeParent={changeParent}
            getParentPart={getParentPart}
            pageData={editGroupForm}
            isAdd={false}
         />
        }

        {groupSt.showConfirm&&
        <ModalConfirm
            setShow={(data)=>setGroupSt({...groupSt,showConfirm:data})}
            submitFunction={submitFunctionDelete}
        />
        }

</div>


)
}

NewTree.defaultProps={
    myheader:null,
    dataUrl:"",
    filterByGroupId:()=>{},
    captureEditGroup:()=>{},
    canGroupChange:true,
    bgColor:"#72a2d9"
}


export default NewTree;








/*
//
const loadDataBetween=(array,level,min,max)=>{
    let tempArray=[]
    array.map(i=>{
        //if(i.level==level+1){
            if((i.gcode>=min)&&(i.gcode<=max)){
                tempArray=[...tempArray,i]
            }
        //}
    })
    return tempArray
}



const tempGroup=
[         //12345678901234 
   {gcode: 100000000000000, level: 1, id: '01'},
   {gcode: 101000000000000, level: 2, id: '01-01'},
   {gcode: 101100000000000, level: 3, id: '01-01-10'},
   {gcode: 101101000000000, level: 4, id: '01-01-10,-10'},
   {gcode: 101101010000000, level: 5, id: '01-01-10,-10-10'},
   {gcode: 101101010100000, level: 6, id: '01-01-10,-10-10-10'},
   {gcode: 101101010200000, level: 6, id: '01-01-10,-10-10-20'},
   {gcode: 101101020000000, level: 5, id: '01-01-10,-10-20'},
   {gcode: 102000000000000, level: 2, id: '01-02'},
   {gcode: 102010000000000, level: 3, id: '01-02-01'},
   {gcode:1000000000000000, level: 1, id: '10'},
   {gcode:1001000000000000, level: 2, id: '10-01'},
   {gcode:1001010000000000, level: 3, id: '10-01-01'},
   {gcode:1001010100000000, level: 4, id: '10-01-01-01'},
   {gcode:1001020000000000, level: 3, id: '10-01-02'}
]



//-------------------------
//load only level1 and level2 
const loadData=()=>{
    let tempArray=[]
    tempGroup.map(i=>{
        if(i.level==1||i.level==2){
            tempArray=[...tempArray,i]
        }
    })
    return tempArray
}

*/