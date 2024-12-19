import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div
              className="bg-white dark:bg-slate-950/90
                          border border-slate-200 dark:border-blue-600/20
                          rounded-lg p-6 space-y-6"
            >
              {/* Error Icon */}
              <div className="flex justify-center">
                <div
                  className="w-16 h-16 rounded-full
                              bg-red-100 dark:bg-red-900/20
                              flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="w-8 h-8 text-red-500"
                  />
                </div>
              </div>

              {/* Error Message */}
              <div className="text-center space-y-2">
                <h2
                  className="text-xl font-semibold
                             text-slate-900 dark:text-white"
                >
                  Something went wrong
                </h2>
                <p className="text-sm text-slate-600 dark:text-blue-200">
                  {this.state.error?.message || "An unexpected error occurred"}
                </p>
              </div>

              {/* Error Details (collapsed by default) */}
              {this.state.errorInfo && (
                <details
                  className="text-xs bg-slate-50 dark:bg-blue-900/20
                                  rounded p-2 space-y-1"
                >
                  <summary
                    className="cursor-pointer text-slate-700 dark:text-blue-300
                                    hover:text-slate-900 dark:hover:text-blue-200"
                  >
                    Technical Details
                  </summary>
                  <pre
                    className="mt-2 overflow-auto p-2
                                text-slate-600 dark:text-blue-300
                                whitespace-pre-wrap break-words"
                  >
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={this.handleRefresh}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg
                           bg-blue-500 hover:bg-blue-600
                           text-white font-medium
                           transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faRotateRight} className="w-4 h-4" />
                  Refresh Page
                </button>
                <a
                  href="https://github.com/austinlparker/otel-radar/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg
                           text-slate-600 dark:text-blue-300
                           hover:text-slate-900 dark:hover:text-blue-200
                           border border-slate-200 dark:border-blue-600/20
                           hover:border-slate-300 dark:hover:border-blue-500/30
                           transition-colors duration-200"
                >
                  Report Issue
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
