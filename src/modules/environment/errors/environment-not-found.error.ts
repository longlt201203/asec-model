import { ApiError } from "@errors";

export class EnvironmentNotFoundError extends ApiError {
	constructor() {
		super({
			code: "environment_not_found_err",
			message: "Environment Not Found!",
			detail: null,
			status: 404,
		});
	}
}
