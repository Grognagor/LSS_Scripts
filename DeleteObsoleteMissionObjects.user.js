// ==UserScript==
// @name         DeleteObsoleteMissionObjects
// @version      0.0.3
// @description  Alte Missionsobjekte werden gelöscht
// @author       Glaeydar
// @include      *://www.leitstellenspiel.de/
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/raw/master/DeleteObsoleteMissionObjects.user.js
// @updateURL    https://github.com/Glaeydar/LSS_Scripts/raw/master/DeleteObsoleteMissionObjects.user.js
// ==/UserScript==

(function() {
    'use strict';

    /*
    Anzahl der Minuten, nach der ein ausgeblendetes Element gelöscht wird.
    Dieser Wert sollte nicht kleiner als 15 sein, da es sonst zu Spielfehlern kommen könnte.
    Default: 30
    */
    var minutes = 30;

    var DEBUG = false;

    /* DO NOT MODIFY UNLESS YOU KNOW WHAT YOU DO */
    var tid = setInterval(mycode, 30000);

    function mycode() {
        $('#mission_list > div').each(function () {
            /* Remove the element if it is not displayed and has a time attribute */
            if($(this).css("display") == "none"){
                if(!$(this).attr('time')) {
                    $(this).attr('time', Math.floor($.now()/1000));
                } else {
                    /* Check if the element is older than 30 minutes */
                    if((Math.floor($.now()/1000)-(parseInt($(this).attr('time')))) > (minutes * 60)) {
                        if(DEBUG) {console.log("[DeleteObsoleteMissionObjects] Removed element " + $(this).attr('id') + " after " + (Math.floor($.now()/1000) - ($(this).attr('time')) + "seconds"));}
                        $(this).remove();
                    }
                }
            }
        });
    }
})();