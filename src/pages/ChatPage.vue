<template>
  <div class="chat-container">
    <div class="container">
      <div class="chat-hight">
        <div class="row q-my-xl">
          <div class="col-md-3 col-12 bg-white rounded-10">
            <div class="scroll-div">
              <div
                class="users q-pa-sm flex cursor-pointer items-center bg-grey-3"
              >
                <q-avatar class="q-mr-md">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <div class="text-h6 ellipsis">Asjad tatto</div>
              </div>
              <div
                class="
                  user
                  q-pa-sm
                  flex
                  cursor-pointer
                  items-center
                  border-bottom
                "
                v-for="i in 41"
                :key="i"
              >
                <q-avatar class="q-mr-md">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <div class="text-h6 ellipsis">Asjad tatto</div>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-8 col-12 bg-white rounded-10 chat-box">
            <div class="scroll-div">
              <div class="q-pa-md row justify-center">
                <div style="width: 100%">
                  <q-chat-message label="Sunday, 19th" />

                  <q-chat-message
                    name="me"
                    avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                    :text="['hey, how are you?']"
                    sent
                    stamp="7 minutes ago"
                  />
                  <q-chat-message
                    name="Jane"
                    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                    :text="['doing fine, how r you?']"
                    stamp="4 minutes ago"
                  />
                </div>
              </div>
            </div>
            <div class="write-message q-px-lg">
              <q-input
                outlined
                v-model="messageValue"
                filled
                label="Write Message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const messageValue = ref("");
</script>
<style lang="scss" scoped>
.scroll-div {
  height: 80vh;
  overflow: auto;
}
.scroll-div::-webkit-scrollbar {
  width: 5px;
}
.chat-box {
  position: relative;
}

.scroll-div::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 10px;
}
.text-h6 {
  font-size: 14px;
}
.users:hover {
  background: #eeeeee !important;
}
.write-message {
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 1;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
}
.chat-box {
  @media screen and (max-width: $breakpoint-sm-max) {
    height: 80vh;
    margin-top: 20px;
  }
}
</style>
