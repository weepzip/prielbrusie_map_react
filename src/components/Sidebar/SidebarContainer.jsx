import React from "react";
import SidebarBtn from "../common/SidebarBtn";
import Sidebar from './Sidebar.jsx';

const SidebarContainer = (props) => {

  return (
    <>
      {!props.sidebar.isOpened && 
      <SidebarBtn 
        sidebar={props.sidebar} 
        openSidebar={ props.openSidebar } 
      />}
      {props.sidebar.isOpened && 
      <Sidebar {...props}
      />}
    </>
  )
}

export default SidebarContainer;