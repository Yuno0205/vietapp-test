import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import type { Employee } from "./types";

export type SortKey = "name" | "address";
export type SortDir = "asc" | "desc";

export interface EmployeeTableProps {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

// Hàm helper hiển thị màu badge cho giới tính
const getGenderBadge = (gender: string) => {
  switch (gender) {
    case "Male":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Female":
      return "bg-pink-100 text-pink-700 border-pink-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

// Hàm format date đơn giản (YYYY-MM-DD -> DD/MM/YYYY)
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};

export function EmployeeTable(props: EmployeeTableProps) {
  const { data, onEdit, onDelete } = props;
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const valA = (a[sortKey] || "").toString().toLowerCase();
      const valB = (b[sortKey] || "").toString().toLowerCase();
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortDir, sortKey]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-slate-50/50">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="-ml-4 h-8 font-semibold hover:bg-slate-100"
                onClick={() => toggleSort("name")}
              >
                Name
                <ArrowUpDown
                  className={cn(
                    "ml-2 h-3 w-3 opacity-50 transition-transform",
                    sortKey === "name" && sortDir === "desc" && "rotate-180"
                  )}
                />
              </Button>
            </TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="-ml-4 h-8 font-semibold hover:bg-slate-100"
                onClick={() => toggleSort("address")}
              >
                Address
                <ArrowUpDown
                  className={cn(
                    "ml-2 h-3 w-3 opacity-50 transition-transform",
                    sortKey === "address" && sortDir === "desc" && "rotate-180"
                  )}
                />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((emp) => (
            <TableRow key={emp.id} className="hover:bg-slate-50">
              <TableCell className="font-mono text-xs text-slate-500">
                {emp.id}
              </TableCell>
              <TableCell className="font-medium text-slate-900">
                {emp.name}
              </TableCell>
              <TableCell className="whitespace-nowrap text-slate-600">
                {formatDate(emp.dateOfBirth)}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    getGenderBadge(emp.gender)
                  )}
                >
                  {emp.gender}
                </span>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-slate-600">
                {emp.email}
              </TableCell>
              <TableCell className="max-w-[250px] truncate text-slate-600">
                {emp.address}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => onEdit(emp)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(emp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {sorted.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <p>Không tìm thấy nhân viên nào phù hợp.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
