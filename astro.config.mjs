import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
import image from "@astrojs/image";

import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), image(), astroI18next()]
});