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
            item?.url === path ? "text-sky-600" : "text-black"
          }`}
        >
          <h5 className="text-md font-light font-serif tracking-wider">
            {item?.name}
          </h5>
        </Link>
      ))}
    </div>
  );
}
