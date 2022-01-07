import React from 'react'

import {MdRefresh,MdSwapHoriz,MdSettings,
    MdSearch,MdEdit,MdAddCircle,MdDelete,MdPrint,
    MdChevronLeft,MdChevronRight,MdLastPage,
    MdRadioButtonChecked,MdClose,MdRedo
} from 'react-icons/md';

import Ticon from '../../component/ticon/Ticon'

import {RiShareForwardLine} from 'react-icons/ri'

import { FaBullseye, FaRegArrowAltCircleUp,FaRegArrowAltCircleLeft} from 'react-icons/fa';

const renderBadgeForBill = ({
                filterData,
                setPageNumber,
                bgColor,
                backToFilter,
                editData,
                captureEditData,
                setReloadDataFunc,
                genCsv
                //setShowModalCsv
})=>{
    //console.log('renderBadgeForBill')
    //console.log(filterData)

    const {pageNumber,limitRow,count}=filterData

    const calTotalPage =()=>{
       return Math.ceil(count/limitRow)
    }

    
    return (
    <div className="badge-frame-xc12"
        style={{background:bgColor,height:"2rem"}}
    > 
        
        <div className="flex-center-center flex-no-wrap xc12 jc-start"
              style={{overflow:"hidden",justifyContent:"flex-start"}}>
            
            {/*
            <FaRegArrowAltCircleLeft
                className="sm-icon"
                onClick={e=>backToFilter()}
            />
            */}

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

            <MdRefresh
                className="sm-icon"
                onClick={e=>{
                    setReloadDataFunc()
                    //captureEditData(editData)
                }}
            />
            
            <div className="iconbox"
                onClick={e=>{
                    genCsv()
                    //setShowModalCsv(true)
                    //if(csvFunc){csvFunc()}
                }}
            >
                <Ticon 
                    iconName="FaFileCsv"
                    className="sm-icon" 
                    textStyle={{color:"black"}}
                />
            </div>


            {editData&&
            <RiShareForwardLine
                className="sm-icon"
                onClick={e=>{
                    captureEditData(editData)
                }}
            />
            }
            
        </div>
        
    </div>  
    )
}

export default renderBadgeForBill
