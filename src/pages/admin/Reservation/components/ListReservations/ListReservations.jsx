/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import CardReservation from "../CardReservation/CardReservation";
import { useUserContext } from "../../../../../context/UserContext";

const ListReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const getReservations = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/reservation/getAllReservationByUserAdmin",
          {
            params: {
              id_user: user._id,
            },
          }
        );
        if (data.length) {
          setReservations(data);
        }
      } catch (error) {
        console.log("Look", error);
      }
    };
    getReservations();
  }, []);

  return (
    <>
      {reservations.map((reservation) => {
        return (
          <CardReservation key={reservation._id} reservation={reservation} />
        );
      })}
    </>
  );
};

export default ListReservations;
