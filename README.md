# Leaflet-SeeClickFix.js

DMD receives SeeClickFix issues through a third party application. We are interested in grabbing the SeeClickFix data from the source. Instead of a one and done, we decided to write a plugin. This plugin is very basic and may or may not be maintained. It truly depends on what else we may need to do with it. You are free to modify, redistribute or use in any way you see fit.

### Example
```js
// Standard Leaflet.js Map with TileLayer
var map = L.map('map', {
		center: [35, -106],
		zoom:8
	});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

// SeeClick Fix. Pass Bounding Box. Can find using http://bboxfinder.com
var scf = new L.scf({box:[35.02212,-106.79672,35.20636,-106.48911]});
```
### Methods

Method | Description |
-------|-------------|
getAll | Gets all current SCF data for boundary
getOpen| Gets all current Open data
getClosed| Gets all Closed data
getAcknowledged| Gets all acknowledged data
getArchived| Gets all Archived data - could take a while to load
removeAll|Removes all markers from the map. Leaves any tile layers
byID(id)|Select a single issue by ID
getBySearch(term)|Searches current issues by term
getRequestTypes(lat,lng,callback)|Get request types at a specific point. Returns JSON.
getRequestTypeDetails(id,callback)|Get details of a request type using SCF request type id. Returns JSON.
getRequiredQuestions(id,callback)|Get required questions from a request type. Returns array of primary key names.

### Example
```js
// Standard Leaflet.js Map with TileLayer
var map = L.map('map', {
		center: [35, -106],
		zoom:8
	});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

// SeeClick Fix. Pass Bounding Box. Can find using http://bboxfinder.com
var scf = new L.scf({box:[35.02212,-106.79672,35.20636,-106.48911]});
scf.getBySearch("Juan Tabo");
```
![JuanTabo](https://raw.githubusercontent.com/MunicipalDevelopment/SCF/master/juantabo.JPG)
