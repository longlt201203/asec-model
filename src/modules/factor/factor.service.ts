import { FactorModel } from "@db/models";
import { Injectable } from "@nestjs/common";
import { CreateFactorRequest, UpdateFactorRequest } from "./dto";
import { FactorNotFoundError } from "./errors";

@Injectable()
export class FactorService {
	async create(dto: CreateFactorRequest) {
		return await FactorModel.create({
			name: dto.name,
		});
	}

	async list() {
		return await FactorModel.find();
	}

	async getOneOrFail(id: string) {
		const d = await this.getOne(id);
		if (!d) throw new FactorNotFoundError();
		return d;
	}

	async getOne(id: string) {
		return await FactorModel.findById(id);
	}

	async update(id: string, dto: UpdateFactorRequest) {
		await this.getOneOrFail(id);
		return await FactorModel.updateOne(
			{ _id: id },
			{
				$set: {
					name: dto.name,
				},
			},
		);
	}

	async delete(id: string) {
		await this.getOneOrFail(id);
		return await FactorModel.deleteOne({ _id: id });
	}
}
