import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://emilio-tapia.com",
  integrations: [tailwind(), sitemap({
    i18n: {
      defaultLocale: "es",
      locales: ["es", "en", "fr"],
      routing: {
        prefixDefaultLocale: false
      },
      fallback: {
        fr: "es",
        en: "es"
      }
    }
  }), react(), partytown()]
});