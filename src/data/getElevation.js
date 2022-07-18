var addElevation = require('geojson-elevation').addElevation,
    TileSet = require('node-hgt').TileSet;
const fs = require('fs');

let hotels = JSON.parse(fs.readFileSync('./footway_path.json', 'utf8'));

addElevation(hotels, new TileSet('../../node_modules/node-hgt/test/data'), function(err, geojson) {
    if (!err) {
        fs.writeFileSync('./footwaysElev.json', JSON.stringify(geojson))
    } else {
        console.log(err);
    }
});