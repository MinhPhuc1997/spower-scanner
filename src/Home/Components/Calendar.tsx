import {Box, Text} from "../../components";
import {ScrollView, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {getNowMonth, subDate} from "../../Utils/Tools";

interface CalendarItemProps {
    mon: number,
    day: number,
    choose: boolean,
    onPress: () => void
}

const Calendar = ({onPress}) => {

    const [list, setList] = useState<any>([])

    const chooseDate = (val: any) => {
        //   list.map((el,i)=>el.choose=false)
        // @ts-ignore
        setList(list.map((e, i) => {
            if (e.mon == val.mon && e.day == val.day) {
                e.choose = true

            } else {
                e.choose = false
            }
            return e;
        }));
      onPress(val);
    }

    const getDate = () => {
        let d = new Date();
        let arr = [];
        for (let i = 0; i < 10; i++) {
            let day = subDate(d.getUTCDate(), i)
            arr.push({
                day: day,
                mon: (d.getUTCDate() - day >= 0) ? getNowMonth() : getNowMonth() - 1,
                choose: day==d.getUTCDate()
            })
        }
        setList(arr)
    }

    const testevent = (val: any) => {
        console.log(val);
    }

    useEffect(() => {
        getDate()
    }, [])

    const CalendarItem = ({mon, day, choose, onPress}: CalendarItemProps) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <Box width={65} height={52} alignItems={"center"}
                     backgroundColor={(choose === true) ? "edit" : "background"}>
                    <Text variant={"title4"}>{day}</Text>
                    <Text variant={"body"}>T.{mon}</Text>
                </Box>
            </TouchableOpacity>
        )
    }

    return (
        <Box
            height={55}
            backgroundColor={"back1"}
        >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onScrollBeginDrag={testevent}>
                {list.map((e, i) => <CalendarItem {...e} key={i} onPress={() => chooseDate(e)}/>)}
            </ScrollView>
        </Box>
    )
}

export default Calendar;
