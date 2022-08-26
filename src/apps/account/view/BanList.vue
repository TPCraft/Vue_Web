<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>封禁列表</v-card-title>
        <v-card-text>
          <v-alert v-if="Data === null" type="info">暂无数据</v-alert>
          <v-expansion-panels>
            <v-expansion-panel v-for="(Data, I) in Data" :key="I">
              <v-expansion-panel-header disable-icon-rotate>
                #{{ Data.Id }} - {{ Data.Username }}
                <template v-slot:actions>
                  <v-chip label text-color="white" color="info">
                    <v-icon left color="white">mdi-timer</v-icon>
                    {{ Data.Date }}
                  </v-chip>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-timer</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>封禁时间</v-list-item-title>
                    <v-list-item-subtitle>{{ Data.Date }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-timer</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>解封时间</v-list-item-title>
                    <v-list-item-subtitle>{{ Data.ExpiredDate === "1970-01-01 07:59:59" ? "永久封禁" : Data.ExpiredDate }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-cancel</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>当前封禁状态</v-list-item-title>
                    <v-list-item-subtitle>{{ Data.Ban === "0" ? "未封禁" : "封禁中" }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-cancel</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>封禁原因</v-list-item-title>
                    <v-list-item-subtitle>{{ Data.Reason }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-pagination class="mt-4" v-model="Page" :length="PageTotal"></v-pagination>
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
          .then(Response => {
            if (Response.data.Data !== null) {
              this.PageTotal = Math.ceil(Response.data.Data[0].Total / 9)
            }
            this.Data = Response.data.Data
          })
    }
  }
}
</script>