// ==UserScript==
// @name         vehicleChanges
// @version      2.0.2
// @description  Aendert die Einstellungen von AB, SEG ELW, GRTW, Aussenlastbehaelter und DGL
// @author       DrTraxx
// @include      /^https?:\/\/(w{3}\.)?(polizei\.)?leitstellenspiel\.de\/$/
// @grant        GM_addStyle
// ==/UserScript==
/* global $, user_id, I18n */

(async function () {
    'use strict';

    /**
       * Vehicles-API nach Fahrzeugtypen durchsuchen
       * @param  {Array} ids Array mit den Fahrzeugtypen-IDs
       * @returns  {Array}   Array mit den gefilterten Fahrzeugen
       */
    const returnApiVehicles = async ids => {
        return new Promise(async resolve => {
            const aVehicles = await $.getJSON('/api/vehicles');
            resolve(aVehicles.filter(v => ids.includes(v.vehicle_type)));
        });
    };

    /**
     * @param  {String} target Art der Fahrzeuge und Einstellungen
     * @param  {boolean} bolHtml HTML gesucht?
     * @returns {} Object mit den gesuchten Einstellungen oder HTML als String
     */
    const switchTargetValue = (target, bolHtml) => {
        switch (target) {
            case "container":
                if (bolHtml) {
                    return `<div class="form-check">
                              <input class="form-check-input" type="checkbox" id="ve_ch_cbx_1">
                              <label class="form-check-label" for="ve_ch_cbx_1">
                                Zufälliges WLF
                              </label>
                            </div>
                            <div class="form-check hidden" id="veChHiddenContent">
                              <input class="form-check-input" type="checkbox" id="ve_ch_cbx_2">
                              <label class="form-check-label" for="ve_ch_cbx_2">
                                WLF von fremden Wachen zulassen
                              </label>
                            </div>
                            <select class="custom-select" id="ve_ch_select_1">
                              <option selected value="2">WLF an Einsatzstelle behalten</option>
                              <option value="3">WLF zur Wache schicken</option>
                            </select>`;
                } else {
                    return { "tractive_random": $("#ve_ch_cbx_1")[0].checked ? 1 : 0, "tractive_building_random": $("#ve_ch_cbx_2")[0].checked ? 1 : 0, "vehicle_mode": $("#ve_ch_select_1").val() };
                }
            case "seg_elw":
                if (bolHtml) {
                    return `<div class="form-check">
                              <input class="form-check-input" type="checkbox" id="ve_ch_cbx_1">
                              <label class="form-check-label" for="ve_ch_cbx_1">
                                Rettungsdienst automatisch ein Krankenhaus zuweisen
                              </label>
                            </div>
                            <div class="hidden" id="veChHiddenContent">
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="ve_ch_cbx_2">
                                <label class="form-check-label" for="ve_ch_cbx_2">
                                  Nur eigene Krankenhäuser anfahren
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="ve_ch_cbx_3">
                                <label class="form-check-label" for="ve_ch_cbx_3">
                                  Nur an Krankenhäuser mit passenden Ausbau einliefern
                                </label>
                              </div>
                              <label for="ve_ch_select_1">Maximale Abgabe vom Creditsverdienst</label>
                              <br>
                              <select class="custom-select" id="ve_ch_select_1" style="margin-left:2em;width:15em">
                                <option selected value="0">0 Prozent</option>
                                <option value="10">10 Prozent</option>
                                <option value="20">20 Prozent</option>
                                <option value="30">30 Prozent</option>
                                <option value="40">40 Prozent</option>
                                <option value="50">50 Prozent</option>
                              </select>
                              <br>
                              <label for="ve_ch_select_2">Maximale Entfernung zum Krankenhaus</label>
                              <br>
                              <select class="custom-select" id="ve_ch_select_2" style="margin-left:2em;width:15em">
                                <option selected value="1">1 Kilometer</option>
                                <option value="5">5 Kilometer</option>
                                <option value="20">20 Kilometer</option>
                                <option value="50">50 Kilometer</option>
                                <option value="100">100 Kilometer</option>
                                <option value="200">200 Kilometer</option>
                              </select>
                              <br>
                              <label for="ve_ch_select_3">Freizulassende Plätze im Krankenhaus</label>
                              <br>
                              <select class="custom-select" id="ve_ch_select_3" style="margin-left:2em;width:15em">
                                <option selected value="0">0 Plätze</option>
                                <option value="1">1 Plätze</option>
                                <option value="2">2 Plätze</option>
                                <option value="3">3 Plätze</option>
                                <option value="4">4 Plätze</option>
                                <option value="5">5 Plätze</option>
                              </select>
                            </div>`;
                } else {
                    return { "hospital_automatic": $("#ve_ch_cbx_1")[0].checked ? 1 : 0, "hospital_own": $("#ve_ch_cbx_2")[0].checked ? 1 : 0, "hospital_right_building_extension": $("#ve_ch_cbx_3")[0].checked ? 1 : 0, "hospital_max_price": $("#ve_ch_select_1").val(), "hospital_max_distance": $("#ve_ch_select_2").val(), "hospital_free_space": $("#ve_ch_select_3").val() };
                }
            case "grtw":
                if (bolHtml) {
                    return `<select class="custom-select" id="ve_ch_select_1">
                                <option selected value="0">Maximal 7 leichtverletzte Patienten</option>
                                <option value="1">Maximal 3 (auch schwerverletzte) Patienten, Notarzt als Besatzung nötig</option>
                            </select>`;
                } else {
                    return { "vehicle_mode": $("#ve_ch_select_1").val() };
                }
            case "water_bin":
                if (bolHtml) {
                    return `<div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="ve_ch_cbx_1">
                              <label class="form-check-label" for="ve_ch_cbx_1">
                                Zufälliger Hubschrauber
                              </label>
                            </div>
                            <div class="form-check hidden" id="veChHiddenContent">
                              <input class="form-check-input" type="checkbox" value="" id="ve_ch_cbx_2">
                              <label class="form-check-label" for="ve_ch_cbx_2">
                                Hubschrauber von fremden Wachen zulassen
                              </label>
                            </div>`;
                } else {
                    return { "tractive_random": $("#ve_ch_cbx_1")[0].checked ? 1 : 0, "tractive_building_random": $("#ve_ch_cbx_2")[0].checked ? 1 : 0 };
                }
            case "dgl":
                if (bolHtml) {
                    return `<div class="form-check">
                              <input class="form-check-input" type="checkbox" id="ve_ch_cbx_1">
                              <label class="form-check-label" for="ve_ch_cbx_1">
                                Gefangenentransporten automatisch Zellen zuweisen
                              </label>
                            </div>
                            <div class="hidden" id="veChHiddenContent">
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="ve_ch_cbx_2">
                                <label class="form-check-label" for="ve_ch_cbx_2">
                                  Nur eigene Zellen anfahren
                                </label>
                              </div>
                              <br>
                              <label for="ve_ch_select_1">Maximale Entfernung zur Zelle</label>
                              <br>
                              <select class="custom-select" id="ve_ch_select_1" style="margin-left:2em;width:15em">
                                <option selected value="1">1 Kilometer</option>
                                <option value="5">5 Kilometer</option>
                                <option value="20">20 Kilometer</option>
                                <option value="50">50 Kilometer</option>
                                <option value="100">100 Kilometer</option>
                                <option value="200">200 Kilometer</option>
                              </select>
                              <br>
                              <label for="ve_ch_select_2">Freizulassende Zellen in den Wachen</label>
                              <br>
                              <select class="custom-select" id="ve_ch_select_2" style="margin-left:2em;width:15em">
                                <option selected value="0">0 Plätze</option>
                                <option value="1">1 Plätze</option>
                                <option value="2">2 Plätze</option>
                                <option value="3">3 Plätze</option>
                                <option value="4">4 Plätze</option>
                                <option value="5">5 Plätze</option>
                              </select>
                              <br>
                              <label for="ve_ch_select_3">Maximale Abgabe vom Creditsverdienst</label>
                              <br>
                              <select class="custom-select" id="ve_ch_select_3" style="margin-left:2em;width:15em">
                                <option selected value="0">0 Prozent</option>
                                <option value="10">10 Prozent</option>
                                <option value="20">20 Prozent</option>
                                <option value="30">30 Prozent</option>
                                <option value="40">40 Prozent</option>
                                <option value="50">50 Prozent</option>
                              </select>
                              <label for="ve_ch_ipt_num_1">Individuelle Verzögerung für den automatisierten Gefangenentransport (Minuten)</label>
                              <br>
                              <input class="numeric integer optional form-control" id="ve_ch_ipt_num_1" max="240" min="0" placeholder="Trage einen Wert ein, um den Standardwert zu überschreiben" type="number">
                            </div>`;
                } else {
                    return {
                        "vehicle_extra_information_attributes": {
                            "police_cell_automatic": $("#ve_ch_cbx_1")[0].checked ? 1 : 0,
                            "police_cell_own": $("#ve_ch_cbx_2")[0].checked ? 1 : 0,
                            "police_cell_max_distance": $("#ve_ch_select_1").val(),
                            "police_cell_free_space": $("#ve_ch_select_2").val(),
                            "police_cell_max_price": $("#ve_ch_select_3").val()
                        },
                        "vehicle[prisoner_transportation_delay]": +$("#ve_ch_ipt_num_1").val()
                    };
                }
        }
    };

    /**
     * HTML fuer die Fahrzeugeinstellungen
     * @param {String} target Art der Fahrzeuge und Einstellungen
     * @param {BigInteger} count Anzahl der zu aendernden Fahrzeuge
     * @returns {String} HTML fuer die Einstellungen
     */
    const getTargetHtml = (target, count) => {
        let returnValue = `<h4>Einstellungen für ${ count.toLocaleString() } Fahrzeuge ändern!</h4>`;

        returnValue += switchTargetValue(target, true);

        returnValue += `<br><a class="btn btn-success" id="veChSaveAll" bullet_point="${ target }" style="margin-top:2em">Einstellungen übernehmen</a>`;

        return returnValue;
    }

    /**
     * HTML fuer das Modal zusammenbauen
     * @param {String} target Art der Fahrzeuge und Einstellungen
     * @param {Array} ids Array der Fahrzeugtypen-IDs
     * @returns {String} HTML fuer das Modal
     */
    const buildModalHtml = async (target, ids) => {
        selectedVehicles = await returnApiVehicles(ids);
        $("#veChModalBody").html(getTargetHtml(target, selectedVehicles.length));
    };

    const setVehiclePreferences = async (target) => {
        let count = 0;

        const preferences = switchTargetValue(target, false);

        $("#veChModalBody")
            .append(`<div class="progress" style="margin-top:2em">
                       <div class="progress-bar bg-success" role="progressbar" style="width: 0%;color: black" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${ selectedVehicles.length }" id="veChPrgs">0 / ${ selectedVehicles.length.toLocaleString() }</div>
                     </div>`);

        for (const vehicle of selectedVehicles) {
            count++;
            const percent = Math.round(count / selectedVehicles.length * 100);
            $("#veChPrgs")
                .attr("aria-valuenow", count)
                .css({ "width": percent + "%" })
                .text(count.toLocaleString() + " / " + selectedVehicles.length.toLocaleString());
            await $.post("/vehicles/" + vehicle.id, { "vehicle": preferences, "authenticity_token": $("meta[name=csrf-token]").attr("content"), "_method": "put" });
        }
    }

    let selectedVehicles;

    GM_addStyle(`.modal {
display: none;
position: fixed; /* Stay in place front is invalid - may break your css so removed */
padding-top: 100px;
left: 0;
right:0;
top: 0;
bottom: 0;
overflow: auto;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0,0.4);
z-index: 9999;
}
.modal-body{
height: 650px;
overflow-y: auto;
}`);

    $("body")
        .prepend(
            `<div class="modal fade bd-example-modal-lg" id="veChModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&#x274C;</span>
                    </button>
                    <h3 class="modal-title"><center>Fahrzeugeinstellungen</center></h3>
                    <div class="btn-group">
                      <a class="btn btn-primary btn-xs ve_ch_btn_trigger" types="[47,48,49,54,62,71,77,78]" target="container">Abrollbehälter</a>
                      <a class="btn btn-primary btn-xs ve_ch_btn_trigger" types="[59]" target="seg_elw">ELW (SEG)</a>
                      <a class="btn btn-primary btn-xs ve_ch_btn_trigger" types="[73]" target="grtw">GRTW</a>
                      <a class="btn btn-primary btn-xs ve_ch_btn_trigger" types="[93]" target="water_bin">Außenlastbehälter</a>
                      <a class="btn btn-primary btn-xs ve_ch_btn_trigger" types="[103]" target="dgl">FuStW (DGL)</a>
                    </div>
                  </div>
                    <div class="modal-body" id="veChModalBody">
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Schließen</button>
                      <div class="pull-left">v ${ GM_info.script.version }</div>
                    </div>
              </div>
            </div>`);

    $("ul .dropdown-menu[aria-labelledby='menu_profile'] >> a[href='/missionSpeed']")
        .parent()
        .after(`<li role="presentation"><a data-toggle="modal" data-target="#veChModal" style="cursor:pointer" id="veChOpenModal">
                    <span class="glyphicon glyphicon-cog"></span> Fahrzeugeinstellungen</a>
                </li>`);

    $("body").on("click", ".ve_ch_btn_trigger", async function () {
        const target = $(this).attr("target"),
            types = JSON.parse($(this).attr("types"));

        buildModalHtml(target, types);
    });

    $("body").on("change", "#ve_ch_cbx_1", function () {
        if (this.checked) {
            $(`#veChHiddenContent`).removeClass("hidden");
        } else {
            $(`#veChHiddenContent`).addClass("hidden");
        }
    });

    $("body").on("click", "#veChSaveAll", function () {
        setVehiclePreferences($(this).attr("bullet_point"));
    });

})();
