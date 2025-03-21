import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import BaseAgent from '../agents';
import ResponseInterceptor from '../agents/interceptors/response.interceptor';
import { AIMessage, BaseMessage } from '@langchain/core/messages';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/chat")
  async getHello(@Body() body: { message: string }): Promise<any> {
    try {
      if (!body?.message) {
        return { response: 'No message provided' };
      }
      const agent = new BaseAgent({});
      const result = await agent.invoke([
        {
          role: 'system',
          content: `You are a helpful assistant that can answer questions and help with tasks. User will provide you with a message and you will need to answer the question or help with the task.`
        },
        {
          role: 'user',
          content: body.message
        }
      ]);
      const filteredMessages = result.messages.filter((message: any) => {
        // make sure content is not null and tool_calls is empty and tool_call_id is null
        return !!message.content && !message.tool_calls?.length && !message.tool_call_id && message.type === 'ai'
      });
     
      const contents = filteredMessages.map((message: any) => message.content);
      return { contents };
    } catch (error) {
      console.error(error);
      throw new Error('Error');
    }
  }
}
