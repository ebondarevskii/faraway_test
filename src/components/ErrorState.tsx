import { Alert } from "antd";

type ErrorStateProps = {
  title?: string;
  description: string;
};

export const ErrorState = ({
  title = "Something went wrong",
  description,
}: ErrorStateProps) => {
  return (
    <Alert title={title} description={description} type="error" showIcon />
  );
};
