import axios from 'axios'

const genTree=(array)=>{
    
    let tempArray=[]

    array.map((i,idx)=>{

        const {_id,...remaining}=i
        const currentGcode=i.gcode

        let tempHaveChild=false

        //let nextGcode=null

        if(idx<(array.length-1)){

            const nextGcode=array[idx+1].gcode
            const nextLevel=array[idx+1].level

            if(i.level+1==nextLevel){
                const temp=new RegExp("^"+currentGcode+"\/","gi").test(nextGcode)
            
                if(temp){
                    tempHaveChild=true
                }
            }
        }

        const tempObj={...remaining,
            open:i.level==1?true:false,
            show:i.level==1||i.level==2?true:false,
            haveChild:tempHaveChild
        }
        tempArray=[...tempArray,tempObj]
    })

    return tempArray
}

const genTreeWithI=(array,i)=>{

    let tempArray=[]

    const clickGcode=i.gcode

    array.map((j,idx)=>{

        const {_id,...remaining}=j
        const currentGcode=j.gcode

        let tempHaveChild=false

        //let nextGcode=null

        if(idx<(array.length-1)){

            const nextGcode=array[idx+1].gcode
            const nextLevel=array[idx+1].level

            if(j.level+1==nextLevel){
                const temp=new RegExp("^"+currentGcode+"\/","gi").test(nextGcode)
            
                if(temp){
                    tempHaveChild=true
                }
            }
        }


        const isChildren=new RegExp("^"+clickGcode+"\/","gi").test(j.gcode)

        const tempObj={...remaining,
            open:j.level==1||j.gcode==clickGcode||(isChildren&&tempHaveChild)?true:false,
            show:j.level==1||j.level==2||isChildren?true:false,
            haveChild:tempHaveChild
        }
        tempArray=[...tempArray,tempObj]
    })

    return tempArray

}
//--------------------------

//--------------------------
const checkEditGroup=(groupSt)=>{
    let value=false
    if(groupSt){
        if(groupSt.editGroup){
            value=true
        }
    }
    return value
}
//--------------------------
const checkEditGroupColor=(i,groupSt,newColor)=>{

    let color={color:"black"}
    if(groupSt){
        if(groupSt.editGroup){
            if(groupSt.editGroup.id==i.id){
                color={color:newColor?newColor:"red"}
            }
        }
    }
    return color
}
//=========================
const closeFolder=(array,i)=>{
    let tempArray=[]

    array.map((j,idx)=>{
        
        if(j.gcode==i.gcode){
            const tempObj={...j,open:false}
            tempArray=[...tempArray,tempObj]
        }
        else{
            const isChildren=new RegExp("^"+i.gcode+"\/","gi").test(j.gcode)

            if(isChildren){
                const tempObj={...j,show:false}
                tempArray=[...tempArray,tempObj]
            }
            else{
                tempArray=[...tempArray,j]
            }
        }

    })
    return tempArray
}
//=========================
const openFolder=(array,i)=>{
    let tempArray=[]
    const clickGcode=i.gcode

    array.map((j,idx)=>{
        
        if(j.gcode==i.gcode){
            const tempObj={...j,open:true}
            tempArray=[...tempArray,tempObj]
        }
        else{
            const isChildren=new RegExp("^"+i.gcode+"\/","gi").test(j.gcode)
            if(isChildren&&j.level==i.level+1){
                const tempObj={...j,show:true}
                tempArray=[...tempArray,tempObj]
            }
            else{
                tempArray=[...tempArray,j]                
            }
        }
    })
    return tempArray
}
//=========================
const loadMainGroup=(i,dataUrl,myheader)=>{

    console.log('loadMainGroup')
    //--------------------------------
    return new Promise((resolve,reject)=>{
        
            const temp={
                $or:[
                    {
                    ["gcode"]:{$regex:i.gcode,
                            $options:'gi' }
                    },
                    {
                    $or:[{level:1},{level:2},{level:3}]    
                    }
                ]
            }
            const qry={sort:{gcode:1},...temp}//$or:[{level:1},{level:2}]},

            axios.post(`/${dataUrl}/getcustom`,qry,myheader)
            .then(result=>{
                //console.log('result.....')
                //console.log(result.data.data)
                resolve(result.data.data)
            })
            .catch(error=>{
                //console.log('error')
                //console.log(error)
                reject(error)
            })
    
    })
}



const newGroupUtil={
    genTree,
    genTreeWithI,
    checkEditGroup,
    checkEditGroupColor,
    closeFolder,
    openFolder,
    loadMainGroup
}
  
export default newGroupUtil
  