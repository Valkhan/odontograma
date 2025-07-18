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

// include the necessary scripts
document.writeln("<script type='text/javascript' src='js/constants.js'></script>");
document.writeln("<script type='text/javascript' src='js/i18n.js'></script>");
document.writeln("<script type='text/javascript' src='js/settings.js'></script>");
document.writeln("<script type='text/javascript' src='js/rect.js'></script>");
document.writeln("<script type='text/javascript' src='js/damage.js'></script>");
document.writeln("<script type='text/javascript' src='js/textBox.js'></script>");
document.writeln("<script type='text/javascript' src='js/tooth.js'></script>");
document.writeln("<script type='text/javascript' src='js/menuItem.js'></script>");
document.writeln("<script type='text/javascript' src='js/renderer.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontogramaGenerator.js'></script>");
document.writeln("<script type='text/javascript' src='js/collisionHandler.js'></script>");

function Engine() {
    "use strict";
    // canvas which is used by the engine
    this.canvas = null;

    this.adultShowing = true;

    // array which contains all the teeth for an odontograma
    this.mouth = [];

    // array which holds all the spaces between teeth
    this.spaces = [];

    // array for an adult odontograma
    this.odontAdult = [];

    // spaces for a adult odontograma
    this.odontSpacesAdult = [];

    // array for a child odontograma
    this.odontChild = [];

    // spaces for a child odontograma
    this.odontSpacesChild = [];

    // renderer which will render everything on a canvas
    this.renderer = new Renderer();

    // helper to create odontograma
    this.odontogramaGenerator = new OdontogramaGenerator();

    // helper for handeling collision
    this.collisionHandler = new CollisionHandler();    // settings for application
    this.settings = new Settings();

    // internationalization
    this.i18n = new I18n();
    
    // Set default language from settings
    this.i18n.setLanguage(this.settings.DEFAULT_LANGUAGE);

    // constants for application
    this.constants = new Constants();

    // value of the selected damage which should be added or removed
    this.selectedDamage = 0;

    // x position of the mouse pointer
    this.cursorX = 0;

    // y position of the mouse pointer
    this.corsorY = 0;

    // flag to toggle multiselection on or off
    this.multiSelect = false;

    // array to hold values for multiselection. When selecting 
    // a range of teeth
    this.multiSelection = [];

    this.currentType = 0;

    this.preview = false;

    this.printPreviewPositionChange = 190;

    this.observations = "";

    this.specifications = "";

    this.patient = "";

    this.treatmentNumber = "";

    this.treatmentData = {};

    this.menuItems = [];

    this.buttons = []

    this.adult = new MenuItem()

    this.child = new MenuItem()

    this.clear = new MenuItem()

}

/**
 * Method to set the canvas for the engine.
 * @param {type} canvas the canvas which will be used for drawing
 * @returns {undefined}
 */
Engine.prototype.setCanvas = function (canvas) {
    "use strict";
    console.log("Engine: setting canvas: " + canvas);
    console.log("Engine: canvas size (" + canvas.width + ", " + canvas.height + ")");
    this.canvas = canvas;
    this.renderer.init(this.canvas);
};

/**
 * Helper method to get the real x position of mouse
 * @param {type} event mouse event containing mouse position
 * @returns {Number} the x position of the mouse
 */
Engine.prototype.getXpos = function (event) {
    "use strict";
    var boundingRect = this.canvas.getBoundingClientRect();

    return Math.round(event.clientX - (boundingRect.left));
};

/**
 * Helper method to get the real y position of mouse
 * @param {type} event mouse event containing mouse position
 * @returns {Number} the y position of the mouse
 */
Engine.prototype.getYpos = function (event) {
    "use strict";
    var boundingRect = this.canvas.getBoundingClientRect();

    return Math.round(event.clientY - (boundingRect.top));
};

/**
 * Method to prepare the engine
 * @returns {undefined}
 */
Engine.prototype.init = function () {
    "use strict";
    this.collisionHandler.setConstants(this.constants);

    // set up the odontograma
    this.odontogramaGenerator.setEngine(this);

    this.odontogramaGenerator.setSettings(this.settings);

    this.odontogramaGenerator.setConstants(this.constants);

    this.odontogramaGenerator.prepareOdontogramaAdult(this.odontAdult,
        this.odontSpacesAdult, this.canvas);

    this.odontogramaGenerator.prepareOdontogramaChild(this.odontChild,
        this.odontSpacesChild, this.canvas);    this.mouth = this.odontAdult;

    this.spaces = this.odontSpacesAdult;

    this.createMenu()
    
    // Only create adult button if enabled in settings
    if (this.settings.ADULT_ENABLED) {
        this.adult = new MenuItem();
        this.adult.setUp(10, 150, 75, 20);
        this.adult.textBox.text = this.i18n.t('button.adult');
        this.adult.active = (this.settings.DEFAULT_VIEW === "adult");
        this.buttons.push(this.adult);
    }

    // Only create child button if enabled in settings
    if (this.settings.CHILD_ENABLED) {
        this.child = new MenuItem();
        // Position child button based on whether adult button exists
        var childX = this.settings.ADULT_ENABLED ? 90 : 10;
        this.child.setUp(childX, 150, 75, 20);
        this.child.textBox.text = this.i18n.t('button.child');
        this.child.active = (this.settings.DEFAULT_VIEW === "child");
        this.buttons.push(this.child);
    }

    // Set default view based on settings
    if (this.settings.DEFAULT_VIEW === "child" && this.settings.CHILD_ENABLED) {
        this.adultShowing = false;
        this.mouth = this.odontChild;
        this.spaces = this.odontSpacesChild;
    } else if (this.settings.DEFAULT_VIEW === "adult" && this.settings.ADULT_ENABLED) {
        this.adultShowing = true;
        this.mouth = this.odontAdult;
        this.spaces = this.odontSpacesAdult;
    }

    this.clear = new MenuItem()
    this.clear = new MenuItem();
    this.clear.setUp((this.canvas.width-10) - 76, 150, 75, 20);
    this.clear.textBox.text = this.i18n.t('button.reset');
    this.clear.active = false;
    this.buttons.push(this.clear);

};


/**
 * Method for updating the engine
 * @returns {undefined}
 */
Engine.prototype.update = function () {
    "use strict";
    this.renderer.clear(this.settings);

    if (!this.preview) {
        this.renderer.render(this.mouth, this.settings, this.constants);

        this.renderer.render(this.spaces, this.settings, this.constants);        this.renderer.render(this.menuItems, this.settings, this.constants);

        // Don't render buttons during print preview
        if (!this.preview) {
            this.renderer.render(this.buttons, this.settings, this.constants);
        }

        if (this.settings.DEBUG) {

            this.renderer.renderText("DEBUG MODE", 2, this.canvas.height, "#000000");

            this.renderer.renderText("X: " + this.cursorX + ", Y: " + this.cursorY,
                128, this.canvas.height, "#000000");


            this.renderer.renderText("Selected Damage : " + this.selectedDamage,
                220, this.canvas.height, "#000000");
        }    } else {
        this.printPreview();
    }
    
    // Notify report update if available
    if (typeof updateReport === 'function') {
        updateReport();
    }
};

/**
 * Method to remove all the highlight from all the teeth
 * @returns {undefined}
 */
Engine.prototype.removeHighlight = function () {
    "use strict";
    for (var i = 0; i < this.mouth.length; i++) {
        this.mouth[i].highlight = false;
    }

};

/**
 * Method to highlight all the teeth which are marked when multiselected
 * @param {type} tooth the tooth which should be highlighted
 * @returns {undefined}
 */
Engine.prototype.highlightMultiSelection = function (tooth) {
    "use strict";
    console.log("Highlighting multiselection");
    try {

        // only highlight if we the selection is at least 1
        if (this.multiSelection.length > 0) {

            // reset the highlighting
            for (var i = 0; i < this.mouth.length; i++) {
                this.mouth[i].highlight = false;
                this.mouth[i].highlightColor = this.settings.COLOR_HIGHLIGHT;
            }

            var tooth1 = this.multiSelection[0];

            // check if these teeth are same types
            if (tooth1.type === tooth.type) {

                // get indices for both teeth
                var index1 = this.getIndexForTooth(tooth1);
                var index2 = this.getIndexForTooth(tooth);

                var begin = Math.min(index1, index2);
                var end = Math.max(index1, index2);

                // highlight the teeth between begin and end
                for (var i = begin; i <= end; i++) {

                    this.mouth[i].highlight = true;
                }

                // some damages can only have 2 items in multiselection
                if (this.selectedDamage === this.constants.TRANSPOSITION_LEFT) {

                    // if count of selection for this damage (max 2) then
                    // change the highlight color, to show that this selection
                    // is not allowed
                    if ((end - begin) > 1) {

                        for (var i = begin; i <= end; i++) {

                            this.mouth[i].highlightColor = this.settings.COLOR_HIGHLIGHT_BAD;
                        }
                    }

                }

            }

            // repaint
            this.update();
        }

    } catch (error) {
        console.log("Engine highlightMultiSelection e: " + error.message);
    }

};


/**
 * Method to reset the multiselection - deactivate multiselection
 * @returns {undefined}
 */
Engine.prototype.resetMultiSelect = function () {
    "use strict";
    this.selectedDamage = "0";
    this.multiSelect = false;
    this.multiSelection.length = 0;
    this.removeHighlight();
    this.update();
};

/**
 * Method to get the index for a tooth
 * @param {type} tooth the tooth to find the index of
 * @returns {Number} index of the tooth, -1 if not found
 */
Engine.prototype.getIndexForTooth = function (tooth) {
    "use strict";
    var index = -1;

    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].id === tooth.id) {
            index = i;
            break;
        }
    }

    return index;

};

/**
 * Method to handle multiselection. this method is called when multiselect contains
 * 2 items, start and end. This method will add or remove damages from the teeth
 * which have been selected.
 * @returns {void}
 */
Engine.prototype.handleMultiSelection = function () {
    "use strict";
    // only handle multiselect when 2 teeth have been selected
    // start and end
    if (this.multiSelection.length === 2) {


        let tooth1 = this.multiSelection[0];
        let tooth2 = this.multiSelection[1];


        // get the indices for the teeth which have been selected
        var index1 = this.getIndexForTooth(tooth1);
        var index2 = this.getIndexForTooth(tooth2);

        var valid = true;

        // make sure that we dont select the same tooth 2 times
        if (index1 === index2) {
            valid = false;
        }

        // make sure that both teeth are same type, upper or lower mouth
        if (tooth1.type !== tooth2.type) {
            valid = false;
        }

        // only toggle damages if everyhting is okey
        if (valid) {

            var start = Math.min(index1, index2);
            var end = Math.max(index1, index2);            // check which damage should be added or removed from the selected
            // teeth
            if (this.selectedDamage === this.constants.FIXED_ORTHODONTIC_END) {

                this.mouth[start].toggleDamage(this.constants.FIXED_ORTHODONTIC_END,
                    this.constants);

                this.mouth[end].toggleDamage(this.constants.FIXED_ORTHODONTIC_END,
                    this.constants);

                for (var i = start + 1; i <= end - 1; i++) {

                    this.mouth[i].toggleDamage(this.constants.FIXED_ORTHODONTIC_CENTER,
                        this.constants);

                }

            } else if (this.selectedDamage === this.constants.FIXED_PROSTHESIS_LEFT) {

                this.mouth[start].toggleDamage(this.constants.FIXED_PROSTHESIS_RIGHT,
                    this.constants);

                this.mouth[end].toggleDamage(this.constants.FIXED_PROSTHESIS_LEFT,
                    this.constants);

                for (var i = start + 1; i <= end - 1; i++) {

                    this.mouth[i].toggleDamage(this.constants.FIXED_PROSTHESIS_CENTER,
                        this.constants);

                }

            } else if (this.selectedDamage === this.constants.TRANSPOSITION_LEFT) {

                if (end - start === 1) {

                    this.mouth[start].toggleDamage(this.constants.TRANSPOSITION_LEFT,
                        this.constants);

                    this.mouth[end].toggleDamage(this.constants.TRANSPOSITION_RIGHT,
                        this.constants);
                }

            }

        }

        // reset multiselection when it is finished
        this.multiSelection.length = 0;

        this.removeHighlight();

        this.update();
    }

};

/**
 * Method to add items to a list of selected items
 * @param {type} tooth the tooth to add to the list
 * @returns {undefined}
 */
Engine.prototype.addToMultiSelection = function (tooth) {
    "use strict";
    this.multiSelection.push(tooth);

    if (this.multiSelection.length === 2) {
        this.handleMultiSelection();
    }

};

/**
 * Method to check if a string is alphanumeric
 * @param {type} input the text to check
 * @returns {Boolean} true if aphanumeric, else false
 */
Engine.prototype.isAlphanumeric = function (input) {
    "use strict";
    var valid = false;

    var letters = /^[0-9a-zA-Z]+$/;

    if (input.match(letters)) {
        valid = true;

    }

    return valid;
};


/**
 * Method to add text to a textbox. This method only allows alphanumeric values
 * to be added to a texbox
 * @param {type} textBox for the text
 * @param {type} text to add to the textbox
 * @returns {void} 
 */
Engine.prototype.setTextToTextBox = function (textBox, text) {
    "use strict";
    if (text !== null) {
        if (text.length < 4) {

            if (this.isAlphanumeric(text)) {
                textBox.setNote(text);
            } else if (text === "") {
                textBox.setNote(text);
            }
        }
    }
};

/**
 * Method to handle when there is a mouse click on a textbox
 * the method prompts the user to input a text.
 * @param {type} textBox the textbox which has been clicked
 * @returns {void}
 */
Engine.prototype.onTextBoxClicked = function (textBox) {
    "use strict";
    var message = this.i18n.t('prompt.dental_code');

    var text = prompt(message, "");

    this.setTextToTextBox(textBox, text);

};

/**
 * Method to handle mouse right click on a space
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.mouseRightClickSpace = function (event) {
    "use strict";

    var shouldUpdate = false;

    for (var i = 0; i < this.spaces.length; i++) {
        // check collision for current space
        if (this.spaces[i].checkCollision(
            this.getXpos(event),
            this.getYpos(event))) {

            this.spaces[i].popDamage();

            shouldUpdate = true;
        }
    }

    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }

};

/**
 * Method to handle a right mouse click on a tooth
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.mouseRightClickTooth = function (event) {
    "use strict";

    var shouldUpdate = false;

    // loop through all teeth
    for (var i = 0; i < this.mouth.length; i++) {

        // check if there is a collision with the textBox
        if (this.mouth[i].textBox.rect.checkCollision(this.getXpos(event),
            this.getYpos(event))) {

            this.mouth[i].textBox.text = "";

        }

        // check collision for current tooth
        if (this.mouth[i].rect.checkCollision(
            this.getXpos(event),
            this.getYpos(event))) {

            this.mouth[i].popDamage();
            shouldUpdate = true;
        }


        // check if there is a collision with one of the tooth surfaces
        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++) {

            if (this.mouth[i].checkBoxes[j].checkCollision(
                this.getXpos(event),
                this.getYpos(event))) {


                // handle collision with surface    
                this.mouth[i].checkBoxes[j].state = 0;

                shouldUpdate = true;
            }
        }
    }

    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }
};

/**
 * Method to handle mouse click event, when the spaces between the teeth 
 * are in the forground.
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.mouseClickSpace = function (event) {
    "use strict";
    var shouldUpdate = false;

    for (var i = 0; i < this.spaces.length; i++) {
        // check collision for current space
        if (this.spaces[i].checkCollision(
            this.getXpos(event),
            this.getYpos(event))) {

            this.collisionHandler.handleCollision(
                this.spaces[i],
                this.selectedDamage);

            shouldUpdate = true;
        }
    }

    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }

};

/**
 * Method to handle mouse click event when the teeth are in the foreground
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.mouseClickTooth = function (event) {
    "use strict";
    var shouldUpdate = false;

    // loop through all teeth
    for (var i = 0; i < this.mouth.length; i++) {

        // check if there is a collision with the textBox
        if (this.mouth[i].textBox.rect.checkCollision(this.getXpos(event),
            this.getYpos(event))) {

            if (this.currentType === 0) {
                this.onTextBoxClicked(this.mouth[i].textBox);
            }
        }

        // check collision for current tooth
        if (this.mouth[i].rect.checkCollision(
            this.getXpos(event),
            this.getYpos(event))) {

            // if we are in multi select mode
            // add this tooth to multi select list
            if (this.multiSelect) {

                this.addToMultiSelection(this.mouth[i]);

            } else {

                if (this.currentType === 0) {

                    // handle collision with tooth
                    this.collisionHandler.handleCollision(
                        this.mouth[i],
                        this.selectedDamage);

                    shouldUpdate = true;

                } else {

                    var d = new Object();

                    d.tooth = this.mouth[i].id;
                    d.damage = "";
                    d.diagnostic = this.selectedDamage;
                    d.surface = "X";
                    d.note = "";

                    this.createDiagnostico(d);

                }
            }
        }

        // check if there is a collision with one of the tooth surfaces
        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++) {

            if (this.mouth[i].checkBoxes[j].checkCollision(
                this.getXpos(event),
                this.getYpos(event))) {

                console.log("Collision Checkbox : " + this.selectedDamage)

                if (this.currentType === 0) {

                    console.log("Collision Checkbox : " + this.selectedDamage)
                    // handle collision with surface    
                    this.collisionHandler.handleCollisionCheckBox(
                        this.mouth[i].checkBoxes[j],
                        this.selectedDamage);

                    shouldUpdate = true;

                } else {

                    var d = new Object();

                    d.tooth = "0";
                    d.damage = "";
                    d.diagnostic = this.selectedDamage;
                    d.surface = this.mouth[i].checkBoxes[j].id;
                    d.note = "";

                    this.createDiagnostico(d);

                }
            }
        }
    }


    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }

};


/**
 * Method to handle mouse click event when the teeth are in the foreground
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.mouseClickMenu = function (event) {
    "use strict";
    var shouldUpdate = false;

    // loop through all teeth
    for (var i = 0; i < this.menuItems.length; i++) {

        // check collision for current tooth
        if (this.menuItems[i].rect.checkCollision(
            this.getXpos(event),
            this.getYpos(event))) {

            if (this.menuItems[i].active) {
                for (var j = 0; j < this.menuItems.length; j++) {
                    this.menuItems[j].active = false;
                }
                this.menuItems[i].active = false;
                this.selectedDamage = 0;
            } else {
                for (var j = 0; j < this.menuItems.length; j++) {
                    this.menuItems[j].active = false;
                }
                this.menuItems[i].active = true;
                this.selectedDamage = this.menuItems[i].id;
            }

            this.setDamage(this.selectedDamage);
            console.log("Mouse click. MenuItem: ");


            shouldUpdate = true;
        }
    }

    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }

};


Engine.prototype.mouseClickControls = function (event) {
    "use strict";
    var shouldUpdate = false;

    // Only check adult button if it exists
    if (this.adult && this.adult.rect.checkCollision(
        this.getXpos(event),
        this.getYpos(event))) {

        this.adult.active = true;
        if (this.child) {
            this.child.active = false;
        }
        shouldUpdate = true;

        this.adultShowing = true;
        console.log("Setting odontograma to adult");
        this.mouth = this.odontAdult;
        this.spaces = this.odontSpacesAdult;
        this.update();
    }

    // Only check child button if it exists
    if (this.child && this.child.rect.checkCollision(
        this.getXpos(event),
        this.getYpos(event))) {

        if (this.adult) {
            this.adult.active = false;
        }
        this.child.active = true;
        shouldUpdate = true;

        this.adultShowing = false;
        console.log("Setting odontograma to child");
        this.mouth = this.odontChild;
        this.spaces = this.odontSpacesChild;
        this.update();
    }

    if (this.clear.rect.checkCollision(
        this.getXpos(event),
        this.getYpos(event))) {

        shouldUpdate = true;
        this.reset();
    }

    if (shouldUpdate) {
        this.update();
    }

};

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.onMouseClick = function (event) {
    "use strict";

    console.log("Mouse click. which: " + event.which);

    if (!this.preview) {


        if (event.which === 3) {

            // check what is in foreground
            if (this.settings.HIGHLIGHT_SPACES) {

                this.mouseRightClickSpace(event);

            } else {

                this.mouseRightClickTooth(event);

            }

        } else if (event.which === 1) {
            // check what is in foreground
            if (this.settings.HIGHLIGHT_SPACES) {

                this.mouseClickSpace(event);

            } else {

                this.mouseClickTooth(event);

            }

            this.mouseClickMenu(event);
            this.mouseClickControls(event);

        }
    }

};

/**
 * Method to get the x and y coordinates of the mouse cursor
 * @param {type} event mouse move event
 * @returns {undefined}
 */
Engine.prototype.followMouse = function (event) {
    "use strict";

    this.cursorX = this.getXpos(event);
    this.cursorY = this.getYpos(event);

    this.update();
};

/**
 * Method to handle mouse move event when spaces between teeth are in foreground
 * @param {type} event mouse move envent
 * @returns {void}
 */
Engine.prototype.mouseMoveSpaces = function (event) {
    "use strict";

    for (var i = 0; i < this.spaces.length; i++) {

        var update = false;

        if (this.spaces[i].checkCollision(this.getXpos(event),
            this.getYpos(event))) {

            this.spaces[i].onTouch(true);

            update = true;

        } else {

            this.spaces[i].onTouch(false);
        }
    }

    if (update) {
        this.update();
    }
};

/**
 * Method to handle mouse move event, when teeth are in forground
 * @param {type} event mouse move event
 * @returns {void}
 */
Engine.prototype.mouseMoveTeeth = function (event) {
    "use strict";

    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].textBox.rect.checkCollision(this.getXpos(event),
            this.getYpos(event))) {

            this.mouth[i].textBox.touching = true;

        } else {

            this.mouth[i].textBox.touching = false;

        }

        if (this.mouth[i].checkCollision(this.getXpos(event),
            this.getYpos(event))) {
            this.mouth[i].onTouch(true);

            if (this.multiSelect) {

                if (this.multiSelection.length > 0) {
                    this.highlightMultiSelection(this.mouth[i]);
                }
            }

        } else {
            this.mouth[i].onTouch(false);
        }

        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++) {

            if (this.mouth[i].checkBoxes[j].checkCollision(
                this.getXpos(event), this.getYpos(event))) {
                this.mouth[i].checkBoxes[j].touching = true;

            } else {
                this.mouth[i].checkBoxes[j].touching = false;
            }
        }
    }
};


Engine.prototype.mouseMoveMenuItems = function (event) {
    "use strict";

    for (var i = 0; i < this.menuItems.length; i++) {

        var update = false;

        if (this.menuItems[i].rect.checkCollision(this.getXpos(event),
            this.getYpos(event))) {

            this.menuItems[i].highlight = true;

            update = true;

        } else {

            this.menuItems[i].highlight = false;
        }
    }    // Only check child button if it exists
    if (this.child) {
        if (this.child.rect.checkCollision(this.getXpos(event),
            this.getYpos(event))) {
            this.child.highlight = true;
            update = true;
        } else {
            this.child.highlight = false;
        }
    }

    // Only check adult button if it exists
    if (this.adult) {
        if (this.adult.rect.checkCollision(this.getXpos(event),
            this.getYpos(event))) {
            this.adult.highlight = true;
            update = true;
        } else {
            this.adult.highlight = false;
        }
    }

    if (this.clear.rect.checkCollision(this.getXpos(event),
        this.getYpos(event))) {
        this.clear.highlight = true;
        update = true;
    } else {
        this.clear.highlight = false;
    }


    if (update) {
        this.update();
    }
};

/**
 * Event handler for when the mouse is moved
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.onMouseMove = function (event) {
    "use strict";

    if (!this.preview) {

        // are the spaces in forground
        if (this.settings.HIGHLIGHT_SPACES) {

            this.mouseMoveSpaces(event);

        } else {

            this.mouseMoveTeeth(event);

        }

        this.mouseMoveMenuItems(event);
    }

    // update mouse cooridnates
    this.followMouse(event);

};

/*'
 * Method to reset the odontograma
 * @returns {undefined}
 */
Engine.prototype.reset = function () {
    "use strict";
    // reset all teeth
    for (var i = 0; i < this.mouth.length; i++) {
        this.mouth[i].damages.length = 0;

        this.mouth[i].textBox.text = "";

        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++) {
            this.mouth[i].checkBoxes[j].state = 0;
        }
    }

    // reset all spaces
    for (var i = 0; i < this.spaces.length; i++) {
        this.spaces[i].damages.length = 0;
    }

    // repaint
    this.update();
};

/**
 * Method to get all the data from the engine.
 * Struct for a damage is the following
 * 
 * struct damage{
 *      tooth: int;
 *      damage: int;
 *      surface: String;
 *      note: String;
 * }
 * @returns {array} list of all the damages which exists in the odontograma
 */
Engine.prototype.getData = function () {
    "use strict";
    var list = Array();


    // First: get data for adult odontograp

    // Get data for all the spaces in the odontograma
    for (var i = 0; i < this.odontSpacesAdult.length; i++) {

        var t1 = this.odontSpacesAdult[i];

        for (var j = 0; j < t1.damages.length; j++) {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = t1.damages[j].id;
            d.diagnostic = "";
            d.surface = "0";
            d.note = "";

            list.push(d);
        }

    }

    // get all data from the teeth in the odontograma
    for (var i = 0; i < this.odontAdult.length; i++) {

        var t1 = this.odontAdult[i];

        // get the notes from the text boxes
        if (t1.textBox.text !== "") {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = "";
            d.diagnostic = "";
            d.surface = "0";
            d.note = t1.textBox.text;

            list.push(d);

        }

        // get the damages registered for the tooth
        for (var j = 0; j < t1.damages.length; j++) {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = "" + t1.damages[j].id;
            d.diagnostic = "";
            d.surface = "0";
            d.note = "";

            list.push(d);
        }

        // get data for the checkboxes (surfaces) for current tooth
        for (var j = 0; j < t1.checkBoxes.length; j++) {

            if (t1.checkBoxes[j].state !== 0) {
                var d = new Object();


                d.tooth = t1.id;
                d.damage = t1.checkBoxes[j].state;
                d.diagnostic = "";
                d.surface = t1.checkBoxes[j].id;
                d.note = t1.textBox.text;

                list.push(d);
            }
        }
    }

    // Second: get data for child odontograp

    // Get data for all the spaces in the odontograma
    for (var i = 0; i < this.odontSpacesChild.length; i++) {

        var t1 = this.odontSpacesChild[i];

        for (var j = 0; j < t1.damages.length; j++) {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = t1.damages[j].id;
            d.diagnostic = "";
            d.surface = "0";
            d.note = "";

            list.push(d);
        }

    }

    // get all data from the teeth in the odontograma
    for (var i = 0; i < this.odontChild.length; i++) {

        var t1 = this.odontChild[i];

        // get the notes from the text boxes
        if (t1.textBox.text !== "") {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = "";
            d.diagnostic = "";
            d.surface = "0";
            d.note = t1.textBox.text;

            list.push(d);

        }

        // get the damages registered for the tooth
        for (var j = 0; j < t1.damages.length; j++) {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = "" + t1.damages[j].id;
            d.diagnostic = "";
            d.surface = "0";
            d.note = "";

            list.push(d);
        }

        // get data for the checkboxes (surfaces) for current tooth
        for (var j = 0; j < t1.checkBoxes.length; j++) {

            if (t1.checkBoxes[j].state !== 0) {
                var d = new Object();


                d.tooth = t1.id;
                d.damage = t1.checkBoxes[j].state;
                d.diagnostic = "";
                d.surface = t1.checkBoxes[j].id;
                d.note = t1.textBox.text;

                list.push(d);
            }
        }
    }

    return list;
};

/**
 * Method to save the odontograma as an image file
 * @returns {void}
 */
Engine.prototype.save = function () {
    "use strict";

    // save image as png
    var link = document.createElement('a');

    // create a unique name
    var name = Date.now() + ".png";

    link.download = name;

    // Create an image stream of the canvas
    link.href = this.canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");


    // download the image
    link.click();

};

/*
 * Helper function to map keyboard keys into usable values Just for debugging
 * @param {type} event keyDown event
 * @returns {Number} 
 */
Engine.prototype.keyMapper = function (event) {
    "use strict";
    var value = 0;

    if (event.key === "q") {
        value = 10;
    } else if (event.key === "w") {
        value = 11;
    } else if (event.key === "e") {
        value = 12;
    } else if (event.key === "r") {
        value = 13;
    } else if (event.key === "t") {
        value = 14;
    } else if (event.key === "y") {
        value = 15;
    } else if (event.key === "u") {
        value = 16;
    } else if (event.key === "i") {
        value = 17;
    } else if (event.key === "o") {
        value = 18;
    } else if (event.key === "p") {
        value = 19;
    } else if (event.key === "a") {
        value = 20;
    } else if (event.key === "s") {
        value = 21;
    } else if (event.key === "d") {
        value = 22;
    } else if (event.key === "f") {
        value = 23;
    } else if (event.key === "g") {
        value = 24;
    } else if (event.key === "h") {
        value = 25;
    } else if (event.key === "j") {
        value = 27;
    } else if (event.key === "k") {
        value = 28;
    } else if (event.key === "l") {
        value = 29;
    } else if (event.key === "x") {
        value = 30;
    } else if (event.key === "c") {
        value = 31;
    } else if (event.key === "b") {
        value = 32;
    } else if (event.key === "n") {
        value = 34;
    } else if (event.key === "m") {
        value = "DG990";
    }

    return value;
};

/**
 * Event handler for when a keyboard button is clicked.
 * @param {type} event button event
 * @returns {void}
 */
Engine.prototype.onButtonClick = function (event) {
    "use strict";
    console.log("key " + event.key);

    if (event.key === "p") {
        this.print();
    }


    if (event.key === "v") {

        var data = this.getData();

        console.log("Data length: " + data.length);

        for (var i = 0; i < data.length; i++) {

            console.log("Data[" + i + "]: " + data[i].tooth + ", "
                + data[i].damage + ", " + data[i].surface + ", "
                + data[i].note);

        }

    } else if (event.key === "-") {

        this.togglePrintPreview();

    } else {

        if (event.key === ".") {

            this.currentType = 1;

            this.selectedDamage = "kb90";

        } else {

            this.currentType = 0;

            var damage;

            let key = Number(event.key);

            if (isNaN(key)) {
                damage = this.keyMapper(event);
            } else {
                damage = key;
            }

            this.setDamage(damage);

            if (event.key === "z") {
                this.selectedDamage = 0;
                this.reset();
            }

            // key combination Ctrl + Q to activate debug mode
            if ((event.which === 81 || event.keyCode === 81) && event.ctrlKey) {
                this.settings.DEBUG = !this.settings.DEBUG;

                this.update();
            }

            // key combination Ctrl + W to save the canvas as an image file
            if ((event.which === 81 || event.keyCode === 81) && event.shiftKey) {
                this.settings.DEBUG = !this.settings.DEBUG;

                this.save();
            }            if (event.key === "ArrowLeft" && this.settings.ADULT_ENABLED) {
                this.adultShowing = true;
                if (this.adult) {
                    this.adult.active = true;
                }
                if (this.child) {
                    this.child.active = false;
                }
                console.log(this.i18n.t('console.setting_adult'));
                this.mouth = this.odontAdult;
                this.spaces = this.odontSpacesAdult;
                this.update();
            }

            if (event.key === "ArrowRight" && this.settings.CHILD_ENABLED) {
                this.adultShowing = false;
                if (this.adult) {
                    this.adult.active = false;
                }
                if (this.child) {
                    this.child.active = true;
                }
                console.log(this.i18n.t('console.setting_child'));
                this.mouth = this.odontChild;
                this.spaces = this.odontSpacesChild;
                this.update();
            }
        }
    }
};

/**
 * Method to set the damage which the engine should toggle on or off
 * @param {type} damage id of the damge
 * @returns {void}
 */
Engine.prototype.setDamage = function (damage) {
    "use strict";
    this.multiSelect = false;
    this.multiSelection.length = 0;

    console.log(this.i18n.t('console.setting_damage', {damage: damage}));

    this.selectedDamage = parseInt(damage, 10) || 0;    if (this.selectedDamage === this.constants.TRANSPOSITION_LEFT) {
        this.multiSelect = true;
        this.multiSelection.length = 0;

    }

    if (this.selectedDamage === this.constants.FIXED_ORTHODONTIC_END) {
        this.multiSelect = true;
        this.multiSelection.length = 0;
    }

    if (this.selectedDamage === this.constants.FIXED_PROSTHESIS_LEFT) {
        this.multiSelect = true;
        this.multiSelection.length = 0;
    }

    if (this.selectedDamage === this.constants.SUPERNUMERARY) {

        this.settings.HIGHLIGHT_SPACES = true;
        this.update();
    }

    if (this.selectedDamage === this.constants.DIASTEMA) {

        this.settings.HIGHLIGHT_SPACES = true;
        this.update();
    }

    if (this.selectedDamage !== this.constants.DIASTEMA &&
        this.selectedDamage !== this.constants.SUPERNUMERARY) {

        this.settings.HIGHLIGHT_SPACES = false;
        this.update();
    }

    this.selectedDamage = damage;
};

/**
 * Method to change odontograma view
 * @param {type} which type of odontograma "0" = adult
 * @returns {void}
 */
Engine.prototype.changeView = function (which) {
    "use strict";
    if (which === "1") {

        this.adultShowing = false;
        this.mouth = this.odontChild;
        this.spaces = this.odontSpacesChild;
        this.update();


    } else {

        this.adultShowing = true;
        this.mouth = this.odontAdult;
        this.spaces = this.odontSpacesAdult;
        this.update();

    }

};

/**
 * Method to start the engine. Methods gets called
 * when all assets have been loaded.
 * @returns {void}
 */
Engine.prototype.start = function () {
    "use strict";
    var self = this;

    // show splash screen for 3 seconds 
    // then continue
    setTimeout(function () {
        self.update();
    }, 1500);

};

/**
 * Method to get a tooth by its id
 * @param {type} id of the tooth
 * @returns {Tooth} tooth with the specified id. Undefined if the tooth does
 * not exist
 */
Engine.prototype.getToothById = function (id) {
    "use strict";
    var tooth;

    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].id === id) {

            tooth = this.mouth[i];
            break;

        }
    }

    return tooth;

};

/**
 * Method to get a space, between 2 teeths, by id
 * @param {type} id of the space
 * @returns {Tooth} the space for the id
 */
Engine.prototype.getSpaceById = function (id) {
    "use strict";
    var space;

    for (var i = 0; i < this.spaces.length; i++) {

        if (this.spaces[i].id === id) {

            space = this.spaces[i];
            break;

        }
    }

    return space;

};

/**
 * Method to load damages to odontograma from external source
 * @param {type} tooth id of the tooth which has the damage
 * @param {type} damage id of the damage to add
 * @param {type} surface id of the surface to add damage, empty if no surface
 * @param {type} note text to add to textbox for tooth, empty if no note
 * @returns {undefined}
 */
Engine.prototype.load = function (tooth, damage, surface, note) {
    "use strict";
    // check if we should add damage to a tooth
    if (surface === "0") {

        // if id is less than 1000 then we have to find a tooth
        if (tooth < 1000) {

            var t = this.getToothById(tooth);

            this.collisionHandler.handleCollision(t, damage);

            this.setTextToTextBox(t.textBox, note);

        } else {

            // if the id is greater than 1000
            // then we have to find a space
            this.collisionHandler.handleCollision(this.getSpaceById(tooth), damage);
        }


    } else {

        // the damage should be added to a surface of a tooth
        var surfaceId = tooth + "_" + surface;

        var t = this.getToothById(tooth);
        var surface = t.getSurfaceById(surfaceId);

        this.collisionHandler.handleCollisionCheckBox(surface, damage);

        this.setTextToTextBox(t.textBox, note);

    }

};

/**
 * Method to pass a comma seperated string for loading data
 * fomat of string: toothId,damageId,surface,note,...toothId,damageId,surface,note
 * @param {type} dataArray commea seperated string
 * @returns {void}
 */
Engine.prototype.setDataSource = function (dataArray) {
    "use strict";
    var res = dataArray.split(",");

    var i = 0;
    while (i < res.length) {

        // loop through all and add damage
        this.load(Number(res[i]), Number(res[i + 1]), res[i + 2], res[i + 3]);

        i = i + 4;
    }

};

Engine.prototype.createDiagnostico = function (diagnostico) {

    console.log(this.i18n.t('console.diagnostic', {data: JSON.stringify(diagnostico)}));
};

/**
 * Method to toggle print preview on / off
 * @returns {undefined}
 */
Engine.prototype.togglePrintPreview = function () {

    this.preview = !this.preview;

    if (!this.preview) {
        this.hidePrintPreview();
    } else {
        this.showPrintPreview();
    }

};

/**
 * Method to to display a print preview of the odontogram
 * @returns {void}
 */
Engine.prototype.showPrintPreview = function () {

    // reset the size of the canvas
    this.renderer.setCanvasSize(this.renderer.width, 1420);

    console.log("Print preview");

    // reset positions

    for (var i = 0; i < this.odontAdult.length; i++) {

        if (this.odontAdult[i].type === 1) {
            this.odontAdult[i].moveUpDown(this.printPreviewPositionChange * 2 + 120);
            this.odontAdult[i].textBox.rect.y += 20;

        } else {
            this.odontAdult[i].moveUpDown(120);
            this.odontAdult[i].textBox.rect.y -= 20;
        }

    }

    for (var i = 0; i < this.odontSpacesAdult.length; i++) {

        if (this.odontSpacesAdult[i].type === 1) {
            this.odontSpacesAdult[i].moveUpDown(this.printPreviewPositionChange * 2 + 120);
        } else {
            this.odontSpacesAdult[i].moveUpDown(120);
        }

    }

    for (var i = 0; i < this.odontChild.length; i++) {

        this.odontChild[i].moveUpDown(this.printPreviewPositionChange + 120);

        if (this.odontChild[i].type === 0) {
            this.odontChild[i].textBox.rect.y -= this.printPreviewPositionChange;
        } else {
            this.odontChild[i].textBox.rect.y += this.printPreviewPositionChange;
        }

    }

    for (var i = 0; i < this.odontSpacesChild.length; i++) {

        this.odontSpacesChild[i].moveUpDown(this.printPreviewPositionChange + 120);

    }

    // realligne all teeth and damages
    for (var i = 0; i < this.odontAdult.length; i++) {
        this.odontAdult[i].refresh(this.constants);
    }

    for (var i = 0; i < this.odontChild.length; i++) {
        this.odontChild[i].refresh(this.constants);
    }


    this.update();

};

/**
 * Method to hide print preview
 * @returns {void}
 */
Engine.prototype.hidePrintPreview = function () {

    // update size of the canvas
    this.renderer.setCanvasSize(this.renderer.width, this.renderer.height);

    console.log("Print preview");

    // update the positions of all the data in the odontoram

    for (var i = 0; i < this.odontAdult.length; i++) {

        if (this.odontAdult[i].type === 1) {
            this.odontAdult[i].moveUpDown(-this.printPreviewPositionChange * 2 - 120);
            this.odontAdult[i].textBox.rect.y -= 20;
        } else {
            this.odontAdult[i].moveUpDown(-120);
            this.odontAdult[i].textBox.rect.y += 20;
        }

    }

    for (var i = 0; i < this.odontSpacesAdult.length; i++) {

        if (this.odontSpacesAdult[i].type === 1) {
            this.odontSpacesAdult[i].moveUpDown(-this.printPreviewPositionChange * 2 - 120);
        } else {
            this.odontSpacesAdult[i].moveUpDown(-120);
        }
    }

    for (var i = 0; i < this.odontChild.length; i++) {

        this.odontChild[i].moveUpDown(-this.printPreviewPositionChange - 120);

        if (this.odontChild[i].type === 0) {
            this.odontChild[i].textBox.rect.y += this.printPreviewPositionChange;
        } else {
            this.odontChild[i].textBox.rect.y -= this.printPreviewPositionChange;
        }
    }

    for (var i = 0; i < this.odontSpacesChild.length; i++) {

        this.odontSpacesChild[i].moveUpDown(-this.printPreviewPositionChange - 120);

    }

    for (var i = 0; i < this.odontAdult.length; i++) {
        this.odontAdult[i].refresh();
    }

    for (var i = 0; i < this.odontChild.length; i++) {
        this.odontChild[i].refresh();
    }

    this.update();

};


Engine.prototype.loadPatientData = function (office, patient, number,
    treatmentNumber, treatmentDate,
    dentist, observations, specs) {

    this.treatmentData.office = office;
    this.treatmentData.patient = patient;
    this.treatmentData.number = number;
    this.treatmentData.treatmentNumber = treatmentNumber;
    this.treatmentData.treatmentDate = treatmentDate;
    this.treatmentData.dentist = dentist;
    this.treatmentData.observations = observations;
    this.treatmentData.specs = specs;
    
    // Update form fields if they exist
    var patientNameField = document.getElementById('patientName');
    var patientDateField = document.getElementById('patientDate');
    var patientObservationsField = document.getElementById('patientObservations');
    var patientSpecificationsField = document.getElementById('patientSpecifications');
    
    if (patientNameField) patientNameField.value = patient || '';
    if (patientDateField) patientDateField.value = treatmentDate || '';
    if (patientObservationsField) patientObservationsField.value = observations || '';
    if (patientSpecificationsField) patientSpecificationsField.value = specs || '';

};

Engine.prototype.createHeader = function () {

    var seperation = 18;

    this.renderer.renderTextCenter16("Odontogram",
        this.renderer.width / 2,
        seperation,
        "#000000");

    seperation = 20;


    this.renderer.renderText14("Office",
        4,
        seperation * 2,
        "#000000");

    this.renderer.renderText14(": " + this.treatmentData.office,
        100,
        seperation * 2,
        "#000000");
    this.renderer.renderText14(this.i18n.t('print.patient'),
        4,
        seperation * 3,
        "#000000");

    this.renderer.renderText14(": " + this.treatmentData.patient,
        100,
        seperation * 3,
        "#000000");


    this.renderer.renderText14(this.i18n.t('print.appointment'),
        4,
        seperation * 4,
        "#000000");

    this.renderer.renderText14(": " + this.treatmentData.treatmentNumber,
        100,
        seperation * 4,
        "#000000");

    this.renderer.renderText14(this.i18n.t('print.date'),
        this.renderer.width / 2,
        seperation * 4,
        "#000000");

    this.renderer.renderText14(": " + this.treatmentData.treatmentDate,
        this.renderer.width / 2 + 120,
        seperation * 4,
        "#000000");

    this.renderer.renderText14(this.i18n.t('print.dentist'),
        4,
        seperation * 5,
        "#000000");

    this.renderer.renderText14(": " + this.treatmentData.dentist,
        100,
        seperation * 5,
        "#000000");

};

/**
 * Method to draw a print preview image of the odontogram.
 * This method draws all the teeth in the odotogram.
 * @returns {void}
 */
Engine.prototype.printPreview = function () {

    this.renderer.clear(this.settings);

    this.createHeader();

    this.renderer.render(this.odontAdult, this.settings, this.constants);
    this.renderer.render(this.odontSpacesAdult, this.settings, this.constants);
    this.renderer.render(this.odontChild, this.settings, this.constants);
    this.renderer.render(this.odontSpacesChild, this.settings, this.constants);    if (this.settings.DEBUG) {

        this.renderer.renderText(this.i18n.t('debug.mode'), 2, 15, "#000000");

        this.renderer.renderText(this.i18n.t('debug.coordinates', {x: this.cursorX, y: this.cursorY}),
            128, 15, "#000000");
    }

    this.renderer.renderText(this.i18n.t('print.specifications') + ": ", 4, 1200, "#000000");

    this.renderer.wrapText(this.treatmentData.specs, 8, 1222, this.renderer.width - 8, 14, 5);

    this.renderer.renderText(this.i18n.t('print.observations') + ": ", 4, 1300, "#000000");

    this.renderer.wrapText(this.treatmentData.observations, 8, 1322, this.renderer.width - 8, 14, 5);
};

Engine.prototype.print = function () {

    var dataUrl = document.getElementById('canvas').toDataURL();

    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html lang="en">';
    windowContent += '<head>';
    windowContent += '<meta charset="utf-8"/>';
    windowContent += '<title>OIM Odontograma</title>';
    windowContent += '</head>';
    windowContent += '<body >';
    windowContent += '<p style="text-align: center;"><img src="' + dataUrl + '"></p>';
    windowContent += '</body>';
    windowContent += '</html>';

    var printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
    printWin.document.open();
    printWin.document.write(windowContent);

    printWin.document.addEventListener('load', function () {
        printWin.focus();
        printWin.print();
        printWin.document.close();
        printWin.close();
    }, true);

    this.preview = false;
    this.hidePrintPreview();
};


Engine.prototype.createMenu = function () {

    let buttonWidth = 100;
    let buttonHeight = 20;
    let startX = (this.canvas.width / 2) - ((buttonWidth * 6) / 2);

    let posY = 10;
    let ySeparator = 0;

    let posX = startX;
    let xSeparator = buttonWidth;    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.caries'), 1);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.crown'), 2);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.crown_tmp'), 3);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.missing'), 4);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.fracture'), 5);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.diastema'), 8);

    posY = posY + buttonHeight + ySeparator;
    posX = startX;

    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.filling'), 11);
    posX = posX + xSeparator;    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.rem_prost'), 12);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.drifting'), 13);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.rotation'), 14);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.fusion'), 15);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.root_remnant'), 16);

    posY = posY + buttonHeight + ySeparator;
    posX = startX;

    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.eruption'), 24);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.transposition'), 25);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.supernumerary'), 27);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.pulp'), 28);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.prosthesis'), 29);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.bolt'), 30);

    posY = posY + buttonHeight + ySeparator;
    posX = startX;

    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.fixed_ortho'), 32);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.fixed_prosth'), 34);
    posX = posX + xSeparator;    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.implant'), 6);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.macrodontia'), 17);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.microdontia'), 18);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.dyschromic'), 22);

    posY = posY + buttonHeight + ySeparator;
    posX = startX;

    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.worn'), 37);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.impacted_semi'), 38);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.intrusion'), 20);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.edentulism'), 31);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.ectopic'), 21);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.impacted'), 19);

    posY = posY + buttonHeight + ySeparator;
    posX = startX;

    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.rem_orthodo'), 23);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.extrusion'), 9);
    posX = posX + xSeparator;
    this.createMenuButton(posX, posY, buttonWidth, buttonHeight, this.i18n.t('menu.post'), 10);

}



Engine.prototype.createMenuButton = function (x, y, width, height, text, id) {
    var menuitem = new MenuItem();
    menuitem.setUp(x, y, width, height);
    menuitem.textBox.text = text
    menuitem.id = id;
    this.menuItems.push(menuitem);

}

/**
 * Set the language for the application
 * @param {string} language - Language code ('en' or 'pt')
 */
Engine.prototype.setLanguage = function(language) {    this.i18n.setLanguage(language);
    this.updateButtonTexts(); // Update button texts with new language
    this.createMenu(); // Recreate menu with new language
    this.update();
    
    // Update help modal texts if function exists
    if (typeof updateHelpModalTexts === 'function') {
        updateHelpModalTexts();
    }
};

/**
 * Update button texts based on current language
 */
Engine.prototype.updateButtonTexts = function() {
    if (this.adult) {
        this.adult.textBox.text = this.i18n.t('button.adult');
    }
    if (this.child) {
        this.child.textBox.text = this.i18n.t('button.child');
    }
    if (this.clear) {
        this.clear.textBox.text = this.i18n.t('button.reset');
    }
};

/**
 * Get the current language
 * @returns {string} Current language code
 */
Engine.prototype.getLanguage = function() {
    return this.i18n.getLanguage();
};

/**
 * Get all available languages
 * @returns {array} Array of language codes
 */
Engine.prototype.getAvailableLanguages = function() {
    return this.i18n.getAvailableLanguages();
};

/**
 * Get current patient data
 * @returns {object} Patient data object
 */
Engine.prototype.getPatientData = function() {
    // Read from form fields if available, otherwise from treatmentData
    var patientNameField = document.getElementById('patientName');
    var patientDateField = document.getElementById('patientDate');
    var patientObservationsField = document.getElementById('patientObservations');
    var patientSpecificationsField = document.getElementById('patientSpecifications');
    
    return {
        patientName: (patientNameField ? patientNameField.value : '') || this.treatmentData.patient || "",
        patientId: this.treatmentData.number || "",
        location: this.treatmentData.office || "",
        appointmentNumber: this.treatmentData.treatmentNumber || "",
        date: (patientDateField ? patientDateField.value : '') || this.treatmentData.treatmentDate || "",
        dentist: this.treatmentData.dentist || "",
        observations: (patientObservationsField ? patientObservationsField.value : '') || this.treatmentData.observations || "",
        specifications: (patientSpecificationsField ? patientSpecificationsField.value : '') || this.treatmentData.specs || ""
    };
};

/**
 * Get current teeth data
 * @returns {array} Array of teeth data
 */
Engine.prototype.getTeethData = function() {
    var teethData = [];
    
    // Function to extract teeth data from a mouth array
    var extractTeethData = function(mouthArray, isChild) {
        if (!mouthArray || !Array.isArray(mouthArray)) {
            return [];
        }
        
        var data = [];
        for (var i = 0; i < mouthArray.length; i++) {
            var tooth = mouthArray[i];
            if (tooth) {
                // Extract only damage IDs from damage objects
                var damageIds = [];
                if (tooth.damages && Array.isArray(tooth.damages)) {
                    for (var j = 0; j < tooth.damages.length; j++) {
                        var damage = tooth.damages[j];
                        if (typeof damage === 'object' && damage.id !== undefined) {
                            damageIds.push(damage.id);
                        } else if (typeof damage === 'number') {
                            damageIds.push(damage);
                        }
                    }
                }
                
                // Extract custom text from textBox
                var customText = "";
                if (tooth.textBox && tooth.textBox.text) {
                    customText = tooth.textBox.text;
                }
                
                // Extract surface data from checkBoxes
                var surfaces = {};
                if (tooth.checkBoxes && Array.isArray(tooth.checkBoxes)) {
                    for (var k = 0; k < tooth.checkBoxes.length; k++) {
                        var checkBox = tooth.checkBoxes[k];
                        if (checkBox && checkBox.state !== 0) {
                            surfaces[checkBox.id] = checkBox.state;
                        }
                    }
                }
                
                // Only add tooth if it has any data
                if (damageIds.length > 0 || customText || Object.keys(surfaces).length > 0) {
                    var toothData = {
                        id: tooth.id,
                        damages: damageIds,
                        customText: customText,
                        surfaces: surfaces,
                        isChild: isChild || false
                    };
                    data.push(toothData);
                }
            }
        }
        return data;
    };
    
    // Extract data from adult teeth
    if (this.odontAdult) {
        var adultData = extractTeethData(this.odontAdult, false);
        teethData = teethData.concat(adultData);
    }
    
    // Extract data from child teeth
    if (this.odontChild) {
        var childData = extractTeethData(this.odontChild, true);
        teethData = teethData.concat(childData);
    }
    
    // Also extract data from spaces if they have damages
    var extractSpaceData = function(spacesArray) {
        if (!spacesArray || !Array.isArray(spacesArray)) {
            return [];
        }
        
        var data = [];
        for (var i = 0; i < spacesArray.length; i++) {
            var space = spacesArray[i];
            if (space && space.damages && Array.isArray(space.damages) && space.damages.length > 0) {
                var damageIds = [];
                for (var j = 0; j < space.damages.length; j++) {
                    var damage = space.damages[j];
                    if (typeof damage === 'object' && damage.id !== undefined) {
                        damageIds.push(damage.id);
                    } else if (typeof damage === 'number') {
                        damageIds.push(damage);
                    }
                }
                
                if (damageIds.length > 0) {
                    data.push({
                        id: space.id,
                        damages: damageIds,
                        customText: "",
                        surfaces: {},
                        isSpace: true
                    });
                }
            }
        }
        return data;
    };
    
    // Extract data from adult spaces
    if (this.odontSpacesAdult) {
        var adultSpaceData = extractSpaceData(this.odontSpacesAdult);
        teethData = teethData.concat(adultSpaceData);
    }
    
    // Extract data from child spaces
    if (this.odontSpacesChild) {
        var childSpaceData = extractSpaceData(this.odontSpacesChild);
        teethData = teethData.concat(childSpaceData);
    }
    
    console.log("Extracted teeth data for export:", teethData);
    return teethData;
};

/**
 * Load teeth data from export
 * @param {array} teethData Array of teeth data
 */
Engine.prototype.loadTeethData = function(teethData) {
    if (!teethData || !Array.isArray(teethData)) {
        return;
    }
    
    console.log("Loading teeth data:", teethData);
    
    // Clear existing teeth data from both adult and child mouths
    this.resetAllTeethData();
    
    // Load teeth data
    for (var i = 0; i < teethData.length; i++) {
        var toothData = teethData[i];
        
        if (!toothData || !toothData.id) {
            continue;
        }
        
        // Find tooth in appropriate mouth (adult or child)
        var tooth = null;
        var space = null;
        
        if (toothData.isSpace) {
            // Handle spaces
            space = this.getSpaceById(toothData.id);
        } else {
            // Handle teeth - look in both adult and child mouths
            tooth = this.findToothInBothMouths(toothData.id);
        }
        
        if (tooth) {
            // Load damages
            if (toothData.damages && Array.isArray(toothData.damages)) {
                for (var j = 0; j < toothData.damages.length; j++) {
                    var damageId = toothData.damages[j];
                    if (typeof damageId === 'number') {
                        this.collisionHandler.handleCollision(tooth, damageId);
                    }
                }
            }
            
            // Load custom text
            if (toothData.customText && tooth.textBox) {
                tooth.textBox.text = toothData.customText;
            }
              // Load surface data
            if (toothData.surfaces && typeof toothData.surfaces === 'object') {
                for (var surfaceId in toothData.surfaces) {
                    // surfaceId already contains the full ID (e.g., "16_D")
                    var surface = tooth.getSurfaceById(surfaceId);
                    if (surface) {
                        surface.state = toothData.surfaces[surfaceId];
                        console.log("Loaded surface:", surfaceId, "with state:", toothData.surfaces[surfaceId]);
                    } else {
                        console.warn("Surface not found:", surfaceId, "for tooth:", tooth.id);
                    }
                }
            }
        } else if (space) {
            // Load damages for spaces
            if (toothData.damages && Array.isArray(toothData.damages)) {
                for (var k = 0; k < toothData.damages.length; k++) {
                    var damageId = toothData.damages[k];
                    if (typeof damageId === 'number') {
                        this.collisionHandler.handleCollision(space, damageId);
                    }
                }
            }
        }
    }
    
    console.log("Teeth data loaded successfully");
};

/**
 * Find tooth in both adult and child mouths
 * @param {number} toothId Tooth ID
 * @returns {object} Tooth object or null
 */
Engine.prototype.findToothInBothMouths = function(toothId) {
    // Check adult mouth
    if (this.odontAdult && Array.isArray(this.odontAdult)) {
        for (var i = 0; i < this.odontAdult.length; i++) {
            if (this.odontAdult[i].id === toothId) {
                return this.odontAdult[i];
            }
        }
    }
    
    // Check child mouth
    if (this.odontChild && Array.isArray(this.odontChild)) {
        for (var i = 0; i < this.odontChild.length; i++) {
            if (this.odontChild[i].id === toothId) {
                return this.odontChild[i];
            }
        }
    }
    
    return null;
};

/**
 * Reset all teeth data in both adult and child mouths
 */
Engine.prototype.resetAllTeethData = function() {
    // Reset adult teeth
    if (this.odontAdult && Array.isArray(this.odontAdult)) {
        for (var i = 0; i < this.odontAdult.length; i++) {
            this.odontAdult[i].damages = [];
            if (this.odontAdult[i].textBox) {
                this.odontAdult[i].textBox.text = "";
            }
            // Reset surfaces
            if (this.odontAdult[i].checkBoxes && Array.isArray(this.odontAdult[i].checkBoxes)) {
                for (var j = 0; j < this.odontAdult[i].checkBoxes.length; j++) {
                    this.odontAdult[i].checkBoxes[j].state = 0;
                }
            }
        }
    }
    
    // Reset child teeth
    if (this.odontChild && Array.isArray(this.odontChild)) {
        for (var i = 0; i < this.odontChild.length; i++) {
            this.odontChild[i].damages = [];
            if (this.odontChild[i].textBox) {
                this.odontChild[i].textBox.text = "";
            }
            // Reset surfaces
            if (this.odontChild[i].checkBoxes && Array.isArray(this.odontChild[i].checkBoxes)) {
                for (var j = 0; j < this.odontChild[i].checkBoxes.length; j++) {
                    this.odontChild[i].checkBoxes[j].state = 0;
                }
            }
        }
    }
    
    // Reset adult spaces
    if (this.odontSpacesAdult && Array.isArray(this.odontSpacesAdult)) {
        for (var i = 0; i < this.odontSpacesAdult.length; i++) {
            this.odontSpacesAdult[i].damages = [];
        }
    }
    
    // Reset child spaces
    if (this.odontSpacesChild && Array.isArray(this.odontSpacesChild)) {
        for (var i = 0; i < this.odontSpacesChild.length; i++) {
            this.odontSpacesChild[i].damages = [];
        }
    }
};