import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const features = [
  {
    title: "AI Suggestions",
    image:
      "https://i.pinimg.com/736x/2e/3d/d1/2e3dd14ac81b207ee6d86bc99ef576eb.jpg",
    screen: "AIChat",
  },
  {
    title: "AI Outfit Maker",
    image:
      "https://i.pinimg.com/736x/50/83/0e/50830e372ee844c1f429b8ef89e26fd1.jpg",
    screen: "AIOutfit",
  },
  {
    title: "AI Try On",
    image:
      "https://i.pinimg.com/736x/c2/78/95/c2789530a2dc8c9dbfd4aa5e2e70d608.jpg",
    screen: "AITryOn",
  },
  {
    title: "Color Analysis",
    image:
      "https://i.pinimg.com/736x/84/bf/ce/84bfce1e46977d50631c4ef2f72f83b1.jpg",
    screen: "ColorAnalysis",
  },
];

const popularItems = [
  {
    username: "Trisha Wushres",
    profile: "https://randomuser.me/api/portraits/women/1.jpg",
    image:
      "https://res.cloudinary.com/db1ccefar/image/upload/v1753859289/skirt3_oanqxj.png",
    itemName: "Floral Skirt",
  },
  {
    username: "Anna Cris",
    profile: "https://randomuser.me/api/portraits/women/2.jpg",
    image:
      "https://res.cloudinary.com/db1ccefar/image/upload/v1753975629/Untitled_design_3_syip4x.png",
    itemName: "Mens Jeans",
  },
  {
    username: "Isabella",
    profile: "https://randomuser.me/api/portraits/women/3.jpg",
    image:
      "https://res.cloudinary.com/db1ccefar/image/upload/v1753975802/Untitled_design_11_p7t2us.png",
    itemName: "Shoes",
  },
];

const initialStories = [
  {
    username: "Your OOTD",
    avatar: "https://picsum.photos/100/100?random=8",
    isOwn: true,
    viewed: false,
  },
  {
    username: "_trishwushres",
    avatar: "https://picsum.photos/100/100?random=10",
    isOwn: false,
    viewed: false,
  },
  {
    username: "myglam",
    avatar: "https://picsum.photos/100/100?random=11",
    isOwn: false,
    viewed: false,
  },
  {
    username: "stylist",
    avatar: "https://picsum.photos/100/100?random=12",
    isOwn: false,
    viewed: false,
  },
];
const HomeScreen = () => {
  const navigation = useNavigation();
  const [savedOutfits, setSavedOutFits] = useState([]);
  const [stories, setStories] = useState(initialStories);
  const [showStory, setStory] = useState(false);

  const [currentStory, setCurrentStory] = useState<{
    username: string;
    avatar: string;
    duration: number;
  } | null>(null);

  const generateDates = () => {
    const today = moment().startOf("days");
    let dates = [];
    for (let i = -3; i < 3; i++) {
      dates.push({
        label: today.clone().add(i, "days").format("ddd , Do MMM"),
        outfit: i === 1,
      });
    }

    return dates;
  };

  const date = generateDates();
  console.log("dates", date);

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between px-4 pt-4">
            <Text className="text-3xl font-bold">Fits</Text>
            <View className="flex-row justify-center items-center gap-5">
              <TouchableOpacity className="bg-black rounded-full px-4 py-1">
                <Text className="text-white text-xl">Upgrade</Text>
              </TouchableOpacity>
              <Ionicons
                name="notifications-outline"
                color={"black"}
                size={24}
              />
              <Ionicons name="search-outline" color={"black"} size={24} />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 pl-4"
          >
            {stories.map((story, idx) => (
              <Pressable key={idx} className="mr-4 items-center">
                <View
                  className={`mr-4 items-center justify-center relative rounded-full ${story.viewed ? " border-2 border-gray-200" : "border-2 border-purple-500"}`}
                >
                  <Image
                    className="w-16 h-16 rounded-full"
                    source={{ uri: story.avatar }}
                  />
                  {story.isOwn && (
                    <View className="w-5 h-5 bg-black rounded-full absolute bottom-0 right-0 items-center justify-center">
                      <Text className="text-white ">+</Text>
                    </View>
                  )}
                </View>
                <Text className="text-sm">{story.username}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View className="p-4 flex-row justify-between items-center mt-4">
            <Text className="text-lg font-semibold">Your Week</Text>

            <Text className="text-lg font-semibold text-gray-400">Planeer</Text>
          </View>

          <ScrollView
            className="p-4"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {date.map((day, idx) => {
              const today = moment().startOf("days").format("ddd , Do MMM");
              const outfit =
                savedOutfits[day.label] ||
                (day.label === today ? savedOutfits[today] : null);

              return (
                <View className="mr-3" key={idx}>
                  <Pressable
                    className={`w-24 h-40 items-center rounded-lg justify-center overflow-hidden shadow-md ${outfit ? "bg-white" : "bg-gray-50"}`}
                  >
                    {!outfit && (
                      <View className="w-full h-full flex items-center justify-center">
                        <Text className="text-3xl text-gray-400">+</Text>
                      </View>
                    )}

                    {outfit && <View></View>}
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>

          <View className="flex-row flex-wrap justify-between items-center px-4 mt-6">
            {features?.map((feature, idx) => (
              <Pressable
                style={{
                  backgroundColor: ["#FFF1F2", "#EFF6FF", "#F0FFF4", "#FFFBEB"][
                    idx % 4
                  ],
                  elevation: 3,
                }}
                className="w-[48%] h-36 mb-4 rounded-lg overflow-hidden"
              >
                <View className="p-3">
                  <Text className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </Text>
                  <Text className="text-gray-500">
                    {idx === 0
                      ? "Try outfit Virtually"
                      : idx == 1
                        ? "AI create new Looks"
                        : idx == 2
                          ? "Instatnt try on"
                          : "Find best colors"}
                  </Text>
                </View>
                <Image
                  style={{ transform: [{ rotate: "12deg" }], opacity: 0.9 }}
                  className="w-20 h-20 absolute bottom-[-3] right-[-1] rounded-lg"
                  source={{ uri: feature.image }}
                />
              </Pressable>
            ))}
          </View>

          <View className="flex-row justify-between items-center p-4 mt-3">
            <Text className="font-semibold text-xl">Popular this week</Text>
            <Text className="text-gray-500">More</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mr-3 pl-4"
          >
            {popularItems?.map((item, idx) => (
              <View className="w-36 mr-4">
                <Image
                  className="h-44 w-36 rounded-lg"
                  source={{ uri: item.image }}
                />

                <View className="flex-row items-center">
                  <Image
                    className="w-6 h-6 rounded-full mr-3"
                    source={{ uri: item.profile }}
                  />
                  <Text className="text-sm font-medium">{item.username}</Text>
                </View>
                <Text className="text-sm mt-1">{item.itemName}</Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
