# Como Usar o Relatório do Odontograma

## 📋 Visão Geral

O relatório do odontograma é um painel lateral que mostra informações detalhadas sobre o paciente e os tratamentos aplicados em tempo real.

## 🔍 Localização

O relatório aparece **automaticamente** no lado direito da interface, ao lado do canvas principal do odontograma.

## ⚡ Atualização Automática

O relatório é atualizado automaticamente quando você:

1. **Aplica tratamentos nos dentes**
   - Selecione um tratamento (teclas 1-5, 8, 11, etc.)
   - Clique em um dente para aplicar o tratamento
   - O relatório mostra imediatamente o novo diagnóstico

2. **Importa dados de pacientes**
   - Use o botão "Carregar Paciente"
   - Selecione um arquivo JSON
   - O relatório carrega automaticamente os dados importados

3. **Preenche campos de informações**
   - Insira dados nos campos de texto (Nome, ID, Local, etc.)
   - O relatório reflete as informações inseridas

## 🎛️ Controles do Relatório

### Botão Mostrar/Ocultar
- **Localização**: Canto superior direito do painel de relatório
- **Função**: Alterna entre mostrar e ocultar o conteúdo do relatório
- **Texto**: "Ocultar" quando visível, "Mostrar" quando oculto

### Seções do Relatório

#### 1. Informações do Paciente
- Nome, ID, Local, Número da Consulta
- Data, Dentista, Observações, Especificações
- Atualiza conforme você preenche os campos

#### 2. Diagnósticos por Dente
- Lista apenas dentes com tratamentos aplicados
- Mostra o número do dente e os tratamentos aplicados
- Inclui notas personalizadas se adicionadas

#### 3. Resumo dos Tratamentos
- Contagem total de cada tipo de tratamento
- Estatísticas gerais do odontograma
- Atualiza automaticamente conforme você adiciona/remove tratamentos

## 🔧 Solução de Problemas

### Se o relatório não estiver atualizando:

1. **Verifique a visibilidade**
   - Certifique-se que o painel não está oculto
   - Clique no botão "Mostrar" se necessário

2. **Recarregue a página**
   - Pressione F5 para recarregar
   - Isso reinicia o sistema de atualização

3. **Teste a aplicação de tratamentos**
   - Selecione um tratamento (ex: tecla 1 para cáries)
   - Clique em um dente
   - O relatório deve mostrar o tratamento aplicado

4. **Verifique a importação**
   - Após importar um arquivo, o relatório deve atualizar automaticamente
   - Se não atualizar, recarregue a página e tente novamente

## 📤 Exportação do Relatório

O relatório pode ser exportado em dois formatos:

### JSON
- Formato técnico para reimportação
- Preserva todos os dados estruturados
- Compatível com o sistema de importação

### TXT
- Formato legível para humanos
- Relatório formatado para impressão
- Inclui todas as informações de forma organizada

## 🎯 Exemplo de Uso

1. **Abra o sistema** em http://localhost:5500
2. **Preencha os dados** do paciente nos campos de texto
3. **Selecione um tratamento** (ex: pressione "1" para cáries)
4. **Clique em um dente** para aplicar o tratamento
5. **Observe o relatório** - ele deve mostrar imediatamente:
   - O dente tratado na seção "Diagnósticos por Dente"
   - A contagem atualizada na seção "Resumo dos Tratamentos"

## 🌐 Multilíngue

O relatório adapta automaticamente seu conteúdo ao idioma selecionado:
- **Português**: Idioma padrão
- **Inglês**: Alterne usando o seletor de idioma no canto superior direito

## 📞 Suporte

Se o relatório continuar não funcionando:
1. Verifique se está usando um navegador moderno
2. Certifique-se que o JavaScript está habilitado
3. Abra o Console do Desenvolvedor (F12) para verificar erros
4. Recarregue a página completamente (Ctrl+F5)

---

**Dica**: O relatório é atualizado automaticamente a cada segundo, então mesmo se houver um pequeno atraso, ele deve aparecer rapidamente após você fazer alterações no odontograma.
