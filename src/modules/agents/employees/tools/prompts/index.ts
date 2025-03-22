export const getAllEmployeeDataPrompt = `
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
    `

export const getEmployeeByIdPrompt = `
    Get Employee Data by id
    
    Returns a comprehensive employee object containing:
    - Basic info: id, fullName, nickName, email, empId, phone, status
    - Media: profilePicUrl, coverPicUrl
    - Organization: companyId, designationId, managerId
    - Relationships: manager object, designation object, department object with lead
    - Roles: employeeRoles array with role details
    - Custom data: customPropertiesArray with properties like DOB, gender, location
    `


export const createEmployeesPrompt = `
    To Create Employees in the Company/Account. It can create multiple employees at once.

    The response format will be a list of employees after creation
    - id: Unique identifier for the employee
    - fullName: Full name of the employee
    - nickName: Nickname or username
    - email: Email address
    - empId: Employee ID (e.g., E600)
    - phone: Phone number (may be null)
    - status: Current status (e.g., ONBOARDED)
    - profilePicUrl: URL to profile picture
    `

export const getEmployeeByEmailOrNamePrompt = `
  Get employee information by email address or name. Use this tool when:
  - Checking if an employee exists in the system
  - Verifying an email address
  - Looking up employee details by email or name
  - Confirming if a specific email is registered
    
  The response will be an array of matching employees with the following fields:
  - id: Unique identifier for the employee
  - fullName: Full name of the employee
  - nickName: Nickname or username
  - email: Email address
  - empId: Employee ID (e.g., E600)
  - phone: Phone number (may be null)
  - status: Current status (e.g., ONBOARDED)
  - profilePicUrl: URL to profile picture
    
  If no employees are found matching the search term, an empty array will be returned.
  `


export const deactivateEmployeePrompt = `
    Deactivate Employee by Id, It can deactivate multiple employees at once
    
    The response format will be a boolean value indicating the success of the operation
    `


export const sendInviteToEmployeePrompt = `
  This function can be used to invite all employees at once or invite specific employees by providing the ids of the employees to invite who are in not invites state

  When we need to invite all employees at once, We can use sendInviteToEveryone as true and ids as empty array or We can use sendInviteToEveryone as false and ids as the ids of the employees to invite

  The response will be a boolean value indicating the success of the operation
  `

export const moveEmployeesFromDeactivatedToActivePrompt = `
  Move Employees from Deactivated State to Active State. Or Activate an employee who is already in the system

  Pass the ids of the employees to activate as an array

  The response will be number of employees moved to active state
  `

export const initiatePasswordResetPrompt = `
  Initiate Password Reset for an employee by email address. This will send the password reset link to the employee's email address

  The response will be a boolean value indicating the success of the operation
  `

export const getDepartmentsPrompt = `
  Get departments of the organization. 
  
  Optional: Provide a search term to filter departments by name.
  
  The response will be an array of departments with details like:
  - id: Department identifier
  - name: Department name
  - leadId: ID of the department lead/manager
  - lead: Object containing details about the department lead
`;

export const createDepartmentsPrompt = `
  Create multiple departments at once for the organization.
  
  Each department requires:
  - name: Name of the department
  - leadId: The employee ID who will be the lead/manager of the department

  ** NOTE **
    - If there is no lead info provided, you can ask the user for the lead info.
  
  The response will be an array of the newly created departments.
`;