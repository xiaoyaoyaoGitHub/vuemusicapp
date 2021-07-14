<template>
    <teleport to="body">
        <transition name="confirm-fade" v-show="visible">
            <div class="confirm">
                <div class="confirm-wrapper">
                    <div class="confirm-content">
                        <!-- 内容 -->
                        <p class="text">{{text}}</p>
                        <!-- 按钮 -->
                        <div class="operate">
                            <!-- 确认按钮 -->
                            <div @click.stop="confirm" class="operate-btn left">
                                {{confirmText}}
                            </div>
                            <!-- 取消按钮 -->
                            <div @click.stop="cancel" class="operate-btn">
                                {{cancelText}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Confirm',
    props: {
        confirmText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        text: {
            type: String,
            default: ''
        }
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
        const visible = ref(false)
        function confirm() {
            hide()
            emit('confirm')
        }

        function cancel() {
            hide()
            emit('cancel')
        }

        function hide() {
            visible.value = false
        }

        function show() {
            visible.value = true
        }

        return {
            confirm,
            cancel,
            hide,
            show,
            visible
        }
    }
})
</script>

<style scoped lang="scss">
  ;.confirm {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: $color-background-d;
    &.confirm-fade-enter-active {
      animation: confirm-fadein .3s;
      .confirm-content {
        animation: confirm-zoom-in .3s;
      }
    }
    &.confirm-fade-leave-active {
      animation: confirm-fadeout .3s;
      .confirm-content {
        animation: confirm-zoom-out .3s;
      }
    }
    .confirm-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      .confirm-content {
        width: 270px;
        border-radius: 13px;
        background: $color-highlight-background;
        .text {
          padding: 19px 15px;
          line-height: 22px;
          text-align: center;
          font-size: $font-size-large;
          color: $color-text-l;
        }
        .operate {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: $font-size-large;
          .operate-btn {
            flex: 1;
            line-height: 22px;
            padding: 10px 0;
            border-top: 1px solid $color-background-d;
            color: $color-text-l;
            &.left {
              border-right: 1px solid $color-background-d;
              color: $color-text;
            }
          }
        }
      }
    }
  }

  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes confirm-fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes confirm-zoom-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes confirm-zoom-out {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
