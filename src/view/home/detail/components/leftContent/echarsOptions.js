import { reactive,ref } from "vue";

// 1
export const coverageData = ref( {
  color:[''],
  color:['rgba(9,161,234,0.7)'],

  title: {
      show:false,
      text: '甘特图测试',
      x: '甘特图测试'
  },

  yAxis: [{
    axisLabel:{
      color:"#fff"
    },
      type: "category",
      data: ["土石方开挖", "基础施工", "地下室主体施工", "地上主体结构施工", "抹灰施工", "屋面施工"]
  }],
  xAxis: [{
      type: 'value',
      axisLabel: {
        color:"#fff",
          formatter: function(value) {
              var end_time = 1718428800000;
              var start_time = 1717392000000;
              var date = [];
              var i = 1;
              while (end_time > start_time) {
                  var date_formatter = new Date(start_time);
                  var date_time = (date_formatter.getFullYear() + "-" + (date_formatter.getMonth() + 1) + "-" + date_formatter.getDate());
                  date.push(date_time);
                  start_time = start_time + i * 24 * 60 * 60 * 1000;
              }
            //   console.log(date);
              return date[value * 1];
          }
      },
  }],
  series: [{
          name: "土石方开挖",
          type: "bar",
          stack: "总",
          barWidth: 20,
          itemStyle: {
              normal: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(255,255,255,0.1)'
              }
          },
          data: [1, 1, 2, 3, 4, 5, 6]
      },
      {
          name: "基础施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [3],
      },
      {
          name: "地下室主体施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [0, 4, 0, 0, 0, 0, 0],
      },
      {
          name: "地上主体结构施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [0, 0, 2, 0, 0, 0, 0],
      },
      {
          name: "抹灰施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [0, 0, 0, 5, 0, 0, 0],
      },
      {
          name: "屋面施工",
          type: "bar",
          barWidth: 20,
          stack: "总",
          data: [0, 0, 0, 0, 4, 0, 0],
          
      },
      
  ]
});

