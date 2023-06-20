import { get_api, post_api, put_api, get_SignIN } from "./axios";

// Using this APIs to get data and initiliazing token for Auth user

////////// GET ///////////////

// export const signIn = post_api(SIGN_IN + "/token", CONTENT_TYPE_SIGN_IN, data)
export const logIn = async (data) => {
  let response = get_SignIN("/token", data);
  return response;
};

//  API to Get Companies
export const getCompaniesAPI = async () => {
  let response = get_api("/get-companies");
  return response;
};

// API to Manage Estimators
export const ManageEstimatorsAPI = async (id) => {
  let response = get_api(`/estimatorsList?tenant_id=${id}`);
  return response;
};

export const GetLimitedNotificationsAPI = async (limit, id) => {
  let response = get_api(`/getNotifications?limit=${limit}&tenant_id=${id}`);
  return response;
};

export const RecentEstimatesAPI = async (status, companyId) => {
  let response = get_api(`/recentEstimates?status=${status}&company_id=${companyId}`);
  return response;
};
export const getRebidEstimatesAPI = async (companyId) => {
  let response = get_api(`/getRebidEstimates?company_id=${companyId}`);
  return response;
};
export const HistoryAPI = async (companyId) => {
  let response = get_api(`/recentEstimates?status=accepted&company_id=${companyId}`);
  return response;
};

export const RebidRequestsAPI = (status) => {
  let response = get_api(`/rebidEstimates?status=${status}`);
  return response;
};

export const ManageBillingCompanyAPI = async () => {
  let response = get_api("/getCompaniesList");
  return response;
};

export const ExpiringSoonAPI = async (id) => {
  let response = get_api(`/expiringEstimates?company_id=${id}`);
  return response;
};

export const getStatesOfEstimatesAPI = async (id) => {
  let response = get_api(`/getStatesOfEstimates?company_id=${id}`);
  return response;
};

export const getStatesOfEstimatorsAPI = async (id) => {
  let response = get_api(`/getStatesOfEstimators?company_id=${id}`);
  return response;
};

export const getStatesOfClientsAPI = async (id) => {
  let response = get_api(`/getStatesOfClients?company_id=${id}`);
  return response;
};

export const getStatesOfCompaniesAPI = async (id) => {
  let response = get_api(`/getStatesOfCompanies?company_id=${id}`);
  return response;
};

export const getEstimatorDetailsAPI = async (username) => {
  let response = get_api(`/getEstimatorDetails?username=${username}`);
  return response;
};

export const getViewCategoryAPI = async (questionnaire_name) => {
  let response = get_api(`/viewCategories?questionnaire_name=${questionnaire_name}`);
  return response;
};

export const ClientProfileAPI = async (id) => {
  let response = get_api(`/clientProfile?clientId=${id}`);
  return response;
};

export const getReviewListAPI = async (estimatorId) => {
  let response = get_api(`/getReviewList?estimateId=${estimatorId}`);
  return response;
};

export const getReviewListAPIEstimator = async (estimatorId) => {
  let response = get_api(`/getReviewList?estimatorId=${estimatorId}`);
  return response;
};

export const getQuotationAPI = async (estimateId, estimatorId) => {
  let response = get_api(`/getQuotation?estimateId=${estimateId}&estimatorId=${estimatorId}`);
  return response;
};
export const getReviewDetailsAPI = async (estimatorId, clientId) => {
  let response = get_api(`/getReviewDetails?estimatorId=${estimatorId}&clientId=${clientId}`);
  return response;
};
export const getCompanyDetails = async (domain_name) => {
  let response = get_api(`/getCompanyDetails?domain=${domain_name}`);
  return response;
};

export const getPermissionApi = async (userName) => {
  let response = get_api(`/getPermission?userName=${userName}&portal=company`);
  return response;
};
////////// POST ///////////////
export const searchEstimatorAPI = async (estimator_name) => {
  let response = get_api(`/searchEstimator?estimator_name=${estimator_name}`);
  return response;
};
export const searchAPI = async (status, search) => {
  let response = get_api(`/search?status=${status}&search=${search}`);
  return response;
};

export const searchEstimatesAPI = async (data, companyId) => {
  let response = post_api(`/searchEstimates?company_id=${companyId}`, data);
  return response;
};
export const getEstimatorByIdAPI = async (id, company_id) => {
  let response = get_api(`/getEstimatorById?estimator_id=${id}&company_id=${company_id}`);
  return response;
};
export const getChatToken = async (username) => {
  let response = get_api(`/getChatToken?username=${username}`);
  return response;
};

export const checkingBlackListed = async (userName) => {
  let response = get_api(`/checkingBlackListed?username=${userName}`);
  return response;
};

export const getUsersList = async () => {
  let response = get_api(`/get-usersList?domainName=${localStorage.getItem("domain_username")}`);
  return response;
};

export const deleteUserApi = async (userName) => {
  let response = post_api(`/delete-user?userName=${userName}`);
  return response;
};

export const getUsersListUserName = async (userName) => {
  let response = get_api(`/get-user?userName=${userName}`);
  return response;
};

export const roleListApi = async () => {
  let response = get_api("/roleList?portal=company");
  return response;
};

export const getUnreadNotifications = async (id) => {
  let response = get_api(`/getUnreadNotifications?company_id=${id}`);
  return response;
};

////////// POST ///////////////

// this API is for Add Estimator Page
export const addEstimatorAPI = async (payload) => {
  let response = post_api("/addEstimator", payload);
  return response;
};
export const updateUserApi = async (payload) => {
  let response = post_api("/update-user", payload);
  return response;
};

// this API is for Add Billing company Page
export const addBillingCompanyAPI = async (payload) => {
  let response = post_api("/add-company", payload);
  return response;
};
export const SubmitForRebidAPI = async (payload) => {
  let response = post_api("/addQuotation", payload);
  return response;
};

export const companyForgotPasswordAPI = async (payload) => {
  let response = post_api("/companyForgotPassword", payload);
  return response;
};

export const companyVerifyOtpAPI = async (payload) => {
  let response = post_api("/companyVerifyOtp", payload);
  return response;
};

//  API to Get Image URL
export const uploadImage = async (data) => {
  let formData = new FormData();
  formData.append("image", data);
  let response = post_api("/upload-image", formData);
  return response;
};

export const EditCompanyBill = async (payload) => {
  let response = post_api("/updateCompanyDetails", payload);
  return response;
};

export const createConversation = async (payload) => {
  let response = post_api("/create-conversation", payload);
  return response;
};

export const EstimateIDFromDashboard = async (estimateId) => {
  let response = get_api(`/getEstimate?estimateId=${estimateId}`);
  return response;
};

export const GetAnswersFromCleintID = async (CleintID, estimator_id, estimateId, laterThan) => {
  let response = get_api(
    `/getAnswers?client_id=${CleintID}&estimator_id=${estimator_id}&estimate_id=${estimateId}&later_than=${laterThan}`
  );
  // let response = get_api(`/getAnswers?client_id=${CleintID}&estimate_id=${estimateId}`);
  return response;
};

export const submitRebidQuotation = async (payload) => {
  let response = post_api("/submitRebidQuotation", payload);
  return response;
};

export const removeBlackListed = async (userName) => {
  let response = post_api(`/removeBlackListed?username=${userName}`);
  return response;
};

export const addUserDisable = async (payload) => {
  let response = post_api("/add-userDisable", payload);
  return response;
};

export const SendNewPassword = async (password) => {
  let response = get_api(`/companyResetPassword`, password);
  return response;
};

export const addUserApi = async (payload) => {
  let response = post_api("/addCompanyUser", payload);
  return response;
};

export const upDatePermissions = async (payload) => {
  let response = post_api("/update-permissions", payload);
  return response;
};

export const addRole = async (payload) => {
  let response = post_api("/addRole", payload);
  return response;
};

export const updateRole = async (payload) => {
  let response = post_api("/update-role", payload);
  return response;
};

export const deleteRole = async (userName) => {
  let response = post_api(`/delete-role?name=${userName}`);
  return response;
};

////////// PUT ///////////////

// API to Update Estimators
export const UpdateEstimatorsAPI = async (updateData) => {
  let response = put_api("/updateEstimatorDetails", updateData);
  return response;
};
export const UpdateEstimate = async (estimateId, data) => {
  let response = put_api(`/updateEstimate?estimateId=${estimateId}`, data);
  return response;
};

export const readAllNotifications = async (id) => {
  let response = put_api(`/readAllNotifications?company_id=${id}`);
  return response;
};
