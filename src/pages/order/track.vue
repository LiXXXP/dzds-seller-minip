<template>
  <view class="track">
    <web-view :src="`https://demo-getm.cdgwin.com/map?id=${id}`" :update-title="false"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: 0
    }
  },
  onLoad(option) {
    this.id = parseInt(option.id)
  }
}
</script>

<style></style>
