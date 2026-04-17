import React from 'react';
import { 
  ClipboardCheck, 
  User, 
  MapPin, 
  Camera, 
  MessageSquare, 
  CheckCircle2,
  Building2,
  Layout,
  FileText
} from 'lucide-react';
import { ToggleGroup, InputField, TextAreaField, SectionHeader, SelectField } from './FormControls';

export default function ReportForm({ data, updateData }) {
  const updateNested = (category, field, value) => {
    updateData({
      [category]: { ...data[category], [field]: value }
    });
  };

  const updatePhoto = (key, value) => {
    updateData({
      photos: { ...data.photos, [key]: value }
    });
  };

  return (
    <div className="space-y-12">
      {/* Page 1: Metadata & Basic Info */}
      <section className="space-y-8">
        <div className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
          <SectionHeader icon={ClipboardCheck} title="Report Metadata" description="Top header markers and tracking" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField label="JAN Reference (e.g. JAN-1231)" value={data.janRef} onChange={v => updateData({ janRef: v })} placeholder="e.g., JAN-1231" />
            <InputField label="Date of Receipt" type="date" value={data.dateOfReceipt} onChange={v => updateData({ dateOfReceipt: v })} />
            <InputField label="Date of Report" type="date" value={data.dateOfReport} onChange={v => updateData({ dateOfReport: v })} />
            <InputField label="RLMS Number" value={data.rlmsNumber} onChange={v => updateData({ rlmsNumber: v })} placeholder="Enter RLMS number" />
            <InputField label="Reference Number" value={data.referenceNumber} onChange={v => updateData({ referenceNumber: v })} placeholder="Enter reference number" />
            <InputField label="Chartered Accountant Name" value={data.caName} onChange={v => updateData({ caName: v })} placeholder="e.g., PARVEZ AND NARAYANA" />
          </div>
        </div>

        <div className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
          <SectionHeader icon={User} title="Applicant Details" description="Primary and Co-applicant information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Applicant Name" value={data.applicantName} onChange={v => updateData({ applicantName: v })} placeholder="Full name of applicant" />
            <InputField label="Co-Applicant Name" value={data.coApplicantName} onChange={v => updateData({ coApplicantName: v })} placeholder="Full name of co-applicant" />
            <div className="md:col-span-2">
              <TextAreaField label="Full Address" value={data.address} onChange={v => updateData({ address: v })} placeholder="Enter complete residential address" />
            </div>
            <InputField label="Pin Code" value={data.pinCode} onChange={v => updateData({ pinCode: v })} placeholder="6-digit pin code" />
            <InputField label="Land Mark" value={data.landMark} onChange={v => updateData({ landMark: v })} placeholder="Nearby landmark" />
            <InputField label="Contact Number" value={data.contactNo} onChange={v => updateData({ contactNo: v })} placeholder="Mobile or landline" />
            <InputField label="Co-Applicant Number" value={data.coApplicantNo} onChange={v => updateData({ coApplicantNo: v })} placeholder="Co-applicant mobile" />
          </div>
        </div>
      </section>

      {/* Page 1: Verifier's Observation Dropdowns */}
      <section className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
        <SectionHeader icon={Layout} title="Verifier's Observation" description="Dropdown parameters (Page 1)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SelectField 
            label="Locality / Surrounding" 
            options={['Slum Area', 'Underdeveloped Area', 'Residential Buildings', 'Small/Medium Size Shops', 'Chawl Area', 'Big Housing Complex', 'Commercial Building']} 
            value={data.observations.locality} 
            onChange={v => updateNested('observations', 'locality', v)} 
          />
          <SelectField 
            label="Accessibility" 
            options={['Easy to locate and access', 'Difficult to locate', 'Gulli (very narrow road)', 'Untraceable']} 
            value={data.observations.accessibility} 
            onChange={v => updateNested('observations', 'accessibility', v)} 
          />
          <SelectField label="Is the entrance motorable" options={['Yes', 'No']} value={data.observations.motorable} onChange={v => updateNested('observations', 'motorable', v)} />
          <SelectField label="Is the address confirmed" options={['Yes', 'No']} value={data.observations.addressConfirmed} onChange={v => updateNested('observations', 'addressConfirmed', v)} />
          <div className="md:col-span-2">
            <SelectField 
              label="Type of Accommodation" 
              options={['Residential building', 'Asbestos house', 'Hostel', 'Small Unit within a House', 'Slum', 'Small independent house']} 
              value={data.observations.accommodationType} 
              onChange={v => updateNested('observations', 'accommodationType', v)} 
            />
          </div>
        </div>
      </section>

      {/* Page 2: Residence Detail & Neighbourhood */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
          <SectionHeader icon={MapPin} title="Residence Physical Check" description="Page 2 Detail" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="No. of Stairs" value={data.residenceDetail.noOfStairs} onChange={v => updateNested('residenceDetail', 'noOfStairs', v)} placeholder="e.g., 0 for Ground Floor" />
            <ToggleGroup label="Watchman" options={['Yes', 'No']} value={data.residenceDetail.watchman} onChange={v => updateNested('residenceDetail', 'watchman', v)} />
            <ToggleGroup label="Lift" options={['Yes', 'No']} value={data.residenceDetail.lift} onChange={v => updateNested('residenceDetail', 'lift', v)} />
            <ToggleGroup label="Nameplate Visible" options={['Yes', 'No']} value={data.residenceDetail.nameplateVisible} onChange={v => updateNested('residenceDetail', 'nameplateVisible', v)} />
            <InputField label="Appearance of Buildling" value={data.residenceDetail.externalAppearance} onChange={v => updateNested('residenceDetail', 'externalAppearance', v)} placeholder="e.g., Good / Painted" />
            <ToggleGroup label="Entry permitted" options={['Yes', 'No', 'Door Locked']} value={data.residenceDetail.entryPermitted} onChange={v => updateNested('residenceDetail', 'entryPermitted', v)} />
            <InputField label="Person Contacted" value={data.residenceDetail.personContacted} onChange={v => updateNested('residenceDetail', 'personContacted', v)} placeholder="Name of person met" />
            <InputField label="Relationship" value={data.residenceDetail.relationship} onChange={v => updateNested('residenceDetail', 'relationship', v)} placeholder="Relationship with applicant" />
          </div>
        </div>
        <div className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
          <SectionHeader icon={MessageSquare} title="Neighbourhood Check" description="Page 2 Observation" />
          <ToggleGroup label="Neighbors Verification" options={['Positive', 'Negative']} value={data.neighbourhoodCheck.status} onChange={v => updateNested('neighbourhoodCheck', 'status', v)} />
          <TextAreaField label="Neighbourhood Comments" value={data.neighbourhoodCheck.comments} onChange={v => updateNested('neighbourhoodCheck', 'comments', v)} placeholder="Enter details from neighborhood confirmation" />
        </div>
      </section>

      {/* Page 3: Business/Job Verification Details */}
      <section className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
        <SectionHeader icon={Building2} title={data.verificationType === 'Job' ? "Employment Verification" : "Business Verification"} description="Detailed parameters (Page 3)" />
        <div className="mb-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
           <ToggleGroup label="Occupation" options={['Business', 'Job']} value={data.verificationType || 'Business'} onChange={v => updateData({ verificationType: v })} />
        </div>
        {data.verificationType === 'Job' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Employer / Company Name" value={data.employmentDetails.employerName} onChange={v => updateNested('employmentDetails', 'employerName', v)} placeholder="e.g., TCS" />
              <InputField label="Applicant Designation" value={data.employmentDetails.designation} onChange={v => updateNested('employmentDetails', 'designation', v)} placeholder="e.g., Software Engineer" />
              <InputField label="Nature of Company Business" value={data.employmentDetails.natureOfBusiness} onChange={v => updateNested('employmentDetails', 'natureOfBusiness', v)} placeholder="e.g., IT Services" />
              <InputField label="Working Since" value={data.employmentDetails.jobSince} onChange={v => updateNested('employmentDetails', 'jobSince', v)} placeholder="e.g., 2020 onwards" />
              <ToggleGroup label="Employment Type" options={['Permanent', 'Contract']} value={data.employmentDetails.employmentType} onChange={v => updateNested('employmentDetails', 'employmentType', v)} />
              <InputField label="Describe the Office Building" value={data.employmentDetails.officeDescription} onChange={v => updateNested('employmentDetails', 'officeDescription', v)} placeholder="e.g., Glass Facade, Multi-story" />
              <ToggleGroup label="ID Card / Payslip Seen" options={['Yes', 'No']} value={data.employmentDetails.salarySlipSeen} onChange={v => updateNested('employmentDetails', 'salarySlipSeen', v)} />
              <InputField label="Approx. Staff Count" type="number" value={data.employmentDetails.staffCount} onChange={v => updateNested('employmentDetails', 'staffCount', v)} placeholder="Approx staff count" />
              <ToggleGroup label="Company Board Seen" options={['Yes', 'No', 'Temporary']} value={data.employmentDetails.boardSeen} onChange={v => updateNested('employmentDetails', 'boardSeen', v)} />
            </div>
            <div className="mt-6">
              <TextAreaField label="Field Executive's Comments (Job)" value={data.employmentDetails.text} onChange={v => updateNested('employmentDetails', 'text', v)} placeholder="Detailed observation of office premises..." />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Name of Premises" value={data.businessDetails.premiseName} onChange={v => updateNested('businessDetails', 'premiseName', v)} placeholder="e.g., Sree Balaji Enterprises" />
              <InputField label="Applicant Designation" value={data.businessDetails.designation} onChange={v => updateNested('businessDetails', 'designation', v)} placeholder="e.g., Proprietor" />
              <InputField label="Nature of Business" value={data.businessDetails.natureOfBusiness} onChange={v => updateNested('businessDetails', 'natureOfBusiness', v)} placeholder="e.g., General Stores" />
              <InputField label="Doing Business Since" value={data.businessDetails.businessSince} onChange={v => updateNested('businessDetails', 'businessSince', v)} placeholder="e.g., 2018 onwards" />
              <ToggleGroup label="Business Activities Seen" options={['Yes', 'No']} value={data.businessDetails.activitySeen} onChange={v => updateNested('businessDetails', 'activitySeen', v)} />
              <InputField label="Describe the Building" value={data.businessDetails.buildingDescription} onChange={v => updateNested('businessDetails', 'buildingDescription', v)} placeholder="e.g., RCC Structure" />
              <InputField label="Premises Owned / Rented" value={data.businessDetails.ownershipType} onChange={v => updateNested('businessDetails', 'ownershipType', v)} placeholder="Owned / Rented" />
              <InputField label="No. of People Seen" type="number" value={data.businessDetails.peopleCount} onChange={v => updateNested('businessDetails', 'peopleCount', v)} placeholder="Approx staff count" />
              <ToggleGroup label="Business Nameplate Seen" options={['Yes', 'No', 'Temporary']} value={data.businessDetails.nameplateSeen} onChange={v => updateNested('businessDetails', 'nameplateSeen', v)} />
            </div>
            <div className="mt-6">
              <TextAreaField label="Field Executive's Comments (Business)" value={data.businessDetails.text} onChange={v => updateNested('businessDetails', 'text', v)} placeholder="Detailed observation of business premises..." />
            </div>
          </>
        )}
      </section>

      {/* Photo Uploads Grid (Pages 4-8) */}
      <section className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
        <SectionHeader icon={Camera} title="Evidence Feed" description="Photography and ID documents (Pages 4-8)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
           <div className="space-y-4">
             <h4 className="text-slate-400 font-bold uppercase text-xs border-b border-slate-800 pb-2">{data.verificationType === 'Job' ? 'Office' : 'Business'} (P. 3-4)</h4>
             <ImageUpload label={data.verificationType === 'Job' ? "Office Image 1" : "Business Image 1"} preview={data.photos.business1} onUpload={v => updatePhoto('business1', v)} />
             <ImageUpload label={data.verificationType === 'Job' ? "Office Image 2" : "Business Image 2"} preview={data.photos.business2} onUpload={v => updatePhoto('business2', v)} />
           </div>
           <div className="space-y-4">
             <h4 className="text-slate-400 font-bold uppercase text-xs border-b border-slate-800 pb-2">Location (P. 2-5)</h4>
             <ImageUpload label="Building Frontage" preview={data.photos.location} onUpload={v => updatePhoto('location', v)} />
             <ImageUpload label="Building Footage 1" preview={data.photos.buildingFootage1} onUpload={v => updatePhoto('buildingFootage1', v)} />
             <ImageUpload label="Building Footage 2" preview={data.photos.buildingFootage2} onUpload={v => updatePhoto('buildingFootage2', v)} />
           </div>
           <div className="space-y-4 sm:col-span-2 md:col-span-1">
             <h4 className="text-slate-400 font-bold uppercase text-xs border-b border-slate-800 pb-2">Home & ID (P. 6-8)</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              <ImageUpload label="Inside Home 1" preview={data.photos.insideHome1} onUpload={v => updatePhoto('insideHome1', v)} />
              <ImageUpload label="Inside Home 2" preview={data.photos.insideHome2} onUpload={v => updatePhoto('insideHome2', v)} />
              <ImageUpload label="Applicant Aadhar" preview={data.photos.applicantAadhar} onUpload={v => updatePhoto('applicantAadhar', v)} />
              <ImageUpload label="Co-Applicant Aadhar" preview={data.photos.coApplicantAadhar} onUpload={v => updatePhoto('coApplicantAadhar', v)} />
             </div>
           </div>
        </div>
      </section>

      {/* Executive Findings (Mixed) */}
      <section className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
        <SectionHeader icon={FileText} title="Executive Summary" description="Overall visit conclusions" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Applicant Type House" value={data.fieldExecutiveComments.houseType} onChange={v => updateNested('fieldExecutiveComments', 'houseType', v)} placeholder="e.g., RCC Building" />
          <InputField label="Applicant Given House Ownership" value={data.fieldExecutiveComments.ownership} onChange={v => updateNested('fieldExecutiveComments', 'ownership', v)} placeholder="e.g., Own House" />
          <InputField label="Duration of Stay" value={data.fieldExecutiveComments.durationOfStay} onChange={v => updateNested('fieldExecutiveComments', 'durationOfStay', v)} placeholder="e.g., 10 Years" />
          <InputField label="Total Family Members" value={data.fieldExecutiveComments.familyMembers} onChange={v => updateNested('fieldExecutiveComments', 'familyMembers', v)} placeholder="Number of members" />
          <InputField label="No. of Dependents" value={data.fieldExecutiveComments.dependents} onChange={v => updateNested('fieldExecutiveComments', 'dependents', v)} placeholder="Number of dependents" />
          <InputField label="Residence Confirmed By" value={data.fieldExecutiveComments.residenceConfirmedBy} onChange={v => updateNested('fieldExecutiveComments', 'residenceConfirmedBy', v)} placeholder="e.g., Neighbour / Spouse" />
          <div className="md:col-span-2">
            <TextAreaField label="Overall Observations (Bullet Points)" value={data.fieldExecutiveComments.text} onChange={v => updateNested('fieldExecutiveComments', 'text', v)} placeholder="Summary of the entire visit findings..." />
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <section className="bg-slate-900/40 p-4 sm:p-8 rounded-3xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
        <SectionHeader icon={CheckCircle2} title="Finalization" description="Staff and Signatory details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Field Executive Name" value={data.fieldExecutiveName} onChange={v => updateData({ fieldExecutiveName: v })} placeholder="Visiting officer name" />
          <InputField label="Executive Mobile" value={data.fieldExecutiveMobile} onChange={v => updateData({ fieldExecutiveMobile: v })} placeholder="Mobile number" />
          <InputField label="Supervisor" value={data.supervisorName} onChange={v => updateData({ supervisorName: v })} placeholder="Supervising officer" />
          <InputField label="Verified By" value={data.verifierName} onChange={v => updateData({ verifierName: v })} placeholder="Verifying officer" />
          <ToggleGroup label="Final Status" options={['POSITIVE', 'NEGATIVE']} value={data.finalStatus} onChange={v => updateData({ finalStatus: v })} />
        </div>
      </section>

      {/* Spacer for bottom */}
      <div className="h-12" />
    </div>
  );
}

function ImageUpload({ label, preview, onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpload(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="group relative">
      <label className="block text-sm font-medium text-slate-400 mb-2 group-hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]">
        {label}
      </label>
      <div className="relative h-40 w-full rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/60 p-2 transition-all group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 overflow-hidden">
        {preview ? (
          <div className="relative h-full w-full">
            <img src={preview} alt="Upload preview" className="h-full w-full object-cover rounded-xl" />
            <button 
              onClick={() => onUpload(null)} 
              className="absolute top-2 right-2 bg-rose-500/90 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2 text-slate-500">
            <Camera className="h-8 w-8 opacity-20" />
            <span className="text-[10px] uppercase font-bold tracking-tighter opacity-40">Tap to upload</span>
            <input type="file" className="absolute inset-0 cursor-pointer opacity-0" onChange={handleChange} accept="image/*" />
          </div>
        )}
      </div>
    </div>
  );
}
