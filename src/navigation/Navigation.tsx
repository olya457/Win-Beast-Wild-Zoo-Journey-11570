import React, { useCallback, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, colors, Icon, Label, Page } from '../components/ui';
import { RootStackParams } from './types';
import { useApp } from '../store/AppStore';
import { Loader, Onboarding } from '../screens/Welcome';
import { Tickets, TicketSuccess, TicketDetail } from '../screens/Tickets';
import { Home, Profile } from '../screens/Home';
import {
  Events,
  EventDetail,
  ReservationForm,
  ReservationSuccess,
} from '../screens/Events';
import { Food, DishDetail, Cart, OrderDetail } from '../screens/Food';
import { ZooMap, LocationDetail, Chat, Settings } from '../screens/Explore';
const Stack = createNativeStackNavigator<RootStackParams>();
const Tabs = createBottomTabNavigator();
const tabIcons = ({ route }: { route: { name: string } }) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.green,
  tabBarInactiveTintColor: '#82758f',
  tabBarIcon: ({ color }: { color: string }) => (
    <Icon name={route.name} color={color} />
  ),
  tabBarLabelStyle: { fontSize: 10, marginTop: 3 },
});
function Main() {
  const inset = useSafeAreaInsets();
  return (
    <Tabs.Navigator
      screenOptions={props => ({
        ...tabIcons(props),
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.line,
          height: 60 + inset.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(8, inset.bottom),
        },
        sceneStyle: { backgroundColor: colors.bg },
      })}
    >
      <Tabs.Screen name="Home" component={Home as any} />
      <Tabs.Screen name="Events" component={Events as any} />
      <Tabs.Screen name="Food" component={Food as any} />
      <Tabs.Screen name="Map" component={ZooMap as any} />
      <Tabs.Screen name="Chat" component={Chat} />
      <Tabs.Screen name="Profile" component={Profile as any} />
    </Tabs.Navigator>
  );
}
export function Navigation() {
  const { state, ready, storageError, retry } = useApp();
  const [loaded, setLoaded] = useState(false);
  const complete = useCallback(() => setLoaded(true), []);
  if (storageError) {
    return (
      <Page title="Unable to Load Saved Data">
        <Label>
          Your saved data remains on your device. Try loading it again.
        </Label>
        <Button title="Try Again" onPress={retry} />
      </Page>
    );
  }
  if (!loaded || !ready) {
    return <Loader onComplete={complete} />;
  }
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.bg,
          card: colors.card,
          text: colors.white,
          primary: colors.green,
          border: colors.line,
        },
      }}
    >
      <Stack.Navigator
        initialRouteName={state.onboarded ? 'Main' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Tickets" component={Tickets} />
        <Stack.Screen name="TicketSuccess" component={TicketSuccess} />
        <Stack.Screen name="Ticket" component={TicketDetail} />
        <Stack.Screen name="Event" component={EventDetail} />
        <Stack.Screen name="Reservation" component={ReservationForm} />
        <Stack.Screen
          name="ReservationSuccess"
          component={ReservationSuccess}
        />
        <Stack.Screen name="Dish" component={DishDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Order" component={OrderDetail} />
        <Stack.Screen name="Location" component={LocationDetail} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
