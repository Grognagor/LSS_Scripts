// ==UserScript==
// @name         MissionIconHiding
// @version      0.0.3
// @description  Missionsicons ausblenden auf der Karte
// @author       Glaeydar
// @include      *://www.leitstellenspiel.de/
// @include      *://leitstellenspiel.de/
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/MissionIconHider.user.js
// ==/UserScript==

(function() {
    'use strict';

    /* Configuration */

    /* Blendet die Icons anhand folgender Filter aus */
    var filter = ['[Verband]', '[Event]'];

    /* Configuration END */


    /* DO NOT MODIFY UNLESS YOU KNOW WHAT YOU DO */
    var tid = setInterval(mycode, 10000);

    function mycode() {
        var substringCount = filter.length;

        try {
            for (var i = mission_markers.length - 1; i >= 0; i--) {
                var string = mission_markers[i]._tooltip._content;

                if (filter.some(substring => string.includes(substring))) {
                    map.removeLayer(mission_markers[i]);
                }
            }
        }
        catch (err) {
            console.log("[MissionIconHider] " + err);
        }
    }
})();
