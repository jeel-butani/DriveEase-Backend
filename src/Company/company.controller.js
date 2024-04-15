const companyService = require("../Company/company.services");

exports.createCompany = async (req, res) => {
  const { name, gstNumber, email, ownerName, location, password } = req.body;

  if (!name || !gstNumber || !email || !ownerName || !location || !password) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const newCompany = await companyService.createCompany(req.body);
    res.status(201).json({ message: "Company created successfully", company: newCompany });
  } catch (err) {
    console.error("Error creating company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.findAllCompanies();
    res.send({ message: "Companies data", companies });
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCompanyById = async (req, res) => {
  const id = req.params.id;
  try {
    const company = await companyService.findCompanyById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company found", company });
  } catch (err) {
    console.error("Error fetching company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCompanyByName = async (req, res) => {
  const name = req.query.name;
  try {
    const companies = await companyService.findCompanyByName(name);
    if (!companies || companies.length === 0) {
      return res.status(404).json({ message: "Companies not found with name: " + name });
    }
    res.json({ message: "Companies found", companies });
  } catch (err) {
    console.error("Error fetching companies by name:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCompany = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const result = await companyService.updateCompany(id, updateData);
    if (!result) {
      return res.status(400).json({ message: "No company found with id: " + id });
    }
    res.json({ message: "Company updated successfully" });
  } catch (err) {
    console.error("Error updating company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await companyService.deleteCompany(id);
    if (!result) {
      return res.status(400).json({ message: "No company found with id: " + id });
    }
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    console.error("Error deleting company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCompanyByEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const company = await companyService.findCompanyByEmail(email);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company found", company });
  } catch (err) {
    console.error("Error fetching company by email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};