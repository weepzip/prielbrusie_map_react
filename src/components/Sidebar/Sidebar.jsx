import React from "react";
import HotelCard from "./HotelCard/HotelCard";
import s from "./Sidebar.module.css";

const Sidebar = (props) => {
  const hideSidebar = () => {
    props.closeSidebar();
  }

  return (
    <div className={s.sidebar_wrapper}>
      <div id={s.sidebar}>
        <div id={s.close_sidebar} onClick={ () => hideSidebar() }>
          <span>X</span>
        </div>
        <div className={s.content_wrapper}>
          <div className={s.content}>
            {props.hotelsData.features.map(hotel => {
              return (
                <HotelCard 
                  hotel={hotel} 
                  key={hotel.properties.id}
                  openSidebar={ props.openSidebar } 
                  closeSidebar={ props.closeSidebar }
                  openInfoWindow={ props.openInfoWindow }
                  closeInfoWindow={ props.closeInfoWindow }
                  setSelectedHotel={ props.setSelectedHotel }
                  setSelectedMarker={ props.setSelectedMarker }
                  removeSelectedMarker={ props.removeSelectedMarker }
                  setMapCenter={ props.setMapCenter }
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;