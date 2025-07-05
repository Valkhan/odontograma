![GitHub Created At](https://img.shields.io/github/created-at/bardurt/odontograma?style=plastic)
![GitHub Stars](https://img.shields.io/github/stars/bardurt/odontograma?style=plastic)
![GitHub Forks](https://img.shields.io/github/forks/bardurt/odontograma?style=plastic)
![GitHub License](https://img.shields.io/github/license/bardurt/odontograma?style=plastic)

# Odontograph - Digital Odontogram System
A virtual Odontogram in JavaScript with multilingual support.

![demo](docs/demo.gif)

## Description

A virtual Odontogram system developed in JavaScript that allows the creation and editing of odontograms for dentists and dental professionals.

## Features

- Intuitive interface for marking dental damages and treatments
- Support for adult odontogram (32 teeth) and children (20 teeth)
- **Multilingual support (English and Portuguese)**
- Integrated printing system
- Keyboard navigation
- Debug mode for development

## New Features (v2.0)

### Internationalization (i18n)

- **Code completely translated to English**: All constants and variables now use English nomenclature
- **Multilingual interface**: Support for English (default) and Portuguese
- **Language selector**: Interface to switch between languages in real-time
- **Contextual translations**: Interface texts, menus, messages and labels translated

### Technical Improvements

- Clean code architecture with English names
- Modular internationalization system
- Better organization of constants
- Maintained compatibility with previous versions

## How to Use

### Help Modal

- **Help Button**: Click the "Help (H)" button in the top right corner
- **Keyboard Shortcut**: Press **H** to open/close the help modal
- **Multilingual Content**: The modal automatically adapts its content to the selected language

The help modal includes:

- **Navigation**: Instructions on keyboard shortcuts and controls
- **Available Treatments**: Complete list of diagnostics and their keys
- **Tooth Surfaces**: Explanation of clickable areas on teeth
- **Language Switching**: How to use the language selector
- **Adding Notes**: How to insert custom dental codes
- **Printing**: How to print the odontogram

### Basic Navigation

- **Arrow keys ←/→**: Switch between adult and child view
- **Number keys**: Select different types of damages/treatments
- **Click**: Apply treatment to teeth
- **Ctrl+Q**: Enable/disable debug mode
- **Z**: Reset odontogram

### Language Switching

Use the language selector in the top right corner of the interface to switch between English and Portuguese.

### Available Diagnosis Types

| Key | Diagnosis (EN) | Diagnosis (PT) |
|-----|----------------|----------------|
| 1 | Caries | Cáries |
| 2 | Crown | Coroa |
| 3 | Crown (Tmp) | Coroa (Tmp) |
| 4 | Missing | Ausente |
| 5 | Fracture | Fratura |
| 8 | Diastema | Diastema |
| 11 | Filling | Restauração |
| 12 | Rem Prost | Prótese Rem |
| 13 | Drifting | Migração |
| 14 | Rotation | Giroversão |
| 15 | Fusion | Fusão |
| 16 | Root Remnant | Remanescente |

## Installation

1. Clone the repository:

```bash
git clone https://github.com/bardurt/odontograma.git
```

2. Open the `index.html` file in a modern web browser

## Project Structure

```
odontograma/
├── js/
│   ├── constants.js      # System constants (English)
│   ├── i18n.js          # Internationalization system
│   ├── engine.js        # Main application engine
│   ├── damage.js        # Damage/treatment management
│   ├── tooth.js         # Class to represent teeth
│   ├── renderer.js      # Rendering system
│   └── ...
├── images/              # Tooth images
├── docs/               # Documentation and images
└── index.html          # Main page
```

## Internationalization API

### Basic Usage

```javascript
// Set language
engine.setLanguage('pt'); // or 'en'

// Get current language
var currentLang = engine.getLanguage();

// Get available languages
var languages = engine.getAvailableLanguages();
```

### Translate Texts

```javascript
// In i18n system
var text = engine.i18n.t('menu.caries'); // Returns "Caries" or "Cáries"
var textWithParams = engine.i18n.t('debug.coordinates', {x: 100, y: 200});
```

## Development

### Adding New Translations

1. Edit the `js/i18n.js` file
2. Add keys to the `en` and `pt` objects
3. Use `engine.i18n.t('your.key')` to access translations

### Adding New Diagnoses

1. Add the constant in `js/constants.js`
2. Implement the drawing method in `js/damage.js`
3. Add translations in `js/i18n.js`
4. Update the menu in `js/engine.js`

## Compatibility

- Modern browsers with HTML5 Canvas support
- JavaScript ES5+
- Tested on Chrome, Firefox, Safari and Edge

## Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Bardur Thomsen** - *Initial development* - [bardurt](https://github.com/bardurt)

## Acknowledgments

- Dental community for use case validation
- Contributors who helped with translations and improvements

---

**[Leia em Português](README_PT.md)** | **[Read in English](README.md)**
