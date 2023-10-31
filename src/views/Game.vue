<template>
  <div class="mainpage">
    <div class="mainpage-content">
      <div class="pagetitle">Начало игры</div>
      <h1>{{ $t('about', {user: "Fox"}) }}</h1>
      <h2>{{ $t('num_age', {user: "Fox", n: 10}) }}</h2>
      <h3>Сейчас {{ $d(new Date(), "longFormat") }}</h3>
	  <div class="map map1">
			<div class="setka setka-z">
				<div class="setka-row" v-for="y in range(-(rows - 1) / 2, (rows - 1) / 2)" :key="y" :position-y="y">
				<div class="kvadrat" v-for="x in range(-(cols - 1) / 2, (cols - 1) / 2)" :key="x" :position-y="y" :position-x="x">
					[{{ y }},{{ x }}]
				</div>
				</div>
			</div>
			<div class="human" :style="{ left: leftOffset + 'px', top: topOffset + 'px' }"></div>
	  </div>
	  <div class="map map2">
		<div class="setka">
			<div class="setka-row" v-for="y in range(-(rows - 1) / 2, (rows - 1) / 2)" :key="y" :position-y="y">
				<div class="kvadrat" v-for="x in range(-(cols - 1) / 2, (cols - 1) / 2)" :key="x" :position-y="y" :position-x="x">
					[{{ y }},{{ x }}]
					<div class="tile"></div>
				</div>
			</div>
			<div class="human" :style="{ left: leftOffset2 + 'px', top: topOffset2 + 'px' }"></div>
		</div>
	  </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
	  rows: 5,
      cols: 5,
	  leftOffset: 0,
      topOffset: 0,
    };
  },
  mounted() {
    this.calculateTilePosition();
	this.calculateTilePosition2();
  },
  methods: {
	calculateTilePosition() {
      const mapElement = document.querySelector('.map1');
      const tileElement = document.querySelector('.map1 .kvadrat[position-x="0"][position-y="0"]');

      if (mapElement && tileElement) {
        const mapRect = mapElement.getBoundingClientRect();
        const tileRect = tileElement.getBoundingClientRect();

		const tileWidth = tileRect.width;
        const tileHeight = tileRect.height;

        // Вычислите отступы до центра квадрата
        this.leftOffset = tileRect.left - mapRect.left + tileWidth / 2;
        this.topOffset = tileRect.top - mapRect.top + tileHeight / 2;
		

		console.log('Left Offset (px):', this.leftOffset);
        console.log('Top Offset (px):', this.topOffset);
      }
    },
	calculateTilePosition2() {
      const mapElement2 = document.querySelector('.map2');
      const tileElement2 = document.querySelector('.map2 .kvadrat[position-x="1"][position-y="2"]');

      if (mapElement2 && tileElement2) {
        const mapRect2 = mapElement2.getBoundingClientRect();
        const tileRect2 = tileElement2.getBoundingClientRect();

        const tileWidth2 = tileRect2.width;
        const tileHeight2 = tileRect2.height;

        // Вычислите отступы до центра квадрата
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
.setka-z .kvadrat {
	width: 100px;
  height: 100px;
	border: 1px solid;
	background: red;
}
.setka-row {
  display: flex;
}
.kvadrat {
  width: 200px;
  height: 100px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.tile {
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
</style>
