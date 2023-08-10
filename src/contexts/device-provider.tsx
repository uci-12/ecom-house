import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

const DEFAULT_DEVICE = {
  isMobile: false,
};
const DeviceContext = createContext(DEFAULT_DEVICE);

export const useDeviceDetect = () => useContext(DeviceContext);

const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(DEFAULT_DEVICE);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 600) setState({ isMobile: true });
      else setState({ isMobile: false });
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>
  );
};

export default DeviceProvider;
