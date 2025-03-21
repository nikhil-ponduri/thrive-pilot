import { createReactAgent } from '@langchain/langgraph/prebuilt'  
import { ChatOpenAI } from '@langchain/openai';
import { DynamicStructuredTool } from '@langchain/core/tools';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Use the API key from environment variables
const model = new ChatOpenAI({ 
  model: 'gpt-4o-mini', 
  apiKey: process.env.OPENAI_API_KEY
});

export const getBaseModel = (): ChatOpenAI => {
  return model;
};

export const createBaseAgent = (payload: {
  model: ChatOpenAI;
  tools: DynamicStructuredTool[];
  name: string;
  systemPrompt: string;
}) => {
  const agent = createReactAgent({
    llm: payload.model,
    tools: payload.tools,
    name: payload.name,
    prompt: payload.systemPrompt,
  });
  return agent;
};
