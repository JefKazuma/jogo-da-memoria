<template>
  <div class="carta flip-container"
       :class="{flip: carta.active, shake: carta.erro, disable: carta.disable}">
    <div class="flipper">
      <div class="front">
        <img :src="'./static/cartas/background.jpg'" />
      </div>
      <div class="back">
        <img :src="`./static/cartas/${carta.par}.jpg`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartaComponent',
  props: ['carta'],
  watch: {
    carta: {
      handler: function (e) {
        console.log(e)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.carta {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  margin: 1rem auto;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: .25rem;
    border: 1px solid #000;
  }

  &.disable .back:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &.flip-container {
    &.flip .flipper {
      transform: rotateY(180deg);
    }

    .flipper {
      position: relative;
      transition: 0.6s;
      transform-style: preserve-3d;
    }

    .front, 
    .back {
      position: absolute;
      backface-visibility: hidden;
      top: 0;
      left: 0;
      background-color: #fff;
      padding: 1rem;
      border-radius: .5rem;
    }

    .front {
      z-index: 2;
      transform: rotateY(0deg);
    }

    .back {
      overflow: hidden;
      transform: rotateY(180deg);
    }
  }
}

@keyframes shake {
  from, to {
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: shake;
}

@keyframes headShake {
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
  }
}
</style>