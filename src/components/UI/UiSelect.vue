<template>
	<div class="ui-select">
		<div class="ui-select-wrapper" @click="toggleSelect" :class="{ 'open': isOpen }">
			<div class="ui-select-label">
				{{ selectedOptionLabel }}
				<div class="ui-select-icon"><font-awesome-icon :icon="['fas', 'sort-down']" /></div>
			</div>
			<div class="ui-select-list" v-show="isOpen">
				<div
					v-for="(option, index) in options"
					:key="index"
					@click="selectOption(option)"
					:class="{ 'ui-select-option': true, '__selected': isSelected(option) }"
				>
					{{ option.label }}
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
	export default {
		name: 'ui-select',
		props: {
			options: Array,
			selectedValue: String,
		},
		data() {
			return {
				isOpen: false,
			};
		},
		computed: {
			selectedOptionLabel() {
				const selectedOption = this.options.find(option => option.value === this.selectedValue);
				return selectedOption ? selectedOption.label : 'Select an option';
			},
		},
		methods: {
			toggleSelect() {
				this.isOpen = !this.isOpen;
				if (this.isOpen) {
					// Добавляем обработчик события click на документе
					document.addEventListener('click', this.handleClickOutside);
				} else {
					// Убираем обработчик события click с документа
					document.removeEventListener('click', this.handleClickOutside);
				}
			},
			selectOption(newOption) {
				this.$emit("option-selected", newOption.value);
			},
			handleClickOutside(event) {
				// Проверяем, был ли клик вне элемента селектора
				if (!this.$el.contains(event.target)) {
					this.isOpen = false;
					// Убираем обработчик события click с документа
					document.removeEventListener('click', this.handleClickOutside);
				}
			},
			isSelected(option) {
				return option.value === this.selectedValue;
			},
		},
	};
</script>
  
  

<style lang="scss" scoped>
.ui-select-wrapper {
	position: relative;
	&.open {
		.ui-select-label {
			.ui-select-icon {
				rotate: 180deg;
			}
		}
	}
}
.ui-select-list {
	position: absolute;
	z-index: 99;
	top: calc(100% + 0.5em);
	left: -1em;
	background: var(--colorBaseTwo);
	border: 1px solid var(--colorBorder);
	border-radius: var(--borderRadiusBig);
	min-width: calc(100% + 1em);
	padding-top: 0.4em;
	padding-bottom: 0.4em;
	.ui-select-option {
		padding: 0.4em 1em;
		&:hover {
			color: var(--colorPrimary);
		}
	}
}
.ui-select-label {
	display: flex;
	.ui-select-icon {
		font-size: 0.7em;
		display: flex;
		align-items: center;
		margin-left: 1em;
		transition: 0.1s;
		svg {
			position: relative;
			top: -0.2em;
		}
	}
}
</style>