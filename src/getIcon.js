import L from 'leaflet';
import {toPoint as point} from '../node_modules/leaflet/src/geometry/Point';
import {empty} from '../node_modules/leaflet/src/dom/DomUtil';

let DivIcon = L.DivIcon.extend({
  options: {
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [18, 36],
    iconColor: 'blue',
    html: '',
  },
  createIcon: function (oldIcon) {
		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
		    options = this.options;
        options.html = `
          <svg width="36px" height="36px" viewBox="-4 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Uploaded to SVGRepo https://www.svgrepo.com -->
          <title>map-marker</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)">
                  <g id="Icons" transform="translate(37.000000, 169.000000)">
                      <g id="map-marker" transform="translate(78.000000, 468.000000)">
                          <g transform="translate(10.000000, 6.000000)">
                              <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" 
                              fill=${options.iconColor}></path>
                              <circle id="Oval" fill="white" fill-rule="nonzero" cx="14" cy="14" r="7"></circle>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
          </svg>`

		if (options.html instanceof Element) {
			empty(div);
			div.appendChild(options.html);
		} else {
			div.innerHTML = options.html !== false ? options.html : '';
		}

		if (options.bgPos) {
			var bgPos = point(options.bgPos);
			div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
		}
		this._setIconStyles(div, 'icon');

		return div;
	},
})

function divIcon(options) {return new DivIcon(options)}

export const getIcon = (color = 'blue') => {
  return(
    divIcon({
      html: '',
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
      iconColor: color,
    })
  )
}
export default getIcon;