import { Injectable } from "@nestjs/common";
import { CreateEnvironmentRequest, UpdateEnvironmentRequest } from "./dto";
import { EnvironmentModel } from "@db/models";
import { EnvironmentNotFoundError } from "./errors";

@Injectable()
export class EnvironmentService {
	async create(dto: CreateEnvironmentRequest) {
		return await EnvironmentModel.create({
			name: dto.name,
			implementedFactors: dto.implementedFactors.map((item) => ({
				factor: item.factor,
				value: item.value,
			})),
		});
	}

	async list() {
		return await EnvironmentModel.find();
	}

	async getOneOrFail(id: string) {
		const d = await this.getOne(id);
		if (!d) throw new EnvironmentNotFoundError();
		return d;
	}

	async getOne(id: string) {
		return await EnvironmentModel.findById(id).populate(
			"implementedFactors.factor",
		);
	}

	async update(id: string, dto: UpdateEnvironmentRequest) {
		await this.getOneOrFail(id);
		return await EnvironmentModel.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					name: dto.name,
					implementedFactors: dto.implementedFactors.map((item) => ({
						factor: item.factor,
						value: item.value,
					})),
				},
			},
		);
	}

	async delete(id: string) {
		await this.getOneOrFail(id);
		return EnvironmentModel.deleteOne({
			_id: id,
		});
	}
}
