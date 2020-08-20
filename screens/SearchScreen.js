import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";

import Screen from "../components/Screen";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");

const DATA = [
  {
    title: "Afro vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg",
  },
  {
    title: "Jungle Party",
    location: "Unknown",
    date: "Sept 3rd, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg",
  },
  {
    title: "4th Of July",
    location: "New York, USA",
    date: "Oct 11th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg",
  },
  {
    title: "Summer festival",
    location: "Bucharest, Romania",
    date: "Aug 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg",
  },
  {
    title: "BBQ with friends",
    location: "Prague, Czech Republic",
    date: "Sept 11th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg",
  },
  {
    title: "Festival music",
    location: "Berlin, Germany",
    date: "Apr 21th, 2021",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg",
  },
  {
    title: "Beach House",
    location: "Liboa, Portugal",
    date: "Aug 12th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg",
  },
];
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

export default function SearchScreen() {
  const [data, setData] = useState(DATA);
  const [index, setIndex] = useState(0);
  const setActiveIndex = useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  });
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });
  return (
    <Screen>
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === data.length - 1) {
              return;
            }
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              setActiveIndex(index - 1);
            }
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: SPACING * 2,
              marginTop: 50,
            }}
            scrollEnabled={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { elevation: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [{ translateX }, { scale }],
                  }}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={{
                      height: ITEM_HEIGHT,
                      width: ITEM_WIDTH,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
        </FlingGestureHandler>
      </FlingGestureHandler>
    </Screen>
  );
}

const styles = StyleSheet.create({});
