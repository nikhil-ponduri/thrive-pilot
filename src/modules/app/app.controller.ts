import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import BaseAgent from '../agents';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/chat")
  async getHello(@Body() body: { message: string, context: [{ text: string, type: 'assistant' | 'user' }] }): Promise<any> {
    try {
      if (!body?.message) {
        return { response: 'No message provided' };
      }
      const previousMessages = body.context.map((message) => {
        if (message.type === 'assistant') {
           return new AIMessage(message.text);
        }
        return new HumanMessage(message.text);
      });
      const agent = new BaseAgent({});
      const result = await agent.invoke([
        {
          role: 'system',
          content: `
          You are a helpful assistant that can answer questions and help with tasks. User will provide you with a message and you will need to answer the question or help with the task.
          
          Ensure that the response is in HTML format 

          Do not use any <html>, <body>, <head>, <h1> tags.

          if needed use a little inline css to style the response and make it more readable.


          Any Reference to a website should be in the format of <a href="https://www.google.com">Google</a> but ensure that the link is clickable and opens in a new tab.
          `
        },
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
      const messages = filteredMessages.map((message: any) => {
        return message.content
      });
      // remove duplicate messages
      const uniqueMessages = messages.filter((message: string, index: number, self: string[]) =>
        self.indexOf(message) === index
      );
      return { messages: uniqueMessages };
    } catch (error) {
      console.error(error);
      throw new Error('Error');
    }
  }
}
