// ==UserScript==
// @name         ProtocollLinkInsert
// @version      0.1
// @description  Fügt den Link zum Protokoll ins Verbandsmenü ein
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