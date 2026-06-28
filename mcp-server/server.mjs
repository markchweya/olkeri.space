#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import * as z from 'zod/v4'

const DEFAULT_PORT = 8787
const DEFAULT_PUBLISH_ENDPOINT = 'http://localhost:3000/api/articles/publish'

function loadEnvFile(path) {
  let file

  try {
    file = readFileSync(path, 'utf8')
  } catch {
    return
  }

  for (const line of file.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!match) continue

    const [, key, rawValue] = match
    const value = rawValue.replace(/^["']|["']$/g, '')

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

function getBearerToken(req) {
  const authorization = req.headers.authorization ?? ''
  const [scheme, token] = authorization.split(' ')

  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return null
  }

  return token
}

function requireMcpAuth(req, res, next) {
  const expectedToken = process.env.MCP_CONNECTOR_TOKEN

  if (!expectedToken) {
    next()
    return
  }

  if (getBearerToken(req) !== expectedToken) {
    res.status(401).json({
      jsonrpc: '2.0',
      error: {
        code: -32001,
        message: 'Unauthorized',
      },
      id: null,
    })
    return
  }

  next()
}

function getServer() {
  const server = new McpServer({
    name: 'olkeri-article-publisher',
    version: '1.0.0',
    websiteUrl: 'https://olkeri.space',
  })

  server.registerTool(
    'publish_article',
    {
      title: 'Publish Article',
      description:
        'Publish a blog article to olkeri.space. Use only after the user confirms the final title, slug, language, and article body.',
      inputSchema: {
        title: z.string().min(1).describe('The article title.'),
        slug: z
          .string()
          .min(1)
          .optional()
          .describe('URL slug. If omitted, the site creates one from the title.'),
        content: z.string().min(1).describe('The full article body.'),
        language: z
          .enum(['en', 'fr', 'de'])
          .default('en')
          .describe('Article language: en, fr, or de.'),
        imageUrl: z
          .string()
          .url()
          .optional()
          .describe('Optional public image URL for the article card and article page.'),
        publishNow: z
          .boolean()
          .default(true)
          .describe('Set false to save as an unpublished draft.'),
      },
      annotations: {
        title: 'Publish Article',
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async article => {
      const endpoint = process.env.MCP_PUBLISH_ENDPOINT ?? DEFAULT_PUBLISH_ENDPOINT
      const token = process.env.OLKERI_CONNECTOR_TOKEN

      if (!token) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: 'OLKERI_CONNECTOR_TOKEN is missing on the MCP server.',
            },
          ],
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(article),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text:
                result.error ??
                `Article publishing failed with HTTP ${response.status}.`,
            },
          ],
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: `Published "${result.article.title}" at ${result.path}.`,
          },
        ],
        structuredContent: result,
      }
    }
  )

  return server
}

loadEnvFile(resolve(process.cwd(), '.env.local'))

const app = createMcpExpressApp()
const port = Number.parseInt(
  process.env.PORT ?? process.env.MCP_PORT ?? `${DEFAULT_PORT}`,
  10
)

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    name: 'olkeri-article-publisher',
    mcp: '/mcp',
  })
})

app.post('/mcp', requireMcpAuth, async (req, res) => {
  const server = getServer()

  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    })

    await server.connect(transport)
    await transport.handleRequest(req, res, req.body)

    res.on('close', () => {
      transport.close()
      server.close()
    })
  } catch (error) {
    console.error('Error handling MCP request:', error)

    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      })
    }
  }
})

app.get('/mcp', requireMcpAuth, (_req, res) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not allowed.',
    },
    id: null,
  })
})

app.delete('/mcp', requireMcpAuth, (_req, res) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not allowed.',
    },
    id: null,
  })
})

app.listen(port, error => {
  if (error) {
    console.error('Failed to start Olkeri MCP connector:', error)
    process.exit(1)
  }

  if (!process.env.MCP_CONNECTOR_TOKEN) {
    console.warn('MCP_CONNECTOR_TOKEN is not set. /mcp is not protected.')
  }

  console.log(`Olkeri MCP connector listening at http://localhost:${port}/mcp`)
})
