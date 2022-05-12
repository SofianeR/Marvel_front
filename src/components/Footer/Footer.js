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
  return <footer>{hidePage}</footer>;
};
export default Footer;
