import React from 'react'

import {RiShareForwardLine} from 'react-icons/ri'


import {MdRefresh,MdSwapHoriz,MdSettings,
    MdSearch,MdEdit,MdAddCircle,MdDelete,MdPrint,
    MdChevronLeft,MdChevronRight,MdLastPage,
    MdRadioButtonChecked,MdClose,
} from 'react-icons/md';

import { FaBullseye,FaFileCsv, FaRegArrowAltCircleUp} from 'react-icons/fa';
import Ticon from '../../component/ticon/Ticon'

const renderBadge = ({
                filterData,
                
                setPageNumber,
                
                totalSwapPage, 
                setSwapState,
                
                setReloadData,
                setShowFilter,
                setShowAdd,
                setShowEdit,
                setShowModalCsv,
                setShowModalConfirm,
                setUnSelectAll,
                setClose,
                setShowForwardConfirm,
                captureSelect,
                bgColor
})=>{
    //console.log('renderBadge')
    //console.log(filterData)

    const {badgeState,pageNumber,limitRow,sort,count,swapState,editData,selectProduct}=filterData

    const {swapShow,swapFunc,
           reloadShow,reloadFunc,
           filterShow,filterFunc,
           addShow,addFunc,
           editShow,editFunc,
           delShow,delFunc,
           printerShow,printerFunc,
           csvShow,csvFunc,
           closeShow,closeFunc,
           forwardShow,forwardFunc,
           pageNumberShow,
           bullEyeShow,unSelectShow
          } = badgeState

    const changeSwapState=()=>{
        if(swapState<totalSwapPage-1){
            setSwapState(swapState+1)
        }
        if(swapState==totalSwapPage-1){
            setSwapState(0)
        }
    }

    const calTotalPage =()=>{
       return Math.ceil(count/limitRow)
    }

    const countSelectedLine=()=>{

        let tempArray=[]

        selectProduct.map(i=>{
            tempArray=[...tempArray,i.id]
        })

        tempArray=new Set(tempArray)

        let tempCount=0

        for (let j of tempArray){
            let isCount=false
            
            selectProduct.map(i=>{
                if(i.id==j){
                    if(i.selectedLine){
                        isCount=true
                    }
                    else{
                        isCount=false
                    }
                }
            })

            if(isCount){
                tempCount=tempCount+1
            }

        }

        return tempCount
    }

    const getSelectedLine=()=>{
        let tempArray=[]

        selectProduct.map(i=>{
            tempArray=[...tempArray,i.id]
        })

        tempArray=new Set(tempArray)

        let tempArray2=[]

        for (let j of tempArray){
            
            let isFound=false
            let tempObj

            selectProduct.map(i=>{

                if(i.id==j){

                    if(i.selectedLine){
                        isFound=true
                        tempObj=i
                    }
                    else{
                        isFound=false
                    }
                }
            })

            if(isFound){
                tempArray2=[...tempArray2,tempObj]
            }

        }

        return tempArray2
    }

    return (
    <div className="badge-frame-xc12"
        style={{background:bgColor}}
    > 
        
        <div className="flex-center-center flex-no-wrap xc12 jc-start"
              style={{justifyContent:"flex-start"}}>

            {swapShow
            ?<div className="iconbox"
                onClick={e=>{
                    changeSwapState()
                    if(swapFunc){swapFunc()}
                }}
            >
                <Ticon
                    iconName="MdSwapHoriz"
                    className="sm-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }
            

            {reloadShow
            ?<div className="iconbox"
                onClick={e=>{
                    setReloadData(true)
                    if(reloadFunc){reloadFunc({limitRow:limitRow,sort:sort})}
                    //if(reloadFunc){reloadFunc({limitRow:tempLimitRow,sort:tempSort})}
                }}
            >
                
                <Ticon
                    iconName="MdRefresh"
                    className="sm-icon"
                    textStyle={{color:"black"}}
                />
                
            </div>
            :null
            }
               
            {filterShow
            ?<div className="iconbox"
                onClick={e=>{ 
                    setShowFilter(true)
                    if(filterFunc){filterFunc()}
                } } 
            >
                <Ticon
                    iconName="MdSearch"
                    className="sm-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }
            
            {addShow
            ?<div className="iconbox"
                onClick={e=>{ 
                    setShowAdd(true)
                    if(addFunc){addFunc()}
                }}
            >    
                <Ticon
                    iconName="MdAddCircle"
                    className="sm-icon" 
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }

            {editShow
            ?<div className="iconbox"
                onClick={e=>{
                    if(editData){
                        setShowEdit(true)
                        if(editFunc){editFunc()}
                    }
                }}
            >   
                <Ticon
                    iconName="MdEdit"
                    className="sm-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }
            
            {delShow
            ?<div className="iconbox"
                onClick={e=>{
                    setShowModalConfirm(true)
                    if(delFunc){delFunc()}
                }}
            >
                <Ticon
                    iconName="MdDelete"
                    className="sm-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }

            {printerShow
            ?<div className="iconbox"
                onClick={e=>{
                    window.print()
                    if(printerFunc){printerFunc()}
                }}
            >
                <Ticon
                    iconName="MdPrint"
                    className="sm-icon"
                    textStyle={{color:"black"}} 
                />
            </div>
            :null
            }

            {csvShow
            ?<div className="iconbox"
                onClick={e=>{
                    setShowModalCsv(true)
                    if(csvFunc){csvFunc()}
                }}
            >
                <Ticon 
                    iconName="FaFileCsv"
                    className="sm-icon" 
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }

            {forwardShow
            ?<div className="iconbox"
                onClick={e=>{
                    setShowForwardConfirm(true)
                    if(forwardFunc){forwardFunc()}
                }}
            >
                <Ticon
                    iconName="RiShareForwardLine"
                    className="sm-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }

            {closeShow
            ?<div className="iconbox"
                onClick={e=>{
                    if(setClose){setClose()}
                    if(closeFunc){closeFunc()}
                }}
            >
                <Ticon
                    iconName="MdClose"
                    className="sm-icon" 
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }

            {unSelectShow
            ?
            <div className="iconbox"
                onClick={e=>{
                    if(setUnSelectAll){setUnSelectAll()}
                }}
            >
                <Ticon 
                    iconName="FaBullseye"
                    className="sm-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            :null
            }

            {bullEyeShow  
            ?
            <div className="bd-black" 
                style={{display:"flex",justifyContent:"center",alignItems:"center",
                        margin:"10px"
                      }}>
                
                <Ticon
                    iconName="MdRadioButtonChecked"
                    className="sm-icon"
                    textStyle={{color:"black"}}
                />
                <div style={{marginRight:"10px"}}>{countSelectedLine()}</div>

            </div>
      
            :null
            }

            {true//pageNumberShow
            ?<div>
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
            :null
            }

            {calTotalPage()>1//&&pageNumberShow
             ?<input 
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
             :null
            }        

            {calTotalPage()>1//&&pageNumberShow
            ?<div style={{paddingTop:"0rem"}}>
                <div>{`/${calTotalPage()}`}</div>
            </div>
            :null
            }

            {(calTotalPage()>1)&&(pageNumber<calTotalPage())//&&pageNumberShow
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
               
            {(calTotalPage()>1)&&(pageNumber<calTotalPage())//&&pageNumberShow
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
        
    </div>  
    )
}

export default renderBadge







/*




            {bullEyeShow
            ?<button
                 onClick={e=>{
                    if(captureSelect){
                        captureSelect(getSelectedLine())
                        if(closeShow){
                            if(closeFunc){closeFunc()}
                        }   
                    }
                }}
            >
                <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                    <p style={{margin:"auto"}}>{countSelectedLine()}</p>
                    <MdRadioButtonChecked
                        className="sm-icon"
                       
                    />
                </div>
            </button>
            :null
            }



*/