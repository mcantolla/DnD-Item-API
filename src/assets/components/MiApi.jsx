import { useEffect, useState } from "react"
import Buscador from "./Buscador"
import { Table } from "react-bootstrap"

const dataDummie = [
    {
        name: "Armor",
        type: "Armor (medium or heavy)",
        rarity: "Uncommon",
        requires_attunement: "",
        document__title: "5e Core Rules"
    },
    {
        name: "Amulet",
        type: "Wondruos Item",
        rarity: "Rare",
        requires_attunement: "requires attunement",
        document__title: "5e Core Rules"
    },
    {
        name: "Crystal ball",
        type: "Wondrous Item",
        rarity: "Very Rare",
        requires_attunement: "requires attunement",
        document__title: "Level Up Advanced 5e"
    },
]

function MiApi() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("") 

    const getData = (item) => {
        const route = `https://api.open5e.com/v1/magicitems/?limit=138`//&search=${item}
        fetch(route)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setData(data.results.filter((result) =>
                result.name.toLowerCase().includes(item.toLowerCase())
            ));
          })
          .catch(error => {
            console.log(error)
          })
      }

    useEffect(() => {
    getData("")
    },[])

    const sortedData = [...data].sort((a, b) => a.type.localeCompare(b.type));

    return (
        <>
        <Buscador onSearch={getData}/>
        <Table striped bordered hover variant="dark" className="tabla">
            <thead>
                <tr>
                    <td>Type</td>
                    <td>Name</td>
                    <td>Rarity</td>
                    <td>Attunement</td>
                    <td>Source</td>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((element, index) => (
                    <tr key={index}>
                        <td>{element.type}</td>
                        <td>{element.name}</td>
                        <td 
                            style={{
                                color: element.rarity === "Uncommon" ? "green" :
                                       element.rarity === "uncommon" ? "green" : 
                                       element.rarity === "Rare" ? "blue" : 
                                       element.rarity === "rare" ? "blue" : 
                                       element.rarity === "Very Rare" ? "purple" : 
                                       element.rarity === "very rare" ? "purple" : 
                                       element.rarity === "legendary" ? "gold" : 
                                       element.rarity === "Legendary" ? "gold" : 
                                       "gray"}}>
                                        {element.rarity}
                        </td>
                        <td>{element.requires_attunement}</td>
                        <td>{element.document__title}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}

export default MiApi