<template>
  <div class="ui-select" :tabindex="tabindex" ref="uiSelect">
	<div class="ui-select-wrapper" @click="toggleSelect" :class="{ 'open': open }">
	  <div class="ui-select-label" :class="{ open: open }" @click="open = !open">
		<span v-if="selectedOptions.length === 0">Select an option</span>
		<template v-else>
		  <span
			v-for="(option, i) in selectedOptions"
			:key="i"
		  >
			{{ option.label }}
			<button v-if="multiselect" @click="removeOption(option)" class="remove-button">✖</button>
		  </span>
		</template>
		<div class="ui-select-icon"><font-awesome-icon :icon="['fas', 'sort-down']" /></div>
	  </div>
	  <div class="ui-select-list" v-show="open">
		<div
		  class="ui-select-option"
		  v-for="(option, i) of options"
		  :key="i"
		>
		  <label>
			<template v-if="multiselect">
				<input
				type="checkbox"
				:value="option.value"
				:checked="selectedValues.includes(option.value)"
				@change="toggleSelectOption(option)"
				/>
				<span>{{ option.label }}</span>
			</template>
			
			<span v-else @click="toggleSelectOption(option)" :value="option.value">{{ option.label }}</span>
		  </label>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
	export default {
		name: 'ui-select-2',
		props: {
			options: {
      type: Array,
      required: true,
    },
    selectedValue: {
      type: [String, Array],
      required: false,
      default: null,
    },
			default: {
				type: [String, Array],
				required: false,
				default: null,
			},
			tabindex: {
				type: Number,
				required: false,
				default: 0,
			},
			multiselect: {
				type: Boolean,
				required: false,
				default: false,
			},
		},
		data() {
			return {
				selectedOptions: [],
				selectedValues: [],
				open: false,
			};
		},
		computed: {
			selected: function () {
				return this.selectedOptions;
			},
		},
		methods: {
			toggleSelectOption(option) {
      if (this.multiselect) {
        if (this.selectedValues.includes(option.value)) {
          this.removeOption(option);
        } else {
          this.selectedOptions.push(option);
          this.selectedValues.push(option.value);
        }
      } else {
        this.selectedOptions = [option];
        this.selectedValues = [option.value];
        this.open = false;
      }
      this.$emit("option-selected", this.selectedValues); // Добавьте эту строку
    },
			removeOption(option) {
				const index = this.selectedOptions.findIndex((o) => o.value === option.value);
				if (index !== -1) {
					this.selectedOptions.splice(index, 1);
					this.selectedValues.splice(index, 1);
				}
			},
			handleClickOutside(event) {
				if (!this.$refs.uiSelect.contains(event.target)) {
					this.open = false;
				}
			},
		},
		watch: {
			default(newDefault) {
				if (Array.isArray(newDefault)) {
					this.selectedOptions = this.options.filter((option) => newDefault.includes(option.value));
					this.selectedValues = this.selectedOptions.map((option) => option.value);
				} else {
					this.selectedOptions = [this.options.find((option) => option.value === newDefault)];
					this.selectedValues = [newDefault];
				}
			},
		},
		mounted() {
			if (this.default) {
				if (Array.isArray(this.default)) {
					this.selectedOptions = this.options.filter((option) => this.default.includes(option.value));
					this.selectedValues = this.selectedOptions.map((option) => option.value);
				} else {
					this.selectedOptions = [this.options.find((option) => option.value === this.default)];
					this.selectedValues = [this.default];
				}
			}
			document.addEventListener('click', this.handleClickOutside);
		},
		beforeDestroy() {
			document.removeEventListener('click', this.handleClickOutside);
		},
	};
</script>
