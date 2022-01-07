import React from 'react';
import NewGroupComponent from '../../render/renderTree/NewGroupComponent.js'
//import myheader from '../../myheader'

function AppNewGroupComponent() {
  const selectData={mainGroup:2,openArray:[1,2,5,15,16]}

  const [selectGroup,setSelectGroup]=React.useState(null)

  React.useEffect(()=>{
    console.log('selectGroup')
    console.log(selectGroup)
  },[selectGroup])

  //=======================
  return (
    <div className="h-100 w-100 bd-black">  
        <NewGroupComponent
            groupDataUrl={"p27group"}
            canGroupChange={true}
            selectData={selectData}
            setSelectGroup={setSelectGroup}
        />
    </div>
  );
}

export default AppNewGroupComponent;
