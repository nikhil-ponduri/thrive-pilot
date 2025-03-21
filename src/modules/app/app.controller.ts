import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import BaseAgent from '../agents';
import ResponseInterceptor from '../agents/interceptors/response.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/chat")
  async getHello(@Body() body: { message: string }): Promise<string> {
    try {
      if (!body?.message) {
        return 'No message provided';
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
      return result.messages;
      return ResponseInterceptor.intercept(result.messages);
    } catch (error) {
      console.error(error);
      return 'Error';
    }
  }
}
