import Header from "../molecules/Header";
import Sidebar from "../molecules/Sidebar";

function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row">
        <Sidebar className="w-full md:w-1/4" />
        <div className="flex-1 h-screen flex items-center justify-center p-4">
          <img src="Logo.png" alt="Logo" className="w-48 h-48 md:w-96 md:h-96" />
        </div>
      </div>
    </>
  );
}

export default Home;
