


import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';

import BasicData from './page/basicdata/BasicData'
import Branch from './page/branch/Branch'

import Bill from './page/bill/Bill'

import Partner from './page/partner/Partner'
import Product from './page/product/Product'
import Home from './page/home/Home'
import LogIn from './page/login/LogIn'
import Transaction from './page/transaction/Transaction'

import {MainContext} from './context/MainContext'

import './App2.css'

function App() {
console.log('App')
const {basicDataSt}=React.useContext(MainContext)


return basicDataSt.basicData&&basicDataSt.pageData&&basicDataSt.tableTemplate
?<div className="bgc-lightGray">
      <Route exact path="/" render={()=>(<Redirect to="/pos/home"/>)}/>
      <Route exact path="/pos" render={()=>(<Redirect to="/pos/home"/>)}/>

      <Route exact path="/pos/login" component={LogIn}/>
      <Route exact path="/pos/home" component={Home}/> 
      <Route exact path="/pos/bill" component={Bill}/> 
      <Route exact path="/pos/basicdata" component={BasicData}/> 
      <Route exact path="/pos/branch" component={Branch}/> 

      <Route exact path="/pos/partner" component={Partner}/> 
      <Route exact path="/pos/product" component={Product}/> 

</div>
:<div className="bgc-lightGray" style={{width:"100w",height:"100vh"}}>
      <LogIn/>
</div>

}
export default App;



/*




import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';

import BasicData from './page/basicdata/BasicData'
import Branch from './page/branch/Branch'

import Bill from './page/bill/Bill'
import Partner from './page/partner/Partner'
import Product from './page/product/Product'
import Home from './page/home/Home'
import LogIn from './page/login/LogIn'
import Transaction from './page/transaction/Transaction'
import {MainContext} from './context/MainContext'

import './App2.css'

function App() {
console.log('App')
const {basicDataSt}=React.useContext(MainContext)

return basicDataSt.basicData&&basicDataSt.pageData&&basicDataSt.tableTemplate
?<div className="bgc-lightGray">
      <Route exact path="/" render={()=>(<Redirect to="/pos/home"/>)}/>
      <Route exact path="/pos" render={()=>(<Redirect to="/pos/home"/>)}/>

      <Route exact path="/pos/login" component={LogIn}/>
      <Route exact path="/pos/home" component={Home}/> 
      <Route exact path="/pos/bill" component={Bill}/> 
      <Route exact path="/pos/basicdata" component={BasicData}/> 
      <Route exact path="/pos/branch" component={Branch}/> 

      <Route exact path="/pos/partner" component={Partner}/> 
      <Route exact path="/pos/product" component={Product}/> 

</div>
:<div className="bgc-lightGray" style={{width:"100w",height:"100vh"}}>
      <LogIn/>
</div>



}
export default App;






//=================================
//=================================
//=================================

//=================================
//=================================
//=================================

import React from 'react';

import './App2.css'

function App() {
console.log('App')

const [inputState,setInState]=React.useState({
      username:"",
      password:""
})


const submitFunc=()=>{

}

return (

      <div className="w-100 h-100">
            <div style={{display:"flex"}}>
                  <div>user name</div>
                  <input type="text"
                        value={inputState.username}
                        onChange={e=>{
                              setInState({...inputState,
                                    username:e.target.value
                              })
                        }}
                  />
            </div>
                        

            <div style={{display:"flex"}}>
                        <div>
                              password
                        </div>

                  <input
                        autoComplete="one-time-code"
                        type="password"
                        value={inputState.password}
                        onChange={e=>{
                              setInState({...inputState,
                              password:e.target.value
                        })
                        }}
                  />  
            </div>

            <button onClick={e=>{
                  submitFunc()
                  window.location.reload()
            }
            }>
                  Submit
            </button>
      </div>
)



}
export default App;


//=================
//================





import React from 'react';
import {MainContext} from './context/MainContext'

import './App2.css'

function App() {
console.log('App')
const {basicDataSt}=React.useContext(MainContext)

return (
<div className='w-100'>
            <div style={{backgroundColor:"white"}}>
                  <div style={{fontSize:"1rem"}}>111111</div>
                  <div style={{fontSize:"0.8rem"}}>111118</div>
                  <div style={{fontSize:"0.6rem"}}>111116</div>
                  <div style={{fontSize:"0.4rem"}}>111114</div>
                  <div style={{fontSize:"0.3rem"}}>111113</div>
                  <div style={{fontSize:"0.2rem"}}>111112</div>
            </div>
            <div>-------------------</div>
            <div style={{backgroundColor:"gray"}}>
                  <div style={{fontSize:"1rem"}}>111111</div>
                  <div style={{fontSize:"0.8rem"}}>111118</div>
                  <div style={{fontSize:"0.6rem"}}>111116</div>
                  <div style={{fontSize:"0.4rem"}}>111114</div>
                  <div style={{fontSize:"0.3rem"}}>111113</div>
                  <div style={{fontSize:"0.2rem"}}>111112</div>
            </div>
            <div>-------------------</div>
            <div style={{}}>
                  <div style={{fontSize:"1rem"}}>111111</div>
                  <div style={{fontSize:"0.8rem"}}>111118</div>
                  <div style={{fontSize:"0.6rem"}}>111116</div>
                  <div style={{fontSize:"0.4rem"}}>111114</div>
                  <div style={{fontSize:"0.3rem"}}>111113</div>
                  <div style={{fontSize:"0.2rem"}}>111112</div>

            </div>

            <div style={{backgroundColor:"white"}}>
                  <div style={{fontSize:"1rem"}}>111111</div>
                  <div style={{fontSize:"0.8rem"}}>111118</div>
                  <div style={{fontSize:"0.6rem"}}>111116</div>
                  <div style={{fontSize:"0.4rem"}}>111114</div>
                  <div style={{fontSize:"0.3rem"}}>111113</div>
                  <div style={{fontSize:"0.2rem"}}>111112</div>
            </div>
            <div>-------------------</div>
            <div style={{backgroundColor:"gray"}}>
                  <div style={{fontSize:"1rem"}}>111111</div>
                  <div style={{fontSize:"0.8rem"}}>111118</div>
                  <div style={{fontSize:"0.6rem"}}>111116</div>
                  <div style={{fontSize:"0.4rem"}}>111114</div>
                  <div style={{fontSize:"0.3rem"}}>111113</div>
                  <div style={{fontSize:"0.2rem"}}>111112</div>
            </div>
            <div>-------------------</div>
            <div style={{}}>
                  <div style={{fontSize:"1rem"}}>สวัสดีมาก</div>
                  <div style={{fontSize:"0.8rem"}}>ดีใจจริง</div>
                  <div style={{fontSize:"0.6rem"}}>น้ำพริก</div>
                  <div style={{fontSize:"0.4rem"}}>ปลากระป๋อง</div>
                  <div style={{fontSize:"0.3rem"}}>111113</div>
                  <div style={{fontSize:"0.2rem"}}>111112</div>

            </div>
      </div>
)
}
export default App;









*/