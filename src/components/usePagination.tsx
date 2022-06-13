import {useState, useRef} from 'react';

function usePagination<T>(
  renderItemNum: number,
  paginationItem: T[],
): {paginationItem: T[]; addList: () => void} {
  const [renderItem, setRenderItem] = useState(
    paginationItem.slice(0, renderItemNum),
  );

  const pageNum = useRef(0);

  const addList = () => {
    const limit = 5;
    pageNum.current++;
    let offset =
      pageNum.current === 1
        ? renderItemNum
        : renderItemNum + (pageNum.current - 1) * limit;
    const additionalDocData = paginationItem.slice(offset, offset + limit);
    setRenderItem(renderItem.concat(additionalDocData));
  };
  return {
    paginationItem,
    addList,
  };
}

export default usePagination;
