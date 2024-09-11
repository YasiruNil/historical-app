import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { GlobleState } from "../constants/Types";
import { Feather } from "@expo/vector-icons";
import { markAsVisited, unmarkAsVisited } from "@/store/placeSlice";

export default function PlacesDetailsPage() {
  const dispatch = useDispatch();
  const placeList = useSelector((state: GlobleState) => state.places.places);
  const params = useLocalSearchParams();
  const router = useRouter();
 
  const getPladeDetails = placeList.find(
    (pl) => pl.id === Number(params.paramId)
  );

  const goBack = () => {
    router.push({ pathname: `/` });
  };

  const toggleVisitedStatus = (id: number, visited: boolean) => {
    if (visited) {
      dispatch(unmarkAsVisited(id));
    } else {
      dispatch(markAsVisited(id));
    }
  };

  return (
    <View>
      {getPladeDetails ? (
        <>
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerTitle: "",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => goBack()}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.5)",
                    borderRadius: 10,
                    padding: 4,
                  }}
                >
                  <View>
                    <Feather name="arrow-left" size={20} />
                  </View>
                </TouchableOpacity>
              ),
            }}
          />
          <Image
            source={{ uri: getPladeDetails.image }}
            style={{ width: "100%", height: 340 }}
          />
          <View style={{margin: 20, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Text style={{paddingTop: 20, paddingBottom: 0}}>{getPladeDetails.name}</Text>
            <Text style={{paddingTop: 5, paddingBottom: 20}}>{getPladeDetails.description}</Text>
            <Text style={{paddingTop: 5, paddingBottom: 20, color: "#FF0000" }}>{getPladeDetails.visited ? "Visited" : "Not Visited"}</Text>
            <Button
              titleStyle={{
                color: "white",
                fontSize: 12,
              }}
              buttonStyle={{
                marginBottom: 5,
                marginTop: 5,
                borderRadius: 15,
                width:150
              }}
              onPress={() =>
                toggleVisitedStatus(getPladeDetails.id, getPladeDetails.visited)
              }
              title={
                getPladeDetails.visited
                  ? "Unmarked as Visited"
                  : "Mark as Visited"
              }
            />
          </View>
        </>
      ) : (
        <ActivityIndicator style={{ margin: "auto" }} size={"large"} />
      )}
    </View>
  );
}
