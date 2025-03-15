// ==UserScript==
// @name         Mass Mission Share (Select State)
// @namespace    https://github.com/Grognagor/LSS_Scripts
// @version      1.0
// @description  Automatically shares missions for a selected German state on Leitstellenspiel.de
// @match        https://www.leitstellenspiel.de/
// @grant        none
// @updateURL    https://github.com/Grognagor/LSS_Scripts/MassMissionShare.user.js

// ==/UserScript==

(function() {
    'use strict';

    //--------------------------------------------------------------------
    // 1) CONFIGURATION (Adjust these as needed)
    //--------------------------------------------------------------------

    // Which of the 16 states in Germany do you want to share missions for?
    // Possible values (exactly as keys below):
    // "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg",
    // "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen",
    // "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt",
    // "Schleswig-Holstein", "Thüringen"
    const stateSelector = "Baden-Wuerttemberg";

    // Bounding boxes (approximate) for each German state:
    const statesBoundingBoxes = {
        "Baden-Wuerttemberg":        { minLat: 47.5, maxLat: 49.8, minLon: 7.5,  maxLon: 10.5 },
        "Bayern":                   { minLat: 47.2, maxLat: 50.6, minLon: 8.9,  maxLon: 13.8 },
        "Berlin":                   { minLat: 52.3, maxLat: 52.7, minLon: 13.0, maxLon: 13.8 },
        "Brandenburg":              { minLat: 51.3, maxLat: 53.6, minLon: 11.2, maxLon: 14.8 },
        "Bremen":                   { minLat: 52.95,maxLat: 53.65,minLon: 8.45, maxLon: 9.0  },
        "Hamburg":                  { minLat: 53.3, maxLat: 53.8, minLon: 9.7,  maxLon: 10.3 },
        "Hessen":                   { minLat: 49.4, maxLat: 51.7, minLon: 7.8,  maxLon: 10.2 },
        "Mecklenburg-Vorpommern":   { minLat: 53.0, maxLat: 54.8, minLon: 10.5, maxLon: 14.4 },
        "Niedersachsen":            { minLat: 51.2, maxLat: 53.9, minLon: 6.5,  maxLon: 11.8 },
        "Nordrhein-Westfalen":      { minLat: 50.3, maxLat: 52.6, minLon: 5.8,  maxLon: 9.5  },
        "Rheinland-Pfalz":          { minLat: 48.9, maxLat: 50.8, minLon: 6.1,  maxLon: 8.5  },
        "Saarland":                 { minLat: 49.0, maxLat: 49.6, minLon: 6.3,  maxLon: 7.4  },
        "Sachsen":                  { minLat: 50.2, maxLat: 51.7, minLon: 11.8, maxLon: 15.0 },
        "Sachsen-Anhalt":           { minLat: 51.3, maxLat: 53.2, minLon: 10.6, maxLon: 13.2 },
        "Schleswig-Holstein":       { minLat: 53.3, maxLat: 55.1, minLon: 7.8,  maxLon: 11.3 },
        "Thueringen":                { minLat: 50.2, maxLat: 51.7, minLon: 9.8,  maxLon: 12.7 }
    };

    const CLICK_DELAY_MS = 250;

    const DROPDOWN_WAIT_MS = 300;

    const SHARE_DROPDOWN_ITEM_SELECTOR = 'li[data-message]';

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function isInSelectedState(missionElement) {
        const latStr = missionElement.getAttribute("latitude");
        const lonStr = missionElement.getAttribute("longitude");
        if (!latStr || !lonStr) return false;

        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);

        const box = statesBoundingBoxes[stateSelector];
        if (!box) {
            console.warn(`State "${stateSelector}" not found in statesBoundingBoxes. Check your spelling!`);
            return false;
        }

        return (
            lat >= box.minLat && lat <= box.maxLat &&
            lon >= box.minLon && lon <= box.maxLon
        );
    }

    async function massMissionShare() {
        const missionList = document.querySelector("#mission_list");
        if (!missionList) {
            console.error("Mission list container (#mission_list) not found.");
            return;
        }

        const missions = missionList.querySelectorAll(".missionSideBarEntry.missionSideBarEntrySearchable");
        console.log(`Found ${missions.length} mission(s). Checking for state: ${stateSelector}`);

        for (const mission of missions) {
            const shareBtn = mission.querySelector("button.lssmv4-extendedCallList-share-mission-btn");
            if (!shareBtn) continue;

            if (!isInSelectedState(mission)) continue;

            shareBtn.click();

            await sleep(DROPDOWN_WAIT_MS);

            const openDropdown = mission.querySelector(".btn-group.open .dropdown-menu");
            if (openDropdown) {
                const targetItem = openDropdown.querySelector(SHARE_DROPDOWN_ITEM_SELECTOR);
                if (targetItem) {
                    const link = targetItem.querySelector("a");
                    if (link) {
                        link.click();
                        console.log(`Shared mission ID ${mission.getAttribute("mission_id")} in state ${stateSelector}`);
                    }
                }
            }

            await sleep(CLICK_DELAY_MS);
        }
        console.log("Mass Mission Share process completed.");
    }

    const observer = new MutationObserver((_, obs) => {
        const filtersRow = document.querySelector(".mission-filters-row");
        if (filtersRow) {
            obs.disconnect();

            if (filtersRow.querySelector("#mass_mission_share_btn")) return;

            const massShareBtn = document.createElement("a");
            massShareBtn.id = "mass_mission_share_btn";
            massShareBtn.className = "btn btn-xs btn-success mission-selection";
            massShareBtn.href = "#";
            massShareBtn.title = `Mass Mission Share (${stateSelector})`;

            massShareBtn.innerHTML = `
                <div class="icon">
                    <svg class="fa-share-nodes" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512" aria-hidden="true" style="width:14px;height:14px;">
                        <path fill="currentColor" d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160
                        c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96
                        s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z">
                        </path>
                    </svg>
                </div>
            `;

            massShareBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                massShareBtn.style.opacity = 0.5;
                await massMissionShare();
                massShareBtn.style.opacity = 1;
            });

            filtersRow.appendChild(massShareBtn);
            console.log(`Mass Mission Share button (icon-only) added for ${stateSelector}.`);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
