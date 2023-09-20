/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
// import * as styles from "./ListHotels.styled.js";
import axios from "axios";
import { useUserContext } from "../../../../../context/UserContext.jsx";
import CardHotel from "../CardHotel/CardHotel.jsx";

const ListHotels = ({ setViewHotels, setSelectedHotel }) => {
  const [hotels, setHotels] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const getHotels = async () => {
      try {
        const { data } = await axios.get(
          "https://hotelfinderserver.azurewebsites.net/hotel/getAllHotelByUser",
          {
            params: {
              userId: user._id,
            },
          }
        );
        setHotels(data);
      } catch (error) {
        console.error(error);
      }
    };
    getHotels();
  }, []);

  return (
    <>
      {hotels.map((hotel) => {
        return (
          <CardHotel
            key={hotel._id}
            hotel={hotel}
            setHotels={setHotels}
            setViewHotels={setViewHotels}
            setSelectedHotel={setSelectedHotel}
          />
        );
      })}
    </>
  );
};

export default ListHotels;
