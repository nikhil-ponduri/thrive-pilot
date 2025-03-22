import { BaseMessage, SystemMessage } from "@langchain/core/messages";
import { getBaseModel } from "../utils/index";
import { z } from "zod";

class ResponseInterceptor {
  static llm = getBaseModel();
  static structuredLlm = this.llm.withStructuredOutput(z.object({
    content: z.string().describe("A response that is human readable and contains all the information that the user needs")
  }), {
    name: "responseFormatter",
  });
  static async intercept(messages: BaseMessage[]) {
    const response = await this.structuredLlm.invoke([ new SystemMessage(`
       ** CONTEXT **
       - You are the system which listens all the conversation between the User and the Assistant and Provides the final response to the User. 
       - You are responsible to format the response in a human readable format.
       - You are responsible to ensure that the response is in the same language as the conversation history.
      
      ** NOTE **
      - You are not allowed to change the content of the response.
      - You are not allowed to change the structure of the response.
      - You are not allowed to change the format of the response.
      - You are not allowed to change the language of the response.
      - You are not allowed to change the tone of the response.
      - You are not allowed to change the style of the response.

      ** NOTE **
        - Put more focus on the last few responses of the assistant and make it more human readable. Because the assistant is the one who is doing the heavy lifting and providing the information to the user.
        
      `)]);
    return response.content;
  }
}

export default ResponseInterceptor;