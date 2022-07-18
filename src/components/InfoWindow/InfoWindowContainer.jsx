import React from "react";
import InfoWindow from "./InfoWindow";
import s from './InfoWindow.module.css';

const InfoWindowContainer = (props) => {
  return (
    <>
      {/* {(!props.infoWindow.isOpened || !props.selectedHotel.object.type) &&
      <div id={s.empty}></div>} */}
      {props.infoWindow.isOpened && props.selectedHotel.key &&
      <InfoWindow
        key={props.selectedHotel.key}
        hotel={ props.selectedHotel.object }
        openInfoWindow={ props.openInfoWindow }
        closeInfoWindow={ props.closeInfoWindow }
        removeSelectedHotel={ props.removeSelectedHotel }
      />
      }
    </>
  )
}

export default InfoWindowContainer;

/* const mapStateToProps = (state) => {
  return ({
    ...state.mapData
  })
}

export default connect(mapStateToProps, {
  openInfoWindow,
  closeInfoWindow,
  removeSelectedHotel,
})(InfoWindowContainer); */