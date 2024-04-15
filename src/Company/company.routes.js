const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

router.post("/", companyController.createCompany);
router.get("/", companyController.getAllCompanies);
router.get("/name", companyController.getCompanyByName);
router.get("/email", companyController.getCompanyByEmail);
router.get("/:id", companyController.getCompanyById);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
