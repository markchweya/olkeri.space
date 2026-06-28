# ChatGPT Article Connector

This project now has a protected publishing endpoint and a local CLI for sending articles into the same `ai_articles` table used by the admin panel.

## Environment

Add these server-only values to `.env.local` and to your production hosting environment:

```env
OLKERI_CONNECTOR_TOKEN=use-a-long-random-token-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Do not prefix either value with `NEXT_PUBLIC_`.

## Test Locally

Start the site:

```bash
npm run dev
```

Publish from the terminal:

```bash
npm run article:publish -- --title "My AI Article" --slug "my-ai-article" --content "Full article text..."
```

Or pipe JSON:

```bash
Get-Content article.json | npm run article:publish
```

## ChatGPT Setup

Use the OpenAPI file at:

```text
https://olkeri.space/olkeri-publish-openapi.json
```

Configure the action auth as a bearer token and use the same value as `OLKERI_CONNECTOR_TOKEN`.

Suggested instruction:

```text
When I ask you to publish an Olkeri article, collect title, slug, content, language, and optional imageUrl. Call publishArticle only after I confirm the final article.
```

## MCP Connector Server

For ChatGPT connectors that discover MCP tools directly, run the MCP wrapper:

```bash
npm run mcp:server
```

It exposes:

```text
POST /mcp
Tool: publish_article
```

Add this value when exposing the MCP server publicly:

```env
MCP_CONNECTOR_TOKEN=use-another-long-random-token-here
```

By default the MCP tool forwards publishing calls to:

```text
http://localhost:3000/api/articles/publish
```

For production, set:

```env
MCP_PUBLISH_ENDPOINT=https://olkeri.space/api/articles/publish
```

You can verify tool discovery locally with:

```bash
npm run mcp:test
```

In ChatGPT connector setup, use the public HTTPS URL for the MCP endpoint:

```text
https://your-connector-host.example.com/mcp
```

Configure bearer auth with the same value as `MCP_CONNECTOR_TOKEN`.

## Deploy The MCP Connector

The MCP connector should run as a separate public HTTPS web service. The repo includes:

```text
Dockerfile.mcp
render.yaml
```

Render setup:

1. Push this repo to GitHub.
2. In Render, create a new Blueprint from the repo, or create a Docker web service using `Dockerfile.mcp`.
3. Add these environment variables:

```env
MCP_CONNECTOR_TOKEN=use-another-long-random-token-here
OLKERI_CONNECTOR_TOKEN=the-same-token-used-by-the-next-publish-api
MCP_PUBLISH_ENDPOINT=https://olkeri.space/api/articles/publish
MCP_ALLOWED_HOSTS=your-render-service.onrender.com
```

4. After deploy, open:

```text
https://your-render-service.onrender.com/health
```

5. Use this ChatGPT connector URL:

```text
https://your-render-service.onrender.com/mcp
```
