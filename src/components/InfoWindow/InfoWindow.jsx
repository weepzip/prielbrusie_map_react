import React from "react";
import s from './InfoWindow.module.css';

const InfoWindow = (props) => {
  const hideInfoWindow = () => {
    props.closeInfoWindow();
    props.removeSelectedHotel(props.hotel.properties.id);
  }

  return (
    <div className={s.wrapper}>
      <div className={s.window_wrap}>
        <div className={s.window}>
          <div id={s.window_close_btn} onClick={ hideInfoWindow }>
            <span>X</span>
          </div>
          <div className={s.content}>
            <div className={s.left_side}>
              <div className={s.main_image_wrap}>
                <img 
                  id={s.hotel_main_image} 
                  alt="hotel_image"
                  src={props.hotel.properties.imagePreviewLink}/>
              </div>
              <div className={s.gallery_wrap}>
                <p>Gallery</p>
                <div className={s.gallery}>
                  {props.hotel.properties.imageLinks.map((link, index) => {
                    if (index < 3) {
                      return (
                        <div className={s.gallery_image_wrap} key={index} >
                          <img 
                            key={index}
                            alt="img" 
                            className={s.gallery_image_preview}
                            src={link}
                            />
                        </div>
                      )
                    } else return null
                  })}
                </div>
              </div>
            </div>
            <div className={s.right_side_scroll}>
              <div className={s.right_side}>
                <div className={s.name}>
                  <span>
                    {props.hotel.properties.name ? props.hotel.properties.name : "Name"}
                  </span>
                </div>
                <div className={s.info}>
                  <span>Information</span>
                  <p><span>Type: </span>
                    {props.hotel.properties.type ? props.hotel.properties.type : "type"}
                  </p>
                  <p><span>Place: </span>
                    {props.hotel.properties.place ? props.hotel.properties.place : "place"}
                  </p>
                  <p><span>Address: </span>
                    {props.hotel.properties.address ? props.hotel.properties.address : "address"}
                  </p>
                </div>
                <div className={s.description}>
                  <span>Description</span>
                  {!props.hotel.properties.description
                    ? "description"
                    : props.hotel.properties.description.map((p, i) => {
                      if (p) {return <p key={i}>{p}</p>} else {return null}
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoWindow;