// ==UserScript==
// @name         ProtocollLinkInsert
// @version      0.0.2
// @description  Fügt den Link zum Protokoll ins Verbandsmenü ein
// @author       Glaeydar
// @include      *://www.leitstellenspiel.de/
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/ProtocollLinkInsert.user.js
// ==/UserScript==

(function() {
    'use strict';
    $( document ).ready(function() {
        $('#alliance_li > ul > li:nth-child(10)')
            .before('<li role="presentation" class="alliance_true"><a href="/alliance_logfiles" class="lightbox-open">Protokoll</a></li>');

        $('#navbar-main-collapse > ul > li:nth-child(4) > ul > li:nth-child(10)')
            .before('<li role="presentation" class="alliance_true"><a href="/leitstellenansicht" class="lightbox-open">Leitstellenansicht</a></li>');

    });
})();