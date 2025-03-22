import { DynamicStructuredTool, tool } from "@langchain/core/tools";
import { z } from "zod";
import { getAllHighFivesPrompt, getHighFivesReceivedByEmployeePrompt, getHighFivesSentByEmployeePrompt } from "./prompt";
import axios from '../../../../axios';

export const getAllHighFives = tool(async (args) => {
  const response = await axios.get('/v1/kudos?pageSize=200');
  return response.data;
}, {
  name: 'getAllHighFives',
  description: getAllHighFivesPrompt,
  schema: z.object({
    dummy: z.boolean().optional().describe("Dummy parameter that is not used").default(true),
  }),
});

export const getHighFivesReceivedByEmployee = tool(async (args) => {
  const response = await axios.post(`/v1/kudos/search?userId=${args.employeeId}&type=RECEIVER`);
  return response.data;
}, {
  name: 'getHighFivesReceivedByEmployee',
  description:  getHighFivesReceivedByEmployeePrompt,
  schema: z.object({
    employeeId: z.string().describe('The id of the employee to get the high fives received by'),
  }),
}); 

export const getHighFivesSentByEmployee = tool(async (args) => {
  const response = await axios.post(`/v1/kudos/search?senderId=${args.employeeId}&type=SENDER`, );
  return response.data;
}, {
  name: 'getHighFivesSentByEmployee',
  description: getHighFivesSentByEmployeePrompt,
  schema: z.object({
    employeeId: z.string().describe('The id of the employee to get the high fives sent by'),
  }),
});

export const tools: DynamicStructuredTool[] = [
  getAllHighFives,
  getHighFivesReceivedByEmployee,
  getHighFivesSentByEmployee
];
