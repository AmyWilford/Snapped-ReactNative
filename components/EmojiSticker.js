import { View, Text } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSticker({ fontSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleState = useSharedValue(0);

  const scaleText = useSharedValue(1);

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleState.value === 0) {
        scaleText.value = withSpring(1.5);
        scaleState.value = 1; // Set the scale state to indicate enlarged size
      } else {
        scaleText.value = withSpring(1); // Reset the text size to original
        scaleState.value = 0; // Set the scale state to indicate original size
      }
    },
  });

  const textContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scaleText.value,
        },
      ],
    };
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[textContainerStyle, { top: -350, right: -250 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <Animated.Text style={{ fontSize: fontSize }}>
            {stickerSource}
          </Animated.Text>
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
}
