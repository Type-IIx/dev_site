import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function AdminChecker(props) {
  const sess = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (sess.status !== "loading") {
      setLoading(false);
      if (sess.status !== "authenticated") {
        if (!props.isLogin) {
          router.push("/");
        }
      } else {

        if (props.isLogin) {
          router.push("/admpanel/addblog");
        }
      }
    }
  }, [sess.status]);

  return props.children;
}

export default AdminChecker;
