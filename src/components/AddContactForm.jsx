import React, { useState } from 'react';
import InputField from './InputField';

const AddContactForm = ({ onCancel, onAddContact }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mail: '',
        phone: '',
        dob: '',
        gender: 'M',
        img: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddContact(formData);
    };

    return (
        <div>
            <h1 className="text-3xl font-semibold text-white mb-8">Add New Contact</h1>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center mb-4 overflow-hidden">
                        <img 
                            src={formData.img || 'https://placehold.co/400x400/7f9cf5/ffffff?text=No+Image'} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/7f9cf5/ffffff?text=No+Image'; }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter first name" />
                    <InputField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter last name" />
                    <InputField label="Your email" name="mail" type="email" value={formData.mail} onChange={handleChange} placeholder="Enter your email" />
                    <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
                    <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-slate-700 border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <InputField label="Image URL" name="img" value={formData.img} onChange={handleChange} placeholder="https://example.com/image.png" />
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="bg-slate-600 text-white py-2 px-6 rounded-lg hover:bg-slate-500 transition-colors">Cancel</button>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">Add Now</button>
                </div>
            </form>
        </div>
    );
};

export default AddContactForm;
