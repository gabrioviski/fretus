

function locais(){
var areas = [
  {
    coordinates: [
      [-46.809745, -23.485262],
      [-46.8105, -23.4848],
      [-46.808832, -23.484877],
      [-46.808832, -23.485262],
      [-23.490238, -46.809621]
    ],
    fillColor: 'black'
  },
  // Adicionar areas
];

}

//exports.local= locais

/*
map.on('load', function () {
  areas.forEach(function (area, index) {
    map.addSource('area' + index, {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [area.coordinates]
        }
      }
    });

    map.addLayer({
      'id': 'area' + index,
      'type': 'fill',
      'source': 'area' + index,
      'layout': {},
      'paint': {
        'fill-color': area.fillColor,
        'fill-opacity': 0.5
      }
    });
  });
});
*/