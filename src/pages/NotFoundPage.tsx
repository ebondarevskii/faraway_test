import { Button, Typography } from "antd";
import { Link as RouterLink } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-20 text-center">
      <div className="flex flex-col items-center gap-3">
        <img
          src="/404-chewbacca.png"
          alt="Lost in the galaxy"
          className="h-48 w-auto object-contain"
        />
        <Typography.Title level={2}>Page not found</Typography.Title>
        <Button type="primary">
          <RouterLink to="/">Go to characters</RouterLink>
        </Button>
      </div>
    </div>
  );
};
