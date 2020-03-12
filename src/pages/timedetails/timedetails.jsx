import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './timedetails.scss'
import common from '../../common/common'
import moment from '../../common/moment'
import IconFont from '../../components/iconfont'
function Timedetails(props) {
  const [time, setTime] = useState([])
  useEffect(() => {
    let forecast_1h = props.weatherList.forecast_1h // 时间
    let _rise = [] // 日出日落时间
    let _arr = [] // 处理时间
    let sun = []
    if (forecast_1h) {
        // console.log('forecast_1h', typeof forecast_1h) // Object
      _rise.push(props.weatherList.rise[0], props.weatherList.rise[1]) // 今天和明天的日出日路
      // 处理日出日落时间
      _rise.map((r) => {
        r.riseSun = moment(r.time + 'T' + r.sunrise.replace(/[^0-9.]/g, '')).format('YYYY-MM-DD HH:mm') // 日出
        r.setSun = moment(r.time + 'T' + r.sunset.replace(/[^0-9.]/g, '')).format('YYYY-MM-DD HH:mm') // 日落
        // console.log(r)
      })
      // console.log('_rise-', _rise)
      for (let index = 0; index < Object.keys(forecast_1h).length; index++) {
        if (index < 24) {
          _arr.push(forecast_1h[index])
          let nyr = _arr[index].update_time.substr(0, 8) // 年月日
          let sfm = _arr[index].update_time.substr(8, 12) // 时分秒
          _arr[index].time = moment(nyr + 'T' + sfm).format('YYYY-MM-DD HH:mm')
          _arr[index].icon = common.getIconStr(_arr[index].weather_code).iconName
          // console.log(moment(_arr[index].time))
          // console.log(_arr[index].time)
          // 确定日出日落 的 index 位置 TODO:index
          if (moment(_arr[index].time).isBefore(_rise[0].riseSun)) {
            sun[0] = { time: _rise[0].riseSun, i: index, name: '日出', type: 1 };
          } else if (moment(_arr[index].time).isBefore(_rise[0].setSun)) { 
            sun[1] = { time: _rise[0].setSun, i: index, name: '日落', type: 2 };
          } else if (moment(_arr[index].time).isBefore(_rise[1].riseSun)) {
            sun[2] = { time: _rise[1].riseSun, i: index, name: '日出', type: 1 };
          } else if (moment(_arr[index].time).isBefore(_rise[1].riseSun)) {
            sun[3] = { time: _rise[1].setSun, i: index, name: '日落', type: 2 };
          }
        }
      }
      // console.log('sun', sun)
      let count = 1
      sun.filter((r) => r).map((r) => {
        _arr.splice(r.i + count, 0, { 
          time: r.time,
          degree: r.name,
          type: r.type,
          icon: common.getIconStr(r.type === 1 ? '888' : '999').iconName
        })
        count++;
      });
      setTime(_arr)
      // console.log('count', _arr);
    }
  }, [props.weatherList])
  
  return(
    <ScrollView
      className='scrollview'
      scrollX
      scrollWithAnimation
    >
      {
        time && time.map((r, i) => {
          return (
            <View key={String(i)} className="scroll-item">
              <View className="c-666">{moment(r.time).format('HH:mm')}</View>
              <View><IconFont name={r.icon} size="45" /></View>
              <View>{r.degree + (r.type ? '' : '°')}</View>
            </View>
          )
        })
      }
    </ScrollView>
  )
}
export default Timedetails
