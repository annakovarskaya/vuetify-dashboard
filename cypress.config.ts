import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  // TODO First test is flaky at the first attempt, I spent about 30 minutes on it and didn't find solution
  // this quick hack gonna help us for now, I'll look on it when everything else is done
  retries: 2,
});
