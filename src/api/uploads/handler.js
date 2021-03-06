class UploadsHandler {
  constructor(uploadsService, validator) {
    this._uploadsService = uploadsService;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;

    this._validator.validateImageHeaders(data.hapi.headers);

    const filename = await this._uploadsService.writeFile(data, data.hapi);

    return h
      .response({
        status: 'success',
        data: {
          fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
        },
      })
      .code(201);
  }
}

module.exports = UploadsHandler;
