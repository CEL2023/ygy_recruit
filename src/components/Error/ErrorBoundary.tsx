import Router from "next/router";
import { Component } from "react";
import { isInstanceOfAPIError } from "../../lib/appError";
import ErrorPage from "./ErrorPage";
import * as Sentry from "@sentry/nextjs";
type ErrorBoundaryProps = React.PropsWithChildren<{}>;

interface ErrorBoundaryState {
  error: Error | null;
}

const errorBoundaryState: ErrorBoundaryState = {
  error: null,
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = errorBoundaryState;
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(error);
    }
  }
  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { error };
  }

  private resetState = () => {
    this.setState(errorBoundaryState);
  };

  private setError = (error: Error) => {
    console.error(error);

    this.setState({ error });
  };

  // 전역 에러 중 캐치하지 못한 에러
  private handleError = (event: ErrorEvent) => {
    this.setError(event.error);
    event.preventDefault?.();
  };

  // promise 중 캐치하지 못한 rejection
  private handleRejectedPromise = (event: PromiseRejectionEvent) => {
    event?.promise?.catch?.(this.setError);
    event.preventDefault?.();
  };

  componentDidMount() {
    window.addEventListener("error", this.handleError);
    window.addEventListener("unhandledrejection", this.handleRejectedPromise);

    Router.events.on("routeChangeStart", this.resetState);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleError);
    window.removeEventListener(
      "unhandledrejection",
      this.handleRejectedPromise
    );

    Router.events.off("routeChangeStart", this.resetState);
  }

  render() {
    if (this.state.error) {
      const { error } = this.state;
      return <ErrorPage message={error.message} name={error.name} />;
    }

    return this.props.children;
  }
}
