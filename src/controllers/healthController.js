const fs = require('fs')
const qrcode = require('qrcode-terminal')
const { sessionFolderPath } = require('../config')
const { sendErrorResponse } = require('../utils')
const os = require('os') // Import module os untuk mendapatkan informasi sistem
/**
 * Responds to ping request with 'pong'
 *
 * @function ping
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise that resolves once response is sent
 * @throws {Object} - Throws error if response fails
 */
const ping = async (req, res) => {
  /*
    #swagger.tags = ['Various']
  */
  try {
    res.json({ success: true, message: 'pong' })
  } catch (error) {
    sendErrorResponse(res, 500, error.message)
  }
}

/**
 * Example local callback function that generates a QR code and writes a log file
 *
 * @function localCallbackExample
 * @async
 * @param {Object} req - Express request object containing a body object with dataType and data
 * @param {string} req.body.dataType - Type of data (in this case, 'qr')
 * @param {Object} req.body.data - Data to generate a QR code from
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise that resolves once response is sent
 * @throws {Object} - Throws error if response fails
 */
const localCallbackExample = async (req, res) => {
  /*
    #swagger.tags = ['Various']
  */
  try {
    const { dataType, data } = req.body
    if (dataType === 'qr') { qrcode.generate(data.qr, { small: true }) }
    fs.writeFile(`${sessionFolderPath}/message_log.txt`, `${JSON.stringify(req.body)}\r\n`, { flag: 'a+' }, _ => _)
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    fs.writeFile(`${sessionFolderPath}/message_log.txt`, `(ERROR) ${JSON.stringify(error)}\r\n`, { flag: 'a+' }, _ => _)
    sendErrorResponse(res, 500, error.message)
  }
}
const getStatus = async (req, res) => {
  /*
    #swagger.tags = ['Status']
  */
  try {
    const loadAverage = os.loadavg(); // Load average (last 1, 5, and 15 minutes)
    const uptime = os.uptime(); // System uptime in seconds
    const totalMemory = os.totalmem(); // Total system memory
    const freeMemory = os.freemem(); // Free system memory
    const cpuInfo = os.cpus(); // Information about each CPU/core

    res.json({
      success: true,
      loadAverage,
      uptime,
      memory: {
        total: totalMemory,
        free: freeMemory,
        used: totalMemory - freeMemory
      },
      cpuInfo
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
}
module.exports = { ping,getStatus, localCallbackExample }
