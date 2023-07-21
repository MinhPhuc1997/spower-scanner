import { Box, Text } from "../../components";
import * as React from "react";
import DisplayCircle from "./DisplayCircle";
import { useEffect, useState } from "react";

interface chartProps{
  total:number,
  success:number,
  erorr:number,
  notSend:number
}

const initChart={
  total:100,
  success:30,
  erorr:60,
  notSend:60
}

const chartDisk = ()=>{
  const [chart,setChart] = useState<chartProps>(initChart)

  useEffect(()=>{
    console.log((chart.notSend/chart.total)*100)
  },[])
  return(
    <Box
      height={100}
      flexDirection={"row"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      <Box
        width={100}
        height={100}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <DisplayCircle
          pgCircle1={(chart.success/chart.total)*100}
          pgCircle2={(chart.erorr/chart.total)*100}
          pgCircle3={(chart.notSend/chart.total)*100} />
      </Box>
      <Box>
        <Box flexDirection={"row"} alignItems={"center"}>
          <Box
            width={10}
            height={10}
            borderRadius={"l"}
            backgroundColor={"main1"}
            marginRight={"s"}
          />
          <Text variant={"body"}>Tổng dung lượng</Text>
        </Box>
        <Box flexDirection={"row"} alignItems={"center"}>
          <Box
            width={10}
            height={10}
            borderRadius={"l"}
            backgroundColor={"main2"}
            marginRight={"s"}
          />
          <Text variant={"body"}>Tổng dung lượng</Text>
        </Box>
        <Box flexDirection={"row"} alignItems={"center"}>
          <Box
            width={10}
            height={10}
            borderRadius={"l"}
            backgroundColor={"main3"}
            marginRight={"s"}
          />
          <Text variant={"body"}>Tổng dung lượng</Text>
        </Box>
      </Box>
      <Box>
        <Text variant={"title3"}>100%</Text>
        <Text variant={"title3"}>50%</Text>
        <Text variant={"title3"}>60%</Text>
      </Box>

    </Box>
  )
}
export default chartDisk;
