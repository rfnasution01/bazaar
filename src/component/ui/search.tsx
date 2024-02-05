"use client";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export function Searching({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const debouncedSearch = debounce((newValue: string) => {
    setValue(newValue);
  }, 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    debouncedSearch(newValue);
    setIsInputEmpty(newValue === "");
  };

  const handleClearInput = () => {
    setValue("");
    setIsInputEmpty(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="pl-10 pr-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
        placeholder="Search..."
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600 pointer-events-none">
        <Search color="grey" />
      </span>
      {!isInputEmpty && (
        <span
          className="absolute inset-y-0 right-0 flex justify-end pr-4 w-full items-center text-gray-600 hover:cursor-pointer"
          onClick={handleClearInput}
        >
          <X />
        </span>
      )}
    </div>
  );
}
