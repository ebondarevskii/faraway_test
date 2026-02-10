import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

type BirthYearFieldProps = {
  value: string;
  onChange: (s: string) => void;
  id: string;
};

export const BirthYearField = ({
  value,
  onChange,
  id,
}: BirthYearFieldProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const isYear = /^\d{4}$/.test(value?.trim() ?? "");

  if (!isYear && !showPicker) {
    return (
      <Input
        id={id}
        readOnly
        value={value}
        onClick={() => setShowPicker(true)}
        className="cursor-pointer"
      />
    );
  }

  return (
    <DatePicker
      id={id}
      picker="year"
      format="YYYY"
      className="w-full"
      value={isYear ? dayjs(value, "YYYY") : null}
      open={showPicker ? true : undefined}
      onChange={(_, dateString) => {
        onChange(dateString ?? "");
        setShowPicker(false);
      }}
      onOpenChange={(open) => {
        if (!open) setShowPicker(false);
      }}
    />
  );
};
