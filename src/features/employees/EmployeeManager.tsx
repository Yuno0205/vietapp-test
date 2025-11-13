import { useState } from "react";
import { EmployeeForm } from "./EmployeeForm";
import type { Employee, EmployeeFormValues } from "./types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";

function generateId() {
  return uuidv4().slice(0, 8);
}

export function EmployeeManager() {
  const [, setEmployees] = useState<Employee[]>([
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
    <div className="container mx-auto max-w-6xl p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Quản lý nhân viên
          </h1>
          <p className="text-slate-500">Quản lý thông tin nhân sự và hồ sơ</p>
        </div>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button>+ Thêm nhân viên</Button>
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
      </div>

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
