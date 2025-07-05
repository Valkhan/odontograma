# Changelog

All notable changes to the Odontogram project will be documented in this file.

## [2.0.0] - 2025-01-05

### Added
- **Internationalization (i18n) System**: Complete multilingual support with English and Portuguese
- **Language Selector**: UI component to switch between languages in real-time
- **Translation System**: Modular i18n system with string interpolation support
- **Multilingual Interface**: All UI texts, menus, messages, and labels are now translatable

### Changed
- **Code Translation**: All JavaScript constants and variables translated from Spanish/Portuguese to English
- **Constant Names**: Updated all diagnostic constants to use English nomenclature:
  - `DIENTE_AUSENTE` → `MISSING_TOOTH`
  - `CORONA_DEFINITIVA` → `DEFINITIVE_CROWN`
  - `CORONA_TEMPORAL` → `TEMPORARY_CROWN`
  - `DIENTE_EXTRUIDO` → `EXTRUDED_TOOTH`
  - `CURACION` → `FILLING`
  - `PROTESIS_REMOVIBLE` → `REMOVABLE_PROSTHESIS`
  - `MIGRACION` → `MIGRATION`
  - `GIROVERSION` → `ROTATION`
  - `REMANENTE_RADICULAR` → `ROOT_REMNANT`
  - `DIENTE_INTRUIDO` → `INTRUDED_TOOTH`
  - `ORTONDICO_REMOVIBLE` → `REMOVABLE_ORTHODONTIC`
  - `DIENTE_EN_ERUPCION` → `ERUPTING_TOOTH`
  - `TRANSPOSICION_LEFT/RIGHT` → `TRANSPOSITION_LEFT/RIGHT`
  - `SUPER_NUMERARIO` → `SUPERNUMERARY`
  - `PULPAR` → `PULP`
  - `PROTESIS_TOTAL` → `TOTAL_PROSTHESIS`
  - `PERNO_MUNON` → `POST_AND_CORE`
  - `EDENTULOA_TOTAL` → `TOTAL_EDENTULISM`
  - `ORTODONTICO_FIJO_*` → `FIXED_ORTHODONTIC_*`
  - `PROTESIS_FIJA_*` → `FIXED_PROSTHESIS_*`
  - `IMPLANTE` → `IMPLANT`
  - `MACRODONCIA` → `MACRODONTIA`
  - `MICRODONCIA` → `MICRODONTIA`
  - `IMPACTACION` → `IMPACTION`
  - `DIENTE_ECTOPICO` → `ECTOPIC_TOOTH`
  - `DIENTE_DISCR0MICO` → `DISCOLORED_TOOTH`
  - `SUPERFICIE_DESGASTADA` → `WORN_SURFACE`
  - `SEMI_IMPACTACI0N` → `SEMI_IMPACTION`

- **Method Names**: Updated method names in `damage.js` to use English:
  - `drawDienteAusente` → `drawMissingTooth`
  - `drawPulpar` → `drawPulp`
  - `drawMigracion` → `drawMigration`
  - `drawGiroversion` → `drawRotation`
  - `drawDienteExtruido` → `drawExtrudedTooth`
  - `drawDienteIntruido` → `drawIntrudedTooth`
  - `drawProtesisRemovible` → `drawRemovableProsthesis`
  - `drawRemanenteRadicular` → `drawRootRemnant`
  - `drawOrtondicoRemovible` → `drawRemovableOrthodontic`
  - And many more...

- **Menu System**: Updated menu creation to use i18n system for dynamic language switching
- **Console Messages**: All console.log messages now use translation system
- **Prompt Messages**: User prompts now support multiple languages

### Technical Improvements
- **Engine Class**: Added language management methods:
  - `setLanguage(language)`: Set the current language
  - `getLanguage()`: Get the current language
  - `getAvailableLanguages()`: Get all available languages
- **I18n Class**: New internationalization system with:
  - String interpolation support
  - Fallback to English for missing translations
  - Modular translation files
- **Code Architecture**: Improved code organization with English naming conventions
- **Backward Compatibility**: Maintained functionality while improving code structure

### Files Modified
- `js/constants.js`: Updated all constant names to English
- `js/engine.js`: Added i18n support, updated references, added language methods
- `js/damage.js`: Updated method names and constant references
- `js/tooth.js`: Updated constant references
- `js/collisionHandler.js`: Updated constant references
- `index.html`: Added language selector UI
- `README.md`: Updated with new features and usage instructions
- `README_PT.md`: Added Portuguese version of README

### Files Added
- `js/i18n.js`: New internationalization system
- `README_PT.md`: Portuguese documentation
- `CHANGELOG.md`: This changelog file

## [1.0.0] - 2018

### Initial Release
- Basic odontogram functionality
- Support for adult and child dental charts
- Interactive tooth selection and damage marking
- Print functionality
- Keyboard navigation
- Debug mode
- Spanish/Portuguese interface (mixed languages)
