import { getSheet } from "./$api.js";

type Base = object;

export async function deleteRow<T extends Base>(
	cls: new () => T,
	sheetName: string,
	id: string,
) {
	const doc = await getSheet();
	const rows = await doc.sheetsByTitle[sheetName].getRows();
	const row = rows.find((row) => "id" in row && row.id === JSON.stringify(id));
	await row?.delete();
}

export async function updateRow<T extends Base>(
	cls: new () => T,
	sheetName: string,
	id: string,
	values: Record<string, string | number | boolean>,
) {
	const doc = await getSheet();
	const rows = await doc.sheetsByTitle[sheetName].getRows();
	const row = rows.find((row) => "id" in row && row.id === JSON.stringify(id));
	const jsonValues = Object.fromEntries(
		Object.entries(values).map(([key, value]) => [key, JSON.stringify(value)]),
	);
	if (row) {
		Object.assign(row, jsonValues);
		await row.save();
	} else {
		await doc.sheetsByTitle[sheetName].addRow(jsonValues);
	}
}

export async function allRows<T extends Base>(
	cls: new () => T,
	sheetName: string,
) {
	const doc = await getSheet();
	const rows = await doc.sheetsByTitle[sheetName].getRows();
	const objectKeys = Object.keys(new cls());

	return rows.map((row) => {
		return Object.fromEntries(
			objectKeys.map((key) => [
				key,
				row.get(key)
					? row.get(key) === "FALSE"
						? false
						: row.get(key) === "TRUE"
							? true
							: JSON.parse(row.get(key))
					: new cls()[key as keyof typeof cls],
			]),
		) as T;
	});
}
