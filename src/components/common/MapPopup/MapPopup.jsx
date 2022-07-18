import React from "react";
import s from './MapPopup.module.css';

const MapPopup = (props) => {
  const showInfoWindow = () => {
    props.setSelectedHotel(props.hotel);
    props.openInfoWindow();
  };

  return (
    <div className={s.popup}>
      <div className={s.content}>
        <div className={s.image_wrap}>
          {props.hotel.properties.imagePreviewLink &&
          <img 
            id={s.popup_image_preview} 
            alt='image_preview' 
            src={props.hotel.properties.imagePreviewLink} 
            onClick={ showInfoWindow }
          />}
        </div>
        <div className={s.info}>
          {props.hotel.properties.name
            ? <div className={s.name_wrap}
                onClick= { showInfoWindow }
              ><span>{props.hotel.properties.name}</span></div>
            : <div className={s.name_wrap}><span>Unknown</span></div>}
          <div className={s.other_info}>
            {props.hotel.properties.type &&
            <p><span>Type: </span>{props.hotel.properties.type}</p>}
            {props.hotel.properties.place &&
            <p><span>Place: </span>{props.hotel.properties.place}</p>}
            {props.hotel.properties.address &&
            <p><span>Address: </span>{props.hotel.properties.address}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPopup;