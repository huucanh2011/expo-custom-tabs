// @ts-nocheck

import { icons } from "@/assets/icons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Props = {
    isFocused: boolean;
    label: any;
    routeName: string;
    color: string;
    onPress: () => void;
    onLongPress: () => void;
}

const TabBarButton = (props: Props) => {
    const { isFocused, label, routeName, color } = props

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
            duration: 350
        })
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])

        const top = interpolate(scale.value, [0, 1], [0, 8])

        return {
            transform: [{ scale: scaleValue }],
            top
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacityValue = interpolate(scale.value, [0, 1], [1, 0])

        return {
            opacity: opacityValue
        }
    })

    return (
        <Pressable {...props} style={styles.container}>
            <Animated.View style={animatedIconStyle}>
                {icons[routeName]({ color })}
            </Animated.View>
            <Animated.Text style={[{ fontSize: 11, color }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    }
})

export default TabBarButton;