import { Component, type ErrorInfo, type ReactNode, Suspense } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor (props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError (_error: Error) {
    return { hasError: true };
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render () {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Suspense fallback={<p>Loading...</p>}>
          <h3>Error</h3>
        </Suspense>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
