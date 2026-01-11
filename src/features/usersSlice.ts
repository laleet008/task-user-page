import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  page: number;
  searchTerm: string;
  genderFilter: "all" | "male" | "female";
}

const initialState: UsersState = {
  page: 1,
  searchTerm: "",
  genderFilter: "all"
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setGenderFilter: (
      state,
      action: PayloadAction<"all" | "male" | "female">
    ) => {
      state.genderFilter = action.payload;
    },
    resetUsersState: (state) => {
      state.page = 1;
      state.searchTerm = "";
      state.genderFilter = "all";
    }
  }
});

export const {
  setPage,
  incrementPage,
  setSearchTerm,
  setGenderFilter,
  resetUsersState
} = usersSlice.actions;

export default usersSlice.reducer;
