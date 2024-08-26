// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const defautlAdmins = [
  {
    nickname: 'admin',
    password: 'admin',
    id: '4b81d939-1329-4892-b196-0196b99a6ef4'
  },
];

const testEvent = {
  id: 'deaf10e8-8665-4827-a9e1-4cccbee372f4',
  title: 'Open game',
  date: new Date(2024, 6, 20).toISOString(),
  location: 'Kyiv',
  admin_id: defautlAdmins[0].id,
}

const testUsers = [
  {
    nickname: 'test1',
    password: '123456',
    id: 'c38f27ad-a586-4809-8591-3a4de4048024'
  },
  {
    nickname: 'test2',
    password: '123456',
    id: '437586fa-fee7-42dc-a979-0515536505be'
  },
  {
    nickname: 'test3',
    password: '123456',
    id: '056d925f-e280-438e-9703-a7c3498f096d'
  },
  {
    nickname: 'test4',
    password: '123456',
    id: 'b30e48f6-c4e7-4038-a9e8-2547d77a0f77'
  },
  {
    nickname: 'test5',
    password: '123456',
    id: '76fbba9e-01fc-4da9-9590-57d4b05a9f30'
  },
  {
    nickname: 'test6',
    password: '123456',
    id: 'ba771834-f62b-4ea4-93c5-ec01171346b0'
  },
  {
    nickname: 'test7',
    password: '123456',
    id: 'a5515391-a228-4271-b2d4-23ca2a51f32c'
  },
  {
    nickname: 'test8',
    password : '123456',
    id: 'fb821079-72e6-40b7-b176-4077d421c1b8'
  },
];

module.exports = {
  defautlAdmins,
  testEvent,
  testUsers,
};
