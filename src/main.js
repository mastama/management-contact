import {web} from "./application/web.js";
import {logger} from "./application/logging.js";

const PORT = '9090'
web.listen(PORT, () => {
    logger.info(`App Start on port ${PORT}`);
});