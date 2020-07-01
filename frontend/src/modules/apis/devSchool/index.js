import { create } from 'axios';
const adminToken = process.env.REACT_APP_ADMIN_TOKEN;

export const devSchoolClient = create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    Authorization: `Bearer ${adminToken}`,
  },
});
