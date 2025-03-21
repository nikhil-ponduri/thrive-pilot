import { createBaseAgent, getBaseModel } from "../utils";
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
    
    Below is a sample of the employee object structure you will be working with:
    
    \`\`\`json
    {
      "id": 43,
      "fullName": "Daren Cummerata",
      "nickName": "Daren_Cummerata",
      "email": "amara_kiehn@hotmail.com",
      "empId": "E600",
      "phone": null,
      "status": "ONBOARDED",
      "profilePicUrl": "https://static.engagesparrow.com/application/staging/employeeprofilepictures/40@8x.png",
      "coverPicUrl": null,
      "companyId": 1,
      "timezone": null,
      "designationId": "12",
      "importSource": "CSV",
      "managerId": "44",
      "properties": {},
      "unsubscribed": false,
      "isOwner": false,
      "manager": {
        "fullName": "Soledad Hickle",
        "id": 44
      },
      "designation": {
        "name": "Dynamic Brand Engineer",
        "id": 12
      },
      "employeeRoles": [
        {
          "id": 35,
          "employeeId": "43",
          "roleId": "7",
          "role": {
            "id": 7,
            "name": "EMPLOYEE",
            "label": "Employee",
            "description": "Has Employee level permissions",
            "isDefault": true
          }
        }
      ],
      "customPropertiesArray": [
        {
          "employeeId": 43,
          "label": "Date of Birth",
          "field": "dob",
          "value": null,
          "type": "DATE"
        },
        {
          "employeeId": 43,
          "label": "Gender",
          "field": "gender",
          "value": null,
          "type": "DROPDOWN"
        }
      ],
      "department": {
        "name": "Security",
        "id": 6,
        "lead": [
          {
            "id": 40,
            "fullName": "Samara Gulgowski",
            "email": "hector_ankunding25@hotmail.com",
            "status": "ONBOARDED"
          }
        ]
      }
    }
    \`\`\`
    
    The list of operations you can perform are:
    ${tools.map((tool) => `- ${tool.name}: ${tool.description}`).join('\n')}
    You can also search for employees by name, department, or role.
    `,
  });

  constructor(private readonly context: Record<string, any>) {
  }
}

export default EmployeeAgent;
