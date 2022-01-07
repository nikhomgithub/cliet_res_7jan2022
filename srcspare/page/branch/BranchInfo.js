import React from 'react';
import {MdEdit} from 'react-icons/md';

import ShopInfoModalForm from '../../render/renderForm/ShopInfoModalForm'
import axios from 'axios'
import axiosUtil from '../../util/axiosUtil'
import BranchSettingForm from '../../render/renderForm/BranchSettingForm';

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,
   addSingleFileNameInsteadOfPhotoUrl,
   catchErrorToMessage}=axiosUtil

function BranchInfo(props) {

const {
   pageData,basicData,
   FormTemplate,StateTemplate,
   myheader,setReloadBasicData,
   languageObj,tableTemplate
}=props

console.log('BranchInfo........')
//console.log(basicData)

const {photoUrl1,shopInfo,languageSetting,printPageSetting,widthLeft,thisBranch,table}=basicData
const tempBranch={photoUrl1,shopInfo,languageSetting,printPageSetting,widthLeft,thisBranch,table}

const {branchSettingPage}=pageData

//console.log('tempBranch')

const [showShopInfo,setShowShopInfo]=React.useState(false)
const [showBranchSetting,setShowBranchSetting]=React.useState(false)
const [error,setError]=React.useState({
                                       showModalError:false,
                                       message:null
                                    })

//===============================
const updateShopInfoFunc=(inputState)=>{
   console.log('updateShopInforFunc')
   console.log(inputState)
   const {file1,photoUrl1,shopInfo}=inputState
   const {branchId}=basicData
   const tempFormInputState1={ id:branchId,
                              shopInfo:shopInfo}
  
   let promise1=axios.post(`/p35branch/updatecustom`,tempFormInputState1,myheader)

   let promise2=null
   
   if(file1){
        console.log('file1.............')
        console.log(file1)

       if(file1.length>0){
            console.log('there is file')

            const tempFormInputState2=addSingleFileNameInsteadOfPhotoUrl({  id:branchId,
                                                                            file1,photoUrl1})  
        
            const fd=genFD({
                inputState:tempFormInputState2,
                template:{
                    id:StateTemplate.shopInfoState.id,
                    file1:StateTemplate.shopInfoState.file1,
                    photoUrl1:StateTemplate.shopInfoState.photoUrl1,
                }
            })
        
            promise2=axios.post(`/p35branch/updatecustom`,fd,myheader)
       }
       else{
            console.log('there is No.........file')
            promise1=axios.post(`/p35branch/updatecustom`,{...tempFormInputState1,photoUrl1},myheader)
       }
   }
   else{
       console.log('no click on add Image')
       promise1=axios.post(`/p35branch/updatecustom`,{...tempFormInputState1,photoUrl1},myheader)
   }

   Promise.all([promise1,promise2])
       .then(result=>{
           setReloadBasicData(true)
           setShowShopInfo(false)
       })
       .catch(error=>{
           const tempObj={showModalError:true,message:catchErrorToMessage(error)}
           setError(tempObj)
           
        })
    
}
//==================================
const updateBranchData=(inputData)=>{

    const temp={id:basicData.branchId,...inputData}

    axios.post(`/p35branch/updatecustom`,temp,myheader)
    .then(result=>{
        console.log('result')
        setReloadBasicData(true)
        setShowBranchSetting(false)
    })
    .catch(error=>{
        console.log('error')
        const tempObj={showModalError:true,message:catchErrorToMessage(error)}
        setError(tempObj)
        
     })
}

//==================================
/*
const renderBody=()=>{
    return basicData.shopInfo.map((i,idx)=>(
    <div className="flex-center-center" key={idx}>
        <div className="w-10">
            <FaPlusSquare className="sm-icon"
                onClick={e=>{
                    //addRow(idx)
                }}
            />
        </div>
        <div className="w-10">
            {idx>0
            ?<FaMinusSquare className="sm-icon"
                onClick={e=>{
                    //deleteRow(idx)
                }}
            />
            :null
            }
        </div>
        <div className="w-80">
            <input
                type="text"
                value={i}
                onChange={e=>{
                    //changeInputState(e,idx)
                }}
            />
        </div>
    </div>

    ))
       
}

*/









const renderBody=()=>{
    const temp=["languageSetting","printPageSetting","widthLeft","thisBranch","table"]

    return temp.map((i,idx)=>{
      return i!="table"
      ?<div key={idx} 
          className="" 
          style={{display:"flex",width:"100%"}}>
        <div style={{width:"20%"}}>
            <div style={{fontSize:"1rem"}}>{branchSettingPage[i]}</div>
        </div>
        <div style={{width:"80%"}}>
            <div style={{fontSize:"1rem"}}>{basicData[i]}</div>
        </div>
      </div>
      :<div key={idx} 
            className="" 
            style={{display:"flex",width:"100%"}}>
         <div style={{width:"20%"}}>
            <div style={{fontSize:"1rem"}}>{branchSettingPage[i]}</div>
         </div>
         <div style={{width:"40%"}}>
            <select>
               {
                  basicData.table.map((i,idx2)=>(
                     <option key={idx2}>
                        {i.tableName}
                     </option>
                  ))
               }
            </select>
         </div>
      </div>
   })    
}


//==================================
const renderShopInfoLine=()=>{

   return  basicData.shopInfo.map((i,idx)=>(
    <div key={idx} 
         className="" 
         style={{display:"flex",width:"100%"}}>

             <div style={{fontSize:"1rem"}}>{i}</div>
    </div>
   ))
}


//------------------------------
const renderShopInfo=()=>{
   //const {lb,name,address,contact,branch,other,logo} = pageData.shopInfo  
   return(
      <div className="w-100"
      style={{display:"flex",
              justifyContent:"space-between",
              marginBottom:"0.5rem"
      }}>
          <div className="w-60"  style={{paddingTop:"0.5rem"}}>
              <div style={{display:"flex"}}>   
                  <h5>{pageData.shopInfo.formHead}</h5>
                      <MdEdit className="sm-icon"
                              style={{marginLeft:"0rem"}}
                              onClick={e=>setShowShopInfo(!showShopInfo)}
                      />
              </div>
              {
                  renderShopInfoLine()
              }
          </div>
          {
          <div className="w-50"
              style={{display:"flex",
                      justifyContent:"center",alignItems:"center"}}
          >   
                <img src={basicData.photoUrl1[0]}
                            style={{maxWidth:"100%",maxHeight:"30vh"}}
                />
          </div>
          }
      </div>
   )
}
//=========================

return(
<div className="w-100 h-100" 
     style={{padding:"0.5rem",overflowY:"auto"}} 
>
        <div className="bd-pureWhite" 
             style={{padding:"0.5rem",marginBottom:"2rem"}}>
        {
            pageData&&renderShopInfo()
        }
        </div>

        <div className="bd-pureWhite" 
             style={{padding:"0.5rem",marginBottom:"2rem"}}>
            <div style={{display:"flex"}}>
                <h5>{`${branchSettingPage.formHead}`}</h5>
                <MdEdit className="sm-icon"
                    style={{marginLeft:"0rem"}}
                    onClick={e=>setShowBranchSetting(!showBranchSetting)}
                />
            </div>
            {
            renderBody()
            }

        </div>

        {
            showShopInfo
            ?<ShopInfoModalForm
                lb={pageData.shopInfo.formHead}
                basicData={basicData}
                shopInfo={pageData.shopInfo}
                setShow={setShowShopInfo}
                keyName={["photoUrl1"]}
                submitFunction={updateShopInfoFunc}
            />
            :null
        }
        {
            showBranchSetting
            ?<BranchSettingForm
                pageData={pageData}
                basicData={basicData}
                setShow={setShowBranchSetting}
                confirmFunc={updateBranchData}
            />
            :null
        }

</div>
)

}
export default BranchInfo;

