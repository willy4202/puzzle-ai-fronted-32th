import {useState, useRef, useEffect} from 'react';
import {getToken} from '../AuthContext';

function usePagination(renderItemNum: number, url: string) {
  const [paginationItem, setPaginationItem] = useState([]);

  const pageNum = useRef(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}?page=1&limit=${renderItemNum}`, {
        headers: {Authorization: await getToken()},
      });
      if (response.status === 200) {
        const result = await response.json();
        setPaginationItem(paginationItem.concat(result.result));
        pageNum.current++;
      }
    };

    fetchData();
  }, []);

  const addList = async () => {
    const response = await fetch(
      `${url}?page=${pageNum.current}&limit=${renderItemNum}`,
      {
        headers: {Authorization: await getToken()},
      },
    );
    if (response.status === 200) {
      const result = await response.json();
      setPaginationItem(paginationItem.concat(result.result));
      pageNum.current++;
    }
  };
  return {
    paginationItem,
    addList,
  };
}

export default usePagination;
