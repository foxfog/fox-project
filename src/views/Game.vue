<template>
	<div class="gamepage">
		<div class="uprav">
			<div>
				<label for="playerPositionX">X координата:</label>
				<input id="playerPositionX" v-model="this.playerPositionX" type="number">
			</div>
			<div>
				<label for="playerPositionY">Y координата:</label>
				<input id="playerPositionY" v-model="this.playerPositionY" type="number">
			</div>
		</div>
		<div class="map" ref="map" @mousedown="startDrag" @mouseup="stopDrag">
			<div class="map-grid" :style="marginMap(rows)">
				<div class="map-grid-row" v-for="y in range(-(rows - 1) / 2, (rows - 1) / 2)" :key="y" :y="y" :style="marginMapRow(y)">
					<div class="tile earth" v-for="x in range(-(cols - 1) / 2, (cols - 1) / 2)" :key="x" :y="y" :x="x" :style="mapTileStyle(x)">
						<div class="tile-cord">[{{ y }},{{ x }}]</div>
						<div class="tile-back"></div>
					</div>
				</div>
				<div class="charakter charakter-player"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				rows: 51,
				cols: 51,
				tileWidth: 200,
				tileHeight: 100,
				playerPositionY: 1,
				playerPositionX: 1,

				isDragging: false,
				startX: 0,
				startY: 0,
				scrollLeft: 0,
				scrollTop: 0,
			};
		},
		mounted() {
			this.movePlayerToTile();
			this.centerMapOnPlayer();
		},
		watch: {
			playerPositionX: 'movePlayerToTile',
			playerPositionY: 'movePlayerToTile',
		},
		methods: {
			movePlayerToTile() {
				const player = document.querySelector('.charakter-player');
				const tile = document.querySelector(`.tile[x="${this.playerPositionX}"][y="${this.playerPositionY}"]`);

				if (player && tile) {
					if (player.parentNode) {
						player.parentNode.removeChild(player);
					}
					tile.appendChild(player);
				}
			},
			centerMapOnPlayer() {
				const map = this.$refs.map;
				const player = document.querySelector('.charakter-player');
				if (map && player) {
					const mapRect = map.getBoundingClientRect();
					const playerRect = player.getBoundingClientRect();
					const scrollX = playerRect.left - mapRect.left - mapRect.width / 2 + playerRect.width / 2;
					const scrollY = playerRect.top - mapRect.top - mapRect.height / 2 + playerRect.height / 2;
					map.scrollLeft = scrollX;
					map.scrollTop = scrollY;
				}
			},
			marginMapRow(y) {
				return {
					marginLeft: this.tileWidth / 2 * -y + "px",
					marginBottom: (-1 * ( ((this.tileHeight / 2) * (this.cols - 1)) - ((this.tileHeight / 4) * (this.cols - 3)))) + "px",
				};
			},
			marginMap(y) {
				return {
					marginLeft: this.tileWidth / 4 * y + "px",
					marginTop: (1 * ( ((this.tileHeight / 2) * (this.cols - 1)) - ((this.tileHeight / 4) * (this.cols - 3)))) + "px",
				};
			},
			mapTileStyle(x) {
				return {
					marginTop: this.tileHeight / 2 * x + "px",
					
				};
			},
			range(start, end) {
				return Array.from({ length: end - start + 1 }, (_, i) => start + i);
			},
			startDrag(event) {
				this.isDragging = true;
				this.startX = event.pageX;
				this.startY = event.pageY;
				this.scrollLeft = this.$refs.map.scrollLeft;
				this.scrollTop = this.$refs.map.scrollTop;
				this.$refs.map.addEventListener("mousemove", this.handleDrag);
			},
			handleDrag(event) {
				if (this.isDragging) {
					this.$refs.map.scrollLeft = this.scrollLeft + this.startX - event.pageX;
					this.$refs.map.scrollTop = this.scrollTop + this.startY - event.pageY;
				}
			},
			stopDrag() {
				this.isDragging = false;
				this.$refs.map.removeEventListener("mousemove", this.handleDrag);
			}
		},
	};
</script>

<style lang="scss">
	.uprav {
		position: absolute;
		z-index: 99;
	}
	.gamepage {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.map {
		margin: auto;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: auto;
		background: rgb(160 108 64);
	}
	.map-grid {
		position: relative;
		display: flex;
		flex-direction: column;
		width: fit-content;
	}
	.map-grid-row {
		display: flex;
	}
	.tile {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: 200px;
    	height: 100px;
		margin-right: -100px;
		.tile-cord {
			position: relative;
			z-index: 2;
			opacity: 0;
		}
		.tile-back {
			position: absolute;
			width: 100%;
			height: 110%;
			z-index: 1;
		}
		.kvadrat {
			width: 100%;
			height: 200%;
			border: 1px solid;
			position: absolute;
			z-index: 1;
			transform: rotateX(60deg) rotateZ(45deg);
			scale: 0.7111;
			opacity: 0;
		}
		&.earth {
			.tile-back {
				background-image: url(../game/images/tiles/tile-earth.webp);
			}
		}
	}
	.charakter {
		width: 30px;
		height: 90px;
		background: green;
		z-index: 3;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		transform-origin: center bottom;
		translate: 0 -50%;
	}
</style>
