<template>
 <div>
   <v-container>
     <v-card>
       <v-card-title>仪盘表</v-card-title>
       <v-card-subtitle>数据统计</v-card-subtitle>
       <v-card-text v-if="Data === null">
         <v-alert type="info">暂无数据</v-alert>
       </v-card-text>
       <v-card-text v-if="Data !== null">
         <v-row>
           <v-col cols="12" md="4">
             <v-list-item>
               <v-list-item-avatar>
                 <v-icon>mdi-card-account-details</v-icon>
               </v-list-item-avatar>
               <v-list-item-content>
                 <v-list-item-title>通行证总数</v-list-item-title>
                 <v-list-item-subtitle>{{ Data.TotalPass }}</v-list-item-subtitle>
               </v-list-item-content>
             </v-list-item>
           </v-col>
           <v-col cols="12" md="4">
             <v-list-item>
               <v-list-item-avatar>
                 <v-icon>mdi-cash-multiple</v-icon>
               </v-list-item-avatar>
               <v-list-item-content>
                 <v-list-item-title>先锋币订单总数</v-list-item-title>
                 <v-list-item-subtitle>{{ Data.TotalOrder }}</v-list-item-subtitle>
               </v-list-item-content>
             </v-list-item>
           </v-col>
           <v-col cols="12" md="4">
             <v-list-item>
               <v-list-item-avatar>
                 <v-icon>mdi-cancel</v-icon>
               </v-list-item-avatar>
               <v-list-item-content>
                 <v-list-item-title>封禁总数</v-list-item-title>
                 <v-list-item-subtitle>{{ Data.TotalBan }}</v-list-item-subtitle>
               </v-list-item-content>
             </v-list-item>
           </v-col>
         </v-row>
       </v-card-text>
       <v-card-subtitle>管理员列表</v-card-subtitle>
       <v-card-text v-if="Data === null">
         <v-alert type="info">暂无数据</v-alert>
       </v-card-text>
       <v-card-text v-if="Data !== null">
         <v-expansion-panels>
           <v-expansion-panel v-for="(Admin, I) in Data.Admin" :key="I">
             <v-expansion-panel-header disable-icon-rotate>
               #{{ Admin.Uid }} - {{ Admin.Username }}
               <template v-slot:actions>
                 <v-chip
                     color="info"
                     label
                     text-color="white">
                   <v-icon left color="white">mdi-account-multiple</v-icon>
                   {{ Admin.Group === "1" ? "超级管理员" : (Admin.Group === "2" ? "二级管理员" : "一级管理员") }}
                 </v-chip>
               </template>
             </v-expansion-panel-header>
             <v-expansion-panel-content>
               <v-list-item>
                 <v-list-item-avatar>
                   <v-icon>mdi-qqchat</v-icon>
                 </v-list-item-avatar>
                 <v-list-item-content>
                   <v-list-item-title>QQ</v-list-item-title>
                   <v-list-item-subtitle>{{ Admin.Qq }}</v-list-item-subtitle>
                 </v-list-item-content>
               </v-list-item>
               <v-list-item>
                 <v-list-item-avatar>
                   <v-icon>mdi-email</v-icon>
                 </v-list-item-avatar>
                 <v-list-item-content>
                   <v-list-item-title>邮箱</v-list-item-title>
                   <v-list-item-subtitle>{{ Admin.Email }}</v-list-item-subtitle>
                 </v-list-item-content>
               </v-list-item>
             </v-expansion-panel-content>
           </v-expansion-panel>
         </v-expansion-panels>
       </v-card-text>
       <v-card-subtitle>服务器状态</v-card-subtitle>
       <v-card-text v-if="Data === null">
         <v-alert type="info">暂无数据</v-alert>
       </v-card-text>
       <v-card-text v-if="Data !== null">
         <v-row>
           <v-col cols="12" md="6" v-for="(ServerInfo, I) in Data.ServerInfo" :key="I">
             <v-card>
               <v-card-title>{{ ServerInfo.Server }}</v-card-title>
               <v-card-text>
                 <div style="height:350px" :id="'Echarts_' + I"></div>
               </v-card-text>
             </v-card>
           </v-col>
         </v-row>
       </v-card-text>
     </v-card>
   </v-container>
 </div>
</template>

<script>
import * as Echarts from 'echarts';
import Axios from "axios";

export default {
  name: "Home",

  data: () => ({
    Data: null,
    Timer: null
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push({path: "/Account/Login", query: {Href: window.location.href}})
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 获取仪表盘数据 */
    this.GetStatistical()
    this.Timer = setInterval(this.GetStatistical, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    /* 获取仪表盘数据 */
    GetStatistical() {
      Axios
          .get(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Statistical")
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 200) {
              this.Data = Response.data.Data
              setTimeout(this.Echarts, 1000)
            }
            if (Response.data.Code === 500) {
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1400) {
              this.$router.push("/")
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
          })
    },
    /* 绘制图表 */
    Echarts() {
      const Data = this.Data.ServerInfo
      for (let I = 0; Data.length > I; I++) {
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

        const Chart = Echarts.init(document.getElementById("Echarts_" + I));

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
              yAxisIndex: 0,
              data: CpuUsed.reverse(),
              symbol: 'none',
              smooth: true
            },
            {
              name: 'MEM',
              type: 'line',
              yAxisIndex: 0,
              data: MemUsed.reverse(),
              symbol: 'none',
              smooth: true,
            },
            {
              name: '上行',
              type: 'line',
              yAxisIndex: 1,
              data: NetworkUp.reverse(),
              symbol: 'none',
              smooth: true,
            },
            {
              name: '下行',
              type: 'line',
              yAxisIndex: 1,
              data: NetworkDown.reverse(),
              symbol: 'none',
              smooth: true,
            }
          ]
        })
      }
    }
  }
}
</script>