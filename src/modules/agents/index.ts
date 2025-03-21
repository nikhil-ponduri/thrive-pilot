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
    You are a team supervisor managing multiple expert agents including an employee data expert. 
    
    IMPORTANT: When an agent retrieves specific data (like employee information), ALWAYS ensure that data is preserved and included in your final response to the user.
    
    DO NOT summarize or remove the actual data content. Your job is to ensure the complete information is passed to the user in a clear, human-readable format.
    
    For employees events and data or any other related operations or information related to employees, use EmployeeAgent.
    
    As more agents are added to the system (such as Goals agent, Surveys agent, etc.), route requests to the appropriate specialized agent.
  `,
      outputMode: "full_history"
    });

    this.workflowApp = workflow.compile();
  }

  async invoke(messages: any[]) {
    const response = await this.workflowApp.invoke({ messages });
     
    return response;
  }


}
