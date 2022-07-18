import React from "react";
import { MapContainer,  ZoomControl, LayerGroup, TileLayer } from "react-leaflet";
import { useRef } from "react";

export const CenterMap = (props) => {
  if (props.mapRef.current) {
    props.mapRef.current.setView(props.mapCenter, 17, {animate: true})
    props.mapRef.current.on('click', () => {
      props.removeSelectedMarker();
    })
  }
  return null;
}

const Map = (props) => {
  const mapRef = useRef(false);
  props.setMapRef(mapRef);
  const hotelLayerRef = useRef(false);
  return (
    <MapContainer 
      center={props.leafletMapSettings.mapCenter}
      zoom={props.leafletMapSettings.mapZoom}
      scrollWheelZoom={props.leafletMapSettings.scrollWheelZoom}
      zoomControl={false}
      ref={mapRef}
    >
      <ZoomControl position={props.leafletMapSettings.zoomControlPosition}/>
      {props.selectedMarker.key &&
      <CenterMap 
        mapCenter={props.leafletMapSettings.mapCenter} 
        setMapRef={props.setMapRef}
        removeSelectedMarker={props.removeSelectedMarker}
        mapRef={props.mapRef}
      />}
      
      {props.layers.tiles[0].isChecked &&
        <TileLayer 
          acttibution={props.leafletMapSettings.mapAttribution}
          url={props.leafletMapSettings.mapURL}
          id={props.layers.tiles[0].key}
          maxZoom={props.leafletMapSettings.mapMaxZoom}
          accessToken={props.leafletMapSettings.accessToken}
        />
      }

      {props.layers.tiles[1].isChecked &&
        <TileLayer 
          acttibution={props.leafletMapSettings.mapAttribution}
          url={props.leafletMapSettings.mapURL}
          id={props.layers.tiles[1].key}
          maxZoom={props.leafletMapSettings.mapMaxZoom}
          accessToken={props.leafletMapSettings.accessToken}
        />
      }

      {props.layers.overlay[0].isChecked &&
        <LayerGroup ref={hotelLayerRef}>
          {props.hotelMarkers}
        </LayerGroup>
      }

      {props.layers.overlay[1].isChecked &&
        <LayerGroup>
          {props.mountainPeaksMarkers}
        </LayerGroup>
      }

      {props.layers.overlay[2].isChecked &&
        <LayerGroup>
          {props.skiLiftPolylines}
        </LayerGroup>
      }

      {props.layers.overlay[3].isChecked &&
        <LayerGroup>
          {props.tracksPolilines}
        </LayerGroup>
      }

      {props.layers.overlay[4].isChecked &&
        <LayerGroup>
          {props.footwaysPolylines}
        </LayerGroup>
      }

      {props.layers.overlay[5].isChecked &&
        <LayerGroup>
          {props.hutsPolylines}
        </LayerGroup>
      }

      {props.singleMarker &&
        <LayerGroup>
          {props.singleMarker()}
        </LayerGroup>
      }
    </MapContainer>
  )
}

export default Map;