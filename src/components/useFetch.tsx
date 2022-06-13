import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {getToken} from '~/src/AuthContext';

interface UseFetchResult<T> {
  fetchData: T;
}

function useFetch<T = unknown>(
  url: string,
  method: string,
  pages: string,
  postData: unknown,
): UseFetchResult<T> {
  const [fetchData, setFetchData] = useState<T>({} as T);

  useEffect(() => {
    const startFetch = async (url: string, method: string) => {
      const response = await fetch(url, {
        method: method === 'POST' ? 'POST' : 'GET',
        headers: {Authorization: await getToken()},
        body: postData ? JSON.stringify(postData) : undefined,
      });
      if (response.status === 200) {
        const result = await response.json();
        if (pages === 'DocScheme') {
          const CHANGEWEEKS = [1, 2, 3, 4, 5, 6, 0];
          setFetchData(prev => ({
            ...prev,
            result: result.result.map((el: number) => CHANGEWEEKS[el]),
          }));
        } else {
          setFetchData(result);
        }
      } else {
        Alert.alert('로그인을 다시 시도해주세요');
      }
    };
    startFetch(url, method);
  }, [url, postData]);

  return {fetchData};
}

export default useFetch;
