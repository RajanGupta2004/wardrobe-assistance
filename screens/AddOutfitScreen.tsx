import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mpants, mshirts, pants, shoes, skirts, tops } from "../data";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const AddOutfitScreen = () => {
  const route = useRoute<any>();
  const { date, savedOutfits } = route?.params;
  const [selected, setSelected] = useState<number[]>([]);
  console.log("route", route);
  const popularClothes = [
    ...pants,
    ...mpants,
    ...shoes,
    ...tops,
    ...mshirts,
    ...skirts,
  ].map((item, idx) => ({
    ...item,
    id: idx + 1,
  }));

  // console.log(popularClothes);

  const selectToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? selected.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white py-3">
      <View className="flex-row items-center px-4 justify-between">
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text className="font-semibold text-xl">Add outfit</Text>
        <Text>{date}</Text>
      </View>

      <View className="flex-row justify-around items-center py-4">
        <TouchableOpacity className="w-[30%] bg-gray-100 rounded-lg py-3 items-center">
          <Ionicons name="camera-outline" size={24} color={"black"} />
          <Text className="font-medium mt-1">Selfie</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[30%] bg-gray-100 rounded-lg py-3 items-center">
          <Ionicons name="sparkles-outline" size={24} color={"black"} />
          <Text className="font-medium mt-1">Suggesations</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[30%] bg-gray-100 rounded-lg py-3 items-center">
          <Ionicons name="shirt-outline" size={24} color={"black"} />
          <Text className="font-medium mt-1">Saved Outfits</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 mt-4">
        <Text className="text-lg font-semibold px-4 mt-4">Popular Cloths</Text>
        <View className="flex-row flex-wrap px-4 mt-2 mb-20">
          {popularClothes?.map((item, idx) => (
            <TouchableOpacity
              onPress={() => selectToggle(item?.id)}
              key={idx}
              className="w-1/3 p-1 relative"
            >
              <Image
                className="w-full h-32"
                resizeMode="contain"
                source={{ uri: item.image }}
              />
              <View className="absolute right-2 w-6 h-6  items-center border-2 rounded-full overflow-hidden">
                <Text className="text-sm">
                  {item.gender === "m"
                    ? "♂"
                    : item.gender === "f"
                      ? "♀"
                      : "⚪"}
                </Text>
              </View>

              <View
                className={`absolute w-6 h-6 left-2 border-2 rounded-full border-gray-400 ${selected.includes(item.id) ? "bg-gray-800" : "border-gray-400"}`}
              >
                {selected?.includes(item?.id) && (
                  <Ionicons name="checkmark" size={28} color={"white"} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selected.length > 0 && (
        <View className="absolute left-0 right-0 border-t bottom-0 bg-white">
          <ScrollView horizontal className="px-2 py-1">
            {selected?.map((id) => {
              const item = popularClothes.find((c) => c.id == id);

              return (
                <Image
                  className="w-16 h-16 mr-3 rounded-lg"
                  source={{ uri: item?.image }}
                />
              );
            })}
          </ScrollView>

          <TouchableOpacity className="bg-black py-3 w-24 my-2 mr-3   items-center rounded-lg self-end">
            <Text className="text-white ">Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddOutfitScreen;

const styles = StyleSheet.create({});
