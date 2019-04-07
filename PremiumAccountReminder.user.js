// ==UserScript==
// @name         PremiumAccountReminder
// @version      0.0.1
// @description  Erinnert an den Ablauf des PremiumAccounts
// @author       Glaeydar
// @include      *://www.leitstellenspiel.de/
// @include      *://www.leitstellenspiel.de/*
// @grant        none
// @namespace    https://github.com/Glaeydar/LSS_Scripts/PremiumAccountReminder.user.js
// ==/UserScript==

(function () {
    'use strict';
    /** Konfiguration **/

    /* Anzahl der Tage, bevor der Premium Account ausläuft */
    var tage = 7;

    /** Konfiguration Ende**/

    let response = $.ajax({
        type: "GET",
        url: './premiumaccount',
        async: false
    }).responseText;

    let string = $(response).find('.alert-info').text();

    let datum = string.match(/(\d{2})\.+ \w{1,} \d{4}/g).toString();
    datum = datum.replace(".", "");
    let res = datum.split(" ");

    switch (res[1]) {
        case "Januar": res[1] = "0"; break;
        case "Februar": res[1] = "1"; break;
        case "März": res[1] = 2; break;
        case "April": res[1] = 3; break;
        case "Mai": res[1] = 4; break;
        case "Juni": res[1] = 5; break;
        case "Juli": res[1] = 6; break;
        case "August": res[1] = 7; break;
        case "September": res[1] = 8; break;
        case "Oktober": res[1] = 9; break;
        case "November": res[1] = 10; break;
        case "Dezember": res[1] = 11; break;
        default: console.log("[PremiumAccountReminder] Unknown date: " + res);
    }

    var date = new Date(res[2], res[1], res[0]);
    var reminderDate = new Date();
    var reminder = reminderDate.getTime() + (tage * 24 * 60 * 60 * 1000);

    if (date.getTime() < reminder) {
        alert("PA läuft noch bis " + datum);
    }
})();