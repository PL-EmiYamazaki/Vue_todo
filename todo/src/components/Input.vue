<template>
  <div>
    <input :type="type" v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
  </div>
</template>

<script>

export default {
  name: 'Input',
  props: {
    value: String,
    type: String
  },
  
}
</script>