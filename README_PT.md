# Odontograma - Sistema de Odontograma Digital

![GitHub Created At](https://img.shields.io/github/created-at/bardurt/odontograma?style=plastic)
![GitHub Stars](https://img.shields.io/github/stars/bardurt/odontograma?style=plastic)
![GitHub Forks](https://img.shields.io/github/forks/bardurt/odontograma?style=plastic)
![GitHub License](https://img.shields.io/github/license/bardurt/odontograma?style=plastic)

## Descrição

Um sistema de Odontograma virtual desenvolvido em JavaScript que permite a criação e edição de odontogramas para dentistas e profissionais da odontologia.

![demo](docs/demo.gif)

## Características

- Interface intuitiva para marcação de danos e tratamentos dentários
- Suporte para odontograma de adultos (32 dentes) e crianças (20 dentes)
- **Suporte multilíngue (Inglês e Português)**
- Sistema de impressão integrado
- Navegação por teclado
- Modo debug para desenvolvimento

## Novas Funcionalidades (v2.0)

### Internacionalização (i18n)
- **Código completamente traduzido para inglês**: Todas as constantes e variáveis agora usam nomenclatura em inglês
- **Interface multilíngue**: Suporte para português (padrão) e inglês
- **Seletor de idioma**: Interface para alternar entre idiomas em tempo real
- **Traduções contextuais**: Textos da interface, menus, mensagens e labels traduzidos

### Melhorias Técnicas
- Arquitetura de código limpa com nomes em inglês
- Sistema de internacionalização modular
- Melhor organização das constantes
- Compatibilidade mantida com versões anteriores

## Como Usar

### Modal de Ajuda

- **Botão Ajuda**: Clique no botão "Ajuda (H)" no canto superior direito
- **Atalho de Teclado**: Pressione **H** para abrir/fechar a modal de ajuda
- **Conteúdo Multilíngue**: A modal adapta automaticamente seu conteúdo ao idioma selecionado

A modal de ajuda inclui:

- **Navegação**: Instruções sobre atalhos de teclado e controles
- **Tratamentos Disponíveis**: Lista completa de diagnósticos e suas teclas
- **Superfícies do Dente**: Explicação sobre as áreas clicáveis dos dentes
- **Alteração de Idioma**: Como usar o seletor de idioma
- **Adição de Notas**: Como inserir códigos dentários personalizados
- **Impressão**: Como imprimir o odontograma

### Navegação Básica

- **Setas ←/→**: Alternar entre vista de adulto e criança
- **Teclas numéricas**: Selecionar diferentes tipos de danos/tratamentos
- **Click**: Aplicar tratamento nos dentes
- **Ctrl+Q**: Ativar/desativar modo debug
- **Z**: Resetar odontograma

### Alternar Idioma
Use o seletor de idioma no canto superior direito da interface para alternar entre inglês e português.

### Tipos de Diagnósticos Disponíveis

| Tecla | Diagnóstico (EN) | Diagnóstico (PT) |
|-------|------------------|------------------|
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

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/bardurt/odontograma.git
```

2. Abra o arquivo `index.html` em um navegador web moderno

## Estrutura do Projeto

```
odontograma/
├── js/
│   ├── constants.js      # Constantes do sistema (inglês)
│   ├── i18n.js          # Sistema de internacionalização
│   ├── engine.js        # Motor principal da aplicação
│   ├── damage.js        # Gerenciamento de danos/tratamentos
│   ├── tooth.js         # Classe para representar dentes
│   ├── renderer.js      # Sistema de renderização
│   └── ...
├── images/              # Imagens dos dentes
├── docs/               # Documentação e imagens
└── index.html          # Página principal
```

## API de Internacionalização

### Uso Básico
```javascript
// Definir idioma
engine.setLanguage('pt'); // ou 'en'

// Obter idioma atual
var currentLang = engine.getLanguage();

// Obter idiomas disponíveis
var languages = engine.getAvailableLanguages();
```

### Traduzir Textos
```javascript
// No sistema i18n
var text = engine.i18n.t('menu.caries'); // Retorna "Caries" ou "Cáries"
var textWithParams = engine.i18n.t('debug.coordinates', {x: 100, y: 200});
```

## Desenvolvimento

### Adicionar Novas Traduções
1. Edite o arquivo `js/i18n.js`
2. Adicione as chaves nos objetos `en` e `pt`
3. Use `engine.i18n.t('sua.chave')` para acessar as traduções

### Adicionar Novos Diagnósticos
1. Adicione a constante em `js/constants.js`
2. Implemente o método de desenho em `js/damage.js`
3. Adicione as traduções em `js/i18n.js`
4. Atualize o menu em `js/engine.js`

## Compatibilidade

- Navegadores modernos com suporte a HTML5 Canvas
- JavaScript ES5+
- Testado em Chrome, Firefox, Safari e Edge

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Autores

- **Bardur Thomsen** - *Desenvolvimento inicial* - [bardurt](https://github.com/bardurt)

## Agradecimentos

- Comunidade odontológica pela validação dos casos de uso
- Contribuidores que ajudaram com traduções e melhorias

## Configurações de Idioma

### Idioma Padrão
O sistema agora usa **português como idioma padrão**. Esta configuração é definida em:

- **`js/settings.js`**: Configuração `DEFAULT_LANGUAGE = "pt"`
- **`js/i18n.js`**: Inicialização com `currentLanguage = 'pt'`
- **`index.html`**: Seletor de idioma com português pré-selecionado

### Alterando o Idioma Padrão
Para alterar o idioma padrão do sistema:

1. **Edite `js/settings.js`**:
   ```javascript
   this.DEFAULT_LANGUAGE = "en"; // ou "pt"
   ```

2. **Edite `js/i18n.js`**:
   ```javascript
   this.currentLanguage = 'en'; // ou 'pt'
   ```

3. **Edite `index.html`**:
   ```html
   <option value="en" selected>English</option>
   <option value="pt">Português</option>
   ```
