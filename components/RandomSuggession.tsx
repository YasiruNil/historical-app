import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { useSelector } from "react-redux";
import { GlobleState } from "../constants/Types";
import { PlaceCard } from "./PlaceCard";

export default function RandomSuggession() {
  const [randomPlaceId, setRandomPlaceId] = useState(0);
  const places = useSelector((state: GlobleState) => state.places.places);

  const getRandomPlace = () => {
    const randomIndex = Math.floor(Math.random() * places.length);
    const randomPlace = places[randomIndex];
    setRandomPlaceId(randomPlace.id);
  };
  const randomPlace = randomPlaceId
    ? places.find((place) => place.id === randomPlaceId)
    : null;
  return (
    <View>
      <Button
        titleStyle={{
          color: "white",
          fontSize: 12,
        }}
        buttonStyle={{
          marginBottom: 5,
          marginTop: 5,
          borderRadius: 15,
          marginStart: 20,
          width: 150,
        }}
        onPress={() => getRandomPlace()}
        title="Suggest Random Place"
      />
      <View>{randomPlace && <PlaceCard place={randomPlace} />}</View>
    </View>
  );
}
