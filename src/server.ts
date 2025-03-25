import app from './app';
import logger from './config/logger';
import config from 'config';

const startServer = async () => {
    const PORT = config.get('server.port') || 5502;
    try {
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message);
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        }
    }
};

startServer();
