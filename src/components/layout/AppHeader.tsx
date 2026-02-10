import { Layout, Typography } from "antd";
import { Link as RouterLink } from "react-router-dom";
import { cn } from "@lib/cn";

export const AppHeader = () => {
  return (
    <Layout.Header
      className={cn(
        "sticky top-0 z-10 border-b border-yellow-400/20 bg-black/80 shadow-sm backdrop-blur",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4",
        )}
      >
        <RouterLink to="/" className={cn("flex items-center gap-3")}>
          <img
            src="/star-wars-logo.svg"
            alt="Star Wars"
            className={cn("h-12 w-auto")}
          />
          <Typography.Text
            className={cn(
              "text-xs uppercase tracking-[0.4em] text-yellow-300/80 sm:text-sm",
            )}
          >
            Far far away...
          </Typography.Text>
        </RouterLink>
      </div>
    </Layout.Header>
  );
};
