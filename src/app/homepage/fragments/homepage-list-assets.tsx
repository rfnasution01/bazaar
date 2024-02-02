import { AssetsProps } from "@/component/props";

export function ListAssets({ assets }: { assets: AssetsProps[] }) {
  return (
    <div className="">
      {assets?.map((item, idx) => (
        <div className="" key={idx}>
          {item?.id}
        </div>
      ))}
    </div>
  );
}
