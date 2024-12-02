import { ApiError } from "@errors";

export class FactorNotFoundError extends ApiError {
	constructor() {
		super({
			code: "factor_not_found_err",
			message: "Factor Not Found!",
			detail: null,
			status: 404,
		});
	}
}
