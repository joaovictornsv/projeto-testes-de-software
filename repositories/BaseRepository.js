export class BaseRepository {
  _data = [];

  save(newData) {
    // TODO - Generate id here
    if (this.findById(newData.id)) {
      throw new Error('Already exists a register with this id');
    }
    this._data.push(newData);
  }

  update(id, updatedData) {
    this._data = this._data.map((datum) => {
      if (datum.id !== id) {
        return datum;
      }
      return {
        ...datum,
        ...updatedData,
        id: datum.id,
      };
    });
  }

  findAll() {
    return this._data.slice(0);
  }

  findById(id) {
    return this._data.find((datum) => datum.id === id) || null;
  }

  clear() {
    this._data = [];
  }

  length() {
    return this._data.length;
  }
}
