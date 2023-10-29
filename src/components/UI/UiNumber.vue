<template>
	<div class="ui-input-numb">
		<div class="ui-input-numb__btns">
			<button
				class="ui-input-numb__btn ui-input-numb__btn-decrease"
				type="button"
				tabindex="-1"
				:disabled="disabled || readonly || !decreasable || decreaseDis"
				@click.prevent="decrease"
			>
				-
			</button>
			<button
			class="ui-input-numb__btn ui-input-numb__btn-increase"
				type="button"
				tabindex="-1"
				:disabled="disabled || readonly || !increasable || increaseDis"
				@click.prevent="increase"
			>
				+
			</button>
		</div>
		<input 
			class="ui-input-numb__value"
			disabled
			ref="input"
			v-bind="attrs"
			type="number"
			:name="name"
			:value="isNaN(value) ? '' : value"
			:min="min"
			:max="max"
			:step="step"
			:readonly="readonly || !inputtable"
			:placeholder="placeholder"
			autocomplete="off"
			@change="change"
			@paste="paste"
		>
	</div>
</template>
  
<script>
	const isNaN = Number.isNaN || window.isNaN;
	const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/;
	const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/;
	const normalizeDecimalNumber = (value, times = 100000000000) => {
		return REGEXP_DECIMALS.test(String(value)) ? (Math.round(value * times) / times) : value;
	};

	export default {
		name: 'ui-input-number',
		props: {
			attrs: {
				type: Object,
				default: undefined,
			},
			inputtable: {
				type: Boolean,
				default: true,
			},
			max: {
				type: Number,
				default: Infinity,
			},
			min: {
				type: Number,
				default: -Infinity,
			},
			name: {
				type: String,
				default: undefined,
			},
			placeholder: {
				type: String,
				default: undefined,
			},
			disabled: Boolean,
			decreaseDis: Boolean,
			increaseDis: Boolean,
			readonly: Boolean,
			rounded: Boolean,
			size: {
				type: String,
				default: undefined,
			},
			step: {
				type: Number,
				default: 1,
			},
			modelValue: {
				type: Number,
				default: NaN,
			},
		},
		emits: ['update:modelValue'],
		data() {
			return {
				value: NaN,
			};
		},
		computed: {
			increasable() {
				return isNaN(this.value) || this.value < this.max;
			},
			decreasable() {
				return isNaN(this.value) || this.value > this.min;
			},
		},
		watch: {
			modelValue: {
				immediate: true,
				handler(newValue, oldValue) {
					if (!(isNaN(newValue) && typeof oldValue === 'undefined') && newValue !== this.value) {
						this.setValue(newValue);
					}
				},
			},
		},
		methods: {
			isNaN,
			change(event) {
				const newValue = event.target.value;
				this.setValue(event.target.value);
			},
			paste(event) {
				const clipboardData = event.clipboardData || window.clipboardData;

				if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData('text'))) {
					event.preventDefault();
				}
			},
			decrease() {
				if (this.decreasable) {
					let { value } = this;
					if (isNaN(value)) {
						value = 0;
					}
					this.setValue(normalizeDecimalNumber(value - this.step));
				}
			},
			increase() {
				if (this.increasable) {
					let { value } = this;
					if (isNaN(value)) {
						value = 0;
					}
					this.setValue(normalizeDecimalNumber(value + this.step));
				}
			},
			setValue(value) {
				const oldValue = this.value;
				let newValue = typeof value !== 'number' ? parseFloat(value) : value;
				if (!isNaN(newValue)) {
					if (this.min <= this.max) {
						newValue = Math.min(this.max, Math.max(this.min, newValue));
					}
					if (this.rounded) {
						newValue = Math.round(newValue);
					}
				}
				this.value = newValue;
				if (newValue === oldValue) {
					this.$refs.input.value = String(newValue);
				}
				this.$emit('update:modelValue', newValue, oldValue);
			},
		},
	};
</script>