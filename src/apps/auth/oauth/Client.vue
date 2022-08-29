<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>OauthClient</v-card-title>
        <v-card-text>
          <v-card class="mb-4">
            <v-card-subtitle>操作</v-card-subtitle>
            <v-card-text>
              <v-btn color="primary" @click="AddDialog = true">
                <v-icon>mdi-plus</v-icon>
                <span class="ml-2">添加</span>
              </v-btn>
            </v-card-text>
          </v-card>
          <v-alert type="info" v-if="Data === null">暂无数据</v-alert>
          <v-expansion-panels>
            <v-expansion-panel v-for="(Data, I) in Data" :key="I">
              <v-expansion-panel-header disable-icon-rotate>
                {{ Data.Name }}
                <template v-slot:actions>
                  <v-chip
                      :color="Data.Status === '0' ? 'warning' : 'success'"
                      label
                      text-color="white">
                    <v-icon left color="white">
                      {{ Data.Status === "0" ? "mdi-timer" : "mdi-checkbox-marked" }}
                    </v-icon>
                    {{ Data.Status === "0" ? "审核中" : "已审核" }}
                  </v-chip>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mb-2">
                  <v-card-subtitle>操作</v-card-subtitle>
                  <v-card-text>
                    <v-btn color="primary" @click="OpenEditDialog(I)">
                      <v-icon>mdi-pencil</v-icon>
                      <span class="ml-2">修改</span>
                    </v-btn>
                  </v-card-text>
                </v-card>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="Data.Logo"/>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>名称</v-list-item-title>
                    <v-list-item-subtitle>{{ Data.Name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-link</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>回调地址</v-list-item-title>
                    <v-list-item-subtitle>{{ Data.RedirectUrl }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" v-clipboard:copy="Data.RedirectUrl">
                          <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>复制回调地址</span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-identifier</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>ClientId</v-list-item-title>
                    <v-list-item-subtitle>{{ Data.ClientId }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" v-clipboard:copy="Data.ClientId">
                          <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>复制ClientId</span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-barcode</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>ClientSecret</v-list-item-title>
                    <v-list-item-subtitle>{{ Data.ClientSecret }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" v-clipboard:copy="Data.ClientSecret">
                          <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>复制ClientSecret</span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-pagination class="mt-4" v-model="Page" :length="PageTotal" total-visible="6"></v-pagination>
        </v-card-text>
      </v-card>
      <v-dialog
          v-model="AddDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>添加OauthClient</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="OauthClientAddData.Name"
                outlined hide-details
                label="名称"
                prepend-inner-icon="mdi-tag"
            ></v-text-field>
            <v-text-field
                v-model="OauthClientAddData.Logo"
                outlined hide-details
                label="图标" class="mt-2"
                prepend-inner-icon="mdi-image"
            ></v-text-field>
            <v-text-field
                v-model="OauthClientAddData.RedirectUrl"
                outlined hide-details
                label="回调地址" class="mt-2"
                prepend-inner-icon="mdi-link"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="AddDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="AddOauthClient"
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
          v-model="EditDialog"
          persistent
          max-width="600px">
        <v-card>
          <v-card-title>修改OauthClient</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="OauthClientEditData.Name"
                outlined hide-details
                label="名称"
                prepend-inner-icon="mdi-tag"
            ></v-text-field>
            <v-text-field
                v-model="OauthClientEditData.Logo"
                outlined hide-details
                label="图标" class="mt-2"
                prepend-inner-icon="mdi-image"
            ></v-text-field>
            <v-text-field
                v-model="OauthClientEditData.RedirectUrl"
                outlined hide-details
                label="回调地址" class="mt-2"
                prepend-inner-icon="mdi-link"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="EditDialog = false">
              <v-icon>mdi-cancel</v-icon>
              <span class="ml-2">取消</span>
            </v-btn>
            <v-btn
                @click="EditOauthClient"
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
  name: "Client",

  data: () => ({
    Data: null,
    Page: 1,
    PageTotal: 1,
    Disabled: false,
    AddDialog: false,
    EditDialog: false,
    OauthClientAddData: {
      RedirectUrl: null,
      Name: null,
      Logo: null
    },
    OauthClientEditData: {
      ClientId: null,
      RedirectUrl: null,
      Name: null,
      Logo: null
    },
    Timer: null
  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push({path: "/Account/Login", query: {Href: window.location.href}})
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* OauthClient列表 */
    this.Timer = setInterval(this.OauthClientList, 1000)
  },

  destroyed() {
    window.clearInterval(this.Timer)
  },

  methods: {
    /* OauthClient列表 */
    OauthClientList() {
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Oauth/List", {Page: this.Page})
          .then(Response => (
              this.CallBack_OauthClientList(Response.data)
          ))
    },
    /* OauthClient列表回调 */
    CallBack_OauthClientList(Data) {
      if (Data.Data !== null) {
        this.PageTotal = Math.ceil(Data.Data[0].Total / 10)
      }
      this.Data = Data.Data
    },
    /* 添加OauthClient */
    AddOauthClient() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Oauth/Add", this.OauthClientAddData)
          .then(Response => (
              this.CallBack_AddOauthClient(Response.data)
          ))
    },
    /* 添加OauthClient回调 */
    CallBack_AddOauthClient(Data) {
      /* 检查响应数据 */
      if (Data.Code === 500) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 3000) {
        this.AddDialog = false
        this.Disabled = false
        this.OauthClientAddData.Name = null
        this.OauthClientAddData.Logo = null
        this.OauthClientAddData.RedirectUrl = null
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
      if (Data.Code === 3001 || Data.Code === 3002 || Data.Code === 3003) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
    },
    /* 打开修改OauthClient对话框 */
    OpenEditDialog(Id) {
      this.OauthClientEditData.ClientId = this.Data[Id].ClientId
      this.OauthClientEditData.Name = this.Data[Id].Name
      this.OauthClientEditData.Logo = this.Data[Id].Logo
      this.OauthClientEditData.RedirectUrl = this.Data[Id].RedirectUrl
      this.EditDialog = true
    },
    /* 修改OauthClient */
    EditOauthClient() {
      this.Disabled = true
      Axios
          .post(this.$store.state.Config.ApiUrl + "Tpcraft/Auth/Oauth/Edit", this.OauthClientEditData)
          .then(Response => (
              this.CallBack_EditOauthClient(Response.data)
          ))
    },
    /* 修改OauthClient回调 */
    CallBack_EditOauthClient(Data) {
      if (Data.Code === 500) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: Data.Message})
      }
      if (Data.Code === 3006) {
        this.EditDialog = false
        this.Disabled = false
        this.OauthClientEditData.ClientId = null
        this.OauthClientEditData.Name = null
        this.OauthClientEditData.Logo = null
        this.OauthClientEditData.RedirectUrl = null
        this.$emit("Snackbar_Update", {Status: true, Color: "success", Text: Data.Message})
      }
      if (Data.Code === 3001 || Data.Code === 3002 || Data.Code === 3003 || Data.Code === 3004) {
        this.Disabled = false
        this.$emit("Snackbar_Update", {Status: true, Color: "warning", Text: Data.Message})
      }
    }
  }
}
</script>