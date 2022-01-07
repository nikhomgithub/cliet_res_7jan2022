import React from 'react';

import {FaFolderPlus,FaFolder,FaFolderOpen, FaLaptopHouse} from 'react-icons/fa';

import {MdRefresh,MdEdit,MdAddCircle,MdDelete,MdFolderSpecial, MdZoomIn,MdSearch} from 'react-icons/md';
//import treeUtil from './treeUtil'

import './Tree.css'

//const {convertToObject,createGroupTree,findAllChildrenIdByGroupTree,openAllParentId} = treeUtil

const Tree=(props)=>{
  console.log('Tree')

  const {
         tempObj,
         canGroupChange,
         selectGroupObjectId,
         folderOpenFunc,
         folderClosePlusFunc,
         folderCloseFunc,
         pOpenFunc,
         pCloseFunc,
         delFunc,
         addFunc,
         editFunc,
         refreshFunc,
         zoomFunc,
         setEditGroupFunc,
         /*
         loadData,editData,
         setEditGroup,
         setAllDeleteId,
         groupState,
         setShowAdd,setShowEdit,setShowModalConfirm,
         reloadFunctionForGroup,
         filterDataByGroup,
         canGroupChange,
         clickFolderIcon,
         setClickFolderIcon
         */
        }=props

  //===================================
  const getBGcolor=(id)=>{
    //if(!selectGroupObject){return null}
    //if(selectGroupObject.id==id){
    //  return '2px solid rgb(244, 248, 4)'
    //}
  }

  const getColor=(id)=>{
    if(!selectGroupObjectId){return null}
    if(selectGroupObjectId==id){
      return 'red'
    }
  }

  //================================
  const renderSubFolder = (subArrs,step) =>{
    return ( subArrs.map((i,index)=> {
      //if(!i){return null}
      return(  
      <div key={index} 
           style={{marginLeft:`${step*1}rem`}}
           //className="Tree-box"
      >    
        {
          i.open    
          ?<div style={{}}>
             
                <div style={{display:"flex",alignItems:"center"}}> 
                    <FaFolderOpen 
                        style={{fontSize:"2rem"}}
                        //className="Tree-open-icon"
                        //style={{display:'inline'}}
                        onClick={e=>{                //ถ้าคลิกรูปไอคอน folder เปิดนี้    
                            folderOpenFunc(i)
                        }}
                    />
                    
                    {i.groupName
                    ?<div id={i.groupName}
                         style={{marginTop:"0.7rem",marginLeft:"0.3rem"}}
                          onClick={e=>{
                              setEditGroupFunc(i)
                              //pOpenFunc(i)
                          }}
                          //className="Tree-p"
                          style={{color:selectGroupObjectId==i.id?"red":"black",
                                  fontSize:i.groupName=="main"?"1.5rem":null
                                  }}
                      >{`${i.id}.${i.groupName}`}
                      </div>
                    :null
                    }
                   <MdSearch className="sm-icon"
                            style={{color:selectGroupObjectId==i.id?"red":"black"}}
                            onClick={e=>{pCloseFunc(i)}}
                   />
              </div>    
              <div >
                  {
                  renderSubFolder(i.folders,step+1)
                  }    
              </div>
          </div>
          :<div style={{}}>
              
              <div style={{}}>
                  {i.children
                  ?i.children.length>0          
                        ?<div style={{display:"flex",alignItems:"center"}}>
                              <FaFolderPlus 
                                style={{fontSize:"2rem"}}
                                //className="Tree-close-icon"
                                //style={{display:'inline',border:getBGcolor(i.id)}} 
                                onClick={e=>{    //ถ้าคลิกรูปไอคอน folder ปิดนี้  
                                    folderClosePlusFunc(i)
                                    //loadGroup
                                  }}
                              />
                               {i.groupName
                                ?
                                  <div id={i.groupName}
                                          style={{marinTop:"0.7rem",marginLeft:"0.3rem"}}
                                          onClick={e=>{
                                            setEditGroupFunc(i)
                                            //pCloseFunc(i)
                                          }}
                                          
                                          style={{color:selectGroupObjectId==i.id?"red":"black",
                                                  fontSize:i.groupName=="main"?"1.5rem":null
                                                  }}
                                      >{`${i.id}.${i.groupName}`}
                                  </div>
                                :null
                                }
                            <MdSearch className="sm-icon"
                                      style={{color:selectGroupObjectId==i.id?"red":"black"}}
                                      onClick={e=>{pCloseFunc(i)}}
                            />
                         </div>
                        :<div style={{display:"flex",alignItems:"center"}}>
                          <FaFolder
                            style={{fontSize:"2rem"}}
                            //className="Tree-close-icon"
                            //style={{display:'inline',border:getBGcolor(i.id)}} 
                            onClick={e=>{ //ถ้าคลิกรูปไอคอน folder ปิดนี้       
                                folderCloseFunc(i)
                            }}
                          />
                          {i.groupName
                          ?
                            <div id={i.groupName}
                                    style={{marinTop:"0.7rem",marginLeft:"0.3rem"}}
                                    onClick={e=>{
                                      setEditGroupFunc(i)
                                      //pCloseFunc(i)
                                    }}
                                    
                                    style={{color:selectGroupObjectId==i.id?"red":"black",
                                            fontSize:i.groupName=="main"?"1.5rem":null
                                            }}
                                >{`${i.id}.${i.groupName}`}
                            </div>
                          :null
                          }
                          <MdSearch className="sm-icon"
                                  style={{color:selectGroupObjectId==i.id?"red":"black"}}
                                  onClick={e=>{pCloseFunc(i)}}
                          />
                        </div>
                  :null  
                  }
                 
                  
              </div>
          </div>
        }
      </div>
      )}
    ))
  }
  
  //==============================

  return(
    <div className="h-100 w-100" style={{position:"relative"}}>
    
      <div className="h-5">
        <MdRefresh className="lg-icon" 
          onClick={e=>{
            refreshFunc()
          }}
        />
        {selectGroupObjectId>0&&canGroupChange
          ?<MdAddCircle className="lg-icon" 
              onClick={e=>{
                addFunc()
              }}/>
          :null
        }
        {selectGroupObjectId>1&&canGroupChange
          ?<MdEdit className="lg-icon"  
              onClick={e=>{
                  editFunc()
              }} />
          :null
        }
        {selectGroupObjectId>1&&canGroupChange
          ?<MdDelete className="lg-icon" 
              onClick={e=>{
                  delFunc()
              }}/>
          :null
        }
        <MdZoomIn className="lg-icon" 
              onClick={e=>{
                  zoomFunc()
              }}
        />
      </div>

      <div className="w-100 h-95"
            //style={{overflowY:"scroll",overflowX:"scroll",}}
      >
        { tempObj
          ?renderSubFolder(tempObj,0)
          :null
        }
      </div>
    </div>
  )
}

Tree.defaultProps={
  tempObj:null,
  canGroupChange:true,
  selectGroupObjectId:null,
  folderOpenFunc:()=>{},
  folderClosePlusFunc:()=>{},
  folderCloseFunc:()=>{},
  pOpenFunc:()=>{},
  pCloseFunc:()=>{},
  delFunc:()=>{},
  addFunc:()=>{},
  editFunc:()=>{},
  refreshFunc:()=>{}
}  
export default Tree




/*








*/