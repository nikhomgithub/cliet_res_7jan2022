import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import axios from 'axios'
import uuid from 'react-uuid'
import {MdRefresh,MdSwapHoriz,MdSettings,
   MdSearch,MdEdit,MdAddCircle,MdDelete,MdPrint,
   MdChevronLeft,MdChevronRight,MdLastPage,
   MdRadioButtonChecked,MdClose,
} from 'react-icons/md';
import {FaCheck,FaBan
 } from 'react-icons/fa';
import download from 'js-file-download'

import axiosUtil from '../../util/axiosUtil'
import ModalFilterInput from '../../render/renderFilter/ModalFilterInput';
import pageUtil from './pageUtil'

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil
const {filterAxios} = pageUtil

function ModalCsv(props) {

const {
   filterDataTemplate,
   inputState,
   filterTemplate,
   myheader,
   pageFilterForm,
   basicData,
   cancelFunc
} = props

const [filterData,setFilterData]=React.useState(filterDataTemplate)


React.useEffect(()=>{
   console.log('filterData PageComponent')
   console.log(filterData)

   if(filterData.reloadData){
       const {dataUrl,pageNumber,limitRow,sort,qry}=filterData
   
       axios.post(`/${dataUrl}/getlimit`,{pageNumber,limitRow,sort,...qry},myheader)
       .then(result=>{
           //console.log(result)
           const temp2= genFilterDataWithIndex(result.data.data,filterData.selectProduct)
           //console.log('temp2.....')
           //console.log(temp2)
           const tempResult={...filterData,
               data0:temp2,
               count:result.data.count,
               lastRecordId:result.data.lastRecordId,
               reloadData:false
           }
           setFilterData(tempResult)
       })
       .catch(error=>{
           const tempError={...filterData,
               reloadData:false,
               message:catchErrorToMessage(error),
               showModalConfirm:false,
               showModalError:true,
           }
           console.log(tempError.message)
           setFilterData(tempError)
       })
   }
},[filterData])


const genFilterDataWithIndex=(filterData,selectProduct)=>{

   if(filterData){
       if(filterData.detail){
           if(filterData.detail.length()>0){
               let tempArray=[]

               filterData.detail.map(i=>{

               })
           }
       }
   }

   let tempSelectProduct
   if(selectProduct){tempSelectProduct=selectProduct}
   else {tempSelectProduct=[]}

   let tempArray=[]

   filterData.map((i,idx)=>{
        
       const temp={...i,selectedLine:false,_id:uuid()}
       tempArray=[...tempArray,temp]
       //const temp={...i,tempIndex:idx,selectedLine:false}
   })

   let tempArray2=[]

   tempArray.map(i=>{
       let tempObj=i
       tempSelectProduct.map(j=>{
           if(i.id==j.id){
               //console.log('j.id==i.id')
               tempObj={...tempObj,selectedLine:j.selectedLine}
               //tempArray2=[...tempArray2,]
           }
       })
       tempArray2=[...tempArray2,tempObj]
   })

   return tempArray2
}

const calTotalPage =()=>{
   const {count,limitRow}=filterData
   return Math.ceil(count/limitRow)
}

const setPageNumber=(value)=>{
   setFilterData({...filterData,pageNumber:value})
}

const genCsv=()=>{
   if(filterData.data0){

         const columnDelimiter = ","
         const lineDelimiter = "\n"
         
         const keys = Object.keys(filterData.data0[0])

         let result = ""
         result += keys.join(columnDelimiter)
         result += lineDelimiter

         filterData.data0.map((item,indexItem)=>{

            keys.map((key,indexKey)=>{
               if(indexKey>0){
                     result+=columnDelimiter
               }
               result += typeof item[key] === "string"&& 
                           item[key].includes(columnDelimiter) 
                           ? `"${item[key]}"` 
                           : item[key]

            })

            result += lineDelimiter
         })

         download(result,`${pageFilterForm.formHead}${filterData.pageNumber}.csv`)
   }
}


const filterAxiosFunc=(option,inputState)=>{
   console.log('filterAxios2..........')
   //console.log(filterTemplate)
   filterAxios(option,inputState,filterTemplate,filterData,myheader)
   .then(result=>{
         //console.log("result.....")
         //console.log(result)
         const temp2= genFilterDataWithIndex(result.data0,filterData.selectProduct)
         //console.log('temp2......')
         //console.log(temp2)
         setFilterData({...result,data0:temp2})
      })
   .catch(error=>setFilterData(error))
}


const renderBadge=()=>{
   const {pageNumber}=filterData

   return(calTotalPage()>0
      ?<div className="" style={{display:"flex",width:"100%",padding:"0.5rem"}}>
            <div>
                <MdChevronLeft
                    className="sm-icon"
                    style={{visibility:(calTotalPage()>1)&&(pageNumber>1)
                            ?"visible":"hidden"}}
                    onClick={e=>{
                        const temp=parseInt(pageNumber)-1
                        setPageNumber(temp)
                        //setReloadData(true)
                    }}
                />
            </div>
        
           <input 
                type="number"
                style={{width:"70px"}}
                value={pageNumber.toString()}
                onChange={e=>{
                    const temp=parseInt(e.target.value)
                    if(temp<=calTotalPage()||!temp){ //04-06-2021
                        setPageNumber(temp)
                        //setReloadData(true)
                    }
                }}
            />
             

           <div style={{display:"flex",justifyContent:"center",
                alignItems:"center"}}>
              <div>
                {`/${calTotalPage()}`}
              </div>
            </div>
        

            {pageNumber<calTotalPage()//&&pageNumberShow
            ?<div>
                <MdChevronRight
                    className="sm-icon"
                    onClick={e=>{
                      const temp=parseInt(pageNumber)+1
                      setPageNumber(temp)
                      //setReloadData(true)
                    }}
                />
            </div>
            :null
            }
               
            {pageNumber<calTotalPage()//&&pageNumberShow
             ?<div>
                 <MdLastPage
                    className="sm-icon"
                    onClick={e=>{
                        const temp=parseInt(calTotalPage())
                        setPageNumber(temp)
                        //setReloadData(true)
                    }}
                 />
              </div>   
             :null   
            }
      </div>
      :null
   )
}


return(
      <div className="Modal-background">
          <div className="Modal-box" style={{width:"60%"}}>
              <ModalFilterInput
                  show={true} setShow={()=>{}}
                  
                  filterTemplate={filterTemplate}
      
                  inputState={inputState} 
                  setInputState={()=>{}}
                  
                  limitRow={filterData.limitRow} 
                  setLimitRow={(value)=>setFilterData({...filterData,limitRow:value})}
                  
                  sort={filterData.sort} 
                  setSort={(value)=>setFilterData({...filterData,sort:value})}
                  
                  filterAxios={filterAxiosFunc}
                  basicData={basicData}
                  
                  LB={pageFilterForm}
              />

              {
                 renderBadge()
              }
              

              <div className="w-100 flex-center-center jc-end" >
                  <div>
                      <button
                          onClick={e=>{
                              //submitFunc()
                              genCsv()
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
export default ModalCsv;
