import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  btnIcons,
  btnNames,
  BTN_RADIUS,
  BTN_SIZE,
  closeIcon,
  COLOR_LABEL,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  filterIcon,
  PADDING,
  width as screenWidth,
} from './consts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export const FilterButton = () => {
  const showItems = useSharedValue(0);
  const active = useSharedValue(0);
  const activeIndex = useSharedValue(0);
  const showLabel = useSharedValue(0);
  const [index, setIndex] = useState(-1);

  const iconStyle = useAnimatedStyle(() => {
    const scale = interpolate(active.value, [0, 1], [1, 0]);
    return {
      opacity: scale,
      transform: [{scale}],
    };
  });
  const closeStyle = useAnimatedStyle(() => {
    const scale = interpolate(active.value, [0, 1], [0, 1]);
    return {
      opacity: scale,
      transform: [{scale}],
    };
  });
  const viewStyle = useAnimatedStyle(() => {
    const width = interpolate(
      active.value,
      [0, 1],
      [BTN_SIZE + PADDING, screenWidth],
    );
    return {
      width,
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const top = interpolate(
      showLabel.value,
      [0, 1],
      [100, BTN_SIZE + PADDING],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      showLabel.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    );
    const left = interpolate(
      activeIndex.value,
      [0, 3],
      [60, 4 * 62],
      Extrapolate.CLAMP,
    );
    return {
      top,
      left,
      opacity,
    };
  });

  const onPress = () => {
    if (active.value === 1) {
      setIndex(-1);
      showLabel.value = withTiming(0, {}, () => {
        active.value = withTiming(0);
        showItems.value = withTiming(0);
      });
    } else {
      active.value = withTiming(1, {}, () => (showItems.value = withTiming(1)));
    }
  };

  const setActiveIndex = (i: number) => {
    if (activeIndex.value === i) showLabel.value = withTiming(1);
    activeIndex.value = withTiming(i, {}, () => (showLabel.value = withTiming(1)));
    setIndex(i);
  };

  return (
    <Animated.View style={[styles.view, viewStyle]}>
      <AnimatedPressable
        style={[styles.btn, styles.filterBtn]}
        onPress={onPress}>
        <AnimatedIcon
          name={filterIcon}
          size={24}
          style={[styles.btnIcon, iconStyle]}
        />
        <AnimatedIcon
          name={closeIcon}
          size={24}
          style={[styles.btnIcon, closeStyle]}
        />
      </AnimatedPressable>
      {btnIcons.map((name, i) => {
        const style = useAnimatedStyle(() => {
          const left = interpolate(
            showItems.value,
            [0, 1],
            [0, (i + 1) * (PADDING + BTN_SIZE)],
          );
          return {
            left,
          };
        });
        return (
          <AnimatedPressable
            style={[styles.btn, {zIndex: i}, styles.itemBtn, style]}
            onPress={() => setActiveIndex(i)}>
            <Icon name={name} size={24} />
          </AnimatedPressable>
        );
      })}
      <Animated.View style={[styles.labelView, labelStyle]}>
        <Text style={styles.label}>{btnNames[index]}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    margin: PADDING / 2,
  },
  btnIcon: {
    position: 'absolute',
  },
  filterBtn: {
    backgroundColor: COLOR_PRIMARY,
    zIndex: 10,
  },
  itemBtn: {
    backgroundColor: COLOR_SECONDARY,
    position: 'absolute',
  },
  labelView: {
    backgroundColor: COLOR_LABEL,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 0,
    width: BTN_SIZE + PADDING * 2,
  },
  label: {
    fontSize: 10,
  },
});
