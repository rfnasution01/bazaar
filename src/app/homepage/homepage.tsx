"use client";

import { useState } from "react";
import { HomepageDetail, HomepageInfo } from ".";

export function Homepage() {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div className="grid grid-cols-12 gap-x-8 lg:px-24 px-10 min-h-[80vh] max-h-[80vh]">
      <div className="lg:col-span-4 col-span-12 bg-red-300">Test</div>
      <div className="col-span-8 hidden lg:block">
        {show ? <HomepageInfo /> : <HomepageDetail />}
      </div>
    </div>
  );
}
