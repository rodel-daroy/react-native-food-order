import React from "react";
import { createAppContainer, createDrawerNavigator, createStackNavigator } from "react-navigation";
import ForgotScreen from "../Auth/Forgot";
import LoginScreen from "../Auth/Login";
import SignUpScreen from "../Auth/SignUp";
import VerifyScreen from "../Auth/Verify";
import CartScreen from "../Order/Cart";
import Checkoutscreen from "../Order/Checkout";
import EntreeScreen from "../Order/Entree";
import EntreeDetailScreen from "../Order/EntreeDetail";
import OrderVerifyScreen from "../Order/OrderVerify";
import ViewOrderScreen from "../Order/ViewOrder";
import HomeScreen from "../SideBar/Home";
import HomeDetailScreen from "../SideBar/HomeDetail";
import MenuScreen from "../SideBar/Menu";
import MyOrdersScreen from "../SideBar/MyOrders";
import RewardsScreen from "../SideBar/Rewards";
import SideBar from "../SideBar/SideBar";

const drawer = createDrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Menu: { screen: MenuScreen },
        Rewards: { screen: RewardsScreen },
        MyOrders: { screen: MyOrdersScreen }
    },
    {
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: 300
    }
);

const stack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen, navigationOptions: {
                header: null,
            }
        },
        SignUp: {
            screen: SignUpScreen, navigationOptions: {
                header: null,
            }
        },
        Forgot: {
            screen: ForgotScreen, navigationOptions: {
                header: null,
            }
        },
        Verify: {
            screen: VerifyScreen, navigationOptions: {
                header: null,
            }
        },
        HomeScreenRouter: { screen: createAppContainer(drawer) },
        HomeDetail: {
            screen: HomeDetailScreen, navigationOptions: {
                header: null,
            }
        },
        Entree: {
            screen: EntreeScreen, navigationOptions: {
                header: null,
            }
        },
        EntreeDetail: {
            screen: EntreeDetailScreen, navigationOptions: {
                header: null,
            }
        },
        Cart: {
            screen: CartScreen, navigationOptions: {
                header: null,
            }
        },
        OrderVerify: {
            screen: OrderVerifyScreen, navigationOptions: {
                header: null,
            }
        },
        Checkout: {
            screen: Checkoutscreen, navigationOptions: {
                header: null,
            }
        },
        ViewOrder: {
            screen: ViewOrderScreen, navigationOptions: {
                header: null,
            }
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
);

const AuthRouter = createAppContainer(stack);
export default AuthRouter;