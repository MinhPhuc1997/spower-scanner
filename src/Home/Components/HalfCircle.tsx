import { View } from "react-native";

interface HalfCircleProps{
  size:number,
  color:string
}
const HalfCircle =({size,color}:HalfCircleProps)=>{
  return(
    <View style={{ width: size, height: size / 2, overflow: "hidden" }}>
      <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size  }} />
    </View >
  )
}

export default HalfCircle;
