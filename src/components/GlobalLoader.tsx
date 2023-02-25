import Lottie from "react-lottie";
import loader from "../../public/lotties/loader.json";
import { useLoading } from "../zustand/Loading";
function GlobalLoader() {
  const { isLoading } = useLoading();
  const defaultOptions = {
    //예제1
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {isLoading ? (
        <div className="absolute z-[10000] flex h-screen min-h-screen w-screen items-center justify-center">
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            style={{
              color: "#4338ca",
              alignItems: "center",
              justifyItems: "center",
            }}
            isClickToPauseDisabled={true}
          />
        </div>
      ) : null}
    </>
  );
}

export default GlobalLoader;
