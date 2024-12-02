import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { EnvironmentService } from "./environment.service";
import { ApiResponseDto, ObjectIdParam } from "@utils";
import {
	CreateEnvironmentRequest,
	EnvironmentResponse,
	UpdateEnvironmentRequest,
} from "./dto";

@Controller("environment")
export class EnvironmentController {
	constructor(private readonly environmentService: EnvironmentService) {}

	@Get()
	async list() {
		const data = await this.environmentService.list();
		return new ApiResponseDto(EnvironmentResponse.fromDocuments(data));
	}

	@Get(":id")
	async getOne(
		@ObjectIdParam("id")
		@Param("id")
		id: string,
	) {
		const data = await this.environmentService.getOneOrFail(id);
		return new ApiResponseDto(EnvironmentResponse.fromDocument(data));
	}

	@Post()
	async create(@Body() dto: CreateEnvironmentRequest) {
		await this.environmentService.create(dto);
		return new ApiResponseDto("Success!");
	}

	@Put(":id")
	async updateOne(
		@ObjectIdParam("id")
		@Param("id")
		id: string,
		@Body()
		dto: UpdateEnvironmentRequest,
	) {
		await this.environmentService.update(id, dto);
		return new ApiResponseDto("Success!");
	}

	@Delete(":id")
	async delete(
		@ObjectIdParam("id")
		@Param("id")
		id: string,
	) {
		await this.environmentService.delete(id);
		return new ApiResponseDto("Success!");
	}
}
