// import React, { useState, useEffect } from 'react';

// interface Company {
//   id: number;
//   name: string;
//   address: string;
// }

// const CompanyManagement: React.FC = () => {
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       const response = await fetch('/api/companies');
//       const data = await response.json();
//       setCompanies(data);
//     };

//     fetchCompanies();
//   }, []);

//   const addCompany = async () => {
//     const newCompany = { name, address };
    
//     const response = await fetch('/api/companies', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newCompany),
//     });

//     if (response.ok) {
//       const addedCompany = await response.json();
//       setCompanies([...companies, addedCompany]);
//       setName('');
//       setAddress('');
//     }
//   };

//   return (
//     <div>
//       <h1>Company Management</h1>
//       <form onSubmit={(e) => { e.preventDefault(); addCompany(); }}>
//         <input
//           type="text"
//           placeholder="Company Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Company Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />
//         <button type="submit">Add Company</button>
//       </form>
//       <h2>Company List</h2>
//       <ul>
//         {companies.map((company) => (
//           <li key={company.id}>
//             {company.name} - {company.address}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CompanyManagement;