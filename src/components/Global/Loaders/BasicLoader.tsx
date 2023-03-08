import { RotatingLines } from "react-loader-spinner";

function BasicLoader() {
  return (
    <div className=" flex h-screen w-full items-center justify-center">
      <RotatingLines strokeColor="gray" animationDuration="0.75" width="48" />
    </div>
  );
}

export default BasicLoader;
