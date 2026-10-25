const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")

const router = express.Router()

/**
 * -POST /api/accounts/
 * -create a new account
 * -protected route
 */

router.post("/", authMiddleware.authMiddleware, accountController.createAccountController)

/**
 * - GET /api/accounts/
 * - GET all accounts of the logged-in user
 * - protected route
 */
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)

/**
 * - GET /api/accounts/balance/:accountId
 */
router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)

module.exports = router