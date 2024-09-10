import { parse as uuidParse, v4 as uuidV4 } from "uuid";
import { ulid as _ulid } from "ulid";

const ulid = () => {
    return _ulid().toLowerCase();
};

export { uuidParse, uuidV4, ulid };
