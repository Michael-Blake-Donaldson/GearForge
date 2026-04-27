import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import { theme } from "@/constants/theme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={24} style={{ marginBottom: -2 }} {...props} />
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
        },
        tabBarActiveTintColor: theme.colors.neon,
        tabBarInactiveTintColor: theme.colors.tabInactive,
      }}
    >
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="school-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="sword-cross" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="encyclopedia"
        options={{
          title: "Encyclopedia",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book-open-variant" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chart-line" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account-circle-outline" color={color} />
          ),
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
