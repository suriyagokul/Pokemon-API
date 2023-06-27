import React, { useEffect, useState } from "react";
import axios from "axios";
import instance from "../utils/axiosHandler";
import fetchUrl from "../utils/Requests";
import "../App.css"

export default function PokemonPowers() {

    const [pokemonData, setPokemonData] = useState([])
    const [userInput, setUserInput] = useState("")
    const [inputData, setInputData] = useState([])

    const [detailsState, setDetailsState] = useState(true)

    const handleInput = (e) => {
        setUserInput(e.target.value)
    }

    async function GetPokemon(){
        const response =  await instance.get(`/berry/${userInput}`) // instead os response {data} destructure directly
        setInputData(response.data)
        setDetailsState(false)
    }
    
    useEffect(()=>{

        async function fetchData(){
             
          const response =  await instance.get(fetchUrl.fetchBerries) // instead os response {data} destructure directly
          setPokemonData(response.data.results)
        }

        fetchData()
    }, [])

    console.log(inputData)

    return (
        <>
            <div className="main">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" width={60} height={40}/>
                {detailsState ? <h2 className="title">List Of Berries</h2>:  <h2 className="title">Berry</h2> }
                <input type="text" name="pokemon" value={userInput} onChange={handleInput} placeholder="Search" />
                <button className="search" onClick={GetPokemon}>Search Pokemon</button>
            </div>
            {detailsState && pokemonData && pokemonData.map((item, index)=> {
                return <h3 key={index}>Name: {item.name} Url: {item.url}</h3>
            })
            }
            {detailsState === false ? (
                <div>
                  <h5>Name: </h5>
                  <h5 style={{ marginLeft: "200px" }}>{inputData.name}</h5>
                  <h5>Max Harvest: </h5>
                  <h5 style={{ marginLeft: "200px" }}>{inputData.max_harvest}</h5>
                  <h5>Growth Time: </h5>
                  <h5 style={{ marginLeft: "200px" }}>{inputData.growth_time}</h5>
                  <h5>Firmness: </h5>
                  <h5 style={{ marginLeft: "200px" }}>{inputData.firmness.name}</h5>
                  <h5>Flavors: </h5>
                  {inputData.flavors.map((item,index)=> {
                    return <h5 style={{ marginLeft: "200px" }}>{item.flavor.name}</h5>
                  })}
                  <h5>Natural Gift Power: </h5>
                  <h5 style={{ marginLeft: "200px" }}>{inputData.natural_gift_power}</h5>
                  <h5>Smoothness: </h5>
                  <h5 style={{ marginLeft: "200px" }}>{inputData.smoothness}</h5>
                </div>
            ) : null}

        </>
    )

}
