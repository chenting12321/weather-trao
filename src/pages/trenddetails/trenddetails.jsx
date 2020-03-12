import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './trenddetails.scss'
import common from '../../common/common'
import moment from '../../common/moment'
import IconFont from '../../components/iconfont'
import { Echart } from 'echarts12'
function TrendDetails(props) {
  const [time, setTime] = useState([])
  const [option, setOption] = useState({});

  useEffect(() => {
    const [arr, date, week] = [
      [], ['昨天', '今天', '明天', '后天'],
      ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    ]
    if (props.weatherList) {
      let forecast_24h = props.weatherList.forecast_24h
      if (forecast_24h) {
        for (let index = 0; index < Object.keys(forecast_24h).length; index++) {
          if (index < 6) {
            let forecast = forecast_24h[index]
            let _time =  {_time: moment(forecast.time)} // 时间
            Object.assign(forecast, _time) // 合并对象
            // console.log('++', forecast._time.format('d')) // 星期几, 0~6
            let _week = {
              title: date[index] ? date[index] : week[forecast._time.format('d')]
            }
            Object.assign(forecast, _week)
            arr.push(forecast)
          }
        }
        setTime(arr)
        setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false
          },
          yAxis: {
            type: 'value',
            show: false
          },
          grid: {
            left: '6%',
            right: '6%',
            bottom: '20%',
            top: '20%',
            containLabel: false
          },
          series: [
            {
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              data: arr.map((r) => r.max_degree),
              itemStyle: {
                color: '#f0cc35',
                // lineStyle: {
                //   width: 5
                // }
              },
              label: {
                show: true,
                position: 'bottom',
                // color: '#434343',
                color: 'green',
                fontSize: 14,

                formatter: (r) => r.value + '°'
              }
            },
            {
              type: 'line',
              smooth: true,
              symbolSize: 6,
              symbol: 'circle',
              data: arr.map((r) => r.min_degree),
              itemStyle: {
                color: '#3bbcff',
                // lineStyle: {
                //   width: 5
                // }
              },
              label: {
                show: true,
                position: 'top',
                color: 'red',
                fontSize: 14,
                formatter: (r) => {
                  console.log('r', r);
                  return r.value + '°';
                }
              }
            }
          ]
        });
        console.log('++', time);
        console.log('--', option);
      }
    }
  }, [props.weatherList])

  return(
    <View className="trenddetails">
      <View className="header">
        {
          time && time.map((k, index) => {
            return (
              <View className="item" key={String(index)} >
                <View className="c-666">{k.title}</View>
                <View className="c-666">{k._time.format('MM/DD')}</View>
                <View className={index ? 'l-60 ' : 'l-60 c-666'}>{k.day_weather}</View>
                <IconFont className="l-60" name={common.getIconStr(k.day_weather_code).iconName} size="45" />
              </View>
            )
          })
        }
      </View>
      
      
      <View className="center">
          {JSON.stringify(option) !== '{}' && <Echart option={option} style={'height: 150px'} />}
      </View>
      
      <View className="footer">
        {
          time && time.map((k, index) => {
            return (
              <View className="item" key={String(index)} >
                <IconFont className="l-60" name={common.getIconStr(k.night_weather_code).iconName} size="45" />
                <View className={index ? 'l-60 ' : 'l-60 c-666'}>{k.night_weather}</View>
                <View className="c-666">{k.night_wind_direction}</View>
                <View className="c-666">{k.night_wind_direction_code}级</View>
              </View>
            )
          })
        }
      </View>
      
    </View>
  )
}
export default TrendDetails