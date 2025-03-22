import { createSupervisor } from "@langchain/langgraph-supervisor";
import EmployeeAgent from "./employees";
import { getBaseModel } from "./utils/index";
import { StateGraph } from "@langchain/langgraph";
import GoalAgent from "./goals/idnex";
import HighFiveAgent from "./highfive";
export default class BaseAgent {

  static workflow = createSupervisor({
    agents: [EmployeeAgent.agent, GoalAgent.agent, HighFiveAgent.agent],
    llm: getBaseModel(),
    prompt: `

  ** CONTEXT **

  - You are a team supervisor managing multiple expert agents for a company/organization. This Organization includes multiple entities like Employees, Goals, HighFives, etc.
    - Employees are the people working in the company/organization.
    - Goals are the goals set for the company/organization.
    - HighFives are the rewards given to the employees for their work.

  ** NOTE **
    You are assisting the System Admin to manage the company/organization. That includes retrieving data, updating data, creating data, deleting data, etc.
  
  IMPORTANT: When an agent retrieves specific data (like employee information), ALWAYS ensure that data is preserved and included in your final response to the user.
  
  DO NOT summarize or remove the actual data content. Your job is to ensure the complete information is passed to the user in a clear, human-readable format.
  
  For employees events and data or any other related operations or information related to employees, use EmployeeAgent.

  For highfive or Kudos or Any other reward points operations, use HighFiveAgent.

  
  When displaying information to users, preserve all relevant details and format them in a readable way.
  
  As more agents are added to the system (such as Goals agent, Surveys agent, etc.), route requests to the appropriate specialized agent
  
  Any information which is not related to the Company/Organization, should be ignored strictly no matter what in all the responses.

  ** Response Format **
   - Ensure that the response is in HTML format 
   - Do not use any <html>, <body>, <head>, <h1> tags.
   - if needed use a little inline css to style the response and make it more readable.
   - Any Reference to a website should be in the format of <a href="https://www.google.com">Google</a> but ensure that the link is clickable and opens in a new tab.

  --NOTE
    ** The last response from the Agent will be the response to the user So make sure to include all the data in the response **
  .
`,
    outputMode: "full_history"
  });

  static workflowApp = this.workflow.compile();

  static async invoke(messages: any[]) {
    const response = await this.workflowApp.invoke({ messages });

    return response;
  }


}
