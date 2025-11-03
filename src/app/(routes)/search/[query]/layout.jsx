import { Suspense } from "react";
import Loading from "./loading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

function layout({ children }) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>
      </Suspense>
    </div>
  );
}
export default layout;
