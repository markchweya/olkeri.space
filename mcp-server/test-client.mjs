#!/usr/bin/env node
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const url = process.env.MCP_TEST_URL ?? 'http://localhost:8787/mcp'
const token = process.env.MCP_CONNECTOR_TOKEN

const transport = new StreamableHTTPClientTransport(new URL(url), {
  requestInit: token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : undefined,
})

const client = new Client({
  name: 'olkeri-mcp-test-client',
  version: '1.0.0',
})

await client.connect(transport)

const tools = await client.listTools()
console.log(JSON.stringify(tools, null, 2))

await client.close()
