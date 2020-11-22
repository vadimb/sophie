class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  class InvalidDateError extends ValidationError {
    constructor(date) {
      super(`Invalid date supplied: ${date}`);
      this.name = "InvalidDateError";
      this.date = date;
    }
  }

  const validationErrorHandler = (error, req, res) => {
    if(error instanceof ValidationError) {
        res.status(200).json({ 
            error: error.name,
        });
    } else {
      // eslint-disable-next-line callback-return
      throw error;
    }
  }

  const errorHandler = (error, req, res) => {
    functions.logger.error('Failed to process request. Reason: %s', error);
    res.status(500).end();
  }

  module.exports = { InvalidDateError, validationErrorHandler, errorHandler }