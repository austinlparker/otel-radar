import { useState, useMemo } from "react";

export function useSearch<T>(items: T[], searchFields: (item: T) => string[]) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query) return items;

    const loweredQuery = query.toLowerCase();
    return items.filter((item) =>
      searchFields(item).some((field) =>
        field.toLowerCase().includes(loweredQuery),
      ),
    );
  }, [items, query, searchFields]);

  return {
    query,
    setQuery,
    filteredItems,
    hasResults: filteredItems.length > 0,
    isSearching: query.length > 0,
  };
}
