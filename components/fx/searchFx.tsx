"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";

const SearchFx = ({ search }: { search?: string }) => {
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 300);
  const router = useRouter();

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) router.push(`/admin/fxrates`);
    else router.push(`/admin/fxrates?search=${query}`);
  }, [router, query]);

  return (
    <div>
      <Input
        placeholder="Search a Fx Rate by country name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
export default SearchFx;
