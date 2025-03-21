import { tool, DynamicStructuredTool } from "@langchain/core/tools";
import { z } from 'zod';
import axios from '../../../../axios';

const getAllEmployeeData = tool(
  async (args) => {
    try {
      const response = await axios.get(`/v1/employees`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees", error);
      return [];
    }
  },
  {
    name: "getAllEmployees",
    description: `
    Get All Employees Data of the Company/Account
    
    The response format will be a list of employees with the following fields:
    - id: Unique identifier for the employee
    - fullName: Full name of the employee
    - nickName: Nickname or username
    - email: Email address
    - empId: Employee ID (e.g., E600)
    - phone: Phone number (may be null)
    - status: Current status (e.g., ONBOARDED)
    - profilePicUrl: URL to profile picture
    - companyId: Company identifier
    - designationId: Designation/role identifier
    - managerId: Manager's employee ID
    - manager: Object containing manager's fullName and id
    - designation: Object containing role name and id
    - employeeRoles: Array of role assignments with role details
    - customPropertiesArray: Array of custom employee properties (DOB, gender, location, etc.)
    - department: Department information including name, id, and department lead
    `,
    schema: z.object({
    }),
  }
);

const getEmployeeById = tool(
  async (args) => {
    try {
      const response = await axios.get(`/v1/employees/${args.id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employee by id", error);
      return null;
    }
  },
  {
    name: "getEmployeeById",
    description: `Get Employee Data by id
    
    Returns a comprehensive employee object containing:
    - Basic info: id, fullName, nickName, email, empId, phone, status
    - Media: profilePicUrl, coverPicUrl
    - Organization: companyId, designationId, managerId
    - Relationships: manager object, designation object, department object with lead
    - Roles: employeeRoles array with role details
    - Custom data: customPropertiesArray with properties like DOB, gender, location
    
    Always display the complete employee information when returning it to users.`,
    schema: z.object({
      id: z.number().describe("The id of the employee"),
    }),
  }
);

export const tools: DynamicStructuredTool[] = [getAllEmployeeData, getEmployeeById];
