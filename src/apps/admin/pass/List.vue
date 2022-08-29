<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>通行证</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="Search"
              outlined persistent-hint
              label="搜索通行证"
              hint="用户名 / 邮箱 / QQ / SteamID / IP"
              prepend-inner-icon="mdi-magnify-expand"
          ></v-text-field>
          <v-alert type="info" v-if="Data === null">暂无数据</v-alert>
          <v-expansion-panels v-if="Data !== null">
            <v-expansion-panel v-for="(Data, I) in Data" :key="I">
              <v-expansion-panel-header>
                #{{ Data.Uid }} - {{ Data.Username }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mb-2">
                  <v-card-subtitle>操作</v-card-subtitle>
                  <v-card-text>
                    <v-btn
                        @click="OpenEditDialog(I)"
                        color="primary" class="mr-2">
                      <v-icon>mdi-pencil</v-icon>
                      <v-span class="ml-2">修改</v-span>
                    </v-btn>
                    <v-btn
                        v-if="Data.Ban.Ban === '0'"
                        @click="OpenBanDialog(I)"
                        color="error" class="mr-2">
                      <v-icon>mdi-cancel</v-icon>
                      <v-span class="ml-2">封禁</v-span>
                    </v-btn>
                    <v-btn
                        v-if="Data.Ban.Ban === '1'"
                        @click="OpenUnBanDialog(I)"
                        color="success">
                      <v-icon>mdi-cancel</v-icon>
                      <v-span class="ml-2">解封</v-span>
                    </v-btn>
                  </v-card-text>
                </v-card>
                <v-row dense>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-flash</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>等级</v-list-item-title>
                        <v-list-item-subtitle>Lv.{{ Data.Level.Level }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-flash</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>EXP</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Level.Exp }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-cash-multiple</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>先锋币</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Coin }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-checkbox-multiple-marked</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>已签到天数</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Signin.Day }} 天</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-email</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>邮箱</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Email }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-qqchat</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>QQ</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Qq.Qq }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-account-multiple</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>用户组</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Group == "0" ? "普通用户" : (Data.Group == "1" ? "超级管理员" : (Data.Group == "2" ? "二级管理员" : "一级管理员")) }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-cancel</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>封禁</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.Ban.Ban === "0" ? "未封禁" : "封禁中" }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-timelapse</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>注册日期</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.RegisterDate }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-ip</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>注册IP</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.RegisterIp }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-timelapse</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>最后在线</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.LastOnlineDate === "1970-01-01 08:00:00" ? "无记录" : Data.LastOnlineDate }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-ip</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>最后在线IP</v-list-item-title>
                        <v-list-item-subtitle>{{ Data.LastOnlineIp === "" ? "无记录" : Data.LastOnlineIp }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-pagination class="mt-4" v-model="Page" :length="PageTotal" total-visible="6"></v-pagination>
        </v-card-text>
      </v-card>
      <v-dialog
          v-model="EditDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>修改通行证</v-card-title>
          <v-card-subtitle>#{{ PassEditData.Uid }} - {{ PassEditData.Username }}</v-card-subtitle>
          <v-card-text>
            <v-text-field
                v-model="PassEditData.Coin"
                outlined hide-details
                label="先锋币"
                prepend-inner-icon="mdi-cash-multiple"
            ></v-text-field>
            <v-text-field
                v-model="PassEditData.Exp"
                outlined hide-details
                label="EXP" class="mt-2"
                prepend-inner-icon="mdi-flash"
            ></v-text-field>
            <v-text-field
                v-model="PassEditData.Password"
                outlined hide-details
                label="密码 (留空不修改)" class="mt-2"
                prepend-inner-icon="mdi-lock"
            ></v-text-field>
            <v-select
                v-model="PassEditData.Group"
                :items="Group"
                item-text="Text"
                item-value="Value"
                outlined hide-details
                label="用户组" class="mt-2"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="EditDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="EditPass"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="BanDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>封禁通行证</v-card-title>
          <v-card-subtitle>#{{ PassBanData.Uid }} - {{ PassBanData.Username }}</v-card-subtitle>
          <v-card-text>
            <v-text-field
                v-model="PassBanData.ExpiredDate"
                outlined hide-details
                label="封禁时长 (秒) (-1为永久)"
                type="number"
                prepend-inner-icon="mdi-timer"
            ></v-text-field>
            <v-text-field
                v-model="PassBanData.Reason"
                outlined hide-details
                label="封禁原因" class="mt-2"
                prepend-inner-icon="mdi-cancel"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="BanDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="BanPass"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="UnBanDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>封禁通行证</v-card-title>
          <v-card-subtitle>#{{ PassUnBanData.Uid }} - {{ PassUnBanData.Username }}</v-card-subtitle>
          <v-card-text>
            <v-checkbox
                v-model="PassUnBanData.RemoveBanInfo"
                hide-details
                label="删除最近一次封禁记录"
            ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="UnBanDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="UnBanPass"
                :disabled="Disabled"
                :loading="Disabled"
                color="success">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完成</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "List",

  data: () => ({
    EditDialog: false,
    BanDialog: false,
    UnBanDialog: false,
    PassEditData: {
      Uid: null,
      Username: null,
      Group: null,
      Coin: null,
      Exp: null,
      Password: null
    },
    PassBanData: {
      Uid: null,
      Username: null,
      ExpiredDate: null,
      Reason: null
    },
    PassUnBanData: {
      Uid: null,
      Username: null,
      RemoveBanInfo: false
    },
    Group: [
      {Text: "普通用户", Value: "0"},
      {Text: "超级管理员", Value: "1"},
      {Text: "二级管理员", Value: "2"},
      {Text: "一级管理员", Value: "3"}
    ],
    Disabled: false,
    Page: 1,
    PageTotal: 1,
    Search: null,
    Data: null,
    Timer: null
  }),

  created() {
    /* 获取通行证列表 */
    this.GetPassList()
    this.Timer = setInterval(this.GetPassList, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    /* 获取通行证列表 */
    GetPassList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Pass/List", {Page: this.Page, Search: this.Search})
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 200) {
              if (Response.data.Data !== null) {
                this.PageTotal = Math.ceil(Response.data.Data[0].Total / 20)
              }
              this.Data = Response.data.Data
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
    /* 打开修改通行证窗口 */
    OpenEditDialog(Id) {
      this.PassEditData.Uid = this.Data[Id].Uid
      this.PassEditData.Username = this.Data[Id].Username
      this.PassEditData.Coin = this.Data[Id].Coin
      this.PassEditData.Exp = this.Data[Id].Level.Exp
      this.PassEditData.Group = this.Data[Id].Group
      this.EditDialog = true
    },
    /* 修改通行证 */
    EditPass() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Pass/Edit", this.PassEditData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 401) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 400 || Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1007) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 1402) {
              this.EditDialog = false
              this.Disabled = false
              this.PassEditData.Password = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
          })
    },
    /* 打开封禁通行证窗口 */
    OpenBanDialog(Id) {
      this.PassBanData.Uid = this.Data[Id].Uid
      this.PassBanData.Username = this.Data[Id].Username
      this.BanDialog = true
    },
    /* 封禁通行证 */
    BanPass() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Pass/Ban", this.PassBanData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 401) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 400 || Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1405) {
              this.BanDialog = false
              this.Disabled = false
              this.PassBanData.Reason = null
              this.PassBanData.ExpiredDate = null
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
          })
    },
    /* 打开解封通行证窗口 */
    OpenUnBanDialog(Id) {
      this.PassUnBanData.Uid = this.Data[Id].Uid
      this.PassUnBanData.Username = this.Data[Id].Username
      this.UnBanDialog = true
    },
    /* 解封通行证 */
    UnBanPass() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Admin/Pass/UnBan", this.PassUnBanData)
          .then(Response => {
            /* 检查响应数据 */
            if (Response.data.Code === 401) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Response.data.Message})
            }
            if (Response.data.Code === 400 || Response.data.Code === 500) {
              this.Disabled = false
              this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Response.data.Message})
            }
            if (Response.data.Code === 1406) {
              this.UnBanDialog = false
              this.Disabled = false
              this.PassUnBanData.RemoveBanInfo = false
              this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Response.data.Message})
            }
          })
    }
  }
}
</script>