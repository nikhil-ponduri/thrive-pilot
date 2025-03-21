
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
