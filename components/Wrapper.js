import React, { useEffect, useState } from "react";
import MenuHeader from "./MenuHeader";
import FooterComp from "./FooterComp";

function Wrapper({ children }) {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <MenuHeader />
          {children}
          <FooterComp />
        </>
      )}
    </>
  );
}

export default Wrapper;
