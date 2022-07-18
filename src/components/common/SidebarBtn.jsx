import React from "react";
import s from './SidebarBtn.module.css';

const SidebarBtn = (props) => {
  const showSidebar = () => {
    props.openSidebar();
  }

  return (
    <div id={s.sidebar_open_btn} onClick={ showSidebar }>
      <span>Sidebar</span>
    </div>
  )
};

export default SidebarBtn;