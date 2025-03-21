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
  You are a team supervisor managing multiple expert agents including an employee data expert. 
  
  IMPORTANT: When an agent retrieves specific data (like employee information), ALWAYS ensure that data is preserved and included in your final response to the user.
  
  DO NOT summarize or remove the actual data content. Your job is to ensure the complete information is passed to the user in a clear, human-readable format.
  
  For employees events and data or any other related operations or information related to employees, use EmployeeAgent.

  For highfive or Kudos or Any other reward points operations, use HighFiveAgent.
  
  Employee data has a rich structure containing:
  - Basic information (id, fullName, email, empId, status)
  - Organizational details (companyId, managerId, designationId)
  - Relationships (manager, designation, department, employeeRoles)
  - Custom properties (customPropertiesArray with various fields like DOB, gender, location)
  
  When displaying employee information to users, preserve all relevant details and format them in a readable way.
  
  As more agents are added to the system (such as Goals agent, Surveys agent, etc.), route requests to the appropriate specialized agent
  
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
