<template>
  <div class="mainpage">
    <div class="mainpage-content">
	  <div class="map map1">
			<div class="setka setka-z">
				<div class="setka-row" v-for="y in range(-(rows - 1) / 2, (rows - 1) / 2)" :key="y" :position-y="y">
				<div class="tile" v-for="x in range(-(cols - 1) / 2, (cols - 1) / 2)" :key="x" :position-y="y" :position-x="x">
					[{{ y }},{{ x }}]
				</div>
				</div>
			</div>
	  </div>
    </div>
  </div>
</template>

<script>

export default {
	data() {
		return {
			rows: 255,
			cols: 255,
			leftOffset2: 0,
			topOffset2: 0,
			tileWidth: 200,
      		tileHeight: 100,
		};
	},
	mounted() {
		this.calculateTilePosition2();
	},
	computed: {
		mapTileStyle() {
			return {
				width: this.tileWidth + "px",
				height: this.tileHeight + "px",
			};
		},
	},
	methods: {
		marginMapRowLeft(y) {
			return {
				marginLeft: this.tileWidth / 2 * -y + "px",
				marginBottom: (-1 * (this.tileHeight + (this.tileHeight / 2)))  + "px",
			};
		},
		marginTileBottom(x) {
			return {
				marginTop: this.tileHeight / 2 * x + "px",
			};
		},
		calculateTilePosition2() {
			const mapElement2 = document.querySelector('.map2');
			const tileElement2 = document.querySelector('.map2 .kvadrat[position-x="1"][position-y="2"]');

			if (mapElement2 && tileElement2) {
				const mapRect2 = mapElement2.getBoundingClientRect();
				const tileRect2 = tileElement2.getBoundingClientRect();

				const tileWidth2 = tileRect2.width;
				const tileHeight2 = tileRect2.height;

				this.leftOffset2 = tileRect2.left - mapRect2.left + tileWidth2 / 2;
				this.topOffset2 = tileRect2.top - mapRect2.top + tileHeight2 / 2;

				console.log('Left Offset (px):', this.leftOffset2);
				console.log('Top Offset (px):', this.topOffset2);
			}
		},
		range(start, end) {
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
	},
};
</script>

<style>
	.map {
		position: relative;
	}
	.setka {
		position: relative;
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
		width: fit-content;
	}
	.setka-z {
		transform: rotateX(60deg) rotateZ(45deg);
	}
	.setka-z .tile {
		width: 100px;
		height: 100px;
		border: 1px solid;
		background: red;
	}
	.setka-row {
		display: flex;
	}
	.tile {
		width: 200px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.kvadrat {
		width: 100%;
		height: 200%;
		border: 1px solid;
		background: red;
		position: absolute;
		z-index: -1;
		transform: rotateX(60deg) rotateZ(45deg);
		scale: 0.7111;
	}
	.human {
		width: 30px;
		height: 90px;
		background: green;
		z-index: 3;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(-50%) translateY(-100%);
	}
	.map2 .setka-row  {
		opacity: 1;
	}
	.map2 .tile {
		opacity: 1;
		margin-right: -100px;
	}
</style>
