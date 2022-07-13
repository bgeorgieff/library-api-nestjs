import { Model } from 'mongoose';

export class GenericCrudService<TDocument, TCreateDto, TUpdateDto> {
  model: Model<TDocument>;
  constructor(model) {
    this.model = model;
  }

  async create(createDto: TCreateDto) {
    return await new this.model(createDto).save();
  }

  async findAll() {
    return await this.model.find();
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id });
  }

  async update(id: string, updateGenreDto: TUpdateDto) {
    return await this.model.updateOne({ _id: id }, updateGenreDto);
  }

  async remove(id: string) {
    return await this.model.deleteOne({ _id: id });
  }
}
