import {
  route
} from ".";
import UrlModel from "../db/UrlModel";

import {
  ApplicationError
} from "../lib/errors";
import _ from "lodash";
let domain = "medium.com"

export const saveReferenceUrl = route(async (req, res) => {
  const urlModel = new UrlModel();
  // we are varifying the reference domain 
  try {
    // if (req.rawHeaders[1] === domain) {
    //this is to check in local
    if (req.rawHeaders[1]) {
      var referenceUrl = req.query;
      referenceUrl.pathName = req._parsedUrl.pathname;
      let newUrl = Object.assign({}, referenceUrl, {});
      if (!_.isEmpty(newUrl)) {
        const url = await urlModel.create(newUrl);
        res.send({
          results: url
        });
      } else {
        throw new ApplicationError("No referenceUrl Provided !!!", 501, {});
      }
    }
  } catch (error) {
    throw new ApplicationError(
      "Request id coming with different Refernce Domain:",
      error,
      500, {}
    );
  }
});


//get list of all params values
export const getParams = route(async (req, res) => {
  const urlModel = new UrlModel();
  try {
    let urlPath = req.query.path;
    const params = await urlModel.getParams(urlPath);
    res.send({
      results: _.uniqBy(params)
    });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});