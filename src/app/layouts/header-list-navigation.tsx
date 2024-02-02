import { H3 } from "@/component/ui";
import { listNavigation } from "@/const";
import Link from "next/link";

export function ListNavigation({ path }: { path: string }) {
  return (
    <div className="lg:flex lg:items-center lg:gap-x-8">
      {listNavigation.map((item, idx) => (
        <Link
          href={`/${item?.url}`}
          key={idx}
          className={`hover:text-sky-600 ${
            item?.url === path && "text-sky-600"
          }`}
        >
          <H3>{item?.name}</H3>
        </Link>
      ))}
    </div>
  );
}
