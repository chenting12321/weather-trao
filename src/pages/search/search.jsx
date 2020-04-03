import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtIcon, AtList, AtListItem } from 'taro-ui'
import './search.scss'
import common from '../../common/common'
function Search() {
  let [inputVal, setInputVal] = useState('') // 搜索框值
  let [searchArr, setSearchArr] = useState([]) // 搜索结果列表
  let [historyArr, setHistoryArr] = useState([]) // 历史记录
  let [isShow, setIsShow] = useState(true) // 点击搜索,下方的内容显隐
  const arr = ['普陀区', '静安区','徐汇区', '普陀区啊', '静安区','徐汇区']
  const log = ['北京', '上海', '郑州']

  // 第一次进来查找历史记录
  useDidShow(() => { // 等同于 componentDidHide 页面生命周期钩子
    Taro.getStorage({
      key: 'historyData',
      success (res) {
        console.log('try', res.data)
        setHistoryArr(res.data);
      }
    })
    // try {
    //   var value = Taro.getStorageSync('historyData');
    //   if (value) {
    //     setHistoryArr(Array.from(new Set(value)));
    //   }
    // } catch (e) {
    //   setHistoryArr([]);
    // }
  })
  const clicked = {
    onActionClick() { // 点击取消按钮,返回index页面
      // Taro.navigateTo({url: '../index/index'})
      Taro.navigateBack()
      Taro.setStorage({
        key: 'isRefresh',
        data: true
      });
    },
    onChange(val) { // 输入框的值改变
      console.log(!val.trim());
      if(!val.trim()) { // 输入框值为空
        return;
      }
      setInputVal('')
      Taro.request({
        url: common.ajax('selWeather'),
        method: 'POST',
        data: {
          city: val
        },
        header: {
          'content-type': 'application/json'
        }

      }).then(res => {
        console.log(res)
        let data = res.data.item
        if (Object.keys(data.internal).length) {
          setSearchArr(Object.values(data.internal)) // 输入框输入数据搜索出来的值
        }
   
      })


    },
    clickChecked(index) { // 选择搜索事件
      // console.log('index', index);
      // console.log('searchArr', searchArr[index])
      console.log('historyArr', historyArr);
      
      let _newArr = historyArr // 历史列表
      _newArr.unshift(searchArr[index]) // 把搜索的插入历史记录
      if (_newArr.length > 3) {
        _newArr = _newArr.slice(0, 2) // 只保留最新
      }
      setHistoryArr(_newArr) // 历史记录
      console.log('_newArr', _newArr);
      console.log('--', historyArr);

      // 把最新的三个历史搜索记录保存起来
      Taro.setStorage({
        key: "historyData",
        data: _newArr
      })
      Taro.setStorage({
        key: "active",
        data: _newArr[0].split(',')
      })
      // 保存之后清空数据
      setHistoryArr([]) // 历史数据
      setInputVal('') // 文本框数据
      setIsShow(true)
      Taro.navigateBack() // 选择之后跳回index页面
    },
 
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
          onFocus={() => {
            setIsShow(false)
          }}
          onBlur={() => {
            setIsShow(true)
          }}
        />
        {searchArr && searchArr.map((r, i) => {
          return (
            <AtList key={i + ''}>
              <AtListItem title={r} onClick={clicked.clickChecked.bind(this, i)} />
            </AtList>
          )
        })}
     
      </View>
      <View className="content" style={isShow ? { display: 'block' } : { display: 'none' }}>
        <View>
          <View className="title">当前定位</View>
          <View className="itemStyle">
            普陀区
          </View>
        </View>

        <View>
          <View className="title his-title">
            <View>历史记录</View>
            <AtIcon value='trash' size="14" onClick={() => {
              Taro.setStorage({
                key: 'historyData',
                data: []
              });
              setHistoryArr([])
            }}>

            </AtIcon>
          </View>
          <View className="box">
            {
              historyArr.map((r, i) => {
                return (
                  <View
                    key={i + ''}
                    className="itemStyle"
                    onClick={() => {
                      Taro.setStorage({
                        key: 'active',
                        data: r.split(',')
                      });
                      Taro.navigateBack();
                    }}>
                      {r.split(',')[r.split(',').length - 1]}
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