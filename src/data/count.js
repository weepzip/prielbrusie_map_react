const fs = require('fs');

let objects = JSON.parse(fs.readFileSync('./src/data/tracksElev.json', 'utf8'));

objects.features.forEach((f, index) => {
  f.properties.tiltAngle = [];
  f.properties.tiltAngle.push('interpolate', ['linear'], ['line-progress'], 0, '#00ff00')
  f.properties.heightDifference = [];
  for (let i = 1; i < f.geometry.coordinates.length; i++) {
    f.properties.heightDifference[i] = (f.geometry.coordinates[i][2] - f.geometry.coordinates[i-1][2])

    f.properties.tiltAngle.push(Math.round((i / f.geometry.coordinates.length) * 100) / 100);
    let m = 250 / 20;
    let x = Math.round(Math.abs(f.properties.heightDifference[i]) * m)
    if (x > 254) x = 254
    else if (x < 1) x = 1
    let color = '';
    if (x < 16) color = `#0${x.toString(16)}${(255-x).toString(16)}00`
    else if (x >= 240) color = `#${x.toString(16)}0${(255-x).toString(16)}00`
    else color = `#${x.toString(16)}${(255-x).toString(16)}00`
    f.properties.tiltAngle.push(color);
  }
})

fs.writeFileSync('./src/data/test.json', JSON.stringify(objects))

console.log('done')