import {Box, Text} from "../../components";
import {Dimensions, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const {width} = Dimensions.get("window");

interface TimeLineItemProps {
    title: string,
    time: string,
    pallet: string,
    location: string,
    weight: string,
    type:number
}

interface TimeLineProps {
    data: Array<TimeLineItemProps>
}

const TimeLine = ({data}: TimeLineProps) => {
    return (
        <Box>
            <ScrollView>
                {data.map((e, i) => {
                    return (
                        <TimeLineItem
                            type={e.type}
                            key={i}
                            title={e.title}
                            time={e.time}
                            pallet={e.pallet}
                            location={e.location}
                            weight={e.weight}/>
                    )
                })}

            </ScrollView>
        </Box>
    )
}

const TimeLineItem = ({title, time, pallet, location, weight,type}: TimeLineItemProps) => {
    let color = (type==0)?"info":(type==1)?"main1":(type==2)?"main2":"danger";
    return (
        <Box>
            <Box height={15} width={15} borderRadius={"xl"} backgroundColor={color}>
                <Box width={200} height={300} marginLeft={"m"} style={{marginTop: -3,marginBottom:7}} >
                    <Box flexDirection={"row"} justifyContent={"space-between"} width={width - 35}>
                        <Text variant={"title3"} style={{marginLeft:5}}>{title}</Text>
                        <Text variant={"bodyI"}>{time}</Text>
                    </Box>
                    <Box flexDirection={"row"} justifyContent={"space-between"} width={width - 35}>
                        <Box flexDirection={"row"} alignItems={"center"}>
                            <Icon name={"shipping-pallet"} color={"#078474"} size={17} style={{marginBottom: -3}}/>
                            <Text variant={"body"}>Pallet: {pallet}</Text>
                        </Box>
                        <Box flexDirection={"row"} alignItems={"center"} position={"absolute"} left={width/2.5}>
                            <Icon name={"weight-kilogram"} color={"#0075FD"} size={17} style={{marginBottom: -3}}/>
                            <Text variant={"body"}>{weight} KG</Text>
                        </Box>
                        <Box flexDirection={"row"} alignItems={"center"}>
                            <Text variant={"body"}>{location}</Text>
                            <Icon name={"crosshairs-gps"} color={"#FE5E33"} size={17} style={{marginBottom: -1}}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box height={50} width={1} backgroundColor={"secondary"} style={{margin: 7}}/>
        </Box>
    )
}

export default TimeLine;