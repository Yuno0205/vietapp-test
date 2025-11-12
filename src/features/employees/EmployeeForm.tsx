import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { EmployeeFormValues, Gender } from "./types";

const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  dateOfBirth: z.string().min(1, "Vui lòng chọn ngày sinh"),
  gender: z.enum(["Male", "Female", "Other"]),
  email: z.string().email("Email không hợp lệ"),
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
});

export type EmployeeFormSchema = z.infer<typeof schema>;

export interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeFormValues>;
  onSubmit: (values: EmployeeFormSchema) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function EmployeeForm(props: EmployeeFormProps) {
  const { defaultValues, onSubmit, onCancel, submitLabel = "Lưu" } = props;

  const form = useForm<EmployeeFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      gender: "Male",
      email: "",
      address: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...form.getValues(), ...defaultValues });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const handleSubmit = form.handleSubmit((values) => onSubmit(values));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Nhập họ tên"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...form.register("dateOfBirth")}
          />
          {form.formState.errors.dateOfBirth && (
            <p className="text-sm text-red-500">
              {form.formState.errors.dateOfBirth.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            onValueChange={(v: Gender) => form.setValue("gender", v)}
            defaultValue={form.getValues("gender")}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Chọn giới tính" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.gender && (
            <p className="text-sm text-red-500">
              {form.formState.errors.gender.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          rows={3}
          placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố"
          {...form.register("address")}
        />
        {form.formState.errors.address && (
          <p className="text-sm text-red-500">
            {form.formState.errors.address.message}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Huỷ
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
