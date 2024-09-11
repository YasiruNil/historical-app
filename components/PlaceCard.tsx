import { markAsVisited, unmarkAsVisited } from "@/store/placeSlice";
import { View, Image, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";

interface Prop {
  place: {
    id: number;
    name: string;
    image: string;
    visited: boolean;
    description: string;
  };
}
export function PlaceCard({ place }: Prop) {
  const dispatch = useDispatch();
  const router = useRouter();
  const toggleVisitedStatus = (id: number, visited: boolean) => {
    if (visited) {
      dispatch(unmarkAsVisited(id));
    } else {
      dispatch(markAsVisited(id));
    }
  };
  const handleViewPage = (id: number) => {
    router.push({ pathname: `/:${id}`, params: { paramId: id } });
  };
  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: Dimensions.get("window").width / 2 - 20,
      }}
    >
      <Image
        source={{ uri: place.image }}
        style={{
          width: Dimensions.get("window").width / 2 - 40,
          height: 120,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text style={{ marginBottom: 10, marginTop: 10 }}>{place.name}</Text>
        <Text style={{ marginBottom: 5, marginTop: 5 }}>
          {place.description}
        </Text>
        <Text style={{ color: "#FF0000" }}>
          {place.visited ? "Visited" : "Not Visited"}
        </Text>
        <View style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            titleStyle={{
              color: "white",
              fontSize: 12,
            }}
            buttonStyle={{
              marginBottom: 5,
              marginTop: 5,
              borderRadius: 15,
              width: Dimensions.get("window").width / 2 - 60,
            }}
            onPress={() => toggleVisitedStatus(place.id, place.visited)}
            title={place.visited ? "Unmarked as Visited" : "Mark as Visited"}
          />
          <Button
            buttonStyle={{
              marginBottom: 5,
              marginTop: 5,
              borderRadius: 15,
              width: Dimensions.get("window").width / 2 - 60,
            }}
            titleStyle={{
              color: "white",
              fontSize: 12,
            }}
            onPress={() => handleViewPage(place.id)}
            title="View Details"
          />
        </View>
      </View>
    </View>
  );
}
