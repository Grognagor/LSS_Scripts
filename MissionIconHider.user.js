// ==UserScript==
// @name         MissionIconHiding
// @version      0.0.3
// @description  Missionsicons ausblenden auf der Karte
// @author       Glaeydar
// @include      *://leitstellenspiel.de/*
// @include      *://www.leitstellenspiel.de/*
// @include      *://missionchief.co.uk/*
// @include      *://www.missionchief.co.uk/*
// @include      *://missionchief.com/*
// @include      *://www.missionchief.com/*
// @include      *://meldkamerspel.com/*
// @include      *://www.meldkamerspel.com/*
// @include      *://centro-de-mando.es/*
// @include      *://www.centro-de-mando.es/*
// @include      *://missionchief-australia.com/*
// @include      *://www.missionchief-australia.com/*
// @include      *://larmcentralen-spelet.se/*
// @include      *://www.larmcentralen-spelet.se/*
// @include      *://operatorratunkowy.pl/*
// @include      *://www.operatorratunkowy.pl/*
// @include      *://operatore112.it/*
// @include      *://www.operatore112.it/*
// @include      *://operateur112.fr/*
// @include      *://www.operateur112.fr/*
// @include      *://dispetcher112.ru/*
// @include      *://www.dispetcher112.ru/*
// @include      *://alarmcentral-spil.dk/*
// @include      *://www.alarmcentral-spil.dk/*
// @include      *://nodsentralspillet.com/*
// @include      *://www.nodsentralspillet.com/*
// @include      *://operacni-stredisko.cz/*
// @include      *://www.operacni-stredisko.cz/*
// @include      *://112-merkez.com/*
// @include      *://www.112-merkez.com/*
// @include      *://jogo-operador112.com/*
// @include      *://www.jogo-operador112.com/*
// @include      *://operador193.com/*
// @include      *://www.operador193.com/*
// @include      *://centro-de-mando.mx/*
// @include      *://www.centro-de-mando.mx/*
// @include      *://dyspetcher101-game.com/*
// @include      *://www.dyspetcher101-game.com/*
// @include      *://missionchief-japan.com/*
// @include      *://www.missionchief-japan.com/*
// @include      *://missionchief-korea.com/*
// @include      *://www.missionchief-korea.com/*
// @include      *://jocdispecerat112.com/*
// @include      *://www.jocdispecerat112.com/*
// @include      *://hatakeskuspeli.com/*
// @include      *://www.hatakeskuspeli.com/*
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/MissionIconHider.user.js
// ==/UserScript==

(function() {
    'use strict';

    /* Configuration */

    /* Hide the icons based on this containing strings */
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