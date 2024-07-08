const CONF = {
  DDBB_URL: process.env.DDBB_URL!,
  DDBB_NAME: process.env.DDBB_NAME!,
  BCRYTP_LOOP: parseInt(process.env.BCRYTP_LOOP!, 10),
  JWT_SECRET: process.env.JWT_SECRET!,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

export = CONF;
