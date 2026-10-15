# AnimesDigital para Stremio/Nuvio

Addon comunitário que consulta os catálogos publicados pelo [AnimesDigital.org](https://animesdigital.org/). Não hospeda nem copia vídeos. Ao abrir um episódio, procura exclusivamente o iframe do **Player FHD** no HTML da página do episódio. O Player 2 é ignorado.

## Catálogos

Os catálogos usam os nomes e as seções que aparecem no menu do site: **Animes Legendados**, **Animes Dublado**, **Desenhos**, **Doramas**, **Tokusatsus** e **Filmes**. Não são adicionadas categorias próprias.

A origem usa carregamento AJAX. Em séries, o addon agrupa os episódios a partir da página de anime publicada pelo próprio site e entrega cada episódio no array `videos[]`, para aparecer separadamente no Stremio. Filmes têm tipo `movie`. Se a resposta da página de Filmes vier com episódios em vez de filmes, o addon só usa os links `/filme/` publicados na página inicial — não transforma episódios em filmes.

## Publicar no GitHub e implantar na Vercel

1. Baixe e extraia o ZIP. Crie um repositório vazio no GitHub.
2. Envie **o conteúdo da pasta** para o repositório (pela opção **Add file → Upload files**) ou use o terminal na pasta extraída:

   ```bash
   git init
   git add .
   git commit -m "Addon AnimesDigital para Stremio"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```

   Substitua o endereço de exemplo pelo endereço do seu repositório.
3. Entre na Vercel, escolha **Add New → Project**, importe esse repositório e mantenha as configurações padrão. Não é necessária variável de ambiente. A Vercel instalará as dependências de `package.json`.
4. Depois do deploy, abra `https://SEU-PROJETO.vercel.app/manifest.json`. Deve aparecer um JSON com o nome `AnimesDigital` e os seis catálogos. Se receber erro, verifique os logs da implantação na Vercel.
5. No Stremio, vá a **Addons → Install via URL** e cole `https://SEU-PROJETO.vercel.app/manifest.json`. No Nuvio, use a mesma URL caso a sua versão permita instalar addons pelo protocolo Stremio.

## Teste local

Requer Node.js 20 ou superior. Na pasta do projeto:

```bash
npm install
npm test
npm start
```

O manifest local fica em `http://localhost:7000/manifest.json`. A primeira consulta às categorias pode levar alguns segundos, pois os dados são obtidos ao vivo do site.

## Limitações importantes

- A disponibilidade depende do site de origem. Mudanças no HTML, no endpoint AJAX ou no iframe podem exigir atualização do código.
- O addon entrega a URL HLS que encontrou no Player FHD; não retransmite nem transcodifica o vídeo. O suporte HLS varia por aplicativo e dispositivo. O host de vídeo pode aplicar CORS, exigência de referer, bloqueio geográfico ou outras restrições que o addon não controla. Portanto, nenhum addon pode prometer reprodução sem falhas em todo cliente e em qualquer momento.
- A seção de Filmes usa os links `/filme/` publicados pelo site, com fallback para a seleção de filmes disponível na página inicial, evitando classificar episódios como filmes.
- Use somente conforme a legislação aplicável e os termos do site. O projeto não garante disponibilidade nem autorização de distribuição do conteúdo.
