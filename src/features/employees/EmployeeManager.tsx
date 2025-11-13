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
  DialogDescription,
  DialogFooter,
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
    {
      id: "e0000003",
      name: "Le Van C",
      dateOfBirth: "1990-07-22",
      gender: "Male",
      email: "c.le@example.com",
      address: "56 Dinh Tien Hoang, Binh Thanh, HCM",
    },
    {
      id: "e0000004",
      name: "Pham Thi D",
      dateOfBirth: "2000-01-15",
      gender: "Female",
      email: "d.pham@example.com",
      address: "789 Nguyen Kiem, Phu Nhuan, HCM",
    },
    {
      id: "e0000005",
      name: "Hoang Van E",
      dateOfBirth: "1988-11-05",
      gender: "Male",
      email: "e.hoang@example.com",
      address: "101 Vo Van Tan, Q3, HCM",
    },
    {
      id: "e0000006",
      name: "Do Thi F",
      dateOfBirth: "1993-02-28",
      gender: "Female",
      email: "f.do@example.com",
      address: "22 Ly Tu Trong, Q1, HCM",
    },
    {
      id: "e0000007",
      name: "Vu Van G",
      dateOfBirth: "1997-09-10",
      gender: "Male",
      email: "g.vu@example.com",
      address: "33 Nguyen Trai, Q5, HCM",
    },
    {
      id: "e0000008",
      name: "Bui Thi H",
      dateOfBirth: "1992-12-19",
      gender: "Other",
      email: "h.bui@example.com",
      address: "45 Mac Dinh Chi, Da Kao, Q1, HCM",
    },
  ]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

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

  function handleConfirmDelete() {
    if (deleteTargetId) {
      deleteEmployee(deleteTargetId);
    }
    setDeleteTargetId(null);
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
              onDelete={(id) => setDeleteTargetId(id)}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={!!deleteTargetId}
        onOpenChange={(v) => {
          if (!v) setDeleteTargetId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xoá nhân viên</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xoá nhân viên này không? Hành động này không
              thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTargetId(null)}>
              Huỷ
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Xác nhận xoá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
