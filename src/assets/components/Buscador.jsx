import React, { useState } from "react"
import { Button } from "react-bootstrap";

const Buscador = ({ onSearch }) => {
  const [search, setSearch] = useState("")

  const handleBuscarClick = () => {
    onSearch(search)
    setSearch("")
  };

  return (
    <>
      <div className="buscador">
        <input
          type="text"
          placeholder="Search item by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="secondary" onClick={handleBuscarClick}>Search</Button>
      </div>
    </>
  )
}

export default Buscador