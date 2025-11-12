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
import { useState } from "react";
import type { Employee } from "./types";

export type SortKey = "name" | "address";
export type SortDir = "asc" | "desc";

export interface EmployeeTableProps {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

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

  const sorted = [...data].sort((a, b) => {
    const valA = (a[sortKey] || "").toString().toLowerCase();
    const valB = (b[sortKey] || "").toString().toLowerCase();
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[120px]">ID</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="px-0 font-semibold hover:bg-transparent"
                onClick={() => toggleSort("name")}
              >
                Name
                <ArrowUpDown
                  className={cn(
                    "ml-2 h-4 w-4 opacity-50",
                    sortKey === "name" && "opacity-100"
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
                className="px-0 font-semibold hover:bg-transparent"
                onClick={() => toggleSort("address")}
              >
                Address
                <ArrowUpDown
                  className={cn(
                    "ml-2 h-4 w-4 opacity-50",
                    sortKey === "address" && "opacity-100"
                  )}
                />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((emp, idx) => (
            <TableRow
              key={emp.id}
              className={cn(
                idx % 2 === 0 ? "bg-muted/30" : undefined,
                "hover:bg-muted/60"
              )}
            >
              <TableCell className="font-mono text-xs text-muted-foreground">
                {emp.id}
              </TableCell>
              <TableCell className="font-medium">{emp.name}</TableCell>
              <TableCell className="whitespace-nowrap">
                {emp.dateOfBirth}
              </TableCell>
              <TableCell className="whitespace-nowrap">{emp.gender}</TableCell>
              <TableCell className="max-w-[220px] truncate">
                {emp.email}
              </TableCell>
              <TableCell className="max-w-[260px] truncate">
                {emp.address}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(emp)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(emp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {sorted.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                Chưa có nhân viên nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
