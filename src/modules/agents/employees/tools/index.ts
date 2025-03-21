
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
    description: "Get All Employees Data of the Company/Account",
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
    description: "Get Employee Data by id",
    schema: z.object({
      id: z.number().describe("The id of the employee"),
    }),
  }
);

export const tools: DynamicStructuredTool[] = [getAllEmployeeData, getEmployeeById];
