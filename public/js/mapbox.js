 

export const displayMap= function(location){
    const locations= JSON.parse(document.getElementById('map').dataset.locations)
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoibm5hbndvYnUiLCJhIjoiY2xuaW1mMmZwMTZ6MTJpbWk2YmcxN2YxdiJ9.Er2tXGU_47o2iYeFuc46sw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nnanwobu/clniq1lpm00d001pi2vzsb8yp', scrollZoom: false,
    centre:[-109.6483362,37.294505]
    // centre:[3.3288193, 6.5566787],
});
       
const bounds= new mapboxgl.LngLatBounds();

locations.forEach(loc => {
    const el= document.createElement('div')
    el.className='marker'
    new mapboxgl.Marker({
        element: el,
        anchor: 'top',
    }).setLngLat(loc.coordinates).addTo(map)

    new mapboxgl.Popup().setLngLat(loc.coordinates).setHTML(`<p> Day ${loc.day}, ${loc.description}</p>`).addTo(map)
    bounds.extend(loc.coordinates)
  });
    map.fitBounds(bounds,{
    padding:{
        top:200,
        bottom:100,
        right: 100,
        left:100
    }
  })

}