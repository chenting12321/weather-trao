
import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './reminder.scss'
import IconFont from '../../components/iconfont'
import { AtIcon } from 'taro-ui'
function Reminder(props) {
  const [arr, setArr] = useState([])
  // let a = ['clothes', 'umbrella', 'cold', 'carwash', 'sports', 'ultraviolet', 'fish', 'tourism']
  useEffect(() => {
    let _arr = []
    let tips = props.weatherList.index
    if (tips) {
      for (let index = 0; index < Object.keys(tips).length; index++) {
          const _key = Object.keys(tips) // 对象键值
          // console.log('_key', _key);
          const _value = tips[_key[index]]
          // console.log('_value',_value);
          if (_value) {
            _arr.push(_value)
          }
      }
      console.log(_arr)
      setArr(_arr)
    }
  }, [props.weatherList])

  return (
    <Swiper indicatorDots="true" className="reminder">
      <SwiperItem>
        <View class="swiper-item" >
          {
            arr && arr.slice(0, 4).map((r, i) => {
              return (
                <View key={String(i)} className="list">
                  <AtIcon value='heart' size="18"/>

                  <View>{r.info}</View>
                  <View className="c-666">{r.name}</View>
                </View>
              )
            })
          }
          
        </View>
        <View class="swiper-item">
          {
            arr && arr.slice(4, 8).map((r, i) => {
              return (
                <View key={String(i)} className="list">
                  <AtIcon value='heart' size="18"/>

                  <View>{r.info}</View>
                  <View className={r.name.length > 4 ? 'c-666 f-10' : 'c-666'}>{r.name}</View>
                </View>
              )
            })
          }
        </View>
      </SwiperItem>
      <SwiperItem>
      <View class="swiper-item" >
          {
            arr && arr.slice(8, 12).map((r, i) => {
              return (
                <View key={String(i)} className="list">
                  <AtIcon value='heart' size="18"/>
                  <View>{r.info}</View>
                  <View className="c-666">{r.name}</View>
                </View>
              )
            })
          }
          
        </View>
        <View class="swiper-item">
          {
            arr && arr.slice(12, 16).map((r, i) => {
              return (
                <View key={String(i)} className="list">
                  <AtIcon value='heart' size="18"/>
                  <View>{r.info}</View>
                  <View className={r.name.length > 4 ? 'c-666 f-10' : 'c-666'}>{r.name}</View>
                </View>
              )
            })
          }
        </View>
      </SwiperItem>
     </Swiper>
  )

}
export default Reminder
