import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="p-8 text-center">
            <h1 className="mb-4 text-2xl font-bold text-red-600">
              Oops! Something went wrong
            </h1>
            <p className="mb-4 text-gray-600">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
