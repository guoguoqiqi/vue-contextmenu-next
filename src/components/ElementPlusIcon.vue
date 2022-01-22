<script lang="tsx">
import { h, resolveComponent, defineComponent } from "vue";
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  render() {
    return <el-icon {...this.$attrs}>{h(resolveComponent(this.name))}</el-icon>;
  },
});
</script>
