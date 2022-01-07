import React from 'react';
import pageUtil from '../../component/pageComponent/pageUtil'
import filterDataTemplate from './filterDataTemplate'
import {MainContext} from '../../context/MainContext'
import {MdRefresh} from 'react-icons/md';
import {FaPlusCircle,FaMinusCircle} from 'react-icons/fa'

import renderModalImage from '../../component/galleryone/renderModalImage';

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil
//==================================
function BillProductGridComponent(props) {

const {selectProduct,setHideProductGridFunc,
      captureProductListFromSelectProductInProductGrid,
      resetProductList,setResetProductList,
      refreshProductFunc
}=props

const {basicDataSt,
        setReloadBasicData,
        myheader,
        setBasicData
        //widthLeft,setWidthLeft
}=React.useContext(MainContext)

console.log('BillProductGridComponent')

let [filterData,setFilterData]=React.useState({...filterDataTemplate.product})
const [productList,setProductList]=React.useState([])

React.useEffect(()=>{
   //console.log('selectProduct')
   //console.log(selectProduct)

},[selectProduct])


//==========================
React.useEffect(()=>{
    //console.log('productList')
    //console.log(productList)
    captureProductListFromSelectProductInProductGrid(productList)
},[productList])

React.useEffect(()=>{
    if(resetProductList){
        setProductList([])
    }
},[resetProductList])


const addToList=(i)=>{
    let tempProductList=[]
    let matchId=false

    for (let j=0;j<productList.length;j++){
        if(i.id==productList[j].id){
            matchId=true
            const tempExistingQuantity=parseInt(productList[j]["quantity"])
            const tempObj={...productList[j],["quantity"]:tempExistingQuantity+1}
            tempProductList=[...tempProductList,tempObj]
        }
        else {
            tempProductList=[...tempProductList,productList[j]]
        }
    }

    if(!matchId){
        tempProductList=[...tempProductList,
                {...i,
                    ["quantity"]:1,
                    ["detailTime"]:new Date().toISOString()
                }
            ]
    }
    setResetProductList(false)
    setProductList(tempProductList)
} 

const deleteFromList=(i)=>{
    let tempProductList=[]
    let matchId=false

    for (let j=0;j<productList.length;j++){
        if(i.id==productList[j].id){
            matchId=true
            const tempExistingQuantity=parseInt(productList[j]["quantity"])
            if(tempExistingQuantity>0){
                const tempObj={...productList[j],["quantity"]:tempExistingQuantity-1}
                tempProductList=[...tempProductList,tempObj]
            }
            else {
                tempProductList=[...tempProductList,productList[j]]
            }
        }
        else {
            tempProductList=[...tempProductList,productList[j]]
        }
    }
    setResetProductList(false)
    setProductList(tempProductList)
}

const findQuanityFromProductList=(i)=>{
    let quantity=0

    productList.map(j=>{
        if(i.id==j.id){
            quantity=j.quantity
        }
    })

    return quantity
}

                //"w-100 h-100 flex-center-center"


//==========================
const renderImage=()=>{
    return(
        <div className="grid-flex"
             style={{margin:"0.2rem"}}
        >
            <div className="grid-flextile"
                 style={{border:"2px solid white"}}
            >
                <div className='w-100 h-100 flex-center-center bd-blue'>
                    <MdRefresh className="md-icon"
                        onClick={e=>refreshProductFunc({isRawMat:false})}
                    />
                </div>
              
            </div>
            {
                selectProduct.map((i,idx)=>{
                    
                            return(
                                <div key={idx}
                                    className="grid-flextile"
                                    style={{position:"relative",border:"2px solid white"}}
                                >
                                    <img 
                                        style={{width:"100%",height:"100%",borderRadius:"0.5rem"}}
                                        src={i.photoUrl1}
                                        alt={"No Image"}
                                    />
                                    <div style={{position:"absolute",bottom:"0",width:"100%",textAlign:"center",
                                            color:"red",backgroundColor:"white",borderRadius:"0 0 0.5rem 0.5rem",
                                            opacity:"0.9",height:"20%",overflow:"hidden"
                                            }}
                                    >
                                        <p>{i.productName}</p>
                                    </div>

                                    <div style={{position:"absolute",top:"0",right:"0",textAlign:"center",
                                                width:"1.5rem",height:"1.5rem",
                                            color:"white",backgroundColor:"red",borderRadius:"50%",
                                            opacity:"0.9"
                                            }}
                                    >
                                        {findQuanityFromProductList(i)}
                                    </div>


                                    <div className="grid-price" 
                                        style={{top:"0",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0)"}}>
                                        <FaPlusCircle className="lg-icon"
                                            onClick={e=>addToList(i)}
                                        />
                                    </div>
                                    <div className="grid-price" 
                                        style={{bottom:"0",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0)"}}>
                                        <FaMinusCircle className="lg-icon"
                                            onClick={e=>deleteFromList(i)}
                                        />
                                    </div>
                                </div>
                            )
                    
                })
            }
        </div>
    )
}

//====================
return(
<div className="w-100" style={{marginBottom:"4rem"}} >

           {   selectProduct&&
               renderImage()
           }
</div>

)

}
export default BillProductGridComponent;
