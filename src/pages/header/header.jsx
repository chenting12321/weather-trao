import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './header.scss'
import { AtIcon } from 'taro-ui'

function Header(props) {
  let [loction, setLoction] = useState({});
  useEffect(() => {
    if (props.weatherList) {
      setLoction(props.weatherList.loc || {});
    }
  }, [props.weatherList]);
  const clickMap = () => {
    Taro.navigateTo({ url: '/pages/search/search'})
  }
  return (
    <View>
      <View className="header">
        <View className="header-left" onClick={clickMap}>
          <AtIcon value='map-pin' size="16" className="icon"></AtIcon>
          <Text>{loction.length === 2 ? loction[0] + ' - ' + loction[1] : (loction[1] || '').trim() + ' - ' + (loction[2] || '').trim()}</Text>
        </View>
        <View className="header-right">
          <AtIcon value='file-generic' size="16" className="icon"></AtIcon>
        </View>

      </View>
    </View>
  )
}
export default Header
