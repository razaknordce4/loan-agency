import caLogo from '../assets/ca.jfif';
import sbiLogo from '../assets/sbi-logo.png';

const PageWrapper = ({ children, pageNumber }) => (
  <div className="export-page relative bg-white text-black p-10 max-w-[850px] mx-auto min-h-[1120px] shadow-sm font-sans border border-gray-100 flex flex-col mb-8 print:mb-0 print:shadow-none print:border-none page-break-after-always">
    {children}
    <div className="mt-auto pt-4 border-t border-gray-100 text-[9px] flex justify-between text-gray-400">
      <span>Loan Verification Report - Strictly Confidential</span>
      <span>Page {pageNumber} of 8</span>
    </div>
  </div>
);

const SectionHeader = ({ title }) => (
  <div className="bg-slate-800 text-white px-3 py-1 font-bold text-xs uppercase mb-1 tracking-wider">
    {title}
  </div>
);

const FooterSignatures = ({ data, rightOnly = false }) => (
  <div className="mt-8 grid grid-cols-2 gap-10 text-[10px] border-t-2 border-slate-900 pt-6">
    <div className="space-y-4">
      {!rightOnly && (
        <>
          <div className="flex justify-between items-end">
            <span className="font-bold">FIELD EXECUTIVE NAME</span>
            <div className="border-b border-black flex-1 ml-2 uppercase font-medium pb-1">{data.fieldExecutiveName}</div>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-bold">FIELD EXECUTIVE MOBILE NO.</span>
            <div className="border-b border-black flex-1 ml-2 pb-1">{data.fieldExecutiveMobile}</div>
          </div>
          <div className="flex justify-between items-end h-12">
            <span className="font-bold">FIELD EXECUTIVE SIGN</span>
            <div className="border-b border-black flex-1 ml-2 italic text-gray-300 pb-1">Space for signature</div>
          </div>
          <div className="pt-4 flex gap-4 text-[9px]">
            <span>Vijayawada & Gudiwada</span>
            <span>Contact: 9014221011, 9491349091</span>
          </div>
        </>
      )}
    </div>
    <div className="space-y-4">
       <div className="flex justify-between items-end h-12 mb-4">
          <div className="border-2 border-slate-900 p-2 text-center flex-1 italic text-gray-200 text-[12px]">
             Digitally Signed Area (Manual Signature Space)
          </div>
       </div>
       <div className="grid grid-cols-2 gap-2">
         <div className="flex flex-col">
           <span className="font-bold">Supervised</span>
           <span className="border border-slate-300 p-1 min-h-[18px] uppercase">{data.supervisorName || 'MD KHAJA'}</span>
         </div>
         <div className="flex flex-col">
           <span className="font-bold">Verified by</span>
           <span className="border border-slate-300 p-1 min-h-[18px] uppercase">{data.verifierName || 'M. SURESH BABU'}</span>
         </div>
       </div>
    </div>
  </div>
);

const Header = ({ data, title, subtitle }) => (
  <div className="mb-4 flex flex-col">
    {/* Dynamic Logo & Centered CA Name Row */}
    <div className="flex justify-between items-center mb-1 relative min-h-[50px]">
       {/* Left Logo */}
       <div className="z-10 bg-white pr-2">
          <img src={caLogo} alt="CA" className="h-10 object-contain" />
       </div>

       {/* Centered CA Name */}
       <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-full px-20">
          <span className="text-[13px] font-black uppercase tracking-tight leading-none text-slate-800 break-words w-full">
             {data.caName || 'PARVEZ AND NARAYANA'}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 mt-1">Chartered Accountants</span>
       </div>

       {/* Right Logo */}
       <div className="z-10 bg-white pl-2">
          <img src={sbiLogo} alt="SBI" className="h-12 object-contain" />
       </div>
    </div>

    {/* JAN Ref Row - below logos, far left */}
    <div className="flex justify-start mb-4">
       <span className="text-[11px] font-black font-mono tracking-tighter text-slate-900 uppercase">
          {data.janRef || 'JAN-XXXX'}
       </span>
    </div>
    
    <div className="flex flex-col items-center w-full mt-2">
      <h1 className="text-sm font-black underline uppercase tracking-[0.2em] mb-1">{title}</h1>
      <h2 className="text-xs font-bold underline uppercase">{subtitle}</h2>
    </div>
  </div>
);

export default function ReportTemplate({ data }) {
  const checkMark = (condition) => condition ? "✓" : "";

  return (
    <div id="report-template" className="bg-slate-200 py-10 print:bg-white print:p-0">
      
      {/* PAGE 1: Evaluation & Intro */}
      <PageWrapper pageNumber={1}>
        <Header data={data} title="Due Diligence Report" subtitle="Evaluation Sheet" />
        
        <table className="w-full border-collapse border-2 border-slate-800 mb-6 text-[11px]">
          <thead className="bg-slate-200 font-bold uppercase">
             <tr>
               <td className="border border-slate-800 p-2 w-1/4">Date of Receipt</td>
               <td className="border border-slate-800 p-2 w-1/4">Date of Report</td>
               <td className="border border-slate-800 p-2 w-1/4">RLMS Number</td>
               <td className="border border-slate-800 p-2 w-1/4">Reference Number</td>
             </tr>
          </thead>
          <tbody>
             <tr className="font-bold text-center">
               <td className="border border-slate-800 p-3">{data.dateOfReceipt || '-'}</td>
               <td className="border border-slate-800 p-3">{data.dateOfReport || '-'}</td>
               <td className="border border-slate-800 p-3">{data.rlmsNumber || '-'}</td>
               <td className="border border-slate-800 p-3">{data.referenceNumber || '-'}</td>
             </tr>
          </tbody>
        </table>

        <div className="text-center font-black underline uppercase mb-6 text-[12px] tracking-widest">
           Residence Verification Report - Applicant
           <div className="text-[9px] no-underline font-bold mt-2">(STRICTLY PRIVATE AND CONFIDENTIAL)</div>
        </div>

        <div className="border-2 border-slate-300 p-4 mb-4">
           <span className="font-black text-[11px] uppercase w-40 inline-block">Applicant Name :</span>
           <span className="font-bold text-[12px] uppercase">{data.applicantName}</span>
        </div>

        <div className="border-2 border-slate-300 p-4 mb-6">
           <span className="font-black text-[11px] uppercase w-40 inline-block align-top">Address :</span>
           <span className="font-medium text-[11px] uppercase leading-relaxed w-[400px] inline-block">{data.address}</span>
        </div>

        <SectionHeader title="Verifier's Observation" />
        <table className="w-full border-collapse border border-slate-400 text-[10px] mb-6">
          <tbody>
             <tr>
               <td className="border border-slate-400 p-2 w-1/4 font-bold">Locality / Surrounding :</td>
               <td className="border border-slate-400 p-2">
                  <div className="flex flex-wrap w-full">
                    {['Slum Area', 'Underdeveloped Area', 'Residential Buildings', 'Small/Medium Size Shops', 'Chawl Area', 'Big Housing Complex', 'Commercial Building'].map(opt => (
                      <div key={opt} className="flex items-center gap-1 w-1/2 mb-2">
                         <span className={`w-3 h-3 border border-black flex items-center justify-center text-[8px]`}>
                           {data.observations.locality === opt ? '✓' : ''}
                         </span>
                         <span>{opt}</span>
                      </div>
                    ))}
                  </div>
               </td>
             </tr>
             <tr>
               <td className="border border-slate-400 p-2 font-bold">Accessibility :</td>
               <td className="border border-slate-400 p-2">
                  <div className="flex flex-col gap-2">
                    {['Easy to locate and access', 'Difficult to locate', 'Gulli (very narrow road)', 'Untraceable'].map(opt => (
                      <div key={opt} className="flex items-center gap-1">
                         <span className="w-3 h-3 border border-black flex items-center justify-center text-[8px]">
                           {data.observations.accessibility === opt ? '✓' : ''}
                         </span>
                         <span>{opt}</span>
                      </div>
                    ))}
                  </div>
               </td>
             </tr>
             <tr>
               <td className="border border-slate-400 p-2 font-bold">Is the entrance motorable</td>
               <td className="border border-slate-400 p-2">
                  <div className="flex gap-10">
                    <div className="flex gap-1"><span className="w-3 h-3 border border-black flex items-center justify-center">{data.observations.motorable === 'Yes' ? '✓' : ''}</span> Yes</div>
                    <div className="flex gap-1"><span className="w-3 h-3 border border-black flex items-center justify-center">{data.observations.motorable === 'No' ? '✓' : ''}</span> NO</div>
                  </div>
               </td>
             </tr>
             <tr>
               <td className="border border-slate-400 p-2 font-bold">Is address confirmed</td>
               <td className="border border-slate-400 p-2">
                  <div className="flex gap-10">
                    <div className="flex gap-1"><span className="w-3 h-3 border border-black flex items-center justify-center">{data.observations.addressConfirmed === 'Yes' ? '✓' : ''}</span> Yes</div>
                    <div className="flex gap-1"><span className="w-3 h-3 border border-black flex items-center justify-center">{data.observations.addressConfirmed === 'No' ? '✓' : ''}</span> NO</div>
                  </div>
               </td>
             </tr>
             <tr>
                <td className="border border-slate-400 p-2 font-bold">Correct Pin Code :</td>
                <td className="border border-slate-400 p-2">
                   <span className="font-bold underline mr-8">{data.pinCode || '------'}</span>
                   <span className="font-bold">Land Mark :</span> <span className="font-bold underline ml-2">{data.landMark}</span>
                </td>
             </tr>
          </tbody>
        </table>

        <SectionHeader title="Type of Accommodation" />
        <div className="border border-slate-400 p-2 grid grid-cols-1 gap-1 text-[10px] mb-8">
           {['Residential building', 'Asbestos house', 'Hostel', 'Small Unit within a House', 'Slum', 'Small independent house'].map((t, i) => (
             <div key={t} className="flex gap-4">
                <span>{i+1}. {t}</span>
                {data.observations.accommodationType === t && <span className="font-black">✓</span>}
             </div>
           ))}
        </div>

        <FooterSignatures data={data} rightOnly={true} />
      </PageWrapper>

      {/* PAGE 2: Residence Details & Home Preview */}
      <PageWrapper pageNumber={2}>
        <Header data={data} title="Due Diligence Report" subtitle="Residence Details" />
        
        <SectionHeader title="Residence:" />
        <table className="w-full border-collapse border border-slate-300 text-[10px] mb-4">
           <tbody>
             <tr>
               <td className="border border-slate-300 p-1.5 font-bold w-1/4">No. of Stairs</td>
               <td className="border border-slate-300 p-1.5 w-1/4 font-black">{data.residenceDetail.noOfStairs}</td>
               <td className="border border-slate-300 p-1.5 font-bold w-1/6">Watchman</td>
               <td className="border border-slate-300 p-1.5 w-1/12">{data.residenceDetail.watchman} / J</td>
               <td className="border border-slate-300 p-1.5 font-bold w-1/12">Lift</td>
               <td className="border border-slate-300 p-1.5 w-1/12">{data.residenceDetail.lift} / J</td>
             </tr>
             <tr>
               <td className="border border-slate-300 p-1.5 font-bold">Applicant name outside door</td>
               <td className="border border-slate-300 p-1.5" colSpan={5}>{data.residenceDetail.nameplateVisible} / No</td>
             </tr>
             <tr>
               <td className="border border-slate-300 p-1.5 font-bold">External appearance</td>
               <td className="border border-slate-300 p-1.5" colSpan={5}>{data.residenceDetail.externalAppearance}</td>
             </tr>
             <tr>
               <td className="border border-slate-300 p-1.5 font-bold">Entry into residence permitted</td>
               <td className="border border-slate-300 p-1.5" colSpan={5}>{data.residenceDetail.entryPermitted}</td>
             </tr>
             <tr className="bg-slate-50 font-bold">
               <td className="border border-slate-300 p-1.5">PERSON CONTACTED</td>
               <td className="border border-slate-300 p-1.5 uppercase" colSpan={5}>{data.residenceDetail.personContacted}</td>
             </tr>
             <tr className="bg-slate-50 font-bold">
               <td className="border border-slate-300 p-1.5">Relationship</td>
               <td className="border border-slate-300 p-1.5 uppercase" colSpan={5}>{data.residenceDetail.relationship}</td>
             </tr>
           </tbody>
        </table>

        <SectionHeader title="Neighbourhood Check" />
        <table className="w-full border-collapse border border-slate-300 text-[10px] mb-4">
           <tbody>
             <tr><td className="border border-slate-300 p-1.5 w-1/3 font-bold">Neighbors Verification</td><td className="border border-slate-300 p-1.5 font-black">{data.neighbourhoodCheck.status}</td></tr>
             <tr><td className="border border-slate-300 p-1.5 font-bold">COMMENTS :</td><td className="border border-slate-300 p-1.5 italic font-medium">{data.neighbourhoodCheck.comments}</td></tr>
           </tbody>
        </table>

        <SectionHeader title="Personal Details" />
        <div className="border border-slate-300 p-2 text-[10px] mb-4">
           <span className="font-bold">Contact Details :</span> <span className="ml-4 tabular-nums"> Applicant : {data.contactNo}</span>
        </div>

        <div className="border border-slate-400 p-4 min-h-[150px] mb-6 font-bold text-[10px] uppercase leading-relaxed">
            <div className="underline mb-2">FIELD EXECUTIVE'S COMMENTS:</div>
            <div className="ml-4 space-y-2">
               <div>➤ VISITED THE GIVEN ADDRESS, AND MET THE {data.residenceDetail.relationship || 'APPLICANT'},</div>
               <div className="grid grid-cols-1 gap-2 border-l-2 border-slate-200 pl-4 py-2">
                  <span>• HOUSE TYPE : {data.fieldExecutiveComments.houseType}</span>
                  <span>• HOUSE OWNERSHIP : {data.fieldExecutiveComments.ownership}</span>
                  <span>• DURATION OF STAY : {data.fieldExecutiveComments.durationOfStay}</span>
                  <span>• TOTAL FAMILY MEMBERS : {data.fieldExecutiveComments.familyMembers}</span>
                  <span>• NUMBER OF DEPENDENTS : {data.fieldExecutiveComments.dependents}</span>
                  <span>• RESIDENCE CONFIRMATION : {data.fieldExecutiveComments.residenceConfirmedBy}</span>
               </div>
               <div>{data.fieldExecutiveComments.text}</div>
            </div>
        </div>

        {/* Dynamic Image Placement: Business + Building Side-by-side */}
        <div className="grid grid-cols-2 gap-4 items-end mt-auto pb-10">
           <div className="flex flex-col items-center">
              <span className="text-[14px] font-black italic mb-4">{data.finalStatus} ✓</span>
              <div className="w-full h-[283px] border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                 {data.photos.business1 ? <img src={data.photos.business1} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-400 italic">Business Image</span>}
              </div>
           </div>
           <div className="w-full h-[283px] border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
               {data.photos.location ? <img src={data.photos.location} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-400 italic">Building/House Image</span>}
           </div>
        </div>

        <FooterSignatures data={data} />
      </PageWrapper>

      {/* PAGE 3: Business Verification Page */}
      <PageWrapper pageNumber={3}>
        <Header data={data} title="Business Verification Report" subtitle="(STRICTLY PRIVATE AND CONFIDENTIAL)" />
        
        <div className="space-y-4 text-[11px] mb-8">
           <div className="flex justify-between">
              <span className="font-bold w-40">APPLICANT NAME :</span>
              <span className="flex-1 border-b border-gray-300 font-black uppercase">{data.applicantName}</span>
              <span className="ml-4 font-bold">Mobile no.</span>
              <span className="ml-2 border-b border-gray-300 w-32 font-bold tabular-nums">{data.contactNo}</span>
           </div>
           <div className="flex items-start">
              <span className="font-bold w-40">ADDRESS :</span>
              <span className="flex-1 border-b border-gray-300 min-h-[40px] uppercase leading-[20px]">{data.address}</span>
           </div>
        </div>

        <div className="font-black italic text-center mb-6 text-[10px] underline decoration-slate-900 underline-offset-4">
           FOLLOWING ARE BASED ON VERIFIERS OBSERVATION
        </div>

        <div className="grid grid-cols-1 gap-3 text-[10px] border-2 border-slate-100 p-6 rounded-lg mb-6">
           {[
             { l: 'Name of the premises', v: data.businessDetails.premiseName },
             { l: 'Applicant designation', v: data.businessDetails.designation },
             { l: 'Nature of the Business', v: data.businessDetails.natureOfBusiness },
             { l: 'Doing Business since', v: data.businessDetails.businessSince },
             { l: 'Business Activities seen', v: data.businessDetails.activitySeen },
             { l: 'Describe the building', v: data.businessDetails.buildingDescription },
             { l: 'Premises Owned / Rented', v: data.businessDetails.ownershipType },
             { l: 'No. of people seen', v: data.businessDetails.peopleCount },
             { l: 'Business name plate seen', v: data.businessDetails.nameplateSeen }
           ].map(row => (
             <div key={row.l} className="flex border-b border-slate-100 pb-1">
                <span className="w-64 font-bold text-slate-700">{row.l}</span>
                <span className="font-black uppercase text-slate-900">: {row.v}</span>
             </div>
           ))}
        </div>

        <div className="border border-slate-900 p-4 min-h-[120px] mb-6">
           <h4 className="font-black text-[10px] underline mb-4 uppercase">FIELD EXECUTIVE'S COMMENTS:</h4>
           <p className="text-[10px] font-medium leading-relaxed uppercase">{data.businessDetails.text}</p>
           <h4 className="font-black text-[12px] text-center mt-6 uppercase">HENCE {data.finalStatus} REPORT IS GIVEN.</h4>
        </div>

        <div className="flex justify-center mb-8">
            <div className="w-1/2 h-[283px] border border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                 {data.photos.business1 ? <img src={data.photos.business1} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-300">Business Building Photo</span>}
            </div>
        </div>

        <FooterSignatures data={data} />
      </PageWrapper>

      {/* PAGE 4: Two Business Images */}
      <PageWrapper pageNumber={4}>
         <Header data={data} title="Verification Evidence" subtitle="Business Photos" />
         <div className="flex flex-col gap-10 mt-10">
            <div className="w-full h-[433px] border-2 border-slate-100 overflow-hidden flex items-center justify-center bg-slate-50">
               {data.photos.business1 ? <img src={data.photos.business1} className="w-full h-full object-cover" /> : <span className="text-gray-300 uppercase font-black tracking-tighter italic">Business Image 1 (Full View)</span>}
            </div>
            <div className="w-full h-[433px] border-2 border-slate-100 overflow-hidden flex items-center justify-center bg-slate-50">
               {data.photos.business2 ? <img src={data.photos.business2} className="w-full h-full object-cover" /> : <span className="text-gray-300 uppercase font-black tracking-tighter italic">Business Image 2 (Inside/Closer View)</span>}
            </div>
         </div>
      </PageWrapper>

      {/* PAGE 5: Building Footage 1 & 2 */}
      <PageWrapper pageNumber={5}>
         <Header data={data} title="Verification Evidence" subtitle="Building Footage" />
         <div className="flex flex-col gap-10 mt-10">
            <div className="w-full h-[433px] border-2 border-slate-100 overflow-hidden flex items-center justify-center bg-slate-50">
               {data.photos.buildingFootage1 ? <img src={data.photos.buildingFootage1} className="w-full h-full object-cover" /> : <span className="text-gray-300 uppercase font-black tracking-tighter italic">Building Footage 1</span>}
            </div>
            <div className="w-full h-[433px] border-2 border-slate-100 overflow-hidden flex items-center justify-center bg-slate-50">
               {data.photos.buildingFootage2 ? <img src={data.photos.buildingFootage2} className="w-full h-full object-cover" /> : <span className="text-gray-300 uppercase font-black tracking-tighter italic">Building Footage 2</span>}
            </div>
         </div>
      </PageWrapper>

      {/* PAGE 6: Summary + Inside Home */}
      <PageWrapper pageNumber={6}>
         <Header data={data} title="Due Diligence Report" subtitle="Building Interior Evidence" />
         <div className="border border-slate-900 p-4 font-bold text-[11px] uppercase mb-8">
            <h4 className="underline mb-2">SUMMARY OF VERIFICATION :</h4>
            <p className="leading-relaxed">RESIDENTIAL STATUS CONFIRMED. NEIGHBOURS RECOGNIZED THE FAMILY MEMBERS. ALL PARAMETERS FOUND IN ORDER DURING ON-SITE INSPECTION.</p>
         </div>
         <div className="grid grid-cols-1 gap-10">
            <div className="w-full h-[513px] border-2 border-slate-100 overflow-hidden flex items-center justify-center bg-slate-50">
               {data.photos.insideHome1 ? <img src={data.photos.insideHome1} className="w-full h-full object-cover" /> : <span className="text-gray-300 uppercase font-black tracking-tighter italic">Inside Home Image 1</span>}
            </div>
            <div className="w-full h-[513px] border-2 border-slate-100 overflow-hidden flex items-center justify-center bg-slate-50">
               {data.photos.insideHome2 ? <img src={data.photos.insideHome2} className="w-full h-full object-cover" /> : <span className="text-gray-300 uppercase font-black tracking-tighter italic">Inside Home Image 2</span>}
            </div>
         </div>
      </PageWrapper>

      {/* PAGE 7: Applicant Aadhar */}
      <PageWrapper pageNumber={7}>
         <Header data={data} title="Supporting Documents" subtitle="Applicant Identity Proof" />
         <div className="flex flex-col items-center gap-4 mt-8">
            <h3 className="font-black text-xs underline uppercase">Aadhar Card Copy</h3>
            <div className="w-full h-[1089px] border-4 border-slate-200 shadow-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                {data.photos.applicantAadhar ? <img src={data.photos.applicantAadhar} className="w-full h-full object-contain" /> : <span className="text-slate-300 text-3xl font-black italic opacity-20">Full Size Aadhar Image</span>}
            </div>
         </div>
      </PageWrapper>

      {/* PAGE 8: Co-Applicant Aadhar */}
      <PageWrapper pageNumber={8}>
         <Header data={data} title="Supporting Documents" subtitle="Co-Applicant Identity Proof" />
         <div className="flex flex-col items-center gap-4 mt-8">
            <h3 className="font-black text-xs underline uppercase">Co-Applicant Aadhar Card Copy</h3>
            <div className="w-full h-[1089px] border-4 border-slate-200 shadow-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                {data.photos.coApplicantAadhar ? <img src={data.photos.coApplicantAadhar} className="w-full h-full object-contain" /> : <span className="text-slate-300 text-3xl font-black italic opacity-20">Full Size Co-Applicant Aadhar Image</span>}
            </div>
         </div>
      </PageWrapper>

    </div>
  );
}
