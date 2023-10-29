<template>
		<div class="ui-tabs">
			<div class="ui-tabs-header">
				<div
					v-for="(tab, index) in tabs"
					:key="index"
					:class="{ 'ui-tabs-label': true, '__active': activeTabIndex === index }"
					@click="activeTabIndex = index"
				>
					{{ tab.label }}
				</div>
			</div>
			<div class="ui-tabs-content">
				<div
					v-for="(tab, index) in tabs"
					:key="index"
					class="ui-tab"
					:class="{ '__active': activeTabIndex === index }"
				>
					<component :is="tab.component" />
				</div>
			</div>
		</div>
</template>
  
<script>
	export default {
		props: {
			tabs: Array,
		},
		data() {
			return {
				activeTabIndex: 0,
			};
		},
	};
</script>