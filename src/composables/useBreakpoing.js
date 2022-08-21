import { computed, onMounted, onUnmounted, ref } from "vue";

export default function useBreakpoing() {
  let windowwidth = ref(window.innerWidth);

  const onWidthChange = () => {
    windowwidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", onWidthChange);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onWidthChange);
  });

  const type = computed(() => {
    let size = "sm";

    if (windowwidth.value > 549 && windowwidth.value < 1200) size = "md";
    if (windowwidth.value > 1199) size = "lg";

    return size;
  });

  return { type };
}
