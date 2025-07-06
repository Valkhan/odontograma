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
    
    this.currentLanguage = 'pt'; // Default language is Portuguese
    
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
            'surface.occlusal': 'O',
            
            // Language selector
            'language.label': 'Language:',
            
            // File operations
            'file.load': 'Load Patient',
            'file.export_json': 'Export JSON',
            'file.export_txt': 'Export TXT',
            'file.load_success': 'Patient data loaded successfully!',
            'file.error_invalid_format': 'Invalid file format. Please select a valid patient file.',
            'file.error_invalid_json': 'Invalid JSON format. Please check the file content.',
            'file.error_export': 'Error exporting patient data. Please try again.',
            
            // Control buttons
            'button.adult': 'Adult',
            'button.child': 'Child',
            'button.reset': 'Reset',
            
            // Report panel
            'report.title': 'Odontogram Report',
            'report.toggle_hide': 'Hide',
            'report.toggle_show': 'Show',
            'report.patient_info': 'Patient Information',
            'report.teeth_report': 'Diagnoses by Tooth',
            'report.summary': 'Treatment Summary',
            'report.patient.name': 'Name',
            'report.patient.id': 'ID',
            'report.patient.location': 'Location',
            'report.patient.appointment': 'Appointment',
            'report.patient.date': 'Date',
            'report.patient.dentist': 'Dentist',
            'report.patient.observations': 'Observations',
            'report.patient.specifications': 'Specifications',
            'report.patient.name_placeholder': 'Patient name',
            'report.patient.observations_placeholder': 'Patient observations',
            'report.patient.specifications_placeholder': 'Treatment specifications',
            'report.tooth': 'Tooth',
            'report.no_treatments': 'No treatments registered',
            'report.custom_note': 'Note',
            'report.name': 'Name',
            'report.id': 'ID',
            'report.location': 'Location',
            'report.appointment_number': 'Appointment Number',
            'report.date': 'Date',
            'report.dentist': 'Dentist',
            'report.observations': 'Observations',
            'report.specifications': 'Specifications',
            'report.not_informed': 'Not informed',
            'report.teeth_analysis': 'Teeth Analysis',
            'report.custom_text': 'Custom Text',
            'report.affected_teeth': 'Affected Teeth',
            'report.no_diagnoses': 'No diagnoses recorded',
            'report.export_date': 'Export Date',
            'report.version': 'Version',
            'report.damage_1': 'Caries',
            'report.damage_2': 'Crown',
            'report.damage_3': 'Temporary Crown',
            'report.damage_4': 'Missing Tooth',
            'report.damage_5': 'Fracture',
            'report.damage_8': 'Diastema',
            'report.damage_11': 'Filling',
            'report.damage_12': 'Removable Prosthesis',
            'report.damage_13': 'Drifting',
            'report.damage_14': 'Rotation',
            'report.damage_15': 'Fusion',
            'report.damage_16': 'Root Remnant',
            'report.damage_17': 'Eruption',
            'report.damage_18': 'Transposition',
            'report.damage_19': 'Supernumerary',
            'report.damage_20': 'Pulp Treatment',
            'report.damage_21': 'Prosthesis',
            'report.damage_22': 'Bolt',
            'report.damage_23': 'Fixed Orthodontic',
            'report.damage_24': 'Fixed Prosthesis',
            'report.damage_25': 'Implant',
            'report.damage_26': 'Macrodontia',
            'report.damage_27': 'Microdontia',
            'report.damage_28': 'Dyschromic',
            'report.damage_29': 'Worn',
            'report.damage_30': 'Semi-Impacted',
            'report.damage_31': 'Intrusion',
            'report.damage_32': 'Edentulism',
            
            // Help modal
            'help.title': 'Odontograph - User Guide',
            'help.button': 'Help (H)',
            'help.close': 'Close',
            'help.navigation.title': 'Navigation',
            'help.navigation.arrows': 'Arrow Keys ←/→: Switch between adult and child view',
            'help.navigation.numbers': 'Number Keys: Select different damage/treatment types',
            'help.navigation.click': 'Click: Apply treatment to teeth',
            'help.navigation.debug': 'Ctrl+Q: Enable/disable debug mode',
            'help.navigation.reset': 'Z: Reset odontogram',
            'help.navigation.help': 'H: Show/hide this help',
            'help.treatments.title': 'Available Treatments',
            'help.treatments.caries': '1 - Caries',
            'help.treatments.crown': '2 - Crown',
            'help.treatments.crown_tmp': '3 - Temporary Crown',
            'help.treatments.missing': '4 - Missing Tooth',
            'help.treatments.fracture': '5 - Fracture',
            'help.treatments.diastema': '8 - Diastema',
            'help.treatments.filling': '11 - Filling',
            'help.language.title': 'Language',
            'help.language.description': 'Use the language selector in the top right corner to switch between English and Portuguese.',
            'help.surfaces.title': 'Tooth Surfaces',
            'help.surfaces.description': 'Click on the colored squares around each tooth to mark specific surfaces:',
            'help.surfaces.mesial': 'M - Mesial',
            'help.surfaces.distal': 'D - Distal',
            'help.surfaces.vestibular': 'V - Vestibular/Buccal',
            'help.surfaces.lingual': 'L - Lingual/Palatal',
            'help.surfaces.occlusal': 'O - Occlusal/Incisal',
            'help.printing.title': 'Printing',
            'help.printing.description': 'Press P to preview and print the odontogram.',
            'help.notes.title': 'Adding Notes',
            'help.notes.description': 'Click on the text box below each tooth to add custom dental codes or notes (up to 3 characters).'
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
            'surface.occlusal': 'O',
            
            // Language selector
            'language.label': 'Idioma:',
            
            // File operations
            'file.load': 'Carregar Paciente',
            'file.export_json': 'Exportar JSON',
            'file.export_txt': 'Exportar TXT',
            'file.load_success': 'Dados do paciente carregados com sucesso!',
            'file.error_invalid_format': 'Formato de arquivo inválido. Por favor, selecione um arquivo de paciente válido.',
            'file.error_invalid_json': 'Formato JSON inválido. Por favor, verifique o conteúdo do arquivo.',
            'file.error_export': 'Erro ao exportar dados do paciente. Por favor, tente novamente.',
            
            // Control buttons
            'button.adult': 'Adulto',
            'button.child': 'Criança',
            'button.reset': 'Resetar',
            
            // Report panel
            'report.title': 'Relatório do Odontograma',
            'report.toggle_hide': 'Ocultar',
            'report.toggle_show': 'Mostrar',
            'report.patient_info': 'Informações do Paciente',
            'report.teeth_report': 'Diagnósticos por Dente',
            'report.summary': 'Resumo dos Tratamentos',
            'report.patient.name': 'Nome',
            'report.patient.id': 'ID',
            'report.patient.location': 'Local',
            'report.patient.appointment': 'Consulta',
            'report.patient.date': 'Data',
            'report.patient.dentist': 'Dentista',
            'report.patient.observations': 'Observações',
            'report.patient.specifications': 'Especificações',
            'report.patient.name_placeholder': 'Nome do paciente',
            'report.patient.observations_placeholder': 'Observações sobre o paciente',
            'report.patient.specifications_placeholder': 'Especificações do tratamento',
            'report.tooth': 'Dente',
            'report.no_treatments': 'Nenhum tratamento cadastrado',
            'report.custom_note': 'Anotação',
            'report.name': 'Nome',
            'report.id': 'ID',
            'report.location': 'Local',
            'report.appointment_number': 'Número da Consulta',
            'report.date': 'Data',
            'report.dentist': 'Dentista',
            'report.observations': 'Observações',
            'report.specifications': 'Especificações',
            'report.not_informed': 'Não informado',
            'report.teeth_analysis': 'Análise dos Dentes',
            'report.custom_text': 'Texto Personalizado',
            'report.affected_teeth': 'Dentes Afetados',
            'report.no_diagnoses': 'Nenhum diagnóstico registrado',
            'report.export_date': 'Data de Exportação',
            'report.version': 'Versão',
            'report.damage_1': 'Cáries',
            'report.damage_2': 'Coroa',
            'report.damage_3': 'Coroa Temporária',
            'report.damage_4': 'Dente Ausente',
            'report.damage_5': 'Fratura',
            'report.damage_8': 'Diastema',
            'report.damage_11': 'Restauração',
            'report.damage_12': 'Prótese Removível',
            'report.damage_13': 'Migração',
            'report.damage_14': 'Giroversão',
            'report.damage_15': 'Fusão',
            'report.damage_16': 'Remanescente Radicular',
            'report.damage_17': 'Erupção',
            'report.damage_18': 'Transposição',
            'report.damage_19': 'Supranumerário',
            'report.damage_20': 'Tratamento Pulpar',
            'report.damage_21': 'Prótese',
            'report.damage_22': 'Perno',
            'report.damage_23': 'Ortodôntico Fixo',
            'report.damage_24': 'Prótese Fixa',
            'report.damage_25': 'Implante',
            'report.damage_26': 'Macrodontia',
            'report.damage_27': 'Microdontia',
            'report.damage_28': 'Discrômico',
            'report.damage_29': 'Desgastado',
            'report.damage_30': 'Semi-Impactado',
            'report.damage_31': 'Intrusão',
            'report.damage_32': 'Edentulismo',
            
            // Help modal
            'help.title': 'Odontograma - Guia do Usuário',
            'help.button': 'Ajuda (H)',
            'help.close': 'Fechar',
            'help.navigation.title': 'Navegação',
            'help.navigation.arrows': 'Setas ←/→: Alternar entre vista de adulto e criança',
            'help.navigation.numbers': 'Teclas Numéricas: Selecionar tipos de danos/tratamentos',
            'help.navigation.click': 'Clique: Aplicar tratamento nos dentes',
            'help.navigation.debug': 'Ctrl+Q: Ativar/desativar modo debug',
            'help.navigation.reset': 'Z: Resetar odontograma',
            'help.navigation.help': 'H: Mostrar/ocultar esta ajuda',
            'help.treatments.title': 'Tratamentos Disponíveis',
            'help.treatments.caries': '1 - Cáries',
            'help.treatments.crown': '2 - Coroa',
            'help.treatments.crown_tmp': '3 - Coroa Temporária',
            'help.treatments.missing': '4 - Dente Ausente',
            'help.treatments.fracture': '5 - Fractura',
            'help.treatments.diastema': '8 - Diastema',
            'help.treatments.filling': '11 - Restauração',
            'help.language.title': 'Idioma',
            'help.language.description': 'Use o seletor de idioma no canto superior direito para alternar entre inglês e português.',
            'help.surfaces.title': 'Superfícies do Dente',
            'help.surfaces.description': 'Clique nos quadrados coloridos ao redor de cada dente para marcar superfícies específicas:',
            'help.surfaces.mesial': 'M - Mesial',
            'help.surfaces.distal': 'D - Distal',
            'help.surfaces.vestibular': 'V - Vestibular/Bucal',
            'help.surfaces.lingual': 'L - Lingual/Palatina',
            'help.surfaces.occlusal': 'O - Oclusal/Incisal',
            'help.printing.title': 'Impressão',
            'help.printing.description': 'Pressione P para visualizar e imprimir o odontograma.',
            'help.notes.title': 'Adicionando Notas',
            'help.notes.description': 'Clique na caixa de texto abaixo de cada dente para adicionar códigos dentários ou notas personalizadas (até 3 caracteres).'
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
