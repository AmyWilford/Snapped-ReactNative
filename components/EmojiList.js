import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable, Text } from "react-native";
import axios from "axios";

export default function EmojiList({ onSelect, onCloseModal }) {
  // const [emoji] = useState([
  //   require("../assets/images/emoji1.png"),
  //   require("../assets/images/emoji2.png"),
  //   require("../assets/images/emoji3.png"),
  //   require("../assets/images/emoji4.png"),
  //   require("../assets/images/emoji5.png"),
  //   require("../assets/images/emoji6.png"),
  // ]);

  // const EmojiList = ({ onSelect, onCloseModal }) => {
    const [emoji, setEmoji] = useState([]);

    useEffect(() => {
      fetchEmojis();
    }, []);

    const fetchEmojis = async () => {
      try {
        const response = await axios.get(
          "https://emoji-api.com/emojis?access_key=c9c86b7eb5247bd81925e087306abee777fb9f0a"
        );
        setEmoji(response.data);
        console.log(emoji);
      } catch (error) {
        console.log("Error fetching emojis:", error);
      }
    };

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === "web"}
        data={emoji}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                onSelect(item.character);
                onCloseModal();
              }}
            >
              <Text style={styles.image}>{item.character}</Text>
            </Pressable>
          );
        }}
      />
    );
  };

  // return (
  //   <FlatList
  //     horizontal
  //     showsHorizontalScrollIndicator={Platform.OS === "web"}
  //     data={emoji}
  //     contentContainerStyle={styles.listContainer}
  //     renderItem={({ item, index }) => {
  //       return (
  //         <Pressable
  //           onPress={() => {
  //             onSelect(item);
  //             onCloseModal();
  //           }}
  //         >
  //           <Image source={item} key={index} style={styles.image} />
  //         </Pressable>
  //       );
  //     }}
  //   />
  // );

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
