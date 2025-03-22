import { tool, DynamicStructuredTool } from "@langchain/core/tools";
import { z } from 'zod';
import axios from '../../../../axios';
import { 
  getAllEmployeeDataPrompt, 
  getEmployeeByIdPrompt, 
  createEmployeesPrompt, 
  getEmployeeByEmailOrNamePrompt, 
  deactivateEmployeePrompt, 
  sendInviteToEmployeePrompt, 
  moveEmployeesFromDeactivatedToActivePrompt, 
  initiatePasswordResetPrompt,
  getDepartmentsPrompt,
  createDepartmentsPrompt
} from './prompts';

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
    description: getAllEmployeeDataPrompt,
    schema: z.object({
      dummy: z.boolean().optional().describe("Dummy parameter that is not used").default(true),
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
    description: getEmployeeByIdPrompt,
    schema: z.object({
      id: z.number().describe("The id of the employee"),
    }),
  }
);

const createEmployees = tool(
  async (args) => {
    try {
      const response = await axios.post(`/v1/employees/create`, args.employees.map((employee: any) => ({
        fullName: employee.fullName,
        email: employee.email,
        sendInvite: false,
      })));
      return response.data;
    } catch (error) {
      console.error("Error creating employees", error);
      return error?.response?.data || "Error creating employees";
    }
  },
  {
    name: "createEmployees",
    description: createEmployeesPrompt,
    schema: z.object({
      employees: z.array(z.object({
        fullName: z.string().describe("The full name of the employee"),
        email: z.string().email().describe("The email address of the employee"),
      })).max(5, "You can only create up to 5 employees at a time"),
    }),
  }
);  

const getEmployeeByEmailOrName = tool(
  async (args) => {
    try {
      const response = await axios.get(`/v1/employees/find/${args.term}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employee by email or name", error);
      return error?.response?.data || "Error fetching employee by email or name";
    }
  },
  {
    name: "getEmployeeByEmailOrName",
    description: getEmployeeByEmailOrNamePrompt,
    schema: z.object({
      term: z.string().describe("The email or name of the employee"),
    }),
  }
);

const deactivateEmployee = tool(
  async (args) => {
    try {
      await axios.post(`/v1/employees/deactivate/`, {
        ids: args.ids,
      });
      return true;
    } catch (error) {
      console.error("Error deactivating employees", error);
      return error?.response?.data || "Error deactivating employees";
    }
  },
  {
    name: "deactivateEmployee",
    description: deactivateEmployeePrompt,
    schema: z.object({
      ids: z.array(z.number()).describe("The ids of the employees to deactivate"),
    }),
  }
);

const sendInviteToEmployee = tool(
  async (args) => {
    try {
      const response = await axios.post(`/v1/employees/invite-all-employees`,{
        ids: args.ids,
        sendInviteToEveryone: args.sendInviteToEveryone,
        status: "ONBOARDED"
      });
      return response.data;
    } catch (error) {
      console.error("Error sending invite to employee", error);
      return error?.response?.data || "Error sending invite to employee";
    }
  },
  {
    name: "sendInviteToEmployee",
    description: sendInviteToEmployeePrompt,
    schema: z.object({
      ids: z.array(z.number()).describe("The ids of the employees to invite"),
      sendInviteToEveryone: z.boolean().describe("Whether to send invite to all employees or a Specific Employee Depends on the ids"),
    }),
  }
);

const moveEmployeesFromDeactivatedToActive = tool(
  async (args) => {
    try {
      const response = await axios.post(`/v1/employees/activate`, {
        ids: args.ids,
      });
      return response.data;
    } catch (error) {
      console.error("Error moving employees from deactivated to active", error);
      return error?.response?.data || "Error moving employees from deactivated to active";
    }
  },
  {
    name: "moveEmployeesFromDeactivatedToActive",
    description: moveEmployeesFromDeactivatedToActivePrompt,
    schema: z.object({
      ids: z.array(z.number()).describe("The ID's of the employees to activate"),
    }),
  }
);

const initiatePasswordReset = tool(
  async (args) => {
    try {
      const response = await axios.post(`/v1/employees/reset-password`, {
        email: args.email,
      });
      return response.data;
    } catch (error) {
      console.error("Error initiating password reset", error);
      return error?.response?.data || "Error initiating password reset";
    }
  },
  {
    name: "initiatePasswordReset",  
    description: initiatePasswordResetPrompt,
    schema: z.object({
      email: z.string().email().describe("The email address of the employee"),
    }),
  }
);

// New department tools
const getDepartments = tool(
  async (args) => {
    try {
      const params = args.term ? { term: args.term } : {};
      const response = await axios.get(`/v1/departments`, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching departments", error);
      return error?.response?.data || "Error fetching departments";
    }
  },
  {
    name: "getDepartments",
    description: getDepartmentsPrompt,
    schema: z.object({
      term: z.string().optional().describe("Optional search term to filter departments by name"),
    }),
  }
);

const createDepartments = tool(
  async (args) => {
    try {
      const response = await axios.post(`/v1/departments`, args.departments);
      return response.data;
    } catch (error) {
      console.error("Error creating departments", error);
      return error?.response?.data || "Error creating departments";
    }
  },
  {
    name: "createDepartments",
    description: createDepartmentsPrompt,
    schema: z.object({
      departments: z.array(z.object({
        name: z.string().describe("The name of the department"),
        leadId: z.number().describe("The employee ID who is the lead of the department"),
      })),
    }),
  }
);

export const tools: DynamicStructuredTool[] = [
  getAllEmployeeData, 
  getEmployeeById, 
  createEmployees, 
  getEmployeeByEmailOrName, 
  deactivateEmployee, 
  sendInviteToEmployee, 
  moveEmployeesFromDeactivatedToActive, 
  initiatePasswordReset,
  getDepartments,
  createDepartments
];
