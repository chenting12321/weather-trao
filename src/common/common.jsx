let commons = {
  ajax(url) {
    return `https://wwxinmao.top/api/${url}`;
  },
  getIconStr(code) {
    // console.log('code', code)
    let arr = {}
    if (code) {
      arr = this.iconStr.filter((r) => r.n === code)[0];
    }
    return arr;
  },
  iconStr: [
    { n: '00', name: '晴', iconName: 'qingtian' },
    { n: '01', name: '多云', iconName: 'duoyun' },
    { n: '02', name: '阴', iconName: 'yintian' },
    { n: '03', name: '阵雨', iconName: 'zhenyu' },
    { n: '04', name: '雷阵雨', iconName: 'leizhenyu' },
    { n: '05', name: '雷阵雨伴有冰雹', iconName: 'leizhenyubanyoubingbao' },
    { n: '06', name: '雨夹雪', iconName: 'yujiaxue' },
    { n: '07', name: '小雨', iconName: 'xiaoyu' },
    { n: '08', name: '中雨', iconName: 'zhongyu' },
    { n: '09', name: '大雨', iconName: 'dayu' },
    { n: '10', name: '暴雨', iconName: 'baoyu' },
    { n: '11', name: '大暴雨', iconName: 'tedabaoyu' },
    { n: '12', name: '特大暴雨', iconName: 'tedabaoyu-D' },
    { n: '13', name: '阵雪', iconName: 'zhenxue' },
    { n: '14', name: '小雪', iconName: 'xiaoxue' },
    { n: '15', name: '中雪', iconName: 'zhongxue' },
    { n: '16', name: '大雪', iconName: 'daxue' },
    { n: '17', name: '暴雪', iconName: 'baoxue' },
    { n: '18', name: '雾', iconName: 'wu' },
    { n: '19', name: '冻雨', iconName: 'dongyu' },
    { n: '20', name: '沙尘暴', iconName: 'shachenbao' },
    { n: '21', name: '小到中雨', iconName: 'zhongyu' },
    { n: '22', name: '中到大雨', iconName: 'dayu' },
    { n: '23', name: '大到暴雨', iconName: 'baoyu' },
    { n: '24', name: '暴雨到大暴雨', iconName: 'tedabaoyu' },
    { n: '25', name: '大暴雨到特大暴雨', iconName: 'tedabaoyu-D' },
    { n: '26', name: '小到中雪', iconName: 'zhongxue' },
    { n: '27', name: '中到大雪', iconName: 'daxue' },
    { n: '28', name: '大到暴雪', iconName: 'baoxue' },
    { n: '29', name: '浮尘', iconName: 'fuchen' },
    { n: '30', name: '扬沙', iconName: 'Group1' },
    { n: '31', name: '强沙尘暴', iconName: 'qiangshachenbao' },
    { n: '53', name: '霾', iconName: 'wumai' },
    { n: '99', name: '无', iconName: '' },
    { n: '32', name: '浓雾', iconName: 'lan-dawu' },
    { n: '49', name: '强浓雾', iconName: 'lan-dawu' },
    { n: '54', name: '中度霾', iconName: 'zhongdumai' },
    { n: '55', name: '重度霾', iconName: 'zhongdumai1' },
    { n: '56', name: '严重霾', iconName: 'yanzhongmai' },
    { n: '57', name: '大雾', iconName: 'lan-dawu' },
    { n: '58', name: '特强浓雾', iconName: 'tianqi-teqiangnongwu' },
    { n: '301', name: '雨', iconName: 'yintian' },
    { n: '302', name: '雪', iconName: 'xiaoxue' },
    { n: '999', name: '日出', iconName: 'rise' },
    { n: '888', name: '日落', iconName: 'set' }
  ]
}
export default commons