"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";

const SearchCommo = ({ search }: { search?: string }) => {
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 300);
  const router = useRouter();

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) router.push(`/admin/commodities`);
    else router.push(`/admin/commodities?search=${query}`);
  }, [router, query]);

  return (
    <div>
      <Input
        placeholder="Search a commodity ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
export default SearchCommo;
