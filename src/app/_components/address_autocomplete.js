import React, { useState } from 'react';
import { TextField } from '@mui/material';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function AddressAutocomplete() {
  const [address, setAddress] = useState('');

  const handleSelect = async (value) => {
    setAddress(value);
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      console.log('Coordinates:', latLng);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            label="Enter your address"
            {...getInputProps({ placeholder: 'Enter your address' })}
            fullWidth
          />
          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? '#fafafa' : '#ffffff',
                cursor: 'pointer',
                padding: '5px'
              };
              return (
                <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default AddressAutocomplete;
