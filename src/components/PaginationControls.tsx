import { Pagination, Typography } from "antd";

type PaginationControlsProps = {
  page: number;
  totalItems: number;
  pageSize: number;
  isLoading?: boolean;
  onChange: (page: number) => void;
};

export const PaginationControls = ({
  page,
  totalItems,
  pageSize,
  onChange,
}: PaginationControlsProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <Typography.Text type="secondary">
        Total: {totalItems}
      </Typography.Text>
      <div className="flex items-center gap-3">
        <Pagination
          total={totalItems}
          pageSize={pageSize}
          current={page}
          onChange={onChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
