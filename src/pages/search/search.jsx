import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtIcon } from 'taro-ui'
import './search.scss'
function Search() {
  let [inputVal, setInputVal] = useState('') // 搜索框值
  let [arrValue, setArrValue] = useState([]) // 搜索结果列表
  let [historyVal, setHistoryVal] = useState([]) // 历史记录
  const arr = ['普陀区', '静安区','徐汇区', '普陀区啊', '静安区','徐汇区']
  const log = ['北京', '上海', '郑州']

  const clicked = {
    onActionClick() { // 点击取消按钮,返回上一个
      console.log(1)
    },
    onChange() { // 输入框的值改变
      console.log(2);
    }

  }

  return(
    <View className="search-wrapper">
      <View>
        <AtSearchBar
          value={inputVal}
          showActionButton
          actionName="取消"
          placeholder="搜索市/区/县等"
          onActionClick={clicked.onActionClick}
          onChange={clicked.onChange}
        />
      </View>
      <View className="content">
        <View>
          <View className="title">当前定位</View>
          <View className="itemStyle">
            普陀区
          </View>
        </View>

        <View>
          <View className="title his-title">
            <View>历史记录</View>
            <AtIcon value='trash'></AtIcon>
          </View>
          <View className="box">
            {
              log.map((r, i) => {
                return (
                  <View
                    key={i}
                    className="itemStyle">
                      {r}
                  </View>
                )
              })
            }
          </View>
          
        </View>

        <View>
          <View className="title">热门城市</View>
          <View className="box">
            {
              arr.map((r, i) => {
                return (
                  <View
                    key={i}
                    className="itemStyle">
                      {r}
                  </View>
                )
              })
            }
          </View>
        </View>

        <View>
          <View className="title">热门景区</View>
          <View className="box">
            {
              arr.map((r, i) => {
                return (
                  <View
                    key={i}
                    className="itemStyle">
                      {r}
                  </View>
                )
              })
            }
          </View>
        </View>

      </View>
    </View>
  )
}
export default Search