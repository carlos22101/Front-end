import React, { useState } from "react";
import Header from "../molecules/Header";
import Sidebar from "../molecules/Sidebar";
import SearchBarP from "../molecules/SearchBarP";
import CardContainerP from "../molecules/CardContainerP";

function Proveedores() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    console.log("Buscar:", searchValue);
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full overflow-x-hidden">
          <div>
          <SearchBarP
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
          />
          </div>
          <div className="p-4 overflow-y-auto max-h-[520px] border border-gray-300 ">
          <CardContainerP searchValue={searchValue} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Proveedores;
