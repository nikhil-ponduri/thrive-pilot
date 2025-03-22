
export const getAllHighFivesPrompt = `
    Get All HighFives Data in the Company/Organization. Returns an array of high five objects or an empty array if none found.

    Response Structure:

    [{
     totalCount: number,
     id: bigint;  // The id of the high five
  senderProfile: any;  // The sender profile of the high five
  receivedPoints: number;  // The points received by the user
  message: string;  // The message of the high five
  visibility: string;  // The visibility of the high five
  channelName: string;  // The channel name of the high five
  approvalStatus: boolean;  // The approval status of the high five
  attributes: object[];  // The attributes of the high five
  createdAt: Date;  // The date and time when the high five was created
  employeePoints: object[];  // The employee points allocated for the highfive
    }]
`;  

export const getHighFivesReceivedByEmployeePrompt = `
    Get All HighFives Data Received by an Specific Employee from other Employees in the Company/Organization. Returns an array of high five objects or an empty array if none found.
  

    It will accept the employeeId as a parameter and it will be a number.

    Response Structure:

  \`\`\`json
  {
    highfives: [ // Array of high five objects. Expect empty array if none found.
      {
        id: bigint; // The id of the high five
        senderProfile: any; // The sender profile of the high five
        receivedPoints: number; // The points received by the user
        message: string; // The message of the high five
        visibility: string; // The visibility of the high five
        channelName: string; // The channel name of the high five
        approvalStatus: boolean; // The approval status of the high five
        attributes: object[]; // The attributes of the high five
        createdAt: Date; // The date and time when the high five was created
        employeePoints: object[]; // The employee points allocated for the highfive
    }
    ],
    totalCount: number; // The total number of high fives received by the employee
    approvedPoints: number; // The total points approved for the high fives received by the employee
    totalPoints: number; // The total points received by employee for the highfives he has received
    reactionPoints: number; // The total points received by employee for the highfives he has received by emoji reactions
}
\`\`\`
`;

export const getHighFivesSentByEmployeePrompt = `
    Get All HighFives Sent by an Specific Employee to other Employees in the Company/Organization. Returns an array of high five objects or an empty array if none found.

    It will accept the employeeId as a parameter and it will be a number.

    Response Structure:

    \`\`\`json
    {
    granted: HighfiveGivenTransformType[]; // Array of high five objects granted by the employee, expect empty array if none found.
    grantedPoints: number; // The total points granted for the high fives by the employee
    totalCount: number; // The total number of high fives
    }
    \`\`\`
`;  

export const getAllHighOfEmployeePrompt = `
    Get All HighFives Sent and Received HighFives of an Specific Employee in the Company/Organization. Returns an array of high five objects or an empty array if none found.

    It will accept the employeeId as a parameter and it will be a number.

    Response Structure:

   \`\`\`json
   {
        receivedHighFives: [ // Array of high five objects received by the employee, expect empty array if none found.
        {
    highfives: [ // Array of high five objects. Expect empty array if none found.
      {
        id: bigint; // The id of the high five
        senderProfile: any; // The sender profile of the high five
        receivedPoints: number; // The points received by the user
        message: string; // The message of the high five
        visibility: string; // The visibility of the high five
        channelName: string; // The channel name of the high five
        approvalStatus: boolean; // The approval status of the high five
        attributes: object[]; // The attributes of the high five
        createdAt: Date; // The date and time when the high five was created
        employeePoints: object[]; // The employee points allocated for the highfive
    }
    ],
    totalCount: number; // The total number of high fives received by the employee
    approvedPoints: number; // The total points approved for the high fives received by the employee
    totalPoints: number; // The total points received by employee for the highfives he has received
    reactionPoints: number; // The total points received by employee for the highfives he has received by emoji reactions
}
        ]; 
       
       
        sentHighFives: [ // Array of high five objects sent by the employee, expect empty array if none found.
          {
    granted: HighfiveGivenTransformType[]; // Array of high five objects granted by the employee, expect empty array if none found.
    grantedPoints: number; // The total points granted for the high fives by the employee
    totalCount: number; // The total number of high fives
    }
        ]; 
    }
`;        