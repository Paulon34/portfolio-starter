# Portfolio Starter — React + Vite

**PT-BR:** Template open source de portfólio com três temas, conteúdo em JSON e currículos gerados automaticamente. Personalize e publique onde quiser; você também pode apenas clonar e testar localmente.

**EN:** Open-source portfolio starter with three themes, JSON content, responsive layout and auto-generated résumé PDFs. Clone, customize and deploy wherever you like.

## Recursos / Features

- React, TypeScript, Vite, Tailwind CSS e Motion
- Temas: **Obsidian**, **Electric Blue**, **Light Pro**
- Mobile-first, suporte a português e inglês
- Experiências, habilidades, projetos, contato e certificações
- Quatro PDFs de currículo: PT/EN × infraestrutura/software
- Dados de demonstração **fictícios** de **Alex Rivera**

## Começar / Quick start

Requer / Requires **Node.js 22+** e npm.

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
npm ci
npm run dev
```

Abra o endereço mostrado pelo Vite. / Open the local URL shown by Vite.

## Personalizar / Customize

1. Edite os arquivos `src/data/content/*.json`: nome, descrições, experiências, projetos, habilidades e links. / Edit JSON content.
2. Substitua `public/images/profile.webp` pela sua foto ou um avatar genérico. / Replace the avatar.
3. Ao trocar `profile.fullName`, ajuste **também** `resumePathTemplate` em `src/data/content/presentation.json` para o novo nome em minúsculas, sem acentos e separado por hífens. Exemplo: `/resume/maria-silva-{locale}-{focus}.pdf`. / Keep the résumé URL in sync with your name.
4. Para exibir links de projetos, defina `href` com uma URL verdadeira e `repoPublic: true` em `src/data/content/projects.json`. / Enable real public project links.
5. Opcional: altere o texto fixo `DEV_` em `src/sections/Hero.tsx`. / Customize the hero branding.
6. Atualize `index.html` (título e descrição), idiomas e links de redes sociais.

## Validar e compilar / Validate and build

```bash
npm run data:validate
npm run cv:generate
npm run typecheck
npm run lint
npm run build
```

`npm run build` executa `data:validate`, gera os quatro PDFs de currículo em `public/resume/` e compila o site estático em `dist/`. Os PDFs incluídos inicialmente contêm apenas dados fictícios. / The build regenerates the four fictional/demo résumé PDFs and produces `dist/`.

## Deploy (opcional / optional)

Você pode hospedar `dist/` em qualquer plataforma de sites estáticos. Para Cloudflare Pages com GitHub:

| Setting | Value |
|---|---|
| Framework | React (Vite) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | Sua branch principal / Your default branch |

O código pode ser usado sem hospedar o site. / Hosting is optional.

## Segurança / Security

- Nunca envie senhas, tokens, chaves SSH, `.env`, documentos privados ou informações que não queira publicar.
- Revise `src/data/content/`, a foto e os PDFs em `public/` antes de fazer deploy.
- Este template inclui **somente o site estático**. Não inclui o Portfolio Admin privado, autenticação, Docker, CasaOS nem configuração Tailscale.

**EN:** Never commit credentials or private personal data. Review the JSON files, photo, and public résumé PDFs before deployment. No admin backend or private infrastructure setup is included.

## Licença / License

[MIT](LICENSE). Você pode usar, modificar e redistribuir o código, inclusive comercialmente, mantendo o aviso de copyright e a licença. / Use, modify and redistribute under MIT terms.

Contribuições são bem-vindas. / Contributions welcome.
