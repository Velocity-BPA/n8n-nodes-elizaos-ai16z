# n8n-nodes-elizaos-ai16z

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides seamless integration with ElizaOS/ai16z, offering 5 core resources for building and managing AI agents. Key capabilities include agent lifecycle management, knowledge base operations, conversation handling, plugin management, and memory operations for creating sophisticated AI automation workflows.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![AI Agent Platform](https://img.shields.io/badge/AI-Agent%20Platform-purple)
![ElizaOS](https://img.shields.io/badge/ElizaOS-ai16z-green)
![Automation](https://img.shields.io/badge/Automation-Ready-orange)

## Features

- **Agent Management** - Create, configure, deploy and monitor AI agents with full lifecycle control
- **Knowledge Operations** - Manage knowledge bases, documents, and information retrieval for enhanced agent intelligence
- **Conversation Handling** - Process conversations, manage dialogue flows, and extract insights from agent interactions
- **Plugin Integration** - Install, configure, and manage plugins to extend agent capabilities and functionality
- **Memory Operations** - Handle short-term and long-term memory storage, retrieval, and management for persistent agent context
- **Real-time Processing** - Execute operations with immediate feedback and status monitoring
- **Bulk Operations** - Perform batch operations across multiple agents, conversations, or knowledge entries
- **Advanced Filtering** - Query and filter resources with sophisticated search and filtering capabilities

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-elizaos-ai16z`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-elizaos-ai16z
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-elizaos-ai16z.git
cd n8n-nodes-elizaos-ai16z
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-elizaos-ai16z
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your ElizaOS/ai16z API key for authentication | Yes |
| Environment | Environment identifier (production/staging/development) | No |

## Resources & Operations

### 1. Agent

| Operation | Description |
|-----------|-------------|
| Create | Create a new AI agent with specified configuration and capabilities |
| Get | Retrieve detailed information about a specific agent |
| Get All | List all agents with optional filtering and pagination |
| Update | Modify agent configuration, settings, or capabilities |
| Delete | Remove an agent and its associated data |
| Deploy | Deploy an agent to make it active and available |
| Stop | Stop a running agent while preserving its configuration |
| Get Status | Check the current status and health of an agent |

### 2. Knowledge

| Operation | Description |
|-----------|-------------|
| Add | Add new knowledge entries, documents, or information to the knowledge base |
| Get | Retrieve specific knowledge entries or documents |
| Search | Search through the knowledge base using queries and filters |
| Update | Modify existing knowledge entries or documents |
| Delete | Remove knowledge entries from the knowledge base |
| Import | Bulk import knowledge from external sources or files |
| Export | Export knowledge base content in various formats |
| Categorize | Organize knowledge entries into categories or tags |

### 3. Conversation

| Operation | Description |
|-----------|-------------|
| Start | Initiate a new conversation with an agent |
| Send Message | Send a message within an existing conversation |
| Get History | Retrieve conversation history and message logs |
| Get All | List all conversations with filtering options |
| End | Terminate an active conversation |
| Archive | Archive completed conversations for long-term storage |
| Search | Search through conversation content and messages |
| Get Analytics | Retrieve analytics and insights from conversation data |

### 4. Plugin

| Operation | Description |
|-----------|-------------|
| Install | Install a new plugin to extend agent capabilities |
| Get | Retrieve information about a specific installed plugin |
| Get All | List all available and installed plugins |
| Configure | Configure plugin settings and parameters |
| Enable | Enable a plugin for use by agents |
| Disable | Disable a plugin without uninstalling it |
| Uninstall | Remove a plugin completely from the system |
| Update | Update a plugin to the latest version |

### 5. Memory

| Operation | Description |
|-----------|-------------|
| Store | Store information in agent memory (short-term or long-term) |
| Retrieve | Retrieve stored memories based on queries or context |
| Search | Search through memory content using various criteria |
| Update | Modify existing memory entries |
| Delete | Remove specific memories or memory categories |
| Clear | Clear all memory for an agent or specific memory types |
| Get Usage | Get memory usage statistics and metrics |
| Optimize | Optimize memory storage and remove redundant entries |

## Usage Examples

```javascript
// Create and deploy a new AI agent
{
  "name": "Customer Support Agent",
  "description": "AI agent for handling customer inquiries",
  "capabilities": ["text_processing", "knowledge_retrieval"],
  "personality": "helpful and professional",
  "model": "gpt-4",
  "temperature": 0.7
}
```

```javascript
// Add knowledge to enhance agent responses
{
  "title": "Product Documentation",
  "content": "Our platform offers automated business process solutions...",
  "category": "product_info",
  "tags": ["automation", "BPA", "workflows"],
  "source": "internal_docs"
}
```

```javascript
// Start a conversation and send a message
{
  "agent_id": "agent_123",
  "user_id": "user_456",
  "message": "I need help setting up workflow automation",
  "context": {
    "session_id": "session_789",
    "channel": "web_chat"
  }
}
```

```javascript
// Store important information in agent memory
{
  "agent_id": "agent_123",
  "memory_type": "long_term",
  "content": "User prefers email notifications over SMS",
  "context": "user_preferences",
  "importance": "high"
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Authentication Failed | Invalid or expired API key | Verify API key in credentials configuration |
| Agent Not Found | Specified agent ID does not exist | Check agent ID and ensure agent exists |
| Rate Limit Exceeded | Too many API requests in short period | Implement delays between requests or reduce frequency |
| Invalid Configuration | Agent or plugin configuration contains errors | Validate configuration parameters before submission |
| Memory Limit Reached | Agent memory storage capacity exceeded | Clear unnecessary memories or increase memory limits |
| Plugin Conflict | Plugin conflicts with existing plugins or agent capabilities | Check plugin compatibility and resolve conflicts |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-elizaos-ai16z/issues)
- **ElizaOS Documentation**: [ElizaOS/ai16z Documentation](https://elizaos.github.io/eliza/)
- **AI Agent Community**: [ai16z Community](https://github.com/ai16z/eliza)