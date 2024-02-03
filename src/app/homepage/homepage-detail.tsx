import { Dispatch, SetStateAction } from "react";

export function HomepageDetail({
  id,
  setShow,
}: {
  id: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  return <div className="bg-red-300">{id ?? "-"}</div>;
}
