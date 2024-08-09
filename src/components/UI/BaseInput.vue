<template>
 <input :class="{ invalid: !valid && valid !== undefined }" />
</template>

<script>
export default {
 props: ['valid'],
};
</script>

<style lang="scss" scoped>
input {
 border-style: none;
 outline: none;
 padding: 8px;
 width: 100%;
 font-size: 16px;
 border-radius: 5px;
 background-color: #e2e8f0;
 transition: 150ms;
 border: 1px solid transparent;
 transition: 150ms;
}
input:focus {
 transition: 150ms;
 background-color: #cbd5e1;
}
input.invalid {
 transition: 150ms;
 border: 1px solid #dc2626;
}
</style>
