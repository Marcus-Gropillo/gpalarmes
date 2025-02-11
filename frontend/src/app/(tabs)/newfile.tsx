import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function NewFile() {
  return (
    <Tabs.Screen
      name="newfile"
      options={{
        title: "New File",
        tabBarIcon: ({ color }) => (
          <FontAwesome size={28} name="file" color={color} />
        ),
      }}
    />
  );
}
