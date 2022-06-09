import {useState, useRef} from 'react';

function usePagination<T>(
  renderItemNum: number,
  renderItemInfo: T[],
): {renderItemInfo: T[]; addList: () => void} {
  const [renderItem, setRenderItem] = useState(
    renderItemInfo.slice(0, renderItemNum),
  );

  const pageNum = useRef(0);

  const addList = () => {
    const limit = 5;
    pageNum.current++;
    let offset =
      pageNum.current === 1
        ? renderItemNum
        : renderItemNum + (pageNum.current - 1) * limit;
    const additionalDocData = renderItemInfo.slice(offset, offset + limit);
    setRenderItem(renderItem.concat(additionalDocData));
  };
  return {
    renderItemInfo,
    addList,
  };
}

export default usePagination;
