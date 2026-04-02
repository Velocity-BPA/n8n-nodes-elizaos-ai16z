/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-elizaosai16z/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class ElizaOSai16z implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'ElizaOS/ai16z',
    name: 'elizaosai16z',
    icon: 'file:elizaosai16z.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the ElizaOS/ai16z API',
    defaults: {
      name: 'ElizaOS/ai16z',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'elizaosai16zApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Agent',
            value: 'agent',
          },
          {
            name: 'Knowledge',
            value: 'knowledge',
          },
          {
            name: 'Conversation',
            value: 'conversation',
          },
          {
            name: 'Plugin',
            value: 'plugin',
          },
          {
            name: 'Memory',
            value: 'memory',
          }
        ],
        default: 'agent',
      },
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['agent'],
		},
	},
	options: [
		{
			name: 'Create Agent',
			value: 'createAgent',
			description: 'Create a new AI agent instance',
			action: 'Create an agent',
		},
		{
			name: 'Get Agent',
			value: 'getAgent',
			description: 'Retrieve specific agent details and status',
			action: 'Get an agent',
		},
		{
			name: 'Get All Agents',
			value: 'getAllAgents',
			description: 'List all agents with filtering options',
			action: 'Get all agents',
		},
		{
			name: 'Update Agent',
			value: 'updateAgent',
			description: 'Update agent configuration and settings',
			action: 'Update an agent',
		},
		{
			name: 'Delete Agent',
			value: 'deleteAgent',
			description: 'Remove agent and associated resources',
			action: 'Delete an agent',
		},
		{
			name: 'Start Agent',
			value: 'startAgent',
			description: 'Activate agent for interactions',
			action: 'Start an agent',
		},
		{
			name: 'Stop Agent',
			value: 'stopAgent',
			description: 'Deactivate agent',
			action: 'Stop an agent',
		},
	],
	default: 'createAgent',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['knowledge'] } },
  options: [
    { name: 'Add Knowledge', value: 'addKnowledge', description: 'Add new knowledge entries to agent\'s knowledge base', action: 'Add knowledge' },
    { name: 'Get Knowledge', value: 'getKnowledge', description: 'Retrieve specific knowledge entry', action: 'Get knowledge' },
    { name: 'Get Knowledge Base', value: 'getKnowledgeBase', description: 'List all knowledge entries for an agent', action: 'Get knowledge base' },
    { name: 'Update Knowledge', value: 'updateKnowledge', description: 'Update existing knowledge entry', action: 'Update knowledge' },
    { name: 'Delete Knowledge', value: 'deleteKnowledge', description: 'Remove knowledge entry', action: 'Delete knowledge' },
    { name: 'Search Knowledge', value: 'searchKnowledge', description: 'Semantic search through agent\'s knowledge base', action: 'Search knowledge' }
  ],
  default: 'addKnowledge',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['conversation'] } },
  options: [
    { name: 'Create Conversation', value: 'createConversation', description: 'Start new conversation with agent', action: 'Create conversation' },
    { name: 'Get Conversation', value: 'getConversation', description: 'Retrieve conversation details and history', action: 'Get conversation' },
    { name: 'Get Conversations', value: 'getConversations', description: 'List all conversations for an agent', action: 'Get conversations' },
    { name: 'Update Conversation', value: 'updateConversation', description: 'Update conversation settings or context', action: 'Update conversation' },
    { name: 'Delete Conversation', value: 'deleteConversation', description: 'End and remove conversation', action: 'Delete conversation' },
    { name: 'Send Message', value: 'sendMessage', description: 'Send message to agent in conversation', action: 'Send message' }
  ],
  default: 'createConversation',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['plugin'] } },
  options: [
    { name: 'Install Plugin', value: 'installPlugin', description: 'Install new plugin for agent', action: 'Install plugin' },
    { name: 'Get Plugin', value: 'getPlugin', description: 'Retrieve plugin details and status', action: 'Get plugin' },
    { name: 'Get Plugins', value: 'getPlugins', description: 'List all installed plugins for agent', action: 'Get plugins' },
    { name: 'Update Plugin', value: 'updatePlugin', description: 'Update plugin configuration or version', action: 'Update plugin' },
    { name: 'Uninstall Plugin', value: 'uninstallPlugin', description: 'Remove plugin from agent', action: 'Uninstall plugin' },
    { name: 'Execute Plugin Action', value: 'executePluginAction', description: 'Execute specific plugin function', action: 'Execute plugin action' }
  ],
  default: 'installPlugin',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['memory'] } },
  options: [
    { name: 'Create Memory', value: 'createMemory', description: 'Store new memory entry for agent', action: 'Create memory entry' },
    { name: 'Get Memory', value: 'getMemory', description: 'Retrieve specific memory entry', action: 'Get memory entry' },
    { name: 'Get Memories', value: 'getMemories', description: 'List agent memories with filtering', action: 'Get memory entries' },
    { name: 'Update Memory', value: 'updateMemory', description: 'Update existing memory entry', action: 'Update memory entry' },
    { name: 'Delete Memory', value: 'deleteMemory', description: 'Remove memory entry', action: 'Delete memory entry' },
    { name: 'Consolidate Memories', value: 'consolidateMemories', description: 'Process and organize agent memories', action: 'Consolidate memories' }
  ],
  default: 'createMemory',
},
{
	displayName: 'Agent ID',
	name: 'agentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['getAgent', 'updateAgent', 'deleteAgent', 'startAgent', 'stopAgent'],
		},
	},
	default: '',
	description: 'The unique identifier of the agent',
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['createAgent'],
		},
	},
	default: '',
	description: 'The name of the agent',
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['updateAgent'],
		},
	},
	default: '',
	description: 'The name of the agent',
},
{
	displayName: 'Personality',
	name: 'personality',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['createAgent'],
		},
	},
	default: '',
	description: 'The personality configuration of the agent',
},
{
	displayName: 'Personality',
	name: 'personality',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['updateAgent'],
		},
	},
	default: '',
	description: 'The personality configuration of the agent',
},
{
	displayName: 'Model Config',
	name: 'modelConfig',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['createAgent'],
		},
	},
	default: '{}',
	description: 'The model configuration for the agent',
},
{
	displayName: 'Capabilities',
	name: 'capabilities',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['createAgent'],
		},
	},
	default: '[]',
	description: 'The capabilities array for the agent',
},
{
	displayName: 'Capabilities',
	name: 'capabilities',
	type: 'json',
	required: false,
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['updateAgent'],
		},
	},
	default: '[]',
	description: 'The capabilities array for the agent',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Active',
			value: 'active',
		},
		{
			name: 'Inactive',
			value: 'inactive',
		},
		{
			name: 'Stopped',
			value: 'stopped',
		},
	],
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['getAllAgents'],
		},
	},
	default: '',
	description: 'Filter agents by status',
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['getAllAgents'],
		},
	},
	default: 1,
	description: 'Page number for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['agent'],
			operation: ['getAllAgents'],
		},
	},
	default: 10,
	description: 'Number of agents to return per page',
},
{
  displayName: 'Agent ID',
  name: 'agentId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['addKnowledge', 'getKnowledge', 'getKnowledgeBase', 'updateKnowledge', 'deleteKnowledge', 'searchKnowledge']
    }
  },
  default: '',
  description: 'The ID of the agent'
},
{
  displayName: 'Knowledge ID',
  name: 'knowledgeId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['getKnowledge', 'updateKnowledge', 'deleteKnowledge']
    }
  },
  default: '',
  description: 'The ID of the knowledge entry'
},
{
  displayName: 'Content',
  name: 'content',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['addKnowledge', 'updateKnowledge']
    }
  },
  typeOptions: {
    rows: 4
  },
  default: '',
  description: 'The content of the knowledge entry'
},
{
  displayName: 'Metadata',
  name: 'metadata',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['addKnowledge', 'updateKnowledge']
    }
  },
  default: '{}',
  description: 'Additional metadata for the knowledge entry'
},
{
  displayName: 'Tags',
  name: 'tags',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['addKnowledge', 'getKnowledgeBase']
    }
  },
  default: '',
  description: 'Comma-separated tags for the knowledge entry'
},
{
  displayName: 'Query',
  name: 'query',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['getKnowledgeBase', 'searchKnowledge']
    }
  },
  default: '',
  description: 'Search query to filter knowledge entries'
},
{
  displayName: 'Similarity Threshold',
  name: 'similarityThreshold',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['searchKnowledge']
    }
  },
  typeOptions: {
    minValue: 0,
    maxValue: 1,
    numberPrecision: 2
  },
  default: 0.7,
  description: 'Minimum similarity threshold for search results'
},
{
  displayName: 'Max Results',
  name: 'maxResults',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['searchKnowledge']
    }
  },
  typeOptions: {
    minValue: 1,
    maxValue: 100
  },
  default: 10,
  description: 'Maximum number of results to return'
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['getKnowledgeBase']
    }
  },
  typeOptions: {
    minValue: 1
  },
  default: 1,
  description: 'Page number for pagination'
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['knowledge'],
      operation: ['getKnowledgeBase']
    }
  },
  typeOptions: {
    minValue: 1,
    maxValue: 100
  },
  default: 20,
  description: 'Number of results per page'
},
{
  displayName: 'Agent ID',
  name: 'agentId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['createConversation', 'getConversation', 'getConversations', 'updateConversation', 'deleteConversation', 'sendMessage']
    }
  },
  default: '',
  description: 'The ID of the agent'
},
{
  displayName: 'Conversation ID',
  name: 'conversationId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['getConversation', 'updateConversation', 'deleteConversation', 'sendMessage']
    }
  },
  default: '',
  description: 'The ID of the conversation'
},
{
  displayName: 'Context',
  name: 'context',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['createConversation', 'updateConversation']
    }
  },
  default: '',
  description: 'Context or settings for the conversation'
},
{
  displayName: 'Initial Message',
  name: 'initialMessage',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['createConversation']
    }
  },
  default: '',
  description: 'Initial message to start the conversation'
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Ended', value: 'ended' }
  ],
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['getConversations']
    }
  },
  default: 'active',
  description: 'Filter conversations by status'
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['getConversations']
    }
  },
  default: 1,
  description: 'Page number for pagination'
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['getConversations']
    }
  },
  default: 20,
  description: 'Number of conversations to retrieve per page'
},
{
  displayName: 'Message',
  name: 'message',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['sendMessage']
    }
  },
  default: '',
  description: 'Message content to send'
},
{
  displayName: 'Attachments',
  name: 'attachments',
  type: 'collection',
  placeholder: 'Add Attachment',
  displayOptions: {
    show: {
      resource: ['conversation'],
      operation: ['sendMessage']
    }
  },
  default: {},
  options: [
    {
      displayName: 'Type',
      name: 'type',
      type: 'options',
      options: [
        { name: 'Image', value: 'image' },
        { name: 'File', value: 'file' },
        { name: 'Audio', value: 'audio' }
      ],
      default: 'file'
    },
    {
      displayName: 'URL',
      name: 'url',
      type: 'string',
      default: ''
    },
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      default: ''
    }
  ]
},
{
  displayName: 'Agent ID',
  name: 'agentId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['plugin'], operation: ['installPlugin', 'getPlugin', 'getPlugins', 'updatePlugin', 'uninstallPlugin', 'executePluginAction'] } },
  default: '',
  description: 'The ID of the agent',
},
{
  displayName: 'Plugin Name',
  name: 'plugin_name',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['plugin'], operation: ['installPlugin'] } },
  default: '',
  description: 'The name of the plugin to install',
},
{
  displayName: 'Version',
  name: 'version',
  type: 'string',
  displayOptions: { show: { resource: ['plugin'], operation: ['installPlugin', 'updatePlugin'] } },
  default: '',
  description: 'The version of the plugin',
},
{
  displayName: 'Config',
  name: 'config',
  type: 'json',
  displayOptions: { show: { resource: ['plugin'], operation: ['installPlugin', 'updatePlugin'] } },
  default: '{}',
  description: 'Plugin configuration as JSON',
},
{
  displayName: 'Plugin ID',
  name: 'pluginId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['plugin'], operation: ['getPlugin', 'updatePlugin', 'uninstallPlugin', 'executePluginAction'] } },
  default: '',
  description: 'The ID of the plugin',
},
{
  displayName: 'Category',
  name: 'category',
  type: 'string',
  displayOptions: { show: { resource: ['plugin'], operation: ['getPlugins'] } },
  default: '',
  description: 'Filter plugins by category',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Error', value: 'error' }
  ],
  displayOptions: { show: { resource: ['plugin'], operation: ['getPlugins'] } },
  default: '',
  description: 'Filter plugins by status',
},
{
  displayName: 'Action',
  name: 'action',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['plugin'], operation: ['executePluginAction'] } },
  default: '',
  description: 'The action to execute',
},
{
  displayName: 'Parameters',
  name: 'parameters',
  type: 'json',
  displayOptions: { show: { resource: ['plugin'], operation: ['executePluginAction'] } },
  default: '{}',
  description: 'Action parameters as JSON',
},
{
  displayName: 'Agent ID',
  name: 'agentId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['memory'], operation: ['createMemory', 'getMemory', 'getMemories', 'updateMemory', 'deleteMemory', 'consolidateMemories'] } },
  default: '',
  description: 'The ID of the agent',
},
{
  displayName: 'Memory ID',
  name: 'memoryId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['memory'], operation: ['getMemory', 'updateMemory', 'deleteMemory'] } },
  default: '',
  description: 'The ID of the memory entry',
},
{
  displayName: 'Content',
  name: 'content',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['memory'], operation: ['createMemory', 'updateMemory'] } },
  default: '',
  description: 'The content of the memory entry',
},
{
  displayName: 'Importance',
  name: 'importance',
  type: 'options',
  displayOptions: { show: { resource: ['memory'], operation: ['createMemory', 'updateMemory'] } },
  options: [
    { name: 'Low', value: 'low' },
    { name: 'Medium', value: 'medium' },
    { name: 'High', value: 'high' }
  ],
  default: 'medium',
  description: 'The importance level of the memory',
},
{
  displayName: 'Tags',
  name: 'tags',
  type: 'string',
  displayOptions: { show: { resource: ['memory'], operation: ['createMemory', 'updateMemory'] } },
  default: '',
  description: 'Comma-separated tags for categorizing the memory',
},
{
  displayName: 'Context',
  name: 'context',
  type: 'json',
  displayOptions: { show: { resource: ['memory'], operation: ['createMemory'] } },
  default: '{}',
  description: 'Additional context information for the memory',
},
{
  displayName: 'Importance Filter',
  name: 'importanceFilter',
  type: 'options',
  displayOptions: { show: { resource: ['memory'], operation: ['getMemories'] } },
  options: [
    { name: 'All', value: '' },
    { name: 'Low', value: 'low' },
    { name: 'Medium', value: 'medium' },
    { name: 'High', value: 'high' }
  ],
  default: '',
  description: 'Filter memories by importance level',
},
{
  displayName: 'Tags Filter',
  name: 'tagsFilter',
  type: 'string',
  displayOptions: { show: { resource: ['memory'], operation: ['getMemories'] } },
  default: '',
  description: 'Filter memories by tags (comma-separated)',
},
{
  displayName: 'Date Range',
  name: 'dateRange',
  type: 'string',
  displayOptions: { show: { resource: ['memory'], operation: ['getMemories'] } },
  default: '',
  description: 'Date range filter in ISO format (e.g., 2024-01-01,2024-12-31)',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: { show: { resource: ['memory'], operation: ['getMemories'] } },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['memory'], operation: ['getMemories'] } },
  default: 10,
  description: 'Number of results per page',
},
{
  displayName: 'Time Range',
  name: 'timeRange',
  type: 'string',
  displayOptions: { show: { resource: ['memory'], operation: ['consolidateMemories'] } },
  default: '',
  description: 'Time range for consolidation in ISO format',
},
{
  displayName: 'Strategy',
  name: 'strategy',
  type: 'options',
  displayOptions: { show: { resource: ['memory'], operation: ['consolidateMemories'] } },
  options: [
    { name: 'Importance', value: 'importance' },
    { name: 'Temporal', value: 'temporal' },
    { name: 'Semantic', value: 'semantic' }
  ],
  default: 'importance',
  description: 'Consolidation strategy to use',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'agent':
        return [await executeAgentOperations.call(this, items)];
      case 'knowledge':
        return [await executeKnowledgeOperations.call(this, items)];
      case 'conversation':
        return [await executeConversationOperations.call(this, items)];
      case 'plugin':
        return [await executePluginOperations.call(this, items)];
      case 'memory':
        return [await executeMemoryOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeAgentOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('elizaosai16zApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'createAgent': {
					const name = this.getNodeParameter('name', i) as string;
					const personality = this.getNodeParameter('personality', i) as string;
					const modelConfig = this.getNodeParameter('modelConfig', i) as any;
					const capabilities = this.getNodeParameter('capabilities', i) as any;

					const body = {
						name,
						personality,
						model_config: modelConfig,
						capabilities,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/agents`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAgent': {
					const agentId = this.getNodeParameter('agentId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/agents/${agentId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAllAgents': {
					const status = this.getNodeParameter('status', i) as string;
					const page = this.getNodeParameter('page', i) as number;
					const limit = this.getNodeParameter('limit', i) as number;

					const queryParams = new URLSearchParams();
					if (status) queryParams.append('status', status);
					queryParams.append('page', page.toString());
					queryParams.append('limit', limit.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/agents?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateAgent': {
					const agentId = this.getNodeParameter('agentId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const personality = this.getNodeParameter('personality', i) as string;
					const capabilities = this.getNodeParameter('capabilities', i) as any;

					const body: any = {};
					if (name) body.name = name;
					if (personality) body.personality = personality;
					if (capabilities) body.capabilities = capabilities;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/agents/${agentId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteAgent': {
					const agentId = this.getNodeParameter('agentId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/agents/${agentId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'startAgent': {
					const agentId = this.getNodeParameter('agentId', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/agents/${agentId}/start`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'stopAgent': {
					const agentId = this.getNodeParameter('agentId', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/agents/${agentId}/stop`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeKnowledgeOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('elizaosai16zApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'addKnowledge': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const content = this.getNodeParameter('content', i) as string;
          const metadata = this.getNodeParameter('metadata', i) as object;
          const tags = this.getNodeParameter('tags', i) as string;

          const body: any = {
            content,
            metadata
          };

          if (tags) {
            body.tags = tags.split(',').map((tag: string) => tag.trim());
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agentId}/knowledge`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getKnowledge': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const knowledgeId = this.getNodeParameter('knowledgeId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents/${agentId}/knowledge/${knowledgeId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getKnowledgeBase': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const query = this.getNodeParameter('query', i) as string;
          const tags = this.getNodeParameter('tags', i) as string;
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;

          const qs: any = {
            page,
            limit,
          };

          if (query) {
            qs.query = query;
          }

          if (tags) {
            qs.tags = tags;
          }

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents/${agentId}/knowledge`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateKnowledge': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const knowledgeId = this.getNodeParameter('knowledgeId', i) as string;
          const content = this.getNodeParameter('content', i) as string;
          const metadata = this.getNodeParameter('metadata', i) as object;

          const body: any = {
            content,
            metadata,
          };

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/agents/${agentId}/knowledge/${knowledgeId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteKnowledge': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const knowledgeId = this.getNodeParameter('knowledgeId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/agents/${agentId}/knowledge/${knowledgeId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'searchKnowledge': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const query = this.getNodeParameter('query', i) as string;
          const similarityThreshold = this.getNodeParameter('similarityThreshold', i) as number;
          const maxResults = this.getNodeParameter('maxResults', i) as number;

          const body: any = {
            query,
            similarity_threshold: similarityThreshold,
            max_results: maxResults,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agentId}/knowledge/search`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeConversationOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('elizaosai16zApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const agentId = this.getNodeParameter('agentId', i) as string;

      switch (operation) {
        case 'createConversation': {
          const context = this.getNodeParameter('context', i) as string;
          const initialMessage = this.getNodeParameter('initialMessage', i) as string;
          
          const body: any = {};
          if (context) body.context = context;
          if (initialMessage) body.initial_message = initialMessage;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agentId}/conversations`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            body,
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getConversation': {
          const conversationId = this.getNodeParameter('conversationId', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents/${agentId}/conversations/${conversationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getConversations': {
          const status = this.getNodeParameter('status', i) as string;
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;
          
          const queryParams = new URLSearchParams();
          if (status) queryParams.append('status', status);
          if (page) queryParams.append('page', page.toString());
          if (limit) queryParams.append('limit', limit.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents/${agentId}/conversations?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateConversation': {
          const conversationId = this.getNodeParameter('conversationId', i) as string;
          const context = this.getNodeParameter('context', i) as string;
          
          const body: any = {};
          if (context) body.context = context;

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/agents/${agentId}/conversations/${conversationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            body,
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteConversation': {
          const conversationId = this.getNodeParameter('conversationId', i) as string;
          
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/agents/${agentId}/conversations/${conversationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'sendMessage': {
          const conversationId = this.getNodeParameter('conversationId', i) as string;
          const message = this.getNodeParameter('message', i) as string;
          const attachments = this.getNodeParameter('attachments', i) as any;
          
          const body: any = {
            message
          };
          if (attachments && Object.keys(attachments).length > 0) {
            body.attachments = attachments;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agentId}/conversations/${conversationId}/messages`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            body,
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i }
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i }
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executePluginOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('elizaosai16zApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const agentId = this.getNodeParameter('agentId', i) as string;

      switch (operation) {
        case 'installPlugin': {
          const plugin_name = this.getNodeParameter('plugin_name', i) as string;
          const version = this.getNodeParameter('version', i, '') as string;
          const config = this.getNodeParameter('config', i, '{}') as string;

          const body: any = { plugin_name };
          if (version) body.version = version;
          if (config && config !== '{}') {
            try {
              body.config = JSON.parse(config);
            } catch (error: any) {
              throw new NodeOperationError(this.getNode(), `Invalid JSON in config: ${error.message}`);
            }
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agentId}/plugins`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'getPlugin': {
          const pluginId = this.getNodeParameter('pluginId', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents/${agentId}/plugins/${pluginId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'getPlugins': {
          const category = this.getNodeParameter('category', i, '') as string;
          const status = this.getNodeParameter('status', i, '') as string;

          const queryParams = new URLSearchParams();
          if (category) queryParams.append('category', category);
          if (status) queryParams.append('status', status);

          const queryString = queryParams.toString();
          const url = `${credentials.baseUrl}/agents/${agentId}/plugins${queryString ? '?' + queryString : ''}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'updatePlugin': {
          const pluginId = this.getNodeParameter('pluginId', i) as string;
          const version = this.getNodeParameter('version', i, '') as string;
          const config = this.getNodeParameter('config', i, '{}') as string;

          const body: any = {};
          if (version) body.version = version;
          if (config && config !== '{}') {
            try {
              body.config = JSON.parse(config);
            } catch (error: any) {
              throw new NodeOperationError(this.getNode(), `Invalid JSON in config: ${error.message}`);
            }
          }

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/agents/${agentId}/plugins/${pluginId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'uninstallPlugin': {
          const pluginId = this.getNodeParameter('pluginId', i) as string;
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/agents/${agentId}/plugins/${pluginId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'executePluginAction': {
          const pluginId = this.getNodeParameter('pluginId', i) as string;
          const action = this.getNodeParameter('action', i) as string;
          const parameters = this.getNodeParameter('parameters', i, '{}') as string;

          const body: any = { action };
          if (parameters && parameters !== '{}') {
            try {
              body.parameters = JSON.parse(parameters);
            } catch (error: any) {
              throw new NodeOperationError(this.getNode(), `Invalid JSON in parameters: ${error.message}`);
            }
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agentId}/plugins/${pluginId}/execute`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }
  return returnData;
}

async function executeMemoryOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('elizaosai16zApi') as any;
  
  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      
      switch (operation) {
        case 'createMemory': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const content = this.getNodeParameter('content', i) as string;
          const importance = this.getNodeParameter('importance', i) as string;
          const tags = this.getNodeParameter('tags', i) as string;
          const context = this.getNodeParameter('context', i) as string;
          
          const body: any = {
            content,
            importance,
          };
          
          if (tags) {
            body.tags = tags.split(',').map((tag: string) => tag.trim());
          }
          
          if (context) {
            body.context = typeof context === 'string' ? JSON.parse(context) : context;
          }
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agentId}/memory`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getMemory': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const memoryId = this.getNodeParameter('memoryId', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents/${agentId}/memory/${memoryId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getMemories': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const importanceFilter = this.getNodeParameter('importanceFilter', i) as string;
          const tagsFilter = this.getNodeParameter('tagsFilter', i) as string;
          const dateRange = this.getNodeParameter('dateRange', i) as string;
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;
          
          const queryParams: any = {
            page,
            limit,
          };
          
          if (importanceFilter) {
            queryParams.importance = importanceFilter;
          }
          
          if (tagsFilter) {
            queryParams.tags = tagsFilter;
          }
          
          if (dateRange) {
            queryParams.date_range = dateRange;
          }
          
          const queryString = new URLSearchParams(queryParams).toString();
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents/${agentId}/memory?${queryString}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'updateMemory': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const memoryId = this.getNodeParameter('memoryId', i) as string;
          const content = this.getNodeParameter('content', i) as string;
          const importance = this.getNodeParameter('importance', i) as string;
          const tags = this.getNodeParameter('tags', i) as string;
          
          const body: any = {
            content,
            importance,
          };
          
          if (tags) {
            body.tags = tags.split(',').map((tag: string) => tag.trim());
          }
          
          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/agents/${agentId}/memory/${memoryId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'deleteMemory': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const memoryId = this.getNodeParameter('memoryId', i) as string;
          
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/agents/${agentId}/memory/${memoryId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'consolidateMemories': {
          const agentId = this.getNodeParameter('agentId', i) as string;
          const timeRange = this.getNodeParameter('timeRange', i) as string;
          const strategy = this.getNodeParameter('strategy', i) as string;
          
          const body: any = {
            strategy,
          };
          
          if (timeRange) {
            body.time_range = timeRange;
          }
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agentId}/memory/consolidate`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }
      
      returnData.push({ json: result, pairedItem: { item: i } });
      
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }
  
  return returnData;
}
