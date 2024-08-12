import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function getSheet() {
	const doc = new GoogleSpreadsheet(
		process.env.GOOGLE_SHEET_ID!,
		new JWT({
			email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			key: process.env.GOOGLE_PRIVATE_KEY,
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		}),
	);

	await doc.loadInfo();

	return doc;
}
