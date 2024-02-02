"use client";

import { useState } from "react";
import { HomepageAsset, HomepageDetail, HomepageInfo } from ".";

export function Homepage() {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div className="grid grid-cols-12 gap-x-8 lg:px-24 px-10">
      <div className="lg:col-span-4 col-span-12">
        <HomepageAsset />
      </div>
      <div className="col-span-8 lg:block hidden sticky top-0 lg:sticky lg:top-0 lg:right-0 lg:h-full border-l-2 lg:pl-8 py:8">
        <div className="lg:sticky lg:top-0 lg:right-0 lg:h-[100vh] bg-white">
          {show ? <HomepageInfo /> : <HomepageDetail />}
        </div>
      </div>
    </div>
  );
}
