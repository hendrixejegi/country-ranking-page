import Logo from "/src/assets/Logo.svg";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <div className="aspect-[4/3] max-h-[300px] w-full bg-[url(/hero-image-sm.jpg)] bg-cover bg-center bg-no-repeat px-8 pt-[min(20vw,_120px)] pb-32 md:bg-[url(/hero-image.jpg)]">
        <img src={Logo} alt="World Ranks Logo" className="mx-auto" />
      </div>
      <div className="border-secondary bg-primary mx-auto -mt-32 max-w-[1350px] rounded-xl border-1 md:-mt-16">
        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
