import React from 'react';
import FormBox from '../components/FormBox';


const FormListing = () => {
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Listing Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
          <FormBox></FormBox>
          <FormBox></FormBox>
        
      </div>
    </div>
  );
};

export default FormListing;
