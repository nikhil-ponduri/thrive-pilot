import { DynamicStructuredTool, tool } from "@langchain/core/tools";
import { z } from "zod";
import { getAllHighFivesPrompt, getAllHighOfEmployeePrompt, getHighFivesReceivedByEmployeePrompt, getHighFivesSentByEmployeePrompt } from "./prompt";
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
    employeeId: z.number().describe('The ID of the employee to get the high fives received by which is a number'),
  }),
}); 

export const getHighFivesSentByEmployee = tool(async (args) => {
  const response = await axios.post(`/v1/kudos/search?senderId=${args.employeeId}&type=SENDER`, );
  return response.data;
}, {
  name: 'getHighFivesSentByEmployee',
  description: getHighFivesSentByEmployeePrompt,
  schema: z.object({
    employeeId: z.number().describe('The ID of the employee to get the high fives sent by which is a number'),
  }),
});

export const getAllHighOfEmployee = tool(async (args) => {
  const [receivedHighFives, sentHighFives] = await Promise.all([
    axios.post(`/v1/kudos/search?userId=${args.employeeId}&type=RECEIVER`),
    axios.post(`/v1/kudos/search?senderId=${args.employeeId}&type=SENDER`)
  ]);
  return {
    receivedHighFives: receivedHighFives.data,
    sentHighFives: sentHighFives.data
  };
}, {
  name: 'getAllHighOfEmployee',
  description: getAllHighOfEmployeePrompt,
  schema: z.object({
    employeeId: z.number().describe('The ID of the employee to get the high fives'),
  }),
});

export const tools: DynamicStructuredTool[] = [
  getAllHighFives,
  getHighFivesReceivedByEmployee,
  getHighFivesSentByEmployee,
  getAllHighOfEmployee
];
