import React, { useEffect } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack'
import { HomePage, PaymentPage } from '../page'

const Stack = createStackNavigator()

const Router = (props) => {
    const forFade = ({ current }) => ({
        cardStyle: { opacity: current.progress },
    })
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ffffff',
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,
                }}
                initialRouteName={'HomePage'}
            >
                {/* 홈 화면 */}
                <Stack.Screen
                    name="HomePage"
                    component={HomePage}
                    headerShown={false}
                    options={{
                        headerShown: false,
                        cardStyleInterpolator: forFade,
                        gestureDirection: 'horizontal',
                    }}
                />
                {/* 결제 화면 */}
                <Stack.Screen
                    name="PaymentPage"
                    headerShown={false}
                    options={{
                        cardStyleInterpolator:
                            CardStyleInterpolators.forHorizontalIOS,
                    }}
                    component={PaymentPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
Router.defatulProps = {
    userInfo: null,
}
