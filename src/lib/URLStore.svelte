<!-- URLStore.svelte -->
<script lang="ts" generics="T extends Record<string, never>">
	import { onMount } from "svelte"
	import { afterNavigate } from "$app/navigation"
	import {
		compressData,
		decompressData,
		updateURL,
		getCompressedFromURL,
		log,
	} from "./utils"

	// Props for two-way binding
	// eslint-disable-next-line no-undef
	export let data: T
	export let debug = false

	let isInitialized = false
	let currentPath = ""

	// Create function to sync URL data with bound data
	const syncDataFromURL = () => {
		const compressed = getCompressedFromURL()
		if (compressed) {
			const urlData = decompressData(compressed)
			if (urlData) {
				log("Updating data from URL", urlData, debug)
				data = urlData
			}
		}
	}

	// Function to reapply URL params after route change
	const reapplyURLParams = () => {
		if (data) {
			const compressed = compressData(data)
			updateURL(compressed, true)
		}
	}

	// Watch for data changes and update URL
	$: if (isInitialized && data) {
		log("Data updated", data, debug)
		const compressed = compressData(data)
		updateURL(compressed, true)
	}

	// Listen for route changes and URL updates
	afterNavigate(({ to }) => {
		if (!to) return

		const newPath = to.url.pathname

		// Only handle URL param syncing if the path actually changed
		if (newPath !== currentPath) {
			log(`Route changed from ${currentPath} to ${newPath}`, undefined, debug)
			currentPath = newPath

			// Small timeout to ensure route change is complete
			setTimeout(() => {
				reapplyURLParams()
			}, 0)
		} else {
			// If path didn't change, check if we need to sync data from URL
			syncDataFromURL()
		}
	})

	onMount(() => {
		// Store initial path
		currentPath = window.location.pathname

		// Initialize from URL if present
		syncDataFromURL()
		isInitialized = true
	})
</script>
