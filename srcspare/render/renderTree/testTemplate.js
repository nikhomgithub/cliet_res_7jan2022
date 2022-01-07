const patternNumber=/^\d{1,30}$/gi
const patternString=/^[ก-๙\w\+\-\*\/\\.=]{1,200}$/gi
const patternEmail=/^[\w@\.\-]{1,30}$/gi
const patternDate=/^\d{4}-\d{2}-\d{2}$/gi
const patternFileName=/^[\w\-\*\/\.\\=]{1,200}$/gi
const patternBoolean=/^(true)|(false)$/gi
const patternWildCard=/.{0,200}/gi
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi

const valBasic= (pttn,str)=>{
    return new RegExp(pttn).test(str)
}

const valArray= (pttn,array)=>{
    let tempResult=true

    for (let i=0; i<array.length;i++){
        tempResult= new RegExp(pttn).test(array[i])
        if(!tempResult){
            break
        }
    }
    return tempResult
}
const valNone=()=>{
  return true
}

const groupState={
    id:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    groupPage:{stType:"number",  validate:valBasic,  pattern:patternNumber},
    groupName:{stType:"string", validate:valBasic,  pattern:patternString},
    children:{stType:"array",  validate:valArray,  pattern:patternNumber},
    parentId:{stType:"array",  validate:valArray,  pattern:patternNumber},
    allDeleteId:{stType:"array",  validate:valArray,  pattern:patternNumber},
}

const testData=[
    {id:1,gropuPage: 1,groupName:"main",children:[2,3,4,13],parentId:null},
    {id:2,groupPage: 1,groupName:"one",children:[5,10],parentId:1},

    {id:3,groupPage: 1,groupName:"three",children:[7,9],parentId:1},
    {id:4,groupPage: 1,groupName:"four",children:[11],parentId:1},
    {id:5,groupPage: 2,groupName:"five",children:[6,12],parentId:2},
    {id:6,groupPage: 2,groupName:"six",children:[],parentId:5},
    {id:7,groupPage: 3,groupName:"seven",children:[8],parentId:3},
    {id:8,groupPage: 3,groupName:"eight",children:[],parentId:7},
    {id:9,groupPage: 3,groupName:"nine",children:[],parentId:3},
    {id:10,groupPage: 2,groupName:"ten",children:[],parentId:2},//
    {id:11,groupPage: 4,groupName:"eleven",children:[],parentId:4},
    {id:12,groupPage: 2,groupName:"twelve",children:[],parentId:5},//
    {id:13,groupPage: 13,groupName:"thirteen",children:[],parentId:1},
    
  ]

const testTemplate={groupState,testData}

export default testTemplate
