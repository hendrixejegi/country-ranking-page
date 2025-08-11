import { useState, useEffect } from "react";

const useScreen = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const setCurrentWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", setCurrentWidth);
    return () => window.removeEventListener("resize", setCurrentWidth);
  }, []);

  return screenWidth;
};

export default useScreen;
