import { useState } from "react";
import type { Employee, EmployeeFormValues } from "./types";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeTable } from "./EmployeeTable";

import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function generateId() {
  return uuidv4().slice(0, 8);
}

export function EmployeeManager() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "e0000001",
      name: "Nguyen Van A",
      dateOfBirth: "1995-04-12",
      gender: "Male",
      email: "a.nguyen@example.com",
      address: "12 Le Loi, Q1, HCM",
    },
    {
      id: "e0000002",
      name: "Tran Thi B",
      dateOfBirth: "1998-10-30",
      gender: "Female",
      email: "b.tran@example.com",
      address: "34 Hai Ba Trung, Q1, HCM",
    },
  ]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  function createEmployee(values: EmployeeFormValues) {
    const newEmp: Employee = { id: generateId(), ...values };
    setEmployees((prev) => [newEmp, ...prev]);
    setOpenCreate(false);
  }

  function updateEmployee(values: EmployeeFormValues) {
    if (!editing) return;
    setEmployees((prev) =>
      prev.map((e) => (e.id === editing.id ? { ...e, ...values } : e))
    );
    setOpenEdit(false);
    setEditing(null);
  }

  function deleteEmployee(id: string) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-4xl text-blue-500">
            Quản lý nhân viên
          </CardTitle>
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button size="sm">+ Thêm nhân viên</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Thêm nhân viên</DialogTitle>
              </DialogHeader>
              <EmployeeForm
                onSubmit={createEmployee}
                onCancel={() => setOpenCreate(false)}
                submitLabel="Tạo mới"
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <EmployeeTable
              data={employees}
              onEdit={(emp) => {
                setEditing(emp);
                setOpenEdit(true);
              }}
              onDelete={deleteEmployee}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={openEdit}
        onOpenChange={(v) => {
          if (!v) {
            setEditing(null);
            setOpenEdit(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa nhân viên</DialogTitle>
          </DialogHeader>
          {editing && (
            <EmployeeForm
              defaultValues={{
                name: editing.name,
                dateOfBirth: editing.dateOfBirth,
                gender: editing.gender,
                email: editing.email,
                address: editing.address,
              }}
              onSubmit={updateEmployee}
              onCancel={() => {
                setOpenEdit(false);
                setEditing(null);
              }}
              submitLabel="Cập nhật"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
