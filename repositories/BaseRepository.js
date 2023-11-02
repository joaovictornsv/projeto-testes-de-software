export class BaseRepository {
  _data = [];

  save(newData) {
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

  length() {
    return this._data.length;
  }
}
