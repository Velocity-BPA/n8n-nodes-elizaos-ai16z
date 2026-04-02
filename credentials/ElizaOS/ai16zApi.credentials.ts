import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ElizaOSai16zApi implements ICredentialType {
	name = 'elizaOSai16zApi';
	displayName = 'ElizaOS/ai16z API';
	documentationUrl = 'https://docs.elizaos.ai/authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API key for ElizaOS/ai16z authentication. Obtain from your ElizaOS dashboard.',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.elizaos.ai/v1',
			required: true,
			description: 'Base URL for the ElizaOS/ai16z API',
		},
	];
}