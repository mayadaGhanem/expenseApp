/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import ColorsPalette from './constants/colors.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from './components/IconButton';
import {ExpenseContextProvider} from './store/context-store';
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: ColorsPalette.primary900,
        },
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: ColorsPalette.primary900},
        tabBarActiveTintColor: ColorsPalette.accentColor,
        headerRight: ({tintColor}) => (
          <IconButton
            name={'plus'}
            color={tintColor}
            size={24}
            onPress={()=>navigation.navigate('ManageExpense')}
          />
        ),
      })}>
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'Expenses',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ExpensesOverView"
            screenOptions={{
              headerStyle: {
                backgroundColor: ColorsPalette.primary900,
              },
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="ExpensesOverView"
              component={MyTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{presentation: 'modal'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}

export default App;
