function infoLocais(){

    var locaisPerigosos = [
        { coordenadas: [-23.485262, -46.809745], nome: 'Pq Imperial' },
        { coordenadas: [-23.484877, -46.808832], nome: 'rua aleatoria' },
       
      ];

      locaisPerigosos.forEach(function(local) {
     
        new mapboxgl.Marker()
        .setLngLat(local.coordenadas)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>' + local.nome + '</h3>'))
        .addTo(map);
    });
}

//exports.Danger = infoLocais