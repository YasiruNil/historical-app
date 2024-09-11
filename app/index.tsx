import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  Text
} from "react-native";

import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { PlaceCard } from "@/components/PlaceCard";
import { GlobleState } from "../constants/Types";
import RandomSuggession from "@/components/RandomSuggession";


export default function HomeScreen() {
  const placeList = useSelector((state: GlobleState) => state.places.places);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Home",
        }}
      />
      {placeList.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            {/* historycal places */}
            <Text style={{fontSize: 30, fontWeight: 500, padding: 20 }}>Historical Places</Text>
            <RandomSuggession/>

            {/* allHistorical places */}
            <Text style={{fontSize: 30, fontWeight: 500, padding: 20 }}>All Historical Places</Text>
            <FlatList
              data={placeList}
              scrollEnabled={false}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <PlaceCard place={item} key={index} />
              )}
            />
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator style={{ margin: "auto" }} size={"large"} />
      )}
    </SafeAreaView>
  );
}
