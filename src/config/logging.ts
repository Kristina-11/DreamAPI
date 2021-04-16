const timestamp = (): string => {
  return new Date().toUTCString();
}

const info = (namespace: string, message: string, object?: unknown) => {
  if (object) {
    console.info(`[${timestamp()}] [INFO] [${namespace}] ${message}`, object);
  } else {
    console.info(`[${timestamp()}] [INFO] [${namespace}] ${message}`);
  }
}

const error = (namespace: string, message: string, object?: unknown) => {
  if (object) {
    console.error(`[${timestamp()}] [ERROR] [${namespace}] ${message}`, object);
  } else {
    console.error(`[${timestamp()}] [ERROR] [${namespace}] ${message}`);
  }
}

export default {
  info,
  error
}