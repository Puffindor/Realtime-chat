<template>
 <button
  :disabled="disabled"
  :class="{
   full: mode === 'full',
   outline: mode === 'outline',
   flat: mode === 'flat',
  }"
 >
  {{ title }}
 </button>
</template>

<script>
export default {
 props: ['title', 'mode', 'type'],
 computed: {
  baseColor() {
   if (this.type === 'red') {
    return '#DC2626';
   }
   return '#047857';
  },
  hoverColor() {
   if (this.type === 'red') {
    return '#EF4444';
   }
   return '#059669';
  },
 },
};
</script>

<style lang="scss" scoped>
$base-color: v-bind(baseColor);
$hover-color: v-bind(hoverColor);
button {
 cursor: pointer;
 text-transform: capitalize;
 width: 100%;
 padding: 10px;
 border-radius: 5px;
 border-style: hidden;
 font-size: 18px;
 border: 2px solid transparent;
}

button.flat {
 background-color: transparent;
 border: 2px solid $base-color;
 transition: 150ms;
}

button.flat:hover {
 transition: 150ms;
 background-color: #a7f3d0;
}

button.full {
 background-color: $base-color;
 color: white;
 transition: 150ms;
 font-weight: 500;
 border: 2px solid $base-color;
}

button.full:hover {
 transition: 150ms;
 background-color: $hover-color;
 color: white;
}

button.outline {
 font-weight: 300;
 background-color: transparent;
 color: black;
 border-radius: 0px;
 border-bottom: 2px solid transparent;
 transition: 150ms;
}

button.outline:hover {
 transition: 150ms;
 border-bottom: 2px solid $base-color;
 background-color: #d1fae5;
}

button:disabled.full {
 background-color: #6b7280;
 cursor: default;
}

button:disabled.flat {
 border: 2px solid #6b7280;
}
button:disabled.flat:hover {
 background-color: transparent;
 cursor: default;
}
@media screen and (max-width: 1430px) {
 button {
  font-size: 14px;
 }
}
@media screen and (max-width: 640px) {
 button {
  padding: 5px;
 }
}
</style>
