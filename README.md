# Souveraine — Site de Perfumaria de Luxo

Landing page responsiva inspirada em uma direção de arte editorial para uma marca de perfumaria de luxo. O projeto foi desenvolvido com HTML, CSS e JavaScript puro, utilizando GSAP para criar animações suaves e uma experiência de scroll cinematográfica.

## Funcionalidades

- Hero responsiva para desktop e mobile.
- Navegação com efeito glassmorphism.
- Menu mobile animado.
- Entradas tipográficas com SplitText.
- Animações vinculadas ao scroll com ScrollTrigger.
- Transição em máscara: o texto “Souveraine” aumenta e revela a imagem da campanha.
- Galeria editorial de produtos.
- Seção de coleção com cards animados.
- Botões magnéticos em dispositivos com mouse.
- Navegação suave entre as seções.
- Suporte a `prefers-reduced-motion` para maior acessibilidade.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- [GSAP](https://gsap.com/)
- GSAP ScrollTrigger
- GSAP SplitText
- GSAP ScrollToPlugin
- Google Fonts — Alumni Sans

## Estrutura do projeto

```text
SITE PERFUME/
├── imgs/
│   ├── Mulher-hero.png
│   ├── Mulher-na-praia.jpg
│   ├── Produto1.jpg
│   ├── produto2.jpg
│   ├── produto3.jpg
│   ├── produto4.jpg
│   ├── produto5.jpg
│   ├── produto-napraia.jpg
│   └── REFERENCIA.jpg
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Como executar

O projeto não exige instalação de dependências ou processo de build. Execute um servidor HTTP local na pasta do projeto.

Com Python:

```bash
python -m http.server 4173
```

Depois, acesse:

```text
http://localhost:4173
```

Também é possível abrir o projeto utilizando extensões como Live Server no Visual Studio Code.

> É necessário estar conectado à internet para carregar a fonte Alumni Sans e os arquivos GSAP importados por CDN.

## Animação principal

A seção de campanha utiliza uma máscara SVG controlada pelo ScrollTrigger:

1. A imagem aparece inicialmente dentro das letras de “Souveraine”.
2. O tamanho tipográfico aumenta de forma centralizada durante o scroll.
3. Uma camada vetorial expande a área da máscara até preencher a viewport.
4. A imagem assume a tela inteira sem alterar seu enquadramento.
5. A composição é reduzida para um quadro editorial com texto e botão.

Essa sequência está implementada na função `initRevealScene()` do arquivo `script.js`.

## Responsividade

O layout possui ajustes específicos para:

- Desktop e telas amplas.
- Tablets e dispositivos abaixo de 900 px.
- Smartphones abaixo de 430 px.
- Smartphones com pouca altura de viewport.

Os principais breakpoints podem ser encontrados no final de `styles.css`.

## Personalização

As cores principais estão definidas como variáveis no início de `styles.css`:

```css
:root {
  --peach: #edab71;
  --cream: #e9d6c2;
  --brown: #744f2f;
  --sand: #d0b9a5;
  --ink: #39271c;
  --white: #fff8ef;
}
```

Para alterar os produtos ou imagens da campanha, substitua os arquivos dentro de `imgs/` e preserve os nomes atuais, ou atualize os caminhos correspondentes em `index.html`.

## Acessibilidade

- Link para pular diretamente ao conteúdo principal.
- Textos alternativos nas imagens.
- Estados `aria-expanded` e `aria-hidden` no menu mobile.
- Navegação por teclado.
- Redução das animações quando o sistema estiver configurado com `prefers-reduced-motion`.

## Arquivos principais

- `index.html`: estrutura e conteúdo da página.
- `styles.css`: identidade visual, layout e responsividade.
- `script.js`: animações GSAP e interações.

## Licença e uso de assets

Antes de publicar ou utilizar o projeto comercialmente, confirme as licenças e os direitos de uso das imagens, da fonte e dos demais recursos visuais presentes na pasta `imgs/`.
