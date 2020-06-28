import React from "react";

import "./pageStyles.scss";

const Page = React.memo(({ children }) => {
  return <div className="page">{children}</div>;
});

export default Page;
