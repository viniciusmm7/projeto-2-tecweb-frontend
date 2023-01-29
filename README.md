# Projeto 2 - Tecnologias Web - Frontend - Insper - 2022.2
Feito por: Vinícius Matheus Morales

Professora: [Barbara Tieko Agena](http://lattes.cnpq.br/3888793516541327 "Lattes CV Barbara Tieko Agena")
___

## 1. Sobre o projeto
Esse projeto tem como objetivo criar uma página com frontend feito em React e backend feito com Django + uma API de escolha própria.

Nesse será utilizada a [RAWG API](https://rawg.io/apidocs), uma API para ter acesso a dados de jogos de videogame diversos.

O nome do projeto será *Expand*.

## 2. Adquirindo keys essenciais

### 2.1 Solicitando uma key da RAWG API
1. Acessar o link: [https://rawg.io/login?forward=developer].
2. Fazer login ou criar uma conta.
3. Ler os [Termos de Uso](https://api.rawg.io/docs/ "Termos de Uso RAWG API") - se resumem a não usar a API para fazer um clone, o uso ser gratuito até 100.000 usuários ativos por mês ou 500.000 visualizações de página por mês e atribuir um hyperlink para cada página onde os dados forem utilizados.
4. Preencher o formulário de forma adequada.
5. Copiar a key e salvar num arquivo Python chamado "api_keys.py" com o nome da variável "RAWG_API_KEY".

### 2.2 Solicitando uma key da RAPID API
1. Acessar o link: [https://rapidapi.com/accujazz/api/rawg-video-games-database].
2. Fazer login ou criar uma conta.
3. Ler os [Termos de Serviço](https://website.rapidapi.com/terms/ "Termos de Serviço RAPID API").
4. Copiar a "X-RapidAPI-Key" do teste de endpoint e salvar no mesmo arquivo Python "api_keys.py" com o nome da variável "RAPID_API_KEY".

### 2.3 Salvando as keys
1. Crie um arquivo dentro da pasta *src* chamado "keys.js", substituindo "RAWG_API_KEY" e "RAPID_API_KEY" pelas respectivas chaves, com o seguinte conteúdo:
```javascript
const keys = {
    'rawg': 'RAWG_API_KEY',
    'rapid': 'RAPID_API_KEY'
}
module.exports = {keys};
```
___

## 3. Rodando o frontend
Clone esse repositório, ou baixe, e abra a pasta root do projeto.

### 3.1 React
No terminal rode o seguinte comando para inicializar um projeto em react:
```bash
npx create-react-app games-frontend
cd games-frontend
```

### 3.2 Tailwind
Em seguida, no terminal, rode o seguinte comando para instalar o tailwind:
```bash
npm install -D tailwindcss
```

### 3.3 Axios
Por último, ainda no terminal, rode o seguinte comando para instalar o axios:
```bash
npm i axios
```

### 3.4 Rodar
Com todas as dependências instaladas, rode:
```bash
npm start
```
___

O que você pode fazer nesse projeto do jeito que ele está é salvar os jogos que aparecem com dados da API da RAWG. Ao salvar ele armazena essa informação no banco de dados para saber se aquele jogo já está salvo ou não!