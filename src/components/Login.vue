<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="justify-center">
        <v-img
          class="mx-auto my-6"
          max-width="228"
          src="@/assets/logo.png"
        ></v-img>

        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="448"
          rounded="lg"
        >
          <div class="text-subtitle-1 text-medium-emphasis">Name</div>

          <v-text-field
            density="compact"
            placeholder="Enter your name"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            v-model="login"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            Password
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            v-model="password"
            @click:append-inner="visible = !visible"
          />

          <v-btn
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            block
            @click="onTryToLogin"
          >
            Log In
          </v-btn>

          <v-alert
            v-if="isShowAlert"
            color="error"
            icon="$error"
            title="Wrong credentials!"
          ></v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { users } from "@/fixtures/app_fixture";
import { RouteNames } from "@/router/routes";
import type User from "@/types/User";
import { computed, ref, unref, watch } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// refs
const visible = ref(false);
const isCredentialsCorrect: Ref<boolean | null> = ref(null);
const isShowAlert = ref(false);
const login = ref("");
const password = ref("");

// watchers
watch([login, password], () => {
  isShowAlert.value = false;
});

// computed refs

// Methods
const onTryToLogin = () => {
  isCredentialsCorrect.value = users.some(
    (user: User) =>
      user.name === unref(login) && user.password === unref(password),
  );
  const isCredentialsCorrectValue = unref(isCredentialsCorrect);
  isShowAlert.value = !isCredentialsCorrectValue;
  if (isCredentialsCorrectValue) {
    router.push({ name: RouteNames.Dashboard });
  }
};
</script>
