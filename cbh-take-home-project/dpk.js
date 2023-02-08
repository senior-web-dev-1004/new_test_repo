const createHash = require("./utils");

/**
* Create Private Key for each Agent.
* @param {event} str
* @return {candidate} created Private key
*/

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      createHash(JSON.stringify(event));
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    } else {
      return "There is no candidate";
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    createHash(candidate);
  }
  
  return candidate;
};
