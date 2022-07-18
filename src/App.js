import './App.css';
import MapCont from './components/Map/MapCont';
import React from 'react';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import InfoWindowContainer from './components/InfoWindow/InfoWindowContainer';
import { connect } from 'react-redux';
import TileMenu from './components/common/TileMenu/TileMenu';
import LayersOverlay from './components/common/Overlay/LayersOverlay';
import Mapbox from './components/Mapbox/MapboxTest';

import {
  addObjectsOnMap,
  removeObjectsFromMap,
  openSidebar, 
  closeSidebar,
  openInfoWindow, 
  closeInfoWindow,
  setSelectedHotel, 
  removeSelectedHotel,
  setSelectedMarker,
  removeSelectedMarker,
  setMapCenter,
  setMapRef,
  setTileLayer,
  toggleLayer } from "./redux/mapDataReducer";

function App(props) {
  let getColor = (place) => {
    switch (place) {
      case ("поляна Азау"): return props.leafletMapSettings.iconColor.azau;
      case ("поляна Чегет"): return props.leafletMapSettings.iconColor.cheget;
      case ("peak"): return props.leafletMapSettings.iconColor.mountain;
      case ("selected"): return props.leafletMapSettings.iconColor.selected;
      case ("lift"): return props.leafletMapSettings.iconColor.lift;
      case ("track"): return props.leafletMapSettings.iconColor.track;
      case ("footway"): return props.leafletMapSettings.iconColor.footway;
      case ("hut"): return props.leafletMapSettings.iconColor.hut;
      default: return props.leafletMapSettings.iconColor.town
    }
  };

  return (
    <div className="App">
      {props.layers.tiles[2].isChecked
        ? <Mapbox {...props} getColor={getColor} />
        : <MapCont {...props} getColor={getColor} />
      }
      <SidebarContainer {...props}/>
      <InfoWindowContainer {...props} />
      <TileMenu 
        tiles={props.layers.tiles}
        setTileLayer={props.setTileLayer}
      />
      <LayersOverlay
        overlay={props.layers.overlay}
        toggleLayer={props.toggleLayer}
      />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {...state.mapData}
};

export default connect(mapStateToProps, {
  addObjectsOnMap,
  removeObjectsFromMap,
  openSidebar,
  closeSidebar, 
  openInfoWindow, 
  closeInfoWindow,
  setSelectedHotel,
  removeSelectedHotel, 
  setSelectedMarker, 
  removeSelectedMarker,
  setMapCenter,
  setMapRef,
  setTileLayer,
  toggleLayer,
})(App);