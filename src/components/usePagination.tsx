import {useState, useRef, useEffect} from 'react';
import {config} from '../config';
import {getToken} from '../AuthContext';

function usePagination(renderItemNum: number) {
  const [paginationItem, setPaginationItem] = useState([]);

  const pageNum = useRef(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${config.docList}/list?page=1&limit=${renderItemNum}`,
        {
          headers: {Authorization: await getToken()},
        },
      );
      if (response.status === 200) {
        const result = await response.json();
        setPaginationItem(paginationItem.concat(result.result));
      }
    };

    fetchData();
  }, []);

  const addList = async () => {
    pageNum.current++;

    const response = await fetch(
      `${config.docList}/list?page=${pageNum.current}&limit=${renderItemNum}`,
      {
        headers: {Authorization: await getToken()},
      },
    );
    if (response.status === 200) {
      const result = await response.json();
      setPaginationItem(paginationItem.concat(result.result));
    }
  };
  return {
    paginationItem,
    addList,
  };
}

export default usePagination;
