import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Draggable from "react-native-draggable";

const DesignRoomScreen = () => {
  const route = useRoute<any>();
  const { savedOutfits, date, selectedItem } = route?.params;

  const [cloths, setCloths] = useState<any[]>([]);

  useEffect(() => {
    if (selectedItem) {
      // sort items: shoes (bottom), pants (middle), shirt (top)
      const sorted = [...selectedItem].sort((a, b) => {
        const order = { shoes: 0, pants: 1, skirt: 1, shirt: 2 }; // skirt treated like pants
        return order[a.type] - order[b.type];
      });
      setCloths(sorted);
    }
  }, [selectedItem]);

  // default starting positions
  const defaultPositions: any = {
    shoes: { x: 100, y: 400 },
    pants: { x: 100, y: 250 },
    skirt: { x: 100, y: 250 },
    shirt: { x: 100, y: 100 },
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-white">{date}</Text>
        <TouchableOpacity className="px-3 py-2 bg-gray-400 rounded">
          <Text className="text-white">Next</Text>
        </TouchableOpacity>
      </View>

      {/* Design Room */}
      <View style={styles.room}>
        {cloths?.map((item) => (
          <Draggable
            key={item.id}
            x={defaultPositions[item.type]?.x || 100}
            y={defaultPositions[item.type]?.y || 100}
            renderSize={200}
            renderColor="transparent"
            renderText=""
            onDrag={() => {}}
            onPressOut={() => {}}
            onRelease={() => {}}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 200,
                height: 200,
                resizeMode: "contain",
              }}
            />
          </Draggable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DesignRoomScreen;

const styles = StyleSheet.create({
  room: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
