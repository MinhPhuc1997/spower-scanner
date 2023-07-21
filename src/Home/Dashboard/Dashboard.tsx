import * as React from "react";
import {Box, Text} from "../../components";
import {Dimensions, Image, ScrollView, TouchableOpacity, View} from "react-native";
import DisplayMenu from "../Components/DisplayMenu";
import {StatusBar} from 'react-native';
import AntDesgin from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import {HomeRoute} from "../../components/Navigation";
import {listMenu} from "../../Utils/Contants";
import {useEffect, useState} from "react";
import {getData} from "../../Utils/Storage";

const {width, height} = Dimensions.get("window");

const HEIGHT_SIZE = StatusBar.currentHeight;

const Dashboard = () => {
    const [user, setUser] = useState<string>("");
    const getUserLogin = async () => {
        let user = await getData('userLogin');
        console.log(user,"user")
        if (user != undefined) {
            setUser(user);
        }
    }
    useEffect(() => {
        getUserLogin();
    }, [])
    const navigation = useNavigation<HomeRoute>();
    return (
        <Box flex={1}>
            <View style={{height: HEIGHT_SIZE, backgroundColor: "#006FAC"}}/>

            <ScrollView>
                <Image
                    source={require("../Assets/HomeMain.png")}
                    style={{width, height: height * 0.3}}/>
                <DisplayMenu list={listMenu}/>
                <Box position={"absolute"} top={10} left={20} flexDirection={"row"} justifyContent={"center"}>
                    <Text variant={"title2White"}>Thông tin tài khoản</Text>
                </Box>
                <Box position={"absolute"} top={40} left={20} flexDirection={"row"} justifyContent={"center"}>
                    <AntDesgin name={"user"} size={17} color={"#fff"}/>
                    <Text variant={"title2White"}>: {user}</Text>
                </Box>
            </ScrollView>
            <Box position={"absolute"} top={(HEIGHT_SIZE != undefined) ? (HEIGHT_SIZE + 10) : 70} right={10} height={30}
                 width={30}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Setting')
                }}>
                    <AntDesgin name={"setting"} color={"#fff"} size={24}/>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};

export default Dashboard;
