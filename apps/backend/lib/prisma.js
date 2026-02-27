const { PrismaClient } = require('../generated/prisma/client')
require('dotenv').config()

const prisma = new PrismaClient()

module.exports = { prisma }