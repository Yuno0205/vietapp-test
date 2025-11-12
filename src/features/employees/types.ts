export type Gender = "Male" | "Female" | "Other";

export interface Employee {
  id: string;
  name: string;
  dateOfBirth: string; // ISO yyyy-mm-dd
  gender: Gender;
  email: string;
  address: string;
}

export type EmployeeFormValues = Omit<Employee, "id">;
