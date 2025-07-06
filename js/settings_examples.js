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
    
    // view settings - TESTE DIFERENTES CONFIGURAÇÕES AQUI
    // =================================================================
    
    // CONFIGURAÇÃO PADRÃO (RECOMENDADA)
    this.ADULT_ENABLED = true;      // Enable adult view
    this.CHILD_ENABLED = true;      // Enable child view
    this.DEFAULT_VIEW = "adult";    // Default view: "adult" or "child"
    
    // DESCOMENTE UMA DAS CONFIGURAÇÕES ABAIXO PARA TESTAR:
    
    // APENAS VISÃO ADULTA
    // this.ADULT_ENABLED = true;
    // this.CHILD_ENABLED = false;
    // this.DEFAULT_VIEW = "adult";
    
    // APENAS VISÃO CRIANÇA
    // this.ADULT_ENABLED = false;
    // this.CHILD_ENABLED = true;
    // this.DEFAULT_VIEW = "child";
    
    // SEM BOTÕES DE VISÃO (FIXA EM ADULTO)
    // this.ADULT_ENABLED = false;
    // this.CHILD_ENABLED = false;
    // this.DEFAULT_VIEW = "adult";
    
    // SEM BOTÕES DE VISÃO (FIXA EM CRIANÇA)
    // this.ADULT_ENABLED = false;
    // this.CHILD_ENABLED = false;
    // this.DEFAULT_VIEW = "child";
    
    // CRIANÇA COMO PADRÃO
    // this.ADULT_ENABLED = true;
    // this.CHILD_ENABLED = true;
    // this.DEFAULT_VIEW = "child";
    
    // =================================================================
    
    // colors
    this.COLOR_ON_TOUCH = "#FF8B00";
    this.COLOR_HIGHLIGHT = "#1CDE02";
    this.COLOR_RED = "#ff0000";
    this.COLOR_BLUE = "#0052ff";
    this.COLOR_BLACK = "#000000";
    this.COLOR_HIGHLIGHT = "#00AEFF";
    this.COLOR_HIGHLIGHT_BAD = "#FF0000";

}
