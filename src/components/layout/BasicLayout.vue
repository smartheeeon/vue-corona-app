<template>
  <div class="common-layout">
    <el-container class="main">
      <el-header><BasicHeader /></el-header>
      <el-container>
        <el-aside :width="menuWidth"
          ><SideMenu
            :isCollaps="isCollaps"
            @menuSelect="
              (item) => {
                $emit('menuSelect', item);
              }
            "
        /></el-aside>
        <el-main><slot></slot></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BasicHeader from "./BasicHeader.vue";
import SideMenu from "./SideMenu.vue";
import useBreakpoing from "@/composables/useBreakpoing";
import { computed } from "vue";
export default {
  name: "BasicLayout",
  components: { BasicHeader, SideMenu },
  setup() {
    const { type } = useBreakpoing();

    const isCollaps = computed(() => type.value === "sm");
    const menuWidth = computed(() => (isCollaps.value ? "65px" : "200px"));

    console.log(isCollaps);
    return {
      isCollaps,
      menuWidth,
    };
  },
};
</script>

<style>
.el-header {
  background: #409eff;
  color: #fff;
  display: flex;
  align-items: center;
}
.common-layout {
  height: 100%;
}
.main {
  height: 100%;
}
</style>
