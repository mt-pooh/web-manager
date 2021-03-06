/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/table": {
    /** Upload Excel file */
    post: operations["post-table"];
  };
  "/tables": {
    /** Get table lists */
    get: operations["get-tables"];
  };
}

export interface components {
  schemas: {
    /** error message */
    Error: {
      message: string;
      errors: {
        field: string;
        message: string;
      }[];
    };
  };
}

export interface operations {
  /** Upload Excel file */
  "post-table": {
    responses: {
      /** table Uploaded */
      200: {
        content: {
          "application/json": {
            status: string;
          };
        };
      };
      /** Error */
      400: {
        content: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          date: string;
          fileName: string;
          /** table name to be determined at a glance */
          tableName: string;
        };
      };
    };
  };
  /** Get table lists */
  "get-tables": {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            tableList: {
              name: string;
              /** データの形式 */
              type: string;
              /** 画面に表示する項目名 */
              displayName: string;
            }[];
          };
        };
      };
      /** Not Found */
      404: {
        content: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
}
