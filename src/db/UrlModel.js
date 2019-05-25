import BaseModel from "./BaseModel";
import {
  ApplicationError
} from "../lib/errors";

import {
  default as urlSchema
} from "../schemas/url.schema.js";

// save the reference url

export default class urlModel extends BaseModel {
  constructor(connection) {
    super("url", connection);
    this.schema = urlchema;
    this.name = "url";
    this.model = this.connection.model(this.name, this.schema);
  }
  async create(urlInformation) {
    try {
      let checkUrl = await this.model.find({
        pathname: urlInformation.pathName
      });
      if (checkUrl) {
        throw new ApplicationError("url is  Already Register", 500, {});
      } else {
        const url = await this.model.create(urlInformation);
        const response = await this.model.find({
          pathname: urlInformation.pathName
        });
        if (!response) {
          return null;
        }
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
  // get parms value of every specific path
  async getParams(urlPath) {
    try {
      return await this.model.find({
        pathname: urlPath
      });
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}