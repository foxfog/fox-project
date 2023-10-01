<template>
	<div class="ui-range" @mousedown="startDrag" @mousemove="handleDrag" @mouseup="endDrag" @click="handleClick">
		<div class="ui-range-body">
			<div class="ui-range-line">
				<div class="ui-range-progress" :style="{ width: progress + '%'}"></div>
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
			minValue: {
				type: Number,
				default: 0,
			},
			maxValue: {
				type: Number,
				default: 100,
			},
			value: {
				type: Number,
				default: 0,
				validator(value) {
					return !isNaN(parseFloat(value)) && isFinite(value);
				}
			},
			dot: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				dragging: false,
				localValue: this.value,
			};
		},
		computed: {
			progress() {
				return ((this.localValue - this.minValue) / (this.maxValue - this.minValue)) * 100;
			}
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
				this.$emit('input', this.localValue);
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
					this.$emit('input', this.localValue);
				}
			},
			updateValue(event) {
				const rect = this.$el.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const percent = (x / rect.width) * 100;
				const stepDecimalPlaces = this.step.toString().split('.')[1]?.length || 0;
		
				if (percent >= 0 && percent <= 100) {

					const rawValue = this.minValue + (percent / 100) * (this.maxValue - this.minValue);
					this.localValue = parseFloat((Math.round(rawValue / this.step) * this.step).toFixed(stepDecimalPlaces));
				}
			},
		},
	};
</script>
  
<style lang="scss" scoped>
	.ui-range {
		--uiRangeHeight: 0.625em;
		--uiRangeDotWidth: 1em;
		--uiRangeBorderWidth: 1px;
		font-size: 1rem;
		width: 100px;
		.ui-range-body {
			position: relative;
			max-width: 100%;
			height: var(--uiRangeHeight);
		}
		.ui-range-line {
			position: absolute;
			height: 100%;
			top: 0;
			border-radius: var(--uiRangeHeight);
			overflow: hidden;
			box-shadow: inset 0 0 0 1px var(--colorBorder);
		}
		.ui-range-progress {
			height: 100%;
			position: relative;
			background: currentColor;
		}
		.ui-range-dot {
			width: var(--uiRangeDotWidth);
			height: var(--uiRangeDotWidth);
			background-color: var(--colorPrimary);
			border-radius: 50%;
			position: absolute;
			top: calc(0px - ((var(--uiRangeDotWidth) - var(--uiRangeHeight)) / 2));
			translate: calc(-.5 * var(--uiRangeDotWidth));
		}
		&:has(.ui-range-dot) {
			.ui-range-body {
				margin-left: calc(.5 * var(--uiRangeDotWidth));
				width: calc(100% - calc(1 * var(--uiRangeDotWidth)));
			}
			.ui-range-line {
				width: calc(100% + var(--uiRangeDotWidth));
				left: calc(-.5 * var(--uiRangeDotWidth));
				padding-left: calc(.5 * var(--uiRangeDotWidth));
				padding-right: calc(.5 * var(--uiRangeDotWidth));
				.ui-range-progress {
					color: var(--colorPrimaryDark);
					&::before {
						content: '';
						position: absolute;
						height: 100%;
						width: var(--uiRangeDotWidth);
						left: calc(-1 * var(--uiRangeDotWidth));
						background: currentColor;
					}
				}
			}
		}
		&:not(:has(.ui-range-dot)) {
			.ui-range-body {
				width: 100%;
			}
			.ui-range-line {
				width: 100%;
				.ui-range-progress {
					color: var(--colorPrimary);
				}
			}
		}
	}
</style>
  