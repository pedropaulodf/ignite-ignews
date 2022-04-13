# 👋 Ig.News

<p align="center">
  <img alt="Print do projeto" src=".github/img.jpg" width="100%">
</p>

### Projeto criado no treinamento Ignite da Rocketseat

Ig.News é o terceiro projeto criado no chapter 3 da trilha de React do Ignite da Rocketseat. O projeto consiste num blog onde para ler algum psoto você deverá ser assinante, e é usado a API do Stripe para o controle de pagamento e salvando os dados dos inscritos no FaunaDB.

#### Ver projetos:  

[<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">](https://www.figma.com/file/VmiiunIOBYX9I8BkeolJva/ig.news-(Copy)?node-id=1%3A2)
[<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">](https://ignews-pedropaulodf.vercel.app/)

## :rocket: Tecnologias
- [x] ReactJS
- [x] NextJS
- [x] TypeScript
- [x] SASS
- [x] Next-Auth
- [x] Stripe
- [x] Stripe CLI
- [x] FaunaDB
- [x] Prismic CMS
- [x] Jest (Testes unitários de componentes e páginas)
- [x] testing-library
- [x] jest-mock

## 🧪 Anotações e lembretes sobre os TESTES

* A descrição do teste deve ser o mais descritivo possível.

* Como saber qual teste usar? ``screen.logTestingPlaygroundURL()`` Ele vai gerar uma URL no console para poder testar no browser.

* Quando for testar projeto Next.js, configurar o arquivo ``babel.config.js``

* Padrões de nomes:
``ComponentName.spec.tsx``

* Lib para ajudar no reconhecimento de arquivos de estilo .module: ``identity-obj-proxy`` | 
Sobre essa lib, ver configuração no arquivo: ``jest.config.js``

* O ``mock()`` server para todo os testes no arquivo dele. E tem que ir "mockando" todos os recursos usados nos componentes testado e seus filhos.

* A função ``debug()`` faz mostrar o HTML gerado pelo teste.
```ts
const { debug } = render()
debug()
```

* A função ``describe()`` serve para organizar os testes e categorizá-los.

* Pode-se usar ``test()`` ou ``it()`` para criar um teste, mas o it() é ideal usar dentro de um describe().

* Dependências para os testes com next.js e outros:

``yarn add jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest -D``

* Modelo de configuração do arquivo ``jest.config.js``:

```ts
module.exports = {
  // Pastas a serem ignoradas pelos testes
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/.vercel/", "/.github/"],
  // Arquivo onde está configurado o teste
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  // Atributo que informa quais tipos de arquivos devem ser convertidos em JavaScript
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  // O atributo abaixo indica qual ambiente o teste está rodando
  testEnvironment: 'jsdom',
  // Atributo referente a lib identity-obj-proxy
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  }

  // PARA GERAR pasta COVERAGE e ver no browser

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.spec.tsx",
    "!src/**/_app.tsx",
    "!src/**/_document.tsx",
  ],
  coverageReporters: ["lcov", "json"],
};
```

* Usar a biblioteca jest-mock para mockar valores diferentes para testes diferentes: ``yarn add jest-mock -D``

* ``expect.objectContaining({})`` faz com que o teste verifique apenas se o teste possui os dados do objeto, se retirar, o teste verificar se o objeto é totalmente igual ao informado.

* Comandos para testes assíncronos. Parece que o Jest tem cerca de 1s (1000) de delay padrão para verificar: 
```ts
// findByText(() => {}, {}, { interval: 3000 ...options });
expect(await screen.findByText('ButtonText', {}, { timeout: 1400 }))

// waitFor(() => {},{ interval: 3000 ...options });
await waitFor(() => {
  return expect(screen.getByText('ButtonText')).toBeInTheDocument();
})
// Ou se for esperar o componente sair da tela
await waitFor(() => {
  return expect(screen.queryByText('ButtonText')).toBeInTheDocument();
})

// waitForElementToBeRemoved(() => {}, { interval: 3000 ...options })
await waitForElementToBeRemoved(screen.queryByText('ButtonText'), {})
```
