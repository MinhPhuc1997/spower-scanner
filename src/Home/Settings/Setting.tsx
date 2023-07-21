import { Box, Text } from "../../components";
import Header from "../../components/Header";
import { Dimensions, Modal, ScrollView, TouchableOpacity } from "react-native";
import SettingItem from "../Components/SettingItem";
import { useState } from "react";
import ConfirmExit from "../Components/ConfirmExit";
import ChooseLanguage from "../Components/ChooseLanguage";

const sysList = [
  {
    label: "Dữ liệu nội bô",
    subLabel: "Ghi chép lịch sử",
    icon: "server-outline",
    hint: "",
    action: "settingManager"
  }
];

const appList = [
  {
    label: "Ngôn ngữ",
    subLabel: "Thay đổi ngôn ngữ",
    icon: "language",
    hint: "Tiếng việt",
    action: "lan"
  },
  {
    label: "Máy in",
    subLabel: "Kết nối máy in",
    icon: "print-outline",
    action: "settingPrinter",
    hint: "Đã kết nối"
  },
  {
    label: "Vị trí",
    subLabel: "Vị trí thiết bị",
    icon: "location-outline",
    hint: "Chưa định vị",
    action: "settingLocation"
  },
  {
    label: "Đăng xuất",
    subLabel: "Thay đổi tài khoản",
    icon: "log-in-outline",
    hint: "",
    action: "exit"
  }
];

const { width, height } = Dimensions.get("window");

const Setting = () => {

  const [extVisiable, setExtVisiable] = useState(false);
  const [lanVisiable, setLanVisiable] = useState(false);

  const showModal = (action: string) => {
    switch (action) {
      case "exit":
        setExtVisiable(true);
        return;
      case "lan":
        setLanVisiable(true);
        return;
    }
  };

  return (
    <Box flex={1}>
      <Header title={"Cài đặt"} />
      <Box padding={"s"}>
        <Box>
          <Text variant={"title4"}>Dữ liệu</Text>
        </Box>
        <ScrollView>
          {sysList.map((e, i) => {
              return (
                <SettingItem key={i} {...e} onShow={(action) => {
                  showModal(action);
                }} />);
            }
          )}
        </ScrollView>
        <Box marginTop={"s"}>
          <Text variant={"title4"}>Hệ thống</Text>
        </Box>
        <ScrollView>
          {appList.map((e, i) => {
            return (
              <SettingItem key={i} {...e} onShow={(action) => {
                showModal(action);
              }} />
            );
          })}
        </ScrollView>
      </Box>
      {(extVisiable || lanVisiable) && (
        <Box position={"absolute"}
             width={width}
             height={height + 200}
             opacity={0.4}
             backgroundColor={"secondary"}
        />)}
      <ConfirmExit
        visible={extVisiable}
        exit={() => setExtVisiable(false)}
      />
      <ChooseLanguage
        visible={lanVisiable}
        choose={() => {
        }}
        exit={() => setLanVisiable(false)}
      />
    </Box>
  );
};

export default Setting;
