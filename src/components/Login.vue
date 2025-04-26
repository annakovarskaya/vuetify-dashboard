<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="justify-center">
        <v-img
          class="mx-auto my-6"
          max-width="228"
          src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
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
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { RouteNames } from "@/router/routes";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const visible = ref(false);

// Methods
const onTryToLogin = () => {
  router.push({ name: RouteNames.Dashboard });
};
</script>
