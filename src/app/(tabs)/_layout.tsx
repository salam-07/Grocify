import { useAuth } from '@clerk/expo';
import { Feather } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { cssInterop } from "nativewind";
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FeatherIconName = ComponentProps<typeof Feather>["name"];
cssInterop(Feather, {
    className: {
        target: 'style',
        nativeStyleToProp: {
            color: true, // Maps text-* utilities directly to the icon's color prop
        },
    },
});

export const tabs: Array<{ name: "index" | "planner" | "insights"; title: string; icon: FeatherIconName; }> = [
    { name: "index", title: "Home", icon: "list" },
    { name: "planner", title: "Planner", icon: "plus-circle" },
    { name: "insights", title: "Insights", icon: "bar-chart-2" },
];

type TabIconProps = {
    focused: boolean;
    icon: FeatherIconName;
};

const TabIcon = ({ focused, icon }: TabIconProps) => {
    return (
        <View className="tabs-icon">
            <View className={`tabs-pill ${focused ? 'tabs-active' : ''}`}>
                <Feather
                    name={icon}
                    size={30}
                    className={focused ? 'text-muted-foreground' : 'text-secondary'}
                />
            </View>
        </View >
    );
};

export default function TabsLayout() {
    const { isSignedIn, isLoaded } = useAuth();
    const insets = useSafeAreaInsets();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />;
    }
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: Math.max(insets.bottom, 24),
                    height: 64,
                    marginHorizontal: 54,
                    borderRadius: 48,
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    elevation: 0,
                    paddingBottom: 16,
                    paddingTop: 16,
                },
                tabBarBackground: () => (
                    <View className="flex-1 rounded-[44px] bg-muted-foreground/90
                    justify-center items-center"
                        style={{
                            shadowColor: '#000',
                            shadowOpacity: 0.28,
                            shadowRadius: 16,
                            shadowOffset: { width: 0, height: 8 },
                            elevation: 10,
                        }} />
                ),
                tabBarItemStyle: {
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarIconStyle: {
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                }
            }}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={tab.icon} />
                        )
                    }} />
            ))}
        </Tabs>
    );
}