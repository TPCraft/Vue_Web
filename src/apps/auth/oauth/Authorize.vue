<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>授权第三方</v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Authorize",

  data: () => ({

  }),

  created() {
    /* 检查登入状态 */
    if (this.$store.state.PsssInfo === null) {
      this.$router.push("/Account/PassCenter")
      this.$emit("Snackbar_Update", {Status: true, Color: "error", Text: "未登入通行证"})
    }
    /* 检查Oauth客户端 */
    this.CheckOauth()
  },

  methods: {
    CheckOauth() {

    }
  }
}
</script>