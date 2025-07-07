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
        updateReportTexts();
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
        updateReportTexts();
    });

    // Help modal setup
    setupHelpModal();
    
    // File controls setup
    setupFileControls();
    
    // Report panel setup
    setupReportPanel();
    
    // Report panel setup
    setupReportPanel();
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
 * Set up report panel functionality
 */
function setupReportPanel() {
    // Add event listeners for patient form fields
    addPatientFormListeners();
    
    // Update report when teeth data changes
    setInterval(function() {
        // Only update if engine is fully initialized
        if (engine && engine.mouth && engine.i18n && engine.getTeethData) {
            updateReport();
        }
    }, 1000);
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
            
            // Update report after import
            updateReport();
            
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
        console.log("Starting export process...");
        
        var patientData = engine.getPatientData();
        console.log("Patient data:", patientData);
        
        var teethData = engine.getTeethData();
        console.log("Teeth data:", teethData);
        
        // Validate that we have data to export
        if (!teethData || teethData.length === 0) {
            console.warn("No teeth data found for export");
            // Still allow export even if no teeth data
        }
        
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
        
        console.log("Export data prepared:", exportData);
        
        var content, filename, mimeType;
        
        if (format === 'txt') {
            // Create human-readable text format
            content = createTextReport(exportData);
            filename = (patientData.patientName || 'patient') + '_' + 
                      (patientData.patientId || 'data') + '_' + 
                      new Date().toISOString().split('T')[0] + '.txt';
            mimeType = 'text/plain';
        } else {
            // Default to JSON format
            content = JSON.stringify(exportData, null, 2);
            filename = (patientData.patientName || 'patient') + '_' + 
                      (patientData.patientId || 'data') + '_' + 
                      new Date().toISOString().split('T')[0] + '.json';
            mimeType = 'application/json';
        }
        
        console.log("Downloading file:", filename);
        downloadFile(content, filename, mimeType);
        
        // Show success message
        if (engine && engine.i18n) {
            alert(engine.i18n.t('file.export_success') || 'Export successful!');
        } else {
            alert('Export successful!');
        }
        
    } catch (error) {
        console.error("Export error:", error);
        if (engine && engine.i18n) {
            alert(engine.i18n.t('file.error_export') || 'Export failed!');
        } else {
            alert('Export failed: ' + error.message);
        }
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

/**
 * Update report panel with current patient and teeth data
 */
function updateReport() {
    if (!engine || !engine.i18n) return;
    
    updatePatientInfo();
    updateTeethReport();
    updateSummaryReport();
}

/**
 * Update patient information section
 */
function updatePatientInfo() {
    var patientData = engine.getPatientData();
    
    // Update form fields with patient data
    var patientNameField = document.getElementById('patientName');
    var patientDateField = document.getElementById('patientDate');
    var patientObservationsField = document.getElementById('patientObservations');
    var patientSpecificationsField = document.getElementById('patientSpecifications');
    
    if (patientNameField) patientNameField.value = patientData.patientName || '';
    if (patientDateField) patientDateField.value = patientData.date || '';
    if (patientObservationsField) patientObservationsField.value = patientData.observations || '';
    if (patientSpecificationsField) patientSpecificationsField.value = patientData.specifications || '';
}

/**
 * Update teeth report section
 */
function updateTeethReport() {
    // Check if engine is properly initialized
    if (!engine || !engine.getTeethData) {
        return;
    }
    
    var teethData = engine.getTeethData();
    var teethDetails = document.getElementById('teethDetails');
    
    if (!teethDetails) {
        return;
    }
    
    var html = '';
    var hasAnyTreatments = false;
    
    teethData.forEach(function(tooth) {
        if (tooth.damages && tooth.damages.length > 0) {
            hasAnyTreatments = true;
            html += '<div class="tooth-item">';
            html += '<div class="tooth-number">' + engine.i18n.t('report.tooth') + ' ' + tooth.id + '</div>';
            html += '<div class="tooth-treatments">';
            
            tooth.damages.forEach(function(damageCode) {
                var treatmentName = getTreatmentName(damageCode);
                html += '<div class="treatment-item">• ' + treatmentName + '</div>';
            });
            
            if (tooth.customText && tooth.customText.trim() !== '') {
                html += '<div class="treatment-item"><strong>' + engine.i18n.t('report.custom_note') + ':</strong> ' + escapeHtml(tooth.customText) + '</div>';
            }
            
            html += '</div>';
            html += '</div>';
        }
    });
    
    if (!hasAnyTreatments) {
        html = '<div class="tooth-item">' + engine.i18n.t('report.no_treatments') + '</div>';
    }
    
    teethDetails.innerHTML = html;
}

/**
 * Update summary report section
 */
function updateSummaryReport() {
    var teethData = engine.getTeethData();
    var summaryDetails = document.getElementById('summaryDetails');
    
    var treatmentCounts = {};
    
    teethData.forEach(function(tooth) {
        if (tooth.damages && tooth.damages.length > 0) {
            tooth.damages.forEach(function(damageCode) {
                var treatmentName = getTreatmentName(damageCode);
                treatmentCounts[treatmentName] = (treatmentCounts[treatmentName] || 0) + 1;
            });
        }
    });
    
    var html = '';
    Object.keys(treatmentCounts).forEach(function(treatment) {
        html += '<div class="summary-item">';
        html += '<span class="summary-treatment">' + treatment + '</span>';
        html += '<span class="summary-count">' + treatmentCounts[treatment] + '</span>';
        html += '</div>';
    });
    
    if (html === '') {
        html = '<div class="summary-item">' + engine.i18n.t('report.no_treatments') + '</div>';
    }
    
    summaryDetails.innerHTML = html;
}

/**
 * Get treatment name by damage code
 */
function getTreatmentName(damageCode) {
    var treatmentMap = {
        1: 'menu.caries',
        2: 'menu.crown',
        3: 'menu.crown_tmp',
        4: 'menu.missing',
        5: 'menu.fracture',
        8: 'menu.diastema',
        11: 'menu.filling',
        12: 'menu.rem_prost',
        13: 'menu.drifting',
        14: 'menu.rotation',
        15: 'menu.fusion',
        16: 'menu.root_remnant'
    };
    
    var key = treatmentMap[damageCode];
    return key ? engine.i18n.t(key) : 'Tratamento ' + damageCode;
}

/**
 * Update report panel texts based on current language
 */
function updateReportTexts() {
    if (!engine || !engine.i18n) return;
    
    document.getElementById('reportTitle').textContent = engine.i18n.t('report.title');
    document.getElementById('patientInfoTitle').textContent = engine.i18n.t('report.patient_info');
    document.getElementById('teethReportTitle').textContent = engine.i18n.t('report.teeth_report');
    document.getElementById('summaryTitle').textContent = engine.i18n.t('report.summary');
    
    // Update form labels
    document.getElementById('patientNameLabel').textContent = engine.i18n.t('report.patient.name') + ':';
    document.getElementById('patientDateLabel').textContent = engine.i18n.t('report.patient.date') + ':';
    document.getElementById('patientObservationsLabel').textContent = engine.i18n.t('report.patient.observations') + ':';
    document.getElementById('patientSpecificationsLabel').textContent = engine.i18n.t('report.patient.specifications') + ':';
    
    // Update placeholders
    document.getElementById('patientName').placeholder = engine.i18n.t('report.patient.name_placeholder');
    document.getElementById('patientObservations').placeholder = engine.i18n.t('report.patient.observations_placeholder');
    document.getElementById('patientSpecifications').placeholder = engine.i18n.t('report.patient.specifications_placeholder');
    
    updateReport();
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Create human-readable text report from export data
 */
function createTextReport(exportData) {
    var i18n = engine.i18n;
    var report = [];
    
    // Header
    report.push("=======================================");
    report.push(i18n.t('report.title').toUpperCase());
    report.push("=======================================");
    report.push("");
    
    // Patient Information
    report.push(i18n.t('report.patient_info') + ":");
    report.push("- " + i18n.t('report.name') + ": " + (exportData.patientName || i18n.t('report.not_informed')));
    report.push("- " + i18n.t('report.id') + ": " + (exportData.patientId || i18n.t('report.not_informed')));
    report.push("- " + i18n.t('report.location') + ": " + (exportData.location || i18n.t('report.not_informed')));
    report.push("- " + i18n.t('report.appointment_number') + ": " + (exportData.appointmentNumber || i18n.t('report.not_informed')));
    report.push("- " + i18n.t('report.date') + ": " + (exportData.date || i18n.t('report.not_informed')));
    report.push("- " + i18n.t('report.dentist') + ": " + (exportData.dentist || i18n.t('report.not_informed')));
    report.push("");
    
    // Observations
    if (exportData.observations) {
        report.push(i18n.t('report.observations') + ":");
        report.push(exportData.observations);
        report.push("");
    }
    
    // Specifications
    if (exportData.specifications) {
        report.push(i18n.t('report.specifications') + ":");
        report.push(exportData.specifications);
        report.push("");
    }
    
    // Teeth Analysis
    if (exportData.teeth && exportData.teeth.length > 0) {
        report.push(i18n.t('report.teeth_analysis') + ":");
        report.push("---------------------------------------");
        
        for (var i = 0; i < exportData.teeth.length; i++) {
            var tooth = exportData.teeth[i];
            if (tooth.damages && tooth.damages.length > 0) {
                report.push(i18n.t('report.tooth') + " " + tooth.id + ":");
                
                // Damage descriptions
                for (var j = 0; j < tooth.damages.length; j++) {
                    var damageType = tooth.damages[j];
                    var damageKey = 'damage_' + damageType;
                    report.push("  - " + i18n.t('report.' + damageKey));
                }
                
                // Custom text
                if (tooth.customText) {
                    report.push("  - " + i18n.t('report.custom_text') + ": " + tooth.customText);
                }
                
                report.push("");
            }
        }
    }
    
    // Summary
    report.push("=======================================");
    report.push(i18n.t('report.summary') + ":");
    report.push("=======================================");
    
    if (exportData.teeth && exportData.teeth.length > 0) {
        var damageCount = {};
        var affectedTeeth = 0;
        
        for (var i = 0; i < exportData.teeth.length; i++) {
            var tooth = exportData.teeth[i];
            if (tooth.damages && tooth.damages.length > 0) {
                affectedTeeth++;
                for (var j = 0; j < tooth.damages.length; j++) {
                    var damageType = tooth.damages[j];
                    damageCount[damageType] = (damageCount[damageType] || 0) + 1;
                }
            }
        }
        
        report.push(i18n.t('report.affected_teeth') + ": " + affectedTeeth);
        
        // Damage type summary
        for (var type in damageCount) {
            var damageKey = 'damage_' + type;
            report.push("- " + i18n.t('report.' + damageKey) + ": " + damageCount[type]);
        }
    } else {
        report.push(i18n.t('report.no_diagnoses'));
    }
    
    report.push("");
    report.push("=======================================");
    report.push(i18n.t('report.export_date') + ": " + new Date(exportData.exportDate).toLocaleString());
    report.push(i18n.t('report.version') + ": " + exportData.version);
    report.push("=======================================");
    
    return report.join('\n');
}

/**
 * Add event listeners for patient form fields
 */
function addPatientFormListeners() {
    var patientNameField = document.getElementById('patientName');
    var patientDateField = document.getElementById('patientDate');
    var patientObservationsField = document.getElementById('patientObservations');
    var patientSpecificationsField = document.getElementById('patientSpecifications');
    
    // Add change listeners to update engine data
    if (patientNameField) {
        patientNameField.addEventListener('input', function() {
            engine.treatmentData.patient = this.value;
            updateReport();
        });
    }
    
    if (patientDateField) {
        patientDateField.addEventListener('input', function() {
            engine.treatmentData.treatmentDate = this.value;
            updateReport();
        });
    }
    
    if (patientObservationsField) {
        patientObservationsField.addEventListener('input', function() {
            engine.treatmentData.observations = this.value;
            updateReport();
        });
    }
    
    if (patientSpecificationsField) {
        patientSpecificationsField.addEventListener('input', function() {
            engine.treatmentData.specs = this.value;
            updateReport();
        });
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});

/**
 * Debug function to test export data
 */
function debugExportData() {
    console.log("=== DEBUG EXPORT DATA ===");
    
    if (!engine) {
        console.error("Engine not initialized");
        return;
    }
    
    console.log("Current mouth (active):", engine.mouth);
    console.log("Adult mouth:", engine.odontAdult);
    console.log("Child mouth:", engine.odontChild);
    console.log("Adult spaces:", engine.odontSpacesAdult);
    console.log("Child spaces:", engine.odontSpacesChild);
    console.log("Is adult showing:", engine.adultShowing);
    
    var patientData = engine.getPatientData();
    console.log("Patient data:", patientData);
    
    var teethData = engine.getTeethData();
    console.log("Teeth data:", teethData);
    
    // Check for damages in current mouth
    if (engine.mouth && Array.isArray(engine.mouth)) {
        var teethWithDamages = engine.mouth.filter(function(tooth) {
            return tooth.damages && tooth.damages.length > 0;
        });
        console.log("Teeth with damages in current mouth:", teethWithDamages);
    }
    
    console.log("=== END DEBUG ===");
}

// Make debug function available globally
window.debugExportData = debugExportData;
