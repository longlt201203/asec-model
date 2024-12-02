import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";
import { FactorDocumentType } from "./factor.model";

export interface IAffection {
	factor: FactorDocumentType;
	strength: number;
}

export interface IAttribute {
	name: string;
	affections: Array<IAffection>;
}

export type AttributeDocumentType = HydratedDocument<
	IAttribute,
	{
		affections: Types.Array<IAffection>;
	}
>;

export type AttributeModelType = Model<
	IAttribute,
	{},
	{},
	{},
	AttributeDocumentType
>;

const AffectionSchema = new Schema<IAffection>({
	factor: { type: Schema.Types.ObjectId, ref: "Factor" },
	strength: { type: Number, require: true },
});

const AttributeSchema = new Schema<IAttribute, AttributeModelType>({
	name: { type: String, require: true },
	affections: [AffectionSchema],
});

export const AttributeModel = mongoose.model("Attribute", AttributeSchema);
