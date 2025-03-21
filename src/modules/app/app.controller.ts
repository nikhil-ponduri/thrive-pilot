import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import BaseAgent from '../agents';

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
      const result = await agent.invoke([{
        role: 'user',
        content: body.message
      }]);
      return result.messages[result.messages.length - 1].content as string;
    } catch (error) {
      console.error(error);
      return 'Error';
    }
  }
}
