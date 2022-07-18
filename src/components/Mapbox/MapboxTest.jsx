import React, {createRef} from "react";
import * as ReactDOM from 'react-dom/server';
import mapboxGl from "!mapbox-gl" ;
import s from "./Mapbox.module.css";
import MapPopup from "../common/MapPopup/MapPopup";



class Mapbox extends React.Component{
  constructor(props) {
    super(props);
    this.mapContainer = createRef();
    this.hotelMarkers = {};
    this.mountainPeakMarkers = {};
    this.skiLiftLines = {};
    this.hutMarkers = {};
    this.previousSelectedMarker = null;
    mapboxGl.accessToken = props.mapboxMapSettings.accessToken;
  }

  componentDidMount() {
    this.map = new mapboxGl.Map({
      container: this.mapContainer.current,
      style: this.props.mapboxMapSettings.style,
      center: [this.props.mapboxMapSettings.mapCenter[1], this.props.mapboxMapSettings.mapCenter[0]],
      zoom: this.props.mapboxMapSettings.mapZoom,
      bearing: this.props.mapboxMapSettings.bearing,
      pitch: this.props.mapboxMapSettings.pitch,
    });

    this.map.on('load', () => {
      this.map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
      });
      // add the DEM source as a terrain layer with exaggerated height
      this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
      
      // add a sky layer that will show when the map is highly pitched
      this.map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });

      this.map.addSource('ski-lifts', {
        'type': 'geojson',
        'data': this.props.skiLiftsData
      });

      this.map.addSource('tracks', {
        'type': 'geojson',
        'lineMetrics': true,
        'data': this.props.tracksData
      });

      this.map.addSource('footways', {
        'type': 'geojson',
        'data': this.props.footwaysData
      });

      this.map.addLayer({
        'id': 'ski-lifts',
        'type': 'line',
        'source': 'ski-lifts',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': this.props.layers.overlay[2].isChecked ? 'visible' : 'none'
          },
          'paint': {
          'line-color': this.props.getColor('lift'),
          'line-width': 4
          },
      });

      this.map.addLayer({
        'id': 'tracks',
        'type': 'line',
        'source': 'tracks',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': this.props.layers.overlay[3].isChecked ? 'visible' : 'none'
          },
          'paint': {
            'line-width': 4,
            'line-color': this.props.getColor('track'),
          },
      });

      this.map.addLayer({
        'id': 'footways',
        'type': 'line',
        'source': 'footways',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': this.props.layers.overlay[4].isChecked ? 'visible' : 'none'
          },
          'paint': {
          'line-color': this.props.getColor('footway'),
          'line-width': 4
          },
      });

      this.map.on('mouseenter', ['ski-lifts', 'tracks', 'footways'], () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      
      this.map.on('mouseleave', ['ski-lifts', 'tracks', 'footways'], () => {
        this.map.getCanvas().style.cursor = '';
      });

      this.map.on('click', 'ski-lifts', (e) => {
        new mapboxGl.Popup({closeButton: false})
          .setLngLat(e.lngLat)
          .setText(e.features[0].properties.type)
          .addTo(this.map)
      })

      this.map.on('click', 'tracks', (e) => {
        new mapboxGl.Popup({closeButton: false})
          .setLngLat(e.lngLat)
          .setHTML(`
            <h3>${e.features[0].properties.name ? e.features[0].properties.name : "Ski track"}</h3>
            <h4>
              ${(e.features[0].properties['piste:difficulty']) 
              ? e.features[0].properties['piste:difficulty'] : ""}
            </h4>
          `)
          .addTo(this.map)
      });

      this.map.on('click', 'footways', (e) => {
        new mapboxGl.Popup({closeButton: false})
          .setLngLat(e.lngLat)
          .setHTML(`
            <h3>${(e.features[0].properties.name) 
              ? e.features[0].properties.name : "Path (footway)"}</h3>
            <h4>${(e.features[0].properties.ski) ? `Ski: ${e.features[0].properties.ski}` : ""}</h4>
          `)
          .addTo(this.map)
      })

      this.props.hotelsData.features.forEach(hotel => {
        this.hotelMarkers[hotel.properties.id] = this.createMarker(hotel, 
          this.props.getColor(this.props.selectedMarker.key === hotel.properties.id
            ? 'selected' 
            : hotel.properties.place))
      });

      this.props.mountainPeaksData.features.forEach(peak => {
        this.mountainPeakMarkers[peak.properties.id] = this.createMarker(peak,
          this.props.getColor('peak'));
      });

      this.props.alpineHutsData.features.forEach(hut => {
        this.hutMarkers[hut.id] = this.createMarker(hut, this.props.getColor('hut'));
      });

      if (this.props.selectedMarker.key) this.previousSelectedMarker = this.props.selectedMarker.key;

      if (this.props.layers.overlay[0].isChecked) {
        Object.values(this.hotelMarkers).forEach(marker => marker.addTo(this.map))
      } else {
        Object.values(this.hotelMarkers).forEach(marker => marker.remove())
      };

      if (this.props.layers.overlay[1].isChecked) {
        Object.values(this.mountainPeakMarkers).forEach(peak => peak.addTo(this.map))
      } else {
        Object.values(this.mountainPeakMarkers).forEach(peak => peak.remove())
      };

      if (this.props.layers.overlay[5].isChecked) {
        Object.values(this.hutMarkers).forEach(hut => hut.addTo(this.map))
      } else {
        Object.values(this.hutMarkers).forEach(hut => hut.remove())
      };
    });

    this.map.on('click', () => {
      this.props.removeSelectedMarker();
    })
  };

  componentDidUpdate() {
    if (this.props.layers.overlay[0].isChecked) {
      Object.values(this.hotelMarkers).forEach(marker => marker.addTo(this.map))
    } else {
      Object.values(this.hotelMarkers).forEach(marker => marker.remove())
    };

    if (this.props.layers.overlay[1].isChecked) {
      Object.values(this.mountainPeakMarkers).forEach(peak => peak.addTo(this.map))
    } else {
      Object.values(this.mountainPeakMarkers).forEach(peak => peak.remove())
    };

    if (this.props.layers.overlay[5].isChecked) {
      Object.values(this.hutMarkers).forEach(hut => hut.addTo(this.map))
    } else {
      Object.values(this.hutMarkers).forEach(hut => hut.remove())
    };

    if (this.props.layers.overlay[2].isChecked) {
      this.map.setLayoutProperty('ski-lifts', 'visibility', 'visible')
    } else {
      this.map.setLayoutProperty('ski-lifts', 'visibility', 'none')
    };

    if (this.props.layers.overlay[3].isChecked) {
      this.map.setLayoutProperty('tracks', 'visibility', 'visible')
    } else {
      this.map.setLayoutProperty('tracks', 'visibility', 'none')
    };

    if (this.props.layers.overlay[4].isChecked) {
      this.map.setLayoutProperty('footways', 'visibility', 'visible')
    } else {
      this.map.setLayoutProperty('footways', 'visibility', 'none')
    };

    if (this.props.selectedMarker.key) {
      this.hotelMarkers[this.props.selectedMarker.key].remove();
      this.hotelMarkers[this.props.selectedMarker.key] = this.createMarker(
        this.props.hotelsData.features
          .find(h => h.properties.id === this.props.selectedMarker.key),
        this.props.getColor('selected')
        );
      this.hotelMarkers[this.props.selectedMarker.key]
        .addTo(this.map)
        .togglePopup();
      this.map.setCenter([
        this.props.mapboxMapSettings.mapCenter[1], 
        this.props.mapboxMapSettings.mapCenter[0]
      ]);
      this.map.setZoom(15);
      this.map.setPitch(40);
    }

    Object.keys(this.hotelMarkers).forEach(key => {
      if (this.hotelMarkers[key]._color === this.props.getColor('selected') &&
          key !== this.props.selectedMarker.key
      ) {
        this.hotelMarkers[key].remove();
        let hotel = this.props.hotelsData.features.find(h => h.properties.id === key);
        this.hotelMarkers[key] = this.createMarker(
          hotel,
          this.props.getColor(hotel.properties.place)
        );
        if (this.props.layers.overlay[0].isChecked) this.hotelMarkers[key].addTo(this.map);
      }
    })
  };

  createMarker(object, color) {
    let marker = new mapboxGl.Marker({
      draggable: false,
      color: color,
    })
      .setLngLat(this.lnglat(object.geometry.coordinates))
      .setPopup(new mapboxGl.Popup({closeButton: false, opacity: 0.15, maxWidth: '300px'})
        .setText(object.properties.name))

    marker.getElement().addEventListener('mouseenter', (e) => {
      e.target.style.cursor = 'pointer';
    });
    marker.getElement().addEventListener('mouseleave', (e) => {
      e.target.style.cursor = '';
    });
    if (object.properties.id && object.properties.id.includes('h')) {
      marker.getElement().addEventListener('click', (e) => {
        this.handleMarkerClick(object);
        e.stopPropagation();
      });
      const placeholder = ReactDOM.renderToStaticMarkup(
      <MapPopup 
        hotel={object}
        setSelectedHotel={this.props.setSelectedHotel}
        openInfoWindow={this.props.openInfoWindow}
      />);
      marker.getPopup().setHTML(placeholder)
    }
    return marker;
  }

  handleMarkerClick(object) {
    this.props.removeSelectedMarker(object.properties.id);
    this.props.setSelectedMarker(object.properties.id);
    this.props.setMapCenter(object.geometry.coordinates);
  }

  lnglat(coords) {
    return {
      lat: coords[0],
      lng: coords[1],
    };
  };

  getPopup(hotel) {
    return (
      <div style={{ display: 'none' }}>
        <div>
          <MapPopup 
            hotel={hotel}
            setSelectedHotel={this.props.setSelectedHotel}
            openInfoWindow={this.props.openInfoWindow}
          />
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div className={s.mapbox_wrapper}>
        <div ref={this.mapContainer} className={s.map_container}></div>
      </div>
    )
  };
};

export default Mapbox;