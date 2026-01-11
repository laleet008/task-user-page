import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserResponse } from '../types/user';

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://randomuser.me/api/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<
      UserResponse,
      { page: number; results: number; seed: string; gender: string }
    >({
      query: ({ page, results, seed }) =>
        `?page=${page}&results=${results}&seed=${seed}&inc=name,email,picture,gender,login`,
      // Map queries to cache entry based on gender to allow fresh start
      serializeQueryArgs: ({ queryArgs }) => {
        return `users-${queryArgs.gender}`;
      },
      // Append new data to existing cache
      merge: (currentCache, newItems) => {
        // If it's the first page, we might want to reset, but since we rely on infinite scroll
        // and fixed seed, we generally just append.
        // To prevent duplicates if page 1 is re-fetched effectively (though forceRefetch handles args change),
        // we can check if the incoming page is already handled.
        // But simpler logic: if incoming page > currentCache.info.page, append.
        // If incoming page === 1, replace (restart).
        if (newItems.info.page === 1) {
          currentCache.results = newItems.results;
          currentCache.info = newItems.info;
        } else if (newItems.info.page > currentCache.info.page) {
          currentCache.results.push(...newItems.results);
          currentCache.info = newItems.info;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      }
    })
  })
});

export const { useGetUsersQuery } = usersApi;
