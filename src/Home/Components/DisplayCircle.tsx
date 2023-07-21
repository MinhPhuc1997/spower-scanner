import { Box } from "../../components";
import Circle from "./Circle";

interface DisplayCircleProps{
  pgCircle1:number,
  pgCircle2:number,
  pgCircle3:number
}

const DisplayCircle = ({pgCircle1,pgCircle2,pgCircle3}:DisplayCircleProps)=>{

  return(
      <Box justifyContent={"center"} alignItems={"center"}>
        <Box position={"absolute"}>
          <Circle current={100} total={100} color={"#00D191"} size={80}/>
        </Box>
        <Box position={"absolute"}>
          <Circle current={100-pgCircle1} total={100} color={"#00D191"} size={80}/>
        </Box>
        <Box position={"absolute"}>
          <Circle current={100-pgCircle2} total={100} color={"#EBB520"} size={65}/>
        </Box>
        <Box position={"absolute"}>
          <Circle current={100-pgCircle3} total={100} color={"#6349F4"} size={50}/>
        </Box>
      </Box>
  )
}

export default DisplayCircle;
