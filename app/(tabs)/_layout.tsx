import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { View } from "react-native";

import { theme } from "@/constants/theme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  focused: boolean;
}) {
  const scale = useSharedValue(props.focused ? 1.08 : 1);

  React.useEffect(() => {
    scale.value = withTiming(props.focused ? 1.08 : 1, { duration: 220 });
  }, [props.focused, scale]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={iconStyle}>
      <MaterialCommunityIcons
        size={24}
        style={{ marginBottom: -2 }}
        name={props.name}
        color={props.color}
      />
      {props.focused && (
        <View
          style={{
            marginTop: 4,
            alignSelf: "center",
            width: 18,
            height: 3,
            borderRadius: 999,
            backgroundColor: theme.colors.neon,
          }}
        />
      )}
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: { fontWeight: "700" },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 66,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: theme.colors.neon,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="learn"
        options={{
          title: "Command Center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="console-network-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Recalibration",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="wrench-clock" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="encyclopedia"
        options={{
          title: "Database",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="database-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Operator",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="account-cog-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
