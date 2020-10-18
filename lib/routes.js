var cors = require('cors');
const security = require('./config/auth');
const corsOpt = require('./config/cors');
const multer = require('multer');
var path = require('path');

const dir = './app/uploads';
const dir_company = './app/uploads/company';
const dir_employee = './app/uploads/employee';
const dir_member = './app/uploads/member';
const dir_products = './app/uploads/products';
const dir_offers = './app/uploads/offers';
const csvimport = './imports';

const users = require('./controller/user.ctrl');
const companies = require('./controller/company.ctrl');
const products = require('./controller/products.ctrl');
const locations = require('./controller/locations.ctrl');


let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
	}
});

let importStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, csvimport);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname));
	}
});

let companyStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir_company);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname));
	}
});

let memberStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir_member);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname));
	}
});

let employeeStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir_employee);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname));
	}
});

let productsStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir_products);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname));
	}
});

let bulkProductsStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir_products);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

let offersStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dir_offers);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname));
	}
});

let upload_company = multer({
	storage: companyStorage
});

let upload_employee = multer({
	storage: employeeStorage
});

let upload_member = multer({
	storage: memberStorage
});

let upload_products = multer({
	storage: productsStorage
});

let upload_products_bulk = multer({
	storage: bulkProductsStorage
});

let upload_offers = multer({
	storage: offersStorage
});

let upload = multer({
	storage: storage
});

let dataImport = multer({
	storage: importStorage
});


//cors(corsOpt.corsOptions),
module.exports = {

	configure: function (app) {
		
		app.get('/api/getCountryList',  function (req, res) {
			companies.getCountryList(req, res);
		});	

		app.get('/api/getStateListOnCountry/:countryid',  function (req, res) {
			companies.getStateListOnCountry(req, res);
		});	

		app.get('/api/getCityListOnState/:stateid',  function (req, res) {
			companies.getCityListOnState(req, res);
		});	

		app.post('/api/authenticateEmployee',  function (req, res) {
			users.authenticateEmployee(req, res);
		});	

		app.post('/api/setNewPassword',  function (req, res) {
			security(req, res);users.setNewPassword(req, res);
		});	

		app.post('/api/saveCompanyDetails',  upload_company.single('file'),  function (req, res) {
			security(req, res);companies.saveCompanyDetails(req, res);
		});	

		app.post('/api/deleteCompanies',  function (req, res) {
			security(req, res);companies.deleteCompanies(req, res);
		});	

		app.get('/api/getCompaniesList',  function (req, res) {
			security(req, res);companies.getCompaniesList(req, res);
		});	

		app.get('/api/getCompanyDetails/:companyid',  function (req, res) {
			security(req, res);companies.getCompanyDetails(req, res);
		});	
		
		app.get('/api/getUsersList',  function (req, res) {
			security(req, res);users.getUsersList(req, res);
		});	

		app.get('/api/getUserDetails/:userid',  function (req, res) {
			security(req, res);users.getUserDetails(req, res);
		});	

		app.post('/api/saveUserDetails',  upload_employee.single('file'),  function (req, res) {
			security(req, res);users.saveUserDetails(req, res);
		});	

		// SITEADMIN/LOCATIONS
		app.get('/api/VerifyDuplicateContact/:contact/:locationid',  function (req, res) {
			security(req, res);locations.VerifyDuplicateContact(req, res);
		});	
		app.get('/api/getManagersList/:locationid',  function (req, res) {
			security(req, res);locations.getManagersList(req, res);
		});	
		app.get('/api/getLocationsList',  function (req, res) {
			security(req, res);locations.getLocationsList(req, res);
		});	
		app.get('/api/getLocationDetails/:locationid',  function (req, res) {
			security(req, res);locations.getLocationDetails(req, res);
		});	
		app.post('/api/saveLocationDetails',  function (req, res) {
			security(req, res);locations.saveLocationDetails(req, res);
		});

		// SITEADMIN/STOCK_POINT
		app.get('/api/stock_VerifyDuplicateContact/:contact/:stockid',  function (req, res) {
			security(req, res);locations.stock_VerifyDuplicateContact(req, res);
		});	
		app.get('/api/getStockPointsList',  function (req, res) {
			security(req, res);locations.getStockPointsList(req, res);
		});	
		app.get('/api/getStockPointDetails/:stockpointid',  function (req, res) {
			security(req, res);locations.getStockPointDetails(req, res);
		});	
		app.post('/api/saveStockPointDetails',  function (req, res) {
			security(req, res);locations.saveStockPointDetails(req, res);
		});

		// SITEADMIN/MANUFATURELS
		app.get('/api/getManufacturelsList',  function (req, res) {
			security(req, res);products.getManufacturelsList(req, res);
		});	

		app.get('/api/getmanufacturelDetails/:id',  function (req, res) {
			security(req, res);products.getmanufacturelDetails(req, res);
		});	

		app.post('/api/saveManufacturelDetails',  function (req, res) {
			security(req, res);products.saveManufacturelDetails(req, res);
		});	

		app.post('/api/UploadManufacturalData', dataImport.any(),  function (req, res) {
			security(req, res);products.UploadManufacturalData(req, res);
		});	

		// SITEADMIN/CATAGORIES
		app.get('/api/getCatagoriesList',  function (req, res) {
			security(req, res);products.getCatagoriesList(req, res);
		});	

		app.get('/api/getCatagoryDetails/:id',  function (req, res) {
			security(req, res);products.getCatagoryDetails(req, res);
		});	

		app.post('/api/saveCatagoryDetails',  function (req, res) {
			security(req, res);products.saveCatagoryDetails(req, res);
		});	

		app.post('/api/UploadCatagoriesData', dataImport.any(),  function (req, res) {
			security(req, res);products.UploadCatagoriesData(req, res);
		});	

		// SITEADMIN/MEGAPACKS
		app.get('/api/getMegapacksList',  function (req, res) {
			security(req, res);products.getMegapacksList(req, res);
		});	

		app.get('/api/getprodctUnits',  function (req, res) {
			security(req, res);products.getprodctUnits(req, res);
		});	

		app.get('/api/getMegapackDetails/:id',  function (req, res) {
			security(req, res);products.getMegapackDetails(req, res);
		});	

		app.get('/api/getMegapackProductDetails/:id',  function (req, res) {
			security(req, res);products.getMegapackProductDetails(req, res);
		});	

		app.post('/api/saveMegapackDetails',  upload_products.any(), function (req, res) {
			security(req, res);products.saveMegapackDetails(req, res);
		});	

		// SITEADMIN/PRODUCTS
		app.get('/api/getProductsList',  function (req, res) {
			security(req, res);products.getProductsList(req, res);
		});	

		app.get('/api/getProductDetails/:id',  function (req, res) {
			security(req, res);products.getProductDetails(req, res);
		});	

		app.post('/api/saveProductDetails',  function (req, res) {
			security(req, res);products.saveProductDetails(req, res);
		});	

		app.post('/api/UploadProductsData', dataImport.any(),  function (req, res) {
			security(req, res);products.UploadProductsData(req, res);
		});	

		// SITEADMIN/PRODUCTUNITS
		app.get('/api/getProductUnitsList',  function (req, res) {
			security(req, res);products.getProductUnitsList(req, res);
		});	

		app.get('/api/getProductUnitDetails/:id',  function (req, res) {
			security(req, res);products.getProductUnitDetails(req, res);
		});	

		app.get('/api/getProductUnitImages/:id',  function (req, res) {
			security(req, res);products.getProductUnitImages(req, res);
		});	

		app.post('/api/deleteProductImage/',  function (req, res) {
			security(req, res);products.deleteProductImage(req, res);
		});	

		app.get('/api/getUnitsList/',  function (req, res) {
			products.getUnitsList(req, res);
		});	

		app.post('/api/saveProductUnitDetails',  upload_products.any(),  function (req, res) {
			security(req, res);products.saveProductUnitDetails(req, res);
		});	

		app.post('/api/UploadProductUnitsData', dataImport.any(),  function (req, res) {
			security(req, res);products.UploadProductUnitsData(req, res);
		});	


		app.post('/api/uploadProductUnitsImages',  upload_products_bulk.any(),  function (req, res) {
			security(req, res);
		});	

		//VENDORS

		app.get('/api/getVendorsList',  function (req, res) {
			security(req, res);locations.getVendorsList(req, res);
		});	

		app.get('/api/getVendorDetails/:id',  function (req, res) {
			security(req, res);locations.getVendorDetails(req, res);
		});	
		
		app.post('/api/saveVendorDetails',  function (req, res) {
			security(req, res);locations.saveVendorDetails(req, res);
		});	

		//OFFERS

		app.get('/api/getOffersList',  function (req, res) {
			security(req, res);products.getOffersList(req, res);
		});	

		app.get('/api/getOfferDetails/:id',  function (req, res) {
			security(req, res);products.getOfferDetails(req, res);
		});	
		
		app.post('/api/saveOfferDetails', upload_offers.any(),  function (req, res) {
			security(req, res);products.saveOfferDetails(req, res);
		});	
		
		//PURCHASE

		app.get('/api/getPurchaseList',  function (req, res) {
			security(req, res);products.getPurchaseList(req, res);
		});	

		app.get('/api/getPurchaseDetails/:id',  function (req, res) {
			security(req, res);products.getPurchaseDetails(req, res);
		});	

		app.get('/api/getProductUnitsOnProduct/:id',  function (req, res) {
			security(req, res);products.getProductUnitsOnProduct(req, res);
		});	

		app.delete('/api/deletePurchaseItem/:id',  function (req, res) {
			security(req, res);products.deletePurchaseItem(req, res);
		});	
		
		app.post('/api/savePurchaseDetails', upload_offers.any(),  function (req, res) {
			security(req, res);products.savePurchaseDetails(req, res);
		});	
		
		//GOODS RECIEPT

		app.get('/api/getGoodsRecieptsList',  function (req, res) {
			security(req, res);products.getGoodsRecieptsList(req, res);
		});	

		app.get('/api/getGoodsRecieptDetails/:id',  function (req, res) {
			security(req, res);products.getGoodsRecieptDetails(req, res);
		});	

		app.get('/api/verifyGoodsEntryExist/:id',  function (req, res) {
			security(req, res);products.verifyGoodsEntryExist(req, res);
		});	

		app.post('/api/saveGoodsRecieptsDetails', upload_offers.any(),  function (req, res) {
			security(req, res);products.saveGoodsRecieptsDetails(req, res);
		});	

		app.post('/api/updateGoodsRecieptsDetails', upload_offers.any(),  function (req, res) {
			security(req, res);products.updateGoodsRecieptsDetails(req, res);
		});	

		app.get('/api/SignOut', function (req, res) {
			security(req, res);users.SignOut(req, res);
		});	
		
    }
};