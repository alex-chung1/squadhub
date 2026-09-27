import { useMemo, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Test</h1>
    </div>
  );
}
