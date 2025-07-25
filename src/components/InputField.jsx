import React from 'react';

const InputField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <input {...props} className="w-full bg-slate-700 border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
);

export default InputField;