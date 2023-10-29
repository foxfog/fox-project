<template>
	<div class="ui-select">
		<div class="ui-select-wrapper" @click="toggleSelect" :class="{ 'open': isOpen }">
			<div class="ui-select-label">
				{{ selectedOptionLabel }}
				<div class="ui-select-icon"><font-awesome-icon :icon="['fas', 'sort-down']" /></div>
			</div>
			<div class="ui-select-list" v-show="isOpen">
				<slot name="option" :selectOption="selectOption" :isSelected="isSelected" :options="options"></slot>
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
					document.addEventListener('click', this.handleClickOutside);
				} else {
					document.removeEventListener('click', this.handleClickOutside);
				}
			},
			selectOption(newOption) {
				this.$emit("option-selected", newOption.value);
			},
			handleClickOutside(event) {
				if (!this.$el.contains(event.target)) {
					this.isOpen = false;
					document.removeEventListener('click', this.handleClickOutside);
				}
			},
			isSelected(option) {
				return option.value === this.selectedValue;
			},
		},
	};
</script>