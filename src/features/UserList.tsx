import React, { useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Alert, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetUsersQuery } from "../services/usersApi";
import { incrementPage } from "./usersSlice";
import { UserCard } from "../components/UserCard";
import type { RootState } from "../store/store";
import type { User } from "../types/user";

export const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { page, searchTerm, genderFilter } = useSelector(
    (state: RootState) => state.users
  );

  // Fixed seed for consistent results
  const { data, error, isFetching, isLoading } = useGetUsersQuery({
    page,
    results: 10,
    seed: "lalit-users-app",
    gender: genderFilter
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter users based on search and gender
  const filteredUsers = useMemo(() => {
    if (!data?.results) return [];

    return data.results.filter((user: User) => {
      const matchesGender =
        genderFilter === "all" || user.gender === genderFilter;

      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());

      return matchesGender && matchesSearch;
    });
  }, [data?.results, genderFilter, searchTerm]);

  // Infinite Scroll Observer
  useEffect(() => {
    // Disable infinite scroll if searching or if there's an error
    if (searchTerm || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          dispatch(incrementPage());
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the target is visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isFetching, dispatch, searchTerm, error]);

  // Initial loading state (only for first fetch if empty)
  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          tip="Loading users..."
          size="large"
        />
      </div>
    );
  }

  // Show error only if we have no data to show, otherwise show toast or small error
  if (error && !data) {
    return (
      <div className="flex justify-center mt-10">
        <Alert
          message="Error"
          description="Failed to load users. Please check your internet connection."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {filteredUsers.length === 0 && !isFetching ? (
        <div className="flex justify-center mt-10">
          <Empty description="No users found matching your criteria" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user: User) => (
            // Use login.uuid as key, but sometimes APIs return duplicates if seed is messed up.
            // With fixed seed and pagination, it should be fine.
            <div key={user.login.uuid} className="h-full">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}

      {/* Sentinel for Infinite Scroll - Hide when searching or error */}
      {!searchTerm && !error && (
        <div
          ref={observerTarget}
          className="h-20 flex justify-center items-center mt-8 w-full"
        >
          {isFetching && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              tip="Loading more..."
            />
          )}
          {!isFetching && filteredUsers.length > 0 && (
            <span className="text-gray-400 text-sm">Scroll for more</span>
          )}
        </div>
      )}

      {/* Show message when searching and end of results (client-side) */}
      {searchTerm && filteredUsers.length > 0 && (
        <div className="h-20 flex justify-center items-center mt-8 w-full text-gray-400 text-sm">
          End of search results
        </div>
      )}
    </div>
  );
};
