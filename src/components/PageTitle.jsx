import React, { useEffect } from "react";

const PageTitle = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  return <></>;
};

export default PageTitle;
