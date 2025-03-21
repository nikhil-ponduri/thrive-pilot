
import { tool, DynamicStructuredTool } from "@langchain/core/tools";
import { z } from 'zod';
import axios from '../../../../axios';

const getEmployeeData = tool(
  async (args) => {
    try {
      const response = await axios.get(`/v1/employees`);
      console.log(response.data);
      return [{
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
        phone: "+1234567890",
        address: "123 Main St, Anytown, USA", 
        department: "Engineering",
        role: "Software Engineer",
      }];
    } catch (error) {
      console.error("Error fetching employees", error);
      return [];
    }
  },
  {
    name: "getAllEmployees",
    description: "Get All Employees Data",
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
      id: z.number(),
    }),
  }
);  

export const tools: DynamicStructuredTool[] = [getEmployeeData, getEmployeeById];
