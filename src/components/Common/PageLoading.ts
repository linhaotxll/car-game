import { defineCustomElement } from 'vue'

const PageLoading = defineCustomElement({
  template: `
<div class="first-loading-wrap">
  <div class="loading-wrap">
    <span class="dot dot-spin"><i></i><i></i><i></i><i></i></span>
  </div>
</div>
  `,

  styles: [
    `
.first-loading-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.first-loading-wrap .loading-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 98px;
}

.first-loading-wrap .dot {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 32px;
  font-size: 32px;
  animation: ant-rotate 1.2s infinite linear;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.first-loading-wrap .dot i {
  position: absolute;
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background-color: #8C724A;
  opacity: 0.3;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  animation: ant-spin-move 1s infinite linear alternate;
}

.first-loading-wrap .dot i:nth-child(1) {
  top: 0;
  left: 0;
}

.first-loading-wrap .dot i:nth-child(2) {
  top: 0;
  right: 0;
  animation-delay: 0.4s;
}

.first-loading-wrap .dot i:nth-child(3) {
  right: 0;
  bottom: 0;
  animation-delay: 0.8s;
}

.first-loading-wrap .dot i:nth-child(4) {
  bottom: 0;
  left: 0;
  animation-delay: 1.2s;
}

@keyframes ant-rotate {
  to {
    transform: rotate(405deg);
  }
}

@keyframes ant-rotate {
  to {
    transform: rotate(405deg);
  }
}

@keyframes ant-spin-move {
  to {
    opacity: 1;
  }
}

@keyframes ant-spin-move {
  to {
    opacity: 1;
  }
}
    `,
  ],
})

export default PageLoading
