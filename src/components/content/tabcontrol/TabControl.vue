<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
    :class="{active: index === currentIndex}"
    class="tab-control-item"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  props:{
    titles:{
      type:Array,
      default() {
        return[]
      }
    },
  },
  data(){
    return{
      currentIndex:0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index);
    }
  },

}
</script>

<style scoped>
.tab-control{
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.active span{
  padding: 5px;
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-high-text);
}
</style>
