import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setGenderFilter, setPage } from '../features/usersSlice';
import type { RootState } from '../store/store';
import { useDebounce } from '../hooks/useDebounce';

const { Option } = Select;

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { genderFilter } = useSelector((state: RootState) => state.users);
  
  // Local state for immediate input feedback
  const [localSearch, setLocalSearch] = useState('');
  
  // Debounce the local search term
  const debouncedSearch = useDebounce(localSearch, 500);

  // Dispatch to Redux when debounced value changes
  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearch));
    // Note: We intentionally do NOT scroll to top on search to prevent jumpiness
  }, [debouncedSearch, dispatch]);

  const handleGenderChange = (value: 'all' | 'male' | 'female') => {
    dispatch(setGenderFilter(value));
    dispatch(setPage(1));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1">
        <Input
          size="large"
          placeholder="Search by name..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          allowClear
          className="w-full"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select
          size="large"
          value={genderFilter}
          onChange={handleGenderChange}
          className="w-full"
        >
          <Option value="all">All Genders</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </div>
    </div>
  );
};
