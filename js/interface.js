/* 
 * Copyright (c) 2018 Bardur Thomsen <https://github.com/bardurt>.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bardur Thomsen <https://github.com/bardurt> - initial API and implementation and/or initial documentation
 */

/**
 * Interface management functions for Odontogram application
 */

// Global variables
var engine;
var helpModal;
var helpCloseBtn;
var helpButton;

/**
 * Initialize the application
 */
function initializeApplication() {
    var canvas = document.getElementById('canvas');
    engine = new Engine();
    engine.setCanvas(canvas);
    engine.init();

    // Set up event listeners
    setupEventListeners();
    
    // Initialize help modal texts
    setTimeout(function() {
        updateHelpModalTexts();
        updateFileControlsTexts();
    }, 100);

    // Load default patient data
    engine.loadPatientData("New York",
        "Bardur Thomsen",
        "1002",
        "hc 001",
        "26/02/2018",
        "dentist one",
        "Test observations",
        "Test specifications");
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    var canvas = document.getElementById('canvas');
    
    // Canvas events
    canvas.addEventListener('mousedown', function (event) {
        engine.onMouseClick(event);
    }, false);

    canvas.addEventListener('mousemove', function (event) {
        engine.onMouseMove(event);
    }, false);

    // Keyboard events
    window.addEventListener('keydown', function (event) {
        engine.onButtonClick(event);
    }, false);

    // Language selector event
    document.getElementById('languageSelect').addEventListener('change', function(event) {
        engine.setLanguage(event.target.value);
        updateHelpModalTexts();
        updateFileControlsTexts();
    });

    // Help modal setup
    setupHelpModal();
    
    // File controls setup
    setupFileControls();
}

/**
 * Set up help modal functionality
 */
function setupHelpModal() {
    helpModal = document.getElementById('helpModal');
    helpCloseBtn = document.getElementById('helpCloseBtn');
    helpButton = document.getElementById('helpButton');

    // Help modal event listeners
    helpCloseBtn.addEventListener('click', hideHelpModal);
    helpButton.addEventListener('click', showHelpModal);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === helpModal) {
            hideHelpModal();
        }
    });

    // Show help modal when pressing H key
    window.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === 'h' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            if (helpModal.style.display === 'block') {
                hideHelpModal();
            } else {
                showHelpModal();
            }
        }
    });
}

/**
 * Set up file controls functionality
 */
function setupFileControls() {
    // File input event
    document.getElementById('fileInput').addEventListener('change', function(event) {
        loadPatientFile(event.target.files[0]);
    });

    // Export buttons
    document.getElementById('exportJsonBtn').addEventListener('click', function() {
        exportPatientData('json');
    });

    document.getElementById('exportTxtBtn').addEventListener('click', function() {
        exportPatientData('txt');
    });
}

/**
 * Show help modal
 */
function showHelpModal() {
    helpModal.style.display = 'block';
    updateHelpModalTexts();
}

/**
 * Hide help modal
 */
function hideHelpModal() {
    helpModal.style.display = 'none';
}

/**
 * Update help modal texts based on current language
 */
function updateHelpModalTexts() {
    if (!engine || !engine.i18n) return;
    
    // Update language selector label
    document.getElementById('languageLabel').textContent = engine.i18n.t('language.label');
    
    // Update help button text
    document.getElementById('helpButton').textContent = engine.i18n.t('help.button');
    
    document.getElementById('helpTitle').textContent = engine.i18n.t('help.title');
    document.getElementById('helpCloseBtn').textContent = engine.i18n.t('help.close');
    
    // Navigation section
    document.getElementById('helpNavigationTitle').textContent = engine.i18n.t('help.navigation.title');
    document.getElementById('helpNavigationArrows').textContent = engine.i18n.t('help.navigation.arrows');
    document.getElementById('helpNavigationNumbers').textContent = engine.i18n.t('help.navigation.numbers');
    document.getElementById('helpNavigationClick').textContent = engine.i18n.t('help.navigation.click');
    document.getElementById('helpNavigationDebug').textContent = engine.i18n.t('help.navigation.debug');
    document.getElementById('helpNavigationReset').textContent = engine.i18n.t('help.navigation.reset');
    document.getElementById('helpNavigationHelp').textContent = engine.i18n.t('help.navigation.help');
    document.getElementById('helpNavigationPrint').textContent = engine.i18n.t('help.printing.description');
    
    // Treatments section
    document.getElementById('helpTreatmentsTitle').textContent = engine.i18n.t('help.treatments.title');
    document.getElementById('helpTreatmentsCaries').textContent = engine.i18n.t('help.treatments.caries');
    document.getElementById('helpTreatmentsCrown').textContent = engine.i18n.t('help.treatments.crown');
    document.getElementById('helpTreatmentsCrownTmp').textContent = engine.i18n.t('help.treatments.crown_tmp');
    document.getElementById('helpTreatmentsMissing').textContent = engine.i18n.t('help.treatments.missing');
    document.getElementById('helpTreatmentsFracture').textContent = engine.i18n.t('help.treatments.fracture');
    document.getElementById('helpTreatmentsDiastema').textContent = engine.i18n.t('help.treatments.diastema');
    document.getElementById('helpTreatmentsFilling').textContent = engine.i18n.t('help.treatments.filling');
    
    // Surfaces section
    document.getElementById('helpSurfacesTitle').textContent = engine.i18n.t('help.surfaces.title');
    document.getElementById('helpSurfacesDescription').textContent = engine.i18n.t('help.surfaces.description');
    document.getElementById('helpSurfacesMesial').textContent = engine.i18n.t('help.surfaces.mesial');
    document.getElementById('helpSurfacesDistal').textContent = engine.i18n.t('help.surfaces.distal');
    document.getElementById('helpSurfacesVestibular').textContent = engine.i18n.t('help.surfaces.vestibular');
    document.getElementById('helpSurfacesLingual').textContent = engine.i18n.t('help.surfaces.lingual');
    document.getElementById('helpSurfacesOcclusal').textContent = engine.i18n.t('help.surfaces.occlusal');
    
    // Language section
    document.getElementById('helpLanguageTitle').textContent = engine.i18n.t('help.language.title');
    document.getElementById('helpLanguageDescription').textContent = engine.i18n.t('help.language.description');
    
    // Notes section
    document.getElementById('helpNotesTitle').textContent = engine.i18n.t('help.notes.title');
    document.getElementById('helpNotesDescription').textContent = engine.i18n.t('help.notes.description');
    
    // Printing section
    document.getElementById('helpPrintingTitle').textContent = engine.i18n.t('help.printing.title');
    document.getElementById('helpPrintingDescription').textContent = engine.i18n.t('help.printing.description');
}

/**
 * Update file controls texts based on current language
 */
function updateFileControlsTexts() {
    if (!engine || !engine.i18n) return;
    
    document.getElementById('loadFileLabel').textContent = engine.i18n.t('file.load');
    document.getElementById('exportJsonBtn').textContent = engine.i18n.t('file.export_json');
    document.getElementById('exportTxtBtn').textContent = engine.i18n.t('file.export_txt');
}

/**
 * Load patient data from file
 */
function loadPatientFile(file) {
    if (!file) return;
    
    var reader = new FileReader();
    reader.onload = function(event) {
        try {
            var data = JSON.parse(event.target.result);
            
            // Validate required fields
            if (!data.patientName || !data.patientId) {
                alert(engine.i18n.t('file.error_invalid_format'));
                return;
            }
            
            // Load patient data
            engine.loadPatientData(
                data.location || "",
                data.patientName || "",
                data.patientId || "",
                data.appointmentNumber || "",
                data.date || "",
                data.dentist || "",
                data.observations || "",
                data.specifications || ""
            );
            
            // Load tooth data if available
            if (data.teeth && Array.isArray(data.teeth)) {
                engine.loadTeethData(data.teeth);
            }
            
            // Update display
            engine.update();
            
            alert(engine.i18n.t('file.load_success'));
            
        } catch (error) {
            alert(engine.i18n.t('file.error_invalid_json'));
        }
    };
    
    reader.readAsText(file);
}

/**
 * Export patient data to file
 */
function exportPatientData(format) {
    try {
        var patientData = engine.getPatientData();
        var teethData = engine.getTeethData();
        
        var exportData = {
            patientName: patientData.patientName || "",
            patientId: patientData.patientId || "",
            location: patientData.location || "",
            appointmentNumber: patientData.appointmentNumber || "",
            date: patientData.date || "",
            dentist: patientData.dentist || "",
            observations: patientData.observations || "",
            specifications: patientData.specifications || "",
            teeth: teethData || [],
            exportDate: new Date().toISOString(),
            version: "2.0"
        };
        
        var jsonString = JSON.stringify(exportData, null, 2);
        var filename = (patientData.patientName || 'patient') + '_' + 
                      (patientData.patientId || 'data') + '_' + 
                      new Date().toISOString().split('T')[0] + 
                      '.' + format;
        
        downloadFile(jsonString, filename, 'application/json');
        
    } catch (error) {
        alert(engine.i18n.t('file.error_export'));
    }
}

/**
 * Download file helper function
 */
function downloadFile(content, filename, mimeType) {
    var blob = new Blob([content], { type: mimeType });
    var url = URL.createObjectURL(blob);
    
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});
