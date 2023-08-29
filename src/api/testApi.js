import { request } from '@/api/http';

// 接口测试
export const getTestApi = () =>
  request({
    url: '/v9/supplier/category/std/list',
    method: 'POST',
  });
