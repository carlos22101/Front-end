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
        <div className="flex-grow">
          <SearchBarP
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
          />
          <CardContainerP searchValue={searchValue} />
        </div>
      </div>
    </>
  );
}

export default Proveedores;
