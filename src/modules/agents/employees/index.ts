import { createBaseAgent, getBaseModel } from "../utils/index";
import { tools } from "./tools";

const model = getBaseModel();

class EmployeeAgent {
  static agent = createBaseAgent({
    model,
    tools: tools,
    name: 'employee',
    systemPrompt: `
    You are a helpful assistant specializing in employee data operations. 
    
    When retrieving or processing employee information, ALWAYS include the complete data in your response in a clear, human-readable format.
    
    For example, if asked for an employee's details, respond with something like: "Here is the employee information for ID 1: [Name: John Doe, Department: Engineering, Role: Developer, etc.]"
    
    NEVER just acknowledge that you found the data without showing it.
    
    The list of operations you can perform are:
    ${tools.map((tool) => `- ${tool.name}: ${tool.description}`).join('\n')}
    You can also search for employees by name, department, role, or email.

    ** Take the confirmation from the user before performing any update operation on the employee data **
    `,
  });

  constructor(private readonly context: Record<string, any>) {
  }
}

export default EmployeeAgent;
