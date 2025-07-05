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
 * Helper class for holding id of damages 
 * which can be added to the odontograma
 * @returns {Constants}
 */
function Constants() {
    "use strict";    // Damages for drawing
    this.CARIES = 1;
    this.DEFINITIVE_CROWN = 2;
    this.TEMPORARY_CROWN = 3;
    this.MISSING_TOOTH = 4;
    this.FRACTURE = 5;
    this.DIASTEMA = 8;
    this.EXTRUDED_TOOTH = 9;
    this.PEG_SHAPED_TOOTH = 10;
    this.FILLING = 11;
    this.REMOVABLE_PROSTHESIS = 12;
    this.MIGRATION = 13;
    this.ROTATION = 14;
    this.FUSION = 15;
    this.ROOT_REMNANT = 16;
    this.INTRUDED_TOOTH = 20;
    this.REMOVABLE_ORTHODONTIC = 23;
    this.ERUPTING_TOOTH = 24;
    this.TRANSPOSITION_LEFT = 25;
    this.TRANSPOSITION_RIGHT = 26;
    this.SUPERNUMERARY = 27;
    this.PULP = 28;
    this.TOTAL_PROSTHESIS = 29;
    this.POST_AND_CORE = 30;
    this.TOTAL_EDENTULISM = 31;
    this.FIXED_ORTHODONTIC_END = 32;
    this.FIXED_ORTHODONTIC_CENTER = 33;
    this.FIXED_PROSTHESIS_LEFT = 34;
    this.FIXED_PROSTHESIS_CENTER = 35;
    this.FIXED_PROSTHESIS_RIGHT = 36;

    // Damages for writing
    this.IMPLANT = 6;
    this.MACRODONTIA = 17;
    this.MICRODONTIA = 18;
    this.IMPACTION = 19;
    this.ECTOPIC_TOOTH = 21;
    this.DISCOLORED_TOOTH = 22;
    this.WORN_SURFACE = 37;
    this.SEMI_IMPACTION = 38;
    this.all = [
        this.CARIES,
        this.DEFINITIVE_CROWN,
        this.TEMPORARY_CROWN,
        this.MISSING_TOOTH,
        this.FRACTURE,
        this.DIASTEMA,
        this.EXTRUDED_TOOTH,
        this.PEG_SHAPED_TOOTH,
        this.FILLING,
        this.REMOVABLE_PROSTHESIS,
        this.MIGRATION,
        this.ROTATION,
        this.FUSION,
        this.ROOT_REMNANT,
        this.INTRUDED_TOOTH,
        this.REMOVABLE_ORTHODONTIC,
        this.ERUPTING_TOOTH,
        this.TRANSPOSITION_LEFT,
        this.TRANSPOSITION_RIGHT,
        this.SUPERNUMERARY,
        this.PULP,
        this.TOTAL_PROSTHESIS,
        this.POST_AND_CORE,
        this.TOTAL_EDENTULISM,
        this.FIXED_ORTHODONTIC_END,
        this.FIXED_ORTHODONTIC_CENTER,
        this.FIXED_PROSTHESIS_LEFT,
        this.FIXED_PROSTHESIS_CENTER,
        this.FIXED_PROSTHESIS_RIGHT,
        this.IMPLANT,
        this.MACRODONTIA,
        this.MICRODONTIA,
        this.IMPACTION,
        this.ECTOPIC_TOOTH,
        this.DISCOLORED_TOOTH,
        this.WORN_SURFACE,
        this.SEMI_IMPACTION
    ];
    /**
     * Method to check if a damage is writable, is text only
     * @param {type} arg id of the damage
     * @returns {Boolean} true if this damage is only text, else false
     */    this.isWritable = function (arg) {

        var match = false;

        if (arg === this.DISCOLORED_TOOTH) {
            match = true;
        } else if (arg === this.ECTOPIC_TOOTH) {
            match = true;
        } else if (arg === this.IMPACTION) {
            match = true;
        } else if (arg === this.IMPLANT) {
            match = true;
        } else if (arg === this.MACRODONTIA) {
            match = true;
        } else if (arg === this.MICRODONTIA) {
            match = true;
        } else if (arg === this.SEMI_IMPACTION) {
            match = true;
        } else if (arg === this.WORN_SURFACE) {
            match = true;
        }

        return match;
    };

    this.isDiagnostic = function (arg) {

        var match = false;

        for(var i = 0; i < this.all.length; i++)
        {
            if(this.all[i] === arg){
                match = true;
                break;
            }
            
        }

        return match;
    };
}
;

