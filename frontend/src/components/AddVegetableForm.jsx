import React, { useState } from 'react';

const AddVegetableForm = ({ addVegetable }) => {
    const [vegetableName, setVegetableName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (vegetableName) {
            addVegetable(vegetableName);
            setVegetableName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={vegetableName}
                onChange={(e) => setVegetableName(e.target.value)}
                placeholder="Enter vegetable name"
            />
            <button type="submit">Add Vegetable</button>
        </form>
    );
};

export default AddVegetableForm;