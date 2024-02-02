import { H6 } from "@/component/ui";
import { listNavigation } from "@/const";
import Link from "next/link";

export function MobileListNavigation({ path }: { path: string }) {
  return (
    <div className="flex fixed bottom-0 left-0 border-t-2 bg-white w-full min-h-[10vh] p-4">
      {listNavigation.map((item, idx) => (
        <Link
          href={`/${item?.url}`}
          key={idx}
          className={`hover:text-sky-600 flex-1 flex flex-col items-center justify-center ${
            item?.url === path && "text-sky-600"
          }`}
        >
          <span>{item?.icon}</span>
          <H6>{item?.name}</H6>
        </Link>
      ))}
    </div>
  );
}