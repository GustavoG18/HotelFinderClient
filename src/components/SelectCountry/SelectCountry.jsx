/** @jsxImportSource @emotion/react */
import { HStack, Select, Text, VStack } from "@chakra-ui/react";
import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";

const SelectCountry = ({
  location = "",
  setLocation,
  position = "vertical",
}) => {
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});

  const [getState, setGetState] = useState([]);
  const [getCities, setGetCities] = useState([]);

  useEffect(() => {
    if (location !== "") {
      const [countryName, stateName, cityName] = location.split(",");
      const searchCountry = Country.getAllCountries().find(({ name }) => {
        return name === countryName;
      });
      const searchState = State.getStatesOfCountry(searchCountry.isoCode).find(
        ({ name }) => {
          return name === stateName;
        }
      );
      const searchCity = City.getCitiesOfState(
        searchCountry.isoCode,
        searchState.isoCode
      ).find(({ name }) => {
        return name === cityName;
      });
      setCountry({
        name: searchCountry.name,
        isoCode: searchCountry.isoCode,
      });
      setState({
        name: searchState.name,
        isoCode: searchState.isoCode,
      });
      setCity({
        name: searchCity.name,
        isoCode: searchCity.isoCode,
      });
    }
  }, []);

  useEffect(() => {
    if (country?.name) {
      setGetState(
        State.getStatesOfCountry(country.isoCode).map(
          ({ name, isoCode }, index) => {
            return (
              <option
                value={JSON.stringify({ name, isoCode })}
                key={`${isoCode} - ${index}`}
                selected={name === state?.name}
              >
                {name}
              </option>
            );
          }
        )
      );
    }
  }, [country]);

  useEffect(() => {
    if (state?.name) {
      setGetCities(
        City.getCitiesOfState(country.isoCode, state.isoCode).map(
          ({ name, isoCode }, index) => {
            return (
              <option
                value={JSON.stringify({ name, isoCode })}
                key={`${isoCode} - ${index}`}
                selected={name === city?.name}
              >
                {name}
              </option>
            );
          }
        )
      );
    }
  }, [state]);

  return (
    <>
      {position === "vertical" ? (
        <VStack>
          <Select
            placeholder="Select country"
            onChange={(e) => {
              setCountry(JSON.parse(e.target.value));
            }}
          >
            {Country.getAllCountries().map(({ name, isoCode }) => {
              return (
                <option
                  value={JSON.stringify({ name, isoCode })}
                  key={isoCode}
                  selected={name === country?.name}
                >
                  {name}
                </option>
              );
            })}
          </Select>
          <Select
            placeholder="Select state"
            disabled={!getState.length}
            onChange={(e) => {
              setState(JSON.parse(e.target.value));
            }}
          >
            {getState.length && getState}
          </Select>
          <Select
            placeholder="Select city"
            disabled={!getCities.length}
            onChange={(e) => {
              const city = JSON.parse(e.target.value);
              setLocation(`${country.name},${state.name},${city.name}`);
            }}
          >
            {getCities.length && getCities}
          </Select>
        </VStack>
      ) : (
        <HStack>
          <VStack spacing={2} align="stretch" w="200px">
            <Text color="white">Country</Text>
            <Select
              color="white"
              placeholder="Select country"
              onChange={(e) => {
                setCountry(JSON.parse(e.target.value));
              }}
            >
              {Country.getAllCountries().map(({ name, isoCode }) => {
                return (
                  <option
                    value={JSON.stringify({ name, isoCode })}
                    key={isoCode}
                    selected={name === country?.name}
                  >
                    {name}
                  </option>
                );
              })}
            </Select>
          </VStack>
          <VStack spacing={2} align="stretch" w="200px">
            <Text color="white">State</Text>
            <Select
              color="white"
              placeholder="Select state"
              disabled={!getState.length}
              onChange={(e) => {
                setState(JSON.parse(e.target.value));
              }}
            >
              {getState.length && getState}
            </Select>
          </VStack>
          <VStack spacing={2} align="stretch" w="200px">
            <Text color="white">City</Text>
            <Select
              color="white"
              placeholder="Select city"
              disabled={!getCities.length}
              onChange={(e) => {
                const city = JSON.parse(e.target.value);
                setLocation(`${country.name},${state.name},${city.name}`);
              }}
            >
              {getCities.length && getCities}
            </Select>
          </VStack>
        </HStack>
      )}
    </>
  );
};

export default SelectCountry;
