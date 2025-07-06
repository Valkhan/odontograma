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
 * Settings class for the application.
 * This class contains all the values, which are not 
 * fixed in the engine.
 * @returns {Settings}
 */
function Settings() {
    "use strict";
    // app settings
    this.DEBUG = false;
    this.HIGHLIGHT_SPACES = false;
    this.TOOTH_PADDING = 0;
    this.RECT_DIMEN = 10;
    
    // language settings
    this.DEFAULT_LANGUAGE = "pt"; // Default language is Portuguese
    
    // view settings
    // Check localStorage for saved settings, otherwise use defaults
    this.ADULT_ENABLED = this.loadSetting('odontograma_adult_enabled', false);
    this.CHILD_ENABLED = this.loadSetting('odontograma_child_enabled', false);
    this.DEFAULT_VIEW = this.loadSetting('odontograma_default_view', "adult");
    
    // colors
    this.COLOR_ON_TOUCH = "#FF8B00";
    this.COLOR_HIGHLIGHT = "#1CDE02";
    this.COLOR_RED = "#ff0000";
    this.COLOR_BLUE = "#0052ff";
    this.COLOR_BLACK = "#000000";
    this.COLOR_HIGHLIGHT = "#00AEFF";
    this.COLOR_HIGHLIGHT_BAD = "#FF0000";
}

/**
 * Load setting from localStorage with fallback to default value
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} The loaded value or default value
 */
Settings.prototype.loadSetting = function(key, defaultValue) {
    try {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
            // Handle boolean values
            if (typeof defaultValue === 'boolean') {
                return saved === 'true';
            }
            // Handle string values
            return saved;
        }
    } catch (e) {
        console.log('Error loading setting from localStorage:', e);
    }
    return defaultValue;
};

/**
 * Save setting to localStorage
 * @param {string} key - The localStorage key
 * @param {any} value - The value to save
 */
Settings.prototype.saveSetting = function(key, value) {
    try {
        localStorage.setItem(key, value.toString());
    } catch (e) {
        console.log('Error saving setting to localStorage:', e);
    }
};