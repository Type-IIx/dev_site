import React, { useEffect, useState } from "react";
import Menu from "./adminmenu";
import Footer from "./adminfooter";
import { useSession } from "next-auth/react";

function AdminWrapper({ children }) {
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

export default AdminWrapper;
