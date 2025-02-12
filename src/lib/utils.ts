import LZString from "lz-string"
import type { URLStoreData } from "./types"
import { goto } from "$app/navigation"

export const compressData = (data: URLStoreData<never>): string => {
	try {
		const jsonString = JSON.stringify(data)
		return LZString.compressToBase64(jsonString)
	} catch (error) {
		console.error("Error compressing data:", error)
		return ""
	}
}

export const decompressData = (
	compressed: string
): URLStoreData<never> | null => {
	try {
		const jsonString = LZString.decompressFromBase64(compressed)
		return jsonString ? JSON.parse(jsonString) : null
	} catch (error) {
		console.error("Error decompressing data:", error)
		return null
	}
}

export const updateURL = async (
	compressed: string,
	replace = false
): Promise<void> => {
	const url = new URL(window.location.href)

	if (compressed) {
		url.searchParams.set("_z", compressed)
	} else {
		url.searchParams.delete("_z")
	}

	// Use window.history for parameter updates only
	if (url.pathname === window.location.pathname) {
		if (replace) {
			window.history.replaceState({}, "", url.toString())
		} else {
			window.history.pushState({}, "", url.toString())
		}
	}
	// Use goto for actual route changes
	else {
		await goto(url.toString(), {
			replaceState: replace,
			keepFocus: true,
		})
	}
}

export const getCompressedFromURL = (): string => {
	const url = new URL(window.location.href)
	return url.searchParams.get("_z") || ""
}

export const log = (message: string, data?: any, debug = false) => {
	if (debug) {
		console.log(`[URLStore] ${message}`, data || "")
	}
}
