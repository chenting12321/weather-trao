Component({
  properties: {
    // set | rise | duoyun | yintian | leizhenyubanyoubingbao | qiangshachenbao | shachenbao | tianqi-teqiangnongwu | lan-dawu | dongyu | tedabaoyu | tedabaoyu-D | zhongdumai | zhongdumai1 | yanzhongmai | fuchen | zhenxue | qingtian | manyue | shaoyun | canyue | baoyu | dayu | baoxue | daxue | dayuzhuanqing | duoyunzhuanqingtian | leizhenyu | emeiyue | shandian | shangxianyue | wanduoyun | wanqingtian | wumai | wu | tedazhenyu | xiaxianyue | xiaoxue | xiaoyu | xinyue | zhenyu | zhenyuzhuanqing | yujiaxue | zhongxue | zhongyu | zhangxianyue | Group1
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      value: '',
      observer: function(color) {
        this.setData({
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * tt.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    svgSize: 18 / 750 * tt.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
});
