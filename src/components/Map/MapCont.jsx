import './Map.module.css';
import { Marker, Popup, Polyline } from 'react-leaflet';
import getIcon from '../../getIcon';
import Map from './Map';
import MapPopup from '../common/MapPopup/MapPopup';

const MapCont = (props) => {
  const getHotelMarker = (hotel) => { 
    let markerIcon;
    if (hotel.properties.id === props.selectedMarker.key) {
      props.removeObjectsFromMap([props.selectedMarker.key]);
      markerIcon = getIcon('red');
    } else {
      markerIcon = getIcon(props.getColor(hotel.properties.place));
    }

    const handleMarkerClick = () => {
      props.removeSelectedMarker(hotel.properties.id);
      props.setSelectedMarker(hotel.properties.id);
      props.setMapCenter(hotel.geometry.coordinates);
    }
    
    return (
      <Marker 
        id={hotel.properties.id}
        key={hotel.properties.id} 
        icon={ markerIcon } 
        position={hotel.geometry.coordinates}
        eventHandlers={{
          click: () => handleMarkerClick()
        }}
      >
        <Popup>
          <MapPopup 
            hotel={hotel}
            setSelectedHotel={props.setSelectedHotel}
            openInfoWindow={props.openInfoWindow}
          />
        </Popup>
      </Marker>
    )
  };

  const hotelMarkers = props.hotelsData.features.map((hotel => getHotelMarker(hotel)))

  const mountainPeaksMarkers = props.mountainPeaksData.features.map((mountainPeak) => {
    return (
      <Marker
        id={mountainPeak.properties.id}
        key={mountainPeak.properties.id} 
        icon={getIcon(props.getColor("peak"))}
        position={mountainPeak.geometry.coordinates}>
        <Popup>
          <h3>{mountainPeak.properties.name}</h3>
        </Popup>
      </Marker>
    )
  });

  const skiLiftPolylines = props.skiLiftsData.features.map((skiLift) => {
    return (
      <Polyline
        id={skiLift.properties.id}
        key={skiLift.properties.id}
        color={props.getColor("lift")}
        positions={skiLift.geometry.coordinates.map(coord => [coord[1], coord[0]])}>
        <Popup>
          <h3>{skiLift.properties.type}</h3>
        </Popup>
      </Polyline>
    )
  });

  const tracksPolilines = props.tracksData.features.map(track => {
    return (
      <Polyline 
        id={track.id}
        key={track.id}
        color={props.getColor("track")}
        positions={track.geometry.coordinates.map(coord => [coord[1], coord[0]])}
      >
        <Popup>
          <h3>{track.properties.name ? track.properties.name : "Ski track"}</h3>
          <h4>
            {(track.properties['piste:difficulty']) 
            ? track.properties['piste:difficulty'] : ""}
          </h4>
        </Popup>
      </Polyline>
    )
  })

  const footwaysPolylines = props.footwaysData.features.map(footway => {
    return (
      <Polyline 
        id={footway.id}
        key={footway.id}
        color={props.getColor("footway")}
        positions={footway.geometry.coordinates.map(coord => [coord[1], coord[0]])}
      >
        <Popup>
          <h3>{(footway.properties.name) 
            ? footway.properties.name : "Path (footway)"}</h3>
          <h4>{(footway.properties.ski) ? `Ski: ${footway.properties.ski}` : ""}</h4>
        </Popup>
      </Polyline>
    )
  })

  const hutsPolylines = props.alpineHutsData.features.map(hut => {
    return (
      <Marker
        id={hut.id}
        key={hut.id} 
        icon={getIcon(props.getColor("hut"))}
        position={hut.geometry.coordinates}>
        <Popup>
          <h3>{hut.properties.name ? hut.properties.name : "Приют"}</h3>
          <h4>{hut.properties.ele ? hut.properties.ele : ""}</h4>
          <h4>{hut.properties.official_status ? hut.properties.official_status : ""}</h4>
        </Popup>
      </Marker>
    )
  });
  

  const singleMarker = (props.selectedMarker.key && props.mapRef.current &&
    !Object.values(props.mapRef.current._layers)
          .find(obj => obj.options.id === props.selectedMarker.key))
    ? () => getHotelMarker(props.hotelsData.features
          .find(h => h.properties.id === props.selectedMarker.key))
    : null

  return (
    <Map {...props} 
      hotelMarkers={hotelMarkers}
      mountainPeaksMarkers={mountainPeaksMarkers}
      skiLiftPolylines={skiLiftPolylines}
      singleMarker={singleMarker}
      tracksPolilines={tracksPolilines}
      footwaysPolylines={footwaysPolylines}
      hutsPolylines={hutsPolylines}
    />
  )
}

export default MapCont;