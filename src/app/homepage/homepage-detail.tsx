import { Dispatch, SetStateAction } from "react";

export function HomepageDetail({
  search,
  setShow,
}: {
  search: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  return <div className="bg-red-300">{search ?? "-"}</div>;
}
