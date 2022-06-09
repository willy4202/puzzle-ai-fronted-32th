import {useState, useRef} from 'react';
import {DocDataProp} from '~/src/types/type';

function usePagination(
  renderItemNum: number,
  docInfo: DocDataProp[],
): {docData: DocDataProp[]; addList: () => void} {
  const [docData, setDocData] = useState(docInfo.slice(0, renderItemNum));

  const pageNum = useRef(0);

  const addList = () => {
    const limit = 5;
    pageNum.current++;
    let offset =
      pageNum.current === 1
        ? renderItemNum
        : renderItemNum + (pageNum.current - 1) * limit;
    const additionalDocData = docInfo.slice(offset, offset + limit);
    setDocData(docData.concat(additionalDocData));
  };
  return {
    docData,
    addList,
  };
}

export default usePagination;
