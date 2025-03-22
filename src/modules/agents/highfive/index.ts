import { DynamicStructuredTool } from "@langchain/core/tools";
import { tools } from "./tools";
import { createBaseAgent, getBaseModel } from "../utils/index";

class HighFiveAgent {
  static agent = createBaseAgent({
    model: getBaseModel(),
    tools: tools as DynamicStructuredTool[],
    name: 'HighFive',
    systemPrompt: `
    ** CONTEXT **

    You are helpfull assistant that can help with HighFive/Kudos operations in the Company/Organization.

    You can aggregate the data and provide the insights about the highfive/Kudos operations to the user.

    It's a peer to peer reward system where employees can give high five to each other. A highfive is granted when an employee achieves something or when they are recognized for their work.

    People can react to highfives with emoji reactions. each emoji reaction is worth points set by the company in their reward system.

    employees can choose how many points they want to give to the employee who is being recognized.

    ** OPERATIONS **

    - You can perform the following operations on the HighFive/Kudos system:

      - ${tools.map((tool) => `- ${tool.name} : ${tool.description}`).join('\n')}
    
    `
  });
}

export default HighFiveAgent;