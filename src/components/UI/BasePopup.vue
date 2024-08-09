<template>
 <div class="popup-out">
  <div class="popup-in">
   <slot> </slot>
  </div>
 </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.popup-out {
 top: 0;
 left: 0;
 position: absolute;
 z-index: 9999;
 width: 100vw;
 height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: rgba(0, 0, 0, 0.296);
 .popup-in {
  border-radius: 5px;
  width: fit-content;
  height: 50%;
  background-color: #f1f5f9;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
 }
}
@media screen and (max-width: 1430px) {
 .popup-out {
  .popup-in {
   height: 64%;
  }
 }
}
@media screen and (max-width: 640px) {
 .popup-out {
  .popup-in {
   height: 95%;
  }
 }
}
</style>
