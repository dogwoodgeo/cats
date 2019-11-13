let view;

require ([
  'esri/Map',
  'esri/views/MapView',
  'esri/Basemap',
  'esri/layers/VectorTileLayer',
  'esri/layers/FeatureLayer',
  'esri/widgets/Home'
], 
function(
  Map, 
  MapView, 
  Basemap, 
  VectorTileLayer, 
  FeatureLayer,
  Home
) {

  //* Picture Marker Symbol
  const flSymbol = {
    type: 'picture-marker',
    url: 'images/map-symbols/cat.png',
    height: '50 px',
    width: '50 px'
  }

  //* FeatureLayer Renderer
  const flRenderer = {
    type: 'simple',
    symbol: flSymbol
  }

  //* VectorTileLayer Object
  const vtLayer = new VectorTileLayer({
    portalItem: {
      id: 'b9ab980bfa7a4ea9963756c47cf5f72a'
    }
  })
  
  //* Basemap Object
  const myBasemap = new Basemap({
    baseLayers: [vtLayer]
  });
 

  const map = new Map({
    basemap: myBasemap
  });

  view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [-98.8101768493388, 37.814666152234636],
    zoom: 4

  });

  const homeBtn = new Home({
    view: view
  });
  view.ui.add(homeBtn, 'top-left');

  const textContent = '<span style="color: #b2495a ; font-weight: bold">Type:</span> {TYPE}' + '<br></br><span style="color: #b2495a ; font-weight: bold">Name:</span> {NAME}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Friendly (0-5):</span> {FRIENDLY}' +
  '<br></br><span style="color: #b2495a ; font-weight: bold">Collar:</span> {COLLAR}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Male/Female:</span> {MF}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Age Class:</span> {AGECLASS}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Interact with cat?:</span> {INTERACTION}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Feral?:</span> {FERAL} ' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Date:</span> {DATE_FIRST}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Multiple Sightings:</span> {MULT_SIGHTING}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Date of Last Sighting:</span> {DATE_LAST}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Sighting Number:</span> {SIGHT_NUM}' + '<br></br><span style="color: #b2495a ; font-weight: bold">Photo:</span> {PIC}' + 
  '<br></br><span style="color: #b2495a ; font-weight: bold">Location:</span> {LOC_DESC}' + 
  '<br></br><span style="color: #b2495a">{COMMENTS}</span>';

  const popupTemplate = {
    title: '<span style="color: #a78176 ; font-weight: 900">Cat Information</span>',
    outFields: ['*'],
    content: 
    [
      {
        type: 'text', 
        text: textContent
      }, 
      {
        type: 'attachments'
      }
      
    ]
  };
  const catsFL = new FeatureLayer({
    url: "https://services.arcgis.com/mJnFdAAVXxEXrSpL/arcgis/rest/services/CATS/FeatureServer",
    popupTemplate: popupTemplate,
    renderer: flRenderer,
  });

  //* Add the layer to the map
  map.add(catsFL); 

});