<template>
	<div class="ui-range" @mousedown="startDrag" @mousemove="handleDrag" @mouseup="endDrag" @click="handleClick">
		<div class="ui-range-body">
			<div class="ui-range-line">
				<div class="ui-range-progress" :style="{ width: progress + '%' }"></div>
			</div>
			<div v-if="dot" class="ui-range-dot" :style="{ left: progress + '%' }"></div>
		</div>
	</div>
</template>
  
<script>
	export default {
		name: 'ui-range',
		props: {
			step: {
				type: Number,
				default: 1,
			},
			min: {
				type: Number,
				default: 0,
			},
			max: {
				type: Number,
				default: 100,
			},
			modelValue: {
				type: Number,
				default: 0,
			},
			dot: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				dragging: false,
				localValue: this.modelValue,
			};
		},
		computed: {
			progress() {
				return ((this.localValue - this.min) / (this.max - this.min)) * 100;
			},
		},
		watch: {
			modelValue(newValue) {
				this.localValue = newValue;
			},
		},
		methods: {
			startDrag(event) {
				this.dragging = true;
				this.updateValue(event);
				window.addEventListener('mousemove', this.handleDrag);
				window.addEventListener('mouseup', this.endDrag);
			},
			handleDrag(event) {
				if (this.dragging) {
					this.updateValue(event);
					this.$emit('update:modelValue', this.localValue);
				}
			},
			endDrag() {
				this.dragging = false;
				window.removeEventListener('mousemove', this.handleDrag);
				window.removeEventListener('mouseup', this.endDrag);
			},
			handleClick(event) {
				if (!this.dragging) {
					this.updateValue(event);
					this.$emit('update:modelValue', this.localValue);
				}
			},
			updateValue(event) {
				const rect = this.$el.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const percent = (x / rect.width) * 100;
				const stepDecimalPlaces = this.step.toString().split('.')[1]?.length || 0;
		
				if (percent < 0) {
					this.localValue = this.min;
				} else if (percent > 100) {
					this.localValue = this.max;
				} else {
					const rawValue = this.min + (percent / 100) * (this.max - this.min);
					this.localValue = parseFloat((Math.round(rawValue / this.step) * this.step).toFixed(stepDecimalPlaces));
				}
			},
		},
	};
</script>
  