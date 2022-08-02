<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>封禁列表</v-card-title>
        <v-card-text>
          <v-alert v-if="Data === null" type="info">暂无数据</v-alert>
          <v-card v-for="(Data, I) in Data" :key="I" class="mb-4">
            <v-card-title>#{{ Data.Id }} - {{ Data.Username }}</v-card-title>
            <v-card-subtitle>
              封禁时间 {{ Data.Date }}
              <br/>
              解封时间 {{ Data.ExpiredDate == "1970-01-01 07:59:59" ? "永久封禁" : Data.ExpiredDate }}
            </v-card-subtitle>
            <v-card-text>
              <h3>{{ Data.Reason }}</h3>
            </v-card-text>
          </v-card>
          <v-pagination v-model="Page" :length="PageTotal" class="mt-2"></v-pagination>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "BanList",

  data: () => ({
    Data: null,
    Page: 1,
    PageTotal: 1,
    Timer: null,
  }),

  created() {
    /* 封禁列表 */
    this.Timer = setInterval(this.BanList, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    /* 封禁列表 */
    BanList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Account/View/BanList", {Page: this.Page})
          .then(Response => (
              this.CallBack_BanList(Response.data)
          ))
    },
    /* 封禁列表回调 */
    CallBack_BanList(Data) {
      if (Data.Data !== null) {
        this.PageTotal = Math.ceil(Data.Data[0].Total / 9)
      }
      this.Data = Data.Data
    }
  }
}
</script>