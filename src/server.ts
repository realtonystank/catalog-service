import app from './app';
import logger from './config/logger';
import config from 'config';
import { initDb } from './config/db';

const startServer = async () => {
    const PORT = config.get('server.port') || 5502;
    try {
        await initDb();
        logger.info('Database connected successfully');
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

void startServer();
