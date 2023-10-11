<template>
	<div class="mainpage">
		<div class="mainpage-content">
			<div class="creategame">
				<div class="ui-input-row">
					<div class="ui-input-box">
						<lable class="ui-input-lable">Имя</lable>
						<input class="ui-input-text" type="text"/>
					</div>
					<div class="ui-input-box">
						<lable class="ui-input-lable">Фамилия</lable>
						<input class="ui-input-text" type="text"/>
					</div>
				</div>
				<div class="ui-input-row">
					<div class="ui-input-box">
						<lable class="ui-input-lable">Возраст</lable>
						<input class="ui-input-text" type="number" min="1" max="100" value="1"/>
					</div>
				</div>
				<div class="ui-input-row">
					<div class="ui-input-box">
						<lable class="ui-input-lable">Рост</lable>
						<input class="ui-input-text" type="number" min="45" max="140" value="45"/>
					</div>
					<div class="ui-input-box">
						<lable class="ui-input-lable">Вес</lable>
						<input class="ui-input-text" type="number" min="45" max="140" value="45"/>
					</div>
				</div>
			</div>
		</div>
		<MainMenu />
	</div>
</template>
  
<script>
	import MainMenu from '@/components/MainMenu.vue'
	import { mixinBgMusic } from "@/mixins/mixinBgMusic";
	
	export default {
		components: {
			MainMenu
		},
		mixins: [mixinBgMusic],
		props: {
			enableMusic: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>