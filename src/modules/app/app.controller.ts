import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import BaseAgent from '../agents';
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import ResponseInterceptor from '@modules/agents/interceptors/response.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/chat")
  async getHello(@Body() body: { message: string, context: [{ text: string, type: 'assistant' | 'user' }] }): Promise<any> {
    try {
      if (!body?.message) {
        return { response: 'No message provided' };
      }
      const previousMessages = body.context?.map((message) => {
        if (message.type === 'assistant') {
          return new AIMessage(message.text);
        }
        return new HumanMessage(message.text);
      }) || [];

      const result = await BaseAgent.invoke([
        ...previousMessages,
        {
          role: 'user',
          content: body.message
        }
      ]);

      const filteredMessages = result.messages.slice(previousMessages.length + 1).filter((message: any) => {
        // make sure content is not null and tool_calls is empty and tool_call_id is null
        return !!message.content && !message.tool_calls?.length && !message.tool_call_id && message.getType() === 'ai'
      });
      // console.log(filteredMessages);
      // const finalMessage = await ResponseInterceptor.intercept(filteredMessages);
      return { messages: [filteredMessages.pop()?.content] };
    } catch (error) {
      console.error(error);
      throw new Error('Error');
    }
  }
}
