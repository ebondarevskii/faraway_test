import { Spin, Typography } from "antd";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getPeople, getPersonId } from "@api/swapi";
import { CharacterGrid } from "@components/CharacterGrid";
import { ErrorState } from "@components/ErrorState";
import { LoadingState } from "@components/LoadingState";
import { PaginationControls } from "@components/PaginationControls";
import { SearchBar } from "@components/SearchBar";
import { getLocalEdits } from "@lib/localEdits";
import type { SwapiPerson } from "@app-types/swapi";

const pageSize = 10;

export const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const search = searchParams.get("search") ?? "";

  const updateParams = (nextPage: number, nextSearch: string) => {
    const params = new URLSearchParams();
    params.set("page", String(nextPage));
    const trimmedSearch = nextSearch.trim();
    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    }
    setSearchParams(params, { replace: true });
  };

  const handlePageChange = (nextPage: number) => {
    updateParams(nextPage, search);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const detailsQuery = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    }
    return `?${params.toString()}`;
  }, [page, search]);

  const query = useQuery({
    queryKey: ["people", page, search],
    queryFn: () => getPeople(page, search),
    placeholderData: keepPreviousData,
  });

  const peopleWithEdits = useMemo(() => {
    if (!query.data) {
      return [];
    }
    return query.data.results.map((person): SwapiPerson => {
      const id = getPersonId(person.url);
      const localEdits = getLocalEdits(id);
      return localEdits ? { ...person, ...localEdits } : person;
    });
  }, [query.data]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-6">
        <div>
          <Typography.Title
            level={2}
            className="mb-1! text-yellow-300 drop-shadow-[0_0_18px_rgba(245,197,24,0.25)]"
          >
            Characters
          </Typography.Title>
        </div>

        <SearchBar
          initialValue={search}
          onSearch={(value) => {
            updateParams(1, value);
          }}
        />

        {query.isPending ? (
          <LoadingState message="Loading characters..." />
        ) : query.isError ? (
          <ErrorState
            description={
              query.error instanceof Error
                ? query.error.message
                : "Couldn't load list"
            }
          />
        ) : query.data.results.length === 0 ? (
          <Typography.Text type="secondary">No results</Typography.Text>
        ) : (
          <div className="relative">
            <div className={query.isFetching ? "opacity-40" : ""}>
              <CharacterGrid
                people={peopleWithEdits}
                detailsQuery={detailsQuery}
              />
            </div>
            {query.isFetching ? (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <Spin size="large" />
              </div>
            ) : null}
          </div>
        )}

        <PaginationControls
          page={page}
          totalItems={query.data?.count ?? 0}
          pageSize={pageSize}
          isLoading={query.isFetching}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
