import mountainPeaksData from '../data/mountainpeaks.json';
import hotelsData from '../data/prielbrusie.json';
import skiLiftsData from '../data/skilift.json';
import tracksData from '../data/tracks.json';
import footwaysData from '../data/footway_path.json';
import alpineHutsData from '../data/alpine_hut.json';

hotelsData.features.forEach(hotel => {
  hotel.geometry.coordinates.reverse()
});

mountainPeaksData.features.forEach(peak => {
  peak.geometry.coordinates.reverse();
});

alpineHutsData.features.forEach(hut => {
  hut.geometry.coordinates.reverse();
})

/* skiLiftsData.features.forEach(lift => {
  lift.geometry.coordinates.forEach(coords => coords.reverse())
}); */

const ADD_OBJECTS_ON_MAP = "ADD_OBJECT_ON_MAP";
const REMOVE_OBJECTS_FROM_MAP = "REMOVE_OBJECT_FROM_MAP";
const OPEN_SIDEBAR = "OPEN_SIDEBAR";
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";
const OPEN_INFO_WINDOW = "OPEN_INFO_WINDOW";
const CLOSE_INFO_WINDOW = "CLOSE_INFO_WINDOW";
const SET_SELECTED_HOTEL = "SET_SELECTED_HOTEL";
const REMOVE_SELECTED_HOTEL = "REMOVE_SELECTED_HOTEL";
const SET_SELECTED_MARKER = "SET_SELECTED_MARKER";
const REMOVE_SELECTED_MARKER = "REMOVE_SELECTED_MARKER";
const SET_MAP_CENTER = "SET_MAP_CENTER";
const SET_MAP_REF = "SET_MAP_REF";
const SET_TILE_LAYER = "SET_TILE_LAYER";
const TOGGLE_LAYER = "TOGGLE_LAYER";


const initialState = {
  sidebar: {
    isOpened: false,
  },
  mapRef: null,
  objectsOnMap: [],
  selectedMarker: {
    key: null,
    object: null,
  },
  selectedHotel: {
    key: null,
    object: null,
  },
  infoWindow: {
    isOpened: false,
  },
  mountainPeaksData,
  hotelsData,
  skiLiftsData,
  tracksData,
  footwaysData,
  alpineHutsData,
  layers: {
    tiles: [
      {
        name: 'Satellite',
        isChecked: true,
        key: 'mapbox/satellite-streets-v11',
      },
      {
        name: 'Outdoors',
        isChecked: false,
        key: 'mapbox/outdoors-v11',
      },
      {
        name: 'Terrain-DEM',
        isChecked: false,
        key: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      }
    ],
    overlay: [
      {
        name: 'Hotels',
        key: "hotels",
        isChecked: true,
      },
      {
        name: 'Mountain Peaks',
        key: "mountains",
        isChecked: false,
      },
      {
        name: 'Ski lifts',
        key: "lifts",
        isChecked: false,
      },
      {
        name: 'Tracks',
        key: 'tracks',
        isChecked: false,
      },
      {
        name: 'Footways',
        key: 'footways',
        isChecked: false,
      },
      {
        name: 'Alpine Huts',
        key: 'huts',
        isChecked: false,
      }
    ],
  },
  leafletMapSettings: {
    mapCenter: ["43.255951", "42.512950"],
    mapZoom: 15,
    scrollWheelZoom: true,
    mapMaxZoom: 17,
    accessToken: 'pk.eyJ1Ijoid2VlcHppcCIsImEiOiJja3MxdnF1aTExeG51MzJzN2Y1N3g1cmZjIn0.VJciVUTVQGi_8_el9x2maQ',
    mapURL: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    mapAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    layerControlIsCollapsed: true,
    layersControlPosition: 'topright',
    zoomControlPosition: 'bottomright',
    iconColor: {
      selected: 'red',
      azau: '#c49',
      cheget: '#4c5',
      town: 'blue',
      mountain: 'gray',
      lift: '#97b',
      track: '#79f',
      footway: '#996',
      hut: '#aaf',
    }
  },
  mapboxMapSettings: {
    accessToken: 'pk.eyJ1Ijoid2VlcHppcCIsImEiOiJja3MxdnF1aTExeG51MzJzN2Y1N3g1cmZjIn0.VJciVUTVQGi_8_el9x2maQ',
    style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
    mapCenter: ["43.255951", "42.512950"],
    mapZoom: 12,
    bearing: -30,
    pitch: 40,
  }
}

const mapDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case (ADD_OBJECTS_ON_MAP): {
      let stateCopy = {
        ...state,
      };
      action.objects.forEach(elem => {
        if (!stateCopy.objectsOnMap.find(obj => obj.key === elem.key)) stateCopy.objectsOnMap.push(elem)
      })
      return stateCopy;
    };
    case (REMOVE_OBJECTS_FROM_MAP): {
      let stateCopy = {...state};
      stateCopy.objectsOnMap.forEach((object, index, array) => {
        action.objects.forEach(elem => {
          if (object.key === elem) array.splice(index, 1);
        })
      });
      return stateCopy;
    };
    case (OPEN_SIDEBAR): {
      let stateCopy = {
        ...state,
        sidebar: {isOpened: true}
      };
      return stateCopy;
    };
    case (CLOSE_SIDEBAR): {
      let stateCopy = {
        ...state,
        sidebar: {isOpened: false}
      };
      return stateCopy;
    };
    case (OPEN_INFO_WINDOW): {
      let stateCopy = {
        ...state,
        infoWindow: {isOpened: true},
      };
      return stateCopy;
    };
    case (CLOSE_INFO_WINDOW): {
      let stateCopy = {
        ...state,
        infoWindow: {isOpened: false},
      };
      return stateCopy;
    };
    case (SET_SELECTED_HOTEL): {
      let stateCopy = {
        ...state,
        selectedHotel: {
          key: action.object.properties.id,
          object: action.object,
        }
      };
      return stateCopy;
    };
    case (REMOVE_SELECTED_HOTEL): {
      let stateCopy = {
        ...state,
        selectedHotel: {
          key: null,
          object: null,
        }
      };
      return stateCopy;
    };
    case (SET_SELECTED_MARKER): {
      let stateCopy = {
        ...state,
        selectedMarker: {key: action.key}
      };
      return stateCopy;
    };
    case (REMOVE_SELECTED_MARKER): {
      let stateCopy = {
        ...state,
        selectedMarker: {key: null}
      };
      return stateCopy;
    };
    case (SET_MAP_CENTER): {
      let stateCopy = {
        ...state,
        leafletMapSettings: {
          ...state.leafletMapSettings,
          mapCenter: [Number(action.coords[0]), Number(action.coords[1])],
        },
        mapboxMapSettings: {
          ...state.mapboxMapSettings,
          mapCenter: [Number(action.coords[0]), Number(action.coords[1])],
        }
      };
      return stateCopy;
    };
    case (SET_MAP_REF): {
      let stateCopy = {
        ...state,
        mapRef: action.ref
      };
      return stateCopy;
    };
    case (SET_TILE_LAYER): {
      let stateCopy = {
        ...state,
        layers: {
          ...state.layers,
          tiles: state.layers.tiles.map(tile => {
            return (tile.key === action.key)
            ? {...tile, isChecked: true}
            : {...tile, isChecked: false}
          })
        }
      };
      return stateCopy;
    };
    case (TOGGLE_LAYER): {
      let stateCopy = {
        ...state,
        layers: {
          ...state.layers,
          overlay: state.layers.overlay.map(layer => {
            return (layer.key === action.key) 
              ? {...layer, isChecked: !layer.isChecked}
              : {...layer}
          })
        }
      };
      return stateCopy;
    }
    default: return state;
  }
};

export const addObjectsOnMap = (objects) => {
  return ({
    type: ADD_OBJECTS_ON_MAP,
    objects,
  })
};

export const removeObjectsFromMap = (objects) => {
  return ({
    type: REMOVE_OBJECTS_FROM_MAP,
    objects
  })
};

export const openSidebar = () => {
  return {type: OPEN_SIDEBAR}
};

export const closeSidebar = () => {
  return {type: CLOSE_SIDEBAR}
};

export const openInfoWindow = () => {
  return {type: OPEN_INFO_WINDOW}
};

export const closeInfoWindow = () => {
  return {type: CLOSE_INFO_WINDOW}
};

export const setSelectedHotel = (object) => {
  return ({
    type: SET_SELECTED_HOTEL,
    object,
  })
};

export const removeSelectedHotel = () => {
  return ({type: REMOVE_SELECTED_HOTEL})
};

export const setSelectedMarker = (key) => {
  return ({
    type: SET_SELECTED_MARKER,
    key
  })
};

export const removeSelectedMarker = () => {
  return ({type: REMOVE_SELECTED_MARKER})
};

export const setMapCenter = (coords) => {
  return ({
    type: SET_MAP_CENTER,
    coords
  })
};

export const setMapRef = (ref) => {
  return ({
    type: SET_MAP_REF,
    ref
  })
};

export const setTileLayer = (key) => {
  return ({
    type: SET_TILE_LAYER,
    key,
  })
};

export const toggleLayer = (key) => {
  return ({
    type: TOGGLE_LAYER,
    key,
  })
}

export default mapDataReducer;