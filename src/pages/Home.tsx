import React from 'react';
import { Layout, Typography } from 'antd';
import { SearchBar } from '../components/SearchBar';
import { UserList } from '../features/UserList';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const Home: React.FC = () => {
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white shadow-sm flex items-center justify-between sticky top-0 z-50 px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          <Title level={4} style={{ margin: 0, color: '#1f2937' }}>
            UserDir
          </Title>
        </div>
      </Header>
      
      <Content className="px-4 py-8 sm:px-8 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="text-center space-y-2">
             <Title level={2} style={{ margin: 0 }}>User Directory</Title>
             <p className="text-gray-500 text-lg">Discover and connect with users worldwide</p>
          </div>
          
          <div className="sticky top-20 z-40 -mx-4 px-4 py-2 sm:static sm:mx-0 sm:px-0 sm:py-0 bg-gray-50/95 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none transition-all">
             <SearchBar />
          </div>
          
          <UserList />
        </div>
      </Content>
      
      <Footer className="text-center text-gray-500 bg-gray-50 border-t border-gray-200">
        Users Directory ©{new Date().getFullYear()} • Built with React & Ant Design
      </Footer>
    </Layout>
  );
};
