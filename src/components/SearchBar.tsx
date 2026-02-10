import { Button, Input, Space } from "antd";
import { useEffect, useState } from "react";

type SearchBarProps = {
  initialValue: string;
  onSearch: (value: string) => void;
};

export const SearchBar = ({ initialValue, onSearch }: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);
  const isSearchApplied = initialValue.trim().length > 0;

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <Space className="w-full" size="middle" direction="horizontal" wrap>
        <Input
          placeholder="Search by name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          allowClear
          className="w-full"
        />
        <Button htmlType="submit" type="primary" disabled={value.trim().length === 0}>
          Search
        </Button>
        <Button
          onClick={() => {
            setValue("");
            onSearch("");
          }}
          disabled={!isSearchApplied}
        >
          Clear
        </Button>
      </Space>
    </form>
  );
};
