<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>服务器</v-card-title>
        <v-card-text>
          <v-alert  v-if="Data === null" type="info">暂无数据</v-alert>
          <v-card v-for="(Data, I) in Data" :key="I" class="mb-4">
            <v-card-title>{{ Data.Server }}</v-card-title>
            <v-card-text>
              <div style="height:350px" :id="'Echarts_' + I"></div>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import * as Echarts from 'echarts';
import Axios from "axios";

export default {
  name: "ServerStatus",

  data: () => ({
    Data: null
  }),

  created() {
    /* 获取服务器信息 */
    this.ServerStatus()
  },

  methods: {
    /* 获取服务器信息 */
    ServerStatus() {
      Axios
          .get(this.$store.state.Config.ApiUrl + "Tpcraft/Www/View/ServerStatus")
          .then(Response => (
              this.CallBack_ServerStatus(Response.data)
          ))
    },
    /* 获取服务器信息回调 */
    CallBack_ServerStatus(Data) {
      /* 检查响应数据 */
      if (Data.Code === 200) {
        this.Data = Data.Data
        setTimeout(this.Echarts, 1000)
      }
      if (Data.Code === 500) {
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
    },
    /* 绘制图表 */
    Echarts() {
      const Data = this.Data
      for(let I = 0; Data.length > I; I++) {

        //获取时间
        const Date = []
        for (let A = 0; Data[I]['SystemInfo'].length > A; A++) {
          Date.push(Data[I]['SystemInfo'][A]['Date'])
        }

        //获取CPU使用率
        const CpuUsed = []
        for (let B = 0; Data[I]['SystemInfo'].length > B; B++) {
          CpuUsed.push(Data[I]['SystemInfo'][B]['CpuUsed'])
        }

        //获取MEM使用率
        const MemUsed = []
        for (let C = 0; Data[I]['SystemInfo'].length > C; C++) {
          MemUsed.push(Data[I]['SystemInfo'][C]['MemUsed'])
        }

        //获取网络上行
        const NetworkUp = []
        for (let D = 0; Data[I]['SystemInfo'].length > D; D++) {
          NetworkUp.push(Data[I]['SystemInfo'][D]['NetworkUp'])
        }

        //获取网络下行
        const NetworkDown = []
        for (let E = 0; Data[I]['SystemInfo'].length > E; E++) {
          NetworkDown.push(Data[I]['SystemInfo'][E]['NetworkDown'])
        }

        var Chart = Echarts.init(document.getElementById("Echarts_" + I));
        Chart.setOption({
          animationDuration: 1000,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['CPU', 'MEM', '上行', '下行']
          },
          xAxis: {
            data: Date.reverse()
          },
          yAxis: [
            {
              name: "资源",
              type: "value",
              axisLabel: {
                formatter: '%'
              }
            },
            {
              name: "网络",
              type: "value",
              axisLabel: {
                formatter: 'Kb/s'
              }
            }
          ],
          series: [
            {
              name: 'CPU',
              type: 'line',
              data: CpuUsed.reverse(),
              yAxisIndex: 0,
              symbol: 'none'
            },
            {
              name: 'MEM',
              type: 'line',
              yAxisIndex: 0,
              data: MemUsed.reverse(),
              symbol: 'none'
            },
            {
              name: '上行',
              type: 'line',
              yAxisIndex: 1,
              data: NetworkUp.reverse(),
              symbol: 'none'
            },
            {
              name: '下行',
              type: 'line',
              yAxisIndex: 1,
              data: NetworkDown.reverse(),
              symbol: 'none'
            }
          ]
        })
      }
    }
  }
}
</script>