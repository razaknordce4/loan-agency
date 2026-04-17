export const INITIAL_STATE = {
  // Metadata
  janRef: "", 
  dateOfReceipt: "",
  dateOfReport: "",
  rlmsNumber: "",
  referenceNumber: "",
  caName: "PARVEZ AND NARAYANA",
  verificationType: "Business",

  // Applicant Data
  applicantName: "",
  coApplicantName: "",
  address: "",
  pinCode: "",
  landMark: "",
  contactNo: "",
  coApplicantNo: "",

  // Verifier's Observation (Page 1 Checkboxes)
  observations: {
    locality: "", // Slum, Underdeveloped, Residential, etc.
    accessibility: "", // Easy, Difficult, Gulli, Untraceable
    motorable: "", // Yes / No
    addressConfirmed: "", // Yes / No
    accommodationType: "", // Residential, Asbestos, etc.
  },

  // Residence Details (Page 2 Table)
  residenceDetail: {
    noOfStairs: "",
    watchman: "",
    lift: "No",
    nameplateVisible: "No",
    externalAppearance: "Good",
    entryPermitted: "No",
    personContacted: "",
    relationship: "",
  },

  neighbourhoodCheck: {
    status: "Positive",
    comments: "",
  },

  // Business Details (Page 3)
  businessDetails: {
    businessName: "",
    premiseName: "",
    designation: "",
    natureOfBusiness: "",
    businessSince: "",
    activitySeen: "No",
    buildingDescription: "",
    ownershipType: "",
    peopleCount: "0",
    nameplateSeen: "No",
    text: "", // Executive Comments for Business
    status: "POSITIVE", 
  },

  // Employment Details (Page 3 - Alternative)
  employmentDetails: {
    employerName: "",
    designation: "",
    natureOfBusiness: "",
    jobSince: "",
    employmentType: "",
    officeDescription: "",
    salarySlipSeen: "No",
    staffCount: "0",
    boardSeen: "No",
    text: "", // Executive Comments for Job
    status: "POSITIVE",
  },

  // Executive Comments (Page 2 & Mixed)
  fieldExecutiveComments: {
    text: "",
    houseType: "",
    ownership: "",
    durationOfStay: "",
    familyMembers: "",
    dependents: "",
    standardOfLiving: "",
    residenceConfirmedBy: "",
  },

  // Images
  photos: {
    applicant: null,
    location: null,
    applicantAadhar: null,
    coApplicantAadhar: null,
    buildingFootage1: null,
    buildingFootage2: null,
    business1: null,
    business2: null,
    insideHome1: null,
    insideHome2: null,
  },

  // Sign-off (Page Footers)
  fieldExecutiveName: "",
  fieldExecutiveMobile: "",
  supervisorName: "", // MD Khaja in scan
  verifierName: "", // M Suresh Babu in scan
};
