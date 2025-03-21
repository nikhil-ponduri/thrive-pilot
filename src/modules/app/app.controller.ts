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
          content: `
          You are a helpful assistant that can answer questions and help with tasks. User will provide you with a message and you will need to answer the question or help with the task.
          
          Ensure that the response is in HTML format 

          Do not use any <html>, <body>, <head>, <h1> tags.

          if needed use a little inline css to style the response color and font size and font weight.

          Any Reference to a website should be in the format of <a href="https://www.google.com">Google</a> but ensure that the link is clickable and opens in a new tab.
          `
        },
        {
          role: 'user',
          content: body.message
        }
      ]);
      return { messages: [result.messages.pop().content] };
    } catch (error) {
      console.error(error);
      throw new Error('Error');
    }
  }
}
