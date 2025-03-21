import { createReactAgent } from '@langchain/langgraph/prebuilt'  
import { ChatOpenAI } from '@langchain/openai';
import { DynamicStructuredTool } from '@langchain/core/tools';

const model = new ChatOpenAI({ model: 'gpt-4o-mini', apiKey:"*****" });

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
