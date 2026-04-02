/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ElizaOSai16z } from '../nodes/ElizaOS/ai16z/ElizaOS/ai16z.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('ElizaOSai16z Node', () => {
  let node: ElizaOSai16z;

  beforeAll(() => {
    node = new ElizaOSai16z();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('ElizaOS/ai16z');
      expect(node.description.name).toBe('elizaosai16z');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 5 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(5);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(5);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Agent Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.elizaos.ai/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('createAgent operation', () => {
		it('should create an agent successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'createAgent';
					case 'name': return 'Test Agent';
					case 'personality': return 'friendly';
					case 'modelConfig': return { model: 'gpt-4' };
					case 'capabilities': return ['chat', 'search'];
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				id: 'agent-123',
				name: 'Test Agent',
				status: 'created',
			});

			const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json.id).toBe('agent-123');
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.elizaos.ai/v1/agents',
				headers: {
					Authorization: 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				body: {
					name: 'Test Agent',
					personality: 'friendly',
					model_config: { model: 'gpt-4' },
					capabilities: ['chat', 'search'],
				},
				json: true,
			});
		});

		it('should handle createAgent errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'createAgent';
					case 'name': return 'Test Agent';
					case 'personality': return 'friendly';
					case 'modelConfig': return { model: 'gpt-4' };
					case 'capabilities': return ['chat', 'search'];
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('getAgent operation', () => {
		it('should get an agent successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'getAgent';
					case 'agentId': return 'agent-123';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				id: 'agent-123',
				name: 'Test Agent',
				status: 'active',
			});

			const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json.id).toBe('agent-123');
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.elizaos.ai/v1/agents/agent-123',
				headers: {
					Authorization: 'Bearer test-key',
				},
				json: true,
			});
		});
	});

	describe('getAllAgents operation', () => {
		it('should get all agents successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'getAllAgents';
					case 'status': return 'active';
					case 'page': return 1;
					case 'limit': return 10;
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				agents: [{ id: 'agent-123', name: 'Test Agent' }],
				total: 1,
			});

			const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json.agents).toHaveLength(1);
		});
	});

	describe('updateAgent operation', () => {
		it('should update an agent successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'updateAgent';
					case 'agentId': return 'agent-123';
					case 'name': return 'Updated Agent';
					case 'personality': return 'professional';
					case 'capabilities': return ['chat'];
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				id: 'agent-123',
				name: 'Updated Agent',
				status: 'updated',
			});

			const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json.name).toBe('Updated Agent');
		});
	});

	describe('deleteAgent operation', () => {
		it('should delete an agent successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'deleteAgent';
					case 'agentId': return 'agent-123';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				message: 'Agent deleted successfully',
			});

			const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json.message).toBe('Agent deleted successfully');
		});
	});

	describe('startAgent operation', () => {
		it('should start an agent successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'startAgent';
					case 'agentId': return 'agent-123';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				id: 'agent-123',
				status: 'active',
			});

			const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json.status).toBe('active');
		});
	});

	describe('stopAgent operation', () => {
		it('should stop an agent successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'stopAgent';
					case 'agentId': return 'agent-123';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				id: 'agent-123',
				status: 'stopped',
			});

			const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json.status).toBe('stopped');
		});
	});
});

describe('Knowledge Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.elizaos.ai/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should add knowledge entry successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('addKnowledge')
      .mockReturnValueOnce('agent123')
      .mockReturnValueOnce('Test knowledge content')
      .mockReturnValueOnce({ category: 'general' })
      .mockReturnValueOnce('ai,knowledge');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'knowledge123',
      content: 'Test knowledge content',
      metadata: { category: 'general' },
      tags: ['ai', 'knowledge']
    });

    const result = await executeKnowledgeOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.elizaos.ai/v1/agents/agent123/knowledge',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      body: {
        content: 'Test knowledge content',
        metadata: { category: 'general' },
        tags: ['ai', 'knowledge']
      },
      json: true,
    });

    expect(result).toEqual([{
      json: {
        id: 'knowledge123',
        content: 'Test knowledge content',
        metadata: { category: 'general' },
        tags: ['ai', 'knowledge']
      },
      pairedItem: { item: 0 }
    }]);
  });

  it('should get knowledge entry successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getKnowledge')
      .mockReturnValueOnce('agent123')
      .mockReturnValueOnce('knowledge123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'knowledge123',
      content: 'Test knowledge content',
      metadata: { category: 'general' }
    });

    const result = await executeKnowledgeOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.elizaos.ai/v1/agents/agent123/knowledge/knowledge123',
      headers: {
        'Authorization': 'Bearer test-key',
      },
      json: true,
    });

    expect(result).toEqual([{
      json: {
        id: 'knowledge123',
        content: 'Test knowledge content',
        metadata: { category: 'general' }
      },
      pairedItem: { item: 0 }
    }]);
  });

  it('should search knowledge base successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('searchKnowledge')
      .mockReturnValueOnce('agent123')
      .mockReturnValueOnce('AI concepts')
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(5);

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      results: [
        { id: 'knowledge123', content: 'AI knowledge', similarity: 0.9 }
      ],
      total: 1
    });

    const result = await executeKnowledgeOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.elizaos.ai/v1/agents/agent123/knowledge/search',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      body: {
        query: 'AI concepts',
        similarity_threshold: 0.8,
        max_results: 5
      },
      json: true,
    });

    expect(result).toEqual([{
      json: {
        results: [
          { id: 'knowledge123', content: 'AI knowledge', similarity: 0.9 }
        ],
        total: 1
      },
      pairedItem: { item: 0 }
    }]);
  });

  it('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getKnowledge')
      .mockReturnValueOnce('agent123')
      .mockReturnValueOnce('invalid-knowledge-id');

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Knowledge not found'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeKnowledgeOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: { error: 'Knowledge not found' },
      pairedItem: { item: 0 }
    }]);
  });
});

describe('Conversation Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.elizaos.ai/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  test('should create conversation successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createConversation')
      .mockReturnValueOnce('agent123')
      .mockReturnValueOnce('test context')
      .mockReturnValueOnce('Hello, how can I help?');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({
      id: 'conv123',
      agent_id: 'agent123',
      status: 'active'
    });

    const result = await executeConversationOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.id).toBe('conv123');
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'https://api.elizaos.ai/v1/agents/agent123/conversations'
      })
    );
  });

  test('should get conversation successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getConversation')
      .mockReturnValueOnce('agent123')
      .mockReturnValueOnce('conv123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({
      id: 'conv123',
      messages: [],
      status: 'active'
    });

    const result = await executeConversationOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.id).toBe('conv123');
  });

  test('should send message successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('sendMessage')
      .mockReturnValueOnce('agent123')
      .mockReturnValueOnce('conv123')
      .mockReturnValueOnce('Test message')
      .mockReturnValueOnce({});

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({
      message_id: 'msg123',
      content: 'Test message',
      timestamp: '2024-01-01T00:00:00Z'
    });

    const result = await executeConversationOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.message_id).toBe('msg123');
  });

  test('should handle errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createConversation')
      .mockReturnValueOnce('invalid-agent');
    
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValueOnce(
      new Error('Agent not found')
    );
    mockExecuteFunctions.continueOnFail.mockReturnValueOnce(true);

    const result = await executeConversationOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Agent not found');
  });
});

describe('Plugin Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.elizaos.ai/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should install plugin successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'installPlugin',
        'agentId': 'test-agent-123',
        'plugin_name': 'web3-plugin',
        'version': '1.0.0',
        'config': '{"enabled": true}'
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'plugin-123',
      name: 'web3-plugin',
      status: 'installed'
    });

    const items = [{ json: {} }];
    const result = await executePluginOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.id).toBe('plugin-123');
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'https://api.elizaos.ai/v1/agents/test-agent-123/plugins'
      })
    );
  });

  it('should get plugin details successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'getPlugin',
        'agentId': 'test-agent-123',
        'pluginId': 'plugin-123'
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'plugin-123',
      name: 'web3-plugin',
      status: 'active'
    });

    const items = [{ json: {} }];
    const result = await executePluginOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.status).toBe('active');
  });

  it('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'installPlugin',
        'agentId': 'test-agent-123',
        'plugin_name': 'invalid-plugin'
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(
      new Error('Plugin not found')
    );
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const items = [{ json: {} }];
    const result = await executePluginOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Plugin not found');
  });
});

describe('Memory Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.elizaos.ai/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  describe('createMemory operation', () => {
    it('should create memory entry successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('createMemory')
        .mockReturnValueOnce('agent123')
        .mockReturnValueOnce('Remember this conversation')
        .mockReturnValueOnce('high')
        .mockReturnValueOnce('conversation,important')
        .mockReturnValueOnce('{"type": "conversation"}');

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        id: 'memory123',
        content: 'Remember this conversation',
        importance: 'high'
      });

      const result = await executeMemoryOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.elizaos.ai/v1/agents/agent123/memory',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        body: {
          content: 'Remember this conversation',
          importance: 'high',
          tags: ['conversation', 'important'],
          context: { type: 'conversation' }
        },
        json: true,
      });
      
      expect(result).toHaveLength(1);
      expect(result[0].json.id).toBe('memory123');
    });

    it('should handle createMemory errors', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('createMemory');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeMemoryOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result[0].json.error).toBe('API Error');
    });
  });

  describe('getMemory operation', () => {
    it('should get memory entry successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getMemory')
        .mockReturnValueOnce('agent123')
        .mockReturnValueOnce('memory123');

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        id: 'memory123',
        content: 'Retrieved memory',
        importance: 'medium'
      });

      const result = await executeMemoryOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.elizaos.ai/v1/agents/agent123/memory/memory123',
        headers: {
          'Authorization': 'Bearer test-key',
        },
        json: true,
      });
      
      expect(result[0].json.id).toBe('memory123');
    });
  });

  describe('getMemories operation', () => {
    it('should get memories with filters successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getMemories')
        .mockReturnValueOnce('agent123')
        .mockReturnValueOnce('high')
        .mockReturnValueOnce('important')
        .mockReturnValueOnce('2024-01-01,2024-12-31')
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(10);

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        memories: [{ id: 'memory1' }, { id: 'memory2' }],
        total: 2
      });

      const result = await executeMemoryOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result[0].json.memories).toHaveLength(2);
    });
  });

  describe('updateMemory operation', () => {
    it('should update memory entry successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('updateMemory')
        .mockReturnValueOnce('agent123')
        .mockReturnValueOnce('memory123')
        .mockReturnValueOnce('Updated content')
        .mockReturnValueOnce('low')
        .mockReturnValueOnce('updated');

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        id: 'memory123',
        content: 'Updated content',
        importance: 'low'
      });

      const result = await executeMemoryOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result[0].json.content).toBe('Updated content');
    });
  });

  describe('deleteMemory operation', () => {
    it('should delete memory entry successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('deleteMemory')
        .mockReturnValueOnce('agent123')
        .mockReturnValueOnce('memory123');

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        success: true,
        message: 'Memory deleted'
      });

      const result = await executeMemoryOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result[0].json.success).toBe(true);
    });
  });

  describe('consolidateMemories operation', () => {
    it('should consolidate memories successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('consolidateMemories')
        .mockReturnValueOnce('agent123')
        .mockReturnValueOnce('2024-01-01,2024-12-31')
        .mockReturnValueOnce('importance');

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        consolidated: 5,
        remaining: 10,
        strategy: 'importance'
      });

      const result = await executeMemoryOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result[0].json.consolidated).toBe(5);
    });
  });
});
});
