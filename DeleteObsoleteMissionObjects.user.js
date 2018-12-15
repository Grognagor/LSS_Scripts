// ==UserScript==
// @name         DeleteObsoleteMissionObjects
// @version      0.0.1
// @description  Alte Missionsobjekte werden gelöscht !!! WICHTIG !!! Das Spielverhalten kann beeinträchtigt werden !!! WICHTIG !!!
// @author       Glaeydar
// @include      *://www.leitstellenspiel.de/
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/DeleteObsoleteMissionObjects.user.js
// @namespace
// ==/UserScript==

(function() {
    'use strict';
    var tid = setInterval(mycode, 5000);

    function mycode() {
        $('#mission_list > div').each(function () {
            if($(this).css("display") == "none"){
                $(this).remove();
            }
        });
    }
})();