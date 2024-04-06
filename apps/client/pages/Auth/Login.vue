<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-10 w-auto"
        src="/logo.png"
        alt="earthworm"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300 mb-10"
      >
        Log in to your account
      </h2>
    </div>

    <OtherLogin
      v-for="(platform, i) in otherLoginList"
      :key="i"
      :name="platform.name"
      @login="handleOtherLogin"
    >
      <svg
        v-if="platform.name === 'Github'"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 mr-2"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.009 1.643c-5.83 0-10.541 4.747-10.541 10.62a10.61 10.61 0 0 0 7.207 10.074c.524.105.716-.229.716-.51 0-.246-.017-1.09-.017-1.97-2.933.634-3.543-1.265-3.543-1.265-.471-1.23-1.17-1.547-1.17-1.547-.96-.65.07-.65.07-.65 1.065.07 1.623 1.09 1.623 1.09.943 1.617 2.461 1.16 3.072.878.087-.685.366-1.16.663-1.424-2.339-.246-4.8-1.16-4.8-5.24 0-1.16.42-2.109 1.083-2.847-.105-.264-.472-1.354.105-2.813 0 0 .89-.282 2.896 1.09.86-.233 1.746-.351 2.636-.352.89 0 1.797.123 2.635.352 2.007-1.372 2.897-1.09 2.897-1.09.576 1.459.21 2.55.105 2.813.68.738 1.082 1.688 1.082 2.848 0 4.079-2.461 4.975-4.817 5.24.384.333.715.966.715 1.968 0 1.424-.017 2.567-.017 2.919 0 .281.192.615.716.51a10.611 10.611 0 0 0 7.207-10.074C22.55 6.39 17.82 1.643 12.01 1.643Z"
        ></path>
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 mr-2"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        ></path>
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        ></path>
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        ></path>
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        ></path>
        <path
          fill="none"
          d="M1 1h22v22H1z"
        ></path>
      </svg>
    </OtherLogin>
    <!-- 分割线 -->
    <div
      class="or sm:mx-auto sm:w-full sm:max-w-md mt-5 font-medium text-gray-700"
    >
      OR
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <form
        @submit.prevent="handleLogin"
        class="space-y-6"
        novalidate
      >
        <FormInput
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Please enter your phone number"
          v-model="phone"
          :errorMessage="phoneError"
          :onlyNumbers="true"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Please enter your password"
          v-model="password"
          :errorMessage="passwordError"
        />
        <div class="pt-2">
          <button
            type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not an account?
        <NuxtLink
          href="/auth/signup"
          class="font-semibold text-[1.2em] leading-6 text-indigo-400 hover:text-indigo-500"
        >
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import Message from "~/components/main/Message/useMessage";
import { useAuth } from "~/composables/auth";
import FormInput from "~/pages/Auth/FormInput.vue";
import OtherLogin from "~/pages/Auth/OtherLogin.vue";
import { useLoginForm } from "~/pages/Auth/hooks/useLoginForm";

const { handleSubmit, phone, phoneError, password, passwordError } =
  useLoginForm();

const router = useRouter();
const route = useRoute();
const { login, loginByGithub } = useAuth();

interface LoginItem {
  name: string;
}

// 其他登录方式
const otherLoginList: LoginItem[] = [
  {
    name: "Github",
  },
];

const handleOtherLogin = (name: string) => {
  // github登录
  console.log("打印***name", name);
  getCode();
};

// 获取url中的code
const getQuery = async () => {
  const code = route.query.code as string;
  console.log("打印***code", code);
  if (code) {
    const res = await loginByGithub(code);
    console.log("打印***res", res);
  }
};

getQuery();

const getCode = () => {
  const authorize_uri = "https://github.com/login/oauth/authorize";
  const client_id = "b08c95e85b02e09ba9a6";
  const redirect_uri = "http://localhost:3000/auth/login";
  location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
};

console.log("打印***route.query.callback", route.query.callback);
const handleLogin = handleSubmit(async (values) => {
  await login(values);
  Message.success("login success!");
  router.replace(route.query.callback?.toString() || "/");
});
</script>

<style scoped>
.or {
  display: flex;
  align-items: center;
}

.or::after {
  content: " ";
  display: inline-block;
  width: 100%;
  height: 0;
  margin-left: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.or::before {
  content: " ";
  display: inline-block;
  width: 100%;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  margin-right: 8px;
}
</style>
