export type GenericStoreData = Record<string, never>

export interface URLStoreData<T extends GenericStoreData> {
	initialData: T
	debug?: boolean
	onDataChange?: (data: T) => void // Optional callback for data changes
}
