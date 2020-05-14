// ==UserScript==
// @name         Standortanzeiger
// @namespace    https://github.com/Glaeydar/LSS_Scripts/Standortanzeiger.user.js
// @version      0.1
// @description  Zeigt die Standorte von Wachen an
// @author       Glaeydar
// @match        https://www.leitstellenspiel.de/
// @require      https://github.com/tyrasd/osmtogeojson/raw/gh-pages/osmtogeojson.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
	/* ************************************************** 
	 Wichtiger Hinweis:
	 Die Karte darf erst dann weiter verschoben werden, 
	 sobald die Marker gesetzt wurden, ansonsten werden
	 weitere Wachen nicht mehr geladen
	 ************************************************** */

    map.on('zoomend', function(){

        loadPOI('"amenity"="fire_station"');
    });

    map.on('moveend', function(){

        loadPOI('"amenity"="fire_station"');
    });

    function loadPOI(type){
        console.log("loading data");

        let overpassApiUrl = buildOverpassApiUrl(map, type);

        $.get(overpassApiUrl, function (osmDataAsXml) {
            var resultAsGeojson = osmtogeojson(osmDataAsXml);
            var resultLayer = L.geoJson(resultAsGeojson, {
                style: function (feature) {
                    return {color: "#ff0000"};
                },
                filter: function (feature, layer) {
                    var isPolygon = (feature.geometry) && (feature.geometry.type !== undefined) && (feature.geometry.type === "Polygon");
                    if (isPolygon) {
                        feature.geometry.type = "Point";
                        var polygonCenter = L.latLngBounds(feature.geometry.coordinates[0]).getCenter();
                        feature.geometry.coordinates = [ polygonCenter.lat, polygonCenter.lng ];
                    }
                    return true;
                }
            }).addTo(map);
            console.log("finish loading");
        });
    }

    function buildOverpassApiUrl(map, overpassQuery) {
        var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
        var nodeQuery = 'node[' + overpassQuery + '](' + bounds + ');';
        var wayQuery = 'way[' + overpassQuery + '](' + bounds + ');';
        var relationQuery = 'relation[' + overpassQuery + '](' + bounds + ');';
        var query = '?data=[out:xml][timeout:25];(' + nodeQuery + wayQuery + relationQuery + ');out body;>;out skel qt;';
        var baseUrl = 'http://overpass-api.de/api/interpreter';
        var resultUrl = baseUrl + query;
        return resultUrl;
    }


})();