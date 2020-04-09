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
  const air_bgc = ['#a3d765', '#f5d450', '#f1ab62', '#ef7f77', '#b28ccb']; // 空气质量背景色
  const [bgc, setBgc] = useState('#a6cc6a')
  const [weatherList, setweatherList] = useState({}) // 获取数据list
  const [observe, setObserve] = useState({}) // 当前空气数据

  // componentDidShow 页面生命周期钩子
  useDidShow(() => {
    // Taro.getStorage 的同步版本
    let [isRefresh, activeVal] = [false, []] // 是否刷新, 当前地址
    try {
      isRefresh = Taro.getStorageSync('isRefresh');
    } catch (e) {
      console.log('报错提示', e);
    }
    if (isRefresh) {
      // 不希望刷新，但是要重新置空
      Taro.setStorage({
        key: 'isRefresh',
        data: false
      });
      return;
    }
    try {
      activeVal= Taro.getStorageSync('active');
      console.log('activeVal', activeVal)
      // if (value) {
      //   // Do something with return value
      //   httpWeather(value.split(','))
      // }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
    init(activeVal) // 把active的地址传入
  })
  const init = (activeVal) => {
    let address = []
    if (activeVal.length) {
      httpWeather(Array.isArray(activeVal) ? activeVal : activeVal.split(','))
    }
    console.log('...', activeVal);
    
    new Promise ((res) => {
      if (process.env.TARO_ENV === 'weapp') { // weapp
        Taro.getLocation({
          type: 'gcj02', // 默认值 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: (res) => [
            Taro.request({
              url: `https://restapi.amap.com/v3/geocode/regeo?key=2e274b34f0284d295206dd1f8afca37c&location=${res.longitude},${res.latitude}&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0`,
              header: {
                'content-type': 'application/json'
              }
            }).then((data) => {
              console.log('res', res);
              console.log('data', data)
              let _data = data.data.regeocode.addressComponent
              Taro.setStorage({ // 当前定位
                key: "loct",
                data: _data.district
              })
              if (!_data.city.length) {
                address.push(_data.province, _data.province, _data.district)
              } else {
                address.push(_data.province, _data.city, _data.district)
              }
              // res();
            })
          ]
        })

      } else if (process.env.TARO_ENV === 'h5') { // h5
        Taro.request({
          url: 'https://restapi.amap.com/v3/ip?key=2e274b34f0284d295206dd1f8afca37c',
          header: {
            'content-type': 'application/json'
          }
        }).then((data) => {
          address.push(data.data.province, data.data.city);
          // res();
        });
      }
    })
    new Promise ((res) => {
      console.log('999', res);
      Taro.setStorage({
        key: 'active',
        data: address
      })
      httpWeather(address) // active的地址
      // res()
    })

  }
  const httpWeather = (params) => {
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
        数据来源于中国天气网
      </View>
    </View>
  )
}
export default Index
