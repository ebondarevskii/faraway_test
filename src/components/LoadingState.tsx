import { Spin, Typography } from 'antd'

type LoadingStateProps = {
  message?: string
}

export const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Spin size="large" />
      <Typography.Text type="secondary">
        {message}
      </Typography.Text>
    </div>
  )
}
