import { Component, type ReactNode } from "react";
import * as Sentry from "@sentry/nextjs";
export interface Props {
  isRefresh?: boolean;
  fallback: React.ElementType;
  message?: string;
  onReset?: () => void;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

const initialState: State = {
  hasError: false,
  info: null,
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(error);
    }
  }

  onResetErrorBoundary = () => {
    const { onReset } = this.props;
    onReset == null ? void 0 : onReset();
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  render() {
    const { hasError, info } = this.state;
    const { children, message, isRefresh } = this.props;

    if (hasError) {
      const props = {
        error: info,
        onResetErrorBoundary: this.onResetErrorBoundary,
      };
      return (
        <this.props.fallback
          isRefresh={isRefresh}
          onRefresh={this.reset}
          onReset={props.onResetErrorBoundary}
          message={message}
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
