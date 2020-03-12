import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './main.scss'

function Main(props) {
  const wind_direction = ['东风', '', '', '西北风', '', '', '东南风'] // 风向
  const [isShow, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(!isShow);
      // console.log('arr--', isShow);
    }, 8000);
  }, [isShow]);

  return (
    <View className="main">
      <View className="t-c">
          <View className="f-100">{props.weatherList.observe.degree}°</View>
          <View>{props.weatherList.observe.weather}</View>

          <View className="animation">
            <Text className={isShow ? 'show item' : 'item'}>
              湿度 {props.weatherList.observe.humidity}%
            </Text>
            <Text className={isShow ? 'item' : 'show item'}>
              {props.weatherList.direction[props.weatherList.observe.wind_direction]} {props.weatherList.observe.wind_power}级
            </Text>
          </View>

          <View className="ptb-50">
            <Text>
              {obser_tips ? props.weatherList.tips.observe[0] : props.weatherList.tips.observe[1]}
            </Text>
          </View>

        </View>
    </View>
  )
}
export default Main