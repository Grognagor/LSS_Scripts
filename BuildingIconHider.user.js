// ==UserScript==
// @name         BuildingIconHider
// @version      0.0.3
// @description  Gebäude ausblenden auf der Karte
// @author       Glaeydar
// @include      *://www.leitstellenspiel.de/
// @include      *://leitstellenspiel.de/
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/BuildingIconHider.user.js
// ==/UserScript==

(function() {
    'use strict';

    var tid = setInterval(mycode, 1000);

    function mycode() {
		$(".leaflet-interactive[src*='building']").hide();
     }
})();
