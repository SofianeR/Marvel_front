import { useEffect, useState } from "react";

const Footer = ({
  setLimit,
  limit,
  setSkip,
  skip,
  pageCount,
  isLoading,
  page,
  setPage,
}) => {
  const [hidePage, setHidePage] = useState([]);

  const arrayButtonPage = [];

  useEffect(() => {
    for (let i = 0; i < pageCount; i++) {
      arrayButtonPage.push(
        <p
          key={i}
          onClick={() => {
            setPage(i + 1);
          }}>
          {i + 1}
        </p>
      );
    }
  }, [page, pageCount]);

  useEffect(() => {
    const pagination = () => {
      const buttonArray = [];
      arrayButtonPage.map((button, index) => {
        if (index > page - 3 && index < page + 4) {
          buttonArray.push(button);
        }
      });
      setHidePage(buttonArray);
      setSkip((page - 1) * limit);
    };
    pagination();
  }, [page, pageCount]);
  return (
    <div className="pagination">
      <div className="element-pagination">
        <select
          className="select"
          onChange={(e) => {
            setPage(e.target.value);
          }}>
          <option value={page - 1}>{page - 1}</option>
          <option value={page - 2}>{page - 2}</option>
          <option value={page - 3}>{page - 3}</option>
          <option value={page - 4}>{page - 4}</option>
          <option value={page - 5}>{page - 5}</option>
        </select>
        <div className="count-page">{hidePage}</div>

        <select
          className="select"
          onChange={(e) => {
            setPage(e.target.value);
          }}>
          <option value={page + 1}>{page + 1}</option>
          <option value={page + 2}>{page + 2}</option>
          <option value={page + 3}>{page + 3}</option>
          <option value={page + 4}>{page + 4}</option>
          <option value={page + 5}>{page + 5}</option>
        </select>
      </div>
    </div>
  );
};
export default Footer;
