import { tool, DynamicStructuredTool } from "@langchain/core/tools";
import { z } from 'zod';
import axios from '../../../../axios';
import { getAllEmployeeDataPrompt, getEmployeeByIdPrompt, createEmployeesPrompt, getEmployeeByEmailOrNamePrompt, deactivateEmployeePrompt } from './prompts';

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

export const tools: DynamicStructuredTool[] = [getAllEmployeeData, getEmployeeById, createEmployees, getEmployeeByEmailOrName, deactivateEmployee];
