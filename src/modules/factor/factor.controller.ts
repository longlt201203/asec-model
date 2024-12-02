import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
} from "@nestjs/common";
import { FactorService } from "./factor.service";
import { CreateFactorRequest, FactorResponse } from "./dto";
import { ApiResponseDto, ObjectIdParam } from "@utils";

@Controller("factor")
export class FactorController {
	constructor(private readonly factorService: FactorService) {}

	@Post()
	async create(@Body() dto: CreateFactorRequest) {
		await this.factorService.create(dto);
		return new ApiResponseDto("Success!");
	}

	@Put(":id")
	async update(
		@ObjectIdParam("id")
		@Param("id")
		id: string,
		@Body() dto: CreateFactorRequest,
	) {
		await this.factorService.update(id, dto);
		return new ApiResponseDto("Success!");
	}

	@Delete(":id")
	async delete(
		@ObjectIdParam("id")
		@Param("id")
		id: string,
	) {
		await this.factorService.delete(id);
		return new ApiResponseDto("Success!");
	}

	@Get()
	async list() {
		const data = await this.factorService.list();
		return new ApiResponseDto(FactorResponse.fromDocuments(data));
	}
}
