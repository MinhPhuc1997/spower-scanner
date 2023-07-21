import { Box, Text } from "../../components";
import { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";

const initList = [
  {
    time: "08:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "09:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "08:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "08:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "09:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "09:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "99:99",
    pallet: "9999",
    pidNo: 9999
  },
  {
    time: "04:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "09:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "08:24",
    pallet: "A1245",
    pidNo: 30
  },
  {
    time: "09:24",
    pallet: "A1245",
    pidNo: 30
  }
];

const { width, height } = Dimensions.get("window");

const ContentDetail = () => {
  const [list, setList] = useState(initList);

  const ContentItem = ({ time, pallet, pidNo }) => {
    return (
      <TouchableOpacity>
        <Box flexDirection={"row"} padding={"s"} backgroundColor={"background"} justifyContent={"space-between"}>
          {(time == "99:99") ? (
            <Box height={2} backgroundColor={"blue5"} width={width - 16}>
              <Box height={10} backgroundColor={"blue5"} width={10} borderRadius={"xl"} position={"absolute"} top={-5}>
              </Box>
            </Box>
          ) : (
            <Box flexDirection={"row"} justifyContent={"space-between"} width={width-16}>
              <Box flexDirection={"row"}>
                <Text variant={"body"}>{time}</Text><Box flexDirection={"row"} marginLeft={"s"}>
                <Box backgroundColor={"main1"} width={5} />
                <Box paddingLeft={"s"}>
                  <Text variant={"title4"}>{pallet}</Text>
                  <Text variant={"body"}>Đã scan {pidNo} cuộn </Text>
                </Box>
              </Box>
              </Box>
                <Box>
                  <Text variant={"detail"}>xem chi tiết</Text>
                </Box>

            </Box>
          )}
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box height={height - 48 - 60}>
      <ScrollView>
        {list.map((e, i) => <ContentItem {...e} key={i} />)}
      </ScrollView>
    </Box>
  );
};

export default ContentDetail;
