// ==UserScript==
// @name         BuildingIconHider
// @version      0.0.1
// @description  Gebäude ausblenden auf der Karte
// @author       Glaeydar
// @include      *://www.leitstellenspiel.de/
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/BuildingIconHider.user.js
// ==/UserScript==

(function() {
    'use strict';

    var tid = setInterval(mycode, 5000);

    function mycode() {
		var images = document.getElementsByTagName('img');
		var image = null;

		for(var i = 0; i < images.length; ++i) {
			if(images[i].src.includes("building")){
				image = images[i];
				image.style.display = "none";
			}
		}
     }
})();