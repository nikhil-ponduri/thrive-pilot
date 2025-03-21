import { createBaseAgent, getBaseModel } from "../utils";
import { tools } from "./tools";
const model = getBaseModel();

class EmployeeAgent {
  static agent = createBaseAgent({
    model,
    tools: tools,
    name: 'employee',
    systemPrompt: `
    You are a helpful assistant, you can deal with employee data. The list of operations you can perform are:
    ${tools.map((tool) => `- ${tool.name}: ${tool.description}`).join('\n')}
    You can also search for employees by name, department, or role.
    `,
  });

  constructor(private readonly context: Record<string, any>) {
  }
}

export default EmployeeAgent;
