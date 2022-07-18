import React from "react";
import s from './HotelCard.module.css';

const HotelCard = (props) => {
  const showInfoWindow = () => {
    props.setSelectedHotel(props.hotel);
    props.openInfoWindow();
  };

  const showOnMap = (coords) => {
    props.removeSelectedMarker(props.hotel.properties.id);
    props.setSelectedMarker(props.hotel.properties.id);
    props.setMapCenter(props.hotel.geometry.coordinates)
  }

  return (
    <div className={s.card_wrap}>
      <div className={s.card}>
        <div 
          className={s.select_on_map}
          onClick={ () => showOnMap(props.hotel.geometry.coordinates) }
        >
          <span>on map</span>
        </div>
        <div className={s.image_wrap}>
          <img 
            id={s.hotel_image_preview}
            alt="hotel_image_preview" 
            onClick={ showInfoWindow }
            src={props.hotel.properties.imagePreviewLink}
          />
        </div>
        <div className={s.content_wrap}>
          <div className={s.name_wrap} onClick={ showInfoWindow }>
            <span> {props.hotel.properties.name} </span>
          </div>
          <div className={s.address_wrap}>
            <span className={s.parameter}>Address: </span>
            <span> {props.hotel.properties.address} </span>
          </div>
          <div className={s.description_wrap}>
            <span className={s.parameter}>Type: </span>
            <span> {props.hotel.properties.type} </span>
          </div>
          <div className={s.description_wrap}>
            <span className={s.parameter}>Place: </span>
            <span> {props.hotel.properties.place} </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCard;