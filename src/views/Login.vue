<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="justify-center align-center">
        <!--
        Asked copilot's suggestions about colouring, wasn't sure what is more appropriate, i have to admit design is not my strongest skill 
        -->
        <v-dialog
          v-model="isShowAlert"
          max-width="400"
          icon="$error"
          data-cy="error-dialog"
        >
          <v-card color="error">
            <v-card-text
              class="text-center justify-center"
              style="margin-top: 20px"
            >
              Wrong credentials! Please try again.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="isShowAlert = false"
                data-cy="error-dialog-close-button"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
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
            data-cy="user-input"
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
            data-cy="password-input"
            :data-cy-type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
          />

          <v-btn
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            block
            data-cy="login-button"
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
import { users, user1Inventory, user2Inventory } from "@/fixtures/app_fixture";
import { RouteNames } from "@/router/routes";
import type User from "@/types/User";
import { computed, ref, unref, watch } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Refs
const visible = ref(false);
const isCredentialsCorrect: Ref<boolean | null> = ref(null);
const isShowAlert = ref(false);
const login = ref("");
const password = ref("");

// Computed refs

// Watchers

// Methods
const onTryToLogin = () => {
  console.log(user1Inventory);
  console.log(user2Inventory);
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
