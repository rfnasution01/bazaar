import { ArrowLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function HomepageDetailBreadcrumb({
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="flex items-center gap-2 hover:cursor-pointer hover:text-stone-600 mb-3"
      onClick={() => setShow(true)}
    >
      <span>
        <ArrowLeft />
      </span>
      <h4 className="text-lg font-medium tracking-widest">Back</h4>
    </div>
  );
}
