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
 * Internationalization (i18n) class for managing translations
 * @returns {I18n}
 */
function I18n() {
    "use strict";
    
    this.currentLanguage = 'en'; // Default language is English
    
    this.translations = {
        'en': {
            // Application title
            'app.title': 'Odontograph',
            
            // Menu items
            'menu.caries': 'Caries',
            'menu.crown': 'Crown',
            'menu.crown_tmp': 'Crown (Tmp)',
            'menu.missing': 'Missing',
            'menu.fracture': 'Fracture',
            'menu.diastema': 'Diastema',
            'menu.filling': 'Filling',
            'menu.rem_prost': 'Rem Prost',
            'menu.drifting': 'Drifting',
            'menu.rotation': 'Rotation',
            'menu.fusion': 'Fusion',
            'menu.root_remnant': 'Root Remnant',
            'menu.eruption': 'Eruption',
            'menu.transposition': 'Transposition',
            'menu.supernumerary': 'Supernumerary',
            'menu.pulp': 'Pulp',
            'menu.prosthesis': 'Prosthesis',
            'menu.bolt': 'Bolt',
            'menu.fixed_ortho': 'Fixed Ortho',
            'menu.fixed_prosth': 'Fixed Prosth',
            'menu.implant': 'Implant',
            'menu.macrodontia': 'Macrodontia',
            'menu.microdontia': 'Microdontia',
            'menu.dyschromic': 'Dyschromic',
            'menu.worn': 'Worn',
            'menu.impacted_semi': 'Impacted Semi',
            'menu.intrusion': 'Intrusion',
            'menu.edentulism': 'Edentulism',
            'menu.ectopic': 'Ectopic',
            'menu.impacted': 'Impacted',
            'menu.rem_orthodo': 'Rem Orthodo',
            'menu.extrusion': 'Extrusion',
            'menu.post': 'Post',
            
            // Diagnostic labels
            'diagnostic.caries': 'C',
            'diagnostic.discolored': 'DIS',
            'diagnostic.ectopic': 'E',
            'diagnostic.impaction': 'I',
            'diagnostic.implant': 'IMP',
            'diagnostic.macrodontia': 'MAC',
            'diagnostic.microdontia': 'MIC',
            'diagnostic.semi_impaction': 'SI',
            'diagnostic.worn_surface': 'DES',
            'diagnostic.supernumerary': 'S',
            
            // Print header
            'print.patient': 'Patient',
            'print.appointment': 'Appoint No.',
            'print.date': 'Date',
            'print.dentist': 'Dentist',
            'print.specifications': 'Specifications',
            'print.observations': 'Observations',
            
            // Prompts and messages
            'prompt.dental_code': 'Add 3 letter dental code.',
            'debug.mode': 'DEBUG MODE',
            'debug.coordinates': 'X: {x}, Y: {y}',
            'console.setting_damage': 'Engine setting damage: {damage}',
            'console.setting_adult': 'Setting odontograma to adult',
            'console.setting_child': 'Setting odontograma to child',
            'console.diagnostic': 'Diagnostico: {data}',
            'console.render_diagnostic': 'Will render diagnostic',
            
            // Surface identifiers
            'surface.mesial': 'M',
            'surface.distal': 'D',
            'surface.vestibular': 'V',
            'surface.lingual': 'L',
            'surface.occlusal': 'O'
        },
        
        'pt': {
            // Application title
            'app.title': 'Odontograma',
            
            // Menu items
            'menu.caries': 'Cáries',
            'menu.crown': 'Coroa',
            'menu.crown_tmp': 'Coroa (Tmp)',
            'menu.missing': 'Ausente',
            'menu.fracture': 'Fratura',
            'menu.diastema': 'Diastema',
            'menu.filling': 'Restauração',
            'menu.rem_prost': 'Prótese Rem',
            'menu.drifting': 'Migração',
            'menu.rotation': 'Giroversão',
            'menu.fusion': 'Fusão',
            'menu.root_remnant': 'Remanescente',
            'menu.eruption': 'Erupção',
            'menu.transposition': 'Transposição',
            'menu.supernumerary': 'Supranumerário',
            'menu.pulp': 'Pulpar',
            'menu.prosthesis': 'Prótese',
            'menu.bolt': 'Perno',
            'menu.fixed_ortho': 'Ortodôntico Fixo',
            'menu.fixed_prosth': 'Prótese Fixa',
            'menu.implant': 'Implante',
            'menu.macrodontia': 'Macrodontia',
            'menu.microdontia': 'Microdontia',
            'menu.dyschromic': 'Discrômico',
            'menu.worn': 'Desgastado',
            'menu.impacted_semi': 'Semi-Impactado',
            'menu.intrusion': 'Intrusão',
            'menu.edentulism': 'Edentulismo',
            'menu.ectopic': 'Ectópico',
            'menu.impacted': 'Impactado',
            'menu.rem_orthodo': 'Ortodôntico Rem',
            'menu.extrusion': 'Extrusão',
            'menu.post': 'Pino',
            
            // Diagnostic labels
            'diagnostic.caries': 'C',
            'diagnostic.discolored': 'DIS',
            'diagnostic.ectopic': 'E',
            'diagnostic.impaction': 'I',
            'diagnostic.implant': 'IMP',
            'diagnostic.macrodontia': 'MAC',
            'diagnostic.microdontia': 'MIC',
            'diagnostic.semi_impaction': 'SI',
            'diagnostic.worn_surface': 'DES',
            'diagnostic.supernumerary': 'S',
            
            // Print header
            'print.patient': 'Paciente',
            'print.appointment': 'Consulta Nº',
            'print.date': 'Data',
            'print.dentist': 'Dentista',
            'print.specifications': 'Especificações',
            'print.observations': 'Observações',
            
            // Prompts and messages
            'prompt.dental_code': 'Adicione código dental de 3 letras.',
            'debug.mode': 'MODO DEBUG',
            'debug.coordinates': 'X: {x}, Y: {y}',
            'console.setting_damage': 'Engine definindo dano: {damage}',
            'console.setting_adult': 'Configurando odontograma para adulto',
            'console.setting_child': 'Configurando odontograma para criança',
            'console.diagnostic': 'Diagnóstico: {data}',
            'console.render_diagnostic': 'Renderizando diagnóstico',
            
            // Surface identifiers
            'surface.mesial': 'M',
            'surface.distal': 'D',
            'surface.vestibular': 'V',
            'surface.lingual': 'L',
            'surface.occlusal': 'O'
        }
    };
    
    /**
     * Set the current language
     * @param {string} language - Language code ('en' or 'pt')
     */
    this.setLanguage = function(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
        }
    };
    
    /**
     * Get the current language
     * @returns {string} Current language code
     */
    this.getLanguage = function() {
        return this.currentLanguage;
    };
    
    /**
     * Get translated text
     * @param {string} key - Translation key
     * @param {object} params - Parameters for string interpolation
     * @returns {string} Translated text
     */
    this.t = function(key, params) {
        var translation = this.translations[this.currentLanguage][key];
        
        if (!translation) {
            // Fallback to English if translation not found
            translation = this.translations['en'][key];
        }
        
        if (!translation) {
            // Return key if no translation found
            return key;
        }
        
        // Handle string interpolation
        if (params) {
            for (var param in params) {
                var placeholder = '{' + param + '}';
                translation = translation.replace(placeholder, params[param]);
            }
        }
        
        return translation;
    };
    
    /**
     * Get all available languages
     * @returns {array} Array of language codes
     */
    this.getAvailableLanguages = function() {
        return Object.keys(this.translations);
    };
}
