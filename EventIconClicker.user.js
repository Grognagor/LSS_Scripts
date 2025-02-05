// ==UserScript==
// @name         Event Icon Clicker
// @namespace    https://github.com/Grognagor/LSS_Scripts/
// @version      1.1
// @author       Grognagor
// @match        https://www.leitstellenspiel.de/missions*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function clickEasterEgg() {
        let eggLink = document.querySelector('a[href*="/missions/"][href*="/claim_found_object_sync"]');
        if (eggLink) {
            eggLink.click();
            setTimeout(closeSuccessBox, 250);
        }
    }

    function closeSuccessBox() {
        let closeButton = document.querySelector('.alert.alert-success .close');
        if (closeButton) {
            closeButton.click();
        }
    }

    clickEasterEgg()
})();
