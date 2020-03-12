import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './forecast.scss'
import IconFont from '../../components/iconfont'
import common from '../../common/common'
function Forecast(props) {
  const [today, setToday] = useState({})
  const [tomorrow, setTomorrow] = useState({})
  useEffect(() => {
    if (props.weatherList.forecast_24h) {
      setToday(props.weatherList.forecast_24h[1] || {})
      setTomorrow(props.weatherList.forecast_24h[2] || {})
    }
  }, [props.weatherList])
  // useEffect(() => {
  //   if (props.weatherList.forecast_24h) {
  //     console.log('===', props.weatherList)
  //   }
  // }, [props.weatherList]);
  return(
    <View className="forecast">
      <View className="forecast-info">
        <View className="box box-left">
          <View className="column">
            <Text>今天</Text>
            <Text>{today.max_degree}/{today.min_degree}℃</Text>
          </View>
          <View className="column">
            <Text>
              {today.day_weather === today.night_weather ? today.day_weather : today.day_weather + '转' + today.night_weather}
            </Text>
            <IconFont name={common.getIconStr(today.day_weather_code).iconName} size='45' />
          </View>
        </View>
        <View className="box">
          <View className="column">
            <Text>明天</Text>
            <Text>{tomorrow.max_degree}/{today.min_degree}℃</Text>
          </View>
          <View className="column">
            <Text>
              {tomorrow.day_weather === tomorrow.night_weather ? tomorrow.day_weather : tomorrow.day_weather + '转' + tomorrow.night_weather}
            </Text>
            <IconFont name={common.getIconStr(tomorrow.day_weather_code).iconName} size='45' />
          </View>
        </View>
      </View>
    </View>
  )
}
export default Forecast