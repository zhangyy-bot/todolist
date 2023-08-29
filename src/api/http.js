import axios from 'axios';
import { baseUrl } from '@/api/config';

export const request = (url, ...rest) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        ...rest,
        url: baseUrl + url,
      })
      .then((res) => {
        const { data, status } = res || {};
        if (status >= 200 && status < 300) {
          resolve(data);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
