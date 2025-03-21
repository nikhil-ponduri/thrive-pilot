import { tool, DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import axios from "../../../../axios";
import { getAllGoalsPrompt, getGoalByIdPrompt } from "./prompts";
/**
 * Get a goal by its ID
 * @param {string} id - The ID of the goal to retrieve
 * @returns {Object|null} A single goal object with OKR details. Returns null if not found or on error.
 */
const getGoalById = tool(async (args) => {
  try {
    const response = await axios.get(`/v1/okrs/${args.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching goals", error);
    return null;
  }
}, {
  name: "getGoalById",
  description: getGoalByIdPrompt,
  schema: z.object({
    id: z.string(),
  }),
});

/**
 * Get all goals
 * @returns {Array} Array of goal objects with detailed OKR data. Returns an empty array if none found or on error.
 */
const getAllGoals = tool(async (args) => {
  try {
    const filters: any = {
      "term": "", "filters": [{ "type": "type", "value": ["GOAL"] }], "sort": { "column": "createdAt", "order": "DESC" }, "page": 1, "limit": 50
    };
    if (args.filters) {
      if (args.filters.status?.length) {
        filters.filters.push({ type: "status", value: args.filters.status });
      }
      if (args.filters.title) {
        filters.term = args.filters.title;
      }
      if (args.filters.assigneeId?.length) {
        filters.filters.push({ type: "assigneeId", value: args.filters.assigneeId.map(String) });
      }
      if (args.filters.projectedDelay) {
        filters.filters.push({ type: "quickFilter", value: "projectedRisks" });
      }
      if (args.filters.leastProgressed) {
        filters.filters.push({ type: "quickFilter", value: "leastProgressed" });
      }
      if (args.filters.mostProgressed) {
        filters.filters.push({ type: "quickFilter", value: "mostProgressed" });
      }
    }
    const response = await axios.post("v1/okrs/list", filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching goals", error);
    return [];
  }
}, {
  name: "getAllGoals",
  description: getAllGoalsPrompt,
  schema: z.object({
    filters: z.object({
      status: z.array(z.enum(["NOT_STARTED", "IN_PROGRESS", "RISK_OF_DELAY", "DELAYED", "COMPLETED"])).optional().describe("The status of the goal").default([]),
      title: z.string().optional().describe("The title of the goal"),
      assigneeId: z.array(z.number()).optional().describe("The Assigned Employee Id's of the Goals"),
      projectedDelay: z.boolean().optional().describe("Filter the goals based on the projected delay in the completion date"),
      leastProgressed: z.boolean().optional().describe("Filter the goals based on the least progressed rate. It means Goals with the lowest progress percentage will be shown first"),
      mostProgressed: z.boolean().optional().describe("Filter the goals based on the most progressed rate. It means Goals with the highest progress percentage will be shown first"),
    }).optional().describe("The filters to apply when fetching the Goals"),
  }),
});

export const tools: DynamicStructuredTool[] = [getGoalById, getAllGoals];