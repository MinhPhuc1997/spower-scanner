import {Box, Text} from "../../components";
import {TouchableOpacity} from "react-native";

interface palletInfoProps {
    object: any
}

const PalletInfo = ({object}: palletInfoProps) => {
    console.log(object)
    return (
        <TouchableOpacity>
            <Box flexDirection={"row"} marginBottom={"s"}>
                <Box width={50} height={50}
                     backgroundColor={"main1"}
                     alignItems={"center"}
                     justifyContent={"center"}
                     borderRadius={"s"}>
                    <Text variant={"title4"}>{object.index}</Text>
                </Box>
                <Box height={50} flex={1} marginLeft={"s"} justifyContent={"center"}>
                    <Box flexDirection={"row"} justifyContent={"space-between"}>
                        <Text variant={"title3"}>{object.storeLoadCode}</Text>
                        <Text variant={"bodyI"}>{object.sumWeight} KG</Text>
                    </Box>
                    <Box>
                        <Text variant={"bodyP"}>Có {object.pidCount} cây vải trong pallet</Text>
                    </Box>
                </Box>
            </Box>
        </TouchableOpacity>
    )
}

export default PalletInfo;