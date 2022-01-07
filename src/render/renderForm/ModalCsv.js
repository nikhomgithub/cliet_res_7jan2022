import React from 'react';
import {FaCheck,FaBan} from 'react-icons/fa'; 

import axios from 'axios';

function ModalCsv(props) {

const {filterData,pageData,submitFunc,cancelFunc}=props
const [limitRow,setLimitRow]=React.useState()



return(
<div className="Modal-background">
       
       <div className="Modal-box" style={{width:"60%"}}>
         
           <div className="Modal-header">
               <h3>{pageData.formHead}</h3>
           </div>

           <div className="flex-center-center w-100 bd-green"
                
           >
               renderBody
           </div>

           <div className="Modal-footer">
               <div>
                   <button
                       onClick={e=>{
                           submitFunc()
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