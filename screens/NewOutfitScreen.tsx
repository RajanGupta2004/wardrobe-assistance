import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

const NewOutfitScreen = () => {
  const [occasion, setOccasion] = useState();
  const [caption, setCaption] = useState();
  const [loading, setLoading] = useState(false);
  const [isOotd, setIsOoft] = useState(false);
  const route = useRoute<any>();

  const navigation = useNavigation();

  const { date, selectedItem, savedOutfits } = route?.params;

  // Define the fixed order
  const typeOrder: Record<string, number> = {
    shirt: 1,
    skirt: 2,
    pants: 2, // skirt and pants both in middle
    shoes: 3,
  };

  // Sort items by type order
  const sortedItems = [...selectedItem].sort(
    (a, b) => (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99)
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>New Outfits</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        {sortedItems.map((item) => (
          <Image
            key={item.id}
            source={{ uri: item.image }}
            style={{
              width: 200,
              height: item.type == "shoes" ? 180 : 200,
              resizeMode: "contain",
            }}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default NewOutfitScreen;

const styles = StyleSheet.create({});
