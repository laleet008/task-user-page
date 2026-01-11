import React from "react";
import { Card, Avatar, Typography } from "antd";
import { MailOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons";
import type { User } from "../types/user";

const { Text } = Typography;

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const fullName = `${user.name.first} ${user.name.last}`;
  const isMale = user.gender === "male";

  return (
    <Card
      hoverable
      className="w-full h-full shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
      bodyStyle={{ padding: "0px" }}
    >
      <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"></div>

      <div className="px-6 pb-6 relative">
        <div className="flex justify-center -mt-12 mb-4">
          <Avatar
            size={96}
            src={user.picture.large}
            className="border-4 border-white shadow-md bg-white"
          />
        </div>

        <div className="text-center space-y-2">
          <h3
            className="text-xl font-bold text-gray-800 m-0 truncate"
            title={fullName}
          >
            {fullName}
          </h3>

          <div className="flex items-center justify-center gap-2 text-gray-600">
            {isMale ? (
              <ManOutlined className="text-blue-500" />
            ) : (
              <WomanOutlined className="text-pink-500" />
            )}
            <span className="capitalize text-sm font-medium">
              {user.gender}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <MailOutlined />
            <Text className="text-gray-500" ellipsis={{ tooltip: user.email }}>
              {user.email}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
