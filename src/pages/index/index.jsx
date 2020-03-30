import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import common from '../../common/common'
import './index.scss'
import Header from '../header/header'
import Main from '../main/main'
import Forecast from '../forecast/forecast' // 今天明天
import Timedetails from '../timedetails/timedetails' // 24小时详情
import Trenddetails from '../trenddetails/trenddetails' // 图表趋势详情
import Reminder from '../reminder/reminder' // 温馨提示
function Index() {
  const wind_direction = ['东风', '', '', '西北风', ''] // 风向
  const air_bgc = ['#a3d765', '#f5d450', '#f1ab62', '#ef7f77', '#b28ccb'];
  const [bgc, setBgc] = useState('#a6cc6a')
  const [weatherList, setweatherList] = useState({})
  const [observe, setObserve] = useState({})

  const obser_tips = false
  // componentDidShow 页面生命周期钩子
  const [count, setCount] = useState(0);

  useDidShow(() => {
    if (!count) {
      Taro.getLocation({
        type: 'gcj02',
        success: function(res) {
          console.log(res);
        }
      });
      Taro.setStorage({
        key: 'active',
        data: []
      });
      // 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容
      setCount(1)
      testHandler([])
      return
    }
    // Taro.getStorage 的同步版本
    try {
      var value = Taro.getStorageSync('active');
      console.log('value', value)
      if (value) {
        // Do something with return value
        testHandler(value.split(','))
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  })
  const testHandler = (params) => {
    console.log(params);
    
    Taro.request({
      // url: 'https://wwxinmao.top/api/weather',
      url: common.ajax('weather'),
      method: 'POST',
      data: {
        city: params
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      let data = res.data.item
      setweatherList(data) // 获取数据list
      setObserve(data.observe) // 获取当前天气数据
      setBgc(air_bgc[data.air.aqi_level - 1]) // 获取当前天气数据
      console.log('res.data.item', data)
    })
  }
  return (
    <View className="index">
      <View className="top-info">
        <Header weatherList={weatherList}></Header>
        <View className="release">
          <Text>中央气象台</Text>
          <Text className="plr-10">
            {observe.update_time && observe.update_time.slice(observe.update_time.length - 4, observe.update_time.length - 2) +
              ':' +
              observe.update_time.slice(observe.update_time.length - 2)}
            </Text>
          <Text>发布</Text>
        </View>
        <View style={`background-color:` + bgc} className="air-quality">
          <View>{weatherList.air.aqi}</View>
          <View>{weatherList.air.aqi_name}</View>
        </View>
          
        <Main weatherList={weatherList}></Main>
      </View>
      <Forecast weatherList={weatherList}></Forecast>
      <Timedetails weatherList={weatherList}></Timedetails>
      <Trenddetails weatherList={weatherList}></Trenddetails>
      <Reminder weatherList={weatherList}></Reminder>
      <View className="data-desc">
        数据来源于中国天气网11
      </View>
    </View>
  )
}
export default Index
