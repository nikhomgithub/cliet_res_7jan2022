/*
const group=[
    {id:1,name:'main',        parent:1,children:[2,3],remark:'this is main'},
    
    {id:2,name:'คอมพิวเตอร์',   parent:1,children:[4,5,6],remark:'ขายหน้าร้าน'},
    {id:3,name:'มือถือ',        parent:1,children:[7,8],remark:'ขายออนไลน์'},
    
    {id:4,name:'พีซี',          parent:2,children:[],remark:'มือหนึ่ง'},
    {id:5,name:'แลปทอบ',      parent:2,children:[],remark:'มือหนึ่ง'},
    {id:6,name:'เครื่องพิมพ์',     parent:2,children:[],remark:'มือหนึ่ง'},
    
    {id:7,name:'samsung',      parent:3,children:[],remark:'มือสอง'},
    {id:8,name:'oppo',         parent:3,children:[9,10],remark:'มือสอง'},
    
    {id:9,name:'oppo-AS',         parent:8,children:[],remark:'มาแล้ว'},
    {id:10,name:'oppo-BS',         parent:8,children:[],remark:'ยังไม่มี'},
  ]
*/

import { FaTeamspeak } from "react-icons/fa";

//line to nested object
const convertToObject=(myarrs,stateTemplate)=>{   
    
    if(!myarrs){return null}
    
    const objKeys = Object.keys({...myarrs[0],...stateTemplate}); //myarras[0] for open key

    //const searchId=(_id,groupId,groupName,remark,subGroup,folders)=>{
    const searchId=(l,folders)=>{
        //folders:[{id:_ ,folders:[] },{id:_ ,folders:[]}]    
        // l คือ {id:_,name:_,parent:_,children:_,remark:_},

        if(folders){
            folders.map(f=>{
                if(l.id==f.id){
                    objKeys.map(ky=>{
                        //f={...f,[ky]:l[ky]} //copy all existing key
                        f[ky]=l[ky]
                    })
                    l.children.map(kidId=>{
                        const ob={id:kidId,folders:[]}
                        f.folders.push(ob)
                    })
                }
                else{
                    searchId(l,f.folders)
                }
            })        
        }
        
    }

    let mainObj={}                              //step 1
    myarrs.map(l=>{
        if(l.id==1){     
            mainObj={...mainObj,folders:[]}     //add new key
            objKeys.map(ky=>{
                mainObj={...mainObj,[ky]:l[ky]} //copy all existing key of Id=1=mainObj
            })  //{id:1,name:'main',parent:1,children:[2,3],remark:'this is main',open:false,folders:[]}
    
            l.children.map(kidId=>{
                let objInFoldersArray={id:kidId,folders:[]}
                mainObj.folders.push(objInFoldersArray)   //we use push to effect parent
            }) //{id:1,name:'main',parent:1,children:[2,3],remark:'this is main',open:false}
        }        //folders:[ {id:_,folders:[]}, {id:_,folders:[]}]         
        else{
            searchId(l,mainObj.folders)         
            //searchId(l,mainObj.folders)
        }   // l คือ {id:_,name:_,parent:_,children:_,remark:_},
    })
    return [mainObj]
}
//===============================================
const createParentGroupObject=(obj,i)=>{
    const myKey=i.parentGroup.length.toString()

    if(obj[myKey]){
        
        obj[myKey]=[...obj[myKey],i]

    }
    else {
        obj={...obj,[myKey]:[i]}
    }
    return obj
}

//------------------------------------------
const createGroupTree=({group,openArrayIn})=>{

    if(!group){return null}

    let tempParentGroupOjbect={}

    let openArray

    if(!openArrayIn){
        openArray=[1]
    }
    else {
        openArray=openArrayIn
    }

    /*   
    if(prevGroupTree){
        //openArray=[]
        prevGroupTree.map(i=>{
            if(i.open){
                openArray=[...openArray,parseInt(i.id)]
            }
        })
    }
    */

    let groupTree=[]
    
    group.map(i=>{

            let tempX={...i,open:i.id==1?true:false} //main always open
            if(openArray){
                for(let j=0;j<openArray.length;j++){
                    if(i.id==openArray[j]){
                        tempX={...tempX,open:true}
                        //openArray=openArray.splice(j,1)
                        break
                    }
                }
            }

            tempParentGroupOjbect=createParentGroupObject(tempParentGroupOjbect,tempX)

   })

    const objKeys = Object.keys(tempParentGroupOjbect);

    objKeys.map(i=>{
        tempParentGroupOjbect[i].map(j=>{
            groupTree=[...groupTree,j]
        })
    })

    return {groupTree,openArray}
   
}

//================================================
const findAllChildrenId=(id,tempObj)=>{
    let tempChildrenId=[]
    let idIsFound=false
    //console.log(tempObj)
    
    console.log('tempObj')
    console.log(tempObj)

    /*
    const findChildren=(obj)=>{
        console.log('obj')
        console.log(obj)

        tempChildrenId=[...tempChildrenId,...obj.children]
        obj.folders.map(i=>{
            findChildren(i)
        })
        //console.log('tempChildrenId')
        //console.log(tempChildrenId)
    }
    
    const findId=(id,obj)=>{
        if(id==obj.id){
            console.log(`foundId=${id} in ${obj.id}`) 
            console.log(obj) 
            idIsFound=true
            findChildren(obj)
            //tempChildrenId=[...tempChildrenId,...obj.children]
        }
        
        else{
            if(idIsFound==false){
                //console.log(`not found Id = ${id} in ${obj.id}`)    
                console.log('obj')
                console.log(obj)
                console.log(obj.id)
                console.log(obj.folders)       
                obj.folders.map(i=>{
                        findId(id,i)
                })
            }
        }
    }
     
     findId(id,tempObj)
     */
     //tempChildrenId=Array.from(new Set(tempChildrenId))
     //console.log(tempChildrenId) 
     return tempChildrenId
  }
//==================================
const findAllChildrenByGroupTree=(id,groupTree)=>{
    let tempAllChildenId=[] 
    let tempArrayOfId=[id]
    let tempAllChildenObject=[]

    for (let i=0;i<groupTree.length;i++){
        for (let j=0;j<tempArrayOfId.length;j++){
            if(tempArrayOfId[j]==groupTree[i].id){
                tempArrayOfId.splice(j,1)
                tempArrayOfId=[...tempArrayOfId,...groupTree[i].children]
                tempAllChildenObject=[...tempAllChildenObject,groupTree[i]]
                tempAllChildenId=[...tempAllChildenId,groupTree[i].id]
                break
            }
        }

        if(tempArrayOfId.length==0){
            break
        }

    }

    const temp = {allDeleteId:tempAllChildenId,
            allDeleteObject:tempAllChildenObject 
           }

    return temp
}
//========================================
//========================================
const findAllParentId=({groupTree,editGroupId})=>{
    
    const funcCheckParentId=(id)=>{
        if(!id){return}
        
        let tempParentId=null
        for (let i =0; i<groupTree.length-1; i++){
            if(groupTree[i].id==id){
                tempParentId=groupTree[i].parentId
                break
            }
        }
        return tempParentId
    }
    
    if(!groupTree){return null}
    
    if(!editGroupId){return null}
   
    let allParentId=[]

    let idToCheck=editGroupId
    
    while(idToCheck){
        idToCheck=funcCheckParentId(idToCheck)
        if(idToCheck){
            allParentId=[...allParentId,idToCheck]
        }
    }

    return allParentId
}

const openAllParentId=({groupTree,editGroupId})=>{
    if(!groupTree){return null}
    if(!editGroupId){return null}

    let tempGroupTree=[]

    let allParentId=[]
    allParentId=findAllParentId({groupTree,editGroupId})

    groupTree.map(i=>{
        let tempObj=i
        
        for(let j=0;j<allParentId.length;j++){
            if(i.id==allParentId[j]){
                tempObj={...tempObj,["open"]:true}
                allParentId.splice(j,1)
                break
            }
        }
        
        tempGroupTree=[...tempGroupTree,tempObj]
    })


    return tempGroupTree
    
}

const treeUtil={convertToObject,createGroupTree,findAllChildrenId,
                openAllParentId,findAllChildrenByGroupTree,
                
            }

export default treeUtil
