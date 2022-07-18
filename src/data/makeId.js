/* const fs = require('fs');

let hotels = JSON.parse(fs.readFileSync('./prielbrusie.json', 'utf8'));

console.log(hotels.features[0].properties.name)
let setId = () => {
  let data = {
    type: "FeatureCollection",
    features: []
  };
  hotels.features.forEach((hotel, i = 0) => {
    if (i<10) {
      hotel.properties.id = `h000${i}`
    } else {
      hotel.properties.id = `h00${i}`
    }
    data.features.push(hotel);
  })
  fs.writeFileSync('./prielbrusie.json', JSON.stringify(data), (error) => {
    if (error) {throw error} else {console.log('done')}
  });
};

setId(); */

const getHotelMarker = (hotel) => { 
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
        {hotel.properties.name}
      </Popup>
    </Marker>
  )
};
const hotelMarkers = props.hotelsData.features.map((hotel => getHotelMarker(hotel)))