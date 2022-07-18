import React from "react";
import mapboxGl from "!mapbox-gl" ;
import s from "./Mapbox.module.css"
import { useRef } from "react";



const Mapbox = (props) => {
  const mapContainer = useRef();
  mapboxGl.accessToken = props.mapboxMapSettings.accessToken;

  const map = new mapboxGl.Map({
    container: mapContainer.current,
    style: props.mapboxMapSettings.style,
    center: [props.mapboxMapSettings.mapCenter[1], props.mapboxMapSettings.mapCenter[0]],
    zoom: props.mapboxMapSettings.mapZoom,
    bearing: props.mapboxMapSettings.bearing,
    pitch: props.mapboxMapSettings.pitch,
  });

  map.on('load', () => {
    map.addSource('mapbox-dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    'tileSize': 512,
    'maxzoom': 14
    });
    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    
    // add a sky layer that will show when the map is highly pitched
    map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15
      }
    });
  });
  
  const lnglat = (coords) => {
    return {
      lat: coords[0],
      lng: coords[1],
    }
  }
  if (map && map.loaded() && props.layers.overlay[0].isChecked) {
    props.hotelsData.features.forEach(hotel => {
      new mapboxGl.Marker()
        .setLngLat(lnglat(hotel.geometry.coordinates))
        .addTo(map)
    })
  }

/*   useEffect(() => {
    const getIconColor = (place) => {
      switch (place) {
        case ("поляна Азау"): return props.leafletMapSettings.iconColor.azau;
        case ("поляна Чегет"): return props.leafletMapSettings.iconColor.cheget;
        case ("вершина"): return props.leafletMapSettings.iconColor.mountain;
        case ("selected"): return props.leafletMapSettings.iconColor.selected;
        default: return props.leafletMapSettings.iconColor.town
      }
    };

    const map = new mapboxGl.Map({
      container: mapContainer.current,
      style: props.mapboxMapSettings.style,
      center: [props.mapboxMapSettings.mapCenter[1], props.mapboxMapSettings.mapCenter[0]],
      zoom: props.mapboxMapSettings.mapZoom,
      bearing: props.mapboxMapSettings.bearing,
      pitch: props.mapboxMapSettings.pitch,
    });

    map.on('load', () => {
      map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
      
      // add a sky layer that will show when the map is highly pitched
      map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 15
      }
      });

      map.addSource('hotels', {
        'type': 'geojson',
        'data': hotels
      })

      map.addLayer({
        'id': 'hotels',
        'type': 'circle',
        'source': 'hotels',
        'paint': {
          'circle-radius': 6,
          'circle-color': '#ff5555'
        },
        'filter': ['==', '$type', 'Point']
      })

      props.setMapRef(map);
    });
  }, [props]); */

/*   useEffect(() => {
    const lnglat = (coords) => {
      return {
        lat: coords[0],
        lng: coords[1],
      }
    }
    if (props.mapRef && props.mapRef.loaded() && props.layers.overlay[0].isChecked) {
      props.hotelsData.features.forEach(hotel => {
        new mapboxGl.Marker()
          .setLngLat(lnglat(hotel.geometry.coordinates))
          .addTo(props.mapRef)
      })
    }
  }, [props]) */

  return (
    <div className={s.mapbox_wrapper}>
      <div ref={mapContainer} className={s.map_container}></div>
    </div>
  )
};

export default Mapbox;