# GUIA RÁPIDO — EDITAR E PUBLICAR O SITE S.O.S

## 1. Testar no computador

Abra `index.html`. Para testar todas as páginas com mais segurança, também pode usar a extensão Live Server no VS Code.

## 2. Onde editar cada coisa

### Informações do grupo
Arquivo: `assets/data/config.js`

Edite Instagram, WhatsApp, e-mail, paróquia e cidade.

### Aulas
Arquivo: `assets/data/cursos.js`

Cada curso possui uma lista `lessons`. Uma aula segue este modelo:

```js
[
  "Título da aula",
  "Objetivo da aula",
  ["Conteúdo 1", "Conteúdo 2"],
  ["Prática 1", "Prática 2"],
  "Atividade para casa"
]
```

As páginas dos cursos e das aulas são criadas automaticamente. Você não precisa criar um HTML novo para cada aula.

### Folhas das Missas
1. Coloque o PDF em `assets/documentos/folhas/`.
2. Abra `assets/data/folhas.js`.
3. Copie o modelo e altere:

```js
{
  "titulo": "20º Domingo do Tempo Comum",
  "data": "2026-08-16",
  "categoria": "domingo",
  "tempo": "Tempo Comum",
  "descricao": "Folha de canto e orientações.",
  "arquivo": "assets/documentos/folhas/2026-08-16-20-domingo.pdf",
  "destaque": false
}
```

Importante:
- Separe os registros com vírgula.
- Use a data no formato `AAAA-MM-DD`.
- Não use acentos nem espaços no nome do arquivo PDF.

### Apostilas
1. Coloque o PDF em `assets/documentos/apostilas/`.
2. Edite `assets/data/apostilas.js`.

Modelo:

```js
{
  "titulo": "Violão S.O.S — Bloco 2",
  "tipo": "Aluno",
  "descricao": "Acordes e primeiras músicas.",
  "arquivo": "assets/documentos/apostilas/violao-bloco-2.pdf"
}
```

## 3. Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie TODOS os arquivos e pastas deste projeto para a raiz.
3. Abra `Settings`.
4. Entre em `Pages`.
5. Em `Build and deployment`, escolha `Deploy from a branch`.
6. Selecione a branch `main` e a pasta `/ (root)`.
7. Clique em `Save`.
8. Aguarde o GitHub fornecer o endereço do site.

## 4. Atualizar depois

Faça a alteração no computador, envie o arquivo modificado para o GitHub e substitua a versão anterior. O site será atualizado automaticamente após alguns instantes.

## 5. Antes de divulgar

- Preencha a história real em `sobre.html`.
- Preencha os contatos em `contato.html` e `assets/data/config.js`.
- Troque os PDFs de exemplo pelos arquivos reais.
- Confira os títulos e datas das folhas.
- Teste no celular.


## Apoios visuais das aulas

- As imagens do curso de violão ficam em `assets/img/aulas/violao/`.
- Elas foram recortadas diretamente da Apostila de Violão do Aluno do S.O.S.
- Os visuais de canto, teclado e contrabaixo são diagramas em HTML/CSS, então podem ser editados em `assets/js/render.js` e `assets/css/style.css`.
- Para ligar um visual a uma aula, use o sexto item da aula dentro de `assets/data/cursos.js`.


## Animações

O site possui animações automáticas ao rolar. Novos cartões, aulas, folhas e blocos recebem movimento sem precisar editar cada página. O sistema está em `assets/js/script.js` e `assets/css/style.css`.


## Liturgia e Tempos Litúrgicos

Agora os dois conteúdos estão juntos em `formacao-liturgica.html`. Não é necessário editar `tempos-liturgicos.html`, pois ele apenas redireciona para a seção correta.

## Atenção aos PDFs no GitHub

Use nomes sem acentos, símbolos ou espaços. Exemplo: `15-domingo-tempo-comum-sos.pdf`.
