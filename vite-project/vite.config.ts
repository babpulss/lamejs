import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
	plugins: [viteSingleFile({ useRecommendedBuildConfig: !false, removeViteModuleLoader: true })],
	build: {
		minify: false
	}
})