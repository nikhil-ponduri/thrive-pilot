import { BaseMessage, SystemMessage } from "@langchain/core/messages";
import { getBaseModel } from "../utils";
import { z } from "zod";

class ResponseInterceptor {
  static llm = getBaseModel();
  static structuredLlm = this.llm.withStructuredOutput(z.object({
    content: z.string().describe("A response that is human readable and contains all the information that the user needs")
  }), {
    name: "responseFormatter",
  });
  static async intercept(messages: BaseMessage[]) {
    const response = await this.structuredLlm.invoke([...messages, new SystemMessage(`
      The previous messages are a conversation between a user and an assistant.
      In this conversation, the user is asking for a response that is human readable and contains all the information that the user needs.
      Based on the conversation history, please format the response in a human readable format. 
      The response should be in the same language as the conversation history.
      The response should be in the same tone as the conversation history.
      The response should be in the same style as the conversation history.
      The response should be in the same format as the conversation history.
      The response should be in the same structure as the conversation history.
      The response should be in the same format as the conversation history.

      The response should include all the information that the user needs.

      Ensure the response is in HTML format.
      `)]);
    return response.content;
  }
}

export default ResponseInterceptor;