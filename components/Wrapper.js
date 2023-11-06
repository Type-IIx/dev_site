import React, { useEffect, useState } from "react";
import Menu from "./menu";
import Footer from "./footer";

function Wrapper({ children }) {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <>
          <Menu />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}

export default Wrapper;
