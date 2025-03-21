import { createSupervisor } from "@langchain/langgraph-supervisor";
import EmployeeAgent from "./employees";
import { getBaseModel } from "./utils";
import { StateGraph } from "@langchain/langgraph";

export default class BaseAgent {
  private workflowApp: any;

  constructor(private readonly context: Record<string, any>) {
    const model = getBaseModel();

    const workflow = createSupervisor({
      agents: [EmployeeAgent.agent],
      llm: model,
      prompt: `
  You are an AI ChatBot Assistant for a Product ThriveSparrow, you can help the user to get information about the company and the employees.

  **
    The last message from you is the response to the user's message. So please make sure to include the response in the last message and add all the information that you have.
  **
  `,
      outputMode: "last_message"
    });

    this.workflowApp = workflow.compile();
  }

  async invoke(messages: any[]) {
    const response = await this.workflowApp.invoke({ messages }); 
    return response;
  }


}
