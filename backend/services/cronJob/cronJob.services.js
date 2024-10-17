import cron from "node-cron";

import fetchSeedData from "../../utils/fetchSeedData.utils.js";

// schedule cron jobb

const scheduleCronJob = async () => {
  // schedule runs at 12 midnight
  cron.schedule("0 0 0 * * *", async () => {
    console.log("Running scheduled task at midnight");
    try {
      await fetchSeedData();
      console.log("Database initialized successfully.");
    } catch (error) {
      console.error(`Error initializing the database: ${error.message}`);
    }
  });
};

export default scheduleCronJob;
