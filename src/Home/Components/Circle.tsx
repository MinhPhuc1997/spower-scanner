import { View, Text, Dimensions, Animated } from 'react-native'
import React from 'react'
import HalfCircle from "./HalfCircle"

const { width } = Dimensions.get("window");
const fg = "#f20";

interface CircleProps{
  current:number,
  total:number,
  color:string,
  size:number
}

const Circle = ({ current, total, color ,size}:CircleProps) => {
  let WIDTH_SIZE = size;
  let progress = (current <= total) ? current / total * 100 : 100;
  progress =(total == 0) ? 0 : progress;
  const bg = "#fff";
  const rotateTop = (progress <= 50) ? progress / 100 * 360 : 180;
  const rotateBottom = (progress > 50) ? (progress - 50) / 100 * 360 : 0;
  const opacityTop = progress <= 50 ? 1 : 0;
  console.log(progress)
  return (
      <View style={{
        width: WIDTH_SIZE + 3,
        height: WIDTH_SIZE + 3,
        borderRadius: WIDTH_SIZE,
        transform:[{rotate:'180deg'}]
      }}>
        <View >
          <HalfCircle color={bg} size={WIDTH_SIZE} />
          <Animated.View
            style={[{
            position: "absolute", transform: [
              { translateY: WIDTH_SIZE / 4 },
              { rotate: `${rotateTop}deg` },
              { translateY: -WIDTH_SIZE / 4 },
            ],
            opacity: opacityTop,
          }]}
          >
            <HalfCircle color={color} size={WIDTH_SIZE} />
          </Animated.View>
        </View>
        <View style={{overflow:"hidden", transform: [{ rotateX: '180deg' },] }}>
          <HalfCircle color={bg} size={WIDTH_SIZE} />
          <Animated.View
            style={{
            position: "absolute", transform: [
              { translateY: WIDTH_SIZE / 4 },
              { rotate: `-${rotateBottom}deg` },
              { translateY: -WIDTH_SIZE / 4 },
            ]
          }}
          >
            <HalfCircle color={color} size={WIDTH_SIZE} />
          </Animated.View>
        </View>
        <View
          style={{
            position:"absolute",
            top:3,
            left:3,
            width:WIDTH_SIZE-6,
            height:WIDTH_SIZE-6,
            borderRadius:WIDTH_SIZE/2,
            backgroundColor:"#fff"
          }}
        />
      </View>
  )
}

export default Circle
