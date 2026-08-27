# 🎮 Simon Game

Um jogo de memória inspirado no clássico Simon, desenvolvido com HTML, CSS e JavaScript puro.

O objetivo é simples: observe a sequência de cores e sons apresentada pelo jogo e tente reproduzi-la na ordem correta. A cada rodada, uma nova sequência é adicionada, tornando o desafio cada vez maior. 🧠⚡

## ✨ Demonstração

🎯 **Objetivo:** memorizar e repetir a sequência apresentada pelo jogo.

**Fluxo do jogo:**

`Iniciar → Observar → Memorizar → Reproduzir → Próxima rodada`

A cada acerto, o jogador avança para uma nova rodada. Um erro encerra a partida e o jogador pode tentar novamente.

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura da aplicação
- **CSS3** — estilização, animações e responsividade
- **JavaScript** — lógica do jogo, controle das sequências e interações

## 🧩 Como funciona

O jogo possui um conjunto de botões coloridos. Quando uma nova rodada começa, o JavaScript adiciona uma cor aleatória à sequência.

O jogador precisa reproduzir exatamente essa sequência.

Por exemplo:

```
🔴 → 🟢 → 🔵
```

Na próxima rodada:

```
🔴 → 🟢 → 🔵 → 🟡
```

E assim por diante.

Se o jogador clicar em uma cor diferente da esperada, a rodada é encerrada e o jogo pode ser reiniciado.

## 📂 Estrutura do projeto

```
Simon_Game/
├── src/
│   ├── assets/
│   ├── css/
│   └── javascript/
└──  index.html
```

## ▶️ Como executar

### 🌐 Online

Acesse o jogo diretamente pelo deploy na Vercel:

**[🎮 Jogar Simon Game](https://simongamecr.vercel.app/)**

### 💻 Localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/Gut0Rodri/Genius_Clone.git
   ```

2. Entre na pasta do projeto:
   ```bash
   Simon_Game
   ```

3. Abra o arquivo `index.html` no navegador.

## 🧠 Conceitos praticados

Este projeto foi desenvolvido com o objetivo de praticar conceitos fundamentais de desenvolvimento web, como:

- Manipulação do DOM
- Eventos de clique
- Arrays e geração de sequências
- Funções e estruturas de repetição
- Condicionais
- Controle de estado da aplicação
- `setTimeout()` e controle de animações
- Manipulação de classes CSS
- Feedback visual para o usuário
- Responsividade com CSS

## 👨‍💻 Autor

Desenvolvido por **Carlos Rodrigues**.

Se você gostou do projeto, considere deixar uma ⭐ no repositório!

## 💡 Aprendizado

Este projeto foi criado como uma forma prática de explorar JavaScript, manipulação do DOM e lógica de programação, transformando conceitos fundamentais em uma experiência interativa e divertida.

Divirta-se e tente chegar ao maior número de rodadas possível! 🎮🧠
