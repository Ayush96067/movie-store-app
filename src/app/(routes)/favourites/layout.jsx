import { Suspense } from "react";
import Loading from "./loading";

function layout({ children }) {
  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
export default layout;
