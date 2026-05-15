# CMS Angular Feature First

CMS didatico para editar uma tela Server Driven UI por blocos, refeito em uma estrutura feature-first

## Como rodar

Na raiz do monorepo da [poc-server-driven-ui](https://github.com/danieltinois/poc-serven-driven-ui) substitua o cms-angular por angular-architecture-feature-first, e em terminais separados:

```bash
pnpm dev:api
pnpm dev:cms:feature-first é preciso adcionar essa novo script em package.json)
```

Abra:

```text
http://localhost:4201
```

## Como funciona

O CMS busca `GET http://localhost:3333/screen/home`, transforma o payload em cards editaveis e renderiza um preview Angular da tela.

## Estrutura feature-first

```text
src/app/
├── core/
│   └── services/
│       └── api-config.service.ts
├── features/
│   └── cms-screen/
│       ├── domain/
│       │   ├── dtos/
│       │   ├── entities/
│       │   └── repositories/
│       ├── application/
│       │   └── usecases/
│       ├── infrastructure/
│       │   ├── mappers/
│       │   └── repositories/
│       └── presentation/
│           ├── components/
│           ├── pages/
│           ├── store/
│           └── cms-screen.routes.ts
└── shared/
    ├── ui/
    └── utils/
```

O `domain` nao importa Angular. Os use cases tambem sao classes TypeScript puras; a injecao do Angular acontece nas rotas da feature usando `useFactory`.

Os campos dos blocos vem do catalogo compartilhado em `packages/shared-schema/src/block-catalog.ts`. Isso aproxima a POC de um desenho de producao: o pacote de contrato tambem informa como o CMS pode editar cada bloco.

Fluxo:

1. Edite os campos dos blocos.
2. Adicione, remova ou reordene blocos.
3. Clique em `Validar tela`.
4. O CMS valida usando `@poc/shared-schema`.
5. O preview Angular atualiza automaticamente conforme os campos mudam.
6. Clique em `Publicar`.
7. O CMS envia `POST /screen/home` para a Mock API.

## O que esta sendo compartilhado

- Design tokens via `@poc/design-tokens`.
- Schema e tipos via `@poc/shared-schema`.
- Catalogo editavel dos blocos via `@poc/shared-schema`.
- Nomes dos blocos: `hero`, `text`, `card`, `button`, `video`.
- Variantes, como `button.variant = primary | secondary`.
- Estrutura do payload.

## O que nao esta sendo compartilhado

O CMS nao compartilha componentes visuais com Flutter. O Angular tem seus componentes web, e o Flutter tem seus widgets nativos.

Isso e proposital: compartilhar UI entre plataformas costuma misturar responsabilidades, reduzir qualidade nativa e criar acoplamento dificil de evoluir. A parte compartilhada deve ser o contrato, nao a implementacao visual.

## Componentes do preview

- `HeroBlockComponent`
- `TextBlockComponent`
- `CardBlockComponent`
- `ButtonBlockComponent`
- `VideoBlockComponent`
- `DynamicScreenRendererComponent`
