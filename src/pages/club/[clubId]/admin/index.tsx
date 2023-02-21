import { useRouter } from "next/router";
import React from "react";

function index() {
  const {
    query: { clubId },
  } = useRouter();
  return <div>index</div>;
}

export default index;
