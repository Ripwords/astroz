<script lang="ts" setup>
const cond = ref()
const value = ref()
const props = withDefaults(defineProps<{ val: any, label: string, suffix: string, readonly?: boolean, size?: number, condition?: any, type?: string }>(), {
  readonly: false,
  size: 7
})
watchEffect(() => {
  value.value = props.val
  props.condition ? cond.value = props.condition : null
})
</script>

<template>
  <ion-row>
    <ion-col :size="props.size">
      <ion-item>
        <ion-input disabled>
          {{ props.label }}
        </ion-input>
      </ion-item>
    </ion-col>
    <ion-col>
      <ion-item>
        <div v-if="!condition">
          <ion-input v-if="!readonly" v-model="value" :type="type === 'text' ? 'text' : 'number'"
            :placeholder="props.suffix" @ionChange="$emit('update:val', $event.target.value)" />
          <ion-input v-else-if="readonly" v-model="value" :type="type === 'text' ? 'text' : 'number'"
            :placeholder="props.suffix" @ionChange="$emit('update:val', $event.target.value)" readonly />
        </div>
        <div v-else>
          <ion-input v-if="!cond" v-model="value" :type="type === 'text' ? 'text' : 'number'"
            :placeholder="props.suffix" @ionChange="$emit('update:val', $event.target.value)" />
          <ion-input v-else :value="cond" :type="type === 'text' ? 'text' : 'number'" :placeholder="props.suffix"
            readonly />
        </div>
        <div v-if="!condition">
          <span class="ml-2" v-if="val != ''">{{ props.suffix }}</span>
        </div>
        <div v-else>
          <span class="ml-2" v-if="cond != ''">{{ props.suffix }}</span>
        </div>
      </ion-item>
    </ion-col>
  </ion-row>
</template>