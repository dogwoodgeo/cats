let view;
let getURL;

require ([
  'esri/Map',
  'esri/views/MapView',
  'esri/Basemap',
  'esri/layers/VectorTileLayer',
  'esri/layers/FeatureLayer',
  'esri/widgets/Home',
  'esri/widgets/Expand'
], 
function(
  Map, 
  MapView, 
  Basemap, 
  VectorTileLayer, 
  FeatureLayer,
  Home,
  Expand
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
 
  //* create the Map object
  const map = new Map({
    basemap: myBasemap
  });

  //* Creat the Map View object
  view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [-98.8101768493388, 37.814666152234636],
    zoom: 4

  });

  //* Home widget
  const homeBtn = new Home({
    view: view
  });
  view.ui.add(homeBtn, 'top-left');

  //* Info panel expand widget
  const expandContent = '<h3 style="color: #a78176">Cat Sightings</h3>' + 
                        '<span style="color: #b2495a">Some text here</span>'

  infoExpand = new Expand({
    expandIconClass: 'esri-icon-description',
    view: view,
    content: expandContent,
    expanded: false,
  })
  view.ui.add(infoExpand, 'top-right');

  //* Popup object
  const popupTemplate = {
    title: '<span style="color: #a78176 ; font-weight: 900">Cat Information</span>',
    outFields: ['*'],
    content: getURL,
    fieldInfos: [
      {
        fieldName: 'DATE_FIRST',
        format: {
          dateFormat: 'day-short-month-year'
        }
      }, {
        fieldName: 'DATE_LAST',
        format: {
          dateFormat: 'day-short-month-year'
        }
      }
    ]
  };

  //* Feature Layer
  const catsFL = new FeatureLayer({
    url: "https://services.arcgis.com/mJnFdAAVXxEXrSpL/arcgis/rest/services/CATS/FeatureServer",
    popupTemplate: popupTemplate,
    renderer: flRenderer,
  });

  //* Add the layer to the map
  map.add(catsFL); 

  //* Popup Content
  const popupHTML = '<span style="color: #b2495a ; font-weight: bold">Type:</span> {TYPE}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Name:</span> {NAME}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Friendly (0-5):</span> {FRIENDLY}' +
        '<br><span style="color: #b2495a ; font-weight: bold">Collar:</span> {COLLAR}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Male/Female:</span> {MF}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Age Class:</span> {AGECLASS}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Interact with cat?:</span> {INTERACTION}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Feral?:</span> {FERAL} ' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Date:</span> {DATE_FIRST}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Multiple Sightings:</span> {MULT_SIGHTING}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Date of Last Sighting:</span> {DATE_LAST}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Sighting Number:</span> {SIGHT_NUM}' + '<br><span style="color: #b2495a ; font-weight: bold">Photo:</span> {PIC}' + 
        '<br><span style="color: #b2495a ; font-weight: bold">Location:</span> {LOC_DESC}' + 
        '<br><br><span style="color: #b2495a">{COMMENTS}</span>';

  function getURL(feature) { 
    let url = feature.graphic.attributes.PIC_URL;
    console.log (url);
    if (url === 'null') {
      return (popupHTML)
    } else {
      return ( `<img src="${url}" alt="CAT"></img><br>${popupHTML}` )
    }; 
  }
});

//* 'esri-icon-description'