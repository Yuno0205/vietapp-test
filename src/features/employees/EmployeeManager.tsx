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
      id: "e0000003",
      name: "Le Van C",
      dateOfBirth: "1992-01-05",
      gender: "Male",
      email: "c.le@example.com",
      address: "56 Nguyen Hue, Q1, HCM",
    },
    {
      id: "e0000004",
      name: "Pham Thi D",
      dateOfBirth: "2000-07-25",
      gender: "Female",
      email: "d.pham@example.com",
      address: "78 Cach Mang Thang 8, Q3, HCM",
    },
    {
      id: "e0000005",
      name: "Hoang Van E",
      dateOfBirth: "1988-11-18",
      gender: "Male",
      email: "e.hoang@example.com",
      address: "90 Dien Bien Phu, Q3, HCM",
    },
    {
      id: "e0000006",
      name: "Do Thi F",
      address: "101 Tran Hung Dao, Q5, HCM",
      email: "f.do@example.com",
      gender: "Female",
      dateOfBirth: "1997-03-08",
    },
    {
      id: "e0000007",
      name: "Ngo Van G",
      dateOfBirth: "1990-09-14",
      gender: "Male",
      email: "g.ngo@example.com",
      address: "112 Ly Thuong Kiet, Q10, HCM",
    },
    {
      id: "e0000008",
      name: "Bui Thi H",
      dateOfBirth: "1994-06-03",
      gender: "Female",
      email: "h.bui@example.com",
      address: "123 Ba Thang Hai, Q10, HCM",
    },
    {
      id: "e0000009",
      name: "Duong Van I",
      dateOfBirth: "1985-12-20",
      gender: "Male",
      email: "i.duong@example.com",
      address: "134 Phan Dang Luu, Phu Nhuan, HCM",
    },
    {
      id: "e0000010",
      name: "Vu Thi J",
      dateOfBirth: "1996-02-17",
      gender: "Female",
      email: "j.vu@example.com",
      address: "145 Cong Hoa, Tan Binh, HCM",
    },
    {
      id: "e0000011",
      name: "Huynh Van K",
      dateOfBirth: "1993-08-11",
      gender: "Male",
      email: "k.huynh@example.com",
      address: "156 Pham Van Dong, Thu Duc, HCM",
    },
    {
      id: "e0000012",
      name: "Trinh Thi L",
      dateOfBirth: "1999-05-28",
      gender: "Female",
      email: "l.trinh@example.com",
      address: "167 Nguyen Trai, Q5, HCM",
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
