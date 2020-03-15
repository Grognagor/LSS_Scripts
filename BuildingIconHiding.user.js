// ==UserScript==
// @name         BuildingIconHiding
// @version      0.0.2
// @description  Gebäudeicons ausblenden auf der Karte - Wird irgendwann im BuildingIconHider eingepflegt
// @author       Glaeydar
// @include      *://www.leitstellenspiel.de/
// @include      *://leitstellenspiel.de/
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/BuildingIconHiding.user.js
// ==/UserScript==

(function() {
    'use strict';

    /* Configuration */

    /* Blendet die Icons anhand folgender Filter aus */
    var filter = ['[VB]'];

    /* Configuration END */


    /* DO NOT MODIFY UNLESS YOU KNOW WHAT YOU DO */
    var tid = setInterval(mycode, 10000);

    function mycode() {
        var substringCount = filter.length;

        try {
            for (var j = building_markers.length - 1; j >= 0; j--) {
                var s = building_markers[j]._tooltip._content;

                if (filter.some(substring => s.includes(substring))) {
                    map.removeLayer(building_markers[j]);
                }
            }
        }
        catch (err) {
            console.log("[MissionIconHider] " + err);
        }
    }
})();
