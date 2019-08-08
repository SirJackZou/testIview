<style lang="less" scoped>
.item-con {
  height: 80px;
  text-align: center;
  cursor: pointer;
  color: #2d8cf0;
  .man-text {
    line-height: 80px;
  }
}
.pro {
  padding-top: 20px;
}
</style>
<template>
  <Card>
      首页
  </Card>
</template>

<script>
import API from "@/libs/API";

export default {
  name: "home",
  components: {
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    jumpRoute(name) {
      this.$router.push({
        name: name
      });
    }
  },
  mounted() {}
};
</script>
